// The Go page's robot: a Web Worker that runs KataGo's human SL net (b18c384nbt-humanv0)
// and answers "how would a human of this rank move here?" with move probabilities,
// plus who the net thinks owns each point. Built from Web KaTrain's engine code
// (MIT, github.com/Sir-Teo/web-katrain) with esbuild; see build.mjs.
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';   // tensor.add() etc., used by modelV8
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import { KataGoBinModelParser } from '../engine/katago/binModelParser';
import { parseKataGoModelV8 } from '../engine/katago/loadModelV8';
import { KataGoModelV8Tf } from '../engine/katago/modelV8';
import { setBoardSize, BOARD_AREA, BOARD_SIZE } from '../engine/katago/fastBoard';
import { fillInputsV7FastForPosition } from '../engine/katago/positionInputsV7';
import { humanSlMetadataRow } from '../engine/katago/humanSlProfile';
import type { BoardState, Move, Player } from '../types';

setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.22.0/dist/');

// The page's copy of the net stores its weights as half floats after an "@B16@" marker
// (see halve.py) instead of KataGo's "@BIN@" and single floats: half the download.
const HALF = new Float32Array(65536);
for (let h = 0; h < 65536; h++) {
  const s = h & 0x8000 ? -1 : 1, e = (h >> 10) & 0x1f, f = h & 0x3ff;
  HALF[h] = e === 0 ? s * f * 2 ** -24 : e === 31 ? (f ? NaN : s * Infinity) : s * (1 + f / 1024) * 2 ** (e - 15);
}
const readFloats = KataGoBinModelParser.prototype.readBinaryFloats;
KataGoBinModelParser.prototype.readBinaryFloats = function (this: any, count: number): Float32Array {
  const d: Uint8Array = this.data;
  while (d[this.idx] === 0x20 || d[this.idx] === 0x0a || d[this.idx] === 0x0d || d[this.idx] === 0x09) this.idx++;
  if (d[this.idx] !== 0x40 || d[this.idx + 1] !== 0x42 || d[this.idx + 2] !== 0x31 || d[this.idx + 3] !== 0x36 || d[this.idx + 4] !== 0x40)
    return readFloats.call(this, count);
  const start = this.idx + 5, out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = HALF[d[start + 2 * i]! | (d[start + 2 * i + 1]! << 8)]!;
  this.idx = start + 2 * count;
  return out;
};

let net: KataGoModelV8Tf | null = null;
let loading: Promise<void> | null = null;
const say = (m: object) => (self as any).postMessage(m);

async function download(url: string): Promise<Uint8Array> {
  // kept in the browser's Cache Storage, so the big file comes down once per device
  let cache: Cache | null = null;
  try { cache = await caches.open('go-robot'); } catch (e) { /* no Cache Storage (private window) */ }
  let res = cache ? await cache.match(url) : undefined;
  const fresh = !res;
  if (!res) {
    res = await fetch(url);
    if (!res.ok) throw new Error(`Could not download the robot (${res.status})`);
  }
  const total = Number(res.headers.get('content-length')) || 0, parts: Uint8Array[] = [];
  let got = 0, shown = -1;
  const reader = res.body!.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value); got += value.length;
    const pct = total ? Math.floor(got / total * 100) : -1;
    if (fresh && pct !== shown) { shown = pct; say({ type: 'progress', pct }); }
  }
  const gz = new Blob(parts);
  if (fresh && cache) cache.put(url, new Response(gz, { headers: { 'content-length': String(gz.size) } })).catch(() => {});
  const head = new Uint8Array(await gz.slice(0, 2).arrayBuffer());
  if (head[0] !== 0x1f || head[1] !== 0x8b) return new Uint8Array(await gz.arrayBuffer());   // the server already unzipped it
  return new Uint8Array(await new Response(gz.stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
}

async function load(url: string, size: number): Promise<void> {
  const data = await download(url);
  say({ type: 'progress', pct: 100, stage: 'starting' });
  const parsed = parseKataGoModelV8(data);
  const why: string[] = [];
  const only = new URLSearchParams(self.location.search).get('backend');   // robot.js?backend=wasm forces one, for testing
  for (const backend of only ? [only] : ['webgl', 'wasm', 'cpu']) {
    try {
      if (!(await tf.setBackend(backend))) continue;
      await tf.ready();
      net = new KataGoModelV8Tf(parsed);
      await evaluate({ size, board: new Array(size * size).fill(0), history: [], toPlay: 'b', rank: '6k' });   // warm up at the game's size (the first run of a size is slow) and check it works
      say({ type: 'ready', backend });
      return;
    } catch (e) {
      net = null;
      why.push(backend + ': ' + (e instanceof Error ? e.message : String(e)));
    }
  }
  throw new Error('This browser could not run the robot (' + why.join('; ') + ')');
}

type Ask = { size: number; board: number[]; prev?: number[]; prev2?: number[]; history: { c: 'b' | 'w'; p: number }[]; toPlay: 'b' | 'w'; rank: string };

async function evaluate(a: Ask): Promise<{ logits: Float32Array; ownership: Float32Array }> {
  setBoardSize(a.size);
  const n = BOARD_SIZE, area = BOARD_AREA, pl = (c: 'b' | 'w'): Player => (c === 'b' ? 'black' : 'white');
  const toState = (b: number[]): BoardState => {
    const rows: BoardState = [];
    for (let y = 0; y < n; y++) { const r = []; for (let x = 0; x < n; x++) { const v = b[y * n + x]; r.push(v === 1 ? 'black' : v === 2 ? 'white' : null); } rows.push(r as any); }
    return rows;
  };
  const moves: Move[] = a.history.map(m => ({ x: m.p < 0 ? -1 : m.p % n, y: m.p < 0 ? -1 : Math.floor(m.p / n), player: pl(m.c) }) as Move);
  const spatial = new Float32Array(area * 22), global = new Float32Array(19);
  fillInputsV7FastForPosition({
    board: toState(a.board), previousBoard: a.prev ? toState(a.prev) : undefined, previousPreviousBoard: a.prev2 ? toState(a.prev2) : undefined,
    currentPlayer: pl(a.toPlay), moveHistory: moves, komi: 7.5, rules: 'chinese', conservativePassAndIsRoot: false,
    outSpatial: spatial, outGlobal: global,
  });
  const metaRow = humanSlMetadataRow({ profile: 'rank_' + a.rank, nextPlayer: pl(a.toPlay), boardArea: area });
  if (!metaRow) throw new Error('Unknown rank ' + a.rank);
  const tS = tf.tensor4d(spatial, [1, n, n, 22]), tG = tf.tensor2d(global, [1, 19]), tM = tf.tensor2d(metaRow, [1, metaRow.length]);
  const out = net!.forward(tS, tG, tM);
  try {
    const [pol, pass, own] = await Promise.all([out.policy.data(), out.policyPass.data(), out.ownership.data()]);
    const ch = net!.policyOutChannels, logits = new Float32Array(area + 1), ownership = new Float32Array(area);
    for (let p = 0; p < area; p++) { logits[p] = pol[p * ch]!; ownership[p] = Math.tanh(own[p]!); }   // ownership is for the side to move
    logits[area] = pass[0]!;
    return { logits, ownership };
  } finally {
    for (const t of [tS, tG, tM, out.policy, out.policyPass, out.value, out.scoreValue, out.ownership]) t.dispose();
  }
}

self.onmessage = async (e: MessageEvent) => {
  const m = e.data;
  try {
    if (m.type === 'load') {
      loading = loading || load(m.url, m.size || 19);
      await loading;
    } else if (m.type === 'move') {
      await loading;
      const t = performance.now(), r = await evaluate(m.ask);
      say({ type: 'move', id: m.id, logits: r.logits, ownership: r.ownership, ms: Math.round(performance.now() - t) });
    }
  } catch (err) {
    if (m.type === 'load') loading = null;
    say({ type: 'error', id: m.id, message: err instanceof Error ? err.message : String(err) });
  }
};

// Node tool: lists where KataGo's @BIN@ float blocks are in an (ungzipped) .bin model, for halve.py.
import { readFileSync, writeFileSync } from 'node:fs';
import { KataGoBinModelParser } from '../engine/katago/binModelParser';
import { parseKataGoModelV8 } from '../engine/katago/loadModelV8';
const [, , input, output] = process.argv;
const data = new Uint8Array(readFileSync(input!));
const found: [number, number][] = [];
const orig = KataGoBinModelParser.prototype.readBinaryFloats;
KataGoBinModelParser.prototype.readBinaryFloats = function (this: any, count: number) {
  const d: Uint8Array = this.data;
  while (d[this.idx] === 0x20 || d[this.idx] === 0x0a || d[this.idx] === 0x0d || d[this.idx] === 0x09) this.idx++;
  found.push([this.idx, count]);
  return orig.call(this, count);
};
const m = parseKataGoModelV8(data);
writeFileSync(output!, JSON.stringify(found));
console.log(m.modelName, 'version', m.modelVersion, 'meta', m.metaEncoderVersion, 'blocks of floats', found.length, 'floats', found.reduce((s, [, c]) => s + c, 0));

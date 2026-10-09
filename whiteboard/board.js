(() => {
  'use strict';
  const CONFIG = {
    apiKey: 'AIzaSyDf2aZioehr3Owb9bf4gmRjgRii0i5Ctbc',
    authDomain: 'project-0cbb7d36-56e5-441e-8fe.firebaseapp.com',
    databaseURL: 'https://project-0cbb7d36-56e5-441e-8fe-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'project-0cbb7d36-56e5-441e-8fe',
    appId: '1:531740406755:web:fe0ee4c37001a9d4e966d6'
  };
  const $ = id => document.getElementById(id), Ink = BoardInk, Text = BoardText;
  const canvas = $('board'), ctx = canvas.getContext('2d'), overlay = $('overlay').getContext('2d'), grid = $('grid').getContext('2d');
  const base = document.createElement('canvas'), baseCtx = base.getContext('2d');
  const palette = ['#111111', '#5c5f66', '#adb5bd', '#e03131', '#f76707', '#f58c00', '#2f9e44', '#1971c2',
    '#ffe633', '#ffc9c9', '#ffd8a8', '#ffec99', '#b2f2bb', '#a5d8ff', '#d0bfff', '#fcc2d7',
    '#7048e8', '#c2255c', '#0c8599', '#099268', '#74b816', '#e8590c', '#9c36b5', '#3b5bdb'];
  const names = ['Black', 'Grey', 'Silver', 'Red', 'Orange', 'Amber', 'Green', 'Blue', 'Yellow', 'Light red', 'Peach', 'Light yellow',
    'Light green', 'Light blue', 'Lavender', 'Pink', 'Violet', 'Magenta', 'Teal', 'Mint', 'Lime', 'Burnt orange', 'Purple', 'Indigo'];
  const local = new URLSearchParams(location.search).has('local'), uid = () => crypto.randomUUID().replace(/-/g, '');
  const lastRoomKey = 'whiteboard-last-' + (local ? 'local' : 'shared');
  if (!/^[a-f0-9]{32}$/.test(location.hash.slice(1))) {
    let previous; try { previous = localStorage.getItem(lastRoomKey); } catch {}
    history.replaceState(null, '', location.pathname + location.search + '#' + (/^[a-f0-9]{32}$/.test(previous) ? previous : uid()));
  }
  try { localStorage.setItem(lastRoomKey, location.hash.slice(1)); } catch {}
  const room = location.hash.slice(1), cacheKey = 'whiteboard-local-' + room, viewKey = 'whiteboard-view-' + room, historyKey = 'whiteboard-history-' + room;
  const TTL = 24 * 60 * 60 * 1000;
  let sequence = 0;
  const objectId = () => local ? Date.now().toString(36).padStart(10, '0') + '-' + String(sequence++).padStart(6, '0') + '-' + uid().slice(0, 16) : ref.push().key;
  const settings = { pen: { color: palette[0], width: 4, opacity: 1 }, highlight: { color: palette[8], width: 28, opacity: .35 }, text: { color: palette[0], width: 30, opacity: 1 } };
  const view = { x: 0, y: 0, zoom: 1 };
  try {
    const saved = JSON.parse(localStorage.getItem(viewKey));
    if (saved && [saved.x, saved.y, saved.zoom].every(Number.isFinite) && saved.zoom >= 1e-9 && saved.zoom <= 1e9) Object.assign(view, saved);
  } catch {}
  const objects = new Map(), decoded = new WeakMap(), selected = new Set(), touches = new Map();
  let expiry, ref, ready = local, connected = false, failed = false, pending = 0;
  let tool = 'pen', inkTool = 'pen', active = null, gesture = null, pointer = null, editing = null, space = false, pinch = null;
  let historyStack = [], redoStack = [], frame = 0, dirty = true, orderDirty = true, gridDirty = true, persistTimer = 0, viewTimer = 0, ordered = [];
  let screenW = 0, screenH = 0, dpr = 1;
  let settingUndo = null, exporting = false, historyInitialized = false;
  let zoomMotion = null, lastLiveBounds = null;
  const pendingWrites = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(historyKey));
    if (saved && Date.now() - saved.updated < TTL && Array.isArray(saved.undo) && Array.isArray(saved.redo)) { historyStack = saved.undo.slice(-50); redoStack = saved.redo.slice(-50); historyInitialized = true; }
  } catch {}
  function saveHistory() {
    try {
      const data = { updated: Date.now(), undo: historyStack.slice(-50), redo: redoStack.slice(-50) };
      let json = JSON.stringify(data);
      while (json.length > 1500000 && (data.undo.length || data.redo.length)) { if (data.undo.length) data.undo.shift(); else data.redo.shift(); json = JSON.stringify(data); }
      localStorage.setItem(historyKey, json);
    } catch {}
  }
  function seedHistory() {
    if (!historyInitialized) { historyStack = entries().slice(-50).map(([id]) => [[id, { hidden: true }]]); historyInitialized = true; saveHistory(); }
  }
  if (local) try { for (const [id, obj] of Object.entries(JSON.parse(localStorage.getItem(cacheKey) || '{}'))) objects.set(id, obj); } catch {}
  function persistNow() {
    clearTimeout(persistTimer); persistTimer = 0; saveHistory();
    if (local) try { localStorage.setItem(cacheKey, JSON.stringify(Object.fromEntries(objects))); } catch {}
  }
  function persist() { if (local && !persistTimer) persistTimer = setTimeout(persistNow, 400); }
  function status() {
    $('status').textContent = local ? 'On this device' : failed ? 'Sharing unavailable' : !ready ? 'Connecting…' : !connected ? 'Offline · changes waiting' : pending ? 'Saving…' : 'Live · saved';
    $('export-pdf').disabled = !ready || exporting;
    $('status').className = 'sr-only' + (failed ? ' error' : connected ? ' live' : '');
    if (ready && connected) $('message').hidden = true;
  }
  function fail(error) {
    failed = true; status();
    $('message').textContent = /permission/i.test(error.message || String(error)) ? 'Shared access needs updating for this version.' : 'Cannot reach the shared board. Check your connection and reload.';
    $('message').hidden = false; console.error('Whiteboard:', error);
  }
  function track(promise) { pendingWrites.add(promise); pending++; status(); promise.then(() => { pendingWrites.delete(promise); pending--; status(); }, error => { pendingWrites.delete(promise); pending--; fail(error); }); }
  function renderSoon() { if (!frame) frame = requestAnimationFrame(time => { frame = 0; animateZoom(time); render(); if (zoomMotion) renderSoon(); }); }
  function changed() { dirty = orderDirty = true; renderSoon(); persist(); }
  function world(e) { return [view.x + e.clientX / view.zoom, view.y + e.clientY / view.zoom]; }
  function screen(p) { return [(p[0] - view.x) * view.zoom, (p[1] - view.y) * view.zoom]; }
  function transform(out) { out.setTransform(dpr * view.zoom, 0, 0, dpr * view.zoom, -view.x * dpr * view.zoom, -view.y * dpr * view.zoom); }
  function clear(out) { out.setTransform(1, 0, 0, 1, 0, 0); out.clearRect(0, 0, out.canvas.width, out.canvas.height); }
  function cameraChanged() {
    dirty = gridDirty = true; renderSoon(); setHint();
    canvas.dataset.zoom = String(view.zoom); canvas.dataset.viewX = String(view.x); canvas.dataset.viewY = String(view.y);
    clearTimeout(viewTimer); viewTimer = setTimeout(() => { try { localStorage.setItem(viewKey, JSON.stringify(view)); } catch {} }, 250);
  }
  function zoomAt(factor, at = [screenW / 2, screenH / 2]) {
    zoomMotion = { at, anchor: [view.x + at[0] / view.zoom, view.y + at[1] / view.zoom],
      target: Math.max(1e-9, Math.min(1e9, (zoomMotion?.target || view.zoom) * factor)), last: performance.now() - 16 };
    renderSoon();
  }
  function animateZoom(time) {
    if (!zoomMotion) return;
    const m = zoomMotion, alpha = 1 - Math.exp(-Math.min(40, Math.max(1, time - m.last)) / 38);
    const remaining = Math.log(m.target / view.zoom);
    view.zoom = Math.abs(remaining) < .0005 ? m.target : view.zoom * Math.exp(remaining * alpha);
    view.x = m.anchor[0] - m.at[0] / view.zoom; view.y = m.anchor[1] - m.at[1] / view.zoom;
    m.last = time; if (view.zoom === m.target) zoomMotion = null;
    cameraChanged();
  }
  function fit() {
    zoomMotion = null;
    const all = entries();
    if (!all.length) Object.assign(view, { x: 0, y: 0, zoom: 1 });
    else {
      const b = pointBounds(all.flatMap(([id, obj]) => { const b = boundsFor(id, obj); return [[b[0], b[1]], [b[2], b[3]]]; }));
      view.zoom = Math.max(1e-9, Math.min(4, (screenW - 140) / Math.max(1, b[2] - b[0]), (screenH - 100) / Math.max(1, b[3] - b[1])));
      view.x = (b[0] + b[2]) / 2 - screenW / 2 / view.zoom; view.y = (b[1] + b[3]) / 2 - screenH / 2 / view.zoom;
    }
    cameraChanged();
  }
  function sizeCanvases() {
    zoomMotion = null; lastLiveBounds = null;
    screenW = innerWidth; screenH = innerHeight; dpr = devicePixelRatio || 1;
    for (const c of [canvas, $('overlay'), $('grid'), base]) { c.width = Math.round(screenW * dpr); c.height = Math.round(screenH * dpr); }
    cameraChanged(); placeOptions();
  }
  function drawGrid() {
    clear(grid); grid.setTransform(dpr, 0, 0, dpr, 0, 0);
    const step = 64 * 2 ** Math.floor(Math.log2(96 / (64 * view.zoom))), spacing = step * view.zoom;
    $('grid').dataset.step = String(step); $('grid').dataset.spacing = String(spacing);
    const firstX = -((view.x % step + step) % step) * view.zoom, firstY = -((view.y % step + step) % step) * view.zoom;
    // Loop in screen-sized increments even when world coordinates are enormous.
    for (let ix = 0; ix <= Math.ceil(screenW / spacing) + 1; ix++) {
      const x = firstX + ix * spacing;
      for (let iy = 0; iy <= Math.ceil(screenH / spacing) + 1; iy++) {
        const y = firstY + iy * spacing;
        grid.fillStyle = '#afb9c5'; grid.beginPath(); grid.arc(x, y, 1.2, 0, Math.PI * 2); grid.fill();
      }
    }
    gridDirty = false;
  }
  function pointBounds(pts, padding = 0) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return [x0 - padding, y0 - padding, x1 + padding, y1 + padding];
  }
  function geometry(obj) {
    if (decoded.has(obj)) return decoded.get(obj);
    const g = obj.kind === 'text' ? Text.layout(obj, ctx) : (() => {
      const pts = Ink.decode(obj.chunks), origin = pts[0] || [0, 0], bounds = pointBounds(pts);
      const unit = Math.max(bounds[2] - bounds[0], bounds[3] - bounds[1]) / 1024 || 1;
      return { pts, origin, unit, path: Ink.path(pts, origin, unit), bounds };
    })();
    decoded.set(obj, g); return g;
  }
  function isVisible(obj) { return obj && !obj.hidden && ['pen', 'highlight', 'text'].includes(obj.kind); }
  function entries() {
    if (orderDirty) { ordered = [...objects.entries()].filter(([, obj]) => isVisible(obj)).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0); orderDirty = false; }
    return ordered;
  }
  function effective(id, obj) { return gesture?.kind === 'resize' && gesture.id === id ? gesture.preview : obj; }
  function offset(id, obj) {
    if (gesture?.kind === 'move' && gesture.origins.has(id)) { const original = gesture.origins.get(id); return [original.dx + gesture.delta[0], original.dy + gesture.delta[1]]; }
    return [obj.dx || 0, obj.dy || 0];
  }
  function boundsFor(id, obj) {
    obj = effective(id, obj); const [dx, dy] = offset(id, obj), b = geometry(obj).bounds;
    const pad = obj.kind === 'text' ? 0 : obj.width / view.zoom / 2;
    return [b[0] + dx - pad, b[1] + dy - pad, b[2] + dx + pad, b[3] + dy + pad];
  }
  function onScreen(b) { return b[2] >= view.x && b[3] >= view.y && b[0] <= view.x + screenW / view.zoom && b[1] <= view.y + screenH / view.zoom; }
  function draw(out, obj, delta, stroke) {
    out.save(); out.translate(...delta); out.fillStyle = out.strokeStyle = obj.color; out.globalAlpha = obj.opacity;
    if (obj.kind === 'text') {
      const g = geometry(obj); out.translate(obj.x, obj.y); out.scale(obj.width / 30, obj.width / 30);
      out.font = `30px ${Text.FONT}`; out.textBaseline = 'alphabetic';
      g.lines.forEach((line, i) => out.fillText(line, 4, 4 + g.baseline + i * 39));
    } else {
      const g = stroke ? { pts: stroke.points, origin: stroke.origin, unit: stroke.unit, path: stroke.livePath() } : geometry(obj);
      out.translate(...g.origin); out.scale(g.unit, g.unit);
      // Ink widths are screen pixels; zoom changes positions, never thickness.
      out.lineWidth = obj.width / view.zoom / g.unit; out.lineCap = out.lineJoin = 'round';
      if (g.pts.length === 1 && (!stroke || Ink.distance(stroke.tip, g.pts[0]) < .001 / view.zoom)) {
        out.beginPath(); out.arc(0, 0, out.lineWidth / 2, 0, Math.PI * 2); out.fill();
      } else out.stroke(g.path);
    }
    out.restore();
  }
  function floating(id) { return active?.id === id || editing?.id === id || gesture?.kind === 'move' && selected.has(id) || gesture?.kind === 'resize' && gesture.id === id; }
  function liveBounds() {
    const b = active.stroke.bounds, a = screen([b[0], b[1]]), z = screen([b[2], b[3]]);
    const pad = active.obj.width / 2 + active.stroke.maxGap * view.zoom / 3 + 3;
    return [a[0] - pad, a[1] - pad, z[0] + pad, z[1] + pad];
  }
  function render() {
    if (gridDirty) drawGrid();
    const all = entries(), full = dirty || ['move', 'resize'].includes(gesture?.kind);
    if (dirty) {
      clear(baseCtx); transform(baseCtx);
      for (const highlight of [true, false]) for (const [id, obj] of all) {
        if ((obj.kind === 'highlight') !== highlight || floating(id) || !onScreen(boundsFor(id, obj))) continue;
        draw(baseCtx, obj, [obj.dx || 0, obj.dy || 0]);
      }
      dirty = false;
    }
    if (full) { clear(ctx); ctx.drawImage(base, 0, 0); lastLiveBounds = null; }
    else if (active) {
      const b = liveBounds(), old = lastLiveBounds || b;
      const x = Math.floor(Math.max(0, Math.min(b[0], old[0])) * dpr), y = Math.floor(Math.max(0, Math.min(b[1], old[1])) * dpr);
      const w = Math.max(0, Math.ceil(Math.min(screenW, Math.max(b[2], old[2])) * dpr) - x), h = Math.max(0, Math.ceil(Math.min(screenH, Math.max(b[3], old[3])) * dpr) - y);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (w && h) { ctx.clearRect(x, y, w, h); ctx.drawImage(base, x, y, w, h, x, y, w, h); }
    }
    transform(ctx);
    if (active && !objects.get(active.id)?.hidden) {
      ctx.save(); if (active.obj.kind === 'highlight') ctx.globalCompositeOperation = 'destination-over';
      draw(ctx, active.obj, [0, 0], active.stroke); ctx.restore();
      lastLiveBounds = liveBounds();
    }
    if (gesture?.kind === 'move' || gesture?.kind === 'resize') for (const highlight of [true, false]) for (const [id, original] of all) {
      if (!floating(id) || (original.kind === 'highlight') !== highlight || editing?.id === id || active?.id === id) continue;
      const obj = effective(id, original); ctx.save(); if (highlight) ctx.globalCompositeOperation = 'destination-over'; draw(ctx, obj, offset(id, obj)); ctx.restore();
    }
    drawSelection(); layoutEditor();
    $('selection-actions').hidden = selected.size === 0;
    const count = `${selected.size} selected`; if ($('selection-count').textContent !== count) $('selection-count').textContent = count;
  }
  function selectedText() {
    if (selected.size !== 1) return null;
    const id = [...selected][0], obj = objects.get(id); return isVisible(obj) && obj.kind === 'text' ? [id, effective(id, obj)] : null;
  }
  function drawSelection() {
    clear(overlay); transform(overlay);
    overlay.strokeStyle = '#367acc'; overlay.fillStyle = '#367acc12'; overlay.lineWidth = 1 / view.zoom;
    for (const id of selected) {
      const obj = objects.get(id); if (!isVisible(obj)) { selected.delete(id); continue; }
      if (editing?.id === id) continue;
      const b = boundsFor(id, obj), padding = obj.kind === 'text' ? 0 : 4 / view.zoom;
      overlay.setLineDash(obj.kind === 'text' ? [] : [5 / view.zoom, 4 / view.zoom]);
      overlay.strokeRect(b[0] - padding, b[1] - padding, b[2] - b[0] + 2 * padding, b[3] - b[1] + 2 * padding);
    }
    const text = selectedText();
    if (text && !editing) {
      overlay.setLineDash([]); overlay.fillStyle = '#fff';
      const b = boundsFor(...text);
      for (const [handle, p] of Object.entries(Text.handles(b, view.zoom))) {
        if (handle === 'scale') {
          overlay.beginPath(); overlay.moveTo(b[2] + 4 / view.zoom, b[3] + 4 / view.zoom); overlay.lineTo(p[0], p[1]); overlay.stroke();
          overlay.beginPath(); overlay.arc(...p, 6 / view.zoom, 0, Math.PI * 2); overlay.fill(); overlay.stroke();
          overlay.beginPath(); overlay.moveTo(p[0] - 2 / view.zoom, p[1] - 2 / view.zoom); overlay.lineTo(p[0] + 2 / view.zoom, p[1] + 2 / view.zoom); overlay.moveTo(p[0] + 2 / view.zoom, p[1] - 1 / view.zoom); overlay.lineTo(p[0] + 2 / view.zoom, p[1] + 2 / view.zoom); overlay.lineTo(p[0] - 1 / view.zoom, p[1] + 2 / view.zoom); overlay.stroke();
        } else {
          const r = 3.5 / view.zoom; overlay.fillRect(p[0] - r, p[1] - r, r * 2, r * 2); overlay.strokeRect(p[0] - r, p[1] - r, r * 2, r * 2);
        }
      }
    }
    overlay.fillStyle = '#367acc12'; overlay.setLineDash([5 / view.zoom, 4 / view.zoom]);
    if (gesture?.kind === 'rect' || gesture?.kind === 'textBox') {
      const b = pointBounds([gesture.start, gesture.end]); overlay.fillRect(b[0], b[1], b[2] - b[0], b[3] - b[1]); overlay.strokeRect(b[0], b[1], b[2] - b[0], b[3] - b[1]);
    } else if (gesture?.kind === 'lasso') {
      overlay.beginPath(); gesture.points.forEach((p, i) => i ? overlay.lineTo(...p) : overlay.moveTo(...p)); overlay.closePath(); overlay.fill(); overlay.stroke();
    }
  }
  function remember(action) { historyStack.push(action); if (historyStack.length > 50) historyStack.shift(); redoStack = []; historyInitialized = true; saveHistory(); }
  function write(id, obj) { objects.set(id, obj); changed(); if (!local) track(ref.child(id).set(obj)); }
  function patchMany(updates, record = true) {
    const before = [], wire = {};
    for (const [id, update] of updates) {
      const old = objects.get(id);
      // Deleted objects stay in local undo history, never in Firebase.
      if ('$object' in update || update.hidden === true) {
        const next = update.hidden === true ? null : update.$object;
        if (!old && !next) continue;
        before.push([id, { $object: old || null }]);
        if (next) objects.set(id, next); else { objects.delete(id); selected.delete(id); }
        wire[id] = next; continue;
      }
      if (!old) continue;
      const next = { ...old }, patch = {}, inverse = {};
      for (const [key, value] of Object.entries(update)) {
        if ((old[key] ?? null) === value) continue;
        inverse[key] = old[key] ?? null; patch[key] = value;
        if (value === null) delete next[key]; else next[key] = value;
        wire[id + '/' + key] = value;
      }
      if (Object.keys(patch).length) { before.push([id, inverse]); objects.set(id, next); }
    }
    if (before.length) { if (record) remember(before); changed(); if (!local) track(ref.update(wire)); }
    return before;
  }
  function flush(final = false) {
    if (!active) return;
    const values = Ink.chunks(active.stroke.pending(final)), wire = {}, old = objects.get(active.id);
    if (!values.length || !old) return;
    const chunks = { ...old.chunks };
    for (const value of values) { const key = String(active.chunk++).padStart(6, '0'); chunks[key] = value; wire[key] = value; }
    objects.set(active.id, { ...old, chunks });
    if (!local) track(ref.child(active.id).child('chunks').update(wire)); persist();
  }
  function geometryPatch(obj) { return Object.fromEntries(['x', 'y', 'dx', 'dy', 'width', 'boxW', 'boxH'].map(key => [key, obj[key] ?? null])); }
  function moveUpdates() { return [...gesture.origins].map(([id, original]) => [id, { dx: original.dx + gesture.delta[0], dy: original.dy + gesture.delta[1] }]); }
  function sendGesture() {
    if (!gesture?.changed) return;
    if (gesture.kind === 'move') patchMany(moveUpdates(), false);
    else if (gesture.kind === 'resize') patchMany([[gesture.id, geometryPatch(gesture.preview)]], false);
    gesture.changed = false;
  }
  function finish(cancel = false) {
    const done = gesture;
    if (cancel && done?.kind.startsWith('edit') && editing) editing.obj = done.original;
    if (active) {
      clearInterval(active.timer);
      if (cancel) {
        const id = active.id; active = null; patchMany([[id, { hidden: true }]], false);
        if (historyStack.at(-1)?.[0]?.[0] === id) historyStack.pop();
      } else { active.stroke.finish(); flush(true); active = null; }
      dirty = orderDirty = true; lastLiveBounds = null;
    }
    if (done?.kind === 'move' || done?.kind === 'resize') {
      clearInterval(done.timer);
      const originals = done.kind === 'move' ? [...done.origins] : [[done.id, geometryPatch(done.original)]];
      if (cancel) patchMany(originals, false);
      else {
        sendGesture();
        if (done.changedOnce) remember(originals);
      }
      dirty = true;
    } else if (done && !cancel && ['rect', 'lasso'].includes(done.kind)) completeSelection();
    else if (done?.kind === 'textBox' && !cancel) {
      const b = pointBounds([done.start, done.end]);
      const fixed = (b[2] - b[0]) * view.zoom > 6 && (b[3] - b[1]) * view.zoom > 6;
      beginText(null, { kind: 'text', ...settings.text, width: settings.text.width / view.zoom, x: fixed ? b[0] : done.start[0], y: fixed ? b[1] : done.start[1], text: '', ...(fixed ? { boxW: Math.max((settings.text.width * 1.5 + 8) / view.zoom, b[2] - b[0]), boxH: b[3] - b[1] } : {}) });
    }
    if (done?.kind === 'erase' && done.undo.length) { if (cancel) patchMany(done.undo, false); else remember(done.undo); }
    gesture = null; pointer = null; persistNow(); setHint(); renderSoon();
  }
  function segmentDistance(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = dx * dx + dy * dy;
    const t = len ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len)) : 0;
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  }
  function inside(p, b, pad = 0) { return p[0] >= b[0] - pad && p[0] <= b[2] + pad && p[1] >= b[1] - pad && p[1] <= b[3] + pad; }
  function hitAt(p, radius = 5 / view.zoom) {
    for (const [id, obj] of [...entries()].reverse()) {
      if (!inside(p, boundsFor(id, obj), radius)) continue;
      if (obj.kind === 'text') return id;
      const pts = geometry(obj).pts, [dx, dy] = offset(id, obj), q = [p[0] - dx, p[1] - dy];
      if (pts.some((point, i) => segmentDistance(q, i ? pts[i - 1] : point, point) <= radius + obj.width / view.zoom / 2)) return id;
    }
    return null;
  }
  function handleAt(p, touch = false) {
    const text = selectedText(); if (!text) return null;
    for (const [handle, q] of Object.entries(Text.handles(boundsFor(...text), view.zoom))) if (Ink.distance(p, q) * view.zoom <= (touch ? 13 : 8)) return { id: text[0], handle };
    return null;
  }
  function eraseAt(p) {
    const id = hitAt(p, 10 / view.zoom);
    if (id) { gesture.undo.push(...patchMany([[id, { hidden: true }]], false)); selected.delete(id); }
  }
  function pointInPolygon(p, polygon) {
    let result = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i], b = polygon[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) result = !result;
    }
    return result;
  }
  function crosses(a, b, c, d) {
    const cross = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
    const u = cross(a, b, c), v = cross(a, b, d), s = cross(c, d, a), t = cross(c, d, b);
    if (u === 0 && v === 0 && s === 0 && t === 0) return Math.max(Math.min(a[0], b[0]), Math.min(c[0], d[0])) <= Math.min(Math.max(a[0], b[0]), Math.max(c[0], d[0])) && Math.max(Math.min(a[1], b[1]), Math.min(c[1], d[1])) <= Math.min(Math.max(a[1], b[1]), Math.max(c[1], d[1]));
    return u * v <= 0 && s * t <= 0;
  }
  function completeSelection() {
    const rectangle = gesture.kind === 'rect', area = pointBounds(rectangle ? [gesture.start, gesture.end] : gesture.points);
    const polygon = rectangle ? null : gesture.points;
    if (!rectangle && polygon.length < 3) { tool = 'select'; updateToolUI(); return; }
    const contains = p => pointInPolygon(p, polygon) || polygon.some((q, i) => segmentDistance(p, q, polygon[(i + 1) % polygon.length]) < .001 / view.zoom);
    for (const [id, obj] of entries()) {
      const b = boundsFor(id, obj);
      if (b[0] < area[0] || b[1] < area[1] || b[2] > area[2] || b[3] > area[3]) continue;
      if (rectangle) { selected.add(id); continue; }
      const [dx, dy] = offset(id, obj);
      const pts = obj.kind === 'text' ? [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]], [b[0], b[1]]] : geometry(obj).pts.map(([x, y]) => [x + dx, y + dy]);
      if (!pts.every(contains)) continue;
      const edges = pts.slice(1).map((p, i) => [pts[i], p]);
      const crossing = edges.some(([a, b]) => polygon.some((c, j) => crosses(a, b, c, polygon[(j + 1) % polygon.length])));
      if (crossing) continue;
      const radius = obj.kind === 'text' ? 0 : obj.width / view.zoom / 2;
      if (radius && !pts.every(p => [[radius, 0], [-radius, 0], [0, radius], [0, -radius]].every(d => contains([p[0] + d[0], p[1] + d[1]])))) continue;
      selected.add(id);
    }
    tool = 'select'; updateToolUI();
  }
  function beginText(id, obj) {
    editing = { id, original: obj, obj: { ...obj }, autoWidth: obj.boxW == null, displayWidth: obj.boxW || 0 }; selected.clear(); if (id) selected.add(id);
    $('text-edit').hidden = false; $('editor').value = obj.text; dirty = true; layoutEditor(); renderSoon();
    $('editor').focus({ preventScroll: true }); $('editor').setSelectionRange(obj.text.length, obj.text.length);
  }
  function layoutEditor() {
    if (!editing) return;
    const obj = editing.obj, natural = Text.layout(obj, ctx), p = screen([obj.x + (obj.dx || 0), obj.y + (obj.dy || 0)]);
    const frame = $('text-edit'), editor = $('editor');
    const available = Math.max(160, screenW - p[0] - 100) / view.zoom;
    editing.displayWidth = editing.autoWidth ? Math.min(available, Math.max(editing.displayWidth, 160 / view.zoom, (Math.ceil(natural.width * view.zoom) + 12) / view.zoom)) : natural.width;
    const g = editing.autoWidth ? Text.layout({ ...obj, boxW: editing.displayWidth }, ctx) : natural;
    frame.style.left = p[0] + 'px'; frame.style.top = p[1] + 'px'; frame.style.width = editing.displayWidth * view.zoom + 'px'; frame.style.height = g.height * view.zoom + 'px';
    editor.style.fontSize = obj.width * view.zoom + 'px'; editor.style.color = obj.color; editor.style.opacity = obj.opacity;
    editor.style.padding = Text.padding(obj) * view.zoom + 'px'; editor.style.whiteSpace = 'pre-wrap';
    editor.scrollLeft = 0;
  }
  function commitText(cancel = false) {
    if (!editing) return;
    const edit = editing; editing = null; $('text-edit').hidden = true; $('editor').blur();
    if (!cancel && ready) {
      const obj = { ...edit.obj, text: $('editor').value, ...(edit.autoWidth ? { boxW: edit.displayWidth } : {}) };
      if (edit.id) {
        if (!obj.text.trim()) { patchMany([[edit.id, { hidden: true }]]); selected.clear(); }
        else {
          const patch = {}; for (const key of new Set([...Object.keys(edit.original), ...Object.keys(obj)])) if (edit.original[key] !== obj[key]) patch[key] = obj[key] ?? null;
          patchMany([[edit.id, patch]]);
        }
      } else if (obj.text.trim()) {
        const id = objectId(); write(id, obj); remember([[id, { hidden: true }]]); selected.add(id);
      }
    }
    dirty = true; persistNow(); renderSoon();
  }
  Text.bindLists($('editor'));
  $('editor').addEventListener('input', () => { if (editing) { editing.obj = { ...editing.obj, text: $('editor').value }; layoutEditor(); } });
  $('editor').addEventListener('scroll', () => { if ($('editor').scrollLeft) $('editor').scrollLeft = 0; });
  $('editor').addEventListener('blur', () => { queueMicrotask(() => { if (editing && !gesture?.kind.startsWith('edit') && !document.activeElement.closest('#text-edit, #options, #toolbar')) commitText(); }); });
  $('text-edit').addEventListener('pointerdown', e => {
    const handle = e.target.dataset.handle || e.target.dataset.edge;
    if (!editing || e.button !== 0 || !handle) return;
    e.preventDefault(); e.stopPropagation(); hideOptions(); pointer = e.pointerId; e.target.setPointerCapture(pointer);
    if (editing.autoWidth) { editing.obj = { ...editing.obj, boxW: editing.displayWidth }; editing.autoWidth = false; }
    const obj = editing.obj, b = Text.layout(obj, ctx).bounds.map((v, i) => v + (i % 2 ? obj.dy || 0 : obj.dx || 0));
    gesture = { kind: 'editResize', handle, start: world(e), anchor: Text.handles(b, view.zoom)[handle], original: { ...obj } };
  });
  function startMove(p) {
    const origins = new Map([...selected].map(id => { const obj = objects.get(id); return [id, { dx: obj.dx || 0, dy: obj.dy || 0 }]; }));
    gesture = { kind: 'move', start: p, delta: [0, 0], origins, timer: setInterval(sendGesture, 100) }; dirty = true;
  }
  function startResize(id, handle, p) {
    const original = objects.get(id); gesture = { kind: 'resize', id, handle, start: p, anchor: Text.handles(boundsFor(id, original), view.zoom)[handle], original, preview: original, timer: setInterval(sendGesture, 100) }; dirty = true;
  }
  function touchState() {
    const p = [...touches.values()].slice(0, 2); return { centre: [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2], distance: Math.max(1, Ink.distance(...p)) };
  }
  function startPointer(e) {
    if (![0, 1].includes(e.button)) return;
    e.preventDefault();
    if (e.pointerType === 'touch') {
      touches.set(e.pointerId, [e.clientX, e.clientY]); canvas.setPointerCapture(e.pointerId);
      if (touches.size === 2) { finish(true); commitText(); zoomMotion = null; const s = touchState(); pinch = { ...s, zoom: view.zoom, anchor: [view.x + s.centre[0] / view.zoom, view.y + s.centre[1] / view.zoom] }; return; }
      if (pinch || touches.size > 2) return;
    }
    if (pointer !== null) return;
    hideOptions(); commitText();
    if (['INPUT', 'BUTTON'].includes(document.activeElement.tagName)) document.activeElement.blur();
    zoomMotion = null;
    const p = world(e); pointer = e.pointerId; canvas.setPointerCapture(pointer);
    if (space || tool === 'hand' || e.button === 1 && tool !== 'select') { gesture = { kind: 'pan', start: [e.clientX, e.clientY], view: { ...view } }; setHint(); return; }
    if (expiry?.expired()) { pointer = null; expiry.clear().catch(fail); return; }
    if (!ready) { pointer = null; $('message').textContent = 'Connecting…'; $('message').hidden = false; return; }
    const freehand = e.button === 1 && tool === 'select' || tool === 'lasso', selecting = freehand || tool === 'select';
    const handle = !freehand && ['select', 'text'].includes(tool) ? handleAt(p, e.pointerType === 'touch') : null;
    if (handle) { startResize(handle.id, handle.handle, p); renderSoon(); return; }
    if (tool === 'text' && !freehand) {
      const hit = hitAt(p), obj = objects.get(hit);
      if (obj?.kind === 'text') {
        const b = boundsFor(hit, obj), onBorder = !inside(p, [b[0] + 5 / view.zoom, b[1] + 5 / view.zoom, b[2] - 5 / view.zoom, b[3] - 5 / view.zoom]);
        if (onBorder) { selected.clear(); selected.add(hit); startMove(p); }
        else { pointer = null; beginText(hit, obj); }
      } else { selected.clear(); gesture = { kind: 'textBox', start: p, end: p }; }
      renderSoon(); return;
    }
    if (selecting) {
      const hit = freehand ? null : hitAt(p);
      if (!e.shiftKey && (!hit || !selected.has(hit))) selected.clear();
      if (hit) { selected.add(hit); startMove(p); }
      else gesture = freehand ? { kind: 'lasso', points: [p] } : { kind: 'rect', start: p, end: p };
      renderSoon(); return;
    }
    selected.clear();
    if (tool === 'erase') { gesture = { kind: 'erase', last: p, undo: [] }; eraseAt(p); renderSoon(); return; }
    const id = objectId(), obj = { kind: tool, ...settings[tool], width: settings[tool].width, chunks: { '000000': Ink.chunks([p])[0] } };
    active = { id, obj, stroke: new Ink.Stroke(p, view.zoom), chunk: 1, timer: setInterval(flush, 80) };
    write(id, obj); remember([[id, { hidden: true }]]);
  }
  canvas.addEventListener('pointerdown', startPointer);
  $('paper').addEventListener('pointerdown', e => { if (e.button === 1 && e.target !== canvas) { e.stopPropagation(); startPointer(e); } }, { capture: true });
  function movePointer(e) {
    if (e.pointerId !== pointer) return;
    if (gesture?.kind === 'pan') {
      view.x = gesture.view.x - (e.clientX - gesture.start[0]) / view.zoom; view.y = gesture.view.y - (e.clientY - gesture.start[1]) / view.zoom; cameraChanged(); return;
    }
    const events = e.getCoalescedEvents?.();
    for (const event of events?.length ? events : [e]) {
      const p = world(event);
      if (gesture?.kind === 'rect' || gesture?.kind === 'textBox') gesture.end = p;
      else if (gesture?.kind === 'lasso') { if (Ink.distance(p, gesture.points.at(-1)) * view.zoom >= 2) gesture.points.push(p); }
      else if (gesture?.kind === 'move') { gesture.delta = [p[0] - gesture.start[0], p[1] - gesture.start[1]]; gesture.changed = true; gesture.changedOnce ||= gesture.delta.some(Boolean); }
      else if (gesture?.kind === 'resize') {
        if (Ink.distance(p, gesture.start) * view.zoom > .5 || gesture.changedOnce) {
          const at = gesture.anchor.map((v, i) => v + p[i] - gesture.start[i]);
          gesture.preview = Text.resize(gesture.original, gesture.handle, at, ctx, view.zoom); gesture.changed = gesture.changedOnce = true;
        }
      }
      else if (gesture?.kind === 'editMove' && editing) {
        editing.obj = { ...gesture.original, dx: (gesture.original.dx || 0) + p[0] - gesture.start[0], dy: (gesture.original.dy || 0) + p[1] - gesture.start[1] };
      } else if (gesture?.kind === 'editResize' && editing) {
        const at = gesture.anchor.map((v, i) => v + p[i] - gesture.start[i]); editing.obj = Text.resize(gesture.original, gesture.handle, at, ctx, view.zoom);
      }
      else if (gesture?.kind === 'erase') {
        const a = gesture.last, steps = Math.min(1000, Math.max(1, Math.ceil(Ink.distance(p, a) * view.zoom / 6)));
        for (let i = 1; i <= steps; i++) eraseAt([a[0] + (p[0] - a[0]) * i / steps, a[1] + (p[1] - a[1]) * i / steps]); gesture.last = p;
      } else if (active) active.stroke.add(p);
    }
    renderSoon();
  }
  addEventListener('pointermove', e => {
    if (touches.has(e.pointerId)) {
      touches.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch) {
        if (touches.size >= 2) { const s = touchState(); view.zoom = Math.max(1e-9, Math.min(1e9, pinch.zoom * s.distance / pinch.distance)); view.x = pinch.anchor[0] - s.centre[0] / view.zoom; view.y = pinch.anchor[1] - s.centre[1] / view.zoom; cameraChanged(); }
        return;
      }
    }
    movePointer(e);
    if (pointer === null && e.target === canvas && !editing) {
      const handle = ['select', 'text'].includes(tool) && handleAt(world(e));
      canvas.style.cursor = space || tool === 'hand' ? 'grab' : handle ? Text.cursor(handle.handle) : tool === 'text' ? 'text' : tool === 'select' ? hitAt(world(e)) ? 'move' : 'default' : 'crosshair';
    }
  });
  function endPointer(e, cancel = false) {
    touches.delete(e.pointerId);
    if (pinch) { if (!touches.size) pinch = null; return; }
    if (e.pointerId === pointer) { if (!cancel) movePointer(e); finish(cancel); }
  }
  addEventListener('pointerup', e => endPointer(e)); addEventListener('pointercancel', e => endPointer(e, true));
  canvas.addEventListener('lostpointercapture', e => { if (e.pointerId === pointer) finish(true); touches.delete(e.pointerId); if (!touches.size) pinch = null; });
  canvas.addEventListener('auxclick', e => e.preventDefault()); canvas.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });
  canvas.addEventListener('dblclick', e => { if (!['text', 'select'].includes(tool)) return; const id = hitAt(world(e)), obj = objects.get(id); if (obj?.kind === 'text') { finish(); tool = 'text'; updateToolUI(); beginText(id, obj); } });
  $('paper').addEventListener('wheel', e => {
    e.preventDefault(); if (active || gesture) return;
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? screenH : 1;
    zoomAt(Math.exp(-Math.max(-500, Math.min(500, e.deltaY * unit)) * .002), [e.clientX, e.clientY]);
  }, { passive: false });
  function setHint() { canvas.style.cursor = gesture?.kind === 'pan' ? 'grabbing' : space || tool === 'hand' ? 'grab' : tool === 'text' ? 'text' : tool === 'select' ? 'default' : 'crosshair'; }
  function updateToolUI() { document.querySelectorAll('[data-tool]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tool === tool || button.dataset.tool === 'select' && tool === 'lasso'))); setHint(); }
  function selectTool(next, preserve = false) {
    finish(); if (next !== 'text') commitText(); tool = next;
    if (settings[next]) { inkTool = next; if (!preserve) selected.clear(); updateSettingsUI(); }
    updateToolUI(); renderSoon();
  }
  const widthSteps = () => inkTool === 'text' ? [8,12,16,20,24,30,36,48,60,72,96,128,192,256,384,512] : [1,2,3,4,6,8,12,16,24,28,32,48,64,80];
  function updateSettingsUI() {
    const ink = settings[inkTool]; $('custom-color').value = ink.color;
    const widths = widthSteps(); $('width').max = widths.length - 1;
    $('width').value = widths.reduce((best, value, i) => Math.abs(value - ink.width) < Math.abs(widths[best] - ink.width) ? i : best, 0);
    if ($('width-value').readOnly) $('width-value').value = String(ink.width);
    $('width-label').textContent = inkTool === 'text' ? 'Text size' : 'Width';
    $('opacity').value = Math.round(ink.opacity * 100); if ($('opacity-value').readOnly) $('opacity-value').value = Number((ink.opacity * 100).toFixed(8)) + '%';
    document.querySelectorAll('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === ink.color)));
    for (const name of Object.keys(settings)) document.querySelector(`[data-tool="${name}"]`).style.setProperty('--ink', settings[name].color);
  }
  function stylePatch(obj, key, value) {
    if (key === 'width' && obj.kind === 'text') value /= view.zoom;
    if (key === 'width' && obj.kind === 'text') {
      const g = geometry(obj), scale = value / obj.width; return { width: value, ...(obj.boxW != null ? { boxW: g.width * scale, boxH: g.height * scale } : {}) };
    }
    return { [key]: value };
  }
  function changeSetting(key, value, commit = true) {
    settings[inkTool][key] = value; updateSettingsUI();
    if (editing) { editing.obj = { ...editing.obj, ...stylePatch(editing.obj, key, value) }; layoutEditor(); }
    else if (selected.size && ready) {
      if (settingUndo && settingUndo.key !== key) finishSetting();
      const updates = [...selected].map(id => [id, stylePatch(objects.get(id), key, value)]);
      if (!commit || settingUndo) {
        settingUndo ||= { key, originals: new Map() };
        for (const [id, inverse] of patchMany(updates, false)) {
          const original = settingUndo.originals.get(id) || {};
          for (const [name, before] of Object.entries(inverse)) if (!(name in original)) original[name] = before;
          settingUndo.originals.set(id, original);
        }
        if (commit) finishSetting();
      } else patchMany(updates);
    }
  }
  function finishSetting() {
    if (!settingUndo) return;
    const action = [...settingUndo.originals].filter(([id, patch]) => Object.entries(patch).some(([key, value]) => (objects.get(id)?.[key] ?? null) !== value));
    settingUndo = null; if (action.length) remember(action);
  }
  palette.forEach((color, i) => { const b = document.createElement('button'); b.className = 'swatch'; b.dataset.color = color; b.style.setProperty('--ink', color); b.title = names[i]; b.setAttribute('aria-label', names[i]); b.onclick = () => changeSetting('color', color); $('colors').append(b); });
  $('custom-color').oninput = e => changeSetting('color', e.target.value, false); $('custom-color').onchange = e => changeSetting('color', e.target.value);
  for (const key of ['width', 'opacity']) {
    $(key).oninput = e => changeSetting(key, key === 'opacity' ? Number(e.target.value) / 100 : widthSteps()[Number(e.target.value)], false);
    $(key).onchange = e => changeSetting(key, key === 'opacity' ? Number(e.target.value) / 100 : widthSteps()[Number(e.target.value)]);
  }
  for (const key of ['width', 'opacity']) {
    const input = $(key + '-value');
    const commit = () => {
      if (input.readOnly) return;
      const value = Number(input.value.trim().replace(/(?:%|px)$/i, '').trim());
      input.readOnly = true;
      if (input.value.trim() && Number.isFinite(value) && (key === 'width' ? value > 0 && value <= 1e15 : value >= 0 && value <= 100)) changeSetting(key, key === 'opacity' ? value / 100 : value);
      updateSettingsUI();
    };
    input.onclick = () => { if (input.readOnly) { input.readOnly = false; input.focus(); input.select(); } };
    input.onblur = commit;
    input.onkeydown = e => {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); commit(); input.blur(); }
      if (e.key === 'Escape') { e.preventDefault(); input.readOnly = true; updateSettingsUI(); input.blur(); }
    };
  }
  function placeOptions() {
    if ($('options').hidden) return;
    const bar = $('toolbar').getBoundingClientRect(), panel = $('options').getBoundingClientRect(), button = document.querySelector(`[data-tool="${inkTool}"]`).getBoundingClientRect();
    $('options').style.left = Math.max(4, Math.min(innerWidth - panel.width - 4, bar.right + 12)) + 'px';
    $('options').style.top = Math.max(4, Math.min(innerHeight - panel.height - 4, button.top)) + 'px';
  }
  function hideOptions() { finishSetting(); $('options').hidden = true; }
  function openOptions(next, toggle = false) {
    if (!settings[next]) return;
    const closing = toggle && !$('options').hidden && next === inkTool;
    selectTool(next, true); inkTool = next;
    const text = editing?.obj || selectedText()?.[1]; if (next === 'text' && text) Object.assign(settings.text, { color: text.color, width: text.width * view.zoom, opacity: text.opacity });
    updateSettingsUI(); $('options').hidden = closing; placeOptions();
  }
  document.querySelectorAll('[data-tool]').forEach(button => {
    let timer, held = false, started = null;
    const stop = () => { clearTimeout(timer); started = null; };
    button.onclick = () => { if (held) { held = false; return; } if (button.dataset.tool === tool && settings[tool]) openOptions(tool, true); else { hideOptions(); selectTool(button.dataset.tool); } button.blur(); };
    button.ondblclick = () => openOptions(button.dataset.tool, true);
    button.oncontextmenu = e => { e.preventDefault(); openOptions(button.dataset.tool); };
    button.onpointerdown = e => { held = false; if (e.button === 0) { e.preventDefault(); button.setPointerCapture(e.pointerId); } if (e.button === 0 && settings[button.dataset.tool]) { started = performance.now(); timer = setTimeout(() => { held = true; openOptions(button.dataset.tool); }, 150); } };
    button.onpointermove = e => {
      const b = button.getBoundingClientRect();
      if (e.clientX < b.left - 8 || e.clientX > b.right + 8 || e.clientY < b.top - 8 || e.clientY > b.bottom + 8) stop();
    };
    button.onpointerup = () => { if (!held && started != null && performance.now() - started >= 150) { held = true; openOptions(button.dataset.tool); } stop(); };
    button.onpointercancel = button.onlostpointercapture = stop;
  });
  function undo(redo = false) {
    if (!ready) return; finishSetting(); finish(); commitText();
    const from = redo ? redoStack : historyStack, to = redo ? historyStack : redoStack, action = from.pop();
    if (action) { const inverse = patchMany(action, false); if (inverse.length) to.push(inverse); } renderSoon(); persistNow();
  }
  $('deselect').onclick = () => { selected.clear(); renderSoon(); };
  $('delete-selection').onclick = () => { if (ready) { commitText(); patchMany([...selected].map(id => [id, { hidden: true }])); selected.clear(); renderSoon(); persistNow(); } };
  function fileSnapshot() { finish(); commitText(); hideOptions(); return entries().map(([, obj]) => obj); }
  function notice(text) { $('message').textContent = text; $('message').hidden = false; setTimeout(() => { $('message').hidden = true; }, 5000); }
  $('export-pdf').onclick = async () => {
    if (!ready || exporting) return;
    exporting = true;
    const button = $('export-pdf'); button.disabled = true;
    try {
      const destination = await BoardFiles.chooseDestination();
      fileSnapshot(); const all = entries();
      const b = all.length ? pointBounds(all.flatMap(([id, obj]) => { const b = boundsFor(id, obj); return [[b[0], b[1]], [b[2], b[3]]]; })) : [view.x, view.y, view.x + screenW / view.zoom, view.y + screenH / view.zoom];
      const w = Math.max(Number.MIN_VALUE, b[2] - b[0]), h = Math.max(Number.MIN_VALUE, b[3] - b[1]);
      const landscape = w > h, pw = landscape ? 842 : 595, ph = landscape ? 595 : 842;
      const image = document.createElement('canvas'); image.width = Math.round(pw * 300 / 72); image.height = Math.round(ph * 300 / 72);
      const out = image.getContext('2d'); out.fillStyle = '#fff'; out.fillRect(0, 0, image.width, image.height);
      const margin = 100, scale = Math.min((image.width - 2 * margin) / w, (image.height - 2 * margin) / h);
      const x = (image.width - w * scale) / 2, y = (image.height - h * scale) / 2;
      out.setTransform(scale, 0, 0, scale, x - b[0] * scale, y - b[1] * scale);
      for (const highlight of [true, false]) for (const [, obj] of all) if ((obj.kind === 'highlight') === highlight) draw(out, obj, [obj.dx || 0, obj.dy || 0]);
      await BoardFiles.save(await BoardFiles.pdf(image, pw, ph), destination);
    } catch (error) { if (error.name !== 'AbortError') notice(error.message); }
    finally { exporting = false; status(); }
  };
  $('new-board').onclick = async () => {
    if (!ready || $('new-board').disabled) return;
    const button = $('new-board'); button.disabled = true;
    try {
      finish(); commitText(); hideOptions(); persistNow();
      await Promise.all([...pendingWrites]);
      location.hash = uid();
    } catch (error) { notice(error.message); button.disabled = false; }
  };
  addEventListener('hashchange', () => location.reload());
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && ['=', '+', '-', '0'].includes(e.key)) {
      e.preventDefault();
      if (!gesture && !active) { if (e.key === '0') fit(); else zoomAt(e.key === '-' ? 1 / 1.25 : 1.25); }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); finish(); commitText(); persistNow(); return; }
    if (e.key === 'Escape') { e.preventDefault(); finish(true); commitText(); selected.clear(); hideOptions(); tool = 'select'; updateToolUI(); renderSoon(); return; }
    if (['TEXTAREA', 'INPUT', 'SELECT'].includes(e.target.tagName)) {
      if (e.target === $('editor') && (e.key === 'Escape' || e.key === 'Enter' && (e.ctrlKey || e.metaKey))) { e.preventDefault(); commitText(); hideOptions(); }
      else if (e.key === 'Escape') { hideOptions(); e.target.blur(); }
      return;
    }
    const cmd = e.ctrlKey || e.metaKey, key = e.key.toLowerCase();
    if (cmd && key === 'z') { e.preventDefault(); undo(e.shiftKey); }
    else if (cmd && key === 'y') { e.preventDefault(); undo(true); }
    else if (cmd && key === 'a') { e.preventDefault(); finish(); commitText(); selected.clear(); for (const [id] of entries()) selected.add(id); tool = 'select'; updateToolUI(); renderSoon(); }
    else if (['=', '+', '-'].includes(key)) { e.preventDefault(); if (!gesture && !active) zoomAt(key === '-' ? 1 / 1.25 : 1.25); }
    else if (cmd && key === '0') { e.preventDefault(); finish(); fit(); }
    else if (key === ' ') { e.preventDefault(); space = true; setHint(); }
    else if (['Delete', 'Backspace'].includes(e.key) && selected.size) { e.preventDefault(); $('delete-selection').click(); }
    else if (e.key === 'Escape') { finish(true); commitText(); selected.clear(); hideOptions(); renderSoon(); }
    else if (!cmd && !e.altKey) {
      const next = { g: 'hand', p: 'pen', h: 'highlight', t: 'text', e: 'erase', v: 'select', l: 'lasso' }[key];
      if (next) { e.preventDefault(); if (e.shiftKey && settings[next]) openOptions(next, true); else { hideOptions(); selectTool(next); } }
    }
  });
  addEventListener('keyup', e => { if (e.key === ' ') { space = false; setHint(); } });
  addEventListener('blur', () => { space = false; finish(); touches.clear(); pinch = null; });
  addEventListener('resize', sizeCanvases);
  addEventListener('beforeunload', e => { finish(); commitText(); try { localStorage.setItem(viewKey, JSON.stringify(view)); } catch {} if (pending) { e.preventDefault(); e.returnValue = ''; } });
  async function loadSDK(file) {
    await new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://www.gstatic.com/firebasejs/10.12.2/' + file; script.onload = resolve; script.onerror = () => reject(new Error('Firebase could not load')); document.head.append(script); });
  }
  function expiredBoard() {
    clearInterval(active?.timer); clearInterval(gesture?.timer); active = gesture = editing = null; pointer = null;
    $('text-edit').hidden = true; selected.clear(); objects.clear(); historyStack = []; redoStack = []; historyInitialized = true;
    dirty = orderDirty = true; renderSoon();
    for (const key of [cacheKey, historyKey, viewKey, 'whiteboard-activity-' + room]) try { localStorage.removeItem(key); } catch {}
    notice('Board cleared after 24 hours of inactivity.');
  }
  function listenActivity() {
    for (const event of ['pointerdown', 'keydown', 'input', 'wheel']) addEventListener(event, e => { if (ready && e.isTrusted) expiry?.touch(); }, { capture: true, passive: true });
    addEventListener('pointermove', e => { if (ready && pointer !== null && e.isTrusted) expiry?.touch(); }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && expiry?.expired()) expiry.clear().catch(fail); });
  }
  async function connect() {
    await loadSDK('firebase-app-compat.js'); await loadSDK('firebase-database-compat.js');
    firebase.initializeApp(CONFIG); const db = firebase.database();
    expiry = BoardExpiry.watch({ room, db, onExpire: expiredBoard, onError: fail }); await expiry.start();
    ref = db.ref('whiteboards/' + room + '/objects');
    const receive = snapshot => { objects.set(snapshot.key, snapshot.val()); if (active?.id !== snapshot.key) dirty = orderDirty = true; renderSoon(); };
    ref.on('child_added', receive, fail); ref.on('child_changed', receive, fail);
    ref.on('child_removed', snapshot => { objects.delete(snapshot.key); selected.delete(snapshot.key); if (active?.id === snapshot.key) { clearInterval(active.timer); active = null; pointer = null; } dirty = orderDirty = true; renderSoon(); }, fail);
    await ref.once('value'); ready = true;
    const stale = [...objects].filter(([, obj]) => obj?.hidden).map(([id]) => [id, { hidden: true }]);
    if (stale.length) patchMany(stale, false);
    seedHistory(); status(); db.ref('.info/connected').on('value', snapshot => { connected = snapshot.val() === true; status(); });
  }
  updateSettingsUI(); updateToolUI(); sizeCanvases();
  listenActivity();
  if (local) { expiry = BoardExpiry.watch({ room, onExpire: expiredBoard, onError: fail }); expiry.start().then(() => { seedHistory(); status(); }); } else connect().catch(fail);
})();

(() => {
  'use strict';
  const CONFIG = {
    apiKey: 'AIzaSyDf2aZioehr3Owb9bf4gmRjgRii0i5Ctbc',
    authDomain: 'project-0cbb7d36-56e5-441e-8fe.firebaseapp.com',
    databaseURL: 'https://project-0cbb7d36-56e5-441e-8fe-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'project-0cbb7d36-56e5-441e-8fe',
    appId: '1:531740406755:web:fe0ee4c37001a9d4e966d6'
  };
  const $ = id => document.getElementById(id);
  const canvas = $('board'), ctx = canvas.getContext('2d'), overlay = $('overlay').getContext('2d');
  const W = 1600, H = 1000;
  const palette = ['#26352f', '#64748b', '#ffffff', '#cd4141', '#ec7953', '#f4cf45', '#258259', '#24a7a0', '#2463bd', '#9857b2',
    '#b3bbc1', '#e0e4e8', '#f4b8c2', '#f5a6df', '#fbc69a', '#fff09c', '#a8ddb0', '#a4e0de', '#9ec5f5', '#cdb9ed'];
  const names = ['Black', 'Grey', 'White', 'Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Blue', 'Purple',
    'Silver', 'Light grey', 'Pink', 'Magenta', 'Peach', 'Light yellow', 'Light green', 'Light teal', 'Light blue', 'Lavender'];
  const local = new URLSearchParams(location.search).has('local');
  const uid = () => crypto.randomUUID().replace(/-/g, '');
  if (!/^[a-f0-9]{32}$/.test(location.hash.slice(1))) history.replaceState(null, '', location.pathname + location.search + '#' + uid());
  const room = location.hash.slice(1), cacheKey = 'whiteboard-local-' + room;
  const settings = {
    pen: { color: palette[0], width: 4, opacity: 1 },
    highlight: { color: palette[5], width: 28, opacity: .35 },
    text: { color: palette[0], width: 30, opacity: 1 }
  };
  let ref, ready = local, connected = false, failed = false, pending = 0;
  let tool = 'pen', inkTool = 'pen', active = null, gesture = null, pointer = null, textAt = null;
  let historyStack = [], frame = 0, dirty = true, persistTimer = 0, ordered = [];
  const objects = new Map(), decoded = new Map(), selected = new Set();
  const base = document.createElement('canvas'); base.width = W; base.height = H;
  const baseCtx = base.getContext('2d');
  function persistNow() {
    clearTimeout(persistTimer); persistTimer = 0;
    if (local) try { localStorage.setItem(cacheKey, JSON.stringify(Object.fromEntries(objects))); } catch {}
  }
  function persist() { if (local && !persistTimer) persistTimer = setTimeout(persistNow, 400); }
  if (local) try { for (const [id, obj] of Object.entries(JSON.parse(localStorage.getItem(cacheKey) || '{}'))) objects.set(id, obj); } catch {}
  function status() {
    $('status').textContent = local ? 'On this device' : failed ? 'Sharing unavailable' : !ready ? 'Connecting…' : !connected ? 'Offline · changes waiting' : pending ? 'Saving…' : 'Live · saved';
    $('status').className = failed ? 'error' : connected ? 'live' : '';
  }
  function fail(error) {
    failed = true; ready = false; status();
    $('message').textContent = /permission/i.test(error.message || String(error)) ? 'Shared access has not been enabled for this board yet.' : 'Cannot reach the shared board. Check your connection and reload.';
    console.error('Whiteboard:', error);
  }
  function track(promise) {
    pending++; status();
    promise.then(() => { pending--; status(); }, error => { pending--; fail(error); });
  }
  function renderSoon() { if (!frame) frame = requestAnimationFrame(() => { frame = 0; render(); }); }
  function changed() { dirty = true; renderSoon(); persist(); }
  function geometry(obj) {
    if (decoded.has(obj)) return decoded.get(obj);
    let pts = [], bounds, path = new Path2D();
    if (obj.kind === 'text') {
      ctx.font = `${obj.width}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      const lines = String(obj.text).split('\n');
      bounds = [obj.x, obj.y, obj.x + Math.max(...lines.map(line => ctx.measureText(line).width)), obj.y + lines.length * obj.width * 1.3];
    } else {
      const values = Object.keys(obj.chunks || {}).sort().map(key => obj.chunks[key]).join(' ').trim().split(/\s+/).filter(Boolean).map(Number);
      for (let i = 0; i + 1 < values.length; i += 2) if (Number.isFinite(values[i]) && Number.isFinite(values[i + 1])) pts.push([values[i], values[i + 1]]);
      path = smoothPath(pts, obj.width);
      bounds = pointBounds(pts, obj.width / 2);
    }
    const result = { pts, bounds, path }; decoded.set(obj, result); return result;
  }
  function pointBounds(pts, padding = 0) {
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return [x0 - padding, y0 - padding, x1 + padding, y1 + padding];
  }
  function smoothPath(pts, width) {
    const path = new Path2D(); if (!pts.length) return path;
    if (pts.length === 1) { path.arc(pts[0][0], pts[0][1], width / 2, 0, Math.PI * 2); return path; }
    path.moveTo(...pts[0]);
    for (let i = 1; i < pts.length - 1; i++) path.quadraticCurveTo(...pts[i], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
    path.lineTo(...pts[pts.length - 1]); return path;
  }
  function isVisible(obj) { return obj && !obj.hidden && ['pen', 'highlight', 'text'].includes(obj.kind); }
  function entries() { return [...objects.entries()].filter(([, obj]) => isVisible(obj)); }
  function offset(id, obj) {
    if (gesture?.kind === 'move' && gesture.origins.has(id)) {
      const original = gesture.origins.get(id); return [original.dx + gesture.delta[0], original.dy + gesture.delta[1]];
    }
    return [obj.dx || 0, obj.dy || 0];
  }
  function boundsFor(id, obj) {
    const [dx, dy] = offset(id, obj), b = geometry(obj).bounds;
    return [b[0] + dx, b[1] + dy, b[2] + dx, b[3] + dy];
  }
  function draw(out, obj, delta, livePoints) {
    out.save(); out.translate(...delta); out.fillStyle = out.strokeStyle = obj.color;
    out.globalAlpha = obj.opacity ?? (obj.kind === 'highlight' ? .35 : 1);
    if (obj.kind === 'text') {
      out.font = `${obj.width}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`; out.textBaseline = 'top';
      String(obj.text).split('\n').forEach((line, i) => out.fillText(line, obj.x, obj.y + i * obj.width * 1.3));
    } else {
      out.lineWidth = obj.width; out.lineCap = out.lineJoin = 'round';
      const g = livePoints ? { pts: livePoints, path: smoothPath(livePoints, obj.width) } : geometry(obj);
      if (g.pts.length === 1) out.fill(g.path); else out.stroke(g.path);
    }
    out.restore();
  }
  function render() {
    if (dirty) {
      ordered = entries().sort(([a], [b]) => a.localeCompare(b));
      baseCtx.clearRect(0, 0, W, H);
      for (const highlight of [true, false]) for (const [id, obj] of ordered) {
        if ((obj.kind === 'highlight') !== highlight || active?.id === id || gesture?.kind === 'move' && selected.has(id)) continue;
        draw(baseCtx, obj, [obj.dx || 0, obj.dy || 0]);
      }
      dirty = false;
    }
    ctx.clearRect(0, 0, W, H); ctx.drawImage(base, 0, 0);
    if (active && !objects.get(active.id)?.hidden) {
      // Highlight ink goes behind existing writing, even while it is being drawn.
      ctx.save(); if (active.obj.kind === 'highlight') ctx.globalCompositeOperation = 'destination-over';
      draw(ctx, active.obj, [0, 0], active.points); ctx.restore();
    }
    if (gesture?.kind === 'move') for (const [id, obj] of ordered) if (selected.has(id)) draw(ctx, obj, offset(id, obj));
    drawSelection();
    $('undo').disabled = !ready || historyStack.length === 0;
    $('selection-actions').hidden = selected.size === 0;
    $('selection-count').textContent = `${selected.size} selected`;
  }
  function drawSelection() {
    overlay.clearRect(0, 0, W, H); overlay.strokeStyle = '#367acc'; overlay.fillStyle = '#367acc12';
    overlay.lineWidth = 1.5 * W / canvas.getBoundingClientRect().width; overlay.setLineDash([8, 5]);
    for (const id of selected) {
      const obj = objects.get(id); if (!isVisible(obj)) { selected.delete(id); continue; }
      const b = boundsFor(id, obj); overlay.strokeRect(b[0] - 4, b[1] - 4, b[2] - b[0] + 8, b[3] - b[1] + 8);
    }
    if (gesture?.kind === 'rect') {
      const b = pointBounds([gesture.start, gesture.end]); overlay.fillRect(b[0], b[1], b[2] - b[0], b[3] - b[1]); overlay.strokeRect(b[0], b[1], b[2] - b[0], b[3] - b[1]);
    } else if (gesture?.kind === 'lasso') {
      overlay.beginPath(); gesture.points.forEach((p, i) => i ? overlay.lineTo(...p) : overlay.moveTo(...p)); overlay.closePath(); overlay.fill(); overlay.stroke();
    }
  }
  function write(id, obj) {
    objects.set(id, obj); changed();
    if (!local) track(ref.child(id).set(obj));
  }
  function patchMany(updates, remember = true) {
    const before = [], wire = {};
    for (const [id, update] of updates) {
      const old = objects.get(id); if (!old) continue;
      before.push([id, Object.fromEntries(Object.keys(update).map(key => [key, old[key] ?? (key === 'hidden' ? false : key === 'opacity' ? (old.kind === 'highlight' ? .35 : 1) : 0)]))]);
      decoded.delete(old); objects.set(id, { ...old, ...update });
      for (const [key, value] of Object.entries(update)) wire[id + '/' + key] = value;
    }
    if (!before.length) return;
    if (remember) rememberAction(before); changed();
    if (!local) track(ref.update(wire));
  }
  function rememberAction(action) { historyStack.push(action); if (historyStack.length > 100) historyStack.shift(); renderSoon(); }
  function position(e) {
    const box = canvas.getBoundingClientRect();
    return [Math.round(Math.max(0, Math.min(W, (e.clientX - box.left) * W / box.width))), Math.round(Math.max(0, Math.min(H, (e.clientY - box.top) * H / box.height)))];
  }
  function flush() {
    if (!active || !active.unsent.length) return;
    const key = String(active.chunk++).padStart(6, '0'), value = active.unsent.flat().join(' '), old = objects.get(active.id);
    if (old) { decoded.delete(old); objects.set(active.id, { ...old, chunks: { ...old.chunks, [key]: value } }); }
    if (!local) track(ref.child(active.id).child('chunks').child(key).set(value));
    active.unsent = []; persist();
  }
  function moveUpdates() {
    return [...gesture.origins].map(([id, original]) => [id, { dx: original.dx + gesture.delta[0], dy: original.dy + gesture.delta[1] }]);
  }
  function finish(cancel = false) {
    if (active) { clearInterval(active.timer); flush(); active = null; dirty = true; }
    if (gesture?.kind === 'move') {
      clearInterval(gesture.timer);
      if (cancel) patchMany([...gesture.origins].map(([id, original]) => [id, original]), false);
      else {
        patchMany(moveUpdates(), false);
        if (gesture.delta.some(Boolean)) rememberAction([...gesture.origins]);
      }
      dirty = true;
    } else if (gesture && !cancel) completeSelection();
    if (gesture?.kind === 'erase' && gesture.undo.length) rememberAction(gesture.undo);
    gesture = null; pointer = null; persistNow(); renderSoon();
  }
  function segmentDistance(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], length = dx * dx + dy * dy;
    const t = length ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / length)) : 0;
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  }
  function insideRect(p, b, padding = 0) { return p[0] >= b[0] - padding && p[0] <= b[2] + padding && p[1] >= b[1] - padding && p[1] <= b[3] + padding; }
  function hitAt(p, radius = 5 * W / canvas.getBoundingClientRect().width) {
    for (const [id, obj] of entries().reverse()) {
      if (!insideRect(p, boundsFor(id, obj), radius)) continue;
      if (obj.kind === 'text') return id;
      const pts = geometry(obj).pts, [dx, dy] = offset(id, obj), q = [p[0] - dx, p[1] - dy];
      if (pts.some((point, i) => segmentDistance(q, i ? pts[i - 1] : point, point) <= radius + obj.width / 2)) return id;
    }
    return null;
  }
  function eraseAt(p) {
    const id = hitAt(p, 10 * W / canvas.getBoundingClientRect().width);
    if (id) { patchMany([[id, { hidden: true }]], false); gesture.undo.push([id, { hidden: false }]); selected.delete(id); }
  }
  function pointInPolygon(p, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i], b = polygon[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
    }
    return inside;
  }
  function crosses(a, b, c, d) {
    const cross = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
    const u = cross(a, b, c), v = cross(a, b, d), s = cross(c, d, a), t = cross(c, d, b);
    if (u === 0 && v === 0 && s === 0 && t === 0) return Math.max(Math.min(a[0], b[0]), Math.min(c[0], d[0])) <= Math.min(Math.max(a[0], b[0]), Math.max(c[0], d[0])) && Math.max(Math.min(a[1], b[1]), Math.min(c[1], d[1])) <= Math.min(Math.max(a[1], b[1]), Math.max(c[1], d[1]));
    return u * v <= 0 && s * t <= 0;
  }
  function completeSelection() {
    if (!['rect', 'lasso'].includes(gesture.kind)) return;
    const polygon = gesture.kind === 'rect' ? (() => { const b = pointBounds([gesture.start, gesture.end]); return [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]]]; })() : gesture.points;
    if (polygon.length < 3) return;
    const area = pointBounds(polygon);
    for (const [id, obj] of entries()) {
      const b = boundsFor(id, obj);
      if (b[2] < area[0] || b[0] > area[2] || b[3] < area[1] || b[1] > area[3]) continue;
      const [dx, dy] = offset(id, obj);
      const pts = obj.kind === 'text' ? [[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]], [b[0], b[1]]] : geometry(obj).pts.map(([x, y]) => [x + dx, y + dy]);
      const hit = pts.some(p => pointInPolygon(p, polygon)) || obj.kind === 'text' && polygon.some(p => insideRect(p, b)) || pts.some((p, i) => i && polygon.some((q, j) => crosses(pts[i - 1], p, q, polygon[(j + 1) % polygon.length])));
      if (hit) selected.add(id);
    }
    if (selected.size) { tool = 'select'; updateToolUI(); }
  }
  function openText(p) {
    textAt = { x: p[0], y: p[1], ...settings.text };
    const box = canvas.getBoundingClientRect();
    $('editor').style.left = Math.min(p[0] / W * box.width, Math.max(0, box.width - Math.min(340, box.width * .9))) + 'px';
    $('editor').style.top = Math.min(p[1] / H * box.height, Math.max(0, box.height - 100)) + 'px';
    $('editor').style.color = textAt.color;
    $('editor').hidden = $('text-actions').hidden = false; $('editor').value = ''; $('editor').focus();
    $('hint').textContent = 'Add text when finished. Ctrl/⌘ Enter also works.';
  }
  function closeText() { textAt = null; $('editor').hidden = $('text-actions').hidden = true; setHint(); }
  $('add-text').onclick = () => {
    const text = $('editor').value.trim(); if (!text || !textAt || !ready) return;
    const id = local ? uid() : ref.push().key;
    write(id, { kind: 'text', ...textAt, text }); rememberAction([[id, { hidden: true }]]); closeText(); persistNow();
  };
  $('cancel-text').onclick = closeText;
  canvas.addEventListener('pointerdown', e => {
    if (![0, 1].includes(e.button) || pointer !== null) return;
    e.preventDefault();
    if (!ready) { $('message').textContent = failed ? 'Sharing is unavailable. Reload after shared access is enabled.' : 'Wait for the board to connect before drawing.'; return; }
    if (textAt) return;
    const p = position(e), selecting = e.button === 1 || ['select', 'lasso'].includes(tool);
    if (!selecting && tool === 'text') { openText(p); return; }
    pointer = e.pointerId; canvas.setPointerCapture(pointer);
    if (selecting) {
      const freehand = e.button === 1 || tool === 'lasso', hit = freehand ? null : hitAt(p);
      if (!e.shiftKey && (!hit || !selected.has(hit))) selected.clear();
      if (hit) {
        selected.add(hit); const origins = new Map([...selected].map(id => { const obj = objects.get(id); return [id, { dx: obj.dx || 0, dy: obj.dy || 0 }]; }));
        const allBounds = [...selected].flatMap(id => { const b = boundsFor(id, objects.get(id)); return [[b[0], b[1]], [b[2], b[3]]]; });
        gesture = { kind: 'move', start: p, delta: [0, 0], origins, bounds: pointBounds(allBounds), timer: setInterval(() => { if (gesture?.kind === 'move' && gesture.changed) { patchMany(moveUpdates(), false); gesture.changed = false; } }, 100) };
        dirty = true;
      } else gesture = freehand ? { kind: 'lasso', points: [p] } : { kind: 'rect', start: p, end: p };
      renderSoon(); return;
    }
    selected.clear();
    if (tool === 'erase') { gesture = { kind: 'erase', last: p, undo: [] }; eraseAt(p); return; }
    const id = local ? uid() : ref.push().key, obj = { kind: tool, ...settings[tool], chunks: { '000000': p.join(' ') } };
    write(id, obj); rememberAction([[id, { hidden: true }]]);
    active = { id, obj, chunk: 1, unsent: [], points: [p], last: p, timer: setInterval(flush, 80) };
  });
  function movePointer(e) {
    if (e.pointerId !== pointer) return;
    const events = e.getCoalescedEvents?.();
    for (const event of events?.length ? events : [e]) {
      const p = position(event);
      if (gesture?.kind === 'rect') gesture.end = p;
      else if (gesture?.kind === 'lasso') {
        const last = gesture.points[gesture.points.length - 1]; if (Math.hypot(p[0] - last[0], p[1] - last[1]) >= 3) gesture.points.push(p);
      } else if (gesture?.kind === 'move') {
        const b = gesture.bounds;
        gesture.delta = [Math.max(-b[0], Math.min(W - b[2], p[0] - gesture.start[0])), Math.max(-b[1], Math.min(H - b[3], p[1] - gesture.start[1]))].map(Math.round); gesture.changed = true;
      } else if (gesture?.kind === 'erase') {
        const a = gesture.last, steps = Math.max(1, Math.ceil(Math.hypot(p[0] - a[0], p[1] - a[1]) / 8));
        for (let i = 1; i <= steps; i++) eraseAt([a[0] + (p[0] - a[0]) * i / steps, a[1] + (p[1] - a[1]) * i / steps]); gesture.last = p;
      } else if (active && Math.hypot(p[0] - active.last[0], p[1] - active.last[1]) >= 1.5) {
        active.unsent.push(p); active.points.push(p); active.last = p;
        if (active.unsent.length >= 128) flush();
      }
    }
    renderSoon();
  }
  canvas.addEventListener('pointermove', movePointer);
  canvas.addEventListener('pointerup', e => { if (e.pointerId === pointer) { movePointer(e); finish(); } });
  canvas.addEventListener('pointercancel', () => finish(true));
  canvas.addEventListener('lostpointercapture', () => { if (pointer !== null) finish(true); });
  canvas.addEventListener('auxclick', e => e.preventDefault());
  canvas.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });
  function setHint() {
    $('hint').textContent = tool === 'text' ? 'Tap anywhere to add text.' : tool === 'erase' ? 'Drag over a stroke or text to erase it.' : tool === 'select' ? 'Drag a rectangle to select. Drag selected ink to move. Shift adds to selection.' : tool === 'lasso' ? 'Draw around ink to select it. Middle-drag works from any tool.' : 'Draw with a mouse, finger or pen. Middle-drag to lasso select.';
    canvas.style.cursor = tool === 'text' ? 'text' : tool === 'select' ? 'default' : 'crosshair';
  }
  function updateToolUI() {
    document.querySelectorAll('[data-tool]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tool === tool)));
    setHint();
  }
  function selectTool(next) {
    finish(); closeText(); tool = next;
    if (settings[tool]) { inkTool = tool; selected.clear(); updateSettingsUI(); }
    updateToolUI(); renderSoon();
  }
  function updateSettingsUI() {
    const ink = settings[inkTool];
    $('custom-color').value = ink.color;
    $('width').value = ink.width; $('width-value').textContent = ink.width;
    $('width-label').textContent = inkTool === 'text' ? 'Text size' : 'Width';
    $('opacity').value = Math.round(ink.opacity * 100); $('opacity-value').textContent = Math.round(ink.opacity * 100) + '%';
    document.querySelectorAll('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === ink.color)));
    const sample = $('sample').getContext('2d'); sample.clearRect(0, 0, 140, 42); sample.globalAlpha = 1;
    sample.fillStyle = '#26352f'; sample.font = '14px sans-serif'; sample.fillText('Aa', 60, 26);
    draw(sample, { kind: inkTool === 'highlight' ? 'highlight' : 'pen', ...ink }, [0, 0], [[12, 27], [40, 12], [65, 30], [98, 12], [127, 22]]);
  }
  function changeSetting(key, value, commit = true) {
    settings[inkTool][key] = value; updateSettingsUI();
    if (commit && selected.size && ready) patchMany([...selected].map(id => [id, { [key]: value }]));
  }
  palette.forEach((color, i) => {
    const button = document.createElement('button'); button.className = 'swatch'; button.dataset.color = color;
    button.style.setProperty('--ink', color); button.title = names[i]; button.setAttribute('aria-label', names[i]);
    button.onclick = () => changeSetting('color', color); $('colors').append(button);
  });
  $('custom-color').oninput = e => changeSetting('color', e.target.value, false);
  $('custom-color').onchange = e => changeSetting('color', e.target.value);
  for (const key of ['width', 'opacity']) {
    $(key).oninput = e => changeSetting(key, Number(e.target.value) / (key === 'opacity' ? 100 : 1), false);
    $(key).onchange = e => changeSetting(key, Number(e.target.value) / (key === 'opacity' ? 100 : 1));
  }
  document.querySelectorAll('[data-tool]').forEach(button => button.onclick = () => selectTool(button.dataset.tool));
  $('undo').onclick = () => { if (!ready) return; finish(); const action = historyStack.pop(); if (action) patchMany(action, false); renderSoon(); persistNow(); };
  $('deselect').onclick = () => { selected.clear(); renderSoon(); };
  $('delete-selection').onclick = () => { if (!ready) return; patchMany([...selected].map(id => [id, { hidden: true }])); selected.clear(); renderSoon(); persistNow(); };
  $('clear').onclick = () => {
    if (!ready || !confirm('Clear this board for everyone? Save an image first if you need a copy.')) return;
    finish(); closeText();
    // Clear known objects only, preserving concurrent new drawings by another person.
    const update = Object.fromEntries([...objects.keys()].map(id => [id, null]));
    objects.clear(); decoded.clear(); selected.clear(); historyStack = []; changed(); persistNow();
    if (!local && Object.keys(update).length) track(ref.update(update));
  };
  $('save').onclick = () => {
    render(); const image = document.createElement('canvas'); image.width = W; image.height = H;
    const out = image.getContext('2d'); out.fillStyle = 'white'; out.fillRect(0, 0, W, H); out.drawImage(canvas, 0, 0);
    const link = document.createElement('a'); link.download = 'whiteboard.png'; link.href = image.toDataURL('image/png'); link.click();
  };
  $('new').onclick = () => { finish(); if (pending && !confirm('Some changes are still waiting to save. Open a new board anyway?')) return; location.hash = uid(); };
  addEventListener('hashchange', () => location.reload());
  $('share').onclick = async () => {
    if (local) { $('message').textContent = 'This board is saved only on this device. Open the shared version to collaborate.'; return; }
    try { await navigator.clipboard.writeText(location.href); $('message').textContent = 'Link copied. Everyone who opens it can draw together.'; }
    catch { prompt('Copy this board link:', location.href); }
  };
  addEventListener('keydown', e => {
    if (['TEXTAREA', 'INPUT', 'SELECT'].includes(e.target.tagName)) {
      if (e.target === $('editor') && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('add-text').click(); }
      if (e.key === 'Escape') closeText(); return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); $('undo').click(); }
    else if (['Delete', 'Backspace'].includes(e.key) && selected.size) { e.preventDefault(); $('delete-selection').click(); }
    else if (e.key === 'Escape') { finish(true); selected.clear(); closeText(); renderSoon(); }
    else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      const next = { p: 'pen', h: 'highlight', t: 'text', e: 'erase', v: 'select', l: 'lasso' }[e.key.toLowerCase()]; if (next) selectTool(next);
    }
  });
  addEventListener('resize', () => { renderSoon(); });
  addEventListener('beforeunload', e => { finish(); if (pending) { e.preventDefault(); e.returnValue = ''; } });
  async function loadSDK(file) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.src = 'https://www.gstatic.com/firebasejs/10.12.2/' + file;
      script.onload = resolve; script.onerror = () => reject(new Error('Firebase could not load')); document.head.append(script);
    });
  }
  async function connect() {
    await loadSDK('firebase-app-compat.js'); await loadSDK('firebase-database-compat.js');
    firebase.initializeApp(CONFIG); const db = firebase.database(); ref = db.ref('whiteboards/' + room + '/objects');
    const receive = snapshot => {
      const old = objects.get(snapshot.key); if (old) decoded.delete(old); objects.set(snapshot.key, snapshot.val()); dirty = true; renderSoon();
    };
    ref.on('child_added', receive, fail); ref.on('child_changed', receive, fail);
    ref.on('child_removed', snapshot => {
      decoded.delete(objects.get(snapshot.key)); objects.delete(snapshot.key); selected.delete(snapshot.key);
      if (active?.id === snapshot.key) { clearInterval(active.timer); active = null; pointer = null; }
      dirty = true; renderSoon();
    }, fail);
    await ref.once('value'); ready = true; status();
    db.ref('.info/connected').on('value', snapshot => { connected = snapshot.val() === true; status(); });
  }
  updateSettingsUI(); updateToolUI();
  if (local) { $('message').textContent = 'Local board — saved on this device.'; status(); }
  else connect().catch(fail);
  renderSoon();
})();

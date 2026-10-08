(() => {
  'use strict';
  const MAX_BYTES = 8 * 1024 * 1024, MAX_OBJECTS = 5000;
  const number = (v, fallback) => Number.isFinite(v) ? v : fallback;
  function clean(obj) {
    if (!obj || !['pen', 'highlight', 'text'].includes(obj.kind) || !/^#[a-f0-9]{6}$/i.test(obj.color || '') || !(obj.width > 0 && obj.width <= 1e15) || !Number.isFinite(obj.width)) throw new Error('This file contains an invalid drawing.');
    const out = { kind: obj.kind, color: obj.color, width: obj.width, opacity: Math.max(.05, Math.min(1, number(obj.opacity, obj.kind === 'highlight' ? .35 : 1))) };
    for (const key of ['dx', 'dy']) if (obj[key] != null) { if (!Number.isFinite(obj[key])) throw new Error('Invalid drawing position.'); out[key] = obj[key]; }
    if (obj.kind === 'text') {
      if (!Number.isFinite(obj.x) || !Number.isFinite(obj.y) || typeof obj.text !== 'string' || obj.text.length > 2000) throw new Error('This file contains invalid text.');
      Object.assign(out, { x: obj.x, y: obj.y, text: obj.text });
      for (const key of ['boxW', 'boxH']) if (obj[key] != null) { if (!Number.isFinite(obj[key]) || obj[key] <= 0) throw new Error('Invalid text box size.'); out[key] = obj[key]; }
    } else {
      if (!obj.chunks || typeof obj.chunks !== 'object' || Array.isArray(obj.chunks)) throw new Error('Missing drawing points.');
      const values = Object.values(obj.chunks);
      if (!values.length || values.length > 10000 || values.some(v => typeof v !== 'string' || v.length > 2048 || !/^-?\d+(\.\d+)?(e[+-]?\d+)?( -?\d+(\.\d+)?(e[+-]?\d+)?)*$/.test(v))) throw new Error('Invalid drawing points.');
      const points = BoardInk.decode(obj.chunks);
      if (!points.length || points.length > 100000 || points.length * 2 !== values.join(' ').split(' ').length) throw new Error('Invalid drawing points.');
      out.chunks = Object.fromEntries(BoardInk.chunks(points).map((v, i) => [String(i).padStart(6, '0'), v]));
    }
    return out;
  }
  async function read(file) {
    if (file.size > MAX_BYTES) throw new Error('Please use a board file smaller than 8 MB.');
    let data; try { data = JSON.parse(await file.text()); } catch { throw new Error('Please choose a saved .whiteboard file.'); }
    if (data.format !== 'whiteboard' || data.version !== 1 || !Array.isArray(data.objects) || data.objects.length > MAX_OBJECTS) throw new Error('Please choose a saved .whiteboard file.');
    const objects = data.objects.filter(obj => !obj?.hidden).map(clean);
    const view = data.view;
    return { objects, view: view && [view.x, view.y, view.zoom].every(Number.isFinite) && view.zoom >= 1e-9 && view.zoom <= 1e9 ? view : null };
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function save(objects, view) {
    download(new Blob([JSON.stringify({ format: 'whiteboard', version: 1, objects: objects.map(clean), view })], { type: 'application/json' }), 'board.whiteboard');
  }
  // A small self-contained PDF writer. The image preserves every supported glyph,
  // marker opacity and curve without loading fonts or another runtime library.
  async function pdf(image, pageWidth, pageHeight) {
    const jpeg = await new Promise(resolve => image.toBlob(resolve, 'image/jpeg', .96));
    if (!jpeg) throw new Error('Could not export this board.');
    const pixels = new Uint8Array(await jpeg.arrayBuffer()), enc = new TextEncoder(), parts = [], offsets = [0]; let length = 0;
    const append = value => { const bytes = typeof value === 'string' ? enc.encode(value) : value; parts.push(bytes); length += bytes.length; };
    const object = (id, body) => { offsets[id] = length; append(`${id} 0 obj\n${body}\nendobj\n`); };
    append('%PDF-1.4\n%whiteboard\n');
    object(1, '<< /Type /Catalog /Pages 2 0 R >>');
    object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
    offsets[4] = length;
    append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pixels.length} >>\nstream\n`);
    append(pixels); append('\nendstream\nendobj\n');
    const content = `q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`;
    object(5, `<< /Length ${enc.encode(content).length} >>\nstream\n${content}endstream`);
    const xref = length; append('xref\n0 6\n0000000000 65535 f \n');
    for (let i = 1; i <= 5; i++) append(String(offsets[i]).padStart(10, '0') + ' 00000 n \n');
    append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    download(new Blob(parts, { type: 'application/pdf' }), 'board.pdf');
  }
  window.BoardFiles = { read, save, pdf };
})();

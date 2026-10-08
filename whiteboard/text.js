(() => {
  'use strict';
  const PAD = 4, FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const padding = obj => obj.width * PAD / 30;
  function layout(obj, ctx) {
    // Measure at a normal font size: browser font limits must not cap world zoom.
    ctx.font = `30px ${FONT}`;
    const factor = obj.width / 30, measure = text => ctx.measureText(text).width * factor;
    const pad = padding(obj), fixed = obj.boxW != null, available = fixed ? Math.max(obj.width / 100, obj.boxW - pad * 2) : Infinity, lines = [];
    for (const paragraph of String(obj.text || '').split('\n')) {
      let line = '';
      for (const word of paragraph.match(/\S+\s*|\s+/gu) || ['']) {
        if (line && measure(line + word) > available) { lines.push(line.trimEnd()); line = ''; }
        for (const ch of word) {
          if (line && measure(line + ch) > available) { lines.push(line.trimEnd()); line = ''; }
          line += ch;
        }
      }
      lines.push(line.trimEnd());
    }
    const width = fixed ? obj.boxW : Math.max(obj.width * 1.5, ...lines.map(measure)) + pad * 2;
    const height = Math.max(obj.boxH || 0, lines.length * obj.width * 1.3 + pad * 2);
    const metrics = ctx.measureText('M'), ascent = metrics.fontBoundingBoxAscent ?? 28, descent = metrics.fontBoundingBoxDescent ?? 7;
    const baseline = ascent + (39 - ascent - descent) / 2;
    return { lines, width, height, baseline, bounds: [obj.x, obj.y, obj.x + width, obj.y + height] };
  }
  function handles(b) {
    const [x0, y0, x1, y1] = b, x = (x0 + x1) / 2, y = (y0 + y1) / 2;
    return { tl: [x0, y0], t: [x, y0], tr: [x1, y0], l: [x0, y], r: [x1, y], bl: [x0, y1], b: [x, y1], br: [x1, y1] };
  }
  function resize(obj, handle, point, ctx, zoom = 1) {
    const l = layout(obj, ctx), b = l.bounds.map((v, i) => v + (i % 2 ? obj.dy || 0 : obj.dx || 0));
    let [x0, y0, x1, y1] = b, size = obj.width;
    const [x, y] = point, pad = padding(obj), minWidth = size * 1.5 + pad * 2;
    const minHeight = layout({ ...obj, boxH: 0 }, ctx).height;
    if (handle === 'l') x0 = Math.min(x, x1 - minWidth);
    else if (handle === 'r') x1 = Math.max(x, x0 + minWidth);
    else if (handle === 't') y0 = Math.min(y, y1 - minHeight);
    else if (handle === 'b') y1 = Math.max(y, y0 + minHeight);
    else {
      const ax = handle.includes('l') ? x1 : x0, ay = handle.includes('t') ? y1 : y0;
      const factor = Math.max(Math.abs(x - ax) / l.width, Math.abs(y - ay) / l.height);
      size = Math.max(4 / zoom, Math.min(2048 / zoom, obj.width * factor));
      const f = size / obj.width, w = l.width * f, h = l.height * f;
      [x0, x1] = handle.includes('l') ? [ax - w, ax] : [ax, ax + w];
      [y0, y1] = handle.includes('t') ? [ay - h, ay] : [ay, ay + h];
    }
    const out = { ...obj, x: x0, y: y0, dx: 0, dy: 0, width: size, boxW: x1 - x0, boxH: y1 - y0 };
    out.boxH = layout(out, ctx).height; return out;
  }
  const cursor = handle => ({ tl: 'nwse-resize', br: 'nwse-resize', tr: 'nesw-resize', bl: 'nesw-resize', l: 'ew-resize', r: 'ew-resize', t: 'ns-resize', b: 'ns-resize' })[handle];
  window.BoardText = { layout, handles, resize, cursor, padding, FONT };
})();

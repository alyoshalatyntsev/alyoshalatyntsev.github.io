(() => {
  'use strict';
  const PAD = 4, FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const padding = obj => obj.width * PAD / 30;
  function layout(obj, ctx) {
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
  function handles(b, zoom = 1) {
    const [x0, y0, x1, y1] = b, x = (x0 + x1) / 2, y = (y0 + y1) / 2;
    return { tl: [x0, y0], t: [x, y0], tr: [x1, y0], l: [x0, y], r: [x1, y], bl: [x0, y1], b: [x, y1], br: [x1, y1], scale: [x1 + 18 / zoom, y1 + 18 / zoom] };
  }
  function resize(obj, handle, point, ctx, zoom = 1) {
    const l = layout(obj, ctx), b = l.bounds.map((v, i) => v + (i % 2 ? obj.dy || 0 : obj.dx || 0));
    let [x0, y0, x1, y1] = b, size = obj.width;
    const [x, y] = point, pad = padding(obj), minWidth = size * 1.5 + pad * 2;
    const minHeight = layout({ ...obj, boxH: 0 }, ctx).height;
    if (handle === 'scale') {
      const factor = Math.max((x - x0 - 18 / zoom) / l.width, (y - y0 - 18 / zoom) / l.height);
      size = Math.max(4 / zoom, Math.min(2048 / zoom, obj.width * factor));
      x1 = x0 + l.width * size / obj.width; y1 = y0 + l.height * size / obj.width;
    } else {
      if (handle.includes('l')) x0 = Math.min(x, x1 - minWidth);
      if (handle.includes('r')) x1 = Math.max(x, x0 + minWidth);
      if (handle.includes('t')) y0 = Math.min(y, y1 - minHeight);
      if (handle.includes('b')) y1 = Math.max(y, y0 + minHeight);
    }
    const out = { ...obj, x: x0, y: y0, dx: 0, dy: 0, width: size, boxW: x1 - x0, boxH: y1 - y0 };
    out.boxH = layout(out, ctx).height; return out;
  }
  const cursor = handle => ({ tl: 'nwse-resize', br: 'nwse-resize', scale: 'nwse-resize', tr: 'nesw-resize', bl: 'nesw-resize', l: 'ew-resize', r: 'ew-resize', t: 'ns-resize', b: 'ns-resize' })[handle];
  window.BoardText = { layout, handles, resize, cursor, padding, FONT };
})();

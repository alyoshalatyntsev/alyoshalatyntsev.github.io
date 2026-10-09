(() => {
  'use strict';
  const PAD = 4, FONTS = {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  };
  const family = obj => FONTS[obj.font] || FONTS.sans;
  const font = obj => `${obj.italic ? 'italic ' : ''}${obj.bold ? '700 ' : ''}30px ${family(obj)}`;
  const padding = obj => obj.width * PAD / 30;
  function layout(obj, ctx) {
    ctx.font = font(obj);
    const factor = obj.width / 30, measure = text => ctx.measureText(text).width * factor;
    const pad = padding(obj), fixed = obj.boxW != null, available = fixed ? Math.max(obj.width / 100, obj.boxW - pad * 2) : Infinity, lines = [], starts = [];
    let position = 0;
    for (const paragraph of String(obj.text || '').split('\n')) {
      let line = '', start = position;
      const push = () => { lines.push(line.trimEnd()); starts.push(start); line = ''; start = position; };
      for (const word of paragraph.match(/\S+\s*|\s+/gu) || ['']) {
        if (line && measure(line + word) > available) push();
        for (const ch of word) {
          if (line && measure(line + ch) > available) push();
          line += ch; position += ch.length;
        }
      }
      push(); position++;
    }
    const width = fixed ? obj.boxW : Math.max(obj.width * 1.5, ...lines.map(measure)) + pad * 2;
    const height = Math.max(obj.boxH || 0, lines.length * obj.width * 1.3 + pad * 2);
    const metrics = ctx.measureText('M'), ascent = metrics.fontBoundingBoxAscent ?? 28, descent = metrics.fontBoundingBoxDescent ?? 7;
    const baseline = ascent + (39 - ascent - descent) / 2;
    return { lines, starts, width, height, baseline, bounds: [obj.x, obj.y, obj.x + width, obj.y + height] };
  }
  function caretIndex(obj, ctx, x, y) {
    const g = layout(obj, ctx), row = Math.max(0, Math.min(g.lines.length - 1, Math.floor((y - padding(obj)) / (obj.width * 1.3))));
    const line = g.lines[row], align = obj.align || 'left';
    const measure = text => ctx.measureText(text).width * obj.width / 30;
    const start = padding(obj) + (align === 'center' ? (g.width - padding(obj) * 2 - measure(line)) / 2 : align === 'right' ? g.width - padding(obj) * 2 - measure(line) : 0);
    let best = 0, distance = Infinity;
    for (let i = 0; i <= line.length; i++) {
      const gap = Math.abs(start + measure(line.slice(0, i)) - x);
      if (gap < distance) { distance = gap; best = i; }
    }
    return Math.min(String(obj.text || '').length, g.starts[row] + best);
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
  const cursor = handle => ({ tl: 'nwse-resize', br: 'nwse-resize', scale: "url('scale-cursor.svg') 12 12, nwse-resize", tr: 'nesw-resize', bl: 'nesw-resize', l: 'ew-resize', r: 'ew-resize', t: 'ns-resize', b: 'ns-resize' })[handle];
  function bindLists(editor) {
    let inserting = false, lastSpace = -1, exitLine = -1;
    const replace = (start, end, text) => {
      if (editor.value.length - (end - start) + text.length > editor.maxLength) return;
      // Keep list transformations in the browser's native text undo history.
      inserting = true; editor.setSelectionRange(start, end);
      if (!document.execCommand('insertText', false, text)) {
        editor.setRangeText(text, start, end, 'end'); editor.dispatchEvent(new Event('input', { bubbles: true }));
      }
      editor.setSelectionRange(start + text.length, start + text.length);
      inserting = false;
    };
    const lineAt = () => {
      const position = editor.selectionStart, start = editor.value.slice(0, position).lastIndexOf('\n') + 1;
      return { position, start, text: editor.value.slice(start, position) };
    };
    const marker = text => /^(\s*)(?:([•*-]) |(\d+)\. )(.*)$/.exec(text);
    editor.addEventListener('beforeinput', e => {
      if (inserting || e.isComposing || e.inputType !== 'insertText' || e.data !== ' ' || editor.selectionStart !== editor.selectionEnd) return;
      const line = lineAt(), match = marker(line.text);
      if (match && lastSpace === line.position) {
        e.preventDefault();
        if (!match[4].trim()) replace(line.start, line.position, '');
        else { replace(line.position, line.position, ' '); exitLine = line.start; }
        lastSpace = -1; return;
      }
      if (/^\s*[-*]$/.test(line.text)) {
        e.preventDefault(); replace(line.start, line.position, line.text.slice(0, -1) + '• ');
        exitLine = -1; lastSpace = editor.selectionStart; return;
      }
      lastSpace = line.position + 1;
    });
    editor.addEventListener('keydown', e => {
      if (e.isComposing) return;
      if (e.key !== ' ') lastSpace = -1;
      if (e.key !== 'Enter' || e.ctrlKey || e.metaKey || !e.shiftKey || editor.selectionStart !== editor.selectionEnd) return;
      const line = lineAt(), match = marker(line.text);
      if (!match) { exitLine = -1; return; }
      e.preventDefault();
      if (!match[4].trim()) replace(line.start, line.position, '');
      else if (exitLine === line.start) replace(line.position, line.position, '\n');
      else {
        const prefix = match[3] ? (BigInt(match[3]) + 1n).toString() + '. ' : '• ';
        replace(line.position, line.position, '\n' + match[1] + prefix);
      }
      exitLine = -1;
    });
    editor.addEventListener('input', e => { if (!inserting && (e.inputType !== 'insertText' || e.data !== ' ')) { lastSpace = -1; if (e.inputType !== 'insertText') exitLine = -1; } });
    for (const event of ['pointerdown', 'blur']) editor.addEventListener(event, () => { lastSpace = -1; exitLine = -1; });
  }
  window.BoardText = { layout, handles, resize, cursor, padding, family, font, caretIndex, bindLists };
})();

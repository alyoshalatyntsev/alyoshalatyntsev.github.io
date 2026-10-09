(() => {
  'use strict';
  function download(blob, name) {
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
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
    return new Blob(parts, { type: 'application/pdf' });
  }
  function chooseDestination() {
    if (!window.showSaveFilePicker) return Promise.resolve(null);
    return window.showSaveFilePicker({ id: 'whiteboard-pdf', startIn: 'documents', suggestedName: 'board.pdf', types: [{ description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }] });
  }
  async function save(blob, handle) {
    if (!handle) { download(blob, 'board.pdf'); return; }
    const writer = await handle.createWritable();
    try { await writer.write(blob); await writer.close(); }
    catch (error) { await writer.abort().catch(() => {}); throw error; }
  }
  window.BoardFiles = { pdf, chooseDestination, save };
})();

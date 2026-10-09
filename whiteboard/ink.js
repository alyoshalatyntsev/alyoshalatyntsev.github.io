(() => {
  'use strict';
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  function tangent(points, i) {
    const p = points[i], a = points[i - 1] || p, b = points[i + 1] || p;
    const d0 = distance(a, p), d1 = distance(p, b);
    if (!d0 || !d1) return d0 + d1 ? [(b[0] - a[0]) / (d0 + d1), (b[1] - a[1]) / (d0 + d1)] : [0, 0];
    return [0, 1].map(k => ((p[k] - a[k]) / d0 * d1 + (b[k] - p[k]) / d1 * d0) / (d0 + d1));
  }
  function extend(path, points, from, to, origin, unit) {
    const local = p => [(p[0] - origin[0]) / unit, (p[1] - origin[1]) / unit];
    let t0 = tangent(points, from);
    for (let i = from; i < to; i++) {
      const a = points[i], b = points[i + 1], t1 = tangent(points, i + 1), d = distance(a, b) / 3;
      path.bezierCurveTo(...local([a[0] + t0[0] * d, a[1] + t0[1] * d]), ...local([b[0] - t1[0] * d, b[1] - t1[1] * d]), ...local(b));
      t0 = t1;
    }
  }
  function path(points, origin = [0, 0], unit = 1) {
    const result = new Path2D();
    if (points.length) { result.moveTo((points[0][0] - origin[0]) / unit, (points[0][1] - origin[1]) / unit); extend(result, points, 0, points.length - 1, origin, unit); }
    return result;
  }
  function settled(a, b, c, zoom) {
    const spacing = (distance(a, b) + distance(b, c)) * zoom / 2;
    const span = distance(a, c), bend = span ? Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) * zoom / span : 0;
    const weight = (.32 + .12 * Math.max(0, 1 - bend / 2)) * Math.max(0, Math.min(1, (9 - spacing) / 6));
    return [0, 1].map(k => b[k] + weight * (a[k] - 2 * b[k] + c[k]));
  }
  class Stroke {
    constructor(point, zoom) {
      this.zoom = zoom; this.raw = [point]; this.points = [point]; this.tip = point; this.filtered = point;
      this.origin = point; this.unit = 1 / zoom;
      this.bounds = [point[0], point[1], point[0], point[1]]; this.maxGap = 0;
      this.sent = 1; this.done = 0; this.grown = new Path2D(); this.grown.moveTo(0, 0);
      this.version = 0; this.pathVersion = -1; this.cachedPath = null;
    }
    add(point) {
      this.tip = point;
      this.bounds[0] = Math.min(this.bounds[0], point[0]); this.bounds[1] = Math.min(this.bounds[1], point[1]);
      this.bounds[2] = Math.max(this.bounds[2], point[0]); this.bounds[3] = Math.max(this.bounds[3], point[1]);
      const k = Math.max(.25, Math.min(1, distance(point, this.filtered) * this.zoom / 3.5));
      this.filtered = [0, 1].map(i => this.filtered[i] + k * (point[i] - this.filtered[i]));
      if (distance(this.filtered, this.raw[this.raw.length - 1]) * this.zoom >= 2) this.append(this.filtered);
      this.version++;
    }
    append(point) {
      this.maxGap = Math.max(this.maxGap, distance(point, this.raw.at(-1)));
      this.raw.push(point); this.points.push(point);
      const n = this.raw.length;
      if (n > 2) this.points[n - 2] = settled(this.raw[n - 3], this.raw[n - 2], point, this.zoom);
    }
    finish() {
      if (distance(this.tip, this.raw[this.raw.length - 1]) * this.zoom > .001) this.append(this.tip);
      this.version++;
    }
    pending(final = false) {
      const end = final ? this.points.length : Math.max(1, this.points.length - 1);
      const fresh = this.points.slice(this.sent, end); this.sent = end; return fresh;
    }
    livePath() {
      if (this.pathVersion === this.version) return this.cachedPath;
      const firm = Math.max(0, this.points.length - 3);
      if (firm > this.done) { extend(this.grown, this.points, this.done, firm, this.origin, this.unit); this.done = firm; }
      const offset = Math.max(0, this.done - 1), tail = this.points.slice(offset);
      if (distance(this.tip, tail[tail.length - 1]) * this.zoom > .001) tail.push(this.tip);
      const live = new Path2D(this.grown); extend(live, tail, this.done - offset, tail.length - 1, this.origin, this.unit);
      this.cachedPath = live; this.pathVersion = this.version; return live;
    }
  }
  // Preserve subpixel detail, including at very large or small zoom levels.
  function chunks(points) {
    const result = []; let text = '';
    for (const p of points) {
      const pair = p.join(' ');
      if (text.length + pair.length + 1 > 1800) { result.push(text); text = ''; }
      text += (text ? ' ' : '') + pair;
    }
    if (text) result.push(text); return result;
  }
  function decode(chunks) {
    const values = Object.keys(chunks || {}).sort().map(k => chunks[k]).join(' ').trim().split(/\s+/).filter(Boolean).map(Number), points = [];
    for (let i = 0; i + 1 < values.length; i += 2) if (Number.isFinite(values[i]) && Number.isFinite(values[i + 1])) points.push([values[i], values[i + 1]]);
    return points;
  }
  function cutStroke(points, center, radius) {
    const [cx, cy] = center, r2 = radius * radius, kept = [];
    const inside = p => (p[0] - cx) ** 2 + (p[1] - cy) ** 2 < r2 - 1e-7;
    if (points.length === 1) return inside(points[0]) ? [] : null;
    if (points.length >= 64) {
      const removed = points.map(inside);
      if (!removed.some(Boolean)) return null;
      const edge = (outside, inner) => {
        const dx = inner[0] - outside[0], dy = inner[1] - outside[1], fx = outside[0] - cx, fy = outside[1] - cy;
        const a = dx * dx + dy * dy, b = 2 * (fx * dx + fy * dy);
        const t = a ? Math.max(0, Math.min(1, (-b - Math.sqrt(Math.max(0, b * b - 4 * a * (fx * fx + fy * fy - r2)))) / (2 * a))) : 0;
        return [outside[0] + dx * t, outside[1] + dy * t];
      };
      for (let i = 0; i < points.length;) {
        if (removed[i]) { i++; continue; }
        const start = i; while (i < points.length && !removed[i]) i++;
        const piece = points.slice(start, i);
        if (start) piece.unshift(edge(points[start], points[start - 1]));
        if (i < points.length) piece.push(edge(points[i - 1], points[i]));
        if (piece.length > 1) kept.push(piece);
      }
      return kept;
    }
    let piece = [], hit = false;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1], dx = b[0] - a[0], dy = b[1] - a[1];
      const fx = a[0] - cx, fy = a[1] - cy, ina = inside(a), inb = inside(b);
      const qa = dx * dx + dy * dy, qb = 2 * (fx * dx + fy * dy);
      const disc = qb * qb - 4 * qa * (fx * fx + fy * fy - r2);
      const root = qa && disc > 0 ? Math.sqrt(disc) : null;
      const t0 = root === null ? null : (-qb - root) / (2 * qa), t1 = root === null ? null : (-qb + root) / (2 * qa);
      if (!ina && !(t0 !== null && t1 > 0 && t0 < 1)) {
        if (!piece.length) piece.push(a);
        piece.push(b); continue;
      }
      hit = true;
      if (!ina && t0 !== null && t0 > 0) {
        if (!piece.length) piece.push(a);
        piece.push([a[0] + dx * t0, a[1] + dy * t0]);
      }
      if (piece.length > 1) kept.push(piece);
      piece = [];
      if (!inb && t1 !== null && t1 < 1) piece = [[a[0] + dx * t1, a[1] + dy * t1], b];
    }
    if (piece.length > 1) kept.push(piece);
    return hit ? kept : null;
  }
  window.BoardInk = { path, Stroke, chunks, decode, distance, cutStroke };
})();

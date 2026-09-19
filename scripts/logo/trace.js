// Liest das YG-Logo (PNG, RGBA 8 bit) ohne Bibliotheken, verfolgt die Kontur per Marching Squares
// (Iso 0.5 auf dem Alpha-Kanal, subpixelgenau), vereinfacht per Douglas-Peucker und teilt jeden
// Buchstaben an seinen zwei schraegen Enden in zwei Seitenlinien. Ausgabe: logo-geometry.json
const fs = require("fs");
const zlib = require("zlib");

function decodePNG(file) {
  const b = fs.readFileSync(file);
  let p = 8, w, h, idat = [];
  while (p < b.length) {
    const len = b.readUInt32BE(p), type = b.toString("ascii", p + 4, p + 8);
    if (type === "IHDR") { w = b.readUInt32BE(p + 8); h = b.readUInt32BE(p + 12); }
    if (type === "IDAT") idat.push(b.subarray(p + 8, p + 8 + len));
    p += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4, stride = w * bpp, out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = y * (stride + 1) + 1, dst = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? out[dst + x - bpp] : 0;
      const up = y > 0 ? out[dst - stride + x] : 0;
      const c = x >= bpp && y > 0 ? out[dst - stride + x - bpp] : 0;
      let v = raw[src + x];
      if (f === 1) v += a; else if (f === 2) v += up; else if (f === 3) v += (a + up) >> 1;
      else if (f === 4) { const pp = a + up - c, pa = Math.abs(pp - a), pb = Math.abs(pp - up), pc = Math.abs(pp - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? up : c); }
      out[dst + x] = v & 255;
    }
  }
  const alpha = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) alpha[i] = out[i * 4 + 3] / 255;
  return { w, h, alpha };
}

function marchingSquares({ w, h, alpha }, iso = 0.5) {
  // Gitter mit 1 px Rand (Alpha 0), Punktkoordinaten = Pixelmitte + 0.5 => Kanten auf ganzen Zahlen
  const W = w + 2, H = h + 2;
  const v = (x, y) => (x < 1 || y < 1 || x > w || y > h) ? 0 : alpha[(y - 1) * w + (x - 1)];
  const segs = new Map(); // key(start) -> {end, pt}
  const P = (x, y) => [x - 1 + 0.5, y - 1 + 0.5];
  const lerp = (a, b, va, vb) => (iso - va) / (vb - va);
  const edgePt = (x, y, e) => {
    // Kanten: 0 oben (x,y)-(x+1,y), 1 rechts (x+1,y)-(x+1,y+1), 2 unten (x,y+1)-(x+1,y+1), 3 links (x,y)-(x,y+1)
    let ax, ay, bx, by;
    if (e === 0) { ax = x; ay = y; bx = x + 1; by = y; }
    else if (e === 1) { ax = x + 1; ay = y; bx = x + 1; by = y + 1; }
    else if (e === 2) { ax = x; ay = y + 1; bx = x + 1; by = y + 1; }
    else { ax = x; ay = y; bx = x; by = y + 1; }
    const t = lerp(0, 0, v(ax, ay), v(bx, by));
    const [px, py] = P(ax + (bx - ax) * t, ay + (by - ay) * t);
    return { id: `${e === 1 ? x + 1 : x},${e === 2 ? y + 1 : y},${e === 0 || e === 2 ? "h" : "v"}`, pt: [px, py] };
  };
  // Segmente so orientiert, dass innen (Alpha > iso) links liegt
  const table = {
    1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[1, 0]], 5: [[3, 0], [1, 2]], 6: [[2, 0]], 7: [[3, 0]],
    8: [[0, 3]], 9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[0, 1]], 12: [[1, 3]], 13: [[1, 2]], 14: [[2, 3]],
  };
  for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) {
    const tl = v(x, y) > iso, tr = v(x + 1, y) > iso, br = v(x + 1, y + 1) > iso, bl = v(x, y + 1) > iso;
    const idx = (tl ? 8 : 0) | (tr ? 4 : 0) | (br ? 2 : 0) | (bl ? 1 : 0);
    const list = table[idx]; if (!list) continue;
    for (const [e1, e2] of list) {
      const a = edgePt(x, y, e1), b2 = edgePt(x, y, e2);
      segs.set(a.id, { next: b2.id, pt: a.pt });
    }
  }
  const loops = [], used = new Set();
  for (const start of segs.keys()) {
    if (used.has(start)) continue;
    const loop = []; let k = start;
    while (!used.has(k) && segs.has(k)) { used.add(k); const s = segs.get(k); loop.push(s.pt); k = s.next; }
    if (loop.length > 20) loops.push(loop);
  }
  return loops;
}

function dp(points, eps) {
  if (points.length < 3) return points.slice();
  const [ax, ay] = points[0], [bx, by] = points[points.length - 1];
  let idx = 0, md = 0;
  const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1e-9;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / L;
    if (d > md) { md = d; idx = i; }
  }
  if (md <= eps) return [points[0], points[points.length - 1]];
  const l = dp(points.slice(0, idx + 1), eps), r = dp(points.slice(idx), eps);
  return l.slice(0, -1).concat(r);
}

const nearest = (loop, [x, y]) => loop.reduce((best, p, i) => { const d = Math.hypot(p[0] - x, p[1] - y); return d < best.d ? { i, d } : best; }, { i: -1, d: 1e9 });

// Kappen (schraege Enden) als Paare von Eckpunkten, grob abgelesen, exakt per Naechster-Punkt-Suche
const CAPS = {
  Y: { start: [[0, 0], [80, 80]], end: [[0, 888], [80, 808]] },
  G: { start: [[1180, 0], [1100, 80]], end: [[1004, 660], [924, 740]] },
};

function splitSides(loop, caps, name) {
  const s0 = nearest(loop, caps.start[0]), s1 = nearest(loop, caps.start[1]);
  const e0 = nearest(loop, caps.end[0]), e1 = nearest(loop, caps.end[1]);
  console.log(name, "Kappenpunkte (Abstand px):", [s0, s1, e0, e1].map(o => o.d.toFixed(2)).join(" "),
    "=>", [s0, s1, e0, e1].map(o => loop[o.i].map(v => v.toFixed(1)).join(",")).join(" | "));
  const n = loop.length;
  const fwd = (a, b) => (b - a + n) % n;
  const walk = (from, to) => { const out = []; for (let i = from; ; i = (i + 1) % n) { out.push(loop[i]); if (i === to) break; } return out; };
  // Reihenfolge rund um die Kontur: startA -> Seite A -> endA -> Endkappe -> endB -> Seite B -> startB -> Startkappe
  const [startA, startB] = fwd(s0.i, s1.i) < fwd(s1.i, s0.i) ? [s1, s0] : [s0, s1];
  const [endA, endB] = fwd(startA.i, e0.i) < fwd(startA.i, e1.i) ? [e0, e1] : [e1, e0];
  if (!(fwd(startA.i, endA.i) < fwd(startA.i, endB.i) && fwd(endB.i, startB.i) < fwd(endB.i, startA.i)))
    throw new Error(name + ": Kappen nicht in erwarteter Reihenfolge");
  return { sideA: walk(startA.i, endA.i), sideB: walk(endB.i, startB.i).reverse() };
}


function trace(pngPath) {
  const img = decodePNG(pngPath);
  const loops = marchingSquares(img).sort((a, b) => b.length - a.length);
  if (loops.length < 2) throw new Error("erwartet zwei Buchstaben-Konturen, gefunden " + loops.length);
  const [a, b] = loops.slice(0, 2);
  const meanX = l => l.reduce((s, p) => s + p[0], 0) / l.length;
  const [Yloop, Gloop] = meanX(a) < meanX(b) ? [a, b] : [b, a];
  const out = {};
  for (const [name, loop] of [["Y", Yloop], ["G", Gloop]]) {
    const { sideA, sideB } = splitSides(loop, CAPS[name], name);
    out[name] = { A: dp(sideA, 0.3), B: dp(sideB, 0.3) };
  }
  out.size = [img.w, img.h];
  return out;
}
module.exports = { trace, decodePNG };

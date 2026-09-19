/* YG-Logo-Animation (www.yg-media.de, seit 2026-09-19)
 * Ablauf als Endlosschleife: Logo steht · Y und G werden zu einer Schlange · die Schlange windet sich ·
 * sie rollt sich zum Kreis · der Kreis versinkt, wird kleiner und zerfällt in Partikel · die Partikel
 * sammeln sich wieder zum Kreis · der Kreis wird zur Schlange · die Schlange teilt sich · Y und G stehen wieder.
 * Geometrie: exakte Kontur aus YG-Logo-Weiss-No-Background.png (Marching Squares, IoU 0,9995), je Buchstabe
 * zwei Seitenlinien vom Start- zum Endschnitt. Keine Bibliotheken. prefers-reduced-motion zeigt nur das Logo. */
(function () {
  'use strict';
  var svg = document.getElementById('ygLogo');
  if (!svg) return;
  var GEO = __GEO__;
  var pathY = svg.querySelector('[data-part="Y"]');
  var pathG = svg.querySelector('[data-part="G"]');
  var stage = svg.querySelector('[data-stage]');
  var dust = svg.querySelector('[data-dust]');
  if (!pathY || !pathG || !stage || !dust) return;

  var PI = Math.PI, TAU = PI * 2;
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var easeIn = function (t) { return t * t * t; };
  var smooth = function (a, b, x) { var t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };

  // ---------- Ablauf (Sekunden) ----------
  var P = [
    ['hold', 3.2], ['toSnake', 1.7], ['slither', 0.8], ['toRing', 1.4], ['ringHold', 0.3],
    ['dissolve', 2.0], ['reform', 2.0], ['ringHold2', 0.3], ['fromRing', 1.4], ['slither2', 0.7], ['split', 1.7]
  ];
  var TOTAL = 0; P.forEach(function (p) { p[2] = TOTAL; TOTAL += p[1]; });
  function phaseAt(t) { t = ((t % TOTAL) + TOTAL) % TOTAL; for (var i = 0; i < P.length; i++) { if (t < P[i][2] + P[i][1]) return { name: P[i][0], p: (t - P[i][2]) / P[i][1], dt: t - P[i][2] }; } return { name: 'hold', p: 0, dt: 0 }; }

  // ---------- Koerper (Schlange / Kreis) ----------
  var C = [590, 444];            // Mitte des Logos
  var L = 2000;                  // Koerperlaenge
  var M = 480, DS = L / M;       // Stuetzstellen entlang des Koerpers
  var W0 = 30;                   // halbe Koerperbreite
  var AMP = 1.25, WAVE = 900, OMEGA = TAU * 0.6;    // Schlangenwelle: Winkel, Wellenlaenge, Tempo
  var EPS = 4;                   // Ueberlappung an den Naehten (unsichtbar, verhindert Haarlinien)
  var DELAY = 0.45;              // Staffelung beim Uebergang Buchstabe <-> Schlange
  var BETA = EPS / (L / TAU);    // Kreis minimal mehr als 360 Grad, damit sich Kopf und Schwanz ueberlappen

  var bx = new Float64Array(M + 1), by = new Float64Array(M + 1), bth = new Float64Array(M + 1), bw = new Float64Array(M + 1);
  var thS = new Float64Array(M + 1), thR = new Float64Array(M + 1);

  function snakeTheta(time, out) {
    var mean = 0, k;
    for (k = 0; k <= M; k++) { out[k] = AMP * Math.sin(TAU * (k * DS) / WAVE + OMEGA * time); mean += out[k]; }
    mean /= (M + 1);
    for (k = 0; k <= M; k++) out[k] -= mean;   // Gesamtrichtung bleibt waagerecht
  }
  for (var k0 = 0; k0 <= M; k0++) thR[k0] = -PI - BETA + (TAU + 2 * BETA) * (k0 * DS) / L;

  function bump(u, a, b) { return Math.sin(PI * clamp01((u - a) / (b - a))); }
  function snakeWidth(s) {
    var u = s / L, w = W0;
    w *= Math.max(0.05, Math.pow(clamp01(u / 0.26), 0.6));                  // spitzer Schwanz
    w *= 1 - 0.14 * bump(u, 0.78, 0.885);                                    // Hals
    w *= 1 + 0.48 * bump(u, 0.865, 1.0);                                     // Kopf
    if (u > 0.962) w *= Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.962) / 0.038, 2))); // runde Schnauze
    return w;
  }

  // mix: 0 = Schlange, 1 = Kreis
  function buildBody(time, mix) {
    snakeTheta(time, thS);
    var k, cx = 0, cy = 0;
    for (k = 0; k <= M; k++) { bth[k] = lerp(thS[k], thR[k], mix); bw[k] = lerp(snakeWidth(k * DS), W0, mix); }
    bx[0] = 0; by[0] = 0;
    for (k = 1; k <= M; k++) { var a = (bth[k - 1] + bth[k]) / 2; bx[k] = bx[k - 1] + Math.cos(a) * DS; by[k] = by[k - 1] + Math.sin(a) * DS; }
    for (k = 0; k <= M; k++) { cx += bx[k]; cy += by[k]; }
    cx = C[0] - cx / (M + 1); cy = C[1] - cy / (M + 1);
    for (k = 0; k <= M; k++) { bx[k] += cx; by[k] += cy; }
  }
  function sideAt(s, sign, out) {
    var f = s / DS; if (f < 0) f = 0; if (f > M) f = M;
    var k = Math.min(M - 1, Math.floor(f)), t = f - k;
    var x = lerp(bx[k], bx[k + 1], t), y = lerp(by[k], by[k + 1], t), th = lerp(bth[k], bth[k + 1], t), w = lerp(bw[k], bw[k + 1], t);
    out[0] = x - Math.sin(th) * w * sign; out[1] = y + Math.cos(th) * w * sign;
  }

  // ---------- Mittellinien der Buchstaben (fuer das Aufbiegen) ----------
  // Start, dann ['L', x, y] Gerade oder ['A', cx, cy, von, bis] Viertelbogen r=40 um die Innenecke (Grad).
  // Y laeuft vom oberen Schnitt zum unteren (Schwanz -> Naht), G vom Stamm zum oberen Schnitt (Naht -> Kopf).
  var CL = {
    Y: [[40, 40], ['L', 40, 660], ['A', 80, 660, 180, 90], ['L', 296, 700], ['A', 296, 660, 90, 0], ['L', 336, 80],
        ['A', 376, 80, 180, 270], ['L', 472, 40], ['A', 472, 80, 270, 360], ['L', 512, 808], ['A', 472, 808, 0, 90], ['L', 40, 848]],
    G: [[964, 700], ['L', 964, 232], ['A', 1004, 232, 180, 270], ['L', 1100, 192], ['A', 1100, 232, 270, 360], ['L', 1140, 808],
        ['A', 1100, 808, 0, 90], ['L', 712, 848], ['A', 712, 808, 90, 180], ['L', 672, 80], ['A', 712, 80, 180, 270], ['L', 1140, 40]]
  };
  var NX = 360;
  function sampleCenterline(cmds) {
    var pts = [cmds[0].slice()], i, k, R = 40;
    for (i = 1; i < cmds.length; i++) {
      var c = cmds[i], last = pts[pts.length - 1];
      if (c[0] === 'L') { var n = Math.max(1, Math.ceil(Math.hypot(c[1] - last[0], c[2] - last[1]) / 2)); for (k = 1; k <= n; k++) pts.push([lerp(last[0], c[1], k / n), lerp(last[1], c[2], k / n)]); }
      else { for (k = 1; k <= 24; k++) { var a = lerp(c[3], c[4], k / 24) * PI / 180; pts.push([c[1] + R * Math.cos(a), c[2] + R * Math.sin(a)]); } }
    }
    var cum = [0]; for (i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    var total = cum[cum.length - 1], out = { x: new Float64Array(NX + 1), y: new Float64Array(NX + 1), th: new Float64Array(NX + 1), len: total }, j = 0;
    for (k = 0; k <= NX; k++) {
      var sk = total * k / NX; while (j < cum.length - 2 && cum[j + 1] < sk) j++;
      var t = (sk - cum[j]) / ((cum[j + 1] - cum[j]) || 1);
      out.x[k] = lerp(pts[j][0], pts[j + 1][0], t); out.y[k] = lerp(pts[j][1], pts[j + 1][1], t);
    }
    for (k = 0; k <= NX; k++) { var a0 = Math.max(0, k - 1), a1 = Math.min(NX, k + 1); out.th[k] = Math.atan2(out.y[a1] - out.y[a0], out.x[a1] - out.x[a0]); }
    for (k = 1; k <= NX; k++) { while (out.th[k] - out.th[k - 1] > PI) out.th[k] -= TAU; while (out.th[k] - out.th[k - 1] < -PI) out.th[k] += TAU; }
    return out;
  }

  // ---------- Buchstaben: Seiten gleichmaessig abtasten, Ecken bleiben exakt ----------
  function resample(poly, step) {
    var seg = [], total = 0, i;
    for (i = 1; i < poly.length; i++) { var l = Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]); seg.push(l); total += l; }
    var pts = [], us = [], acc = 0;
    for (i = 0; i < seg.length; i++) {
      var a = poly[i], b = poly[i + 1], n = Math.max(1, Math.round(seg[i] / step));
      for (var j = 0; j < n; j++) { var t = j / n; pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); us.push((acc + seg[i] * t) / total); }
      acc += seg[i];
    }
    pts.push(poly[poly.length - 1].slice()); us.push(1);
    return { pts: pts, us: us, total: total };
  }
  function area(pts) { var s = 0; for (var i = 0; i < pts.length; i++) { var p = pts[i], q = pts[(i + 1) % pts.length]; s += p[0] * q[1] - q[0] * p[1]; } return s / 2; }

  var letters = ['Y', 'G'].map(function (name) {
    var A = resample(GEO[name].A, 11), B = resample(GEO[name].B, 11);
    return { name: name, A: A, B: B, n: A.pts.length + B.pts.length, cur: [] };
  });
  var lenY = letters[0].A.total + letters[0].B.total, lenG = letters[1].A.total + letters[1].B.total;
  var SPLIT = L * lenY / (lenY + lenG);
  letters[0].s0 = 0; letters[0].s1 = SPLIT + EPS;       // Y = hintere Haelfte (Schwanz)
  letters[1].s0 = L; letters[1].s1 = SPLIT - EPS;       // G = vordere Haelfte (Kopf); rueckwaerts, damit der innere Stamm zur Naht wandert statt quer durchs G
  letters[0].joint = function (u) { return 1 - u; };    // Abstand zur Naht Y|G
  letters[1].joint = function (u) { return 1 - u; };

  // Welche Buchstabenseite liegt links am Koerper? Ueber den Drehsinn der Flaechen bestimmen.
  (function () {
    buildBody(0, 0); var tmp = [0, 0];
    letters.forEach(function (Lt) {
      var logoPoly = Lt.A.pts.concat(Lt.B.pts.slice().reverse());
      var body = [], i;
      for (i = 0; i < Lt.A.us.length; i++) { sideAt(lerp(Lt.s0, Lt.s1, Lt.A.us[i]), 1, tmp); body.push([tmp[0], tmp[1]]); }
      for (i = Lt.B.us.length - 1; i >= 0; i--) { sideAt(lerp(Lt.s0, Lt.s1, Lt.B.us[i]), -1, tmp); body.push([tmp[0], tmp[1]]); }
      Lt.signA = (area(logoPoly) > 0) === (area(body) > 0) ? 1 : -1;
    });
  })();

  // ---------- Aufbiegen: Buchstabe (Mittellinie) <-> Schlangenhaelfte ----------
  letters.forEach(function (Lt) {
    Lt.cl = sampleCenterline(CL[Lt.name]);
    Lt.v = Lt.name === 'Y' ? function (u) { return u; } : function (u) { return 1 - u; };   // Seitenanteil -> Mittellinienanteil
    Lt.px = new Float64Array(NX + 1); Lt.py = new Float64Array(NX + 1); Lt.pth = new Float64Array(NX + 1); Lt.pw = new Float64Array(NX + 1);
    var cx = 0, cy = 0; for (var k = 0; k <= NX; k++) { cx += Lt.cl.x[k]; cy += Lt.cl.y[k]; } Lt.cc = [cx / (NX + 1), cy / (NX + 1)];
  });
  // Koerperposition einer Mittellinien-Stelle v: Y = Schwanz -> Naht, G = Naht -> Kopf
  function bodyS(Lt, v) { return Lt.name === 'Y' ? lerp(0, SPLIT + EPS, v) : lerp(SPLIT - EPS, L, v); }
  // Staffelung: Enden zuerst, Naht zuletzt (rueckwaerts: Naht oeffnet sich zuerst)
  function tauAt(Lt, v, amount) {
    var dist = Lt.name === 'Y' ? 1 - v : v;
    return easeInOut(clamp01(amount * (1 + DELAY) - DELAY * (1 - dist)));
  }
  // Mittellinie wandert Punkt fuer Punkt vom Buchstaben zur Schlangenhaelfte; das Band wird um sie herum neu gelegt.
  function buildUnfold(Lt, amount) {
    var k, cl = Lt.cl;
    for (k = 0; k <= NX; k++) {
      var v = k / NX, tk = tauAt(Lt, v, amount), f = bodyS(Lt, v) / DS; if (f < 0) f = 0; if (f > M) f = M;
      var kk = Math.min(M - 1, Math.floor(f)), tt = f - kk;
      Lt.px[k] = lerp(cl.x[k], lerp(bx[kk], bx[kk + 1], tt), tk);
      Lt.py[k] = lerp(cl.y[k], lerp(by[kk], by[kk + 1], tt), tk);
      Lt.pw[k] = lerp(40, lerp(bw[kk], bw[kk + 1], tt), tk);
    }
    for (k = 0; k <= NX; k++) { var a0 = Math.max(0, k - 2), a1 = Math.min(NX, k + 2); Lt.pth[k] = Math.atan2(Lt.py[a1] - Lt.py[a0], Lt.px[a1] - Lt.px[a0]); }
    for (k = 1; k <= NX; k++) { while (Lt.pth[k] - Lt.pth[k - 1] > PI) Lt.pth[k] -= TAU; while (Lt.pth[k] - Lt.pth[k - 1] < -PI) Lt.pth[k] += TAU; }  // stetig machen
  }
  // Einmalig: jeden exakten Konturpunkt an seinen naechsten Punkt der Mittellinie haengen und den Abstand
  // im mitbewegten Rahmen (Tangente, Normale) speichern. Bei amount 0 ergibt das exakt das Logo.
  (function () {
    letters.forEach(function (Lt) {
      var cl = Lt.cl, pts = Lt.A.pts.concat(Lt.B.pts.slice().reverse()), sideSign = [], i, k;
      for (i = 0; i < Lt.A.pts.length; i++) sideSign.push(1);
      for (i = 0; i < Lt.B.pts.length; i++) sideSign.push(-1);
      Lt.anc = [];
      for (i = 0; i < pts.length; i++) {
        var E = pts[i], best = 1e18, bv = 0;
        for (k = 0; k < NX; k++) {                      // Projektion auf jedes Teilstueck der Mittellinie
          var ax = cl.x[k], ay = cl.y[k], dx = cl.x[k + 1] - ax, dy = cl.y[k + 1] - ay, ll = dx * dx + dy * dy || 1e-9;
          var t = clamp01(((E[0] - ax) * dx + (E[1] - ay) * dy) / ll), qx = ax + dx * t - E[0], qy = ay + dy * t - E[1], d = qx * qx + qy * qy;
          if (d < best) { best = d; bv = (k + t) / NX; }
        }
        var f = bv * NX, kk = Math.min(NX - 1, Math.floor(f)), tt = f - kk;
        var cx = lerp(cl.x[kk], cl.x[kk + 1], tt), cy = lerp(cl.y[kk], cl.y[kk + 1], tt), th = lerp(cl.th[kk], cl.th[kk + 1], tt);
        var ex = E[0] - cx, ey = E[1] - cy, co = Math.cos(th), sn = Math.sin(th);
        var a = ex * co + ey * sn, b = -ex * sn + ey * co;
        Lt.anc.push({ v: bv, a: a, b: b, sg: Math.abs(b) > 1 ? (b > 0 ? 1 : -1) : 0, side: sideSign[i] });
      }
      // Seiten ohne eindeutige Normale (Punkte auf der Mittellinie) erben das Vorzeichen ihrer Seite
      var nA = 0, pA = 0; Lt.anc.forEach(function (q) { if (q.sg && q.side === 1) { nA++; if (q.sg > 0) pA++; } });
      var signA = pA * 2 >= nA ? 1 : -1;
      Lt.anc.forEach(function (q) { if (!q.sg) q.sg = q.side === 1 ? signA : -signA; });
    });
  })();
  function unfoldPoints(Lt, amount) {
    buildUnfold(Lt, amount);
    var out = Lt.cur, i, n = Lt.anc.length;
    for (i = 0; i < n; i++) {
      var q = Lt.anc[i], f = q.v * NX, k = Math.min(NX - 1, Math.floor(f)), t = f - k;
      var x = lerp(Lt.px[k], Lt.px[k + 1], t), y = lerp(Lt.py[k], Lt.py[k + 1], t), th = lerp(Lt.pth[k], Lt.pth[k + 1], t), w = lerp(Lt.pw[k], Lt.pw[k + 1], t);
      var kap = smooth(0, 0.55, tauAt(Lt, q.v, amount));              // Logo-Ecken weichen der Bandform
      var a = q.a * (1 - kap), b = lerp(q.b, q.sg * w, kap), co = Math.cos(th), sn = Math.sin(th);
      out[i] = out[i] || [0, 0];
      out[i][0] = x + a * co - b * sn; out[i][1] = y + a * sn + b * co;
    }
    out.length = n;
    return out;
  }

  function toD(pts) {
    var s = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) s += 'L' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1);
    return s + 'Z';
  }
  var logoD = letters.map(function (Lt) { return toD(Lt.A.pts.concat(Lt.B.pts.slice().reverse())); });

  // Punkte eines Buchstabens direkt auf dem Koerper (Schlange oder Kreis); die Uebergaenge macht unfoldPoints
  var tmpP = [0, 0];
  function letterPoints(Lt, amount, stag) {
    var out = Lt.cur, idx = 0, i, u, loc, p;
    function one(side, i, sign) {
      u = side.us[i]; p = side.pts[i];
      loc = amount;
      loc = easeInOut(loc);
      sideAt(lerp(Lt.s0, Lt.s1, u), sign, tmpP);
      out[idx] = out[idx] || [0, 0];
      out[idx][0] = lerp(p[0], tmpP[0], loc); out[idx][1] = lerp(p[1], tmpP[1], loc); idx++;
    }
    for (i = 0; i < Lt.A.pts.length; i++) one(Lt.A, i, Lt.signA);
    for (i = Lt.B.pts.length - 1; i >= 0; i--) one(Lt.B, i, -Lt.signA);
    out.length = idx;
    return out;
  }

  // ---------- Partikel beim Versinken ----------
  var NP = 72, parts = [], seed = 20260919;
  function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  var SVGNS = 'http://www.w3.org/2000/svg';
  for (var i = 0; i < NP; i++) {
    var c = document.createElementNS(SVGNS, 'circle'); c.setAttribute('r', '0'); dust.appendChild(c);
    parts.push({ el: c, s: rnd() * L, off: rnd() * 2 - 1, spawn: 0.95 + rnd() * 0.4, life: 0.35 + rnd() * 0.25,
      speed: 70 + rnd() * 170, jitter: (rnd() - 0.5) * 1.1, r0: 5 + rnd() * 7 });
  }
  // tt: Sekunden seit Beginn des Aufloesens. Erst versinkt der Kreis und wird klein, dann zerfaellt er in Partikel.
  function ringXform(tt) {
    var e = easeInOut(clamp01(tt / 1.2));
    return { sc: 1 - 0.72 * e, dy: 240 * e, op: 1 - smooth(1.0, 1.45, tt) };
  }
  function drawDust(tt, visible) {
    for (var i = 0; i < NP; i++) {
      var q = parts[i], age = tt - q.spawn;
      if (!visible || age < 0 || age > q.life) { if (q.on) { q.el.setAttribute('r', '0'); q.on = false; } continue; }
      if (q.x0 === undefined) {
        sideAt(q.s, q.off, tmpP);
        var X = ringXform(q.spawn);
        q.x0 = C[0] + (tmpP[0] - C[0]) * X.sc; q.y0 = C[1] + (tmpP[1] - C[1]) * X.sc + X.dy;
        var dx = q.x0 - C[0], dy = q.y0 - (C[1] + X.dy), d = Math.hypot(dx, dy) || 1;
        var ca = Math.cos(q.jitter), sa = Math.sin(q.jitter);
        q.vx = (dx / d * ca - dy / d * sa) * q.speed; q.vy = (dx / d * sa + dy / d * ca) * q.speed;
      }
      var f = age / q.life;
      q.el.setAttribute('cx', (q.x0 + q.vx * age).toFixed(1));
      q.el.setAttribute('cy', (q.y0 + q.vy * age + 80 * age * age).toFixed(1));
      q.el.setAttribute('r', (q.r0 * (1 - 0.45 * f)).toFixed(2));
      q.el.setAttribute('opacity', (Math.pow(1 - f, 1.3) * 0.95).toFixed(3));
      q.on = true;
    }
  }

  // ---------- Auge (nur solange die Form eine Schlange ist) ----------
  var eye = document.createElementNS(SVGNS, 'circle');
  eye.setAttribute('r', '0'); eye.setAttribute('fill', '#050505'); stage.appendChild(eye);
  var eyeOn = false;
  function drawEye(amount) {
    if (amount <= 0.001) { if (eyeOn) { eye.setAttribute('r', '0'); eyeOn = false; } return; }
    sideAt(L * 0.935, -0.32, tmpP);
    eye.setAttribute('cx', tmpP[0].toFixed(1)); eye.setAttribute('cy', tmpP[1].toFixed(1));
    eye.setAttribute('r', (6.2 * amount).toFixed(2)); eyeOn = true;
  }

  // ---------- Ein Bild zu Zeit t ----------
  var lastXform = '', lastOp = '', atRest = true;
  function setStage(sc, dy, op) {
    var tf = sc === 1 && dy === 0 ? '' : 'translate(' + C[0].toFixed(1) + ' ' + (C[1] + dy).toFixed(1) + ') scale(' + sc.toFixed(4) + ') translate(' + (-C[0]) + ' ' + (-C[1]) + ')';
    if (tf !== lastXform) { if (tf) stage.setAttribute('transform', tf); else stage.removeAttribute('transform'); lastXform = tf; }
    var o = op >= 0.999 ? '' : op.toFixed(3);
    if (o !== lastOp) { if (o) stage.setAttribute('opacity', o); else stage.removeAttribute('opacity'); lastOp = o; }
  }
  function drawLetters(amount, stag) {
    if (stag === 1) {
      pathY.setAttribute('d', toD(unfoldPoints(letters[0], amount)));
      pathG.setAttribute('d', toD(unfoldPoints(letters[1], amount)));
      return;
    }
    pathY.setAttribute('d', toD(letterPoints(letters[0], amount, stag)));
    pathG.setAttribute('d', toD(letterPoints(letters[1], amount, stag)));
  }
  function render(t) {
    var ph = phaseAt(t), n = ph.name, p = ph.p, tt;
    if (n === 'hold') { if (!atRest) { setStage(1, 0, 1); pathY.setAttribute('d', logoD[0]); pathG.setAttribute('d', logoD[1]); drawDust(0, false); drawEye(0); atRest = true; } return; }
    atRest = false;
    if (n === 'toSnake') { buildBody(t, 0); setStage(1, 0, 1); drawLetters(p, 1); drawDust(0, false); drawEye(smooth(0.78, 1, p)); return; }
    if (n === 'slither' || n === 'slither2') { buildBody(t, 0); setStage(1, 0, 1); drawLetters(1, 0); drawDust(0, false); drawEye(1); return; }
    if (n === 'toRing' || n === 'fromRing') {
      var m = easeInOut(n === 'toRing' ? p : 1 - p);
      buildBody(t, m); setStage(1, 0, 1); drawLetters(1, 0); drawDust(0, false); drawEye(1 - smooth(0, 0.3, m)); return;
    }
    if (n === 'ringHold' || n === 'ringHold2') { buildBody(t, 1); setStage(1, 0, 1); drawLetters(1, 0); drawDust(0, false); drawEye(0); return; }
    if (n === 'dissolve' || n === 'reform') {
      tt = n === 'dissolve' ? ph.dt : P[5][1] - ph.dt;       // Zusammenfinden = rueckwaerts abgespieltes Aufloesen
      buildBody(t, 1); var X = ringXform(tt); setStage(X.sc, X.dy, X.op); drawLetters(1, 0); drawDust(tt, true); drawEye(0); return;
    }
    if (n === 'split') { buildBody(t, 0); setStage(1, 0, 1); drawLetters(1 - p, 1); drawDust(0, false); drawEye(1 - smooth(0, 0.22, p)); return; }
  }

  // ---------- Takt ----------
  if (typeof window.__YG_TEST_TIME === 'number') { render(window.__YG_TEST_TIME); return; }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var clock = 0, last = null, running = false, visible = true, raf = 0;
  function frame(now) {
    if (last !== null) clock += Math.min(0.1, (now - last) / 1000);
    last = now; render(clock);
    raf = window.requestAnimationFrame(frame);
  }
  function start() { if (running) return; running = true; last = null; raf = window.requestAnimationFrame(frame); }
  function stop() { if (!running) return; running = false; window.cancelAnimationFrame(raf); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); else stop(); }).observe(svg);
  } else start();
})();

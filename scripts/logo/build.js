#!/usr/bin/env node
// Baut die YG-Logo-Animation aus dem Original-Logo (Pattern P-16).
// Aufruf im Repo-Root:  node scripts/logo/build.js
//  1. Kontur aus assets/YG-Logo-Weiss-No-Background.png verfolgen (scripts/logo/trace.js)
//  2. Geometrie auf 0,1 px runden und in scripts/logo/anim.template.js einsetzen -> assets/yg-logo-anim.js
//  3. Statische Pfade (Logo ohne JavaScript bzw. bei reduzierter Bewegung) in index.html und en/index.html setzen
//  4. scripts/logo/static-d.json fuer die Vorschau scripts/logo/sheet.html schreiben
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");
const { trace } = require("./trace.js");
const geo = trace(path.join(ROOT, "assets/YG-Logo-Weiss-No-Background.png"));
if (geo.size[0] !== 1180 || geo.size[1] !== 888) throw new Error("Logo-Groesse hat sich geaendert: " + geo.size + " (viewBox und Mittelpunkt in anim.template.js pruefen)");
const r1 = pts => pts.map(([x, y]) => [+x.toFixed(1), +y.toFixed(1)]);
const G = { Y: { A: r1(geo.Y.A), B: r1(geo.Y.B) }, G: { A: r1(geo.G.A), B: r1(geo.G.B) } };
const tpl = fs.readFileSync(path.join(__dirname, "anim.template.js"), "utf8");
if (!tpl.includes("__GEO__")) throw new Error("Platzhalter __GEO__ fehlt in anim.template.js");
fs.writeFileSync(path.join(ROOT, "assets/yg-logo-anim.js"), tpl.replace("__GEO__", JSON.stringify(G)));
const d = L => "M" + L.A.concat(L.B.slice().reverse()).map(p => p[0] + " " + p[1]).join("L") + "Z";
const D = { Y: d(G.Y), G: d(G.G) };
fs.writeFileSync(path.join(__dirname, "static-d.json"), JSON.stringify(D));
for (const page of ["index.html", "en/index.html"]) {
  const file = path.join(ROOT, page); let html = fs.readFileSync(file, "utf8"), n = 0;
  for (const part of ["Y", "G"]) {
    const re = new RegExp('(<path data-part="' + part + '" fill="#fff" d=")[^"]*(")');
    if (!re.test(html)) throw new Error(page + ": Pfad " + part + " nicht gefunden");
    html = html.replace(re, (m, a, b) => { n++; return a + D[part] + b; });
  }
  fs.writeFileSync(file, html);
  console.log(page + ": " + n + " Pfade gesetzt");
}
console.log("assets/yg-logo-anim.js: " + fs.statSync(path.join(ROOT, "assets/yg-logo-anim.js")).size + " Bytes");

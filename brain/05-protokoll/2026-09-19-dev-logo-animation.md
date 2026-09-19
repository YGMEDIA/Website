# 2026-09-19 · dev · Animiertes YG-Logo über den Produktkarten

**Auslöser:** Yasin schickt das Logo (identisch mit `assets/YG-Logo-Weiss-No-Background.png`): "Das Logo oben links fix entfernen, mittig groß über die Cards und daraus eine Animation machen: Y und G werden zu einer Schlange, bewegen sich, werden zu einem Kreis, versinken, werden immer kleiner und lösen sich auf, dann kommt es wieder als Kreis, wird zur Schlange, teilt sich auf und wird wieder zum Logo." Loop.

## Was
- **Nav-Logo entfernt** auf allen 8 DNA-Seiten (Startseite und 6 Rechtsseiten, DE+EN); die Sprachwahl sitzt jetzt rechts (`.nav-inner { justify-content: flex-end }`). Die Rechtsseiten haben damit oben keinen Link zur Startseite mehr.
- **Logo-Bühne** auf / und /en/: inline-SVG `#ygLogo` (viewBox 0 0 1180 888, role img) mittig über dem Produktraster, Breite `clamp(200px, 28vw, 400px)`, leichter blauer Glow, `overflow: visible` für die Schlange. Das statische SVG ist das exakte Logo; ohne JavaScript und bei `prefers-reduced-motion` bleibt es stehen.
- **Animation** `/assets/yg-logo-anim.js` (22 KB, keine Bibliothek, `defer`), Schleife 15,5 s:
  Logo 3,2 s · Buchstaben werden zur Schlange 1,7 s · Schlange windet sich 0,8 s · rollt sich zum Kreis 1,4 s · Kreis 0,3 s · versinkt, wird klein, zerfällt in Partikel 2,0 s · Partikel sammeln sich, Kreis steigt auf 2,0 s (exakt rückwärts) · Kreis 0,3 s · öffnet sich zur Schlange 1,4 s · windet sich 0,7 s · teilt sich an der Naht Y|G und wird wieder zum Logo 1,7 s.
  Läuft nur, solange die Bühne sichtbar ist (IntersectionObserver), pausiert im Hintergrund-Tab.

## Wie
1. **Geometrie exakt aus der PNG:** kein Bildwerkzeug installiert, deshalb eigener PNG-Decoder (zlib + Filter) und Marching Squares auf dem Alphakanal (Iso 0,5, subpixelgenau) in Node. Ergebnis: genau zwei Konturen (Y, G); jede an ihren zwei schrägen Enden in zwei Seitenlinien geteilt, Douglas-Peucker 0,3 px. Gerendert und pixelweise mit dem Original verglichen: IoU 0,9995, 0 Pixel auf der falschen Seite, mittlere Abweichung 0,03 %.
2. **Befund zur Form:** Y und G sind je ein einziges durchgehendes 80-px-Band mit zwei schrägen Schnitten. Das G ist eine eckige Spirale. Beides eignet sich direkt als "Schlange".
3. **Schlange und Kreis** als Körper über den Tangentenwinkel entlang der Länge (Serpenoid-Kurve, wandernde Welle), Kreis = konstant steigender Winkel; der Übergang Schlange ↔ Kreis mischt die Winkel, dadurch rollt sich die Schlange physikalisch plausibel ein. Spitzer Schwanz, Hals, Kopf mit Auge (Auge nur in der Schlangenphase). Y = hintere Hälfte, G = vordere Hälfte, im Kreis Y links und G rechts.
4. **Übergang Buchstabe ↔ Schlange**, drei Anläufe per Kontaktabzug geprüft:
   - Punkte der Kontur linear zur Schlange: funktioniert, aber das Band stülpt sich stellenweise um (dünne Splitter).
   - Winkel entlang der Mittellinie mischen ("Aufbiegen"): zu wild, die Bänder schwingen weit über die Bühne. Dabei ein Richtungsfehler beim G gefunden.
   - **Gewählt:** Mittellinie jedes Buchstabens (Geraden + Viertelbögen r=40 um die Innenecken) wandert Punkt für Punkt zur Schlangenhälfte, das Band wird um sie neu gelegt; jeder exakte Konturpunkt hängt an seinem nächsten Mittellinienpunkt mit Abstand im mitbewegten Rahmen. Bei Fortschritt 0 ergibt das per Konstruktion exakt das Logo. Gestaffelt: Enden zuerst, Naht zuletzt; rückwärts öffnet sich die Naht zuerst ("teilt sich auf").
5. **Fehler, die die Kontaktabzüge gefunden haben:** leere Übergänge (Konstante erst nach der Vorberechnung definiert, NaN), Kerben an den Ecken des G (atan2 springt beim Richtungswechsel "nach links" von +180° auf −180°, Interpolation dazwischen falsch; Winkel jetzt stetig gemacht), Zacken durch eine Ecken-Korrektur im festen Rahmen (ersetzt durch die Anker im mitbewegten Rahmen). Jeder Fix per Zoom mit eingezeichneten Konturpunkten bestätigt.
6. **Werkzeugkette im Repo** unter `scripts/logo/` (nicht veröffentlicht, deploy.yml schließt scripts/ aus): `trace.js` (Kontur), `anim.template.js` (Engine), `build.js` (baut `assets/yg-logo-anim.js` und setzt die statischen Pfade in beiden Startseiten), `sheet.html` (Kontaktabzug, `?t=` Zeitpunkte, `?c=` Spalten, `?w=` Zellbreite; aus dem Repo-Root per `python3 -m http.server` öffnen). `node scripts/logo/build.js` reproduziert die ausgelieferte Datei byte-genau.

## Warum so
- **Eigene Engine statt Lottie/GSAP:** keine Abhängigkeit, 22 KB, exakt das Original-Logo als Ruhezustand, CSP-/Datenschutz-neutral (kein CDN).
- **Nav-Logo überall weg:** Yasins "oben entfernen" plus identische Nav auf allen Seiten (§A1). Nachteil: auf den Rechtsseiten kein Weg zur Startseite außer Zurück; bei Bedarf ein kleiner Link.
- **Auge an der Schlange:** ohne Kopf und Auge las sich die Form als Wellenlinie, nicht als Schlange.

## Verify
- `python3 scripts/verify.py` GRÜN (9 Seiten + 2 Weiterleitungen).
- Kontaktabzüge über den ganzen Loop und Detail-Zooms der Übergänge; echte Seite bei 1440 px zu vier Zeitpunkten (Logo, Schlange, Kreis, Versinken) und Impressum-Kopf.
- Lighthouse mobil lokal: 96 / 100 / 96 / 100, CLS 0, TBT 0 ms (BP-Abzug nur /favicon.ico, schon vorher).
- Live: Bühne und Skript auf / und /en/, kein `nav-logo` auf Start- und Rechtsseiten, Engine 200, `/scripts/logo/build.js` 404.

## Gelernt (Rückfluss)
- Pattern P-16 (Logo-Animation) angelegt.
- Morphs zwischen Bändern nie über die Kontur interpolieren, sondern über die Mittellinie und das Band neu legen; sonst stülpt es sich um.
- Winkel aus atan2 vor jeder Interpolation stetig machen.
- Jeder Animationsschritt wird über einen Kontaktabzug geprüft, Details per Zoom mit eingezeichneten Punkten; "sieht gut aus" im laufenden Browser reicht nicht.

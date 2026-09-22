# 2026-09-22 · dev · Ladezeit: Schriften entblockiert, Favicon nachgeholt

**Auslöser:** Yasin: "passt" nach dem Vorschaubild, also weiter mit dem offenen Punkt 0 aus dem STATUS (Web-Vitals-Runde nach P-14). Lighthouse bezifferte das renderblockierende Google-Fonts-CSS mit 1,9 s, der einzige Best-Practices-Abzug war seit Wochen der 404 auf /favicon.ico.

## Was
1. **Schriften laden nicht mehr renderblockierend:** `<link rel="preload" as="style">` plus `<link rel="stylesheet" media="print" onload="this.media='all'">` und ein `<noscript>`-Rückfall, dazu `preconnect` auf fonts.gstatic.com (fehlte bisher, nur googleapis war da).
2. **Nur noch benutzte Schnitte:** Startseite Inter 400/600/700 (vorher sieben Inter-Schnitte plus drei Playfair-Kursive, Playfair kam dort gar nicht mehr vor). Rechtsseiten Inter 400/500/600/700/900; Playfair-Kursiv nur noch auf Nutzungsbedingungen und Terms of Use, wo die Unterzeile im H1 sie tatsächlich rendert. Grundlage: die im jeweiligen CSS vorkommenden `font-weight`-Werte, nicht Vermutungen.
3. **Favicon-Satz aus dem Logo:** `favicon.ico` (32 px, PNG im ICO-Container), `assets/favicon.svg` (skaliert beliebig), `assets/apple-touch-icon.png` (180 px) und `assets/icon-512.png`, jeweils weißes Logo auf dunkler Kachel (#050B12). Alle Seiten verlinken die drei ersten.

## Wie
- Icons mit Headless-Chrome aus einer kleinen HTML-Kachel gerendert (dieselbe Technik wie beim Vorschaubild), die ICO-Datei in Python zusammengesetzt: 6 Byte Kopf, 16 Byte Eintrag, dahinter das 32er-PNG.
- Das SVG-Favicon enthält die beiden verfolgten Logo-Pfade direkt, 1,5 KB.
- Ein Python-Skript für alle 8 Seiten mit Treffer-Zwang: bestehende Schrift-Links ersetzen, Icons ergänzen, danach prüfen, dass jede Seite genau drei Schrift-Links (preload, stylesheet, noscript) und die Icon-Zeilen trägt.

## Verify
- `python3 scripts/verify.py` GRÜN (8 Seiten + 2 Weiterleitungen).
- Im Browser: `document.fonts` meldet Inter 400/600/700 als geladen, das Stylesheet steht nach dem Laden auf `media="all"`, die drei Icon-Links sind da.
- Pixelvergleich vor/nach bei gleicher Animationszeit: Abweichung max. 5 von 255, breit verteilt (leicht andere Animationsphase, weil die Seite früher rendert). Wäre die Schrift falsch, läge die Abweichung im Textbereich bei über 100.
- **Lighthouse mobil live, vorher → nachher:** Leistung 89 → **100**, Barrierefreiheit 100 → 100, Best Practices 96 → **100**, SEO 100 → 100. FCP 2,8 s → **0,9 s**, LCP 2,8 s → **1,8 s**, TBT 0, CLS 0, renderblockierende Ressourcen: keine mehr, Konsole ohne Fehler.
- favicon.ico liefert 200 als image/vnd.microsoft.icon (562 Bytes), favicon.svg 200 (1.554 Bytes).

## Warum so
- **Kein Selbsthosten der Schriften:** Das wäre der letzte Schritt (spart den Fremd-Server ganz), setzt aber voraus, die Schriftdateien herunterzuladen. Downloads sind ein Yasin-Gate, deshalb erst fragen. Mit dem jetzigen Aufbau ist der Gewinn ohnehin eingefahren: Lighthouse meldet keine renderblockierenden Ressourcen mehr.
- **ICO trotz SVG-Favicon:** Browser fragen /favicon.ico auch ohne Link-Tag ab; ohne Datei gibt es einen 404 in der Konsole, den Lighthouse als Best-Practices-Fehler zählt.

## Gelernt (Rückfluss)
- P-14 ergänzt: Schrift-Links mit preload und media-Tausch laden, nur benutzte Schnitte anfordern, Favicon-Satz gehört zur Grundausstattung.
- Schriftschnitte nicht nach Gefühl anfordern: die im CSS vorhandenen `font-weight`-Werte zählen. Auf der Startseite waren sieben von zehn Schnitten überflüssig.
- Screenshots zum Vergleich immer mit identischem `--virtual-time-budget` aufnehmen, sonst vergleicht man Animationsphasen statt Änderungen.

# 2026-09-20 · design · Startseite als Bühne, Flow-Hintergrund

**Auslöser:** Yasin, mit Bildvorlage (dunkler Verlauf, links schwarz, rechts blau, kleines Logo mittig): "Nur die gesamte Seite sehen, so wie auf dem Bild. Das Logo in der Mitte. Oben den Sprachwechsler bitte weg. Oben auch die Navbar als Glaselement weg. Was wir haben ist im Endeffekt nur unten den Footer, aber nicht als Glaselement, die Inhalte liegen frei als Text. Und wenn ich nach unten scrolle, soll es wie eine zweite Seite geben: Das Logo scrollt nach oben weg, die zweite Seite kommt mit den Karten. Und die Hintergrundanimation soll keine einzelnen Kreise sein, sondern Farbflächen, die wie Rauch ineinander schwingen, minimal, auf derselben Ebene."

## Was
1. **Startseite DE+EN ist jetzt zweigeteilt:** `section.stage` (100 svh) zeigt nur das YG-Logo mittig, darunter `#produkte` (100 svh, Karten mittig), darunter der Footer. Beim Scrollen blendet das Logo aus und zieht 70 px nach oben (Skript, an `requestAnimationFrame` gekoppelt).
2. **Keine Navbar mehr auf der Startseite:** Nav-Markup, Nav-Skripte und der Sprachwechsler oben sind raus. Der Sprachwechsel läuft über den Footer (`.lang-switch`), damit die Zweisprachigkeit steht (§B). Die Rechtsseiten behalten ihre Nav, sonst käme man von dort nicht zurück.
3. **Logo:** statisches SVG mit den beiden verfolgten Konturpfaden aus `scripts/logo/static-d.json` (1,4 KB im HTML, keine zusätzliche Anfrage), Größe clamp(100px, 9vw, 160px), `role="img"` mit Label.
4. **Flow-Hintergrund auf allen 8 DNA-Seiten:** `#bg-canvas`, `.orb-wrap` und `.grid-overlay` sind weg, dazu das ganze Partikel-Skript. Neu: `.flow` mit drei weichen Farbfeldern (`radial-gradient(closest-side …)`, ohne Rand, ohne Blur-Filter), die per `transform` auf der Stelle schwingen (44 s, 61 s, 73 s, `alternate`, `prefers-reduced-motion` schaltet sie ab). Grundton `--bg` von #050505 auf #020C12.
5. **Footer überall frei:** kein Glas, kein Rahmen, die Sprachpillen ohne Pillen-Hintergrund als Text.
6. **Gate:** verify.py verlangt jetzt `.flow` auf allen DNA-Seiten, auf der Startseite zusätzlich `.stage-logo` und ausdrücklich KEINE Nav; Nav-Logo und Nav-Sprachwechsler bleiben Pflicht auf allen anderen Seiten.

## Wie
- Die Farben sind nicht geschätzt, sondern aus Yasins Vorlage gemessen: Bild nach PNG, eigener Decoder, 35 Messpunkte im Raster (5 Zeilen × 7 Spalten). Daraus Grundton (2/13/20) und Spitzenwert des Blaufelds (2/65/94) abgeleitet, dann das Feld als Ellipse modelliert (Mitte bei 75 vw / 15 vh, Radien 45 vw / 85 vh) und in drei Runden nachgezogen: erst zu weit links und zu dunkel, dann zu breit nach links, schließlich passend.
- Abgleich am Ende (Grünkanal, gleiche relativen Punkte): 35 % Breite 18,1 gegen 18,4 in der Vorlage · 65 % 58,4 gegen 58,6 · 80 % 65,6 gegen 58,6 · 98 % 43,0 gegen 48,2. Die linke Hälfte bleibt auf dem Grundton, wie in der Vorlage.
- Ein Python-Skript für alle 8 Seiten mit Treffer-Zwang je Ersetzung (P-12), transaktional.

## Warum so
- **Drei Felder statt eines:** Ein einzelnes Feld sieht statisch aus. Drei überlagerte Felder mit unterschiedlichen Laufzeiten verändern die Silhouette des Blaus langsam, ohne dass man einzelne Kreise erkennt. Genau das meinte Yasin mit "wie Rauch ineinander schwingen".
- **Kein `filter: blur()`:** Die Felder laufen ohne harte Kante aus, ein zusätzlicher Blur würde nur Rechenzeit kosten. Die Animationen sind reine `transform`-Animationen, die der Browser auf der Grafikkarte zusammensetzt.
- **Grain bleibt:** Große dunkle Verläufe zeigen auf 8-Bit-Schirmen Streifen. Das feine Rauschen über allem verhindert das.
- **Footer am Dokumentende, nicht auf der ersten Seite:** So bleibt die erste Bildschirmseite exakt wie Yasins Bild (nur Logo), und der Footer steht dort, wo er semantisch hingehört.
- **Nav nur auf Rechtsseiten:** Ohne Nav käme man von Impressum und Datenschutz nicht zurück zur Startseite.

## Verify
- `python3 scripts/verify.py` GRÜN. Gegenproben: Flow-Klasse verfälscht → rot; Nav in die Startseite gesetzt → rot; Rückbau → grün.
- Messungen 1440 × 810: Bühne 810 hoch, Karten-Abschnitt 810, Footer bei 1620, Dokument 1713; keine Nav im DOM; Footer-Hintergrund transparent, kein Rahmen, Sprachpillen ohne Rand. 375 × 812: Bühne 812, Logo 100 × 75, Karten einspaltig, Dokumentbreite 375, kein Überlauf.
- Lighthouse lokal (Desktop): Barrierefreiheit 100, Best Practices 96 (nur /favicon.ico), SEO 100. Der Leistungswert fiel lokal wegen eines Trace-Fehlers der Lighthouse-Version aus und wird live nachgemessen.
- Hinweis fürs nächste Mal: Im ausgeblendeten Browser-Bereich laufen keine Animationsframes, deshalb lässt sich dort eine `requestAnimationFrame`-Logik (Logo-Ausblendung) nicht prüfen; dafür Live-Test oder ein sichtbares Fenster nutzen.

## Gelernt (Rückfluss)
- Constitution v1.8 (§A1 neu: Startseite als Bühne ohne Nav, Flow-Hintergrund, freier Footer), Framework 2.7, neues Pattern P-17 (Bühne und Flow), P-11 Karten sitzen jetzt auf der zweiten Bildschirmseite.
- Farbvorlagen von Yasin werden gemessen, nicht geschätzt: Bildpunkte abtasten, Zielwerte notieren, danach die CSS-Felder anpassen und gegenmessen.
- Wer eine Seite ohne Nav baut, prüft zuerst, wie man von den Unterseiten zurückkommt und wo der Sprachwechsel bleibt.

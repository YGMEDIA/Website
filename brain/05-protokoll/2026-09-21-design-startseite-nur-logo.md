# 2026-09-21 · design · Startseite nur noch Logo und Footer, totes CSS entfernt

**Auslöser:** Yasin: "bitte lösche auch die Cards. Lass nur Logo und unten die Texte Impressum, Datenschutz und so."

## Was
1. **Startseite DE+EN:** Der Produktkarten-Abschnitt, die beiden Seitenpunkte und das Bühnen-Skript (Ausblenden beim Scrollen, Punkte-Umschaltung) sind entfernt. Die Seite besteht jetzt aus `section.stage` mit der unsichtbaren H1 und dem Logo sowie dem Footer.
2. **Layout:** `body` ist eine Flex-Spalte mit `min-height: 100svh`, die Bühne nimmt den freien Platz (`flex: 1`), der Footer sitzt unten. Damit passt alles auf eine Bildschirmseite, es gibt nichts mehr zu scrollen.
3. **Totes CSS entfernt:** Die Startseite trug noch das komplette CSS der alten langen Seite (Hero, Formular, Referenz-Karten, Produktkarten, Navigation). Entfernt wurden alle Regeln, deren Klassen oder IDs im Markup nicht mehr vorkommen: 261 Regeln, CSS von 38,7 auf 8,0 KB, Datei von 50 auf 15 KB.
4. **Gate-Inventar:** Yasin hat am selben Tag `felgen-brillant.html` per Web-Commit gelöscht. verify.py kannte die Seite noch und wurde rot; `INTERNAL_PAGES` ist jetzt leer, das Gate prüft 8 Seiten + 2 Weiterleitungen. Kein anderer Verweis im Repo zeigte auf die Datei.

## Wie
- **Erst ein Fehlgriff, dann sauber:** Mein erster Anlauf hat das CSS von Hand über einen weiten Regex-Bereich ersetzt und dabei still `.sr-only` und `.footer-legal` mitgenommen (unsichtbare H1 wäre sichtbar geworden, Footer-Links unformatiert). Aufgefallen ist das erst beim Prüfen der verbliebenen Selektoren. Zurückgesetzt und neu gebaut: Markup entfernen, die Bühnen-Regeln gezielt ersetzen, und das tote CSS von einem Werkzeug bestimmen lassen statt von Hand.
- **Werkzeug (Session-Scratchpad, nicht im Repo):** liest die Klassen und IDs aus dem Markup plus die Klassen, die Skripte setzen (`classList.add/toggle`), zerlegt das Stylesheet in Top-Level-Blöcke (inklusive `@media` und `@keyframes`), behält jede Regel, deren Selektoren nur bekannte Klassen/IDs nennen, und wirft Keyframes weg, die keine verbliebene Regel mehr aufruft. Selektoren ohne Klasse oder ID (`:root`, `body`, `section`, `a`) bleiben immer.
- **Nachweis:** Screenshots vor und nach dem Aufräumen bei 1440 × 810, 420 × 800 und auf der EN-Seite, danach Pixelvergleich mit eigenem PNG-Leser. Abweichung max. 3 bis 4 von 255, Mittelwert 0,02 bis 0,30. Zum Vergleich: zwei identische Aufnahmen derselben Seite unterscheiden sich wegen der Hintergrundanimation um max. 4. Das Aufräumen hat also nichts verändert.

## Warum so
- **CSS aufräumen gehört dazu:** Das Stylesheet steht inline im Head und blockiert das Rendern. 30 KB totes CSS auf einer Seite, die nur noch ein Logo zeigt, kostet Ladezeit ohne jeden Nutzen.
- **Werkzeug statt Handarbeit:** Von Hand gelöschte CSS-Bereiche sind genau der Fehler, der mir oben passiert ist. Die Klassen-Inventur ist überprüfbar und wiederholbar.

## Verify
- `python3 scripts/verify.py` GRÜN (8 Seiten + 2 Weiterleitungen).
- Pixelvergleich wie oben; zusätzlich Kontrolle, dass GA4-Snippet, Consent-Schlüssel und Cookie-Banner-Markup unverändert vorhanden sind (Zähler vor und nach jeder Ersetzung).
- Live nach Deploy: Startseite DE 15.213 Bytes, EN 15.010 Bytes, 0 Karten, 0 Punkte, Bühnen-Logo vorhanden, 4 Footer-Links, Cookie-Banner und GA4 vorhanden; /felgen-brillant.html antwortet 404.

## Beobachten
Von der Startseite führt jetzt kein Link mehr zu USELY, YOU, Paukbox und Felgen Brillant. Die Produktseiten verlieren damit ihren einzigen internen Link von der Hauptdomain; für Google zählt das als Signal. Wenn die Sichtbarkeit der Produktseiten nachlässt, wäre der einfachste Ausgleich eine unaufdringliche Zeile im Footer mit den vier Produktlinks. Im gsc-loop beobachten.

## Gelernt (Rückfluss)
- Constitution v2.0 (§A1: Startseite nur Logo und Footer), Framework M1 neu, P-17 Bühne ohne zweite Seite.
- Wer CSS-Blöcke per Regex über mehrere Kommentarabschnitte hinweg ersetzt, löscht irgendwann etwas Unbeabsichtigtes mit. Entweder eng begrenzte Einzelersetzungen oder ein Werkzeug, das anhand des Markups entscheidet.
- Ein Bildvergleich braucht eine Rauschmessung: zweimal dasselbe aufnehmen, Abweichung messen, erst dann die Änderung bewerten.

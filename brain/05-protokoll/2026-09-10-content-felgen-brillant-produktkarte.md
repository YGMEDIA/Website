# 2026-09-10 · content · Felgen Brillant als vierte Produktkarte

**Auslöser:** Yasin: "bau felgen brillant karte neben die von paukbox rein".

## Was
Felgen Brillant war ein eigener `.ref-feature`-Block unter dem Produktraster (halbes Bild, halber Text, volle Breite). Jetzt eine vierte `.product-card` im `.product-grid`, direkt hinter Paukbox. Damit füllt sich das 2×2-Raster, das seit dem Entfernen von SPACE SOCCER (2026-09-08) eine leere Stelle neben Paukbox hatte.
- Karte trägt weiterhin `id="felgen-brillant"`, `data-delay="2"`, Tag "Eigenes Projekt · Partner · Robotik-Vision", beide Absätze im Wortlaut, dazu neu `service-tags` (Marke, Shop, Betriebssoftware, Robotik-Vision) zur Struktur-Gleichheit mit den drei anderen Karten.
- Sektionskopf angepasst, weil vier Karten unter "Drei Produkte. Drei Märkte." falsch gelesen hätten: Eyebrow "Eigene Produkte und Projekte", Titel "Drei Produkte. Ein Betrieb. Eine Handschrift.", Unterzeile nennt Felgen Brillant als den Betrieb dahinter. EN analog ("Our products and projects", "Three products. One business.").
- `.ref-feature`-Markup auf der Startseite entfällt damit; das zugehörige CSS bleibt unangetastet (§A4-Bereich, andere Seiten nutzen dieselben Regeln).

## Wie
Python-Skript mit Treffer-Zwang (P-12): ref-feature-Block per Regex entfernt, Karte hinter dem Paukbox-Anker eingesetzt, drei Kopf-Texte ersetzt, DE und EN im selben Lauf.

## Warum so
- **Kein `aspect-ratio` (§A4):** `.product-img` arbeitet mit fester Höhe (400 px Desktop, 260 px mobil) und `object-fit: cover`. Der Safari-Bug der `.ref-feature`-Bildspalte kann so nicht auftreten.
- **Bild ohne Beschnitt-Risiko geprüft:** `logo-felgen-brillant.webp` ist als einziges Produktbild 1280×720 statt 800×800. Rechnung und Sichtprüfung: bei 400 px Höhe bleiben original-x 220 bis 1060 sichtbar, das Logo liegt bei 330 bis 930, also vollständig im Bild. Mobil (260 px) ebenfalls vollständig, visuell bestätigt.
- **Text unverändert:** Yasins Inhalt wurde nicht gekürzt. Folge: Die Felgen-Karte ist höher als Paukbox, das Raster streckt beide auf gleiche Höhe, die Links stehen durch `margin-top: auto` bündig unten. Die Lücke in der Paukbox-Karte ist normales Rasterverhalten, kein Fehler.

## Verify
- `python3 scripts/verify.py` GRÜN (21 Seiten), auch nach dem Rebase.
- Sichtprüfung headless: Desktop 2×2-Raster, Kartenabschluss beider Karten der zweiten Zeile, simulierte Mobilspalte.
- Live nach Deploy: `product-card ... id="felgen-brillant"` auf / und /en/ vorhanden, `class="ref-feature"` auf der Startseite 0×.
- Anker unverändert erreichbar: Hero-Link `#felgen-brillant`, Footer `/#felgen-brillant` bzw. `/en/#felgen-brillant`; `.product-card` bringt `scroll-margin-top: 110px` mit.

## Befund
Push wurde zunächst abgelehnt: Yasin hatte parallel fünf Web-Uploads an `felgen-brillant.html` gepusht (interne Pitch-Deck-Seite). Keine Überschneidung mit meinen Dateien, `git pull --rebase`, verify erneut grün, dann Push. Bestätigt das bekannte Muster aus der Arbeitsumgebung: vor dem Push immer mit einem abgelehnten Push rechnen und rebasen statt zu forcen.

## Gelernt (Rückfluss)
Wenn ein Feature-Block in ein Kartenraster wandert, zuerst prüfen, ob der Sektionskopf eine Anzahl nennt ("Drei Produkte"). Zahlwörter in Überschriften sind stille Abhängigkeiten von der Kartenanzahl und werden sonst zur Falschaussage.

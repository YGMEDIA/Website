# 2026-09-08 · content · SPACE SOCCER von der Website entfernt

## Was
Das Produkt SPACE SOCCER ist auf www.yg-media.de nicht mehr sichtbar, in beiden Sprachen. Entfernt wurden auf der Startseite (DE + EN): Hero-Kachel, Produktkarte, Formular-Option im Kontaktbereich, die Nennung in Meta-Description, Keywords, OG- und Twitter-Description, der `brand`-Eintrag im JSON-LD sowie der Produktlink in der Footer-Spalte auf allen 20 Seiten. Dazu die beiden Bild-Assets `assets/logo-space-soccer.webp` und `assets/SpaceSoccer-Logo.jpg`.

Zwei Textstellen, die ohne das Produkt falsch geworden wären:
- Sektions-Titel „Vier Produkte. Drei Märkte." → „Drei Produkte. Drei Märkte." (EN „Four products." → „Three products.")
- Unterzeile „Business-Software, Gesundheit, Gaming und Lernen." → ohne Gaming (EN analog)
- Marken-Satz im Unternehmens-Abschnitt: „YG MEDIA® und SPACE SOCCER sind eingetragene Marken" → „YG MEDIA® ist eine eingetragene Marke". Die Marke selbst bleibt eingetragen; sie wird auf der Website nur nicht mehr genannt.

## Wie
Alle Fundstellen zuerst vollständig kartiert (`grep -ric` über html/xml/txt/json, Varianten „spacesoccer", „space soccer", „space-soccer"): 15 Treffer in `index.html`, 14 in `en/index.html`, je 1 in den übrigen 18 Seiten (ausschließlich der Footer-Link). Danach exakte String-Ersetzungen mit Trefferzahl-Prüfung je Stelle (kein `sed` auf mehrzeiligen HTML-Blöcken, §Werkzeuge in CLAUDE.md). DE zuerst, EN im selben Arbeitspaket (§B1).

Eine neue CSS-Regel war nötig: `.hero-tiles` ist ein Zwei-Spalten-Grid; mit vier Kacheln ging das 2×2 auf, mit drei bliebe rechts unten eine Lücke. Ergänzt wurde
`.hero-tiles > a:last-child:nth-child(odd) { grid-column: 1 / -1; }`
Die letzte Kachel füllt damit die Zeile, sobald die Anzahl ungerade ist. Bei vier Kacheln (falls wieder ein Produkt dazukommt) greift die Regel nicht.

## Warum so
- **Assets gelöscht statt liegen gelassen:** sie waren nach dem Schnitt nirgends mehr referenziert (grep über html/css/js). Git hält sie in der Historie, ein Zurückholen ist ein `git revert`.
- **Produktkarten-Grid nicht angefasst:** die drei verbleibenden Karten stehen 2 + 1. Bei großen Karten ist eine halb gefüllte letzte Zeile das übliche Grid-Verhalten; eine Karte über die volle Breite hätte das Produktbild gestreckt und die Karte gegenüber den anderen überbetont. Bei den kleinen Hero-Kacheln war die Lücke dagegen als Fehler sichtbar, deshalb dort die Regel.
- **Rechtstexte nicht angefasst:** Impressum, Datenschutz und Nutzungsbedingungen hatten nur den Footer-Link, kein inhaltliches Vorkommen. Der Footer ist DNA (§A1) und muss auf allen Seiten identisch sein, deshalb dort dieselbe Änderung wie überall; die Rechtstexte selbst bleiben unberührt (Menschen-Gate).
- **Protokolle und Spec nicht umgeschrieben:** `05-protokoll/` und `06-specs/SPEC-produkt-positionierung.md` sind Historie (Protokoll-Regel 4). Fortgeschrieben wurden nur die lebenden Referenzen: STATUS, INDEX, Framework (inkl. Änderungslog v2.1), Patterns.
- **Keine Aussage über das Projekt:** Der Auftrag lautete, das Projekt von der Website zu nehmen. Ob SPACE SOCCER als Produkt weiterläuft, ist damit nicht entschieden; das Brain formuliert entsprechend vorsichtig.

## Verify
- `python3 scripts/verify.py` → **GRUEN, 21 Seiten + 0 Kunden-Previews, 0 Fehler, 0 Warnungen** (DNA-Marker, Em-Dash, hreflang, Canonicals, Sitemap, interne Links, JSON-LD, noindex).
- `grep -rn -i "space.soccer"` über alle html/xml/txt/json außerhalb von `brain/` → **kein Treffer**.
- Lokaler Server (`python3 -m http.server`), DE und EN im Browser gemessen:
  - `document.body` enthält weder „space-soccer" noch „space soccer" → `false` auf beiden Seiten.
  - Hero-Kacheln DE: USELY 165 px, YOU 165 px, Paukbox 341 px (füllt die Zeile) — Regel greift.
  - Produkt-Grid: 2 Spalten à 568 px, Karten `usely`, `you`, `paukbox`.
  - Sektions-Titel: „Drei Produkte. Drei Märkte." / „Three products. Three markets."
  - Footer-Produktspalte EN: USELY, YOU, Paukbox.

## Gelernt
Beim Entfernen eines Produkts reicht das Löschen seiner Blöcke nicht: Zählungen („Vier Produkte"), Markt-Aufzählungen („Gaming") und Grid-Annahmen (gerade Kachelzahl) hängen still daran. Für künftige Produkt-Zu- oder -Abgänge gehört diese Checkliste dazu — Zählwörter, Aufzählungen, Meta/JSON-LD, Footer auf allen Seiten, Assets, Grid-Parität. Kandidat für ein Pattern, wenn der Fall ein zweites Mal auftritt.

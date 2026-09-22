# YG PATTERN-KATALOG

> Wiederkehrende Bau-Muster, aus der echten Site erkannt (Stand Juli 2026). Jede Änderung folgt einem Pattern — oder definiert hier ein neues. Ein Pattern ist erst "echt", wenn es mindestens einmal im Repo funktioniert.

## P-1 · Seiten-DNA-Pattern
**Wann:** Jede neue Seite, DE wie EN.
**Form:** Bestehende Seite gleichen Typs als Vorlage kopieren (nie from scratch): Head mit Title "<Seite> — YG MEDIA®" (Markenzeichen seit 2026-09-20, §A5), Description, Canonical, hreflang-Trio (nur indexierbar), og:image + Twitter Cards, ggf. Schema · Body mit vollständiger Nav (+ seitenspezifischem Sprachwechsler), Canvas/Orbs/Grid/Grain, Sections, Footer, Cookie-Banner (außer Rechtsseiten). Danach: Sitemap + verify.py.
**Vorlage:** index.html (Produkt-Startseite, seit 2026-09-02), usely.html (Produkt-Detailseite), impressum.html (Legal). website.html & Co. sind geparkt und keine Vorlagen mehr.
**Gesetze:** §A1, §B3, §C2.

## P-2 · EN-Nachzieh-Pattern
**Wann:** Jede Änderung an einer DE-Seite mit EN-Pendant.
**Form:** DE-Master ändern → dieselbe Änderung handübersetzt in der EN-Datei (Links auf EN-Pendants, absolute Asset-Pfade, eigenständige Schema-/Meta-Übersetzung) → beide Dateien im selben Commit. Bei Massen-Änderungen Python-Replacement-Skript (COMMON/LINKS-Tabellen, Muster _build_en.py) mit QA-Scan auf deutsche Reste; Reihenfolge beachten: Link-Replaces VOR dem Sprachwechsler-Swap.
**Gesetze:** §B1, §B2, §B4.

## P-11 · Produkt-Karten-Pattern (seit 2026-09-02, Minimal-Auftritt seit 2026-09-19)
**Wann:** Eigene Produkte und das Partnerprojekt auf der Startseite. Seit 2026-09-19 ist das Raster der einzige Inhalt der Startseite: vier Karten USELY, YOU, Paukbox, Felgen Brillant, 4 Spalten ab 1200 px, 2 Spalten bis 768 px, darunter 1; Kartentitel als h2 unter einer unsichtbaren H1; Links bündig am Kartenboden (`.product-links` mit padding-top statt margin-top am Link). **Seit 2026-09-20 (Yasin, zwei Schritte am selben Tag):** Die Karte zeigt nur noch Bild, `.ref-tag` (ein Stichpunkt, was es ist, in `--teal-bright`), Produktname als h2 und Links. Weder Beschreibungstext noch Schlagwort-Chips (am 2026-09-19 war es kurz ein Absatz mit rund 200 Zeichen plus vier Chips). Ab vier Spalten per Subgrid ausgerichtet (`grid-template-rows: subgrid; grid-row: span 4`, Stichpunkt `align-self: end`, Raster `row-gap: 0`, Titel ohne unteren Abstand), damit ein zweizeiliger Stichpunkt Titel und Chips nicht versetzt. Die Zahl in `span N` ist die Zahl der Kinder einer Karte (aktuell vier): wer eins ergänzt oder streicht, zieht sie mit. `.service-tags`/`.stag` bleiben als CSS erhalten, falls Chips zurückkommen. **Bilder seit 2026-09-20 im Originalformat** (`height: auto`, kein `object-fit`-Beschnitt, `align-self: start`), mit `width`/`height` am `<img>` gegen Layout-Sprünge. Zwei Fallen dabei: (1) Die Karte braucht `grid-template-columns: minmax(0, 1fr)`, sonst zieht die Eigenbreite des Bildes (800 px) die Kartenspalte auf und alles läuft über. (2) `width`/`height` am `<img>` wirken wie CSS-Breite, deshalb braucht `.badge-link img` ausdrücklich `width: auto`, sonst wird der App-Store-Badge verzerrt (§A5). Bilder mit unterschiedlichem Seitenverhältnis lassen im Subgrid Luft unter dem flacheren Bild; die Zeilen darunter bleiben trotzdem auf einer Linie. **Jede App, die im Store liegt, trägt den Badge** neben ihrem Textlink (USELY, YOU, Paukbox). **Linkzeile seit 2026-09-20 (Yasin):** überall derselbe Text ("Mehr erfahren →" / "Learn more →"), `justify-content: space-between`, damit der Badge bündig zur rechten Kante des Kartenbilds steht; Hover vergrößert Textlink (109 %, Ursprung links) und Badge (108 %, Ursprung rechts, sonst rutscht er aus der Flucht). Weil alle vier Links gleich heißen, tragen sie ein `aria-label` mit dem Produktnamen und die Badge-Bilder einen `alt` mit Produktnamen, sonst hören Screenreader viermal dasselbe. Folge fürs Ranking: Die Startseite hat fast keinen Fließtext mehr, Produkttexte gehören ab jetzt auf die Produktseiten, nicht in die Karte. Kein Hero, keine Hero-Kacheln, keine Footer-Produktspalte, keine Fakten-Karte mehr. Der Rest dieses Eintrags beschreibt die Kartenanatomie und gilt weiter.
**Form:** `.product-grid` (2 Spalten, ≤768px 1 Spalte) aus `.product-card` (Glass, `id` = Produkt-Anker, `scroll-margin-top`): `.product-img` (feste Höhe 280/220px, object-fit cover, NIE aspect-ratio) + `.ref-tag` (was es ist) + h2 Produktname + ein kurzer Absatz (nur belegte Fakten aus Yasins Quellen) + `.service-tags` + `.product-links` (interner Link oder externer Produkt-Link, bei USELY zusätzlich App-Store-Badge). Partner Felgen Brillant als `.ref-feature` (P-3). Hero-Karte spiegelt die Produkte als `.hero-tile`-Kacheln mit denselben Logos.
**Assets:** Logos aus Yasins Originalen nur skaliert (sips) und als WebP (cwebp q86–88) unter `assets/logo-<produkt>.webp`; Originale bleiben im Repo. Seit 2026-09-20 sind alle vier Kartenbilder quadratisch (800×800); ein querformatiges Original wird dafür aus der höchsten vorhandenen Fassung auf die Logo-Mitte quadratisch geschnitten, nie gestaucht.
**Neue Produkte:** Karte DE + EN im selben Paket und Schema `brand`-Liste (seit 2026-09-19 gibt es keine Hero-Kachel, keine Footer-Spalte und keine Fakten-Karte mehr). Ab fünf Karten die Spaltenzahl neu entscheiden, fünf in einer Reihe werden zu schmal.
**Vorlage:** index.html Sektion #produkte / en/index.html #products.
**Gesetze:** §A1, §A4, §A5, §A6.1/§A6.2, §B1.

## P-12 · Nav-/Footer-Massenänderung (seit 2026-09-02)
**Wann:** Jede Änderung an Nav-Links, Footer-Spalten, Tagline oder Cookie-Text.
**Form:** Nie Datei für Datei von Hand: Python-Skript mit `re.subn(count=1)` + Abbruch bei 0 Treffern pro Datei (Vorlage: `scratchpad/build.py` vom 2026-09-02, dokumentiert im Protokoll). Nav-Block = alles zwischen `<div class="nav-links" id="navLinks">` und `<div class="nav-lang"`, Footer-Block = alles zwischen `<div class="footer-links-grid">` und der Spalte Rechtliches/Legal. Sprachwechsler bleiben unangetastet (seitenspezifisch, §A1). Danach verify.py (Nav-/Footer-Invariante) + grep-Zähler über alle DNA-Seiten.
**Gesetze:** §A1, §B1, Teil E (str_replace mit Kontext, nie sed über mehrzeilige Blöcke).

## P-3 · Ref-Feature-Pattern
**Wann:** Referenz als volle-Breite-Karte (Bild + Text).
**Form:** `.ref-feature` (Bild links) / `.ref-feature.flip` (Bild rechts). Desktop: Bildspalte relative + min-height 480px, Bild absolut cover. ≤1100px: einspaltig, Bild static/auto, .flip per order:-1. NIE aspect-ratio auf die Bildspalte.
**Vorlage:** USELY- und YOU-Karten auf index.html.
**Gesetze:** §A4.

## P-4 · FAQ-Schema-Pattern
**Wann:** Jedes FAQ-Akkordeon.
**Form:** `.faq-item`-Akkordeon im Body + FAQPage-JSON-LD im Head, Fragen/Antworten wortgleich zum sichtbaren Text, Schema-Sprache = Seitensprache, keine Em-Dashes in den Antworten.
**Vorlage:** website.html (5 Fragen), usely.html (6 Fragen).
**Gesetze:** §A2, §B4, §C3.

## P-5 · Feature-Block-Pattern
**Wann:** Produkt-Features mit Screenshots.
**Form:** Alternierende Blöcke Screenshot (WebP, 1080px, q92) + Text, aus usely.html. Screenshots echte Geräte-Aufnahmen, nie Mockup-Erfindungen.
**Vorlage:** usely.html Feature-Sektion.
**Gesetze:** §A1, §A6.

## P-6 · Kontakt-Pattern
**Ruht seit 2026-09-19:** Die Startseite hat keine Kontakt-Sektion mehr (Yasin). Kontaktwege stehen nur noch im Impressum (DE+EN) und im Schema; NAP dort synchron halten. Das Muster unten gilt, falls eine Kontakt-Sektion zurückkommt.
**Wann:** Kontaktwege anzeigen oder ändern.
**Form:** Kontakt-Sektion mit `.contact-info-item`-Zeilen: mailto, tel:+491774476392, WhatsApp wa.me/491774476392 mit Prefill-Text, darunter der Antwortzeit-Hinweis. Nummer zusätzlich im Impressum (DE+EN) und als `telephone` im LocalBusiness-Schema (NAP synchron halten).
**Vorlage:** index.html Kontakt-Sektion + Schema.
**Gesetze:** §C3.

## P-7 · Verify-Suite-Pattern
**Wann:** Vor jedem "fertig", nach jedem Umbau.
**Form:** scripts/verify.py — stdlib-only, Exit 0/1, prüft: DNA-Marker (Nav/Footer/Canvas/Cookie-Regeln) auf jeder Seite, Em-Dash-Scan (Title ausgenommen), hreflang-Trios der 7 Paare, Canonicals, Sitemap beidseitig (XML + Datei-Abgleich, noindex-Ausschluss), interne Links, JSON-LD-Validität, lang-Attribute, CNAME-Invariante.
**Gesetze:** Teil E.

## P-8 · GSC-Paket-Pattern
**Wann:** Jede externe Datenlage (Search Console, GA4, Keyword-Planner).
**Form:** Yasin liefert Screenshot/Export → Kernzahlen als datierte Notiz in `03-research/raw/gsc/` → Interpretation und Maßnahmen GETRENNT davon in STATUS bzw. als Loop-Items. Rohdaten werden nie überschrieben. Entscheidungen berufen sich auf die datierte Notiz, nie auf erinnerte Zahlen.
**Gesetze:** Leitprinzip 1, Leseregel "raw unantastbar".

## P-9 · Spec-Pattern
**Wann:** Größere Vorhaben (neue Seiten, Struktur-Umbauten, alles mit Geld/Recht).
**Form:** `06-specs/SPEC-<name>.md`: Ziel · Keyword-/Seiten-Bezug · Änderungen (DE+EN aufgelistet) · Gesetzes-Check · Produktentscheidungen für Yasin mit [CC-Empfehlung] · Verify-Gate. Bau erst nach Freigabe.
**Gesetze:** Feature-Kette (Framework 5.3).

## P-10 · Deploy-Schutz-Pattern
**Wann:** Immer (Invariante).
**Form:** `.github/workflows/deploy.yml` veröffentlicht die Site via Actions und schließt brain/, scripts/, CLAUDE.md, .claude/ aus. CNAME bleibt erhalten. Deploy = exakter Repo-Stand minus Ausschlussliste; nie Web-Upload-Deploys (SPC-Lektion: Web-Upload nimmt keine Dotfiles und erzeugt Zombie-Stände).
**Gesetze:** Governance 5.

## P-13 · Demo-Mandant-Pattern (Screens aus dem echten Produkt)
**Wann:** Produkt-Screens für eine Website oder den App Store, die wie ein echtes Konto wirken sollen.
**Form:** Eigener Mandant in der Produktions-DB (RLS-isoliert: eigene company_id, eigene Membership), fiktive aber plausible Firma mit echten Umlauten, Historie über mehrere Monate, bezahlte, offene und überfällige Belege, Kette Angebot → Auftragsbestätigung → Rechnung. Daten gegen das **Client-Modell** bauen, nicht gegen das DB-Schema (nicht-optionale Felder des Decoders sind die Wahrheit; Fallback-Caches kaschieren Decoding-Fehler mit fremden Daten). Kennzahlen nach dem Laden gegen SQL-Summen prüfen. Aufnahme: Statusleiste per `simctl status_bar override` (9:41, voller Akku), `simctl io screenshot` in 3x (Punkte = Pixel/3), Sheets und Detail-Ansichten ohne Tab-Balken bevorzugen, Namen kurz genug für Listenzeilen, erst alle Screens erkunden, dann ein finaler Durchlauf. WebP 1080 breit, width/height im img, konkrete Alt-Texte, DE und EN im selben Paket. Zugangsdaten nie ins Repo.
**Gesetze:** §A5 (nur echte Assets), §B1 (DE Master, EN im selben Paket). Herkunft: Protokoll 2026-09-03 screens-demo.

## P-14 · Web-Vitals-Pattern (Lighthouse-Feinschliff)
**Wann:** Jede neue Site vor dem ersten SEO-Paket, und jede Site einmal nach größeren Umbauten.
**Form:** Messen mit `npx lighthouse@12 <live-url> --chrome-flags="--headless=new"` (mobil und `--preset=desktop`, DE und EN); die PageSpeed-API ohne Key drosselt sofort. Checkliste: (1) Schriften selbst hosten als Variable Fonts, Latin-Subset, `@font-face` mit Gewichtsbereich, `font-display: swap`, Preload mit `crossorigin`, keine Google-Fonts-Anfrage. (2) Bilder auf Anzeigegröße mal zwei, WebP, width/height im img, LCP-Bild `fetchpriority="high"`, Rest `loading="lazy"`; Badges verlustfrei (§A5). (3) Interaktive Elemente sind `<button>` mit `aria-expanded`/`aria-controls`, Logo-Bilder neben Wortmarke `alt=""`, Links im Fließtext unterstrichen. (4) Vor dem Push DOM-Check (`document.fonts`, Bildmaße, keine Fremd-Hosts), nach dem Deploy Nachmessung mit Vorher/Nachher-Tabelle im Protokoll. Nicht jagen: Cache-TTL auf GitHub Pages, Speed-Index-Anteil der Canvas-Animation (DNA).
**Gesetze:** §A1 (DNA bleibt), §A5 (Badge), §B1 (DE und EN im selben Paket). Herkunft: Protokoll 2026-09-03 usely-lighthouse.

**Schriften (seit 2026-09-22):** Nur die Schnitte anfordern, die im CSS wirklich vorkommen (`font-weight`-Werte zaehlen, nicht schaetzen). Google Fonts nie als einfaches Stylesheet einbinden, sondern `preload as=style` plus `stylesheet media="print" onload="this.media='all'"` mit `noscript`-Rueckfall, dazu `preconnect` auf fonts.googleapis.com UND fonts.gstatic.com. Das allein brachte auf der Startseite 1,9 s weniger Renderblockade (Leistung 89 auf 100). **Favicon gehoert zur Grundausstattung:** favicon.ico (Browser fragen es auch ohne Link-Tag ab, sonst 404 in der Konsole und Abzug bei Best Practices), dazu favicon.svg und apple-touch-icon; alle aus dem Logo per Headless-Chrome gerendert.
## P-15 · Produktseiten-Tiefe-Pattern (Möglichkeiten zeigen, DNA behalten)
**Wann:** Eine Produkt-Landingpage wirkt zu dünn oder soll "verkaufen, was man damit schafft", ohne Farben oder Schrift zu ändern.
**Form:** Fünf Ebenen über der Grundstruktur (Hero, Splits, Preise, FAQ): (1) Hero mit drei bis vier schwebenden Glas-Datenkarten mit echten Beispielwerten aus einem Demo-Mandanten, mobil als Raster; (2) Kennzahlen-Bento direkt nach der Vertrauensleiste: eine große Karte mit Kurve oder Screen, sechs Kennzahlen, die das Produkt einlöst (Zeit, Kette, Formate, Funktionen, Preis), eine breite Regel-Karte mit Pills; (3) den Kernprozess als sichtbare Kette aus Belegkarten mit Pfeilen; (4) optional eine Auftrags-Story als Zeitleiste über den echten Zeitverlauf (auf USELY nach Yasins Entscheidung wieder entfernt; wenn, dann Tage statt Uhrzeiten und berufsneutral); (5) Zielgruppen mit Icon und Ergebnis-Chip, CTA mit Chips. Variabilität aus Kartengrößen, Richtungen und Bewegung, nie aus neuen Farben. Ehrlichkeitsregel: keine erfundenen Kundenzahlen, Testimonials oder Partnerlogos; Beispieldaten als Beispiel kennzeichnen. DE und EN im selben Paket, Lighthouse danach nachmessen (P-14).
**Gesetze:** §A1 (DNA), §A2 (keine Gedankenstriche), §B1 (DE Master), §D (keine unlauteren Aussagen). Herkunft: Protokoll 2026-09-03 usely-tiefe.

## P-16 · Logo-Animation-Pattern (2026-09-19, ruht)
**Status:** Ruht seit 2026-09-19 (Yasin: zurück zum Logo in der Nav). `assets/yg-logo-anim.js` ist gelöscht, Quelle und Werkzeug in `scripts/logo/` bleiben. Reaktivieren: Bühnen-CSS, SVG-Bühne und Skript-Tag aus Commit aa3283d (index.html, en/index.html) zurückholen, dann `node scripts/logo/build.js` (bricht ab, solange die Pfade `data-part` in den Startseiten fehlen). Vorher mit Yasin klären, wo das Logo dann steht, denn §A1 verlangt das Logo in der Nav.
**Wann:** Das YG-Logo (oder ein anderes Band-Logo) soll sich animieren, ohne seine exakte Form im Ruhezustand zu verlieren.
**Form:** Geometrie nie von Hand nachzeichnen, sondern aus dem Original-PNG verfolgen (`scripts/logo/trace.js`: eigener PNG-Decoder, Marching Squares auf Alpha 0,5, Douglas-Peucker 0,3 px, Split an den schrägen Enden in zwei Seitenlinien) und per Render-Vergleich prüfen (IoU ≥ 0,999, 0 Pixel falsch). Animation in reinem JavaScript ohne Bibliothek (`scripts/logo/anim.template.js`): Ruhezustand = exakte Kontur; Formen mit Mittellinie (Schlange, Kreis) über den Tangentenwinkel; Übergänge über die Mittellinie mit Ankern im mitbewegten Rahmen, nie Kontur-zu-Kontur (sonst stülpt sich das Band um); atan2-Winkel vor Interpolation stetig machen; Nähte mit Überlappung und Gruppen-Deckkraft. Kein CSS-`filter`/`drop-shadow` auf dem Logo-SVG (Safari schneidet den Schein an der Box ab, sichtbarer Kasten); ein Schein bräuchte ein eigenes Element dahinter. Das Schlangenauge trägt die Seitenfarbe (`#050505` im Template), bei Farbwechsel Template ändern und neu bauen. Pflicht: `prefers-reduced-motion` zeigt das statische Logo, IntersectionObserver pausiert außerhalb des Bildes, statisches SVG im HTML als Fallback, feste Box (CLS 0). Bauen mit `node scripts/logo/build.js` (Engine + statische Pfade in beiden Startseiten), prüfen mit `scripts/logo/sheet.html` (Kontaktabzug) plus Detail-Zoom.
**Vorlage:** Commit aa3283d (index.html `.yg-stage` / `#ygLogo`), `scripts/logo/`.
**Gesetze:** §A1 (DNA), §A5 (Logo nur aus echten Assets), §B1 (DE und EN im selben Paket), P-14 (Lighthouse danach messen).


## P-17 · Bühne-und-Flow-Pattern (seit 2026-09-20, Startseite seit 2026-09-21 ohne zweite Seite)
**Stand:** Die Startseite zeigt nur noch Logo und Footer auf einer Bildschirmseite (`body` als Flex-Spalte, `.stage` mit `flex: 1`, Footer unten). Der Teil unten über die zweite Bildschirmseite, die Seitenpunkte und das Ausblenden beim Scrollen beschreibt den Stand vom 2026-09-20 und gilt als Vorlage, falls wieder Inhalt dazukommt.
**CSS danach aufräumen:** Wer einen großen Seitenteil entfernt, entfernt auch dessen CSS, aber nicht von Hand über weite Regex-Bereiche (so gehen `.sr-only` und `.footer-legal` still verloren), sondern anhand der im Markup vorhandenen Klassen und IDs plus der Klassen, die Skripte setzen. Danach Screenshots vor/nach vergleichen und vorher die Rauschgrenze messen (zwei identische Aufnahmen), sonst hält man Animationsrauschen für eine Regression.
**Wann:** Eine Seite soll als ruhige Bühne wirken (erste Bildschirmseite nur Marke, Inhalt erst beim Scrollen) und der Hintergrund soll leben, ohne zu zappeln.
**Form Bühne:** `section.stage` mit `min-height: 100vh; min-height: 100svh`, Inhalt per Flex mittig, darin die unsichtbare H1 und das Logo als **Bilddatei** (`assets/yg-logo.svg`, `<img>` mit width/height und `fetchpriority="high"`). Kein eingebettetes `<svg>`: das ist kein LCP-Kandidat, Lighthouse meldet dann NO_LCP und liefert gar keinen Leistungswert mehr. Beim Scrollen blendet das Logo aus und zieht nach oben (`--stage-o`, `--stage-y`, gesetzt in einem schlanken Scroll-Listener ohne `requestAnimationFrame`; das ist genauso sparsam und lässt sich im Testbrowser prüfen, denn im ausgeblendeten Fenster laufen keine Animationsframes). Der nächste Abschnitt ist ebenfalls `100svh` hoch und mittig, damit er sich wie eine zweite Seite anfühlt.
**Form Flow (Stand 2026-09-20, zweite Runde nach Yasins Gradient-Vorlage):** `.flow` (fixed, z-index 0) trägt einen diagonalen Grundverlauf (dunkel nach blau) und darin vier `span`. Jedes `span` ist ein weiches `radial-gradient`, wird mit `mix-blend-mode: screen` additiv überblendet und trägt seine eigene `filter: blur(52px)`. Animiert wird nur `transform`: drei Felder drehen sich langsam um **versetzte** `transform-origin` (46 s, 63 s, 81 s, eines rückwärts), eines driftet. Die Unschärfe gehört an das einzelne Feld, nicht an den Container: so wird jedes Feld einmal gerastert und danach nur noch verschoben, statt den Filter in jedem Bild neu zu rechnen. Durch die versetzten Drehpunkte überlagern sich die Felder ständig anders, das ergibt die fließende, wellenartige Bewegung ohne erkennbare Einzelkreise (erste Fassung war ein großes Feld, das sah nach einem wandernden Ring aus). `prefers-reduced-motion` schaltet die Animation ab; das Grain darüber verhindert Streifen. **Seitenanzeige:** zwei Punkte `.dots` fix am rechten Rand, aktiv = gefüllt, inaktiv = Ring; beide sind Links auf die Abschnitts-Anker, umgeschaltet im selben Scroll-Handler.
**Farben aus einer Vorlage übernehmen:** Bild nach PNG wandeln, mit eigenem Decoder ein Raster von Punkten abtasten (Grundton, Spitzenwert, Randwerte), daraus Mitte und Radien der Ellipse ableiten, CSS setzen, Screenshot an denselben relativen Punkten gegenmessen und in zwei bis drei Runden angleichen. Nie nach Gefühl mischen.
**Fallen:** Ohne Nav muss der Sprachwechsel woanders stehen (bei uns im Footer, §B) und Unterseiten brauchen weiter eine Nav, sonst gibt es keinen Rückweg. Im ausgeblendeten Browser-Bereich laufen keine Animationsframes, dort lässt sich die Scroll-Logik nicht prüfen.
**Vorlage:** index.html `section.stage` + `.flow`, verify.py (Nav-Verbot auf der Startseite, `.flow`-Pflicht).
**Gesetze:** §A1 (DNA), §A2, §B1 (DE und EN im selben Paket), P-14 (danach messen).

---

## Offen / noch zu definieren
- Testimonial-Pattern (Block G — erst wenn echte Testimonials vorliegen)
- Ratgeber-Pattern (Block H — /website-kosten als Vorlage, formalisieren beim zweiten Ratgeber)
- Kampagnen-Landing-Pattern (falls K1 eigene Varianten braucht)

*YG Pattern-Katalog v1.8 · 2026-09-20 (P-13 Demo-Mandant, P-14 Web-Vitals, P-15 Produktseiten-Tiefe, P-16 Logo-Animation, ruht; v1.6: P-11 kurze Karten mit Subgrid, P-16 ohne filter; v1.7: P-16 ruht; v1.8: P-17 Bühne und Flow)*

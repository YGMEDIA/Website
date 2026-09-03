# YG PATTERN-KATALOG

> Wiederkehrende Bau-Muster, aus der echten Site erkannt (Stand Juli 2026). Jede Änderung folgt einem Pattern — oder definiert hier ein neues. Ein Pattern ist erst "echt", wenn es mindestens einmal im Repo funktioniert.

## P-1 · Seiten-DNA-Pattern
**Wann:** Jede neue Seite, DE wie EN.
**Form:** Bestehende Seite gleichen Typs als Vorlage kopieren (nie from scratch): Head mit Title "<Seite> — YG MEDIA", Description, Canonical, hreflang-Trio (nur indexierbar), og:image + Twitter Cards, ggf. Schema · Body mit vollständiger Nav (+ seitenspezifischem Sprachwechsler), Canvas/Orbs/Grid/Grain, Sections, Footer, Cookie-Banner (außer Rechtsseiten). Danach: Sitemap + verify.py.
**Vorlage:** index.html (Produkt-Startseite, seit 2026-09-02), usely.html (Produkt-Detailseite), impressum.html (Legal). website.html & Co. sind geparkt und keine Vorlagen mehr.
**Gesetze:** §A1, §B3, §C2.

## P-2 · EN-Nachzieh-Pattern
**Wann:** Jede Änderung an einer DE-Seite mit EN-Pendant.
**Form:** DE-Master ändern → dieselbe Änderung handübersetzt in der EN-Datei (Links auf EN-Pendants, absolute Asset-Pfade, eigenständige Schema-/Meta-Übersetzung) → beide Dateien im selben Commit. Bei Massen-Änderungen Python-Replacement-Skript (COMMON/LINKS-Tabellen, Muster _build_en.py) mit QA-Scan auf deutsche Reste; Reihenfolge beachten: Link-Replaces VOR dem Sprachwechsler-Swap.
**Gesetze:** §B1, §B2, §B4.

## P-11 · Produkt-Karten-Pattern (seit 2026-09-02)
**Wann:** Eigene Produkte auf der Startseite (USELY, YOU, SPACE SOCCER, Paukbox); Partner/Referenzfall als volle Breite.
**Form:** `.product-grid` (2 Spalten, ≤768px 1 Spalte) aus `.product-card` (Glass, `id` = Produkt-Anker, `scroll-margin-top`): `.product-img` (feste Höhe 280/220px, object-fit cover, NIE aspect-ratio) + `.ref-tag` (Markt · Plattform · Status) + h3 "NAME. Claim." + Absatz (nur belegte Fakten aus Yasins Quellen) + `.service-tags` + `.product-links` (interner Link oder externer Produkt-Link, bei USELY zusätzlich App-Store-Badge). Partner Felgen Brillant als `.ref-feature` (P-3). Hero-Karte spiegelt die Produkte als `.hero-tile`-Kacheln mit denselben Logos.
**Assets:** Logos aus Yasins Originalen nur skaliert (sips) und als WebP (cwebp q86–88) unter `assets/logo-<produkt>.webp`; Originale bleiben im Repo.
**Neue Produkte:** Karte DE + EN im selben Paket, Hero-Kachel, Footer-Spalte "Produkte", Fakten-Karte ("Eigene Produkte"-Zahl), Schema `brand`-Liste.
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

---

## Offen / noch zu definieren
- Testimonial-Pattern (Block G — erst wenn echte Testimonials vorliegen)
- Ratgeber-Pattern (Block H — /website-kosten als Vorlage, formalisieren beim zweiten Ratgeber)
- Kampagnen-Landing-Pattern (falls K1 eigene Varianten braucht)

*YG Pattern-Katalog v1.2 · 2026-09-03 (P-13 Demo-Mandant-Pattern)*

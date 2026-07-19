# YG PATTERN-KATALOG

> Wiederkehrende Bau-Muster, aus der echten Site erkannt (Stand Juli 2026). Jede Änderung folgt einem Pattern — oder definiert hier ein neues. Ein Pattern ist erst "echt", wenn es mindestens einmal im Repo funktioniert.

## P-1 · Seiten-DNA-Pattern
**Wann:** Jede neue Seite, DE wie EN.
**Form:** Bestehende Seite gleichen Typs als Vorlage kopieren (nie from scratch): Head mit Title "<Seite> — YG MEDIA", Description, Canonical, hreflang-Trio (nur indexierbar), og:image + Twitter Cards, ggf. Schema · Body mit vollständiger Nav (+ seitenspezifischem Sprachwechsler), Canvas/Orbs/Grid/Grain, Sections, Footer, Cookie-Banner (außer Rechtsseiten). Danach: Sitemap + verify.py.
**Vorlage:** website.html (Service), usely.html (Produkt), impressum.html (Legal).
**Gesetze:** §A1, §B3, §C2.

## P-2 · EN-Nachzieh-Pattern
**Wann:** Jede Änderung an einer DE-Seite mit EN-Pendant.
**Form:** DE-Master ändern → dieselbe Änderung handübersetzt in der EN-Datei (Links auf EN-Pendants, absolute Asset-Pfade, eigenständige Schema-/Meta-Übersetzung) → beide Dateien im selben Commit. Bei Massen-Änderungen Python-Replacement-Skript (COMMON/LINKS-Tabellen, Muster _build_en.py) mit QA-Scan auf deutsche Reste; Reihenfolge beachten: Link-Replaces VOR dem Sprachwechsler-Swap.
**Gesetze:** §B1, §B2, §B4.

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

---

## Offen / noch zu definieren
- Testimonial-Pattern (Block G — erst wenn echte Testimonials vorliegen)
- Ratgeber-Pattern (Block H — /website-kosten als Vorlage, formalisieren beim zweiten Ratgeber)
- Kampagnen-Landing-Pattern (falls K1 eigene Varianten braucht)

*YG Pattern-Katalog v1.0 · 2026-07-19*

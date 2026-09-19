# YG FRAMEWORK — Das Systemdokument

> **Version 2.5 · Kanonisch · 2026-09-19** (Fast schwarz, kurze Karten; Logo-Animation 2.4; Minimal-Auftritt 2.2; v2.0 Produkt-Positionierung vom 2026-09-02, v1.0 vom 2026-07-19)
> Konsolidiert aus: der echten Live-Site (20 Seiten, deployed), den Projektanweisungen v5.0, dem SEO-Konzept Rev. 4 und allen Build-Sessions seit Juni 2026.
> Konfliktregel: Bei Widerspruch zwischen Dokumenten gewinnt dieses. Bei Widerspruch zwischen Doku und Repo gewinnt das Repo — dann wird die Doku korrigiert.
> Muster übernommen aus den Brains von USELY, YOU und SPC (Vollautonomie, Loop-Regeln, Leseregeln, Governance); wo die drei sich widersprachen, wurde die für ein Website-Projekt sauberste Variante gewählt und hier dokumentiert.

---

# TEIL 0 · LEITPRINZIPIEN

1. **Datenlage vor Annahme.** Entscheidungen basieren auf Search-Console-Daten, Keyword-Planner-Zahlen und der echten Site — nie auf Bauchgefühl oder erinnerten Zahlen. Was nicht belegt ist, wird nicht behauptet.
2. **Atomic SEO.** Erst die kleine, gewinnbare Nische dominieren (webdesign würzburg, werbeagentur würzburg), dann skalieren (ki agentur). Kein Frontalangriff auf umkämpfte Keywords ohne Fundament.
3. **Die Seite verkauft Vertrauen, nicht Features.** Zielkunden sind Spezialisten ohne Digital-Wissen. Jede Seite übersetzt, was ein Betrieb wirklich tut, in Kommunikation, die Anfragen erzeugt. Ergebnis und System stehen über dem Bauen; nie die Billig-Option spielen.
4. **DE ist Master.** Die deutschen Seiten sind die eine Wahrheit, EN unter /en/ wird nachgezogen — immer im selben Arbeitspaket, nie als Drift.
5. **Statisch ist der Vorteil.** Kein CMS, kein Framework, kein Build-Zwang: maximale Geschwindigkeit, null Hosting-Kosten, keine Angriffsfläche. Ein CMS ist ein Produkt für Kunden, nie für yg-media.de selbst.
6. **Hybrid-Entwicklung.** Claude Code baut nach diesem Framework; Yasin entscheidet, liefert externe Daten (GSC-Pakete, Dashboards) und hält das Rollback-Recht. Alles wird aus dem Framework abgeleitet — kein Feature ad-hoc.

---

# TEIL I · GESCHÄFTSMODELL & POSITIONIERUNG

## 1.1 Was YG MEDIA ist (Positionierung seit 2026-09-02)
**Digitale Agentur für Software, Marketing und Robotik** (Würzburg, Inhaber Yasin Gündogdu), die **eigene Produkte** baut und die Website als Informationsseite über diese Produkte nutzt. Dienstleistungen werden nicht mehr beworben (Entscheidung Yasin, 2026-09-02, wegen Anfragen-Flaute und Neuausrichtung). Produkte auf der Website: **USELY** (Buchhaltung → ERP, live im App Store, iOS + Web), **YOU** (Körper und Geist, iOS + YOU Band), **Paukbox** (Karteikarten-Web-App, paukbox.yg-media.de). **SPACE SOCCER** (Mobile Game, EU-Marke) wird seit 2026-09-08 auf der Website nicht mehr gezeigt (Entscheidung Yasin); die Marke bleibt bestehen, das Projekt ist damit nicht bewertet. **Felgen Brillant** ist ein eigenes Mit-Aufbau-Projekt und Partner (Marke, Marketing, Website, Shop, Software), NICHT als Investor zu bezeichnen (Yasin, 2026-09-03). Nächster Horizont: Robotik, konkret eine vollautomatisierte, robotergestützte Felgen-Pulverbeschichtungsanlage bei Felgen Brillant. Konzepte (Hotel-KI, Adidas Vision Pro, Audi VisionPro) stehen als Visionskonzepte, nicht als Studien; Kunden-Designstudien (Derma) sind raus. 10+ Jahre, 60+ Unternehmen, YG MEDIA® und SPACE SOCCER eingetragene Marken.
Keine Person-Inszenierung: kein Portrait, kein "Über mich", kein Erstgespräch-CTA. **Seit 2026-09-19 (Yasin) zeigt die Website nur noch die vier Produktkarten (USELY, YOU, Paukbox, Felgen Brillant) und die Rechtsseiten:** kein Hero, keine Konzepte, kein Horizont, kein Unternehmens-Block, kein Kontaktformular, keine Social-Links. Kontaktwege stehen nur noch im Impressum (info@yg-media.de · +49 177 4476392). X/Twitter wird nirgends verlinkt. Quelle aller Produktaussagen: Visionskonzept `/yg-media-vision` (noindex) + Produktseiten.
Historie: Bis 2026-09-02 war die Site der Anfragen-Kanal eines Digital Business Builders (Website/App/Marketing/Automation, Calendly). Diese Seiten waren ab 2026-09-02 geparkt und sind seit 2026-09-19 auf Yasins Freigabe gelöscht (siehe 2.2).

## 1.2 Keyword-Strategie (seit 2026-09-02: Brand + Produkt; Service-Tabelle archiviert in 03-research/keyword-strategie.md)
| Seite | Ziel-Keywords | Logik |
|---|---|---|
| / | yg media, yasin gündogdu, digitale agentur software marketing robotik | Brand (GSC: 90 % der Klicks sind Brand) |
| /usely | (keins mehr) | Seit 2026-09-19 Weiterleitung auf usely.yg-media.de (DE) bzw. /en/ (EN); Produkt-SEO für "usely" läuft auf der Subdomain. Historie: GSC 2026-09-02 211 Impressionen für "usely", 0 Klicks, rankende URL /en/usely |
| (später) | paukbox | eigene Produktseite erst, wenn Substanz da ist (Struktur folgt Substanz) |
Geparkte Service-Seiten (noindex) tragen keine Keyword-Ziele mehr. EN-Seiten adressieren "Germany, Austria and Switzerland", eigenständige Titles/Descriptions. Regel: Ein Keyword-Ziel pro Seite.

## 1.3 Wachstumsstufen (neu gefasst 2026-09-02)
| Stufe | Ziel | Messkriterium | Stand |
|---|---|---|---|
| 1 | Neue Positionierung indexiert | 2 Sitemap-URLs (/, /en/) indexiert; /usely als Weiterleitung und die gelöschten Service-Seiten (404) aus dem Index (GSC "Seiten") | läuft (Baseline 2026-09-02: 33 Klicks / 1.049 Impr. in 3 Monaten, fast nur Brand) |
| 2 | Produkt-Sichtbarkeit | Klicks auf "usely"/"paukbox"-Queries > 0, /usely-CTR > 1 % | nächste (gsc-loop) |
| 3 | Produkt-Conversions | App-Store-Klicks, Paukbox-Öffnungen, Partnerschafts-Anfragen mit Quelle (GA4) | danach |
Regel: Stufe N ist messbar erreicht, bevor Aufwand in N+1 fließt. Kampagne K1 (Service-Landing /website) ist damit obsolet.

---

# TEIL II · SITE-ARCHITEKTUR

## 2.1 Grundsatz
GitHub Pages (Repo derzeit öffentlich, Account GitHub Free), Domain via IONOS (CNAME www → ygmedia.github.io, 4 A-Records 185.199.108–111.153), HTTPS aktiv. **Kanonische Domain ist non-www (https://yg-media.de)** — alle Canonicals, hreflang und og:url der Live-Site nutzen sie; der CNAME-Host bleibt www. HTML/CSS/JS pur, eine Datei pro Seite. DE im Root, EN als statische, vollständig übersetzte Kopien unter /en/. KEIN JS-Sprachumschalter zur Laufzeit (hreflang braucht eigene indexierbare URLs).

## 2.2 Seitenpaare (DE ↔ EN)
Indexierbar (seit 2026-09-19): nur / ↔ /en/ (hreflang-Trio de/en/x-default=de, Sitemap 2 URLs). Weiterleitungs-Stubs (keine DNA, Canonical + meta refresh 0): /usely → https://usely.yg-media.de/ · /en/usely → https://usely.yg-media.de/en/.
Gelöscht am 2026-09-19 (Yasins Freigabe, vorher ab 2026-09-02 geparkt): /website ↔ /en/website · /apps ↔ /en/apps · /marketing ↔ /en/marketing · /automation ↔ /en/automation · /website-kosten ↔ /en/website-costs; die URLs antworten mit 404. Standalone-Upload von Yasin (noindex, keine DNA): /felgen-brillant (vertrauliches Pitch-Deck). Das Visionskonzept /yg-media-vision hat Yasin am 2026-09-02 gelöscht; sein Inhalt lebt als Quelle in 06-specs/SPEC-produkt-positionierung.md und im Protokoll weiter. Kunden-Previews (index_*.html, assets_02/) und interne Tools (buecher-cw, more-produkt-berater) sind seit 2026-09-02 aus dem Repo entfernt (Yasin) und liegen in ~/Desktop/webseiten-brain/.
Rechtsseiten (noindex, nicht in Sitemap): /impressum ↔ /en/legal-notice · /datenschutz ↔ /en/privacy-policy · /nutzungsbedingungen ↔ /en/terms-of-use (EULA USELY — die DE-URL ist die App-Store-Pflicht-URL, ändert sich NIE). EN-Rechtsseiten tragen den Hinweis "German version legally binding".
Interne Seiten (noindex, kein EN): buecher-cw, more-produkt-berater, pdfs/.

## 2.3 Seitenaufbau (DNA — Details Constitution §A)
Jede Seite: identische Nav (seit 2026-09-19 nur Sprachwechsler-Dropdown rechts, auch beim Scrollen transparent, kein Logo, keine Menüpunkte) · identischer Footer (eine Zeile: Copyright, Rechtliches, DE/EN-Pills; keine Social-Links) · fast schwarzer animierter Hintergrund (neutrale Canvas-Partikel + ein leiser Lichtfleck + schwaches Grid + Grain) · Glass-Cards, Glow nur auf Teal-Text/Primär-Buttons, Playfair-Serif-Akzente · Cookie-Banner + consent-gated GA4 auf allen Seiten AUSSER Rechtsseiten.

## 2.4 Design-Tokens
--teal #226886 · --teal-bright #2b86a7 · --bg #050505 · --text #F0F0F0 · --muted #8B8B94 · --faint #34343A · Inter + Playfair Display italic · Hero-H1 clamp(2.2rem, 3.8vw, 4.2rem) einheitlich · Glass rgba(255,255,255,0.04)+blur(16px) · Nav transparent · Footer rgba(12,12,12,0.6)+blur(28px) · Lichtfleck .orb-1 rgba(215,222,230,0.11) (seit 2026-09-19, vorher Blaustich #07070F mit vier Teal-Orbs).

## 2.5 Dienste & IDs
GA4 `G-MHQJ0HLBM3` (Property 437337038), consent-gated via localStorage `yg_cookie_consent`, IP-Anonymisierung · Formspree `xojbbzad` · Calendly `https://calendly.com/yg-media/30min` · USELY App Store `https://apps.apple.com/de/app/usely/id6783429050` · Search Console Domain-Property `yg-media.de` · Kontakt info@yg-media.de / +49 177 4476392 (tel: + wa.me).

---

# TEIL III · MODULE

**M1 Startseite (seit 2026-09-19)** — nur die Sektion #produkte: unsichtbare H1 (`.sr-only`), darunter das animierte YG-Logo `#ygLogo` mittig (P-16, Skript /assets/yg-logo-anim.js), dann vier `.product-card` (USELY, YOU, Paukbox, Felgen Brillant) mit h2, in einer Reihe ab 1200 px, darunter zwei Spalten, ab 768 px eine. Kein Hero, keine Konzepte, kein Horizont, kein Unternehmens-Block, kein Kontakt. ProfessionalService-Schema mit NAP bleibt (unsichtbar, sameAs ohne X).
**M2 Service-Seiten (4)** — je ein Keyword, FAQ-Akkordeon mit FAQ-Schema (5 Fragen, Schema-Sprache = Seitensprache), Referenz-Highlights.
**M3 USELY-Produktseite** — Keyvisual-Hero, 6 Feature-Blöcke mit echten Screenshots (WebP), Download-Band, Macher-Story mit Timeline, FAQ (6), MobileApplication-Schema. Die Startseiten-Karte beschreibt die APP, die Story lebt nur auf /usely.
**M4 MOFU-Ratgeber** — /website-kosten: Preisvergleich-Grid, Kostenfaktoren, FAQ-Schema. Weitere Ratgeber (z.B. app entwickeln kosten) nach GSC-Signal.
**M5 Rechtsseiten** — Legal-Card-Layout, noindex, kein GA/Banner.

---

# TEIL IV · ROADMAP

**A** Push + Search Console: aktuellen Stand deployen, Sitemap (14 URLs) neu einreichen, /en/ zur Indexierung anstoßen. — erledigt 2026-07-19
**B** Deploy-Absicherung: Actions-Workflow aktivieren, damit brain/, scripts/, CLAUDE.md NIE live gehen (STATUS Befund 1). — erledigt 2026-07-19 (Pages-Source: GitHub Actions, Live-Check /brain/ = 404)
**C** GitHub-Entscheidung (Yasin): Pro-Upgrade 4 $/Monat (Repo privat) ODER öffentlich lassen + interne Dateien auslagern. Vercel ist keine Option.
**D** Kampagne K1: Google Ads ~7 €/Tag, Phrase, Zielseite /website (SEO-Konzept §7) — oder GSC-Daten abwarten. Geld = Yasin-Gate.
**E** GSC-Loop wöchentlich: Paket auswerten, Maßnahmen ableiten (CTR-Rettungen, Content-Chancen).
**F** Rechtstexte: Vorlagen-Hinweissatz in der dt. Datenschutzerklärung entfernen (nach Prüfung), US-Drittlandübermittlung (GitHub-Hosting) rechtlich prüfen lassen. — Yasin
**G** Testimonials einholen (Yasin), dann Einbau.
**H** Weitere Ratgeber/Content nach GSC-Signal.

---

# TEIL V · ENTWICKLUNGSSYSTEM

## 5.1 Komponenten
YG BRAIN (`brain/`, Git-versioniert, Obsidian-kompatibel): dieses Framework · Constitution · Patterns · STATUS · Loops (`04-loops/` + LOOP-STATE) · Research (`03-research/`, raw = Ground Truth) · Protokoll (`05-protokoll/`) · Specs (`06-specs/`).
Werkzeuge: Claude (Planung/Specs/Review in frischem Kontext) · Claude Code (Implementierung im Repo) · GitHub (Push = Live-Deploy) · `scripts/verify.py` (Gate).

## 5.2 Rollenteilung (Vollautonomie, Entscheidung Yasin 2026-07-19)
| Wer | Macht | Macht nicht |
|---|---|---|
| **Yasin** | Prioritäten, Spec-/Rechts-/Geld-Freigaben, externe Dashboards (IONOS, GSC, GA4, Ads, Formspree, Calendly, GitHub-Settings), GSC-Pakete liefern, Live-Stichproben, Rollback (git revert) | Boilerplate, Einzelschritte genehmigen |
| **Claude (Chat)** | Specs, Architektur-Review, GSC-Auswertung, Pushback | still zustimmen |
| **Claude Code** | Entscheiden + bauen + verifizieren + committen + pushen nach Constitution + Patterns; STATUS/Protokoll-Pflege; Übergabeliste für Yasin-Gates führen | Yasin-Gates selbst ausführen, Architektur außerhalb des Frameworks ändern, roten Stand pushen |

## 5.3 Feature-Kette (verbindlich für jedes größere Vorhaben)
Idee → Spec (`06-specs/SPEC-<name>.md`: Ziel · Keyword-/Seiten-Bezug · Änderungen DE+EN · Gesetzes-Check · Verify-Gate) → Freigabe Yasin → Claude Code baut (DE zuerst, EN im selben Paket) → verify.py grün + bei großen Umbauten Review in frischem Kontext → Commit + Push (= Deploy) → **Rückfluss** (neues Pattern? Gesetz präzisieren? → Brain).
Kleine Fixes (<5 Dateien, kein Geld/Recht/Löschen) brauchen kein Spec, aber verify.py + STATUS + Protokoll immer.

## 5.4 Loop-Regeln (verbindlich)
1 · Messbares Fertig-Kriterium (Maschine prüfbar). 2 · Macher ≠ Prüfer (Review frischer Kontext). 3 · State-Datei `04-loops/LOOP-STATE.md` — jeder Lauf liest sie zuerst, erledigte Arbeit wird nie wiederholt. 4 · Stop-Bedingung: 3 Versuche pro Item, dann blockiert loggen und weiter. 5 · Menschen-Gates (Rechtstexte, Geld, Dashboards, Löschen, workflows, settings) → stoppen, auf "braucht Yasin"-Liste, Arbeit läuft daran vorbei weiter. 6 · Kein Loop für einmalige/vage/nicht prüfbare Arbeit.

## 5.5 Brain-Leseregeln (Token-Ökonomie)
INDEX zuerst, dann STATUS, dann Links. CLAUDE.md < 200 Zeilen — zeigt aufs Brain, enthält es nicht. Update statt Duplikat; Falsches löschen (außer im Protokoll: dort als korrigiert markieren, nie löschen). `03-research/raw/` unantastbar (lesen ja, überschreiben nie). Git als einziges Sync-System — Obsidian öffnet den Ordner direkt, NIE iCloud-Sync parallel.

---

# TEIL VI · GOVERNANCE

1. Dieses Dokument ist kanonisch; Änderung nur per datiertem Änderungslog-Eintrag.
2. Constitution bricht Bequemlichkeit — was §A–§E verletzt, wird nicht gemergt, auch wenn es funktioniert.
3. Der Mensch hat das letzte Wort: Prioritäten, Rechtstexte, Geld, Domains, Workflow-/Permission-Änderungen, Rollback = Yasin. Die operative Umsetzung dazwischen läuft autonom über das verify-Gate.
4. **Struktur folgt Substanz:** Neue Brain-Dateien, Loops oder Meta-Ebenen nur, wenn sie ein konkretes, benanntes Problem lösen. Ein Pattern ist erst echt, wenn es einmal im Repo funktioniert.
5. **Keys, not prompts:** Sicherheit über Zugriffsrechte, nicht über Anweisungen: der Actions-Workflow entscheidet, was öffentlich wird (brain/, scripts/, CLAUDE.md nie); `.github/workflows/` und `.claude/settings.json` sind Menschen-Gates; Yasin hält das Rollback-Recht.

---

## Änderungslog
| Datum | Version | Änderung |
|---|---|---|
| 2026-07-19 | 1.0 | Erstfassung: konsolidiert aus Live-Site (v4.3-Stand), Projektanweisungen v5.0, SEO-Konzept Rev. 4 und Projekthistorie Juni–Juli 2026. Systematik übernommen aus den Brains von USELY (Framework/CLAUDE.md/Spec-Kette), YOU (STATUS-Verlauf, Vollautonomie-Detailregeln) und SPC (Loop-System, Protokoll-Format, Deploy-Absicherung, verify.py als Gate). |
| 2026-09-02 | 2.0 | **Produkt-Positionierung.** Site bewirbt nur noch eigene Produkte (USELY, YOU, SPACE SOCCER, Paukbox) + Partner Felgen Brillant; Agentur = Software, Marketing, Robotik. Teil I (1.1–1.3) und 2.2 neu; Service-Seiten geparkt (noindex), Sitemap 4 URLs; Kampagne K1 obsolet. Spec: 06-specs/SPEC-produkt-positionierung.md · Protokoll: 05-protokoll/2026-09-02-content-produkt-positionierung.md. |
| 2026-09-08 | 2.1 | **SPACE SOCCER von der Website entfernt** (Auftrag Yasin). Produkt-Aufzählung, Hero-Kachel, Produktkarte, Footer-Link, Formular-Option, Meta/JSON-LD und Assets raus (DE+EN); Sektion jetzt "Drei Produkte. Drei Märkte." ohne Markt Gaming. Marke und Projekt selbst unberührt. Protokoll: 05-protokoll/2026-09-08-content-space-soccer-entfernt.md. |
| 2026-09-19 | 2.2 | **Minimal-Auftritt** (Auftrag Yasin): Startseite nur noch die vier Produktkarten in einer Reihe; Nav nur Logo + Sprachwahl, Footer nur Copyright + Rechtliches + Sprachwahl auf allen 20 DNA-Seiten; X/Twitter überall entfernt und per verify.py gesperrt. Kontaktwege nur noch im Impressum. Protokoll: 05-protokoll/2026-09-19-content-minimal-startseite.md. |
| 2026-09-19 | 2.3 | **Aufräumen nach Yasins Freigabe:** /usely und /en/usely als Weiterleitungs-Stubs auf die Subdomain, die 10 geparkten Service-Seiten gelöscht, Sitemap 2 URLs, verify.py mit Kategorie REDIRECT_PAGES. Protokoll: 05-protokoll/2026-09-19-content-minimal-startseite.md (Nachtrag 2). |
| 2026-09-19 | 2.4 | **Logo-Animation:** Nav-Logo entfernt, YG-Logo groß und animiert über den Produktkarten (Y und G werden Schlange, Kreis, versinken, kehren zurück), Werkzeugkette scripts/logo. Protokoll: 05-protokoll/2026-09-19-dev-logo-animation.md. |
| 2026-09-19 | 2.5 | **Fast schwarz und kurze Karten:** Grundton #050505 mit einem Lichtfleck, Logo ohne Schein (Safari-Kasten), Nav ohne Milchglas, Karten mit Produktname als Titel, Stichpunkt "was es ist" und einem kurzen Absatz, per Subgrid ausgerichtet; Nutzungsbedingungen-H1 "YG MEDIA". Protokoll: 05-protokoll/2026-09-19-design-schwarz-kurze-karten.md. |
| 2026-07-19 | 1.1 | Roadmap-Blöcke A + B erledigt: Actions-Deploy aktiv (Brain bleibt privat), Sitemap 14 URLs in GSC neu eingereicht, 4 EN-URLs zur Indexierung beantragt, Enforce HTTPS aktiv (http→https 301). Details: 05-protokoll/2026-07-19-system-repo-uebernahme.md. |

---
*YG FRAMEWORK v1.0 · Single Source of Truth · oberste Datei neben INDEX.md*

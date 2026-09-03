# YG STATUS

> Lebendiges Session-Gedächtnis. Hält fest, was zuletzt passiert ist, was läuft und was als Nächstes kommt.
> Regel: Nach jedem abgeschlossenen Schritt aktualisiert. Bei Widerspruch gewinnt das Repo, dann wird diese Datei korrigiert.
> Lesereihenfolge für neue Sessions: INDEX.md → diese Datei → gezielt weiter.
> Historie vor dem Brain (Juni bis 19.07.2026) ist unten als Kompakt-Archiv erhalten; Details liegen in den Chat-Verläufen und den Projektanweisungen v5.0.

**Letzte Aktualisierung:** 2026-09-03 (Feedback-Runde 1 live; Konzept USELY One-Pager als Spec angelegt)

---

## Wo wir stehen

**Positionierung (seit 2026-09-02, Entscheidung Yasin):** www.yg-media.de bewirbt keine Dienstleistungen mehr, sondern informiert über die eigenen Produkte (USELY, YOU, SPACE SOCCER, Paukbox) und den Partner/Investor Felgen Brillant. YG MEDIA = digitale Agentur für Software, Marketing und Robotik (Würzburg, Inhaber Yasin Gündogdu). Keine Person-Inszenierung, kein Calendly. Startseite DE+EN komplett neu; Nav = Produkte/Konzepte/Unternehmen/Kontakt; Footer = Produkte/Unternehmen (Yasin Gündogdu, Felgen Brillant, Konzepte, Kontakt)/Rechtliches. 10 Service-Seiten geparkt (noindex, nirgends verlinkt, Dateien bleiben). Indexierbar nur noch / und /usely (DE+EN), Sitemap 4 URLs. Framework v2.0, Constitution v1.2, Patterns v1.1, verify.py v2 grün (24 Seiten). Spec: 06-specs/SPEC-produkt-positionierung.md · Protokoll: 05-protokoll/2026-09-02-content-produkt-positionierung.md.

**Site (Historie bis 2026-09-02):** LIVE (www.yg-media.de, GitHub Pages via Actions-Workflow; HTTPS erzwungen, http→https 301 API-verifiziert). 20 Brain-bekannte Seiten: 10 DE + 10 EN, 7 indexierbare Paare mit hreflang-Trios, 3 Rechtsseiten-Paare (noindex), 2 interne Seiten. Sitemap 14 URLs (2026-07-19 von 16 bereinigt, §C2). Korrektur zum früheren Stand: v4.3 war bereits VOR der Repo-Übernahme auf origin/main gepusht (Belege im Repo: Telefon/WhatsApp-Marker, 10 EN-Seiten). Dazu 11 Kunden-Preview-Seiten (index_ac/ak/aw/bw/ep/gk/gl/jl/ku/kw/ul.html, Commits "Kunde-…" von Yasin, zuletzt 18.07.): seit 2026-07-19 alle noindex und als PREVIEW_PAGES im verify-Inventar (noindex + lang, DNA-/Em-Dash-frei, nie in der Sitemap).

**Marktdaten (GSC, Stand 2026-09-02, 3 Monate):** 33 Klicks / 1.049 Impressionen, ~90 % Brand ("yg media", "yg media agency", "yasin gündogdu"); "usely" 211 Impressionen mit 0 Klicks (rankende URL /en/usely); Service-Keywords ohne Klick. Rohnotiz: 03-research/raw/gsc/2026-09-02-gsc-3monate.md. Das ist die Baseline für die Produkt-Positionierung.

**Strategie:** Brand + Produkt statt Atomic-Service-SEO (Framework v2.0, Teil I). Kampagne K1 (Service-Landing) ist obsolet. Nächster messbarer Schritt: Indexierung der neuen Startseite + CTR-Fall "usely" im gsc-loop.

**Brain:** Am 2026-07-19 aufgesetzt (Framework, Constitution, Patterns, Loops, Protokoll, verify.py, CLAUDE.md, deploy.yml). Ersetzt die v-nummerierten Projektanweisungen; die Projektanweisungen v5.0 sind in Framework + Constitution + Patterns aufgegangen und werden nicht mehr fortgeschrieben. Seit der Repo-Übernahme (gleicher Tag) liegt alles im Repo: brain/, scripts/, CLAUDE.md, .claude/settings.json (greift ab nächster Session), .github/workflows/deploy.yml; .obsidian/ und settings.local.json bleiben via .gitignore lokal. Pages-Source steht auf "GitHub Actions" (API-bestätigt), der Workflow deployt die Site OHNE brain/, scripts/, CLAUDE.md, .claude/.

**Arbeitsmodell:** VOLLAUTONOMIE (Entscheidung Yasin, 2026-07-19, nach dem Muster von USELY/YOU/SPC). Claude Code committet und pusht selbst; Push auf main deployt live. Hartes Maschinen-Gate: verify.py grün vor jedem Commit. Menschen-Gates: Rechtstexte, Geld, externe Dashboards, Seiten-Löschung, .github/workflows, .claude/settings.json. Yasin: Live-Stichproben + Rollback via git revert.

## Todo-Landkarte (wo liegt was — ein Blick von hier reicht)
| Art des Todos | Ort | Aktuell dort |
|---|---|---|
| Entscheidungen & Handgriffe für Yasin | **hier unten: "Braucht Yasin"** | 7 Punkte |
| Offene Mängel mit Gesetzes-Bezug | **Constitution: Befund-Tabelle** | 5 offen (Rechtstexte, GitHub-Plan, geparkte Seiten, Pitch-Deck, externe Löschung) |
| Fernes / bewusst Geparktes | **hier: Später-Merkposten** | 5 Punkte |
| Freigegebene/wartende Bauvorhaben | `06-specs/` | SPEC-produkt-positionierung (gebaut 2026-09-02) |
| Laufende Arbeits-Warteschlangen | `04-loops/LOOP-STATE.md` | gsc-loop wartet auf Paket nach dem Umbau (~2026-09-16) |
| Große Roadmap (Blöcke A–H) | `YG-FRAMEWORK.md` Teil IV | D (K1) obsolet; C/F bei Yasin; G/H neu zu denken (Produkt-Content) |
| Detail-Doku alles Gemachten | `05-protokoll/` | #1 Brain-Setup · #2 Repo-Übernahme · #3 Kunden-Previews-noindex (2026-07-19) · #4 Produkt-Positionierung (2026-09-02) |
Regel: Ein Todo steht an genau EINEM Ort; diese Tabelle verlinkt nur.

---

## Laufendes Vorhaben: USELY One-Pager auf usely.yg-media.de (seit 2026-09-03)
Spec `06-specs/SPEC-usely-onepager.md` (Konzept, 10 Schritte). Wartet auf Yasin: Hosting-Freigabe (Empfehlung GitHub-Pages-Repo `usely-site`), IONOS-CNAME, Keyword-Planner-Zugang, GA4-Stream, Web-App-Testkonto, Datenschutz-Absatz. Ohne Yasin baubar: Token-CSS, Seitengerüst, Copy, Simulator-Screenshots.

## Nächster geplanter Schritt (frische Session)
0. **USELY One-Pager, Schritt 3 + 4** (Token-CSS, Gerüst, Copy) lokal starten, sobald Hosting entschieden ist; Spec-Abschnitt 9 abarbeiten, wenn Yasins Antworten da sind.
1. **Live-Stichprobe nach Deploy** (Yasin oder Claude Code per curl): https://yg-media.de/ zeigt die Produkt-Startseite, /en/ die EN-Version, /website antwortet mit noindex, sitemap.xml hat 4 URLs.
2. **Yasins Antworten einarbeiten:** Pitch-Deck-Erreichbarkeit (0c), GSC-Handgriffe (0a).
3. **gsc-loop Lauf 2** mit dem ersten GSC-Paket nach dem Umbau (~2026-09-16): Indexierung der 4 URLs, Abgang der geparkten Seiten, CTR "usely" → ggf. Title/Description von /usely und /en/usely schärfen.
4. Optional (nach Yasin-Signal): eigene Produktseiten /paukbox und /space-soccer nach P-11/P-1, sobald Substanz (Screenshots, Texte) vorliegt.

---

## Braucht Yasin (Entscheidungen & Handgriffe)
0. ~~Löschung der Kunden-Previews~~ **erledigt durch Yasin selbst** (2026-09-02, Web-Commits): alle index_*.html, assets_02/, buecher-cw, more-produkt-berater und yg-media-vision sind aus dem Repo entfernt; verify-Inventar nachgezogen (INTERNAL_PAGES = felgen-brillant.html).
0a. **GSC nach dem Umbau:** Sitemap eingereicht (Yasin, 2026-09-03, erledigt). Noch offen: URL-Prüfung + "Indexierung beantragen" für https://yg-media.de/ und https://yg-media.de/usely. Erwartung in 2–4 Wochen: geparkte Service-URLs unter "Nicht indexiert (noindex)".
0b. **Visionskonzept:** /yg-media-vision wurde von Yasin gelöscht (2026-09-02); der Inhalt ist als Quelle im Spec/Protokoll gesichert. Falls es wieder online soll: Datei zurück ins Repo + INTERNAL_PAGES in verify.py.
0c. **Pitch-Deck:** /felgen-brillant ("Vertraulich") ist per Direkt-URL öffentlich erreichbar (noindex/nofollow). Bewusst so, oder in ein privates Repo?
1. **GitHub-Plan-Entscheidung:** Pro (4 $/Monat, Repo privat; Reihenfolge: Upgrade → privat → Settings/Pages prüfen → Domain verifizieren) ODER öffentlich lassen + buecher-cw/more-produkt-berater/pdfs in separates privates Repo.
2. **Kampagne K1:** obsolet seit der Produkt-Positionierung (Zielseite /website ist geparkt). Nur noch relevant, falls Ads für ein Produkt (z. B. USELY) gewünscht sind.
3. **Rechtstexte:** Vorlagen-Hinweissatz am Ende der dt. Datenschutzerklärung entfernen (nach Prüfung) + US-Drittlandübermittlung (GitHub-Hosting) rechtlich prüfen lassen.
4. **GSC-Paket nach dem Umbau** (~2026-09-16: Leistung 28 Tage + Seiten-Bericht) → startet gsc-loop Lauf 2.

## Später-Merkposten
- Eigene Produktseiten /paukbox, /space-soccer, /you (P-11/P-1), sobald Screenshots und Texte vorliegen; YOU-Status (App Store ja/nein) mit Yasin klären.
- Geparkte Service-Seiten endgültig löschen oder als Redirect-Stubs auf / umbauen (Yasin-Gate).
- og-image.png trägt noch das alte Motiv; bei Gelegenheit Produkt-Motiv (1200×630).
- Testimonials (Block G) und Ratgeber (Block H) sind unter der Produkt-Positionierung neu zu denken (Produkt-Content statt Service-Content).
- Google Business Profil bewusst PAUSIERT (Präferenz minimale Präsenz) — nur auf Yasins Zuruf.
- CMS-Paket-Baustein fürs Kunden-Angebot (WordPress+ACF / Kirby Modul-Bibliothek) — eigenes Vorhaben, nicht yg-media.de.
- IONOS-Redirect-Feinschliff und weitere Domains — nur bei Bedarf.

---

## Verlauf (chronologisch, neueste zuletzt)
1. **2026-07-19 · Brain gebaut (system).** YG Brain aus dem Muster der drei Vorlagen-Brains (USELY, YOU, SPC) aufgesetzt: Framework v1.0, Constitution v1.0 (§A–§E), Patterns P-1…P-10, Loops (gsc-loop + LOOP-STATE), Protokoll, Research-Struktur, CLAUDE.md, scripts/verify.py (gegen die echte v4.3-Arbeitskopie grün gelaufen), .github/workflows/deploy.yml (Brain-Schutz). Inhalte konsolidiert aus Projektanweisungen v5.0 + SEO-Konzept Rev. 4. Handoff läuft ab jetzt über dieses Brain. Details: 05-protokoll/2026-07-19-system-brain-setup.md.
2. **2026-07-19 · Repo-Übernahme (system).** Pages-Source von Yasin auf "GitHub Actions" umgestellt (API-bestätigt: build_type=workflow); Reihenfolge bewusst gedreht (Umstellung VOR dem ersten Push statt "deploy.yml zuerst"), damit zu keinem Zeitpunkt ein Legacy-Deploy brain/ ausliefern kann. Dann: verify-Fixes im Repo (Sitemap 16→14 URLs, 2 sichtbare Em-Dashes buecher-cw — die als "behoben" dokumentierten Fixes vom Vormittag lagen nur in der separaten v4.3-Arbeitskopie, nicht im Repo), Umzug von YG-Brain/ an den Repo-Root (brain/, scripts/, CLAUDE.md, .claude/, .github/), .gitignore (.obsidian/, .DS_Store, settings.local.json), verify.py GRÜN (22 Seiten), Commit + Push = erster Actions-Deploy, Live-Checks (Site erreichbar, /brain/ 404). Befunde: v4.3 war schon gepusht (STATUS korrigiert) · 11 Kunden-Previews im Repo, indexierbar, dem Brain unbekannt (→ nächster Schritt) · https_enforced=false (→ Braucht Yasin). Details: 05-protokoll/2026-07-19-system-repo-uebernahme.md.
3. **2026-07-19 · Kunden-Previews noindex (dev).** Alle 11 Kunden-Preview-Seiten (index_*.html) per robots-Meta auf noindex gesetzt und als PREVIEW_PAGES-Kategorie in verify.py aufgenommen (Prüfumfang noindex + lang + Sitemap-Verbot; DNA-/GA-/Em-Dash-frei, da Kunden-Content). §A1-Scope und Befund-Tabelle entsprechend ergänzt. Begründung: halbfertige Previews echter Praxen dürfen nicht in Suchergebnissen zu deren Praxisnamen auftauchen und keinen Duplicate Content zur späteren Kunden-Domain erzeugen. verify GRÜN (22 Seiten + 11 Previews). Details: 05-protokoll/2026-07-19-dev-kunden-previews-noindex.md.
5. **2026-09-02 · Produkt-Positionierung (content).** Yasins Richtungsentscheidung (Sprachnachricht + GSC-Daten): nur noch eigene Produkte, keine Dienstleistungen, keine Person-Inszenierung. Vorher `git pull` (35 Commits Web-Uploads: 24 weitere Previews, Visionskonzept, Pitch-Deck). Startseite DE+EN neu gebaut (Hero mit Produkt-Kacheln, 4 Produkt-Karten + Felgen-Brillant-Feature, Konzepte, Horizont Robotik, Unternehmen mit Fakten-Karte statt Portrait, Kontakt), Nav/Footer/Tagline/Cookie-Text per Skript auf 20 DNA-Seiten, 10 Service-Seiten geparkt (noindex, orphan), USELY-Crosslinks raus, Sitemap 4 URLs, 5 Logo-WebPs, verify.py v2 (PARKED_PAGES, Nav-Invariante, Preview-Glob). Brain: Spec, GSC-Rohnotiz, Framework v2.0, Constitution v1.2, Patterns v1.1. Sichtprüfung Desktop + Mobile lokal. Befund: Previews/assets_02/interne Tools wurden parallel extern entfernt → nicht mitcommittet (Lösch-Gate); Yasin hat die Löschung dann selbst per Web-Commits gepusht (inkl. yg-media-vision), mein Commit wurde darauf rebased, verify-Inventar nachgezogen. Details: 05-protokoll/2026-09-02-content-produkt-positionierung.md.
6. **2026-09-03 · Feedback-Runde 1 (content).** Yasin: Felgen Brillant nicht als Investor nennen; Konzepte statt Studien; Adidas-Vision-Pro-Konzept statt Derma. Umgesetzt DE+EN: Felgen-Brillant-Feature neu (eigenes Mit-Aufbau-Projekt, Vision robotergestützte Pulverbeschichtungsanlage), Hero-/Horizont-Texte angepasst, Konzepte-Sektion umbenannt und umgetextet, Adidas-Karte mit neuem WebP. verify grün. Details: 05-protokoll/2026-09-03-content-feedback-felgen-konzepte.md.
4. **2026-07-19 · Deploy-Nacharbeiten (system).** Enforce HTTPS von Yasin aktiviert (API-verifiziert: https_enforced=true; http:// auf www und Apex antwortet 301). Sitemap (14 URLs) in GSC neu eingereicht und 4 EN-URLs zur Indexierung beantragt: /en/, /en/website, /en/apps, /en/usely (Yasin, bestätigt). Constitution-Befund Sitemap-Neueinreichung behoben, Framework-Roadmap A + B abgehakt (v1.1). Das System wartet jetzt nur noch auf das erste GSC-Wochen-Paket.

## Kompakt-Archiv (vor dem Brain, Juni–Juli 2026)
Site von Grund auf gebaut (Juni): Startseite + 4 Service-Seiten + Ratgeber + Rechtsseiten, Design-DNA (Canvas/Orbs/Glass), GA4 consent-gated, Formspree, Calendly, GSC verifiziert. v4.x (Juli): USELY-Produktseite (DE+EN) mit Screenshots/Story/Schemas · Referenzen-Redesign mit Safari-Fix (§A4) · komplette Zweisprachigkeit (10 EN-Seiten, Nav-Dropdown + Footer-Pills, hreflang, Sitemap 14 URLs) · EN-Rechtsseiten · App-Store-Badge freigestellt und eingebaut · Datenschutz-Fixes (H1, Hoster GitHub Pages) · Em-Dash-/Sie-Du-/Tippfehler-Bereinigung · Telefon +49 177 4476392 & WhatsApp in Kontakt/Impressum/Schema (NAP). Alle Details in den Projektanweisungen v5.0 (archiviert) und den Chat-Verläufen.

---
*YG BRAIN · STATUS · immer nach INDEX.md lesen · wird nach jedem Schritt aktualisiert*

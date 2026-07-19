# YG STATUS

> Lebendiges Session-Gedächtnis. Hält fest, was zuletzt passiert ist, was läuft und was als Nächstes kommt.
> Regel: Nach jedem abgeschlossenen Schritt aktualisiert. Bei Widerspruch gewinnt das Repo, dann wird diese Datei korrigiert.
> Lesereihenfolge für neue Sessions: INDEX.md → diese Datei → gezielt weiter.
> Historie vor dem Brain (Juni bis 19.07.2026) ist unten als Kompakt-Archiv erhalten; Details liegen in den Chat-Verläufen und den Projektanweisungen v5.0.

**Letzte Aktualisierung:** 2026-07-19 (Repo-Übernahme: Brain im Repo, Actions-Deploy aktiv)

---

## Wo wir stehen

**Site:** LIVE (www.yg-media.de, GitHub Pages via Actions-Workflow; HTTPS-Zertifikat approved, Enforce-Haken fehlt noch → Braucht Yasin). 20 Brain-bekannte Seiten: 10 DE + 10 EN, 7 indexierbare Paare mit hreflang-Trios, 3 Rechtsseiten-Paare (noindex), 2 interne Seiten. Sitemap 14 URLs (2026-07-19 von 16 bereinigt, §C2). Korrektur zum früheren Stand: v4.3 war bereits VOR der Repo-Übernahme auf origin/main gepusht (Belege im Repo: Telefon/WhatsApp-Marker, 10 EN-Seiten). Dazu 11 Kunden-Preview-Seiten (index_ac/ak/aw/bw/ep/gk/gl/jl/ku/kw/ul.html, Commits "Kunde-…" von Yasin, zuletzt 18.07.): seit 2026-07-19 alle noindex und als PREVIEW_PAGES im verify-Inventar (noindex + lang, DNA-/Em-Dash-frei, nie in der Sitemap).

**Marktdaten (GSC, Stand Juli 2026):** 12 Klicks / 344 Impressionen in 3 Monaten, fast ausschließlich Brand-Queries. Baseline für alle kommenden Maßnahmen. Nächstes GSC-Paket startet den gsc-loop.

**Strategie:** Atomic SEO (Framework 1.2/1.3, Details 03-research/keyword-strategie.md). Kampagne K1 geplant (~7 €/Tag, Phrase, Zielseite /website) — Start oder GSC-Warten ist Yasins Call. Roadmap-Blöcke A–H im Framework Teil IV.

**Brain:** Am 2026-07-19 aufgesetzt (Framework, Constitution, Patterns, Loops, Protokoll, verify.py, CLAUDE.md, deploy.yml). Ersetzt die v-nummerierten Projektanweisungen; die Projektanweisungen v5.0 sind in Framework + Constitution + Patterns aufgegangen und werden nicht mehr fortgeschrieben. Seit der Repo-Übernahme (gleicher Tag) liegt alles im Repo: brain/, scripts/, CLAUDE.md, .claude/settings.json (greift ab nächster Session), .github/workflows/deploy.yml; .obsidian/ und settings.local.json bleiben via .gitignore lokal. Pages-Source steht auf "GitHub Actions" (API-bestätigt), der Workflow deployt die Site OHNE brain/, scripts/, CLAUDE.md, .claude/.

**Arbeitsmodell:** VOLLAUTONOMIE (Entscheidung Yasin, 2026-07-19, nach dem Muster von USELY/YOU/SPC). Claude Code committet und pusht selbst; Push auf main deployt live. Hartes Maschinen-Gate: verify.py grün vor jedem Commit. Menschen-Gates: Rechtstexte, Geld, externe Dashboards, Seiten-Löschung, .github/workflows, .claude/settings.json. Yasin: Live-Stichproben + Rollback via git revert.

## Todo-Landkarte (wo liegt was — ein Blick von hier reicht)
| Art des Todos | Ort | Aktuell dort |
|---|---|---|
| Entscheidungen & Handgriffe für Yasin | **hier unten: "Braucht Yasin"** | 6 Punkte |
| Offene Mängel mit Gesetzes-Bezug | **Constitution: Befund-Tabelle** | 3 offen (Sitemap-Neueinreichung, Rechtstexte, GitHub-Plan) |
| Fernes / bewusst Geparktes | **hier: Später-Merkposten** | 5 Punkte |
| Freigegebene/wartende Bauvorhaben | `06-specs/` | leer (nächstes Spec bei Bedarf) |
| Laufende Arbeits-Warteschlangen | `04-loops/LOOP-STATE.md` | gsc-loop wartet auf Paket 1 |
| Große Roadmap (Blöcke A–H) | `YG-FRAMEWORK.md` Teil IV | A+B als nächstes, C/D/F bei Yasin |
| Detail-Doku alles Gemachten | `05-protokoll/` | #1 Brain-Setup · #2 Repo-Übernahme · #3 Kunden-Previews-noindex (2026-07-19) |
Regel: Ein Todo steht an genau EINEM Ort; diese Tabelle verlinkt nur.

---

## Nächster geplanter Schritt (frische Session)
1. **Search Console:** Sitemap (14 URLs) neu einreichen + /en/-Indexierung anstoßen (Yasin — Deploy ist durch, ab sofort möglich).
2. Danach: gsc-loop Lauf 1 mit dem ersten Wochen-Paket. Bis dahin keine offenen Bau-Schritte; Kampagne K1 und GitHub-Plan sind Yasin-Entscheidungen.

---

## Braucht Yasin (Entscheidungen & Handgriffe)
1. **Enforce HTTPS aktivieren** (Repo-Settings → Pages, Haken unter Custom domain). API zeigt https_enforced=false; Zertifikat approved für www + Apex bis 27.08.2026. Erwartung: http://-Aufrufe leiten danach auf https:// um.
2. **Sitemap in GSC neu einreichen** (14 URLs) + Top-EN-Seiten per URL-Prüfung anstoßen — Deploy ist durch, ab sofort möglich.
3. **GitHub-Plan-Entscheidung:** Pro (4 $/Monat, Repo privat; Reihenfolge: Upgrade → privat → Settings/Pages prüfen → Domain verifizieren) ODER öffentlich lassen + buecher-cw/more-produkt-berater/pdfs in separates privates Repo.
4. **Kampagne K1:** Start (~7 €/Tag, Phrase, /website) oder erst GSC-Daten abwarten.
5. **Rechtstexte:** Vorlagen-Hinweissatz am Ende der dt. Datenschutzerklärung entfernen (nach Prüfung) + US-Drittlandübermittlung (GitHub-Hosting) rechtlich prüfen lassen.
6. **Erstes GSC-Wochen-Paket** liefern (Leistung 7 Tage + Indexierung) → startet den gsc-loop.

## Später-Merkposten
- Testimonials einholen und einbauen (Block G).
- Weiterer Ratgeber "app entwickeln kosten" (Block H, nach GSC-Signal).
- Google Business Profil bewusst PAUSIERT (Präferenz minimale Präsenz) — nur auf Yasins Zuruf.
- CMS-Paket-Baustein fürs Kunden-Angebot (WordPress+ACF / Kirby Modul-Bibliothek) — eigenes Vorhaben, nicht yg-media.de.
- IONOS-Redirect-Feinschliff und weitere Domains — nur bei Bedarf.

---

## Verlauf (chronologisch, neueste zuletzt)
1. **2026-07-19 · Brain gebaut (system).** YG Brain aus dem Muster der drei Vorlagen-Brains (USELY, YOU, SPC) aufgesetzt: Framework v1.0, Constitution v1.0 (§A–§E), Patterns P-1…P-10, Loops (gsc-loop + LOOP-STATE), Protokoll, Research-Struktur, CLAUDE.md, scripts/verify.py (gegen die echte v4.3-Arbeitskopie grün gelaufen), .github/workflows/deploy.yml (Brain-Schutz). Inhalte konsolidiert aus Projektanweisungen v5.0 + SEO-Konzept Rev. 4. Handoff läuft ab jetzt über dieses Brain. Details: 05-protokoll/2026-07-19-system-brain-setup.md.
2. **2026-07-19 · Repo-Übernahme (system).** Pages-Source von Yasin auf "GitHub Actions" umgestellt (API-bestätigt: build_type=workflow); Reihenfolge bewusst gedreht (Umstellung VOR dem ersten Push statt "deploy.yml zuerst"), damit zu keinem Zeitpunkt ein Legacy-Deploy brain/ ausliefern kann. Dann: verify-Fixes im Repo (Sitemap 16→14 URLs, 2 sichtbare Em-Dashes buecher-cw — die als "behoben" dokumentierten Fixes vom Vormittag lagen nur in der separaten v4.3-Arbeitskopie, nicht im Repo), Umzug von YG-Brain/ an den Repo-Root (brain/, scripts/, CLAUDE.md, .claude/, .github/), .gitignore (.obsidian/, .DS_Store, settings.local.json), verify.py GRÜN (22 Seiten), Commit + Push = erster Actions-Deploy, Live-Checks (Site erreichbar, /brain/ 404). Befunde: v4.3 war schon gepusht (STATUS korrigiert) · 11 Kunden-Previews im Repo, indexierbar, dem Brain unbekannt (→ nächster Schritt) · https_enforced=false (→ Braucht Yasin). Details: 05-protokoll/2026-07-19-system-repo-uebernahme.md.
3. **2026-07-19 · Kunden-Previews noindex (dev).** Alle 11 Kunden-Preview-Seiten (index_*.html) per robots-Meta auf noindex gesetzt und als PREVIEW_PAGES-Kategorie in verify.py aufgenommen (Prüfumfang noindex + lang + Sitemap-Verbot; DNA-/GA-/Em-Dash-frei, da Kunden-Content). §A1-Scope und Befund-Tabelle entsprechend ergänzt. Begründung: halbfertige Previews echter Praxen dürfen nicht in Suchergebnissen zu deren Praxisnamen auftauchen und keinen Duplicate Content zur späteren Kunden-Domain erzeugen. verify GRÜN (22 Seiten + 11 Previews). Details: 05-protokoll/2026-07-19-dev-kunden-previews-noindex.md.

## Kompakt-Archiv (vor dem Brain, Juni–Juli 2026)
Site von Grund auf gebaut (Juni): Startseite + 4 Service-Seiten + Ratgeber + Rechtsseiten, Design-DNA (Canvas/Orbs/Glass), GA4 consent-gated, Formspree, Calendly, GSC verifiziert. v4.x (Juli): USELY-Produktseite (DE+EN) mit Screenshots/Story/Schemas · Referenzen-Redesign mit Safari-Fix (§A4) · komplette Zweisprachigkeit (10 EN-Seiten, Nav-Dropdown + Footer-Pills, hreflang, Sitemap 14 URLs) · EN-Rechtsseiten · App-Store-Badge freigestellt und eingebaut · Datenschutz-Fixes (H1, Hoster GitHub Pages) · Em-Dash-/Sie-Du-/Tippfehler-Bereinigung · Telefon +49 177 4476392 & WhatsApp in Kontakt/Impressum/Schema (NAP). Alle Details in den Projektanweisungen v5.0 (archiviert) und den Chat-Verläufen.

---
*YG BRAIN · STATUS · immer nach INDEX.md lesen · wird nach jedem Schritt aktualisiert*

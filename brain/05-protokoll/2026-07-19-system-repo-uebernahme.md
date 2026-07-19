# 2026-07-19 · system · Repo-Übernahme

## Was
Das Brain ins Repo `YGMEDIA/Website` übernommen und den Deploy-Schutz scharf geschaltet: brain/, scripts/, CLAUDE.md, .claude/settings.json und .github/workflows/deploy.yml liegen jetzt am Repo-Root und sind gepusht; Push auf main deployt seitdem via GitHub Actions OHNE Brain-Interna. Vorher im selben Paket: Sitemap von 16 auf 14 URLs bereinigt (§C2) und die 2 sichtbaren Em-Dashes auf buecher-cw entfernt (§A2).

## Wie
1. Einlese-Session: CLAUDE.md → INDEX → STATUS → Framework → Constitution → Patterns → LOOP-STATE → Protokoll #1; dann Abgleich gegen Repo (verify.py via Scratchpad-Kopie, git status/log, gh api Pages).
2. Yasin-Gate: Pages-Source auf "GitHub Actions" umgestellt (Yasin, per Screenshot belegt und per API verifiziert: build_type=workflow) — BEVOR irgendetwas gepusht wurde.
3. Fixes: sitemap.xml (/impressum + /datenschutz raus) · buecher-cw.html Zeile 335 ("Fitness: fundiert…") und 349 ("MORE, abgestimmt…").
4. Umzug: YG-Brain/{brain, scripts, CLAUDE.md, .github, .claude, .obsidian} → Repo-Root; .gitignore neu (.obsidian/, .DS_Store, .claude/settings.local.json). Stolperstein: am Root existierte bereits ein Harness-generiertes .claude/ mit settings.local.json — der mv verschachtelte erst (.claude/.claude/), wurde entschachtelt.
5. `python3 scripts/verify.py` GRÜN (22 Seiten, 0 Fehler) → Commit + Push → Actions-Lauf beobachtet → Live-Checks.

## Warum so
- **Reihenfolge gedreht (Umstellung VOR erstem Push statt "deploy.yml zuerst pushen" aus STATUS):** Mit Source=Actions kann ein Legacy-Deploy zu keinem Zeitpunkt mehr den ganzen Branch (inkl. brain/) ausliefern; die Site bleibt bis zum ersten Workflow-Deploy einfach auf dem alten Stand. Strikt sicherer, ein Yasin-Klick weniger Abhängigkeit.
- **Inhalte an den Root statt YG-Brain/ committen:** deploy.yml excludiert `brain`, `scripts`, `CLAUDE.md`, `.claude`, `.github` — ein committeter Ordner `YG-Brain/` wäre von keiner Exclude-Regel gedeckt gewesen und live gegangen.
- **deploy.yml unverändert committet:** `.github/workflows/` ist Menschen-Gate; die Datei stammt aus dem freigegebenen Brain-Setup. .obsidian/ brauchte keinen Workflow-Exclude, weil es via .gitignore nie ins Repo gelangt.
- **.claude/settings.json committet, settings.local.json nicht:** Die Vollautonomie-Rechte sind Teil des Systems (Constitution E v1.1), lokale Harness-Zustände nicht.

## Verify
- verify.py GRÜN am neuen Pfad (22 Seiten, 0 Fehler, 0 Warnungen) vor dem Commit.
- Pages-API: build_type=workflow, cname=www.yg-media.de.
- Nach Push: Actions-Lauf "Deploy Site" erfolgreich; Live-Checks: Startseite 200 · /brain/ = 404 · /CLAUDE.md = 404 · /scripts/verify.py = 404 · /sitemap.xml = 14 URLs.

## Gelernt
1. **"Behoben" gilt nur pro Arbeitskopie:** Die Vormittags-Fixes (Sitemap, Em-Dashes) existierten nur in der separaten v4.3-Arbeitskopie, nicht im Repo — verify.py lief hier initial ROT (4 Fehler). Regel bestätigt: Repo gewinnt, Befunde erst nach Fix IM REPO als behoben markieren.
2. **STATUS-Drift bei parallelem Arbeiten:** v4.3 war entgegen STATUS längst gepusht, und 11 Kunden-Preview-Seiten (index_*.html, indexierbar, ohne noindex) lagen unbemerkt im Repo. Folgeentscheidung (dokumentiert): noindex + eigene verify-Inventar-Kategorie (noindex + lang; DNA-/Em-Dash-frei analog interner Tools, da Kunden-Content) — nächster Bau-Schritt.
3. **Pages-Detail:** https_enforced stand trotz "HTTPS aktiv"-Doku auf false (Zertifikat approved, Erzwingung aus) → Braucht Yasin. Framework-Aussage "HTTPS aktiv" präzisieren, wenn der Haken gesetzt ist.

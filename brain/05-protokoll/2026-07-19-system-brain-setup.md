# 2026-07-19 · system · Brain-Setup

## Was
YG Brain aufgesetzt und die Zusammenarbeit auf Claude Code + Git + Obsidian umgestellt. Dateien: brain/ (INDEX, STATUS, YG-FRAMEWORK v1.0, Constitution v1.0, Patterns v1.0, 03-research inkl. raw-Regeln, 04-loops mit gsc-loop + LOOP-STATE, 05-protokoll, 06-specs) + CLAUDE.md (Repo-Root) + scripts/verify.py + .github/workflows/deploy.yml. Die Projektanweisungen v5.0 sind vollständig in Framework/Constitution/Patterns aufgegangen und werden nicht mehr fortgeschrieben.

## Wie
Muster-Extraktion aus drei Vorlagen-Brains: USELY (CLAUDE.md-Einstieg <200 Zeilen, kanonisches Framework, Spec-Kette, Übergabe-Protokoll), YOU (STATUS mit nummeriertem Verlauf, Vollautonomie-Detailregeln, Kontext-Schnitt), SPC (Ordnerstruktur, Loop-System mit LOOP-STATE, Protokoll-Format Was/Wie/Warum/Verify/Gelernt, verify.py als Gate, Deploy-Schutz via Actions). Inhalte aus Projektanweisungen v5.0 und SEO-Konzept Rev. 4 konsolidiert. verify.py gegen die echte v4.3-Arbeitskopie entwickelt und grün gelaufen.

## Warum so
- SPC als Struktur-Vorlage, weil gleicher Projekttyp (statische GitHub-Pages-Site mit SEO-Fokus).
- STATUS als eigene Brain-Datei (SPC/YOU) statt in CLAUDE.md (USELY): hält CLAUDE.md unter 200 Zeilen.
- Nur EIN Loop zum Start (gsc-loop): Struktur folgt Substanz — content-/preis-Loops der SPC-Vorlage haben bei YG kein laufendes Gegenstück; sie entstehen, wenn der Bedarf real ist.
- Yasin-Gates auf Website-Realität geschnitten: keine DB/Store/Secrets wie bei USELY/YOU, dafür Rechtstexte, Geld, Dashboards, Seiten-Löschung, workflows, settings.
- deploy.yml VOR dem ersten Brain-Push ins öffentliche Repo: direkter Rückfluss aus dem SPC-Vorfall (Brain lag dort öffentlich live, weil Legacy-Pages den ganzen Branch deployte).

## Verify
Der erste verify.py-Lauf fand drei echte Drifts, alle behoben bzw. kodifiziert: (1) Sitemap enthielt /impressum + /datenschutz trotz noindex, entgegen der dokumentierten Regel — Sitemap auf 14 URLs bereinigt (§C2). (2) Zwei sichtbare Em-Dashes auf buecher-cw — bereinigt (§A2). (3) Die internen Tools tragen bewusst keine Site-DNA/GA — §A1-Scope entsprechend präzisiert statt die Seiten umzubauen (Repo gewinnt). Zusätzlich belegt: kanonische Domain ist non-www (https://yg-media.de), im Framework verankert.
Danach: `python3 scripts/verify.py` grün gegen die v4.3-Arbeitskopie (20 Seiten: DNA-Marker, Em-Dash-Scan, hreflang-Trios, Canonicals, Sitemap beidseitig, interne Links, JSON-LD, lang-Attribute, noindex-Regeln, CNAME). deploy.yml als valides YAML geprüft.

## Gelernt
Die drei Vorlagen-Brains widersprachen sich in der Status-Ablage und der Gate-Liste; die Auflösungen sind oben dokumentiert und in Framework-Änderungslog v1.0 verankert.

## Nachtrag (2026-07-19, gleiche Session)
Yasins Vollautonomie-Anweisung (Original-Wortlaut aus dem SPC-Umbau) vollständig übernommen: (1) `.claude/settings.json` ergänzt (bypassPermissions, allow git add/commit/push u.a., deny rm -rf/sudo) — ohne diese Datei hätte Claude Code weiter Genehmigungs-Dialoge gezeigt; sie greift ab der nächsten Session. (2) Constitution Teil E v1.1: Entscheidungs-Delegation mit Recherche- und Doku-Pflicht plus Keine-Genehmigungs-Dialoge-Regel. (3) CLAUDE.md entsprechend verdichtet (Delegation, gesammelte Übergabeliste als EIN Block). Verify: settings.json valides JSON, verify.py weiter grün.

# YG BRAIN — INDEX

> Single Source of Truth für www.yg-media.de. Lebt im Repo unter `brain/`, versioniert mit Git, öffnbar als Obsidian-Vault (Ordner direkt öffnen — nie iCloud-Sync parallel auf dem Repo).
> Lesereihenfolge: dieser Index → `STATUS.md` → gezielt die relevante Datei → Links folgen. Nie alles auf einmal.
> Handoff läuft ab jetzt über dieses Brain + Claude Code im Repo — nicht mehr über v-nummerierte Projektanweisungen und Chat-Zips.

## Navigation
| Datei / Ordner | Inhalt | Status |
|---|---|---|
| `STATUS.md` | Lebendiges Session-Gedächtnis: Stand, Todo-Landkarte, Befunde, "Braucht Yasin", Verlauf. Direkt nach dem Index lesen. | ✓ |
| `YG-FRAMEWORK.md` | **Kanonische Referenz v1.0** — Geschäftsmodell, Seiten-Architektur, Zweisprachigkeit, Design-System, SEO-Strategie, Roadmap, Entwicklungssystem, Governance. Gewinnt bei Konflikten. | ✓ |
| `01-constitution/YG-CONSTITUTION.md` | Gesetze §A Design-DNA · §B Zweisprachigkeit · §C SEO · §D Recht · §E Betrieb, mit [bewiesen]-Markern + Befund-Tabelle. Gewinnt bei Baufragen. | ✓ v1.0 |
| `02-patterns/YG-PATTERNS.md` | Bau-Muster P-1…P-10, aus der echten Site erkannt. | ✓ v1.0 |
| `03-research/` | `keyword-strategie.md` (Destillat aus SEO-Konzept Rev. 4) · `raw/` (Ground Truth: GSC-Pakete, Keyword-Planner-Daten — unantastbar). | ✓ |
| `04-loops/` | Selbstkontroll-Loops + `LOOP-STATE.md`. Jeder Lauf liest LOOP-STATE zuerst. Start: gsc-loop. Weitere Loops erst bei echtem Bedarf (Struktur folgt Substanz). | ✓ v1.0 |
| `05-protokoll/` | Das Gedächtnis fürs Detail: datierte Einträge (dev/content/marketing/system) — WAS + WIE jeder Arbeit. | ✓ seit 2026-07-19 |
| `06-specs/` | Größere Vorhaben nur nach freigegebenem Spec. | leer |

Außerhalb des Brains, gehört zum System: `/CLAUDE.md` (Einstieg für Claude Code, <200 Zeilen) · `/scripts/verify.py` (Pflicht-Gate) · `/.github/workflows/deploy.yml` (veröffentlicht die Site OHNE brain/, scripts/, CLAUDE.md — MUSS aktiviert werden, siehe STATUS Befund 1).

## Site-Stand
LIVE auf GitHub Pages (www.yg-media.de via IONOS-DNS, HTTPS aktiv). 20 Seiten (10 DE + 10 EN unter /en/), 7 indexierbare Seitenpaare mit hreflang-Trios, 3 Rechtsseiten-Paare (noindex), 2 interne Seiten (noindex, kein EN). Sitemap 14 URLs. GA4 consent-gated (G-MHQJ0HLBM3), Formspree (xojbbzad), Calendly-CTA. USELY-Produktseite mit App-Store-Anbindung.

## Arbeitsprinzip (Vollautonomie)
Yasin gibt Ziele und Produktentscheidungen → Claude Code entscheidet, baut nach Constitution + Patterns, verifiziert maschinell (`scripts/verify.py` grün vor JEDEM Commit), committet + pusht selbstständig (Push = Live-Deploy) → STATUS + Protokoll aktualisiert → Gelerntes zurück ins Brain. Yasin: Prioritäten, Freigaben (Specs, Rechtstexte, Geld), externe Dashboards, Live-Stichproben, Rollback-Recht via `git revert`. Größere Vorhaben nur nach freigegebenem Spec; kleine Fixes ohne Spec, aber nie ohne verify + STATUS.

---
*YG BRAIN · INDEX v1.0 · 2026-07-19*

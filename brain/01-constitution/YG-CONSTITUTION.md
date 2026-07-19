# YG CONSTITUTION

> Die Gesetze von www.yg-media.de. Aus dem echten Live-Projekt extrahiert (Juni–Juli 2026, Projektanweisungen v1–v5).
> Wenn neue Arbeit gegen ein Gesetz verstößt, ist entweder die Arbeit falsch oder das Gesetz veraltet. Beides wird hier entschieden, nicht im Vorbeigehen.
> Marker: **[bewiesen]** = das Repo erfüllt es heute nachweislich · **[Soll, verletzt]** = offener Befund und direkter Arbeitspunkt.

---

## TEIL A · Design-DNA-Gesetze

### §A1 · Navbar, Footer und Seiten-DNA sind unantastbar [bewiesen]
Jede Seite trägt identisch: Nav (Logo + Website/Apps/Marketing/Automation + Calendly-CTA "Erstgespräch buchen"/"Book a free call" + Sprachwechsler-Dropdown `.nav-lang`; transparent, Glass beim Scrollen, Burger mobil, aktiver Menüpunkt `.active`) · Footer (drei Spalten Services/Unternehmen/Rechtliches bzw. Services/Company/Legal, Logo + Tagline, Social nur Behance + X, DE/EN-Pills `.lang-switch`) · animierten Hintergrund (Canvas-Partikel mit Maus-Interaktion + 4 Orbs + Grid-Overlay + Grain, keine Planeten) · Glass-Cards, Reveal-Animationen, gleiche Section-Muster und Abstände. Cookie-Banner + consent-gated GA4 auf allen Seiten AUSSER Rechtsseiten (§D2). Sprachwechsler verlinkt IMMER seitenspezifisch aufs Pendant (/apps ↔ /en/apps), nie generisch auf die Startseite.
Verstoß = eine öffentliche Seite ohne vollständige Nav/Footer/DNA oder mit vereinfachter Variante.
**Scope (präzisiert 2026-07-19, Repo gewinnt):** Gilt für alle öffentlichen Seiten. Die internen noindex-Tools (buecher-cw, more-produkt-berater) sind eigenständige Projektseiten und bewusst von DNA und GA ausgenommen; verify.py prüft sie nur auf noindex, Links, lang und Em-Dashes. Kunden-Preview-Seiten (index_*.html) sind eigenständige Kundendesigns ohne YG-Copy: noindex Pflicht, von DNA/GA UND von der Em-Dash-Regel ausgenommen (Kunden-Content); verify.py prüft sie nur auf noindex + lang und dass sie nie in der Sitemap stehen.

### §A2 · Keine Gedankenstriche [bewiesen]
Kein Em-Dash (—) im sichtbaren Fließtext, deutsch wie englisch, auch nicht in FAQ-Schemas oder Meta-Descriptions. Einzige Ausnahme: die Title-Tag-Konvention "Seite — YG MEDIA". verify.py prüft das maschinell.

### §A3 · Design-Tokens und Typo-Regeln [bewiesen]
Farben/Größen aus den CSS-Variablen (--teal #226886, --teal-bright #2b86a7, --bg, --text, --muted, --faint), Glow dezent und NUR auf teal-farbigen Texten und Primär-Buttons, Playfair Display italic für blau hervorgehobene Wörter, Hero-H1 einheitlich clamp(2.2rem, 3.8vw, 4.2rem). Titel-Umbruch: `.line-inner { white-space: nowrap }` desktop, normal ≤768px (Ausnahme index-Hero, bewusst).

### §A4 · Safari-Regel für .ref-feature [bewiesen, teuer gelernt]
NIEMALS `aspect-ratio` auf die Bildspalte der Feature-Karten legen. Desktop: Bildspalte `position: relative; min-height: 480px`, Bild absolut mit object-fit: cover. Mobile/Tablet (≤1100px): einspaltig, Bild `position: static; height: auto`, `.flip` per `order: -1`. Safari berechnet aspect-ratio anders (Lücke am Desktop-Rand, kollabierende Bilder mobil) — genau dieser Bug wurde behoben und darf nie zurückkehren. Bilder müssen bei JEDER Skalierung sichtbar bleiben.

### §A5 · Logo- und Badge-Integrität [bewiesen]
Logo immer aus echten Assets extrahieren (Keyvisual), NIE pixelweise umfärben — das zerstört die Kanten; für dunkle Flächen die weiße Version. App-Store-Badge (assets/app-store-badge.png, 494×170, per Flood-Fill freigestellt) nie umfärben, beschneiden oder verzerren (Apple-Guidelines); Einsatz als `.badge-link` (46px, Hover-Lift), kein Textlink daneben.

### §A6 · Copy-Regeln [bewiesen]
Professionelle Agentur-Tonalität, outcome-orientiert, erste Person Singular vermeiden. Kein VR-Content ohne echte Projekte, keine generischen Checklisten. Die USELY-Startseitenkarte beschreibt die APP (Kalkulation, Belegkette, Beleg-Scan, XRechnung/ZUGFeRD, EÜR, GoBD/§14/§19, kostenlos), die Macher-Story lebt nur auf /usely.

---

## TEIL B · Zweisprachigkeits-Gesetze

### §B1 · DE ist Master, EN zieht im selben Paket nach [bewiesen]
Jede Design-, Struktur- oder Textänderung passiert zuerst am deutschen Master; die EN-Seite wird IM SELBEN Arbeitspaket nachgezogen. Nie nur eine Sprache ändern, nie eine Sprach-Drift committen. Historie: Der Sprachwechsler-Bug (Deutsch-Links zeigten auf EN-Seiten) entstand, weil ein Replace-Schritt nach dem Switcher-Swap lief — Reihenfolge-Disziplin ist Teil dieses Gesetzes.

### §B2 · Eigene URLs pro Sprache, kein JS-Umschalter [bewiesen]
EN-Seiten sind statische, vollständig übersetzte Dateien unter /en/ mit `<html lang="en">`, alle internen Links auf EN-Pendants, Asset-Pfade absolut (/assets/...). Ein Runtime-Umschalter würde hreflang und Indexierung brechen.

### §B3 · hreflang-Trios und Canonicals [bewiesen]
Jedes indexierbare Paar trägt das Trio de / en / x-default (=de) plus Canonical auf sich selbst; og:locale de_DE bzw. en_US. Rechtsseiten und interne Seiten tragen KEIN hreflang.

### §B4 · Eigenständige EN-Inhalte [bewiesen]
FAQ-Schemas, Titles und Descriptions werden auf EN eigenständig übersetzt (Schema-Sprache = Seitensprache), nie maschinell-wörtlich. EN adressiert "Germany, Austria and Switzerland".

---

## TEIL C · SEO-Gesetze

### §C1 · Ein Keyword-Ziel pro Seite [bewiesen]
Jede indexierbare Seite hat ihr Ziel-Keyword aus dem Keyword-Master (Framework 1.2). Keine zwei Seiten auf dasselbe Keyword. Titles/Descriptions pro Keyword sauber gesetzt.

### §C2 · Sitemap-Disziplin [bewiesen]
sitemap.xml enthält ausschließlich indexierbare Seiten (aktuell 14 URLs: 7 DE + 7 EN, die 7 Seitenpaare). Rechtsseiten und interne Seiten (buecher-cw, more-produkt-berater, pdfs/) sind noindex und stehen NICHT drin. Jede neue indexierbare Seite → Sitemap + ggf. GSC-Neueinreichung (Yasin). verify.py gleicht beidseitig ab.

### §C3 · Schema = sichtbare Wahrheit [bewiesen]
FAQ-Schema nur mit Fragen/Antworten, die sichtbar auf der Seite stehen. LocalBusiness/ProfessionalService auf der Startseite mit echtem NAP (Name, Adresse, +49-177-4476392). MobileApplication auf /usely (Preis 0 €). Alle JSON-LD-Blöcke müssen valides JSON sein (verify.py prüft).

### §C4 · Interne Links brechen nie [bewiesen]
Jeder interne href zeigt auf eine existierende Seite. verify.py prüft projektweit.

---

## TEIL D · Rechts-Gesetze

### §D1 · Die EULA-URL ist heilig [bewiesen]
/nutzungsbedingungen ist die im App Store hinterlegte Pflicht-URL der USELY-EULA. Diese URL ändert sich NIE — kein Rename, kein Redirect-Experiment, keine Struktur-Änderung, die sie bricht.

### §D2 · Rechtsseiten sind clean [bewiesen]
Impressum, Datenschutz, Nutzungsbedingungen (DE + EN): noindex, kein GA, kein Cookie-Banner, nicht in der Sitemap. EN-Versionen tragen sichtbar den Hinweis "German version legally binding" (Convenience-Übersetzung).

### §D3 · Consent vor Tracking [bewiesen]
GA4 lädt erst nach Zustimmung (localStorage `yg_cookie_consent`), IP-Anonymisierung aktiv. Ablehnen lädt nichts.

### §D4 · Rechtstexte sind Menschen-Gate [bewiesen als Regel]
Inhaltliche Änderungen an Impressum, Datenschutzerklärung oder EULA nur mit Yasins Freigabe (und wo markiert nach juristischer Prüfung). Offene Punkte: Vorlagen-Hinweissatz am Ende der dt. Datenschutzerklärung, Absatz US-Drittlandübermittlung (GitHub-Hosting) — beide bei Yasin.

---

## TEIL E · Betriebsregeln für Claude Code

- **Verify-Gate:** `python3 scripts/verify.py` muss grün sein, bevor irgendetwas als fertig gilt. Nie "sieht gut aus".
- **STATUS-Pflicht:** Nach jedem abgeschlossenen Schritt `brain/STATUS.md` aktualisieren (bei Widerspruch gewinnt das Repo) + Protokoll-Eintrag in `brain/05-protokoll/` (Was · Wie · Warum so · Verify · Gelernt).
- **Diagnose vor Fix:** Ursache faktisch beweisen (Grep, Test, Datenlage), nie auf Verdacht bauen.
- **Autonomes Deploy:** Claude Code committet und pusht selbstständig; Push auf main deployt live. Hartes Maschinen-Gate: verify.py grün vor jedem Commit, ein roter Stand wird niemals gepusht. Eine aussagekräftige Commit-Message pro Arbeitspaket. Yasin hat jederzeit Rollback-Recht via `git revert`.
- **Menschen-Gates (abschließende Liste):** Inhaltliche Rechtstext-Änderungen (§D4) · Geld (Google Ads, GitHub-Plan, Domains) · externe Dashboards (IONOS/DNS, Search Console, GA4, Google Ads, Formspree, Calendly, GitHub-Settings) · Löschen ganzer Seiten · `.github/workflows/` · `.claude/settings.json`. Stoppen, auf "Braucht Yasin"-Liste (STATUS bzw. LOOP-STATE), Arbeit läuft daran vorbei weiter; Übergabe gesammelt als EIN Block am Session-Ende mit Kommandos/URLs/Erwartungswerten.
- **Entscheidungs-Delegation mit Recherche-Pflicht:** Claude Code hat den Gesamtüberblick und trifft Priorisierungs-, Bau- und Detail-Entscheidungen selbst, ohne auf ein Yasin-Go zu warten. Pflicht dabei: Bei jeder unsicheren Entscheidung (SEO-Standards, Formulierungen mit Außenwirkung, technische Richtungen) läuft VOR der Entscheidung eine Recherche (Repo-Beweise, GSC-Daten, etablierte Standards), und jede getroffene Entscheidung wird mit Begründung im Brain dokumentiert (STATUS-Verlauf bzw. Protokoll), damit Yasin sie jederzeit nachlesen und per Rollback-Recht kippen kann. Optionslisten an Yasin sind abgeschafft; ausgenommen bleiben nur die Menschen-Gates.
- **Keine Genehmigungs-Dialoge:** Alle Werkzeug-Rechte sind projektseitig in `.claude/settings.json` freigegeben (defaultMode bypassPermissions; deny nur rm -rf und sudo). Claude Code arbeitet ohne Rückfrage-Dialoge; die Datei wird beim Session-Start geladen, Änderungen daran sind Menschen-Gate. Die inhaltlichen Menschen-Gates dieser Constitution gelten unabhängig davon auf Verhaltensebene weiter.
- **Macher ≠ Prüfer:** Reviews größerer Umbauten in frischem Kontext.
- **Kontext-Schnitt:** Kontextfenster selbst beobachten. Bei absehbarer Erschöpfung keine neue Baustelle: Teilstück fertig (verify grün, Commit + Push, STATUS/Protokoll/LOOP-STATE aktuell), Folgeschritt präzise in STATUS, sauberer Schnitt. Nie halbfertige Zustände über Session-Grenzen.
- **str_replace mit vollem Kontext,** mehrzeilige HTML-Blöcke nie per sed. Sitemap-Änderungen immer mit XML-Validierung.
- **Uploads von Yasin sind kanonisch:** Lädt Yasin eine selbst editierte Datei hoch, ist sie die neue Baseline.
- **Sprache:** Content deutsch (EN-Seiten englisch), Code englisch, Kommentare deutsch, Chat deutsch. Keine Em-Dashes in Copy (§A2).
- **Rückfluss:** Neues Muster oder neue Lehre → Patterns/Constitution ergänzen, im Änderungslog datieren.

---

## Offene Befunde
| Befund | Gesetz | Status |
|---|---|---|
| Brain-Going-Live-Risiko: Pages im Legacy-Modus würde brain/, scripts/ und CLAUDE.md öffentlich deployen (SPC-Präzedenzfall) | Governance 5 | **behoben 2026-07-19** — Pages-Source von Yasin auf "GitHub Actions" umgestellt (API: build_type=workflow) VOR dem ersten Brain-Push; deploy.yml aktiv, Live-Check nach erstem Actions-Deploy: /brain/ = 404 |
| Sitemap nach v4.3-Push in GSC neu einreichen + /en/ anstoßen | §C2 | offen (Yasin, nach Deploy) |
| Vorlagen-Hinweissatz dt. Datenschutzerklärung + US-Drittlandübermittlung | §D4 | offen (Yasin) |
| GitHub-Plan: Repo öffentlich (Free) vs. Pro 4 $/Monat privat vs. interne Dateien auslagern | Governance 3 | offen (Yasin) |
| Sitemap enthielt /impressum + /datenschutz trotz noindex (Drift Doku vs. Repo, von verify.py gefunden) | §C2 | **behoben 2026-07-19 (Repo-Übernahme)** — der Vormittags-Fix lag nur in der separaten v4.3-Arbeitskopie; im Repo auf 14 URLs bereinigt, Neueinreichung siehe Befund 2 |
| Sichtbare Em-Dashes auf buecher-cw (2 Stellen) | §A2 | **behoben 2026-07-19 (Repo-Übernahme; Vormittags-Fix lag nur in der Arbeitskopie)**; JS-injizierte Buchbeschreibungen tragen weitere (intern, niedrig, Merkposten) |
| 11 Kunden-Preview-Seiten (index_*.html) im Repo: indexierbar (kein noindex), nicht im verify-Inventar, dem Brain bisher unbekannt | §C2 | **behoben 2026-07-19** — alle 11 auf noindex, PREVIEW_PAGES-Kategorie in verify.py (noindex + lang + Sitemap-Verbot), §A1-Scope ergänzt |

## Änderungslog
| Datum | Änderung |
|---|---|
| 2026-07-19 | v1.0 — Constitution aus Projektanweisungen v1–v5 und der Live-Site extrahiert; alle A/B/C/D-Gesetze durch die Build-Historie bewiesen. Teil E (Vollautonomie) nach dem Muster von SPC/YOU/USELY, angepasst auf die Website-Gates. |
| 2026-07-19 | v1.1 — Teil E ergänzt (Yasins Vollautonomie-Anweisung vollständig übernommen): Entscheidungs-Delegation mit Recherche- und Doku-Pflicht; Keine-Genehmigungs-Dialoge via .claude/settings.json (bypassPermissions, deny rm -rf/sudo, Änderung = Menschen-Gate, greift ab der nächsten Session). |

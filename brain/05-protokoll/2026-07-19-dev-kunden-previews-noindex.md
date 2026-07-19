# 2026-07-19 · dev · Kunden-Previews auf noindex

## Was
Die 11 Kunden-Preview-Seiten (index_ac/ak/aw/bw/ep/gk/gl/jl/ku/kw/ul.html, von Yasin als "Kunde-01"–"Kunde-11" committet, zuletzt 18.07.) tragen jetzt `<meta name="robots" content="noindex">` und sind als eigene Kategorie PREVIEW_PAGES im verify-Inventar: geprüft werden noindex, lang=de und dass sie nie in der Sitemap stehen.

## Wie
Vorprüfung: alle 11 mit lang="de", genau einem `</head>`, ohne robots-Meta. Einfügung deterministisch per Python (eine Zeile vor dem einzigen `</head>`, mit Asserts gegen Doppel-Einfügung). verify.py: PREVIEW_PAGES-Liste, check_preview(), Sitemap-Verbot analog interner Seiten, Zähler in der Grün-Meldung.

## Warum so
- **noindex statt robots.txt-Disallow:** Ein Disallow verhindert nur das Crawlen, nicht das Indexieren der URL — und Google würde das noindex nie sehen. Meta-noindex ist der etablierte Standard für "erreichbar, aber nicht in den Index".
- **Warum überhaupt:** Halbfertige Previews echter Praxen auf yg-media.de könnten in Suchergebnissen zum Praxisnamen auftauchen (Außenwirkung ohne Freigabe des Kunden) und erzeugen später Duplicate Content zur echten Kunden-Domain. Direktlinks für Kunden funktionieren mit noindex unverändert.
- **Em-Dash-/DNA-frei:** Die Previews sind Kundendesigns, keine YG-Copy; §A1-Scope entsprechend ergänzt (gleiche Logik wie die internen Tools, nur ohne Em-Dash-Prüfung).

## Verify
`python3 scripts/verify.py` GRÜN: 22 Seiten + 11 Kunden-Previews, 0 Fehler. Nach dem Deploy Stichprobe: eine Preview-URL liefert das noindex-Meta im Live-HTML.

## Gelernt
Yasin baut Previews direkt auf main — das Inventar in verify.py muss bei jeder neuen index_*.html mitwachsen. Konvention festgehalten: Neue Kunden-Previews folgen dem Muster index_<kuerzel>.html und kommen in PREVIEW_PAGES (verify schlägt bei Vergessen NICHT von selbst an, weil unbekannte Dateien nicht gescannt werden — bei GSC-Auffälligkeiten zu fremden URLs zuerst hier schauen).

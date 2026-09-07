# 2026-09-03 · content · USELY-Seite: mehr Ebenen, Karten und Möglichkeiten (Dream-Selling in der Corporate-DNA)

**Auslöser:** Yasin zeigt sechs Referenzen (Meco- und Banking-Landingpages mit schwebenden Datenkarten, Glas-Statistikkarten "89 %", SAP-Karten-Raster, sevdesk-Startseite, Pella-Glas-Karte): "mehr Elemente, mehr Cards, einzelne Infos, das Gefühl, was man alles schaffen kann; Corporate Design gleich lassen, aber mehr Menge und Variabilität, verspielt, modern, futuristisch, hochwertig, Glas."

## Was (DE und EN im selben Paket, Commit f647ab7 im usely-site-Repo)
1. **Hero:** Keyvisual bleibt (Yasins Vorgabe), darum vier schwebende Glas-Karten mit Daten aus dem Demo-Mandanten (Rechnung bezahlt 2.839,34 €, offene Rechnungen 5.878,60 € mit Mahnung-bereit-Badge, XRechnung erzeugt, Zeiten heute 8:15 h). Sanfte Float-Animation, mobil als 2×2-Raster unter dem Logo.
2. **Neue Sektion "Was du zurückbekommst" (#zahlen / #numbers):** Bento-Raster aus einer großen Übersichtskarte mit SVG-Jahreskurve (Umsatz/Kosten, als Beispielansicht gekennzeichnet), sechs Kennzahl-Karten (60 s bis zur Rechnung, 1 Kette, 2 Formate, 24 Funktionen, 1 Tipp Stunden zur Rechnung, 0 € zum Start) und einer breiten Regel-Karte mit Pills (XRechnung, ZUGFeRD, DATEV, GoBD, §14, §19, DSGVO, Face ID).
3. **Kreislauf:** über den drei Schritt-Karten eine sichtbare Belegkette aus vier Glas-Belegkarten mit Pfeilen (Angebot AN-2026-0009 → AB-2026-0005 → Rechnung RE-2026-0013 → Zahlung per Bezahllink, je 1.535,10 € mit Status-Badge).
4. **Neue Sektion "Ein Tag mit USELY" (#tag / #day):** Zeitleiste 07:40 bis 18:05 mit fünf Glas-Karten (Baustelle, Auftrag ist da, Mittagspause, Rechnung raus, Feierabend). Das ist der Möglichkeiten-Teil: jede Karte beschreibt, was die App im Alltag abnimmt.
5. **Für wen:** Icons und ein Chip je Zielgruppe ("Vor Ort anbieten, abends nichts nachtragen", "Stunden werden Rechnungen", "§19 UStG automatisch richtig", "Rollen, Boards, Kanzlei-Zugang").
6. **CTA:** vier Chips über der Headline (Kostenlos starten, 30 Tage Pro gratis, iPhone und Web, E-Rechnung inklusive).
Seitenfolge jetzt: Hero · Vertrauen · Zahlen · Kreislauf · Tag · Apps (6 Splits) · Für wen · Preise · Warum · Funktionen · FAQ · CTA.

## Wie
- Ein Python-Skript mit Treffer-Zwang (P-12) für beide Sprachen: CSS-Block vor `/* RESPONSIVE */`, Responsive-Regeln vor `</style>`, Hero-Karten per Regex hinter das Keyvisual, Sektionen vor bekannten Ankern, Zielgruppen-Karten per Regex mit Icon und Chip neu zusammengesetzt.
- Sichtprüfung: Desktop DE und EN in Yasins Chrome (lokaler Server, `.reveal` per JS sichtbar, Smooth-Scroll abgeschaltet, sektionsweise Screenshots). Mobil über eine temporäre Kopie ohne 100vh-Hero in Headless-Chrome bei 412 px (Lighthouse-Ganzseiten-Screenshot ist bei 100vh-Sektionen unbrauchbar, der Viewport wird auf volle Höhe gezogen).
- verify grün, Lighthouse live nach Deploy: mobil 98 / 100 / 100 / 100, CLS 0, LCP 1,9 s (unverändert zur Vorstufe).

## Warum so
- **Fakten statt Fantasiezahlen:** Die Referenzen zeigen "70.000 Clients" und "+46 %". USELY hat solche Zahlen nicht; erfunden wären sie unlauter. Deshalb Kennzahlen, die die App selbst einlöst (60 s, 1 Kette, 2 Formate, 24 Funktionen, 0 €), und Beispieldaten aus dem Demo-Mandanten, die als Beispiel erkennbar sind.
- **Keine Testimonials, keine Partnerlogos:** es gibt noch keine echten. Die Regel-Pills (Standards) ersetzen die Logo-Leiste ehrlich.
- **Mehr Ebenen, gleiche DNA:** alle neuen Elemente nutzen die bestehenden Tokens (Teal, Glas, Border, Orbs, Grid, Inter, Playfair). Variabilität kommt aus Kartengrößen (Bento), Richtungen (Kette waagerecht, Zeitleiste) und Bewegung (Float), nicht aus neuen Farben.
- **Keyvisual bleibt im Hero:** Yasins Entscheidung vom Vormittag; die Datenkarten liefern trotzdem das "App-Gefühl" der Referenzen.

## Gelernt (Rückfluss)
- Pattern P-15 (Produktseiten-Tiefe) angelegt: Hero mit Datenkarten, Kennzahlen-Bento, sichtbare Kette, Tages-Story, Zielgruppen-Chips. Für you.yg-media.de anwendbar, sobald echte App-Screens da sind.
- Chrome-Extension kann das Fenster nicht verkleinern (bleibt 1920 px). Mobil-Sicht: Headless-Chrome mit temporärer Kopie (100vh raus, reveal sichtbar), Screenshot ist bei DPR 2 doppelt so breit wie `--window-size`.

## Nachtrag: Zeitleiste realistisch (2026-09-03, Yasin)
Yasins Einwand: "Ich fahre, mache ein Angebot und erledige noch am selben Tag" kommt so nicht vor, und die Karten waren handwerksspezifisch (Baustelle, Transporter). Umgebaut zu "Ein Auftrag mit USELY · Von der Anfrage bis zum Geld": Tag 1 Anfrage und Angebot, Tag 3 Zusage, Tag 4 bis 12 Zeiten und Belege nebenbei, Tag 13 Rechnung in einem Tipp, Tag 27 Zahlung (14 Tage Zahlungsziel, Erinnerung falls später). Berufsneutral formuliert (Handwerk, Beratung, Kreativarbeit, Dienstleistung), DE+EN, Commit 9edb86c. Gelernt: Storys auf der Produktseite müssen den echten Zeitverlauf eines Auftrags abbilden, sonst wirken sie wie Werbung statt wie Erfahrung.

## Nachtrag: Hero-Keyvisual und Untertitel (2026-09-07, Yasin)
- **Neues Hero-Bild:** Yasin liefert ein quadratisches Keyvisual (Selbstständiger am Laptop, um ihn herum die USELY-Bereiche Rechnungen, Projekte, Kunden, Aufgaben, Export, Belege als Chips) direkt in `assets/` (Original 2 MB PNG, bleibt lokal per .gitignore). Als `usely-hero-arbeitsplatz.webp` 1040 px q84 (105 KB) eingebaut, `fetchpriority="high"`. Hero-Bildspalte von 380 auf 520 px, damit die Chips lesbar bleiben; die vier schwebenden Glas-Karten aus dem Hero entfernt, weil das Bild seine eigenen Chips mitbringt. `usely-keyvisual-760.webp` gelöscht (og:image bleibt das 1024er Glas-U).
- **Mobil-Absicherung:** `.hero-inner` unter 1100 px auf `minmax(0, 1fr)` und `.hero-logo { max-width: 100% }`, damit die Grid-Spalte nicht auf die intrinsische Bildbreite wächst. Prüfung über Lighthouse-Mobil-Emulation (412 px) an einer Kopie ohne 100vh-Hero: alle Sektionen innerhalb der Breite, CLS 0.
- **Slogan als Untertitel:** "Kalkulieren. Abrechnen. Fertig." bleibt im H1 (SEO), wird aber als Block unter der Headline in kleinerer Größe gesetzt (clamp 1,3 bis 2 rem, Playfair kursiv, Teal). EN identisch.
- Lighthouse live nach dem Bild: mobil 96 / 100 / 100 / 100, LCP 2,4 s (H1), CLS 0. Commits 8357536 und 76c2fd7.
- **Hinweis für Yasin:** Die Chips im Bild sind deutsch, das Bild läuft auch auf /en/. Eine englische Variante würde die EN-Seite runder machen.
- Gelernt: Headless-Chrome erzwingt am Desktop eine Mindestbreite von 500 px, `--window-size=412` liefert deshalb abgeschnittene Layouts. Mobil-Sicht nur über Lighthouse-Emulation (Viewport-Screenshot `final-screenshot`, Ganzseite nur ohne 100vh-Sektionen).

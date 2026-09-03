# 2026-09-03 · dev · USELY One-Pager auf usely.yg-media.de gebaut

**Auslöser:** Yasins Auftrag vom 2026-09-03: eigene, indexierbare USELY-Website auf der Subdomain, gleiche Handschrift wie yg-media.de, One-Pager reicht, SEO-optimiert, Analytics, erst Konzept dann Stück für Stück. Nachgereicht: "Hosting machst du über GIT" und "geh bitte alles selbst in Chrome durch" (Keyword-Planer, Analytics, Search Console).

## Was
- **Neues Repo `YGMEDIA/usely-site`** (public) mit Pages auf GitHub Actions, Deploy-Workflow aus dem YG-Repo übernommen (schließt `scripts/`, `brain/`, `CLAUDE.md`, `.claude/` aus). Erster Deploy grün, Live-Testadresse https://ygmedia.github.io/usely-site/.
- **`index.html`** (One-Pager, ~1000 Zeilen): Nav, Hero, Vertrauensleiste, Belegkreislauf (3 Schritte), 8 Funktions-Karten, 4 Split-Sektionen mit App-Screens (Kalkulation, Belegkette, E-Rechnung, iPhone+Web), 4 Zielgruppen, Preise (Free vs. Pro), 3 Warum-Karten, 8 FAQ mit Akkordeon, CTA, Footer, Cookie-Banner.
- **SEO:** Title 59 Zeichen, Description 156, Canonical, og/Twitter, `SoftwareApplication`- und `FAQPage`-JSON-LD, `robots.txt`, `sitemap.xml` (1 URL).
- **Analytics vorbereitet:** Consent-Gate `usely_cookie_consent`, GA4-Loader mit `const GA_ID = ''` (ohne Mess-ID lädt nichts), Events `app_store_klick`, `web_app_klick`, `faq_open` über `data-track`.
- **Assets:** 7 echte App-Screens + Keyvisual + App-Store-Badge aus dem YG-Repo übernommen, dazu `usely-icon.webp` (512er WebP aus dem 1024er Keyvisual) als Favicon und Nav-Logo.
- **Eigenes Verify-Gate** `scripts/verify.py` im neuen Repo: DNA-Marker, Em-Dash-Scan, Canonical, Title-/Description-Länge, JSON-LD-Validität, **Schema-gleich-sichtbar** (jeder Schema-Preis und jede FAQ-Frage muss im Body stehen), interne Links, Anker-Ziele, Assets, Sitemap, CNAME, Consent-Gate, App-Store-Link. Grün.
- **Keyword-Recherche** im Google Keyword Planner selbst durchgeführt, 27 Kandidaten, Rohnotiz `03-research/raw/keywords/2026-09-03-keyword-planner-usely.md`.

## Wie
1. Bestandsaufnahme: DNS der Subdomain (IONOS-Parkplatz, HTTPS kaputt), Hosting-Muster von Paukbox (Vercel), USELY-Brain auf dem Desktop gelesen (Framework Teil I, Design-Tokens, App-Store-Daten). Der ZIP-Upload war damit nicht nötig, das Repo liegt lokal.
2. Keyword-Planer über Chrome: 27 Begriffe eingegeben, Spannen und Wettbewerb ausgelesen (das Ads-Konto ist aufgelöst, deshalb nur Größenordnungen). Entscheidung dokumentiert im Spec 3b.
3. Repo per `gh repo create`, Assets kopiert und konvertiert (sips + cwebp), `index.html` in einem Zug geschrieben (USELY-Tokens auf YG-DNA), Verify-Gate geschrieben, lokal auf Port 8766 sichtgeprüft (Desktop + schmale Breite), drei Korrekturen: Hero-Screen auf feste Höhe 560 px mit `object-position: top` (das 1080×2348-Bild war sonst 826 px hoch), Description gekürzt, Hero-Visual mobil zentriert.
4. Pages per API auf `build_type=workflow` gestellt, Deploy geprüft (Seite 200, Assets 200, `scripts/verify.py` 404).

## Warum so
- **Keyword: "Rechnungs App für Selbstständige" statt "buchhaltungssoftware".** Die Volumen-Keywords (buchhaltungssoftware, rechnungsprogramm: 1000-10000) sind Platzhirsch-Terrain mit Geboten bis 41 €. Der App-Cluster (100-1000) trägt den einzigen "Mittel"-Wettbewerb der ganzen Liste und beschreibt genau das, was USELY von sevdesk und Lexware unterscheidet: mobile-first. Atomic SEO: erst die gewinnbare Nische.
- **Eigenes Repo statt Unterordner von yg-media.de:** eigene Domain, eigener Index, eigenes Gate, und die Startseite von yg-media.de bleibt frei von Produkt-Keywords (§C1, kein Doppel).
- **Rechtstexte verlinkt statt dupliziert:** gleicher Betreiber, eine Wahrheit. Der Datenschutz-Absatz für die Subdomain ist Yasin-Gate.
- **GA-ID leer statt Platzhalter-ID:** so lädt garantiert kein Tracking, bis die echte Mess-ID da ist; das Consent-Gate ist trotzdem fertig verdrahtet.
- **Screens aus dem Onboarding statt Simulator-Aufnahmen:** die vorhandenen WebPs sind echte App-Aufnahmen, on-brand und sofort verfügbar. Frische v1.2-Screens (Boards, Bezahllink) sind als Folgeschritt notiert, nicht verworfen.

## Verify
- `python3 scripts/verify.py` im usely-site-Repo GRÜN (1 Seite, 0 Fehler, 0 Warnungen).
- Live nach Deploy: Startseite 200 mit korrektem Title, Assets 200, `scripts/verify.py` 404 (Deploy-Schutz greift).
- Sichtprüfung lokal: Hero, Vertrauensleiste, Kreislauf, Funktionen, alle vier Splits, Zielgruppen, Preise, Warum, FAQ, Footer.

## Blockiert (Yasin)
- **IONOS-CNAME** `usely` → `ygmedia.github.io`: ohne DNS lässt sich die Custom Domain nicht setzen (GitHub-API: "certificate does not exist yet").
- **GA4-Mess-ID:** Beim Wechsel der Analytics-Property hat sich die Google-Sitzung in Chrome abgemeldet und einen Passwort-Prompt für info@yg-media.de gezeigt. Passwörter werden nicht eingegeben (Sicherheitsregel), damit sind GA4 und Search Console bis zum erneuten Login von Yasin blockiert.

## Gelernt (Rückfluss)
- Ein aufgelöstes Google-Ads-Konto liefert im Keyword-Planer nur Spannen (10-100, 100-1000, 1000-10000) und Artefakte wie "-90 % im Jahresvergleich". Für exakte Volumen bräuchte es eine aktive Kampagne (Geld = Yasin-Gate). Für eine Keyword-Entscheidung reichen die Spannen plus die Wettbewerbs-Spalte.
- Das Klicken im Google-Konto-Umschalter kann eine bestehende Sitzung abmelden. Beim nächsten Mal: keine Konto-/Property-Wechsel anfassen, sondern direkt die Ziel-URL der Property aufrufen.
- Neue Site, neues Gate: das Verify-Gate wurde um "Schema gleich sichtbar" erweitert (Preise und FAQ-Fragen müssen im Body stehen). Das gehört als Muster zurück in die YG-Patterns, sobald ein zweites Produkt eine eigene Site bekommt.

# SPEC · USELY One-Pager auf usely.yg-media.de

> Status: **Schritte 1 bis 4, 6 und 8 gebaut (2026-09-03), live auf ygmedia.github.io/usely-site; wartet auf DNS + GA4-ID (Abschnitt 9)** · angelegt 2026-09-03 · Auftrag: Yasins Nachricht vom 2026-09-03 (eigene USELY-Website auf der Subdomain, indexierbar, mit Analytics, gleiche Handschrift wie yg-media.de, One-Pager reicht, SEO-optimiert, Konzept zuerst, dann Stück für Stück).

## 1. Ziel
Eine eigenständige, indexierbare Produkt-Website für USELY unter **https://usely.yg-media.de**, die (a) für generische Buchhaltungs-/Rechnungs-Keywords ranken kann, (b) App-Store-Downloads und Web-App-Registrierungen erzeugt und (c) messbar ist (GA4, consent-gated). Ein One-Pager in der YG-Handschrift (dunkel, Glass-Cards, Orbs, Grid, Grain), aber in USELY-Farben.

## 2. Bestandsaufnahme (2026-09-03, belegt)
| Punkt | Befund |
|---|---|
| Subdomain heute | `usely.yg-media.de` → A-Record 217.160.0.244 (IONOS-Parkplatz, Apache), HTTP 200 leer, **HTTPS kaputt** (kein Zertifikat). Unbenutzt. |
| Web-App | Live auf https://usely-4lt.pages.dev (Cloudflare Pages, Next.js-PWA, Deploy per wrangler aus `~/Desktop/USELY/web`). Keine eigene Domain. |
| Paukbox-Muster | paukbox.yg-media.de läuft auf Vercel (CNAME auf vercel-dns). |
| App | v1.1 (Build 4) im App Store, Build 5 (v1.2) fertig. Kostenlos; USELY Pro 9,99 €/Monat oder 89,99 €/Jahr, 30 Tage Test; Web-Abo per Stripe mit Preisparität. |
| Design-Tokens | `~/Desktop/USELY/design-tokens/tokens.json` (Quelle der Wahrheit): Brand-Teal #1DDEB4, Teal-Dark #0F6E56, BG #18181E, Card #22222A, Card-Hover #2A2A33, Text #FFFFFF / #C7C7C7 / #949494, Warning #FFCC33, Danger #FF6666. |
| Positionierung (USELY-Framework 1.2) | "USELY ist die schönste und schnellste Art, als Selbstständiger in Deutschland Angebote, Rechnungen und Projekte zu managen: mobil zuerst, E-Rechnung inklusive, wächst mit bis zum Team." Vorsprung: ZUGFeRD/XRechnung vor der Versandpflicht ab 2027. |
| Vorhandene Assets | 7 iPhone-Screens als WebP (v1.0/1.1-Stand: welcome, kalkulation, belegkette, projekte, ausgaben, rechtssicher, erechnung), Keyvisual, Logo, App-Store-Badge (nie verändern). Web-App-Screens fehlen. |
| Vorhandene Copy | yg-media.de/usely (Features, Geschichte, 6 FAQ) + App-Store-Text ("Kalkulieren. Abrechnen. Fertig."). |
| GSC-Signal | "usely" 211 Impressionen / 0 Klicks in 3 Monaten; rankende URL ist /en/usely. Brand-Nachfrage existiert, konvertiert nicht. |

## 3. Entscheidungen (Claude-Code-Empfehlung, per Rollback kippbar)
1. **Hosting: eigenes GitHub-Pages-Repo `YGMEDIA/usely-site`** mit `CNAME usely.yg-media.de` und demselben Actions-Deploy wie yg-media.de. Begründung: gleiche Werkzeuge (verify-Gate, Push = Deploy), null Kosten, HTTPS automatisch, Brain-Schutz per Workflow. Alternative Vercel (wie Paukbox) nur, wenn Yasin dort alles bündeln will. DNS: IONOS CNAME `usely` → `ygmedia.github.io` (Yasin-Gate).
2. **Stack: pures HTML/CSS/JS, eine Datei `index.html`** plus `assets/`, wie yg-media.de. Kein Framework. Die Web-App bleibt getrennt auf Cloudflare; der One-Pager verlinkt sie ("Web-App öffnen").
3. **Sprache: DE zuerst, EN unter `/en/` im zweiten Paket** (gleiches Master-Prinzip wie §B1). Start-Sitemap 1 URL, später 2 mit hreflang-Trio.
4. **Keyword-Ziel (vorläufig, bis Keyword-Planner-Daten da sind):** Primär "Rechnungsprogramm für Selbstständige" / "Buchhaltungs-App" (Titel-Kandidat: "USELY | Rechnungen, Belege und E-Rechnung für Selbstständige. Kostenlos starten."). Sekundär im Text: rechnung schreiben app, e-rechnung xrechnung zugferd, buchhaltung kleinunternehmer, angebot erstellen app, EÜR. Finale Wahl nach Recherche (Abschnitt 6). yg-media.de/usely behält das Brand-Keyword "usely" und verlinkt prominent auf die Subdomain (kein Keyword-Doppel, §C1).
5. **Design:** YG-DNA (Canvas-Partikel, Orbs, Grid, Grain, Glass-Cards, Reveal) mit USELY-Tokens: Akzent #1DDEB4 statt YG-Teal, BG #18181E-Familie, Playfair-Italic für Akzentwörter bleibt als Handschrift. Ein eigenes `usely-tokens.css` aus tokens.json abgeleitet, damit "Farbe ändern = eine Datei" gilt.
6. **Rechtstexte:** Impressum/Datenschutz/EULA werden NICHT dupliziert, sondern auf yg-media.de/impressum, /datenschutz und /nutzungsbedingungen verlinkt (gleicher Betreiber). Voraussetzung: die Datenschutzerklärung muss die Subdomain und den GA4-Stream abdecken (Rechtstext = Yasin-Gate, Abschnitt 9).
7. **Analytics:** GA4 consent-gated wie yg-media.de (Cookie-Banner, `usely_cookie_consent`), eigener Datenstream. Events: App-Store-Klick, Web-App-Klick, Pro-Sektion gesehen, FAQ geöffnet.
8. **Screenshots:** iPhone-Screens frisch aus dem Simulator (Build 5 / v1.2, Liquid-Glass-Design) via `~/Desktop/USELY` (Yasin hat den Simulator freigegeben); Web-App-Screens im Browser mit einem Testkonto (Yasin liefert Zugang) oder als Upload von Yasin. Bis dahin die 7 vorhandenen WebPs als Platzhalter mit identischen Dateinamen, damit der Austausch kein HTML anfasst.

## 3b. Umgesetzt am 2026-09-03
- **Repo:** `YGMEDIA/usely-site` (public), Actions-Deploy aktiv (build_type=workflow, API-bestätigt), Live-Testadresse https://ygmedia.github.io/usely-site/ (HTTP 200, Assets 200, `scripts/` 404 = Deploy-Schutz greift). `CNAME` = usely.yg-media.de liegt im Repo; die Custom-Domain lässt sich erst setzen, wenn die DNS zeigt (API-Antwort "The certificate does not exist yet").
- **Keyword-Recherche gelaufen** (Keyword-Planer, Rohnotiz `03-research/raw/keywords/2026-09-03-keyword-planner-usely.md`). Entscheidung: Primär **"Rechnungs App für Selbstständige"** (Cluster rechnungs app / rechnungsapp / rechnung schreiben app, 100-1000 mit dem einzigen "Mittel"-Wettbewerb der ganzen Liste = die gewinnbare Nische, deckungsgleich mit USELYs Mobile-first-Positionierung). Sekundär im Text: buchhaltungs app, rechnungsprogramm kleinunternehmer, kleinunternehmer rechnung schreiben, e-rechnung erstellen, xrechnung, zugferd (+900 % Trend), eür, belege scannen app. Bewusst NICHT als Hauptziel: buchhaltungssoftware und rechnungsprogramm (1000-10000, Gebote bis 41 €, Platzhirsch-Terrain).
- **Titel:** "USELY | Rechnungs App für Selbstständige und Kleinunternehmer" (59 Zeichen), H1 "Die Rechnungs App für Selbstständige. Kalkulieren. Abrechnen. Fertig."
- **Seite:** 10 Sektionen wie in Abschnitt 4 geplant, gebaut mit den USELY-Tokens (#1DDEB4 auf #18181E) in der YG-DNA (Canvas-Partikel, 4 Orbs, Grid, Grain, Glass-Cards, Reveal). Vier Split-Sektionen mit echten App-Screens.
- **Verify-Gate:** eigenes `scripts/verify.py` im usely-site-Repo, grün. Prüft zusätzlich zum YG-Gate: Title-/Description-Länge, Anker-Ziele, und dass Schema-Preise und FAQ-Fragen sichtbar auf der Seite stehen (§C3 maschinell).
- **Offen:** GSC-Property, frische Screenshots aus dem Simulator (v1.2 mit Boards und Bezahllink).

## 3c. Nachtrag 2026-09-03 (zweite Runde: Domain, Analytics, Dunkelheit, EN)
- **Design dunkler (Yasin: "das Schwarz ist zu abgeblichen"):** Website-Tokens von #18181E auf **#050507 / #0A0A0D / #0E0E12** gezogen, Orbs von 0,16-0,38 auf 0,055-0,17 Deckkraft, Grid und Grain feiner, Split-Bildflächen und CTA-Glow zurückgenommen, Nav/Footer/Cookie auf den dunklen Grund. **Die App-Tokens in `design-tokens/tokens.json` bleiben unverändert** (#18181E ist die App-Wahrheit); die Website fährt bewusst dunkler. Im HTML als Kommentar vermerkt.
- **GA4 verbunden:** Property `usely-e8e2f` (132689100/495780467) hatte bereits einen ungenutzten Webstream "USELY" (ID 11451748991) ohne URL. Statt eines zweiten Streams (Google warnt ausdrücklich vor inkonsistenten Ergebnissen bei mehreren Webstreams) wurde dessen Stream-URL auf https://usely.yg-media.de gesetzt. **Mess-ID G-KV2MZ6J0CG** steht in `const GA_ID` der DE- und EN-Seite; Consent-Gate und Events (app_store_klick, web_app_klick, faq_open) waren schon verdrahtet.
- **Domain verbunden (IONOS + GitHub):** Die Subdomain war an das IONOS-Webhosting gebunden, deshalb waren die A/AAAA-Records gesperrt. Weg: Subdomain-Verwendungsart "Webhosting" zurückgesetzt, dann A-Record `usely` → 185.199.108.153 angelegt; IONOS meldete den Konflikt und deaktivierte dabei genau die Parkeinträge (A/AAAA usely, A/AAAA www.usely, TXT _dep_ws_mutex.usely). Danach die drei weiteren GitHub-IPs (.109/.110/.111) ergänzt. **Kein CNAME**, weil an `usely` MX- und SPF-Records für Mail hängen und ein CNAME dort DNS-ungültig wäre. Mail (MX mx00/mx01.ionos.de, SPF, DKIM, send.usely über Amazon SES) blieb unangetastet und wurde nach jedem Schritt per dig geprüft.
- **GitHub Pages:** `cname=usely.yg-media.de` gesetzt, Zertifikat ausgestellt (state approved), `https_enforced=true`. Öffentliche Resolver liefern wegen TTL 3600 noch bis zu eine Stunde die alte IP.
- **EN-Version:** `/en/index.html` mit eigenständiger Übersetzung aller 10 Sektionen, eigenem Title/Description, englischem SoftwareApplication- und FAQPage-Schema, hreflang-Trio auf beiden Seiten, Sprachwechsler DE/EN in der Nav, Rechtslinks auf die EN-Rechtsseiten von yg-media.de. Sitemap jetzt 2 URLs.
- **verify.py erweitert:** prüft beide Seiten, hreflang-Trio, Sprachwechsler-Ziel, deutsche Reste im sichtbaren EN-Text und akzeptiert im Schema-Abgleich beide Preis-Schreibweisen (9,99 und 9.99). Der Komma-Punkt-Fall war ein echter Fund des Gates.

## 4. Seitenstruktur (One-Pager, Reihenfolge = Verkaufslogik)
| # | Sektion | Inhalt | Quelle |
|---|---|---|---|
| 1 | Hero | H1 mit Keyword + Claim "Kalkulieren. Abrechnen. Fertig.", Sub (60 Sekunden zum Angebot, E-Rechnung inklusive, kostenlos starten), App-Store-Badge + "Web-App öffnen", iPhone-Screen | App-Store-Text, Framework 1.2 |
| 2 | Vertrauensleiste | Kostenlos startbar · E-Rechnung (XRechnung/ZUGFeRD) · GoBD und §14/§19 UStG · DSGVO, Face ID · Entwickelt in Würzburg | App-Store-Text |
| 3 | Der Kreislauf | Angebot → per Link annehmen → Auftragsbestätigung automatisch → Rechnung per Klick → Bezahllink (Karte, PayPal, Apple Pay) → Zahlung automatisch zugeordnet; als Schrittleiste | Visionskonzept "Der komplette Kreislauf" |
| 4 | Features (8 Karten) | Kalkulation vor Ort · Belegkette mit Storno-Sicherheit · E-Rechnung serienmäßig · KI-Belegscan und Ausgaben · Boards und Zeiterfassung · Banking-Abgleich · Team und Steuerberater (DATEV) · Mahnwesen und wiederkehrende Belege | Visionskonzept, App-Store-Text, USELY-Framework Teil IV |
| 5 | iOS + Web | "Ein Konto, überall dieselben Daten, Echtzeit-Sync": iPhone-Screen neben Web-Screen; PWA-Installation | Framework 2.5 |
| 6 | Für wen | Handwerk, Freelancer, Kleinunternehmer, kleine Teams (Rollen, Kanzlei-Zugang) | Framework 1.3 |
| 7 | Preise | Free (unbegrenzt starten, Basis-Belege) vs. Pro 9,99 €/Monat oder 89,99 €/Jahr, 30 Tage Test, jederzeit kündbar; Web-Abo gleicher Preis | App Store, Framework (Stripe-Parität) |
| 8 | Warum USELY | Mobile-first statt Web-first, E-Rechnung vor der Pflicht 2027, entsteht am echten Betrieb (Felgen Brillant, ohne Investor-Wording), Vom Rechnungs-Tool zum Betriebssystem | Framework 1.2, Visionskonzept |
| 9 | FAQ (8) | Kosten, Kleinunternehmer, E-Rechnung, Daten/DSGVO, Steuerberater, Web ohne App, Kündigung, Export; als FAQPage-Schema | yg-media.de/usely FAQ + App Store |
| 10 | CTA + Footer | App Store + Web-App, Kontakt info@yg-media.de, Links Impressum/Datenschutz/Nutzungsbedingungen (yg-media.de), "Ein Produkt von YG MEDIA" → yg-media.de, Cookie-Banner | |

## 5. Technik und SEO-Ausstattung
- `index.html` mit Title/Description auf das Primär-Keyword, Canonical `https://usely.yg-media.de/`, og:image (1200×630, USELY-Keyvisual), Twitter Card, `lang="de"`.
- Schema: `SoftwareApplication` (MobileApplication + WebApplication, `offers` Free + Pro 9,99 €, `aggregateRating` nur mit echten Store-Daten), `FAQPage`, `Organization` YG MEDIA als `publisher`.
- Performance: WebP-Screens (≤ 120 KB), `loading="lazy"`, keine externen Skripte außer Fonts und GA4 nach Consent, Ziel Lighthouse ≥ 90 mobil.
- `robots.txt`, `sitemap.xml` (1 URL, später 2), `CNAME`, `.github/workflows/deploy.yml` (Kopie aus yg-media.de), `scripts/verify.py` (angepasste Kopie: DNA-Marker, Em-Dash, Canonical, Schema-JSON, Links, Sitemap, Cookie-Gate).
- Deep-Links: App-Store-URL `https://apps.apple.com/de/app/usely/id6783429050`, Web-App `https://usely-4lt.pages.dev` (oder künftige App-Domain, Abschnitt 9).

## 6. Keyword-Recherche (Schritt 2 im Ablauf)
Werkzeuge: Google Keyword Planner (Zugang von Yasin) und GSC-Query-Daten (yg-media.de, "usely"). Kandidaten, die geprüft werden: buchhaltungs app · buchhaltungssoftware selbstständige · rechnungsprogramm kleinunternehmer · rechnung schreiben app · rechnungsapp iphone · e-rechnung app · xrechnung erstellen · angebot erstellen app · eür software · kleinunternehmer rechnung. Auswahlregel: 1 Primär-Keyword (Volumen × Absicht × erreichbare Konkurrenz), 4 bis 6 Sekundär-Keywords in H2/FAQ. Ergebnis als datierte Rohnotiz in `03-research/raw/keywords/`.

## 7. Ablauf (Schritte, jeder mit Fertig-Kriterium)
| # | Schritt | Fertig wenn | Braucht Yasin |
|---|---|---|---|
| 1 | Hosting + Repo | Repo `usely-site` existiert, Actions-Deploy grün, `usely.yg-media.de` liefert HTTPS-Seite | Repo-Freigabe, IONOS-CNAME |
| 2 | Keyword-Recherche | Rohnotiz mit Zahlen, Primär-/Sekundär-Keywords festgelegt | Keyword-Planner-Zugang (oder Yasin liefert Screenshots) |
| 3 | Token-CSS + Seitengerüst | `usely-tokens.css` aus tokens.json, DNA-Gerüst mit Nav/Footer/Canvas/Cookie, verify grün | – |
| 4 | Copy DE (alle 10 Sektionen) | Texte fertig, keine Em-Dashes, keine erste Person, Quellen-treu | – |
| 5 | Screenshots | iPhone v1.2 aus dem Simulator (6 Screens), Web-App 2 Screens, alle WebP | Testkonto Web-App oder Upload |
| 6 | Schema + SEO-Feinschliff | SoftwareApplication + FAQPage valide (Rich-Results-Test), Title/Description finalisiert | – |
| 7 | Analytics | GA4-Stream eingebaut, Consent-Gate, Events geprüft (DebugView) | GA4-Measurement-ID |
| 8 | QA | verify grün, Desktop + Mobile Sichtprüfung, Lighthouse mobil ≥ 90, Links live | – |
| 9 | Launch | Sitemap in GSC (neue Property `usely.yg-media.de`), yg-media.de/usely verlinkt auf die Subdomain, STATUS/Protokoll | GSC-Property + Sitemap |
| 10 | EN-Version | `/en/` mit hreflang-Trio, Sitemap 2 URLs | – |

## 8. Gesetzes-Check (YG-Constitution, sinngemäß auf die Subdomain übertragen)
§A1 DNA vollständig (eigene Nav: Features · Preise · FAQ · App laden) · §A2 keine Em-Dashes · §A4 keine aspect-ratio auf Bildspalten · §A5 App-Store-Badge unverändert, Logo aus Original · §A6 keine erste Person, keine Person-Inszenierung, keine Investor-Aussage · §C1 ein Keyword-Ziel, kein Doppel mit yg-media.de/usely · §C3 Schema = sichtbare Wahrheit · §D2 Rechtsseiten verlinkt, nicht dupliziert · §D3 Consent vor Tracking.

## 9. Braucht Yasin (Stand 2026-09-03, nach dem Bau)
1. ~~Hosting-Freigabe~~ **erledigt** (Yasin: Hosting über Git). Repo `YGMEDIA/usely-site` angelegt, Pages auf Actions, erster Deploy grün.
2. ~~IONOS-DNS~~ **erledigt 2026-09-03** (Yasin hat sich eingeloggt, Claude Code hat die Records gesetzt): vier A-Records auf die GitHub-Pages-IPs, Parkeinträge weg, Mail unberührt, Custom Domain + HTTPS auf GitHub aktiv.
3. ~~Keyword-Planer~~ **erledigt** (2026-09-03 selbst durchgegangen, Rohnotiz im Brain).
4. ~~GA4~~ **erledigt 2026-09-03**: vorhandener Webstream auf usely.yg-media.de gesetzt, Mess-ID G-KV2MZ6J0CG in beiden Seiten.
5. **Web-App:** Testkonto für Screenshots, und: soll die Web-App später eine eigene Domain bekommen (z. B. app.usely.yg-media.de)? Bis dahin verlinkt der One-Pager usely-4lt.pages.dev.
6. **Datenschutzerklärung:** Absatz für usely.yg-media.de (Hosting GitHub Pages, GA4-Stream) ergänzen lassen (Rechtstext-Gate).
7. **Screenshots:** falls du lieber selbst lieferst: 6 iPhone-Screens (Übersicht, Kalkulation, Belegkette/Belegdetail, Boards, Ausgaben/Belegscan, Bezahllink) und 2 Web-Screens (Dashboard, Belegliste), PNG in Originalauflösung.

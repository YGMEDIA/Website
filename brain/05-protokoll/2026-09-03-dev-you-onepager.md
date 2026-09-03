# 2026-09-03 · dev · YOU One-Pager auf you.yg-media.de gebaut

**Auslöser:** Yasin: "kannst du auch jetzt für das YOU Projekt so eine Seite mit der Subdomain erstellen, you.yg-media.de, mach selber auch Screenshots und schau, dass die Glas-Elemente sauber sind." Spec: `06-specs/SPEC-you-onepager.md`.

## Was
1. **Repo `YGMEDIA/you-site`** (public, Pages über Actions-Workflow aus usely-site, `scripts/` bleibt draußen). Live auf der Testadresse https://ygmedia.github.io/you-site/, CNAME `you.yg-media.de` im Repo.
2. **One-Pager DE (`index.html`) und EN (`en/index.html`)** in YG-Handschrift mit YOU-Tokens (Grund #07070F, Akzent-Tief #11678C, Akzent-Hell #38BDF8, Ringfarben Körper/Geist/Konsistenz/Erholung): Nav, Hero mit App-Icon-Keyvisual und Ring-Leiste, Vertrauensleiste, Ablauf (Erzählen, Ankommen, Leben), 20 Funktionskarten (Band-Funktionen markiert), sechs Splits (Today, Digitales Selbst, Daten, YOU Band, Ernährung, Muster), Für wen, Free/Pro ohne Preise, Warum (inkl. Beobachtung statt Diagnose), 8 FAQ, Warteliste, Footer, Cookie-Banner. Fonts selbst gehostet (P-14), Hero 760 px mit fetchpriority, Burger als Button.
3. **Pre-Launch-Logik:** YOU ist noch nicht im App Store, deshalb Warteliste über das bestehende Formspree-Formular (Betreff "YOU Warteliste", Felder produkt/sprache, Honeypot, Absenden ohne Seitenwechsel) statt Store-Badge; Zweit-CTA Behance. Preise bewusst nicht genannt (Stopp-Punkt S4), Schema-Offer nur Free 0. Jede Zeile nach YOU-Constitution §E1 (keine Diagnose-Sprache), das Gate prüft vier Diagnose-Formulierungen.
4. **verify-Gate** (Fork des USELY-Gates): statt Store-Link jetzt Warteliste-Formular und Behance-Link Pflicht, Diagnose-Sprache verboten, Consent-Key `you_cookie_consent`; deutscher-Rest-Check auf EN nur noch auf Textknoten (Formular-Betreff darf deutsch bleiben). Grün.
5. **GA4:** Property "YOU App" (552723925) im Konto Yasin Gündogdu, Webstream YOU (15714959808) auf https://you.yg-media.de, Mess-ID **G-KJMX0LSV2F**, in beiden Seiten consent-gated eingetragen.
6. **Search Console:** URL-Präfix-Property https://you.yg-media.de/ angelegt, Inhaberschaft automatisch bestätigt (Domainnamen-Anbieter über yg-media.de), mit GA4 YOU App verknüpft. Sitemap-Einreichung und Indexierungsanträge folgen, sobald die Domain zeigt.
7. **Glas-Prüfung (Yasins Auftrag):** mit echten Chrome-Aufnahmen auf Desktop 1440 und im 390-px-Iframe: 1-px-Ränder gleichmäßig, Highlight-Linie oben, gleicher Blur, keine Brüche an Kartenkanten, Orbs überlagern keinen Text, Badges lesbar. Zwei Befunde behoben: "Mit Band"-Marke klebte inline am Satzende (jetzt eigene Zeile), Hero-Glow ragte mobil 22 px über den Rand (Hero mit overflow hidden, Seite jetzt exakt 390 px breit).

## Wie
- Bestandsaufnahme im YOU-Repo (docs/INDEX, Blueprint Teil IV/V/VA/VB/VC, Constitution §E, Paywall-RFC, DesignTokens.swift, App-Icon), DNS-Lage (`you` frei, Mail unter `send.you` und `resend._domainkey.you`), Supabase-Projekt und Auth-Methode (OTP).
- Site aus der USELY-Vorlage abgeleitet, Texte komplett neu aus Blueprint und STATUS, Tokens umgestellt, `.glass`-Klasse als eine Definition für alle Karten (saubere Kanten). Verify, lokaler Server auf 8767, Chrome-Prüfung mit deaktivierter Sanftscroll-Animation (sonst kommen Aufnahmen zu früh), mobil über Iframe, weil Chrome das Fenster nicht unter ~500 px schrumpft.
- GA4 über die Admin-URL (kein Kontoumschalter), Property-Name muss mindestens vier Zeichen haben ("YOU" abgelehnt, daher "YOU App"); die Geschäftsziel-Karten haben ihre Checkbox rechts außerhalb des schmalen Fensters, Klick über die Accessibility-Referenz. Mess-ID aus dem Stream-Detail per Skript ausgelesen (Null/O-Verwechslung ausgeschlossen).
- Search Console: URL-Präfix, Auto-Bestätigung wie bei USELY; Verknüpfung von der GSC-Seite aus (Einstellungen > Verknüpfungen), dort steht auch die neue Property-ID.

## Blockiert
- **DNS bei IONOS:** die Sitzung in Chrome ist abgelaufen, Login = Yasin. Danach vier A-Records `you` → 185.199.108.153/109.153/110.153/111.153 (kein CNAME, siehe Mail-Records), dann GitHub-CNAME per API, HTTPS erzwingen, Sitemap in GSC, Indexierung für / und /en/ beantragen, Nachmessung.
- **App-Screens aus dem Simulator:** Der aktuelle YOU-Stand lässt sich nicht für den Simulator bauen. `Frameworks/QCBandSDK.framework` ist ein reines arm64-Geräte-Binary (kein Simulator-Slice, kein xcframework), der Linker bricht ab; drei Dateien (QWatchBridge 508 Zeilen, WearableService 759, WearableRepository 479) importieren das SDK ohne `#if targetEnvironment(simulator)`-Kapselung. Die auf dem Simulator installierte YOU-Version stammt vom 15.07. (englische Oberfläche, vor Deutsch-Umstellung, Bento, Widgets) und taugt nicht als Vorlage. Alternativen ohne Simulator: Mac-Build "Designed for iPhone" scheitert an der Provisioning (Mac nicht im Developer-Account registriert); Yasins iPhone hängt zwar am Mac, aber Screenshots von einem privaten Gerät mit echten Gesundheitsdaten sind kein Weg. Zwei Optionen für Yasin stehen in STATUS.
- Bis dahin tragen die sechs Splits das Keyvisual als Platzhalter; das Gate bleibt grün, die Bildpfade sind final (`you-app-today/selbst/daten/band/ernaehrung/muster.webp`), nur die Dateien werden ausgetauscht.

## Verify
- `python3 scripts/verify.py` im you-site-Repo GRÜN (2 Seiten, 0 Fehler, 0 Warnungen).
- Chrome: Desktop alle zehn Sektionen, Mobil (Iframe 390) Hero, Ablauf, Funktionen, Split, Preise, Warteliste, Burger-Menü; scrollWidth 390 = 390.
- Deploy: Actions grün, Testadresse 200, GA_ID im Live-HTML.
- Lighthouse auf der Testadresse: siehe STATUS (Zahlen aus dem Lauf nach dem Deploy).

## Gelernt (Rückfluss)
- Bevor ein Simulator-Shooting geplant wird: prüfen, ob alle Frameworks einen Simulator-Slice haben (`lipo -info`, xcframework). Geräte-SDKs blockieren den kompletten Build, nicht nur ein Feature.
- GA4-Property-Namen brauchen vier Zeichen; die Property-ID einer frisch angelegten Property steht am schnellsten in der GSC-Verknüpfungsliste.
- Chrome-Fenster lassen sich per Extension nicht unter die Mindestbreite bringen; ein Iframe mit fester Breite liefert die mobile Ansicht zuverlässig.
- Mit `scroll-behavior: smooth` müssen Screenshot-Skripte das Scrollen auf `instant` stellen, sonst fotografieren sie die alte Position.

## Nachtrag: Domain live (2026-09-03, selbe Session)
Yasin hat sich bei IONOS eingeloggt (kein Passwort durch Claude Code). Befund vorab: Auf allen vier IONOS-Nameservern gab es keinen Record am Namen `you`, die drei Subdomain-Einträge im IONOS-Portal sind karteikarten, updates und usely. Dann selbst durchgeführt:
- Vier A-Records `you` → 185.199.108.153, .109.153, .110.153, .111.153 im DNS-Editor von yg-media.de angelegt (Formular blendet die automatische www-Vorschau bei Subdomain-Hostnamen aus, es entsteht nur `you`). Mail-Records `send.you` (MX, SPF) und `resend._domainkey.you` (DKIM) unberührt.
- GitHub Pages: `cname=you.yg-media.de` per API gesetzt, Zertifikat nach 40 s `approved`, `https_enforced=true`. HTTP antwortet 301 auf HTTPS, TLS-Prüfung sauber, DE- und EN-Title live, Assets 200.
- Search Console: Sitemap eingereicht (erster Abruf scheiterte an Googles DNS-Negativ-Cache, zweite Einreichung wurde gelesen), Indexierung für / und /en/ beantragt.
- Lighthouse auf der echten Domain: mobil DE 98 / 100 / 100 / 100 (FCP 1,1 s, LCP 1,9 s, CLS 0), Desktop 100 / 100 / 100 / 100, mobil EN 99 / 100 / 100 / 100. Offen bleiben nur Cache-TTL (GitHub Pages) und der Speed-Index-Anteil der Canvas-Animation.
- Gelernt: Ein frisch angelegter Name kann bei Google und lokal noch als "existiert nicht" gecacht sein (Negativ-TTL 600 s). Lokale Prüfung sofort per `curl --resolve host:443:IP`, Lighthouse erst nach Ablauf des Caches (der `--host-resolver-rules`-Umweg scheitert an der Leerzeichen-Aufteilung von `--chrome-flags`).

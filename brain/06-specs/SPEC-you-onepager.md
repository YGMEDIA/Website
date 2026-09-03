# SPEC · YOU One-Pager auf you.yg-media.de

**Stand:** 2026-09-03 · **Auslöser:** Yasin: "kannst du auch jetzt für das YOU Projekt so eine Seite mit der Subdomain erstellen, you.yg-media.de, mach selber auch Screenshots und schau, dass die Glas-Elemente sauber sind." · **Muster:** SPEC-usely-onepager (Repo, Gate, Domain, Analytics, Simulator-Screens nach P-13, Web-Vitals nach P-14).

## 1. Ziel
Eigene, indexierbare Produktseite für YOU (Körper und Geist, iOS, YOU Band) in der YG-Handschrift mit YOU-Tokens, DE als Master und EN unter /en/, mit echten App-Screens aus dem Simulator. Pre-Launch: YOU ist v22 im Aufbau und noch nicht im App Store (YOU-Brain INDEX), deshalb Warteliste statt Store-Badge.

## 2. Bestandsaufnahme (belegt)
- YOU-Repo lokal (~/Desktop/YOU, GitHub YGMEDIA/YOU privat), Brain unter docs/ (Blueprint Fassung 3, Constitution v0.13, Patterns v0.9, STATUS bis Verlauf 255). Supabase-Projekt `jpyxetqwiebjetqsqjns` (eu-west-1), Auth per E-Mail-OTP (signInWithOTP/verifyOTP), Mail über Resend mit Absender noreply@you.yg-media.de.
- Design-Tokens (YOU/Core/Design/DesignTokens.swift): bgBase #07070F, bgSurface #0D0D1A, bgCard #0A1018, accent #11678C, textPrimary #F0F0F0, textSecondary #8888AA, textMuted #6B6B8A, Ringfarben Körper #F43F5E, Geist #38BDF8, Konsistenz #10B981, Erholung #8B5CF6, Training #F97316, Orbs #0D4E6B/#0A2D4E/#15214A. Designsprache laut Constitution: dunkel, Glas, Tiefe, Akzent #11678C.
- Keyvisual: App-Icon-You.png (1024², Chrom-Figur mit YOU-Wortmarke), identisch mit logo-you.webp der Startseite.
- DNS: `you.yg-media.de` trägt selbst keinen Record; Mail-Records liegen bei `send.you` (MX, SPF) und `resend._domainkey.you` (DKIM). Vier GitHub-A-Records am Namen `you` sind damit konfliktfrei (gleiche Lösung wie USELY, §-Regel: bei Mail nie CNAME).
- Paywall (paywall_rfc_v1): Free = Onboarding plus eine Generierung, komplettes manuelles Tracking, 3 Foto-Scans, Band-Strecke mit Band; Pro = Scan ohne Limit, Neu-Generierung, künftige KI-Features, 30 Tage Trial. Preis-Anker 49,99/6,99 sind ausdrücklich Stopp-Punkt bis Store-Anlage (S4 bei Yasin).
- Wellbeing-Gesetze (Constitution §E1/§E2): keine Diagnose-Sprache, Beobachtung als Einladung, verletzliche Zielgruppe schützen. Gilt für jede Zeile der Website.

## 3. Entscheidungen (Claude Code, per Rollback kippbar)
1. **Repo `YGMEDIA/you-site`** (public wie usely-site), GitHub Pages über Actions-Workflow mit Ausschluss von scripts/, eigenes verify-Gate (Fork des USELY-Gates: kein Store-Link, dafür Warteliste-Formular und Behance-Link Pflicht).
2. **Keyword:** "App für Körper und Geist" als Brand-Claim im Title, Nebenbegriffe Habit Tracker, Journal, Recovery, HRV Band, KI-Onboarding. Keine Keyword-Planer-Runde vor dem Launch (Ads-Konto aufgelöst, Spannen ohne Aussagekraft für ein neues Produkt); GSC-Daten nach 4 Wochen entscheiden die Schärfung.
3. **CTA:** Warteliste über das bestehende Formspree-Formular der YG-Site (xojbbzad, Betreff "YOU Warteliste", Feld produkt=YOU) statt neuem Formspree-Formular (externes Dashboard = Gate). Zweit-CTA Behance-Galerie 217934173.
4. **Preise:** keine Zahlen auf der Seite ("Preis zum App-Store-Start"), Free/Pro-Schnitt aus dem RFC als Wahrheit. Schema-Offer nur Free 0. Zahlen kommen nach Yasins S4.
5. **Tokens auf der Website:** Grund #07070F, Surface #0D0D1A, Karten #0A1018; Akzent-Tief #11678C für Buttons und Ränder, Akzent-Hell #38BDF8 (Geist-Ring) für Eyebrows, Hervorhebungen und Häkchen (Kontrast); Ringfarben als Ring-Leiste im Hero. Typografie wie YG-DNA (Inter, Playfair Italic), selbst gehostet (P-14).
6. **Struktur:** Nav · Hero (Keyvisual + Ring-Leiste) · Vertrauensleiste · Ablauf (3) · Funktionen (20) · Splits (Today, Digitales Selbst, Daten, Band, Ernährung, Muster) · Für wen (4) · Free/Pro · Warum (3, inkl. Beobachtung statt Diagnose) · FAQ (8) · Warteliste · Footer · Cookie-Banner, GA4 consent-gated.
7. **Screens:** Demo-Konto in der YOU-Produktions-DB nach P-13 (RLS-isoliert, fiktiver Mensch, plausible Historie inkl. Band-Daten), Aufnahmen im iPhone-17-Pro-Simulator mit 9:41-Statusleiste, WebP 720 px. Bis die Screens da sind, halten Platzhalter (Keyvisual) das Verify-Gate grün.
8. **Glas-Prüfung (Yasins Auftrag):** Sichtprüfung mit echten Chrome-Aufnahmen (Desktop 1280 und Mobil 390), Kriterien: gleichmäßige 1-px-Ränder, kein Blur-Bruch an Kartenkanten, Highlight-Linie oben, keine Überlappung von Orbs mit Text, Badges lesbar.

## 3b. Umgesetzt am 2026-09-03
- Repo `YGMEDIA/you-site` public, Pages über Actions, Testadresse https://ygmedia.github.io/you-site/, CNAME im Repo. DE+EN, verify grün, Glas-Prüfung mit Chrome-Aufnahmen (Desktop 1440, Mobil 390 per Iframe), zwei Befunde behoben.
- GA4 Property "YOU App" (552723925), Webstream YOU (15714959808), Mess-ID G-KJMX0LSV2F. Search Console https://you.yg-media.de/ automatisch bestätigt, mit GA4 verknüpft.
- Domain live seit 2026-09-03 abends: vier A-Records bei IONOS, GitHub-CNAME, HTTPS erzwungen, Sitemap gelesen, Indexierung beantragt, Lighthouse live mobil 98 / Desktop 100 / EN 99. App-Screens: Simulator-Build blockiert (Band-SDK nur arm64-Gerät), Entscheidung Option A/B in STATUS 0d. Platzhalter = Keyvisual in allen sechs Splits, Bildpfade final.
- Protokoll: 05-protokoll/2026-09-03-dev-you-onepager.md.

## 4. Gesetzes-Check
§A1 DNA (Nav, Footer, Canvas, Orbs, Grid, Grain, Glass, Cookie) · §A2 keine Em-Dashes · §A5 nur echte Assets (Icon, Screens) · §B1 DE Master, EN im selben Paket · §C ein Keyword, hreflang-Trio, Canonical, Sitemap 2 URLs · §D Rechtstexte verlinkt (yg-media.de), noindex für nichts · YOU §E1 keine Diagnose-Sprache.

## 5. Braucht Yasin
- Preise auf der Seite, sobald S4 (Store-Produkte) entschieden ist.
- Datenschutz-Absatz für you.yg-media.de (Hosting GitHub Pages, GA4, Formspree-Warteliste) in der YG-Datenschutzerklärung.
- IONOS-Login und Google-Login in Chrome, falls die Sitzungen abgelaufen sind (DNS, GA4-Property, Search Console).

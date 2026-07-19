# CLAUDE.md — YG MEDIA Website

Du arbeitest am YG-MEDIA-Repo: **www.yg-media.de** — die Agentur-Website von Yasin Gündogdu (YG MEDIA, Würzburg). **LIVE** auf GitHub Pages.
Stack: Pure HTML/CSS/JS (kein Framework, kein CMS) · DE-Seiten im Root, EN unter /en/ · GA4 consent-gated · Formspree · IONOS-DNS.

## Wissensquellen (in dieser Reihenfolge, nie alles auf einmal lesen)
1. `brain/YG-FRAMEWORK.md` — kanonische Referenz: Geschäftsmodell, Seiten-Architektur, Zweisprachigkeit, SEO-Strategie, Roadmap. Gewinnt bei Konflikten.
2. `brain/01-constitution/YG-CONSTITUTION.md` — Gesetze §A Design-DNA · §B Zweisprachigkeit · §C SEO · §D Recht · §E Betrieb. Was sie verletzt, wird nicht gemergt.
3. `brain/02-patterns/YG-PATTERNS.md` — Bau-Muster P-1…P-10. Jede Änderung folgt einem Pattern oder definiert ein neues.
4. `brain/STATUS.md` — lebendiges Session-Gedächtnis. Direkt nach dem INDEX lesen.
5. `brain/06-specs/` — größere Vorhaben nur nach freigegebenem Spec. Kleine Fixes (<5 Dateien, kein Geld/Recht/Löschen) brauchen kein Spec, aber verify.py + STATUS immer.
Lies gezielt (INDEX → relevante Seite → Links), nie den ganzen Vault.

## Harte Regeln (Kurzform — Details in der Constitution)
- **DE ist Master (§B1):** Jede Design-, Struktur- oder Textänderung passiert ZUERST am deutschen Master, die EN-Seite wird IM SELBEN Arbeitspaket nachgezogen. Nie nur eine Sprache ändern, nie eine Sprach-Drift committen.
- **Navbar + Footer + DNA unantastbar (§A1):** Jede Seite trägt identische Nav, identischen Footer, Canvas-Hintergrund, Orbs, Grid, Grain, Glass-Cards und (außer Rechtsseiten) Cookie-Banner. Nie vereinfachen, nie entfernen.
- **Keine Gedankenstriche (§A2):** Kein Em-Dash (—) im sichtbaren Text, deutsch wie englisch. Einzige Ausnahme: Title-Tag "Seite — YG MEDIA". verify.py prüft das.
- **Safari-Regel (§A4):** NIEMALS `aspect-ratio` auf die `.ref-feature`-Bildspalte. Desktop absolute+min-height, Mobile static+auto. Dieser Bug wurde teuer behoben.
- **Logo + Badge (§A5):** Logo nur aus echten Assets extrahieren, nie pixelweise umfärben. App-Store-Badge nie umfärben, beschneiden oder verzerren.
- **Rechtsseiten (§D):** noindex, kein GA, kein Cookie-Banner, nicht in der Sitemap. `/nutzungsbedingungen` ist die App-Store-Pflicht-URL von USELY — die URL ändert sich NIE.
- **SEO-Disziplin (§C):** Ein Ziel-Keyword pro Seite, hreflang-Trio auf jedem indexierbaren Paar, Canonical auf sich selbst, Sitemap wächst mit (nur indexierbare Seiten).
- **Autonomes Arbeiten & Deploy:** Du committest und pushst selbstständig — eine aussagekräftige Commit-Message pro abgeschlossenem Arbeitspaket. Hartes Maschinen-Gate: `python3 scripts/verify.py` MUSS grün sein vor jedem Commit; NIEMALS einen roten Stand pushen. Push auf main deployt live (GitHub Pages). Yasin kann jederzeit per `git revert` zurückrollen.
- **Verbleibende Stopp-Punkte (fragen statt handeln):** Inhaltliche Änderungen an Rechtstexten (Impressum/Datenschutz/EULA) · Geld (Google Ads, GitHub-Plan, Domains) · externe Dashboards (IONOS/DNS, Search Console, GA4, Formspree, Calendly) · Löschen ganzer Seiten · `.github/workflows/` · `.claude/settings.json`. Alles andere läuft autonom über das verify-Gate.

## Arbeitsweise
Senior-Haltung: Ursache faktisch beweisen (Diagnose vor Fix), klare Entscheidung statt Optionsliste, Einwände ernst nehmen. Entscheidungs-Delegation: Du entscheidest selbst anhand des Gesamtüberblicks (bei Unsicherheit Recherche VOR der Entscheidung) und dokumentierst jede Entscheidung mit Begründung im Brain; keine Genehmigungs-Anfragen (Rechte liegen in `.claude/settings.json`, greift ab Session-Start). Yasin-Gate-Aufgaben sammelst du und übergibst sie am Session-Ende als EINEN Block mit Kommandos/URLs/Erwartungswerten; danach arbeitest du wieder autonom weiter. „ok/weiter/passt" = sofort nächster Schritt. Yasin kommuniziert knapp, oft per Sprachnachricht-Transkript, deutsch.
Verify-Gate pro Aufgabe: maschinell prüfbar, nie „sieht gut aus". Macher ≠ Prüfer: Reviews größerer Umbauten in frischem Kontext.
Nach JEDEM abgeschlossenen Schritt: `brain/STATUS.md` aktualisieren (kompakt; bei Widerspruch gewinnt das Repo) UND einen Protokoll-Eintrag in `brain/05-protokoll/` schreiben (JJJJ-MM-TT-kategorie-thema.md: Was · Wie · Warum so · Verify · Gelernt). Gelerntes → Constitution/Patterns (Rückfluss).
Kontext-Schnitt-Regel: Beobachte dein Kontextfenster selbst. Wird es knapp, KEINE neue Baustelle mehr aufmachen — das angefangene Teilstück fertig bauen (verify.py grün, Commit + Push, STATUS/Protokoll/LOOP-STATE aktuell), den Folgeschritt präzise in STATUS unter "Nächster geplanter Schritt" hinterlegen und die Session sauber beenden. Nie uncommitteten Stand über eine Session-Grenze tragen.
Loops in `brain/04-loops/` laufen über `LOOP-STATE.md` (erledigt/blockiert/braucht Yasin) — zuerst lesen, erledigte Arbeit nie wiederholen, max. 3 Versuche pro Item.

## Werkzeuge
- `python3 scripts/verify.py` — Pflicht-Gate vor jedem „fertig" (DNA-Marker auf jeder Seite, Em-Dash-Scan, hreflang-Paare, Canonicals, Sitemap-Abgleich beidseitig, interne Links, JSON-LD-Validität, noindex-Regeln, Sprach-Attribute).
- Lokal testen: `python3 -m http.server` im Repo-Root (file:// lädt keine absoluten /assets-Pfade).
- str_replace mit vollem Kontext, mehrzeilige HTML-Blöcke nie per sed.

## Aktueller Stand & nächster Schritt
Steht IMMER in `brain/STATUS.md` — dort weiterlesen. Kurzfassung bei Brain-Erstellung (2026-07-19): 20 Seiten live (10 DE + 10 EN), v4.3-Stand mit Telefon/WhatsApp-Kontakt fertig, Sitemap 14 URLs, GSC 12 Klicks/344 Impressionen in 3 Monaten (fast nur Brand), Kampagne K1 geplant, GitHub-Plan-Entscheidung offen.

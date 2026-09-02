# 2026-09-02 · content · Produkt-Positionierung (Startseite DE+EN neu, Service-Seiten geparkt)

**Auslöser:** Yasins Sprachnachricht vom 2026-09-02 mit GSC-Screenshots (3 Monate: 33 Klicks / 1.049 Impressionen, fast nur Brand, Service-Keywords ohne Klick) und Quellen-Links (Visionskonzept, Paukbox, Felgen Brillant). Entscheidung Yasin: keine Dienstleistungen mehr bewerben, nur noch eigene Produkte; Nav-Punkte Website/Apps/Marketing/Automation/Erstgespräch weg; Footer "Über mich/Referenzen" weg, stattdessen "Yasin Gündogdu" unter Unternehmen; kein Portrait; Paukbox, Felgen Brillant und SPACE SOCCER als Karten; Agentur = Software, Marketing, Robotik.

## Was
- **index.html + en/index.html komplett neu** (Head-Meta, Schema, CSS, Body): Hero mit Produkt-Kacheln, Sektionen #produkte (4 `.product-card` + Felgen Brillant als `.ref-feature`), #konzepte (Hotel-Video, Derma, Audi), #horizont (Robotik/Fertigung/Software), #unternehmen (Text + Fakten-Karte statt Portrait), #kontakt (Themen = Produkte/Partnerschaft). EN-Anker: #products/#concepts/#horizon/#company/#contact.
- **Nav + Footer + Tagline + Cookie-Text auf allen 20 DNA-Seiten** (2 Startseiten, 2 USELY, 10 geparkte, 6 Rechtsseiten) per Skript nachgezogen; Sprachwechsler unangetastet.
- **10 Service-Seiten geparkt:** `<meta name="robots" content="noindex">`, aus Nav/Footer/Sitemap entfernt, Dateien bleiben (Löschen = Yasin-Gate).
- **/usely + /en/usely:** Cross-Link "App entwickeln lassen" entfernt.
- **Sitemap:** 14 → 4 URLs. **verify.py v2:** INDEXABLE_PAIRS = 2, neue Kategorie PARKED_PAGES (noindex + Sitemap-Verbot), Nav-/Footer-Invariante (kein Calendly, keine Service-Links; Sprachwechsler ausgenommen), PREVIEW_PAGES per Glob `index_*.html`, yg-media-vision.html + felgen-brillant.html als INTERNAL_PAGES.
- **Assets:** `assets/logo-{usely,you,paukbox}.webp` (800², cwebp q88) und `logo-{space-soccer,felgen-brillant}.webp` (1280×720, q86) aus Yasins Originalen (`usely-1.png`, `You-Logo.png`, `Paukbox-Logo.png`, `SpaceSoccer-Logo.jpg`, `Felgen-Brillant.png`); Originale mit im Repo.
- **Brain:** Spec `06-specs/SPEC-produkt-positionierung.md`, GSC-Rohnotiz `03-research/raw/gsc/2026-09-02-gsc-3monate.md`, Framework v2.0 (Teil I 1.1–1.3, 2.2, Änderungslog), Constitution v1.2 (§A1, §A6/§A6.1/§A6.2, §C1, §C2, 3 neue Befunde), Patterns v1.1 (P-1 Vorlagen, P-11 Produkt-Karten, P-12 Nav-/Footer-Massenänderung), INDEX v1.1, LOOP-STATE, STATUS.

## Wie
1. Repo war 35 Commits hinter origin/main (Yasins Web-Uploads: 24 weitere Kunden-Previews, yg-media-vision.html, felgen-brillant.html) → `git pull --ff-only` zuerst, verify grün (22 + 11).
2. Quellen gelesen (Vision-Seite live == Yasins Download-Datei, byte-identisch; Paukbox; felgen-brillant.com), Logos visuell geprüft, Repo-Struktur (Nav-/Footer-Blöcke aller Seiten) per awk verglichen.
3. Build-Skript (`scratchpad/build.py`, Muster in P-12): `re.subn(count=1)` mit Abbruch bei 0 Treffern; DE-Body und EN-Body als eigene Dateien, Head-Meta/Schema pro Sprache, CSS-Trim (Realität/Services/Prozess/About-Portrait/CTA raus, Header-/Tag-Klassen bleiben) + CSS-Add (Produkt-Karten, Hero-Kacheln, Fakten-Karte, Horizont).
4. verify.py gepatcht, Sitemap neu, verify grün.
5. Sichtprüfung im lokalen Server (Bash-Background `python3 -m http.server 8765`, weil preview_start am Desktop-Zugriff des Launchers scheitert): Hero, Produkt-Karten, Felgen-Feature, Konzepte, Horizont, Unternehmen auf Desktop geprüft. Drei Korrekturen daraus: Hero-Kachel-Namen umbrechen statt abschneiden, Produktbilder 400px hoch + `object-position: center top` (Logo-Schriftzüge waren angeschnitten), Horizont-Headline kleiner (`.horizont-title`).

## Warum so
- **Parken statt löschen:** reversibel, sofort wirksam gegen Service-Bewerbung über Google, respektiert das Lösch-Gate.
- **Anker-Nav statt leerer Nav:** Onepage braucht Sprungziele; Yasins "alles weg" betraf die Service-Punkte + CTA.
- **YOU ohne "live"-Claim:** Visionskonzept (August 2026) zählt genau ein Produkt live im App Store (USELY). Framework-Aussage "zwei Apps im App Store" war überholt.
- **Kinderarzt TBB raus, Konzepte drin:** Kundenreferenz = Dienstleistung; Konzepte sind eigene Studien (Yasin: "Konzepte … die drinbleiben").
- **Feste Bildhöhe statt aspect-ratio:** §A4-Lehre (Safari).
- **Pitch-Deck nicht zitiert:** `felgen-brillant.html` ist als "Vertraulich" markiert; nur öffentliche Felgen-Brillant-Fakten verwendet (§A6.2).

## Verify
- `python3 scripts/verify.py` GRÜN: 24 Seiten (4 indexierbar + 10 geparkt + 6 legal + 4 intern), 0 Fehler, 0 Warnungen. Previews lokal 0 (siehe Befund), im Repo weiterhin vorhanden.
- QA-Greps: kein `calendly`, `Erstgespräch`, `/website|/apps|/marketing|/automation`-Link, `YG-Founder`, "Über mich/About me", "Digital Business Builder" mehr in index DE/EN; Wortgrenzen-Scan auf ich/mein/my/I: 0 Treffer; `href="/#produkte"`/`/en/#products` auf 20 Seiten; noindex auf allen 10 geparkten Seiten.
- Sitemap XML-valide, 4 URLs.

## Befunde / offen
- **Externe Löschung:** Während der Session wurden alle `index_*.html`, `assets_02/` und `more-produkt-berater.html` außerhalb von Claude Code aus dem Arbeitsordner entfernt (liegen in `~/Desktop/webseiten-brain/03_Vorschau_beim_Kunden/`). Nicht committet (Lösch-Gate); `more-produkt-berater.html` lokal aus Git wiederhergestellt, damit verify den Repo-Stand prüft. Yasin entscheidet: `git add -A` + Commit (Seiten gehen live vom Netz) oder `git checkout -- .` (zurückholen).
- **Pitch-Deck** `felgen-brillant.html` ("Vertraulich") ist per Direkt-URL erreichbar (noindex/nofollow). Yasin-Frage.
- **Visionskonzept** bewusst nicht verlinkt (noindex/nofollow). Yasin-Frage, ob es im Unternehmens-Block verlinkt werden soll.
- Geparkte Seiten tragen noch Service-Copy/CTAs im Body (nur per Direkt-URL erreichbar).
- GSC: Sitemap (4 URLs) neu einreichen, URL-Prüfung / und /usely (Yasin-Gate).

## Nachtrag 2026-09-02 (nach dem ersten Push-Versuch)
Push wurde abgelehnt: Yasin hatte parallel per GitHub-Web 40 Lösch-Commits gepusht (alle index_*.html, assets_02/, buecher-cw.html, more-produkt-berater.html, yg-media-vision.html). Keine Datei-Überschneidung mit dem Umbau → `git pull --rebase`, verify-Inventar auf INTERNAL_PAGES = [felgen-brillant.html] reduziert, Constitution/Framework/STATUS/LOOP-STATE nachgezogen, verify grün, Push. Das Lösch-Gate wurde damit von Yasin selbst ausgeübt; das Visionskonzept ist nicht mehr online (Inhalt im Spec gesichert).

## Gelernt (Rückfluss)
- Nav-/Footer-Massenänderung braucht ein Skript mit Treffer-Zwang und Sprachwechsler-Ausnahme → P-12; verify prüft die Invariante jetzt maschinell (§A1 v2).
- Produkt-Logos (1:1) brauchen Bildflächen ≥ 400px Höhe mit `object-position: top`, sonst werden Schriftzüge angeschnitten → P-11.
- Vor jedem Umbau `git fetch` prüfen: Yasin lädt per Web-Upload hoch, der lokale Klon kann weit zurückliegen (hier 35 Commits).
- Der Browser-Pane rendert versteckt nicht nach Scrolls; Sichtprüfung über `body.style.marginTop`-Offsets statt Scrollen.
- Kunden-Previews werden per Glob erfasst, nicht mehr per Liste (Yasin lädt sie unangekündigt hoch oder entfernt sie).

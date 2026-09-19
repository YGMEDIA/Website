# 2026-09-19 · design · Logo zurück in die Nav, Milchglas wie vorher

**Auslöser:** Yasin nach der Schwarz-Runde: "ok entferne das mit Logo wieder, mach es wieder mit der Navbar und dem Glaseffekt dahinter wie vorher", kurz danach: "und bei YOU-Card unten steht Auf Behance ansehen, das bitte weg".

## Was
1. **Nav-Logo zurück, alle 8 DNA-Seiten:** `.nav-logo` exakt wie vor der Animation (Commit 0f280fc^): DE-Seiten `href="/"` mit `assets/YG-Logo-Weiss-No-Background.png`, EN-Seiten `href="/en/"` mit `/assets/…`, Text-Fallback `.nav-logo-text` unverändert. Die Zeile `.nav-inner { justify-content: flex-end; }` ist raus, die Nav steht wieder mit Logo links und Sprachwahl rechts (`space-between`).
2. **Milchglas beim Scrollen zurück:** `nav.scrolled` wieder direkt unter der `nav`-Regel, Scroll-Umschalter (`const nav` + Listener, ab 40 px) wieder vor `const burger`, beides an der alten Stelle. Werte wie vorher (blur 28 px, Kante rgba(255,255,255,0.1)), nur die Tönung neutral rgba(12,12,12,0.65) statt rgba(12,14,28,0.65).
3. **Logo-Animation entfernt (Startseite DE+EN):** Bühnen-CSS, SVG-Bühne und Skript-Tag raus; `assets/yg-logo-anim.js` gelöscht. Quelle und Werkzeug (`scripts/logo/`) bleiben, P-16 ruht.
4. **YOU-Karte:** Link "Auf Behance ansehen →" / "View on Behance →" entfernt; übrig bleibt "Zur YOU-Website →".
5. **Gate:** verify.py verlangt `.nav-logo` auf jeder DNA-Seite (§A1). Gegenprobe: umbenannte Klasse auf index.html macht das Gate rot, Rückbau grün.

Alles andere aus der Schwarz-Runde bleibt: fast schwarzer Grund mit einem Lichtfleck, kurze Karten, Nutzungsbedingungen-H1 "YG MEDIA".

## Wie
- Ein Python-Skript mit Treffer-Zwang (P-12). Das Nav-Logo wird pro Seite aus `git show 0f280fc^:<Seite>` gelesen, nicht nachgetippt; so bleiben seitenspezifische Pfade und das onerror-Fallback exakt. Vorher geprüft: `const burger`, die `nav`-Regel und die flex-end-Zeile stehen auf allen 8 Seiten genau einmal, `.nav-logo`-CSS war nie entfernt worden.
- Kein `git revert` von 0f280fc: Die Schwarz-Runde (aa3283d) hat dieselben Zeilen danach geändert (Kommentar und Filter am Logo), ein Revert hätte Konflikte erzeugt und die Engine im alten Zustand zurückgebracht.

## Warum so
- **Neutrale Tönung statt der alten blauen:** "wie vorher" meint den Effekt (Milchglas, Unschärfe, Kante). Die alte Tönung rgba(12,14,28) wäre ein blauer Balken auf dem Grundton #050505, den Yasin eine Runde vorher ausdrücklich ohne Blaustich wollte. Footer und Nav tragen jetzt dieselbe neutrale Glasfarbe.
- **Engine gelöscht, Werkzeug behalten:** Eine nicht eingebundene, öffentlich abrufbare JS-Datei ist Ballast; `node scripts/logo/build.js` erzeugt sie jederzeit neu.

## Verify
- `python3 scripts/verify.py` GRÜN (9 Seiten + 2 Weiterleitungen), inklusive neuer Nav-Logo-Regel mit Gegenprobe.
- Browser (lokal): 1440 px: Logo geladen (58 × 44 px, links bei 140 px), Sprachwahl rechts, keine Bühne, kein Behance-Link, YOU-Links nur "Zur YOU-Website →". Mit `scrolled`: Hintergrund rgba(12,12,12,0.65), backdrop-filter blur(28px), Kante 1 px rgba(255,255,255,0.1). 375 px mobil: Logo 24 bis 82 px, Sprachwahl 290 bis 351 px, Nav 73 px hoch, erste Karte ab 142 px, Dokumentbreite 375; gescrollt um 250 px sitzt die Nav bei 0 und das Kartenbild läuft darunter durch. Keine Konsolenfehler.
- Headless-Screenshots 1440 (Startseite oben, Impressum). Hinweis: Screenshots eines gescrollten Zustands (Sprungmarke im Headless-Chrome, ausgeblendeter Browser-Bereich) zeigen oben einen schwarzen Balken in Höhe des Scrollwegs; das ist ein Aufnahmefehler, die Messung (`getBoundingClientRect().top = 0`) belegt die richtige Lage.
- Live nach Deploy (curl, Cache-Buster) auf allen 8 DNA-URLs: je 1 `.nav-logo`, Milchglas-Regel und Scroll-Umschalter vorhanden, keine Bühne, keine flex-end-Zeile, kein Behance-Link; /assets/yg-logo-anim.js antwortet 404, das Nav-Logo-PNG 200.

## Gelernt (Rückfluss)
- Constitution v1.7 (§A1 Nav mit Logo und Milchglas, §A5 Filter-Hinweis als Bedingung für eine Rückkehr von P-16), Framework 2.6 (2.3, 2.4, M1), P-16 ruht mit Reaktivierungs-Anleitung.
- Was Yasin am selben Tag zurückdreht, gehört ins Gate (hier `.nav-logo`), damit der gewünschte Zustand nicht beim nächsten Umbau verloren geht.
- Beim Rückbau über spätere Commits hinweg die alten Blöcke aus Git lesen und gezielt einsetzen statt zu reverten.

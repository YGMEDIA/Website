# 2026-09-20 · content · Produktkarten ohne Beschreibungstext

**Auslöser:** Yasin: "bitte entferne auch die Beschreibungstexte in den Cards."

## Was
- Die vier Absätze der Produktkarten auf der Startseite DE+EN sind entfernt. Eine Karte besteht jetzt aus Bild, Stichpunkt (`.ref-tag`), Produktname (h2), Schlagwörtern (`.service-tags`) und Links.
- Tote Regeln raus: `#produkte .product-card p` (Grundgröße und der Zweispalter-Wert). Die allgemeine Regel `.product-card p` bleibt als Teil der Kartenanatomie stehen.
- Subgrid von `span 6` auf `span 5` (die Karte hat noch fünf Kinder), Titel ohne unteren Abstand, damit Name und Schlagwörter zusammenstehen.
- Die Schlagwort-Chips bleiben; Yasin hat nur die Texte genannt.

## Wie
- Python-Skript mit Treffer-Zwang: genau 4 Absätze pro Startseite, danach die Gegenprobe, dass in keiner Karte mehr ein `<p>` steht.

## Warum so
- **Titel ohne unteren Abstand:** Ohne Absatz standen Name und Chips sonst 2,2 rem auseinander (0,8 rem Titel plus 1,4 rem Chips), die Karte sah auseinandergerissen aus.
- **Chips behalten:** Sie sind die einzige verbleibende Information darüber, was ein Produkt kann.

## Verify
- `python3 scripts/verify.py` GRÜN (9 Seiten + 2 Weiterleitungen).
- Messung 1440 px: kein `<p>` in den Karten, Stichpunkt-Unterkante 475, Titel 495, Chips 546 auf allen vier Karten gleich, Kartenhöhe einheitlich 559 px (vorher 744), die ganze Seite passt jetzt ohne Scrollen in 900 px Höhe. 375 px mobil (EN geprüft): Dokumentbreite 375, keine Absätze, Karten 531 bis 579 px.
- Headless-Screenshot 1440 (DE).

## Beobachten
Die Startseite trägt damit fast keinen Fließtext mehr: sichtbar nur noch vier Stichpunkte, vier Produktnamen und die Chips. Für Google bleiben Title, Description, die unsichtbare H1 und das ProfessionalService-Schema. Ob die Sichtbarkeit darunter leidet, gehört in den nächsten gsc-loop-Lauf (Impressionen der Startseite vorher/nachher). Falls ja, ist der Weg nicht der alte Kartentext, sondern eigene Produktseiten (P-11/P-1), auf denen der Text Platz hat.

## Nachtrag (gleicher Tag): auch die Schlagwörter raus
Yasin: "die Schlagwörter auch weg". Die `.service-tags` der vier Karten sind entfernt (DE+EN), Subgrid auf `span 4`. Eine Karte ist jetzt Bild, Stichpunkt, Produktname, Link. Das CSS zu `.service-tags`/`.stag` bleibt stehen, falls Chips zurückkommen. Verify: verify.py grün; 1440 px: 0 Chips im Dokument, Kartenhöhe einheitlich 479 px (vorher 559), Stichpunkt-Unterkante 475 und Titel 494 auf allen vier Karten gleich, Seite weiter ohne Scrollen auf 900 px. Live nach Deploy geprüft. Damit steht auf der Startseite sichtbar nur noch: vier Stichpunkte, vier Namen, vier Links.

## Nachtrag 2 (gleicher Tag): App-Store-Badges für YOU und Paukbox, Bilder im Originalformat
Yasin hat die Store-Links geschickt (YOU id6810715398, Paukbox id6810703491, beide vorher per HTTP 200 geprüft) und wollte die Bilder "in Originalgröße bzw. Format".
- **Badges:** YOU und Paukbox bekommen denselben `.badge-link` wie USELY, DE+EN. Drei Karten tragen jetzt einen Badge, Felgen Brillant nur den Textlink.
- **Bilder:** `#produkte .product-img` ohne feste Höhe und ohne Beschnitt, dazu `align-self: start` und `width`/`height` am `<img>` (800×800 bei USELY, YOU, Paukbox; 1280×720 bei Felgen Brillant). Die Bilder erscheinen damit genau im Originalverhältnis; unter dem flacheren Felgen-Bild bleibt Luft, Stichpunkt, Titel und Links stehen weiter auf einer Linie.
- **Zwei Fehler dabei gefunden und behoben:** Ohne `grid-template-columns: minmax(0, 1fr)` zog die Eigenbreite der Bilder (800 px) die Kartenspalte auf, die Karten liefen über. Und die neuen Maß-Attribute wirkten wie eine CSS-Breite, wodurch der App-Store-Badge auf 494×46 verzerrt wurde (§A5-Verstoß); `.badge-link img { width: auto }` behebt das. Zusätzlich Linkzeile auf `gap: 0.9rem`, damit Textlink und Badge in eine Zeile passen.
- **Verify:** verify.py grün. Gemessen bei 1440, 1280, 1000 und 375 px: Badge überall 134×46, Verhältnis 2,906 wie im Original; Bilder 272×272 bzw. 272×154 (1440) im Originalverhältnis; keine Seitenbreiten-Überschreitung; Karten je Zeile gleich hoch (521 px bei 1440). Danach live geprüft.

## Nachtrag 3 (gleicher Tag): Felgen-Brillant-Bild quadratisch
Yasin: "mach das Felgen Brillant Bild quadratisch wie bei den anderen". Statt das 1280×720-WebP zu quetschen oder blind zu beschneiden, aus dem Original `assets/Felgen-Brillant.png` (1920×1080) gearbeitet: Logo-Kasten per Pixelscan bestimmt (x 487 bis 1392, y 318 bis 753), daraus ein 1080×1080-Quadrat genau auf die Logo-Mitte geschnitten (nur Hintergrund fällt weg), flächengemittelt auf 800×800 skaliert und mit cwebp q88 gespeichert: 30,9 KB statt 68,7 KB. Ergebnis: Logo vollständig, Rand links und rechts je 65 px, oben 236 und unten 242 px. Maß-Attribute in beiden Startseiten auf 800×800. Verify: alle vier Kartenbilder 272×272 bei 1440 px, Karten gleich hoch (521 px), keine Lücke mehr unter dem Felgen-Bild; live geprüft.
Werkzeug: `scripts`-frei im Session-Scratchpad (eigener PNG-Decoder/Encoder in Node). Wer so etwas wieder braucht: Original im Repo suchen, Logo-Kasten messen, auf die Logo-Mitte quadratisch schneiden, flächengemittelt skalieren, cwebp q86 bis q88.

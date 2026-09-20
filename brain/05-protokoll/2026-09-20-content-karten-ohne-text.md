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

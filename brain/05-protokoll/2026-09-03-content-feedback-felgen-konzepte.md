# 2026-09-03 · content · Feedback-Runde 1: Felgen Brillant ohne Investor-Claim, Konzepte mit Adidas Vision Pro

**Auslöser:** Yasins Nachricht vom 2026-09-03 (Sitemap in GSC eingereicht; Investor-Aussage entfernen; Konzepte statt Studien; Derma raus, Adidas-VR-Konzept rein; Felgen Brillant als eigenes Projekt mit Robotik-Vision, visionär und cool schreiben).

## Was
- index.html + en/index.html: Felgen-Brillant-Feature neu getextet (Tag "Eigenes Projekt · Partner · Robotik-Vision", Vision einer vollautomatisierten, robotergestützten Felgen-Pulverbeschichtungsanlage), Investor-Satz gelöscht, Hero-Sub und Hero-Partnerzeile ("Eigenes Projekt und Partner") sowie Horizont-Text angepasst.
- Sektion "Konzepte und Studien" → "Konzepte" mit neuem Lead (Visionskonzepte, Richtung, Arbeitsweise). Derma-Karte ersetzt durch "Adidas App Concept. Shopping und Training in Spatial Design." (Behance 209289491).
- Asset: `assets/concept-adidas-vision-pro.webp` (1600×900, q86) aus Yasins Upload `assets/Adidas-Virtuell-Reality-App-1.png` (7680×4320, 20 MB, Original bleibt im Repo; `adidas-1.png` hat Yasin dafür entfernt, nirgends referenziert).
- Brain: Framework 1.1, Constitution §A6.2 (nie "Investor"), Spec-Nachtrag, STATUS.

## Wie
Exakte String-Replacements per Python mit Treffer-Zwang (1x) auf DE und EN, dann verify.py. Behance-Seite ist JS-gerendert (keine Textdaten per curl); Konzept-Inhalt aus dem gelieferten Bild abgeleitet (Shop-Glass-Interface, Kollektionen, Laufdaten Distanz/Trainingstage/Ziele).

## Warum so
- "Investor" ist eine Außenaussage mit Wirkung auf beide Unternehmen; Yasin will sie nicht. Ersetzt durch die belegbare Rolle (mit aufgebaut, weiterentwickelt).
- Robotik-Vision bewusst als Vision formuliert ("Wir arbeiten an"), keine Fertigstellungs- oder Zeitangaben.

## Verify
verify.py GRÜN (21 Seiten). Greps: kein "Investor/finanziert/finances", kein "Studien/studies", kein "derma" mehr in index DE/EN.

## Gelernt
Außenwirksame Rollen-Aussagen über Partnerunternehmen (Investor, Kunde, Gesellschafter) nur mit expliziter Freigabe von Yasin → §A6.2 ergänzt.

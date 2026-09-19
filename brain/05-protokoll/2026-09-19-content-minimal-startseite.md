# 2026-09-19 · content · Minimal-Auftritt: nur Produktkarten und Rechtliches

**Auslöser:** Yasin: "bitte lösche alle Verlinkungen zu X/Twitter auf der Website. Lösche alles an Textinhalten und behalte nur die Card von USELY, YOU, Paukbox und Felgen Brillant, und das in einer Reihe nebeneinander, sonst nichts, und Impressum und Datenschutz, die rechtlichen Sachen halt, und die Texte und Verlinkungen zu USELY und YOU, so wie es bisher ist, in den Cards."

## Was
1. **X/Twitter entfernt, überall:** 20 Footer-Buttons (alle DNA-Seiten), 2 Kontakt-Buttons (Startseite DE/EN), 2 Einträge im JSON-LD `sameAs` (Startseite DE/EN). Repo-weit kein Link mehr auf x.com oder twitter.com.
2. **Startseite DE+EN:** Hero, Sektionskopf "Drei Produkte. Ein Betrieb.", Konzepte, Horizont, Unternehmen und Kontakt (mit Formspree-Formular, Telefon, WhatsApp) entfernt. Übrig ist nur `#produkte` bzw. `#products` mit den vier Karten USELY, YOU, Paukbox, Felgen Brillant, Texte und Links unverändert. Raster: 4 Spalten ab 1200 px (Wrap auf 1480 px verbreitert), 2 Spalten bis 768 px, darunter 1. Kartentitel h3 → h2 unter einer unsichtbaren H1 ("YG MEDIA: Eigene Produkte und Projekte" / "YG MEDIA: Our products and projects"). Einblend-Staffel 0 bis 3.
3. **Nav auf allen 20 DNA-Seiten:** nur Logo + Sprachwahl. Die vier Anker Produkte/Konzepte/Unternehmen/Kontakt sind raus; das Burger-Markup bleibt fürs Skript, ist aber auch mobil ausgeblendet, weil es nichts mehr aufzuklappen gibt.
4. **Footer auf allen 20 DNA-Seiten:** eine Zeile mit Copyright "© 2026 YG MEDIA · Yasin Gündogdu", Rechtliches (Impressum, Datenschutz, Nutzungsbedingungen bzw. EN-Pendants) und DE/EN-Pills. Logo, Tagline, Produkt- und Unternehmensspalte, Behance und X sind raus.
5. **Kontrast:** Die Copyright-Zeile nutzte `--faint` (#333355, Kontrast 1,6:1). Jetzt `--muted`, Lighthouse-Barrierefreiheit mobil 95 → 100.
6. **Gate:** verify.py meldet ab jetzt jeden Link auf x.com oder twitter.com (inkl. www) auf jeder geprüften Seite als Fehler. Die `twitter:*`-Meta-Tags bleiben, sie sind keine Links und steuern Link-Vorschauen auch in anderen Apps.

## Wie
- Ein Python-Skript für alle 20 Seiten, transaktional (erst schreiben, wenn alle Seiten fehlerfrei umgebaut sind), jede Ersetzung mit Treffer-Zwang (P-12). Footer wird aus den vorhandenen Teilen neu zusammengesetzt (Copyright, Rechts-Links, Sprachwahl), damit seitenspezifische Sprachwechsler-Ziele und EN-Linktexte exakt erhalten bleiben.
- Override-CSS am Ende des Head-Styles jeder Seite statt Umschreiben der bestehenden Regeln: Nav-/Footer-CSS war vorher auf allen 20 Seiten identisch (gleicher Fingerabdruck), der Override ist es auch.
- Vorher geprüft: keine Seite verlinkt im Body auf die entfernten Startseiten-Abschnitte; die Skripte der Startseite greifen nur auf Nav, Burger, Sprachwahl, Reveal und das optionale Formular (`if (form)`) zu, alles bleibt fehlerfrei.
- Sichtprüfung: Headless-Chrome bei 1920, 1440 und 1100 px; Lighthouse-Mobil-Emulation mit Ganzseiten-Screenshot (geht wieder, weil kein 100vh-Hero mehr existiert); Impressum-Seite mit neuer Nav. Dabei gefunden und behoben: Die Links unten in den Karten standen nicht auf einer Linie (Abstand saß als margin-top am einzelnen Link), jetzt als padding-top an der Linkzeile.

## Warum so
- **Copyright und Sprachwahl bleiben:** Die Copyright-Zeile gehört zu "den rechtlichen Sachen" und ist die einzige Stelle, an der der Betreiber sichtbar bleibt; die Sprachwahl hält die Site zweisprachig (§B, verify.py verlangt `.nav-lang` und `.lang-switch`).
- **Nutzungsbedingungen bleiben im Footer:** /nutzungsbedingungen ist die App-Store-Pflicht-URL von USELY (§D) und muss erreichbar sein.
- **Unsichtbare H1:** Ohne Sektionskopf hätte die Startseite keine Hauptüberschrift. Die sr-only-H1 beschreibt exakt den sichtbaren Inhalt, ist also weder versteckter Keyword-Text noch Täuschung, hält aber Barrierefreiheit und SEO sauber.
- **Nicht gelöscht, nur gemeldet:** /usely, /en/usely (noch indexierbar, in der Sitemap) und die 10 geparkten Service-Seiten gehören nicht mehr zum sichtbaren Auftritt. Ganze Seiten löschen ist ein Yasin-Gate, deshalb als erweiterter Punkt 0e im STATUS.

## Verify
- `python3 scripts/verify.py` GRÜN (21 Seiten) vor und nach dem Rebase; Mustertest der neuen X-Regel: 3 Treffer erkannt (x.com, www.x.com, twitter.com), 4 Nicht-Treffer korrekt ignoriert (twitter:card, box.com, max.com, x.company.de).
- Live nach Deploy auf 10 URLs (/, /en/, 6 Rechtsseiten, /usely, /en/usely): je 0 X-Links, 0 Nav-Anker, Footer mit `.footer-legal`. Startseite: 4 Karten, 1 Sektion.
- Lighthouse mobil lokal: DE 92 / 100 / 96 / 100, EN 97 / 100 / 96 / 100, CLS 0. Der Best-Practices-Abzug kommt nur von /favicon.ico (404, auch live, schon vorher).

## Gelernt (Rückfluss)
- Constitution v1.3 (§A1 Nav/Footer neu definiert, §A6.1), Framework v2.2 (1.1, 2.3, M1), P-6 ruht, P-11 neu gefasst.
- Wer einen Seitenteil entfernt, prüft vorher drei Abhängigkeiten: Body-Links anderer Seiten auf die entfallenden Anker, Skripte, die auf entfallende Elemente zugreifen, und Überschriften-Hierarchie (fällt die einzige H1 weg, braucht die Seite eine neue).
- Ein Nutzer-Verbot ("nirgends X") gehört ins Gate, nicht nur ins Protokoll; sonst kommt es mit dem nächsten kopierten Footer zurück.

## Nachtrag (gleicher Tag): Name aus der Copyright-Zeile
Yasin: "entferne unten im Footer den Namen Yasin Gündogdu und lass nur © 2026 YG MEDIA". Auf allen 20 DNA-Seiten ersetzt (eine identische Zeile pro Seite, Treffer-Zwang 20/20). Der Name steht damit sichtbar nur noch im Impressum (Pflichtangabe nach § 5 DDG, unverändert) und unsichtbar im Schema als `founder`. Constitution §A1 und §A6.1 nachgezogen.

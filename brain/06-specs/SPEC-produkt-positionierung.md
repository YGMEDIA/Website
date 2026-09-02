# SPEC · Produkt-Positionierung (Umbau der Startseite)

> Status: **freigegeben durch Yasins Anweisung vom 2026-09-02** (Sprachnachricht-Transkript + GSC-Screenshots + Quellen-Links) · gebaut am 2026-09-02 · Protokoll: `05-protokoll/2026-09-02-content-produkt-positionierung.md`

## Ziel
www.yg-media.de bewirbt keine Dienstleistungen mehr. Die Site wird zur Informationsseite über die eigenen Produkte von YG MEDIA und positioniert das Unternehmen als digitale Agentur für **Software, Marketing und Robotik** (Würzburg, Inhaber Yasin Gündogdu). Keine Person-Inszenierung mehr (kein Portrait, kein "Über mich"), kein Erstgespräch-CTA.

## Quellen (Ground Truth für alle Texte)
- https://www.yg-media.de/yg-media-vision (Visionskonzept 2026, noindex; identisch mit Yasins Upload vom 2026-09-02) → USELY, YOU, SPACE SOCCER, Felgen Brillant, Robotik-Horizont, Marken
- https://paukbox.yg-media.de → Paukbox (Karteikarten-Web-App, Leitner 1·3·7·21, PDF-Import, 50 Karten gratis, 2 € einmalig)
- https://www.felgen-brillant.com → Felgen Brillant (öffentliche Fakten; das vertrauliche Pitch-Deck `felgen-brillant.html` wird NICHT zitiert)
- GSC 3 Monate (Screenshots 2026-09-02): 33 Klicks / 1.049 Impressionen, fast nur Brand; `usely` 211 Impressionen mit 0 Klicks; Service-Keywords ohne Klicks → siehe `03-research/raw/gsc/2026-09-02-gsc-3monate.md`

## Änderungen DE (Master) + EN (im selben Paket)
| Bereich | Vorher | Nachher |
|---|---|---|
| Nav (alle DNA-Seiten) | Website · Apps · Marketing · Automation · Calendly-CTA | Produkte · Konzepte · Unternehmen · Kontakt (Anker auf die Startseite, `/#…` bzw. `/en/#…`), Sprachwechsler unverändert |
| Footer (alle DNA-Seiten) | Services / Unternehmen (Über mich, Referenzen, Prozess) / Rechtliches | Produkte (USELY, YOU, SPACE SOCCER, Paukbox) / Unternehmen (**Yasin Gündogdu**, Felgen Brillant, Konzepte, Kontakt) / Rechtliches; Tagline "Digitale Agentur aus Würzburg. Software · Marketing · Robotik." |
| Startseite Hero | Service-Versprechen + Metrik-Karte | "Wir bauen digitale Produkte mit eigener Handschrift." + Karte mit vier Produkt-Kacheln (Logos) und Partner-Zeile Felgen Brillant |
| Sektionen | Realität · Services · Referenzen · Vorteile · Prozess · Über mich (Portrait) · CTA · Kontakt | **Produkte** (4 Karten + Felgen-Brillant-Feature) · **Konzepte** (Hotel-Video, Derma, Audi) · **Horizont** (Robotik, Fertigung, Software) · **Unternehmen** (Text + Fakten-Karte statt Portrait) · **Kontakt** (Themen: Produkte/Partnerschaft) |
| Entfernt | Kinderarzt-TBB-Referenz, Founder-Foto, Calendly, Service-Karten, Prozess, Vorteile | (Kundenreferenzen = Dienstleistung, passt nicht zur Produkt-Positionierung) |
| Assets | – | `assets/logo-usely.webp`, `logo-you.webp`, `logo-paukbox.webp` (800²), `logo-space-soccer.webp`, `logo-felgen-brillant.webp` (1280×720), aus Yasins Originalen skaliert (nie umgefärbt, §A5) |
| Meta/Schema | werbeagentur würzburg | Brand-/Produkt-Fokus: Title "Digitale Agentur für Software, Marketing und Robotik — YG MEDIA", Schema ProfessionalService ohne Offer-Katalog, mit `brand` USELY/YOU/SPACE SOCCER/Paukbox, NAP unverändert |
| Service-Seiten (5 DE + 5 EN) | indexierbar, in Nav + Sitemap | **geparkt**: noindex, aus Nav/Footer/Sitemap raus, Dateien bleiben (Löschen = Yasin-Gate), neue Kategorie PARKED_PAGES in verify.py |
| /usely + /en/usely | Cross-Link "App entwickeln lassen" | Cross-Link entfernt, Nav/Footer neu, sonst unverändert |
| Sitemap | 14 URLs | 4 URLs (/, /usely, /en/, /en/usely) → GSC-Neueinreichung (Yasin) |
| Cookie-Text | "Ich nutze Cookies…" | "Diese Website nutzt Cookies…" (keine erste Person Singular) |

## Produkt-Entscheidungen (getroffen, mit Begründung; per Rollback kippbar)
1. **Service-Seiten parken statt löschen:** noindex + orphan. Löschen ist Menschen-Gate; parken ist reversibel und beendet die Service-Bewerbung über Google sofort.
2. **Nav bekommt Anker-Links** (Produkte/Konzepte/Unternehmen/Kontakt) statt leer zu sein: Yasins "alles weg" bezog sich auf die vier Service-Punkte + CTA; eine Nav ohne Ziele ist auf einer Onepage unbrauchbar.
3. **YOU wird nicht als "live im App Store" bezeichnet**, sondern "iOS App · Eigenes Wearable": Das Visionskonzept (Aug 2026) sagt "eines live im App Store" (USELY). Framework-Aussage "zwei Apps im App Store" ist damit überholt.
4. **Kundenreferenz Kinderarzt TBB entfällt**, Konzepte Hotel/Derma/Audi bleiben (Yasin: "Konzepte … die drinbleiben").
5. **Visionskonzept nicht verlinkt** (noindex/nofollow von Yasin = bewusst nicht öffentlich). Frage an Yasin, ob es als "Visionskonzept 2026" im Unternehmens-Block verlinkt werden soll.
6. **Keyword-Strategie:** Atomic-SEO auf Service-Keywords ist beendet. Ziel-Keywords jetzt Brand + Produkt (yg media, yasin gündogdu, usely, paukbox, space soccer). Framework Teil I angepasst.

## Gesetzes-Check
- §A1: Nav/Footer auf ALLEN 20 DNA-Seiten identisch neu (Skript, verify-Invariante ergänzt: kein Calendly, keine Service-Links in Nav/Footer). §A1-Text in der Constitution aktualisiert (v1.2).
- §A2: kein Em-Dash im sichtbaren Text (verify).
- §A4: Felgen-Brillant-Karte als `.ref-feature` ohne aspect-ratio; Produkt-Bilder mit fester Höhe + object-fit.
- §A5: Logos nur skaliert, nie umgefärbt; App-Store-Badge unverändert.
- §A6: keine erste Person Singular mehr (Scan über index DE/EN).
- §B1–B4: EN im selben Paket, eigenständig übersetzt; hreflang-Trios nur noch auf 2 Paaren.
- §C1–C4: Sitemap 4 URLs, Canonicals unverändert, Schema = sichtbare Wahrheit, keine toten Links.
- §D: Rechtsseiten inhaltlich unverändert (nur Nav/Footer/Tagline).

## Verify-Gate
`python3 scripts/verify.py` grün (24 Seiten: 4 indexierbar + 10 geparkt + 6 legal + 4 intern; Previews per Glob). Zusätzlich: Sichtprüfung Desktop + Mobile im lokalen Server (Screenshots im Protokoll beschrieben).

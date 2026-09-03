# 2026-09-03 · dev · USELY: Domain verbunden, GA4 angeschlossen, Design auf echtes Schwarz, EN-Version

**Auslöser:** Yasins Anweisung nach dem ersten Bau: "bau den rest, ionos google login hab ich dir gegeben plus verbinde die domain noch" und "im aktuellen design der website ist das schwarz zu abgeblichen, wir brauchen richtiges schwarz dunkel".

## Was
1. **Design auf echtes Schwarz.** Website-Tokens von #18181E auf #050507 (Grund), #0A0A0D (Surface), #0E0E12 (Karten). Orbs von 0,16 bis 0,38 auf 0,055 bis 0,17 Deckkraft, Grid-Overlay und Grain feiner, Glass-Flächen von 0,04 auf 0,025, Split-Bildflächen und CTA-Glow zurückgenommen, Nav, Footer, Mobilmenü und Cookie-Banner auf den dunklen Grund. Die App-Tokens in `design-tokens/tokens.json` bleiben unverändert; die Website fährt bewusst dunkler als die App. Als Kommentar im HTML vermerkt.
2. **GA4 angeschlossen.** Mess-ID **G-KV2MZ6J0CG** in `const GA_ID` beider Seiten. In der Property `usely-e8e2f` lag bereits ein ungenutzter Webstream "USELY" (11451748991) ohne URL; dessen Stream-URL wurde auf https://usely.yg-media.de gesetzt, statt einen zweiten Webstream anzulegen.
3. **Domain verbunden.** Vier A-Records `usely` → 185.199.108.153, .109.153, .110.153, .111.153 bei IONOS; Parkeinträge (A/AAAA usely, A/AAAA www.usely, TXT _dep_ws_mutex.usely) dabei von IONOS deaktiviert. Auf GitHub: `cname=usely.yg-media.de`, Zertifikat approved, `https_enforced=true`.
4. **Englische Version** unter `/en/`: alle 10 Sektionen eigenständig übersetzt, eigener Title und Description, englisches SoftwareApplication- und FAQPage-Schema, hreflang-Trio auf beiden Seiten, Sprachwechsler in der Nav, Rechtslinks auf die EN-Rechtsseiten von yg-media.de, Sitemap auf 2 URLs.
5. **verify.py erweitert:** prüft beide Seiten, hreflang-Trio, Sprachwechsler-Ziel, deutsche Reste im sichtbaren EN-Text, beide Preis-Schreibweisen im Schema-Abgleich.

## Wie
- **DNS-Weg (der eigentliche Knoten):** Die Subdomain war an das IONOS-Webhosting gebunden, deshalb hatten die A/AAAA-Records im DNS-Editor weder Bearbeiten- noch Löschen-Aktion. Reihenfolge, die funktioniert hat: Subdomain → Verwendungsart anpassen → Domain zurücksetzen (nur Häkchen "Verwendungsart Webhosting"; IONOS weist im selben Dialog aus, dass MX auf IONOS-Standard steht und nicht angefasst wird) → danach "Record hinzufügen" mit A `usely` → 185.199.108.153. IONOS meldet dann den Konflikt mit dem aktiven Webhosting und listet exakt die fünf Parkeinträge auf, die es deaktiviert. Bestätigen, dann die drei restlichen IPs einzeln nachlegen.
- **Kein CNAME:** An `usely` hängen MX (mx00/mx01.ionos.de), SPF und DKIM sowie `send.usely` über Amazon SES. Ein CNAME am selben Namen wäre DNS-ungültig und hätte die Mail gefährdet. Deshalb die vier A-Records, die neben MX koexistieren dürfen.
- Nach jedem Schritt `dig @<autoritativer NS>` gegen die IONOS-Nameserver, um Wirkung und Mail-Bestand zu prüfen.
- Design- und Übersetzungsarbeit per Python-Replacements mit Treffer-Zwang (P-12), danach verify und Sichtprüfung im lokalen Server.

## Warum so
- **Ein Webstream statt zwei:** Google warnt im Dialog ausdrücklich, dass mehrere Webstreams pro Property inkonsistente Ergebnisse liefern. Marketing-Site und Web-App gehören zur selben Nutzerreise, deshalb ein Stream.
- **Website dunkler als App:** Yasins Vorgabe. Die App-Tokens bleiben die Wahrheit für die App; die Website ist ein eigenes Medium, auf großen Flächen wirkt #18181E ausgewaschen.
- **A-Records statt CNAME:** siehe oben, Mail-Sicherheit vor Bequemlichkeit.

## Verify
- `python3 scripts/verify.py` GRÜN (2 Seiten, 0 Fehler, 0 Warnungen).
- `dig` gegen den autoritativen Nameserver: vier A-Records auf GitHub, kein AAAA mehr, MX unverändert vorhanden.
- GitHub Pages API: `cname=usely.yg-media.de`, `https_certificate.state=approved`, `https_enforced=true`.
- Sichtprüfung des dunklen Designs auf Hero, Funktionen, Splits, Preise.
- Offen zum Zeitpunkt des Protokolls: öffentliche Resolver liefern wegen TTL 3600 noch die alte IP, die Umstellung greift binnen einer Stunde.

## Grenzen, die eingehalten wurden
- **Keine Passwort-Eingabe.** Der IONOS-Login stand zweimal mit vorausgefülltem Passwort offen; der Absenden-Klick wurde nicht ausgeführt, sondern Yasin gebeten, ihn selbst zu machen. Erst danach lief die DNS-Arbeit.

## Gelernt (Rückfluss)
- IONOS sperrt DNS-Records, solange eine "Verwendungsart" (Webhosting) auf der Subdomain liegt. Der Weg führt nicht über den DNS-Editor, sondern über Verwendungsart zurücksetzen und anschließendes Anlegen des Ziel-Records; der Konflikt-Dialog listet vor dem Speichern auf, was deaktiviert wird, und ist damit die beste Kontrolle vor dem Klick.
- Bei Subdomains mit Mail nie CNAME, immer A-Records auf die vier GitHub-Pages-IPs.
- Das Verify-Gate hat den Komma-Punkt-Unterschied bei Preisen (9,99 gegen 9.99) zwischen deutscher und englischer Seite gefunden. Solche Lokalisierungsfallen gehören in jedes Schema-gleich-sichtbar-Gate.

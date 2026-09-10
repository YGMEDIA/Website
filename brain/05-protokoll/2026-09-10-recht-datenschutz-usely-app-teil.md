# 2026-09-10 · Datenschutzerklärung: Teil „USELY App" ergänzt (recht)

## Was

Die Datenschutzerklärung von yg-media.de beschrieb bis heute ausschließlich die **Website** (Hosting, Server-Logs, Kontaktformular, Calendly, Cookies). Von der App USELY stand dort nichts, obwohl die iOS-App (Profil → Datenschutz und die Paywall) sowie die in App Store Connect hinterlegte Datenschutz-URL genau auf diese Seite zeigen. Damit sahen App-Nutzer und der App-Review eine Erklärung, die keinen einzigen App-Dienstleister nannte.

Ergänzt wurden in **datenschutz.html** und **en/privacy-policy.html**:

- **Abschnitt 1** um den Geltungsbereich: Website **und** App, mit Zuordnung (3 bis 7 = Website, 8 bis 14 = USELY) und dem Satz, dass die App keine Werbe- oder Analyse-Dienste und kein Tracking einsetzt.
- **Abschnitt 2** um „und in der App USELY".
- **Neu 8 bis 14:** Nutzerkonto und App-Daten (Supabase) · Belegversand und Beleg-Postfach (Resend) · Automatische Belegerkennung (Anthropic) · Abo und Zahlungen (Apple, Stripe) · Bankanbindung (finAPI) · Öffentliche Beleg-Links und Beweissicherung · Löschung des Kontos und Aufbewahrungsfristen.
- Bestehende Abschnitte „Deine Rechte" 8 → **15** und „SSL/TLS" 9 → **16**; Stand auf September 2026.

Jeder Abschnitt nennt Datenkategorien, Zweck, Rechtsgrundlage und Ort der Verarbeitung.

## Wie

Ein Skript mit **exakten Treffer-Prüfungen** (jede Ersetzung muss genau einmal passen, sonst Abbruch ohne Schreiben) hat die zehn Änderungen in beiden Dateien gesetzt; die Umlaute im deutschen Block wurden aus transportfester Umschrift zurückgewandelt und anschließend auf Reste geprüft. Gurt gegen Gedankenstriche **nur auf den eingefügten Blöcken**.

**Anbieter-Angaben ausschließlich aus den Rechtsdokumenten der Anbieter**, nicht aus dem Gedächtnis:
- `resend.com/legal/dpa`: Rechtsträger ist **Plus Five Five, Inc.** (nicht „Resend, Inc."), 2261 Market Street #5039, San Francisco; „primary processing operations take place in the United States"; Übermittlung gestützt auf **EU-U.S. Data Privacy Framework und** die EU-Standardvertragsklauseln; Unterauftragsverarbeiter-Liste öffentlich unter `resend.com/legal/subprocessors`.
- `anthropic.com/legal/commercial-terms`: Vertragspartner für Kunden im EWR ist **Anthropic Ireland, Limited** (nicht die US-Gesellschaft); wörtlich „Anthropic may not train models on Customer Content from Services" → im Text als „dürfen nicht zum Training von Modellen verwendet werden".

Die Angaben zum Beleg-Postfach spiegeln die tatsächliche Technik: Empfangs-Domain in `eu-west-1`, nur **Anhänge** werden übernommen (der Mail-Text nicht), verworfene Einträge fallen nach 30 Tagen dem Prune-Trigger zum Opfer, die Adresse ist rotierbar.

## Warum so

- **Diese Seite, nicht die der Web-App:** Die USELY-Web-App hat ihre eigene Erklärung, dort wurde Resend am selben Tag ergänzt (USELY-Repo, Deploy `96590d9a`). Sie wirkt aber nur für Web-Nutzer. Für iOS und Apple zählt allein diese Seite.
- **Nicht nur Resend:** Ein Resend-Absatz in einer Erklärung, die Supabase und die Belegerkennung verschweigt, wäre unvollständig geblieben. Yasin hat auf die vorgelegte Gliederung ausdrücklich „Variante A" gesagt, damit ist der Stopp-Punkt „inhaltliche Änderungen an Rechtstexten" (CLAUDE.md) erfüllt.
- **Zweisprachig in einem Paket** (§B): Die EN-Fassung trägt denselben Aufbau und dieselbe Nummerierung, der Hinweis auf die Verbindlichkeit der deutschen Fassung bleibt unberührt.
- **finAPI und Bezahllink als „derzeit nicht allgemein freigeschaltet"** benannt, statt sie zu verschweigen oder als verfügbar darzustellen: Der Code ist ausgeliefert, die Funktion hängt an einem Server-Schalter.

## Verify

- `python3 scripts/verify.py` **GRÜN, 21 Seiten, 0 Fehler, 0 Warnungen** (DNA-Marker, Em-Dash-Scan, hreflang, Canonicals, noindex-Regeln, interne Links, JSON-LD).
- Abschnittsfolge 1 bis 16 in beiden Sprachen kontrolliert und identisch.
- Eingefügter deutscher Block: 6.712 Zeichen, keine Umschrift-Reste, kein Em- oder En-Dash.
- Live-Gegenprobe nach dem Deploy an beiden URLs.

## Gelernt

1. **Wo eine Rechtsseite verlinkt ist, entscheidet, welche Erklärung gilt.** Vor jeder Ergänzung erst per grep prüfen, wohin App, Paywall und Store-Metadaten zeigen. Hier: alle drei auf yg-media.de/datenschutz, die Web-App auf ihre eigene Seite.
2. **Anbieter-Firmierungen immer aus dem DPA des Anbieters ziehen.** Zwei von zwei geprüften Namen wären aus dem Gedächtnis falsch gewesen (Plus Five Five statt Resend Inc.; Anthropic Ireland statt Anthropic PBC für EWR-Kunden).
3. **Der Em-Dash-Gurt darf nur den neuen Text prüfen** — der Bestand trägt bewusst einen im `<title>`, den `verify.py` ausblendet. Ein Ganzdatei-Gurt schlägt sonst fälschlich an (einmal passiert, vor dem Schreiben abgefangen).
4. Anbieter, für die noch kein Vertrag vorlag, wurden faktisch beschrieben, ohne einen AVV zu behaupten. Nachgezogen im Nachtrag unten.

## Nachtrag (gleicher Tag): Auftragsverarbeitungsverträge bestätigt

Yasin: „Auftragsverarbeitungsverträge sind bestätigt". Damit tragen **Resend, Anthropic und Stripe** denselben AVV-Satz, den Hoster und Supabase schon hatten (DE und EN); bei Stripe zusätzlich die Klarstellung, dass Apple beim Kauf über den App Store Vertragspartner des Kaufs ist und die Zahlungsdaten in eigener Verantwortung verarbeitet.

**finAPI bewusst OHNE AVV-Satz**, mit Gurt im Patch-Skript: die USELY-Doku führt den finAPI-Vertrag unter „Extern geparkt" („finAPI-Vertrag + frische Keys, Trial-Keys exponiert"), es gibt also sehr wahrscheinlich noch keinen unterschriebenen Vertrag. Die Funktion ist ohnehin als „derzeit nicht allgemein freigeschaltet" benannt, es fließen keine Nutzerdaten dorthin. Sobald der Vertrag steht, kommt der Satz nach.

verify.py grün (21 Seiten). Offen bleibt die Frage an Yasin, ob der Schlusssatz „Dies ist eine Vorlage und ersetzt keine individuelle Rechtsberatung. Bitte vor Veröffentlichung durch eine fachkundige Person prüfen lassen und die Platzhalter ergänzen." bleiben soll: die zweite Hälfte ist eine Anweisung an den Betreiber, die versehentlich an die Leser ausgeliefert wird, und die EN-Fassung trägt sie gar nicht.

## Nachtrag 2 (gleicher Tag): Vorlagen-Schlusssatz entfernt

Yasin: „schlusssatz raus". Damit endet die deutsche Erklärung wie die englische mit **„Stand: September 2026."** Der Rest des Satzes („Dies ist eine Vorlage und ersetzt keine individuelle Rechtsberatung. Bitte vor Veröffentlichung durch eine fachkundige Person prüfen lassen und die Platzhalter ergänzen.") ist weg.

Das war die richtige Entscheidung, und zwar aus zwei Gründen: die zweite Hälfte war eine **Anweisung an den Betreiber**, die versehentlich an jeden Leser ausgeliefert wurde („vor Veröffentlichung prüfen lassen" steht auf einer bereits veröffentlichten Seite), und der Satz stand nur in der deutschen Fassung. Eine Erklärung, die sich selbst als unfertige Vorlage bezeichnet, schwächt außerdem genau die Zusage, die sie geben soll.

**Wie:** Skript mit vier Gurten, weil es ein Rechtstext ist: genau ein Vorkommen, exakt die erwartete Zeichenzahl entfernt (170), Präfix und Suffix der Datei byte-gleich, danach kein Vorlagen-Vokabular („Vorlage", „Platzhalter", „Rechtsberatung", „fachkundige") mehr in der Datei. `verify.py` grün, 21 Seiten. Live-Gegenprobe nach dem Deploy.

**Nicht mit entfernt:** Der Aufbau, die Anbieter-Angaben und die Rechtsgrundlagen bleiben unverändert. Die fachkundige Gesamtprüfung der drei Rechtstexte steht weiter in STATUS unter „Braucht Yasin" und ist durch das Entfernen des Satzes weder erledigt noch überflüssig geworden.

## Offen

- **finAPI-AVV**, sobald der Vertrag steht (heute laut USELY-Doku noch geparkt, Trial-Keys) — dann kommt der Satz in beide Sprachfassungen.
- **Retentions-Wert für Resend Receiving** im Anbieter-Dashboard nachsehen; im Text steht bewusst nur, was wir selbst speichern.
- ~~Schlusssatz der deutschen Fassung~~ **entschieden und umgesetzt, s. Nachtrag 2.**
- **App-Datenschutz-Fragebogen** in App Store Connect gegen diese Erklärung lesen (nennt seit heute Anthropic als Empfänger). Über die ASC-API nicht erreichbar; braucht die Oberfläche.

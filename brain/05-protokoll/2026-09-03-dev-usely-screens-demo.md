# 2026-09-03 · dev · USELY: Hero-Logo, 24 Funktionen, Demo-Mandant und echte Simulator-Screens

**Auslöser:** Yasin (Sprachnachricht): Screenshots aus dem Simulator mit einem Testkonto, das wie ein echtes Konto wirkt (Supabase-Zugriff), im Hero das U-Logo statt des Screens, die FAQ-Zeile "Was sonst noch offen ist" weg, Funktionen vollständig (Boards, Zeiten, Zugänge, Benachrichtigungen, Aktivitäten, Kundendaten, Doku).

## Was
1. **Website, Runde 1 (Commit 8bddd34 im usely-site-Repo):** Hero zeigt das Keyvisual (Glas-U) statt des Onboarding-Screens; FAQ-Unterzeile entfernt (DE+EN); Funktionen-Grid von 8 auf 24 Karten, `featureList` im Schema synchron.
2. **Demo-Mandant in Supabase** (USELY-Produktionsprojekt, RLS-isoliert über eigene company_id und Membership): Firma "Weber Elektrotechnik e. K." (Würzburg, Inhaber Michael Weber), 6 Kunden (5 Kunden, 1 Lead), 3 Projekte, 11 Belege (6 bezahlte Rechnungen Februar bis Juli, 1 ausstehend, 1 überfällig, 2 Angebote, 1 Auftragsbestätigung mit Kette zum Angebot), 24 Positionen, 18 Ausgaben Februar bis September, 1 Board "Baustellen September" mit Status/Person/Fällig und 5 Aufgaben, 5 Zeiteinträge. Kennzahlen im Dashboard: Umsatz 22.475,53 €, Kosten 8.964,60 €, offen 5.878,60 € (1 überfällig), 6 bezahlte Rechnungen. IDs: company `11111111-2222-4333-8444-666666666666`, user `11111111-2222-4333-8444-555555555555`. **Zugangsdaten stehen bewusst NICHT im Repo** (öffentlich); Claude Code hat sie Yasin in der Session übergeben.
3. **11 Simulator-Aufnahmen** (iPhone 17 Pro, 1206×2622, Statusleiste 9:41, voller Akku), sechs davon als WebP 1080×2349 auf der Site (`usely-app-*.webp`): Rechnung RE-2026-0012 (Split 1), Angebot AN-2026-0009 mit "Bereits umgewandelt" (Split 2), E-Rechnung-Menü XRechnung/ZUGFeRD (Split 3), Übersicht mit Jahreskurve (Split 4), Board-Liste mit offenen Stunden (neuer Split 5 "Boards und Zeiten"), Kundenakte Sauer Bau GmbH (neuer Split 6 "Kundenakte"). DE und EN im selben Paket, Alt-Texte konkret, width/height gesetzt. Sechs alte Onboarding-WebPs entfernt (nirgends mehr referenziert).

## Wie
- **Login "Database error querying schema":** Die manuell angelegte `auth.users`-Zeile hatte NULL in `confirmation_token`, `recovery_token`, `email_change`, `email_change_token_new`, `email_change_token_current`, `phone_change`, `phone_change_token`, `reauthentication_token`. GoTrue kann NULL nicht in Go-Strings scannen. Fix: alle acht Spalten per COALESCE auf ''.
- **Übersicht zeigte fremde Zahlen** (1.577,81 € Umsatz, 5 bezahlt, 3 überfällig): Das Swift-Modell `Document` verlangt `sender: PartySnapshot` nicht-optional; die gesäten Belege hatten `sender = NULL`. Decoding scheiterte, `DocumentRepository.fetchAll()` fiel auf `LocalCache` zurück, und der enthielt noch Belege eines früheren Kontos auf diesem Simulator. Ausgaben stimmten sofort, weil `ExpenseRepository` sauber dekodierte. Fix: `sender`- und `recipient`-Snapshots im Modellformat (`name`, `address_line`, `postal_code`, `city`, `country`, `vat_id`, `iban`, `bic`, `bank_name`, `tax_number`, `small_business`; Empfänger ohne `customer_number`, weil die Listenzeile sonst umbricht).
- **Rechnungsstatus:** `open` ist ein Angebotsstatus; Rechnungen brauchen `pending` (Dashboard zählt nur pending/overdue/paid). Kette über `converted_from` (AB-2026-0005 → AN-2026-0009).
- **Umlaute:** Erste Saat war ASCII (Wuerzburg, Strasse). Für Screenshots per replace() auf echte Umlaute gezogen (Kunden, Firma, Positionen, Ausgaben, Projekte, Board-Spalten, Aufgaben). Lange Firmennamen gekürzt (Sauer Bau GmbH, Hotel Rosenhof, Praxis Dr. Lang), weil die Kundenliste der App mitten im Wort umbricht.
- **Simulator-Steuerung (MCP-Tool):** Tool-Screenshot ist 919×1998, Punkte = Pixel × 0,4374 auf beiden Achsen (vorher falsch mit 0,4654 auf y gerechnet, Taps trafen nur dank großzügiger Hit-Areas). Zuverlässiger Weg: `xcrun simctl io <udid> screenshot` (1206×2622, Punkte = Pixel/3) plus Read. Tab-Leiste bei y≈820 pt (Start 61, Kunden 129, Belege 197, Projekte 265, Ausgaben 336), blendet beim Scrollen aus (erst hochscrollen). Detail-Ansichten und Sheets haben keinen Tab-Balken (sauberere Screens; Rechnung über Kundenakte öffnen).
- **Eingabe:** SecureField nimmt den Fokus nur an, wenn gerade kein anderes Feld fokussiert ist (erst neutral tippen, dann ins Feld, dann Text). Tab wird vom Tool verworfen, Return wechselt das Feld nicht. Der iOS-Dialog "Passwort sichern?" ignoriert Tool-Taps komplett: App per `simctl terminate` beenden und neu starten, die Supabase-Sitzung bleibt erhalten.
- **Statusleiste:** `xcrun simctl status_bar <udid> override --time 9:41 --batteryLevel 100 --batteryState discharging --wifiBars 3 --cellularBars 4`.
- **Sichtprüfung der Site:** Browser-Pane war versteckt (kein Repaint nach JS), Headless-Chrome mit 100vh-Hero und 9000px-Fenster unbrauchbar, frisches Profil hing. Ersatz: DOM-Check per JS in der Pane (alle sechs Bilder `complete`, naturalWidth 1080, Boxen gerendert) plus verify-Gate.

## Warum so
- **Produktionsdatenbank statt Branch:** Die App zeigt fest auf Produktion; ein Supabase-Branch hätte kein Login geliefert. Der Mandant ist über RLS (memberships) isoliert.
- **Screens aus dem echten Konto statt Onboarding-Bildern:** Yasins Auftrag, und die v1.2-Funktionen (Boards, Zeiten, Kundenakte, E-Rechnung-Menü) gab es in den alten Bildern nicht.
- **Zwei neue Splits statt Galerie:** Boards/Zeiten und Kundenakte sind die Differenzierer; ein Split erklärt, eine Galerie nicht. Sechs Splits bleiben lesbar, weil sie alternieren.
- **Kurze Kundennamen:** Screenshot-Qualität vor Namensrealismus; die App bricht lange Namen in Listen mitten im Wort.

## Verify
- usely-site `python3 scripts/verify.py` GRÜN (2 Seiten, 0 Fehler, 0 Warnungen); DOM-Check 6/6 Bilder geladen, 1080×2349.
- Dashboard-Zahlen im Simulator gleich den SQL-Summen (22.475,53 / 8.964,60 / 5.878,60 / 6 bezahlt); Kundenakte Sauer Bau: offen 3.879,40, Umsatz 10.660,02, 3 Belege; Zeiten-Report September 10:15 h, 799,50 €.
- Git: usely-site auf main gepusht, Deploy über Actions.

## Befund für die USELY-App (nicht hier gefixt)
- Ausgaben-Kachel zeigt bei Jahresfilter "Ausgaben 2.026" (Jahreszahl mit Tausenderpunkt). Für den Screenshot wurde der Filter "Alle" gewählt ("Ausgaben gesamt").

## Aufräumen (falls der Demo-Mandant weg soll)
Reihenfolge wegen Fremdschlüsseln: time_entries, tasks, board_columns, boards, document_items (über documents), documents, expenses, projects, customers, memberships, profiles, companies mit company_id bzw. id `11111111-2222-4333-8444-666666666666`; danach auth.identities und auth.users mit user_id bzw. id `11111111-2222-4333-8444-555555555555`.

## Gelernt (Rückfluss)
- Demo-Daten gegen das **Client-Modell** bauen, nicht gegen das DB-Schema: nicht-optionale Felder im Swift-Decoder sind die Wahrheit, die DB erlaubt NULL. Fallback-Caches kaschieren den Fehler und zeigen fremde Daten.
- Manuelle `auth.users`-Inserts brauchen '' statt NULL in allen Token-Spalten.
- Für App-Screenshots: Statusleiste überschreiben, Sheets statt Tab-Ansichten, Namen kurz genug für die Listenzeilen, erst alle Screens erkunden und dann in einem Durchlauf final aufnehmen.
- Kein Zugangsdatum ins Brain, solange das Repo öffentlich ist.

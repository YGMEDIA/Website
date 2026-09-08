# 2026-09-08 · content · USELY-Links der Hauptseite auf die Subdomain

**Auslöser:** Yasin: Auf www.yg-media.de verlinkt USELY auf die interne Unterseite /usely statt auf usely.yg-media.de.

## Was
24 Links auf 20 Seiten umgestellt: Footer-Produktlink "USELY" auf allen DE-Seiten → https://usely.yg-media.de/, auf allen EN-Seiten → https://usely.yg-media.de/en/; dazu "Mehr erfahren" auf der USELY-Produktkarte der Startseite und der geparkten Apps-Seite (DE+EN). Unverändert: der Sprachwechsler innerhalb von /usely und /en/usely (zeigt aufs jeweilige Pendant), Canonicals und hreflang der beiden Unterseiten.

## Verify
verify.py GRÜN (21 Seiten). Live-Stichprobe nach dem Deploy: Footer und Produktkarte der Startseite zeigen auf die Subdomain.

## Folge (Yasin-Gate)
/usely und /en/usely sind damit von der Hauptseite nicht mehr verlinkt (Orphans), stehen aber weiter in der Sitemap und doppeln inhaltlich die Subdomain (§C1). Empfehlung: beide Unterseiten zu Weiterleitungs-Stubs machen (Canonical auf die Subdomain, meta refresh 0 s, noindex, raus aus der Sitemap), damit die "usely"-Impressionen aus der GSC auf die Subdomain wandern. Seiten-Umbau dieser Art = Löschen ganzer Seiten = Yasin-Gate, deshalb nur vorgeschlagen.

# 2026-09-03 · dev · USELY: Lighthouse-Feinschliff (Fonts selbst gehostet, Bilder, Accessibility)

**Auslöser:** Yasin: "behalten, weiter mit lighthouse" (Demo-Mandant bleibt, nächster Schritt aus STATUS).

## Messung (Lighthouse 12 lokal per `npx lighthouse@12` gegen die Live-URL; PageSpeed-API ohne Schlüssel antwortet sofort mit 429)
| Lauf | vorher | nachher |
|---|---|---|
| Mobil DE Performance / A11y / BP / SEO | 85 / 90 / 100 / 100 | **98 / 100 / 100 / 100** |
| Mobil DE FCP / LCP / SI | 3,1 s / 3,3 s / 4,4 s | 1,2 s / 1,9 s / 3,6 s |
| Desktop DE | 98 / 95 / 100 / 100 | 99 / 100 / 100 / 100 |
| Mobil EN | 86 / 90 / 100 / 100 | 97 / 100 / 100 / 100 |
| Requests / Bytes (Mobil DE) | 9 / 234 KB | 8 / 175 KB |
LCP-Element ist die H1; CLS 0, TBT 0 ms in allen Läufen.

## Was
1. **Schriften selbst gehostet.** Google lieferte Inter und Playfair Display ohnehin als Variable Fonts (eine Datei je Familie, Google-Fonts-CSS blockierte das Rendern 1,9 s). Jetzt zwei Dateien unter `assets/fonts/` (inter-latin.woff2 48 KB, playfair-italic-latin.woff2 39 KB, Latin-Subset reicht für DE und EN inkl. Umlaute und Euro), `@font-face` mit `font-weight: 300 900` bzw. `500 700`, `font-display: swap`, Unicode-Range wie bei Google, beide per `<link rel="preload" as="font" crossorigin>`. Preconnect und Google-Stylesheet entfernt. Inter Italic 900 war angefordert, aber nirgends genutzt.
2. **Bilder.** Hero-Keyvisual 760 px (22 KB statt 61 KB) mit `fetchpriority="high"`; Nav- und Footer-Logo 96 px (2 KB statt 31 KB, Favicon bleibt 512); App-Store-Badge als **verlustfreies** WebP (15 KB statt 36 KB, pixelgleich, §A5) mit width/height und `width: auto`; die sechs App-Screens auf 720 px (je 41 bis 59 KB statt 69 bis 98 KB), width/height angepasst.
3. **Accessibility.** Burger ist ein `<button>` mit `aria-expanded` und `aria-controls` (vorher `<div aria-label>`, verbotenes Attribut), CSS-Reset background/border, JS pflegt aria-expanded; Logo-Bilder neben dem Wortmarken-Text dekorativ (`alt=""`); Footer-Link zu YG MEDIA im Fließtext unterstrichen (Link nur über Farbe war nicht erkennbar).

## Wie
- Fakten vor dem Fix: Google-Fonts-CSS mit Chrome-UA geladen und ausgelesen, welche woff2-Dateien tatsächlich hinter den 61 @font-face-Blöcken stecken (pro Familie eine Variable-Datei je Subset). Genutzte Gewichte und Italic-Stellen per grep im CSS gezählt.
- Alle Änderungen als Python-Replacements mit Treffer-Zwang (P-12) auf DE und EN gleichzeitig.
- DOM-Check im lokalen Server vor dem Push: `document.fonts` beide Familien `loaded`, keine Anfrage an fonts.googleapis, Badge 134×46, Burger `BUTTON`, Hero 760er-Datei. Dann Push, 30 s bis Deploy, Nachmessung.

## Warum so
- Self-Hosting statt async-Trick für Google Fonts: schneller (kein dritter Host, kein CSS-Roundtrip) und nimmt das bekannte DSGVO-Risiko dynamischer Google-Fonts-Einbindung vom Tisch. Typografie bleibt identisch (gleiche Dateien wie von Google).
- Badge verlustfrei: §A5 verbietet jede Veränderung des Badges; lossless WebP ist bytegenau dasselbe Bild in kleinerer Datei.

## Offen / bewusst nicht gemacht
- Cache-TTL (max-age 600) setzt GitHub Pages, nicht steuerbar.
- "uses-responsive-images" mahnt noch 23 KB an (Badge 494 px bei 134 px Anzeige, Keyvisual 760 bei 261 px mobil). Ein srcset brächte wenig; Badge bleibt Original.
- Speed Index mobil 3,6 s kommt aus Canvas- und Orb-Animation (Design-DNA), nicht aus Ladezeit.
- "forced-reflow-insight" ohne messbaren Effekt (TBT 0 ms).

## Gelernt (Rückfluss)
- Pattern P-14 (Web-Vitals-Checkliste) angelegt. Die Hauptseite yg-media.de lädt Google Fonts vermutlich genauso renderblockierend: gleiche Runde dort einplanen (21 Seiten, autonom).
- PageSpeed-Insights-API ohne API-Key ist praktisch nicht nutzbar (429 ab der ersten Anfrage); lokal `npx lighthouse@12 <url> --chrome-flags="--headless=new"` liefert in unter einer Minute pro Lauf verwertbare Zahlen.

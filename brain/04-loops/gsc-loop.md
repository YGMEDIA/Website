# GSC-LOOP (wöchentlich)

**Zweck:** Search-Console-Daten in Maßnahmen übersetzen (Leitprinzip 1, §C1). Der eine Steuerungs-Loop der Site.
**Input (Yasin, wöchentlich):** Leistung letzte 7 Tage (Klicks, Impressionen, CTR, Position, Top-Queries, Top-Seiten) + Indexierungsstand. Ablage nach P-8: Kernzahlen als `03-research/raw/gsc/JJJJ-MM-TT.md`.
**Ablauf pro Lauf:**
1. LOOP-STATE lesen.
2. Rohdaten-Notiz anlegen (raw, datiert).
3. Interpretation in STATUS ("Marktdaten"): Was rankt, was hat Impressionen ohne Klicks (CTR-Kandidat), welche Queries ohne passende Seite (Content-Chance), Brand vs. Nicht-Brand.
4. Maßnahmen als Items ableiten: CTR-Rettung (Title/Description neu, Prosa unangetastet, Sitemap-lastmod), Content-Chance (neue Seite nur per Spec), interne Links.
5. Autonome Items direkt umsetzen (verify grün, Push), Rest in LOOP-STATE/Braucht Yasin.
**Fertig-Kriterium:** raw-Notiz existiert, STATUS aktualisiert, jedes abgeleitete Item hat einen Ort (umgesetzt / LOOP-STATE / Braucht Yasin).
**Läufe:** noch keiner (Baseline: 12 Klicks / 344 Impr. in 3 Monaten, fast nur Brand — Stand Juli 2026).

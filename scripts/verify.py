#!/usr/bin/env python3
# verify.py — Maschinen-Gate fuer www.yg-media.de (YG Constitution Teil E, Pattern P-7)
# stdlib-only. Exit 0 = gruen, Exit 1 = rot. Vor JEDEM Commit gruen erforderlich.
# Prueft: DNA-Marker, Em-Dashes, hreflang-Trios, Canonicals, Sitemap beidseitig,
# interne Links, JSON-LD-Validitaet, lang-Attribute, noindex-Regeln, Invarianten.

import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://yg-media.de"  # kanonische Domain ist non-www (Canonicals/hreflang/og:url der Live-Site); CNAME-Host bleibt www

# Seiten-Inventar (Constitution §B/§C/§D). Neue Seiten hier eintragen.
INDEXABLE_PAIRS = [
    ("index.html", "en/index.html"),
    ("website.html", "en/website.html"),
    ("apps.html", "en/apps.html"),
    ("marketing.html", "en/marketing.html"),
    ("automation.html", "en/automation.html"),
    ("website-kosten.html", "en/website-costs.html"),
    ("usely.html", "en/usely.html"),
]
LEGAL_PAGES = [
    "impressum.html", "en/legal-notice.html",
    "datenschutz.html", "en/privacy-policy.html",
    "nutzungsbedingungen.html", "en/terms-of-use.html",
]
INTERNAL_PAGES = ["buecher-cw.html", "more-produkt-berater.html"]
# Kunden-Preview-Seiten: eigenstaendige Kundendesigns, kein YG-Copy — Pruefumfang nur noindex + lang (§A1-Scope, §C2)
PREVIEW_PAGES = [
    "index_ac.html", "index_ak.html", "index_aw.html", "index_bw.html",
    "index_ep.html", "index_gk.html", "index_gl.html", "index_jl.html",
    "index_ku.html", "index_kw.html", "index_ul.html",
]

ALL_PAGES = [p for pair in INDEXABLE_PAIRS for p in pair] + LEGAL_PAGES + INTERNAL_PAGES

errors = []
warnings = []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as f:
        return f.read()


def visible_text_for_emdash(html):
    """Entfernt title, script, style und HTML-Kommentare — der Rest gilt als sichtbarer Text (§A2)."""
    html = re.sub(r"<title>.*?</title>", "", html, flags=re.S | re.I)
    html = re.sub(r"<meta\b[^>]*>", "", html, flags=re.I)  # Meta-Tags (og:title etc.) tragen die Title-Konvention
    html = re.sub(r"<script\b.*?</script>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style\b.*?</style>", "", html, flags=re.S | re.I)
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    return html


def url_to_file(href):
    """Interner Pfad -> Repo-Datei (GitHub-Pages-Aufloesung)."""
    href = href.split("#")[0].split("?")[0]
    if not href:
        return None
    p = href.lstrip("/")
    if p == "":
        return "index.html"
    if p.endswith("/"):
        cand = p + "index.html"
        return cand if os.path.exists(os.path.join(ROOT, cand)) else p.rstrip("/") + ".html"
    if os.path.exists(os.path.join(ROOT, p)):
        return p
    if os.path.exists(os.path.join(ROOT, p + ".html")):
        return p + ".html"
    if os.path.exists(os.path.join(ROOT, p, "index.html")):
        return p + "/index.html"
    return p  # existiert nicht -> Fehler beim Aufrufer


def check_invariants():
    for f in ["CNAME", "robots.txt", "sitemap.xml"]:
        if not os.path.exists(os.path.join(ROOT, f)):
            err(f"Invariante: {f} fehlt im Repo")
    if os.path.exists(os.path.join(ROOT, "CNAME")):
        cname = read("CNAME").strip()
        if cname != "www.yg-media.de":
            err(f"CNAME ist '{cname}', erwartet www.yg-media.de")
    if os.path.exists(os.path.join(ROOT, "ratgeber")):
        err("Zombie-Verzeichnis /ratgeber/ existiert (SPC-Lektion, hier vorsorglich)")


def check_page(path):
    if not os.path.exists(os.path.join(ROOT, path)):
        err(f"{path}: Datei fehlt")
        return
    html = read(path)
    is_en = path.startswith("en/")
    is_legal = path in LEGAL_PAGES
    is_internal = path in INTERNAL_PAGES
    is_indexable = not is_legal and not is_internal
    full_dna = not is_internal  # interne noindex-Tools tragen bewusst keine Site-DNA/GA (§A1-Scope)

    # lang-Attribut (§B2)
    m = re.search(r"<html[^>]*\blang=\"([a-zA-Z-]+)\"", html)
    if not m:
        err(f"{path}: kein lang-Attribut")
    else:
        want = "en" if is_en else "de"
        if m.group(1).lower().split("-")[0] != want:
            err(f"{path}: lang='{m.group(1)}', erwartet {want}")

    # DNA-Marker (§A1) — nur öffentliche Seiten
    if full_dna and "<nav" not in html:
        err(f"{path}: Navbar fehlt")
    if full_dna and "<footer" not in html:
        err(f"{path}: Footer fehlt")
    if full_dna and "<canvas" not in html:
        err(f"{path}: Canvas-Hintergrund fehlt")
    if full_dna and "nav-lang" not in html:
        err(f"{path}: Nav-Sprachwechsler (.nav-lang) fehlt")
    if full_dna and "lang-switch" not in html:
        err(f"{path}: Footer-Sprachwechsler (.lang-switch) fehlt")

    # Cookie/GA-Regeln (§D2/§D3)
    has_ga = "G-MHQJ0HLBM3" in html
    has_banner = "cookie" in html.lower() and ("banner" in html.lower() or "consent" in html.lower())
    if is_legal:
        if has_ga:
            err(f"{path}: Rechtsseite laedt GA (verboten, §D2)")
    elif is_internal:
        pass  # interne Tools: kein GA-Zwang (§A1-Scope)
    else:
        if not has_ga:
            err(f"{path}: GA4-Snippet fehlt (consent-gated erwartet)")
        if "yg_cookie_consent" not in html:
            err(f"{path}: Consent-Gate (yg_cookie_consent) fehlt")
        if not has_banner:
            warn(f"{path}: Cookie-Banner-Marker nicht gefunden")

    # Em-Dash (§A2)
    vis = visible_text_for_emdash(html)
    for i, line in enumerate(vis.splitlines(), 1):
        if "\u2014" in line:
            snippet = line.strip()[:90]
            err(f"{path}: Em-Dash im sichtbaren Text (Zeile ~{i}): {snippet}")

    # Title-Konvention
    t = re.search(r"<title>(.*?)</title>", html, flags=re.S)
    if not t:
        err(f"{path}: kein <title>")

    # Canonical (§B3)
    canon = re.findall(r"<link[^>]*rel=\"canonical\"[^>]*href=\"([^\"]+)\"", html)
    if is_indexable:
        if len(canon) != 1:
            err(f"{path}: {len(canon)} Canonicals, erwartet genau 1")
    # noindex (§C2/§D2)
    has_noindex = bool(re.search(r"<meta[^>]*noindex", html))
    if (is_legal or is_internal) and not has_noindex:
        err(f"{path}: noindex fehlt (Rechts-/interne Seite)")
    if is_indexable and has_noindex:
        err(f"{path}: indexierbare Seite traegt noindex")

    # JSON-LD valide (§C3)
    for block in re.findall(r"<script type=\"application/ld\+json\">(.*?)</script>", html, flags=re.S):
        try:
            json.loads(block)
        except Exception as e:
            err(f"{path}: ungueltiges JSON-LD ({e})")

    # Interne Links (§C4)
    for href in re.findall(r"href=\"(/[^\"]*)\"", html):
        f = url_to_file(href)
        if f and not os.path.exists(os.path.join(ROOT, f)):
            err(f"{path}: toter interner Link {href}")
    # Interne Asset-Referenzen
    for src in re.findall(r"src=\"(/[^\"]+)\"", html):
        f = src.lstrip("/").split("?")[0]
        if f and not os.path.exists(os.path.join(ROOT, f)):
            err(f"{path}: totes Asset {src}")


def check_preview(path):
    if not os.path.exists(os.path.join(ROOT, path)):
        err(f"{path}: Datei fehlt (Kunden-Preview im Inventar)")
        return
    html = read(path)
    m = re.search(r"<html[^>]*\blang=\"([a-zA-Z-]+)\"", html)
    if not m or m.group(1).lower().split("-")[0] != "de":
        err(f"{path}: lang fehlt oder nicht de (Kunden-Preview)")
    if not re.search(r"<meta[^>]*noindex", html):
        err(f"{path}: noindex fehlt (Kunden-Preview, §C2)")


def check_hreflang():
    for de, en in INDEXABLE_PAIRS:
        for path in (de, en):
            html = read(path)
            trio = re.findall(r"<link[^>]*rel=\"alternate\"[^>]*hreflang=\"([^\"]+)\"", html)
            langs = set(x.lower() for x in trio)
            if not {"de", "en", "x-default"}.issubset(langs):
                err(f"{path}: hreflang-Trio unvollstaendig (gefunden: {sorted(langs)})")


def check_sitemap():
    try:
        tree = ET.parse(os.path.join(ROOT, "sitemap.xml"))
    except Exception as e:
        err(f"sitemap.xml: kein valides XML ({e})")
        return
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [u.text.strip() for u in tree.findall(".//sm:loc", ns)]
    if len(urls) != len(set(urls)):
        err("sitemap.xml: doppelte URLs")
    # Jede Sitemap-URL muss auf eine existierende, indexierbare Datei zeigen
    indexable_files = set(p for pair in INDEXABLE_PAIRS for p in pair)
    mapped = set()
    for u in urls:
        if not u.startswith(SITE):
            err(f"sitemap.xml: fremde Domain {u}")
            continue
        f = url_to_file(u[len(SITE):] or "/")
        if not f or not os.path.exists(os.path.join(ROOT, f)):
            err(f"sitemap.xml: URL ohne Datei {u}")
            continue
        mapped.add(f)
        if f in LEGAL_PAGES:
            err(f"sitemap.xml: Rechtsseite enthalten {u} (verboten, §C2)")
        if f in INTERNAL_PAGES:
            err(f"sitemap.xml: interne Seite enthalten {u} (verboten, §C2)")
        if f in PREVIEW_PAGES:
            err(f"sitemap.xml: Kunden-Preview enthalten {u} (verboten, §C2)")
    # Rueckrichtung: jede indexierbare Seite steht in der Sitemap
    missing = indexable_files - mapped
    for f in sorted(missing):
        err(f"sitemap.xml: indexierbare Seite fehlt ({f})")


def main():
    check_invariants()
    for p in ALL_PAGES:
        check_page(p)
    for p in PREVIEW_PAGES:
        check_preview(p)
    check_hreflang()
    check_sitemap()

    for w in warnings:
        print(f"WARN  {w}")
    if errors:
        for e in errors:
            print(f"FAIL  {e}")
        print(f"\nverify.py ROT — {len(errors)} Fehler, {len(warnings)} Warnungen. NICHT committen.")
        sys.exit(1)
    print(f"verify.py GRUEN — {len(ALL_PAGES)} Seiten + {len(PREVIEW_PAGES)} Kunden-Previews geprueft, 0 Fehler, {len(warnings)} Warnungen.")
    sys.exit(0)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# verify.py — Maschinen-Gate fuer www.yg-media.de (YG Constitution Teil E, Pattern P-7)
# stdlib-only. Exit 0 = gruen, Exit 1 = rot. Vor JEDEM Commit gruen erforderlich.
# Prueft: DNA-Marker, Nav-/Footer-Invariante, Em-Dashes, hreflang-Trios, Canonicals, Sitemap beidseitig,
# interne Links, JSON-LD-Validitaet, lang-Attribute, noindex-Regeln, Invarianten, kein Link zu X/Twitter,
# Weiterleitungs-Stubs (Ziel, Canonical, nicht in der Sitemap).

import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://yg-media.de"  # kanonische Domain ist non-www (Canonicals/hreflang/og:url der Live-Site); CNAME-Host bleibt www

# Seiten-Inventar (Constitution §B/§C/§D). Neue Seiten hier eintragen.
# Seit 2026-09-19 (Minimal-Auftritt): nur die Startseite ist indexierbar.
# Startseiten: seit 2026-09-20 Bühne ohne Navbar (Yasin), Sprachwechsler nur im Footer
HOME_PAGES = ("index.html", "en/index.html")
INDEXABLE_PAIRS = [
    ("index.html", "en/index.html"),
]
# Die 10 geparkten Service-Seiten (website, apps, marketing, automation, website-kosten je DE+EN) hat Yasin am
# 2026-09-19 zum Loeschen freigegeben; sie sind geloescht. Liste bleibt fuer kuenftige Parkfaelle.
PARKED_PAGES = []
# Weiterleitungs-Stubs (seit 2026-09-19): keine Inhaltsseiten, daher ohne DNA/GA/Cookie-Banner (§A1-Scope).
# Pflicht: lang, meta refresh 0 aufs Ziel, Canonical genau aufs Ziel, nicht in der Sitemap.
REDIRECT_PAGES = {
    "usely.html": "https://usely.yg-media.de/",
    "en/usely.html": "https://usely.yg-media.de/en/",
}
LEGAL_PAGES = [
    "impressum.html", "en/legal-notice.html",
    "datenschutz.html", "en/privacy-policy.html",
    "nutzungsbedingungen.html", "en/terms-of-use.html",
]
# Eigenstaendige noindex-Seiten ohne Site-DNA (Yasins Standalone-Uploads). buecher-cw, more-produkt-berater und
# yg-media-vision hat Yasin am 2026-09-02 selbst geloescht (Web-Commits).
# Yasin hat felgen-brillant.html am 2026-09-21 per Web-Commit geloescht; Liste bleibt fuer kuenftige Standalone-Uploads.
INTERNAL_PAGES = []
# Kunden-Preview-Seiten: eigenstaendige Kundendesigns, kein YG-Copy — Pruefumfang nur noindex + lang (§A1-Scope, §C2).
# Automatisch per Muster index_*.html erfasst (Yasin laedt Previews per Web-Upload hoch).
PREVIEW_PAGES = sorted(
    f for f in os.listdir(ROOT) if re.fullmatch(r"index_[a-z]{2}\.html", f)
)

ALL_PAGES = [p for pair in INDEXABLE_PAIRS for p in pair] + PARKED_PAGES + LEGAL_PAGES + INTERNAL_PAGES

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
    is_parked = path in PARKED_PAGES
    is_indexable = not is_legal and not is_internal and not is_parked
    full_dna = not is_internal  # interne noindex-Tools tragen bewusst keine Site-DNA/GA (§A1-Scope)

    # lang-Attribut (§B2)
    m = re.search(r"<html[^>]*\blang=\"([a-zA-Z-]+)\"", html)
    if not m:
        err(f"{path}: kein lang-Attribut")
    else:
        want = "en" if is_en else "de"
        if m.group(1).lower().split("-")[0] != want:
            err(f"{path}: lang='{m.group(1)}', erwartet {want}")

    # DNA-Marker (§A1) — nur öffentliche Seiten.
    # Die Startseite ist seit 2026-09-20 eine Bühne ohne Navbar (Yasin): Logo mittig, darunter die
    # Karten, Sprachwechsler nur noch im Footer. Alle anderen Seiten tragen weiter die volle Nav.
    is_home = path in HOME_PAGES
    if full_dna and "<footer" not in html:
        err(f"{path}: Footer fehlt")
    if full_dna and 'class="flow"' not in html:
        err(f"{path}: Flow-Hintergrund (.flow) fehlt (§A1 seit 2026-09-20)")
    if full_dna and is_home and "<nav" in html:
        err(f"{path}: Startseite trägt wieder eine Navbar (§A1 seit 2026-09-20: Bühne ohne Nav)")
    if full_dna and is_home and 'class="stage-logo"' not in html:
        err(f"{path}: Bühnen-Logo (.stage-logo) fehlt (§A1 seit 2026-09-20)")
    if full_dna and not is_home:
        if "<nav" not in html:
            err(f"{path}: Navbar fehlt")
        if "nav-lang" not in html:
            err(f"{path}: Nav-Sprachwechsler (.nav-lang) fehlt")
        if 'class="nav-logo"' not in html:
            err(f"{path}: Nav-Logo (.nav-logo) fehlt (§A1, seit 2026-09-19 wieder Pflicht)")
    if full_dna and "lang-switch" not in html:
        err(f"{path}: Footer-Sprachwechsler (.lang-switch) fehlt")

    # Nav-/Footer-Invariante seit 2026-09-02 (§A1 v2): keine Service-Links, kein Calendly-CTA in Nav/Footer
    if full_dna:
        nav_block = re.search(r"<nav.*?</nav>", html, flags=re.S)
        foot_block = re.search(r"<footer.*?</footer>", html, flags=re.S)
        for name, block in (("Nav", nav_block), ("Footer", foot_block)):
            if not block:
                continue
            b = block.group(0)
            # Sprachwechsler-Links (nav-lang-item / lang-btn) zeigen legitim aufs Pendant (§A1) und werden ausgenommen
            b = re.sub(r"<a[^>]*class=\"(?:nav-lang-item|lang-btn)\"[^>]*>", "", b)
            if "calendly.com" in b:
                err(f"{path}: {name} enthaelt Calendly-CTA (seit 2026-09-02 verboten, §A1)")
            for old in ("/website\"", "/apps\"", "/marketing\"", "/automation\"", "/en/website\"", "/en/apps\"", "/en/marketing\"", "/en/automation\""):
                if 'href="' + old.rstrip('"') + '"' in b:
                    err(f"{path}: {name} verlinkt geparkte Service-Seite {old.rstrip(chr(34))} (§A1)")

    # Keine Verlinkung zu X/Twitter (Yasin, 2026-09-19): gilt fuer jede gepruefte Seite
    if re.search(r"//(?:www\.)?(?:x|twitter)\.com\b", html):
        err(f"{path}: Link zu X/Twitter (seit 2026-09-19 verboten, §A1)")

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
    if (is_legal or is_internal or is_parked) and not has_noindex:
        err(f"{path}: noindex fehlt (Rechts-/interne/geparkte Seite)")
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


def check_redirect(path, target):
    if not os.path.exists(os.path.join(ROOT, path)):
        err(f"{path}: Datei fehlt (Weiterleitungs-Stub im Inventar)")
        return
    html = read(path)
    want = "en" if path.startswith("en/") else "de"
    m = re.search(r"<html[^>]*\blang=\"([a-zA-Z-]+)\"", html)
    if not m or m.group(1).lower().split("-")[0] != want:
        err(f"{path}: lang fehlt oder nicht {want} (Weiterleitungs-Stub)")
    refresh = re.search(r"<meta[^>]*http-equiv=\"refresh\"[^>]*content=\"0;\s*url=([^\"]+)\"", html, flags=re.I)
    if not refresh or refresh.group(1) != target:
        err(f"{path}: meta refresh 0 auf {target} fehlt (Weiterleitungs-Stub)")
    canon = re.findall(r"<link[^>]*rel=\"canonical\"[^>]*href=\"([^\"]+)\"", html)
    if canon != [target]:
        err(f"{path}: Canonical muss genau {target} sein (gefunden: {canon})")
    if re.search(r"//(?:www\.)?(?:x|twitter)\.com\b", html):
        err(f"{path}: Link zu X/Twitter (seit 2026-09-19 verboten, §A1)")
    for i, line in enumerate(visible_text_for_emdash(html).splitlines(), 1):
        if "\u2014" in line:
            err(f"{path}: Em-Dash im sichtbaren Text (Zeile ~{i})")


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
        if f in PARKED_PAGES:
            err(f"sitemap.xml: geparkte Service-Seite enthalten {u} (verboten, §C2)")
        if f in REDIRECT_PAGES:
            err(f"sitemap.xml: Weiterleitungs-Stub enthalten {u} (verboten, §C2)")
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
    for p, target in REDIRECT_PAGES.items():
        check_redirect(p, target)
    check_hreflang()
    check_sitemap()

    for w in warnings:
        print(f"WARN  {w}")
    if errors:
        for e in errors:
            print(f"FAIL  {e}")
        print(f"\nverify.py ROT — {len(errors)} Fehler, {len(warnings)} Warnungen. NICHT committen.")
        sys.exit(1)
    print(f"verify.py GRUEN — {len(ALL_PAGES)} Seiten + {len(REDIRECT_PAGES)} Weiterleitungen + {len(PREVIEW_PAGES)} Kunden-Previews geprueft, 0 Fehler, {len(warnings)} Warnungen.")
    sys.exit(0)


if __name__ == "__main__":
    main()

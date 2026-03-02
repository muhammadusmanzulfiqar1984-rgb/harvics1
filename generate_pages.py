import json, os, sys, re

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(ROOT, "megaData.json")
OUT_DIR = os.path.join(ROOT, "subpages")
KEY_TITLES = {
    "navTextiles": "Textiles & Apparels",
    "navFmcg": "FMCG",
    "navCommodities": "Commodities",
    "navIndustrial": "Industrial Solutions",
    "navMinerals": "Minerals",
    "navOilGas": "Oil & Gas",
    "navRealEstate": "Real Estate",
    "navSourcing": "Sourcing Solutions",
    "navFinance": "Finance & HPay",
    "navAI": "AI & Technology"
}
KEY_PAGE = {
    "navTextiles": "textiles.html",
    "navFmcg": "fmcg.html",
    "navCommodities": "commodities.html",
    "navIndustrial": "industrial.html",
    "navSourcing": "sourcing.html",
    "navFinance": "index.html#finance",
    "navAI": "index.html#ai",
    "navMinerals": "index.html#minerals",
    "navOilGas": "index.html#oil-gas",
    "navRealEstate": "index.html#real-estate"
}

def slug_variants(label: str):
    base = label.strip().lower()
    # variant A: keep possessive as hyphen `-s`
    a = re.sub(r"'s", "-s", base)
    a = re.sub(r"[^\w\s-]", "", a)
    a = re.sub(r"\s+", "-", a)
    # variant B: drop apostrophes entirely
    b = re.sub(r"'", "", base)
    b = re.sub(r"[^\w\s-]", "", b)
    b = re.sub(r"\s+", "-", b)
    return list(dict.fromkeys([a, b]))  # unique order-preserving

def slug_primary(label: str):
    return slug_variants(label)[0]

def ensure_dir(p):
    os.makedirs(p, exist_ok=True)

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} • Harvics</title>
  <link rel="stylesheet" href="/root.css">
  <link rel="stylesheet" href="root.css">
  <link rel="stylesheet" href="../root.css">
  <link rel="stylesheet" href="../../root.css">
  <link rel="stylesheet" href="../../../root.css">
  <link rel="stylesheet" href="../../../../root.css">
</head>
<body>
  <div id="site-shell"></div>
  <main id="page-content">
    <nav style="max-width:1200px;margin:24px auto 0;padding:0 16px;font-size:13px;color:var(--text-2)">
      <a href="/index.html" style="color:var(--burgundy)">Home</a>
      <span style="opacity:.6"> / </span>
      <a href="/{industry_href}" style="color:var(--burgundy)">{industry_title}</a>
      <span style="opacity:.6"> / </span>
      <span>{section}</span>
      <span style="opacity:.6"> / </span>
      <strong style="color:var(--burgundy)">{item}</strong>
    </nav>
    <section class="catalog-hero tint">
      <div style="max-width:1200px;margin:0 auto;padding:48px 24px;">
        <h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em;">{item} — {section}</h1>
        <p id="catalog-desc" style="max-width:720px;color:var(--text);opacity:0.85"></p>
        <div style="margin-top:16px;display:flex;gap:12px">
          <a href="/contact.html" style="padding:10px 14px;border:1px solid var(--gold);color:var(--burgundy);text-decoration:none">Request Quote</a>
          <a href="/{industry_href}" style="padding:10px 14px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">Back to {industry_title}</a>
        </div>
      </div>
    </section>
  </main>
  <script>
  (function(){{
    var paths = ["/script.js","../script.js","../../script.js","../../../script.js","./script.js"];
    var i = 0;
    function load(){{
      if (i >= paths.length) return;
      var s = document.createElement("script");
      s.src = paths[i++];
      s.onload = function(){{
        if (typeof window.injectPageDescription === "function") {{
          window.injectPageDescription({{ key: "{key}", section: "{section}", item: "{item}" }});
        }}
      }};
      s.onerror = load;
      document.body.appendChild(s);
    }}
    load();
  }})();
  </script>
</body>
</html>
"""

def related_li(href, label):
    return f"<li style=\"border:1px solid var(--divider);background:#fff;box-shadow:var(--card-shadow);padding:12px\"><a href=\"{href}\" style=\"color:var(--burgundy);text-decoration:none\">{label}</a></li>"

TEMPLATE_L5_EMPTY = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} • Harvics</title>
  <link rel="stylesheet" href="/root.css">
  <link rel="stylesheet" href="root.css">
  <link rel="stylesheet" href="../root.css">
  <link rel="stylesheet" href="../../root.css">
  <link rel="stylesheet" href="../../../root.css">
  <link rel="stylesheet" href="../../../../root.css">
</head>
<body>
  <div id="site-shell"></div>
  <main id="page-content">
    <nav style="max-width:1200px;margin:24px auto 0;padding:0 16px;font-size:13px;color:var(--text-2)">
      <a href="/index.html" style="color:var(--burgundy)">Home</a>
      <span style="opacity:.6"> / </span>
      <a href="/{industry_href}" style="color:var(--burgundy)">{industry_title}</a>
      <span style="opacity:.6"> / </span>
      <span>{section}</span>
      <span style="opacity:.6"> / </span>
      <span>{item}</span>
      <span style="opacity:.6"> / </span>
      <strong style="color:var(--burgundy)">{l4} — {l5}</strong>
    </nav>
    <section class="catalog-hero tint">
      <div style="max-width:1200px;margin:0 auto;padding:48px 24px;">
        <h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em;">{l4} — {l5}</h1>
        <p style="max-width:720px;color:var(--text);opacity:0.85"></p>
        <div style="margin-top:16px;display:flex;gap:12px">
          <a href="/{industry_href}" style="padding:10px 14px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">Back to {industry_title}</a>
        </div>
      </div>
    </section>
  </main>
  <script>
  (function(){{
    var paths = ["/script.js","../script.js","../../script.js","../../../script.js","./script.js"];
    var i = 0;
    function load(){{
      if (i >= paths.length) return;
      var s = document.createElement("script");
      s.src = paths[i++];
      s.onerror = load;
      document.body.appendChild(s);
    }}
    load();
  }})();
  </script>
</body>
</html>
"""

def l5_extras_for(key, section, item):
    ks = (key or "").lower()
    sec = (section or "").lower()
    it = (item or "").lower()
    if ks == "navTextiles".lower() and "apparel" in sec and "men" in it:
        return ["shirts", "slim fit"]
    return None

def main():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    ensure_dir(OUT_DIR)
    total = 0
    for key, blocks in data.items():
        key_dir = os.path.join(OUT_DIR, key)
        ensure_dir(key_dir)
        for block in blocks:
            section = block.get("t") or "Section"
            items = block.get("items") or []
            section_dir = os.path.join(key_dir, slug_primary(section))
            ensure_dir(section_dir)
            # Create one page per item
            for item in items:
                industry_title = KEY_TITLES.get(key, key)
                industry_href = KEY_PAGE.get(key, "index.html")
                # description moved to dynamic injection; keep generator minimal
                desc = ""
                # related
                siblings = [x for x in items if x != item]
                related_links = []
                for sib in siblings:
                    for variant in slug_variants(sib)[:1]:
                        href = f"/subpages/{key}/{slug_primary(section)}/{variant}.html"
                        related_links.append(related_li(href, sib))
                html = TEMPLATE.format(
                    title=f"{industry_title} — {section} — {item}",
                    key=key,
                    industry_title=industry_title,
                    industry_href=industry_href,
                    section=section,
                    item=item,
                    desc=desc,
                    related_links="\n".join(related_links) or related_li(f"/{industry_href}", industry_title)
                )
                for variant in slug_variants(item):
                    file_path = os.path.join(section_dir, variant + ".html")
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(html)
                    total += 1
                # L5 empty pages (optional rule-based)
                extras = l5_extras_for(key, section, item)
                if extras and len(extras) == 2:
                    l4, l5 = extras
                    l5_dir = os.path.join(section_dir, slug_primary(item), slug_primary(l4))
                    ensure_dir(l5_dir)
                    l5_file = os.path.join(l5_dir, slug_primary(l5) + ".html")
                    l5_html = TEMPLATE_L5_EMPTY.format(
                        title=f"{industry_title} — {section} — {item} — {l4} — {l5}",
                        industry_title=industry_title,
                        industry_href=industry_href,
                        section=section,
                        item=item,
                        l4=l4,
                        l5=l5
                    )
                    with open(l5_file, "w", encoding="utf-8") as f:
                        f.write(l5_html)
                    total += 1
    print(f"Generated {total} pages under {OUT_DIR}")

if __name__ == "__main__":
    sys.exit(main())

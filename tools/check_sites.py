#!/usr/bin/env python3
"""
Site checker for Kiril Web Design demo sites.

Opens every site in a phone-sized headless browser and checks:
  - page opens with no JavaScript errors
  - config.js loaded and the business name is shown
  - no "undefined" / "null" / "NaN" / "[object" text on the page
  - Call buttons: correct tel: link if a phone is set, otherwise a toast (no fake number)
  - nothing sticks out past the screen edge on a phone
  - "Get a Quote" button and the quote form exist
  - yellow demo bar shows when demo: true
  - no broken images
Then writes an HTML report with a small phone screenshot of each site.

Usage (from the repo root):
  python3 tools/check_sites.py                 # all sites -> report.html
  python3 tools/check_sites.py 33 34           # only sites whose folder starts with 33 / 34
  python3 tools/check_sites.py --out /tmp/r.html
Needs: python playwright + Google Chrome (or playwright's chromium) and Pillow.
"""
import argparse, base64, html, io, os, re, sys, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BAD_TEXT = re.compile(r"\b(undefined|NaN)\b|\[object |\bnull\b")
IGNORE_CONSOLE = ("Failed to load resource", "net::ERR", "ERR_NAME_NOT_RESOLVED", "ERR_INTERNET_DISCONNECTED")


def find_sites(filters):
    sites = []
    for d in sorted((ROOT / "clients").iterdir()):
        if (d / "index.html").exists() and (not filters or any(d.name.startswith(f) for f in filters)):
            sites.append(d)
    sc = ROOT / "showcase"
    if (sc / "index.html").exists() and (not filters or "showcase" in filters):
        sites.append(sc)
    return sites


def chrome_path():
    for p in ("/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"):
        if os.path.exists(p):
            return p
    return None


def check_site(browser, d):
    problems, notes = [], []
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2,
                              is_mobile=True, has_touch=True, reduced_motion="reduce")
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: m.type == "error" and not any(s in m.text for s in IGNORE_CONSOLE) and errors.append(m.text))
    try:
        page.goto((d / "index.html").as_uri(), wait_until="load", timeout=20000)
    except Exception as e:
        ctx.close()
        return {"ok": False, "problems": [f"Page did not open: {e}"], "notes": [], "shot": ""}
    page.wait_for_timeout(900)

    info = page.evaluate("""() => {
      const S = window.SITE || null, B = (S && S.business) || {};
      const txt = document.body ? document.body.innerText : "";
      const vis = el => el && !el.classList.contains('hide') && getComputedStyle(el).display !== 'none' && el.offsetParent !== null;
      const calls = [...document.querySelectorAll('.callbtn')].filter(vis).map(a => a.getAttribute('href'));
      const imgs = [...document.images].filter(i => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
      const demoBar = document.getElementById('demoBar');
      return {
        hasSite: !!S, demo: !!(S && S.demo), name: B.name || "", phone: B.phone || "",
        logo: (document.getElementById('logo') || {}).innerText || "",
        text: txt,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        calls,
        quoteBtn: !!document.querySelector('a[href="#quote"]'),
        form: !!document.getElementById('qForm'),
        demoBar: vis(demoBar),
        brokenImgs: imgs,
        title: document.title
      };
    }""")

    if errors:
        problems.append("JavaScript errors: " + "; ".join(sorted(set(errors)))[:300])
    if not info["hasSite"]:
        problems.append("config.js did not load (window.SITE missing)")
    else:
        name = info["name"].strip()
        if not name:
            problems.append("Business name is empty in config.js")
        elif name.lower()[:20] not in (info["logo"] + " " + info["text"]).lower():
            problems.append(f"Business name '{name}' is not shown on the page")
        m = BAD_TEXT.search(info["text"])
        if m:
            i = m.start()
            problems.append("Broken text on page: …" + info["text"][max(0, i - 30):i + 30].replace("\n", " ") + "…")
        digits = re.sub(r"[^\d+]", "", info["phone"])
        if digits:
            wrong = [h for h in info["calls"] if h != "tel:" + digits]
            if not info["calls"]:
                problems.append("Phone is set but no Call button is visible")
            elif wrong:
                problems.append(f"Call button has wrong link {wrong[0]} (expected tel:{digits})")
            else:
                notes.append(f"Call → {digits}")
        else:
            tels = [h for h in info["calls"] if h and h.startswith("tel:")]
            if tels:
                problems.append(f"No phone in config but Call button links to {tels[0]}")
            elif info["calls"]:
                try:
                    page.locator(".callbtn").first.click(timeout=3000)
                    page.wait_for_timeout(300)
                    t = page.evaluate("() => (document.getElementById('toast')||{}).innerText || ''")
                    notes.append("No phone yet → shows: “" + t.strip() + "”" if t.strip() else "No phone yet")
                    if not t.strip():
                        problems.append("No phone: Call button does nothing (no message)")
                except Exception:
                    notes.append("No phone yet")
        if info["demo"] and not info["demoBar"]:
            problems.append("demo: true but the yellow demo bar is not visible")
        if not info["demo"]:
            notes.append("LIVE (demo bar off)")
    if info["overflow"] > 1:
        problems.append(f"Page is {info['overflow']}px wider than a phone screen (sideways scroll)")
    if d.name != "showcase" and not (info["quoteBtn"] and info["form"]):
        problems.append("Get a Quote button or quote form is missing")
    if info["brokenImgs"]:
        problems.append("Broken images: " + ", ".join(info["brokenImgs"][:3]))

    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(150)
    png = page.screenshot(type="png")
    ctx.close()
    try:
        from PIL import Image
        im = Image.open(io.BytesIO(png)).convert("RGB")
        im = im.resize((200, int(im.height * 200 / im.width)))
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=70)
        shot = base64.b64encode(buf.getvalue()).decode()
    except Exception:
        shot = base64.b64encode(png).decode()
    return {"ok": not problems, "problems": problems, "notes": notes, "shot": shot, "name": info.get("name") or d.name}


def write_report(results, out):
    bad = [r for r in results if not r["ok"]]
    rows = []
    for r in sorted(results, key=lambda r: r["ok"]):
        st = "ok" if r["ok"] else "bad"
        items = "".join(f"<li class=p>{html.escape(p)}</li>" for p in r["problems"]) + "".join(f"<li>{html.escape(n)}</li>" for n in r["notes"])
        rows.append(f"""<div class="row {st}"><img src="data:image/jpeg;base64,{r['shot']}" alt=""><div>
<b>{'✅' if r['ok'] else '❌'} {html.escape(r['folder'])}</b><small>{html.escape(r['name'])}</small><ul>{items}</ul></div></div>""")
    page = f"""<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Проверка сайтов</title><style>
:root{{color-scheme:light dark;--bg:light-dark(#f3f5fa,#0d1220);--card:light-dark(#fff,#161d30);--ink:light-dark(#141a2b,#e8ecf6);--mut:light-dark(#5b6478,#9aa4bb);--bad:light-dark(#c0262d,#ff7b80);--ok:light-dark(#18804a,#5fd394)}}
:root[data-theme=light]{{color-scheme:light}}:root[data-theme=dark]{{color-scheme:dark}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,sans-serif}}
main{{max-width:900px;margin:0 auto;padding:24px 16px}}h1{{font-size:28px;margin:0 0 4px}}
.sum{{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0 24px}}.sum div{{background:var(--card);border-radius:14px;padding:14px 18px;min-width:130px}}
.sum b{{display:block;font-size:30px}}.sum .b b{{color:var(--bad)}}.sum .g b{{color:var(--ok)}}
.row{{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;background:var(--card);border-radius:14px;padding:12px;margin-bottom:10px;border-left:5px solid var(--ok)}}
.row.bad{{border-left-color:var(--bad)}}.row img{{width:110px;height:200px;object-fit:cover;object-position:top;border-radius:10px}}
.row b{{display:block}}.row small{{color:var(--mut)}}ul{{margin:6px 0 0;padding-left:18px;color:var(--mut);font-size:14px}}li.p{{color:var(--bad);font-weight:600}}
p.m{{color:var(--mut);margin:0}}</style></head><body><main>
<h1>Проверка сайтов</h1><p class=m>{time.strftime('%d.%m.%Y %H:%M')} · телефон 390px · сначала сайты с проблемами</p>
<div class=sum><div><b>{len(results)}</b>сайтов</div><div class=g><b>{len(results)-len(bad)}</b>в порядке</div><div class=b><b>{len(bad)}</b>с проблемами</div></div>
{''.join(rows)}</main></body></html>"""
    Path(out).write_text(page, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("only", nargs="*", help="folder prefixes to check, e.g. 33 34 showcase")
    ap.add_argument("--out", default=str(ROOT / "report.html"))
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    sites = find_sites(a.only)
    if not sites:
        sys.exit("No sites found")
    results = []
    with sync_playwright() as p:
        cp = chrome_path()
        browser = p.chromium.launch(executable_path=cp, args=["--no-sandbox"]) if cp else p.chromium.launch(args=["--no-sandbox"])
        for d in sites:
            r = check_site(browser, d)
            r["folder"] = d.name
            r.setdefault("name", d.name)
            results.append(r)
            print(("OK   " if r["ok"] else "FAIL ") + d.name + ("" if r["ok"] else "  -> " + " | ".join(r["problems"])))
        browser.close()
    write_report(results, a.out)
    bad = sum(not r["ok"] for r in results)
    print(f"\n{len(results)} sites, {len(results)-bad} OK, {bad} with problems. Report: {a.out}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()

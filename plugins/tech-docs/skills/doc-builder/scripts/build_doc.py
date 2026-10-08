#!/usr/bin/env python3
"""
doc-builder - turn a Markdown file into a polished, house-styled HTML document
(and optionally a PDF via headless Chrome).

The point of difference: a sanitizer pass that strips AI-tell typography and emoji
so the output reads like a human typed it on a keyboard. Professional / technical
English terms are left untouched - only punctuation glyphs and pictographs change.

Usage:
  python3 build_doc.py INPUT.md [options]

Options:
  --out PATH          output .html path (default: INPUT.html next to source)
  --title TEXT        document title (default: first H1 in the file)
  --subtitle TEXT     subtitle line under the title
  --eyebrow TEXT      small uppercase kicker above the title (default: "Document")
  --meta TEXT         meta line under subtitle (e.g. "Prepared for X  |  2026-06-28")
  --footer TEXT       footer line (left side)
  --accent HEX        accent color, e.g. #0F766E (default) / #2563EB / #B91C1C
  --confidential      red INTERNAL ribbon + darker masthead
  --wide-figures      let figures bleed past the text column to the paper margin
                      in print - larger diagrams, less white space under them
  --fig-max-h MM      cap on printed figure height, e.g. 160mm (with --wide-figures).
                      Tune it when a diagram just misses the foot of its page
  --var NAME=VALUE    set a CSS custom property on the document (repeatable), so a
                      per-document rule can be re-tuned per build without editing it
  --pdf               also render a PDF next to the HTML (headless Chrome)
"""

import argparse, html, os, re, shutil, subprocess, sys, tempfile, time, pathlib

SKILL_DIR = pathlib.Path(__file__).resolve().parent.parent
CSS_PATH = SKILL_DIR / "references" / "styles.css"

MAC_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def find_chrome():
    """CHROME env var first, then common binaries on PATH, then the macOS app path."""
    env = os.environ.get("CHROME")
    if env:
        return env
    for name in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        found = shutil.which(name)
        if found:
            return found
    return MAC_CHROME if os.path.exists(MAC_CHROME) else None


CHROME = find_chrome()

# --- glyph map: AI/Unicode punctuation -> what a person types on a keyboard ----
GLYPHS = {
    "→": "->",
    "←": "<-",
    "↔": "<->",
    "⇒": "=>",
    "⇐": "<=",
    "—": "-",  # em dash -> single hyphen
    "–": "-",  # en dash
    "‒": "-",
    "‑": "-",
    "−": "-",  # figure/non-breaking/minus
    "•": "-",
    "·": "-",
    "⁃": "-",
    "▪": "-",
    "●": "-",
    "◦": "-",
    "…": "...",
    "“": '"',
    "”": '"',
    "„": '"',
    "‟": '"',
    "«": '"',
    "»": '"',
    "‘": "'",
    "’": "'",
    "‚": "'",
    "‛": "'",
    "′": "'",
    "″": '"',
    "×": "x",
    "∕": "/",
    "⁄": "/",
    "≥": ">=",
    "≤": "<=",
    "≈": "~",
    "≠": "!=",
    "±": "+/-",
    " ": " ",
    " ": " ",
    " ": " ",
    " ": " ",
    " ": " ",
    " ": " ",
    " ": " ",
    "​": "",
    "‍": "",
    "﻿": "",
    # box drawing / block glyphs (used in ascii timelines) -> plain ascii
    "█": "#",
    "▓": "#",
    "▒": "=",
    "░": ".",
    "─": "-",
    "│": "|",
    "┄": "-",
    "┈": "-",
    "┌": "+",
    "┐": "+",
    "└": "+",
    "┘": "+",
    "├": "+",
    "┤": "+",
    "┬": "+",
    "┴": "+",
    "┼": "+",
    "▸": ">",
    "▶": ">",
    "◀": "<",
    "‣": ">",
}

EMOJI_RE = re.compile(
    "[\U0001f000-\U0001faff\U00002600-\U000026ff\U00002700-\U000027bf"
    "\U0001f1e6-\U0001f1ff\U0000fe00-\U0000fe0f\U0000200d]",
)
# Note: arrows (2190-21FF), geometric shapes (25xx) and misc-technical (23xx) are
# deliberately NOT in this range - those glyphs are handled by GLYPHS (mapped to ascii)
# and we must not silently delete an unmapped arrow. Harmless symbols (c)(r) deg are kept.


def map_glyphs(s: str) -> str:
    for k, v in GLYPHS.items():
        s = s.replace(k, v)
    return s


def clean_emoji(s: str) -> str:
    s = EMOJI_RE.sub("", s)
    s = s.replace("™", "(tm)")  # leave (c)(r) as-is, they read fine
    return s


def sanitize_markdown(md: str) -> str:
    """Sanitize prose, preserving alignment inside fenced ``` code blocks."""
    out, in_code = [], False
    for line in md.split("\n"):
        if line.lstrip().startswith("```"):
            in_code = not in_code
            out.append(map_glyphs(clean_emoji(line)))
            continue
        if in_code:
            # code: fix glyphs + emoji but keep spacing for alignment.
            # map_glyphs first so arrows/dashes convert before emoji stripping.
            out.append(clean_emoji(map_glyphs(line)))
        else:
            t = clean_emoji(map_glyphs(line))
            t = re.sub(r"[ \t]{2,}", " ", t)  # collapse runs of spaces
            t = re.sub(r" +([,.;:!?])", r"\1", t)  # no space before punctuation
            t = t.rstrip()
            out.append(t)
    return "\n".join(out)


def extract_title(md: str):
    """Return (title, body_without_that_h1)."""
    lines = md.split("\n")
    for i, ln in enumerate(lines):
        if ln.startswith("# "):
            title = ln[2:].strip()
            del lines[i]
            return title, "\n".join(lines)
    return None, md


def accent_soft(hex_color: str) -> str:
    """A light tint of the accent (mix ~10% accent with white) for soft fills."""
    h = hex_color.lstrip("#")
    if len(h) != 6:
        return "#E4F3F1"
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    mix = lambda c: round(c * 0.10 + 255 * 0.90)
    return "#{:02X}{:02X}{:02X}".format(mix(r), mix(g), mix(b))


def md_to_html_fragment(md: str) -> str:
    try:
        # implicit_figures: a lone image in a paragraph becomes <figure> + caption
        p = subprocess.run(
            ["pandoc", "-f", "gfm+implicit_figures", "-t", "html5", "--wrap=none"],
            input=md,
            capture_output=True,
            text=True,
            check=True,
        )
        return p.stdout
    except FileNotFoundError:
        sys.exit("error: pandoc not found - install it (brew install pandoc)")
    except subprocess.CalledProcessError as e:
        sys.exit(f"pandoc failed: {e.stderr}")


def build_html(
    fragment,
    title,
    subtitle,
    eyebrow,
    meta,
    footer,
    accent,
    confidential,
    brand,
    ribbon_text,
    stat,
    stat_label,
    stat_note,
    fig_max_h=None,
    css_vars=None,
    logo=None,
):
    css = CSS_PATH.read_text(encoding="utf-8")
    soft = accent_soft(accent)
    esc = lambda x: html.escape(x) if x else ""
    ribbon = (
        f'<div class="ribbon">{esc(ribbon_text)}</div>' if (confidential or ribbon_text) else ""
    )
    # --logo: a small mark inline with the brand line (path relative to the output file, or a
    # data: URI). Kept out of the escaped brand text so the rest of the masthead is unchanged.
    logo_el = f'<img class="brand-logo" src="{esc(logo)}" alt="">' if logo else ""
    brand_el = (
        f'<div class="brand">{logo_el}<span>{esc(brand)}</span></div>' if (brand or logo) else ""
    )
    sub = f'<p class="doc-subtitle">{esc(subtitle)}</p>' if subtitle else ""
    met = f'<p class="doc-meta">{esc(meta)}</p>' if meta else ""
    stat_el = ""
    if stat:
        stat_el = (
            f'<div class="stat"><div class="stat-label">{esc(stat_label)}</div>'
            f'<div class="stat-value">{esc(stat)}</div>'
            + (f'<div class="stat-note">{esc(stat_note)}</div>' if stat_note else "")
            + "</div>"
        )
    foot = f"<span>{esc(footer)}</span>" if footer else "<span></span>"
    cls = "doc confidential" if confidential else "doc"
    fig_var = f" --fig-max-h: {fig_max_h};" if fig_max_h else ""
    for kv in css_vars or []:
        name, _, value = kv.partition("=")
        fig_var += f" --{name.lstrip('-')}: {value};"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<div class="{cls}" style="--accent: {accent}; --accent-soft: {soft};{fig_var}">
  <header class="masthead">
    {ribbon}
    {brand_el}
    <div class="eyebrow">{esc(eyebrow)}</div>
    <h1 class="doc-title">{esc(title)}</h1>
    {sub}
    <hr class="rule">
    {met}
    {stat_el}
  </header>
  <main class="doc-body">
{fragment}
  </main>
  <footer class="doc-foot">{foot}<span>{esc(title)}</span></footer>
</div>
</body>
</html>
"""


def to_pdf(html_path: pathlib.Path) -> pathlib.Path:
    pdf_path = html_path.with_suffix(".pdf")
    if not CHROME or not os.path.exists(CHROME):
        sys.exit(
            "error: Chrome not found. Set the CHROME env var to a Chrome/Chromium "
            "binary, or put google-chrome / chromium on PATH. Or skip --pdf."
        )
    # Offline-safe: strip the remote Google Fonts <link> so headless Chrome never
    # blocks on the network. The system font stack in the CSS renders cleanly; the
    # screen HTML keeps Inter for browser viewing.
    page = html_path.read_text(encoding="utf-8")
    page = re.sub(r"\s*<link[^>]*fonts\.g(?:oogleapis|static)\.com[^>]*>", "", page)
    page = re.sub(r'\s*<link[^>]*rel="preconnect"[^>]*>', "", page)
    # Chrome writes the PDF quickly but its process tree often does not exit cleanly
    # (background updater holds the pipe), so poll for the output file then kill it
    # rather than waiting on a clean exit.
    if pdf_path.exists():
        pdf_path.unlink()
    # Write the print HTML next to the source so relative image paths
    # (e.g. assets/diagram.png) still resolve under file://.
    tmp_html = html_path.with_name(".print_" + html_path.name)
    tmp_html.write_text(page, encoding="utf-8")
    with tempfile.TemporaryDirectory() as ud:
        proc = subprocess.Popen(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                "--no-first-run",
                "--disable-component-update",
                f"--user-data-dir={ud}",
                "--no-pdf-header-footer",
                f"--print-to-pdf={pdf_path}",
                f"file://{tmp_html}",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        try:
            deadline, last = time.monotonic() + 60, -1
            while time.monotonic() < deadline:
                if proc.poll() is not None:
                    break
                if pdf_path.exists():
                    sz = pdf_path.stat().st_size
                    if sz > 0 and sz == last:  # size stable across two polls
                        break
                    last = sz
                time.sleep(0.4)
        finally:
            proc.terminate()
            try:
                proc.wait(timeout=3)
            except subprocess.TimeoutExpired:
                proc.kill()
    try:
        tmp_html.unlink()
    except OSError:
        pass
    if not pdf_path.exists() or pdf_path.stat().st_size == 0:
        sys.exit("error: Chrome did not produce a PDF")
    return pdf_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--out")
    ap.add_argument("--title")
    ap.add_argument("--subtitle")
    ap.add_argument("--eyebrow", default="Document")
    ap.add_argument("--meta")
    ap.add_argument("--footer")
    ap.add_argument("--accent", default="#0F766E")
    ap.add_argument("--brand")
    ap.add_argument(
        "--logo", help="image shown inline with --brand (path relative to the output, or data: URI)"
    )
    ap.add_argument("--ribbon")
    ap.add_argument("--stat")
    ap.add_argument("--stat-label", default="Total")
    ap.add_argument("--stat-note")
    ap.add_argument("--confidential", action="store_true")
    ap.add_argument("--wide-figures", action="store_true")
    ap.add_argument("--fig-max-h")
    ap.add_argument("--var", action="append", dest="css_vars", metavar="NAME=VALUE")
    ap.add_argument("--pdf", action="store_true")
    a = ap.parse_args()

    src = pathlib.Path(a.input).resolve()
    md = src.read_text(encoding="utf-8")
    md = sanitize_markdown(md)
    auto_title, body = extract_title(md)
    title = a.title or auto_title or src.stem

    fragment = md_to_html_fragment(body)
    if a.wide_figures:
        fragment = fragment.replace("<figure>", '<figure class="bleed">')
    page = build_html(
        fragment,
        title,
        a.subtitle,
        a.eyebrow,
        a.meta,
        a.footer,
        a.accent,
        a.confidential,
        a.brand,
        a.ribbon,
        a.stat,
        a.stat_label,
        a.stat_note,
        a.fig_max_h,
        a.css_vars,
        a.logo,
    )

    out = pathlib.Path(a.out).resolve() if a.out else src.with_suffix(".html")
    out.write_text(page, encoding="utf-8")
    print(f"HTML  -> {out}")
    if a.pdf:
        pdf = to_pdf(out)
        print(f"PDF   -> {pdf}")


if __name__ == "__main__":
    main()

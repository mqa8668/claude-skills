#!/usr/bin/env python3
"""Scan the tree for terms that must not be published.

Terms come from the CLAUDE_SKILLS_PRIVATE_TERMS env var or a gitignored .private-terms
file (one regular expression per line, case-insensitive). If neither exists the private
part is skipped with a notice. Built-in patterns always run.
"""

import ipaddress
import os
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP_DIRS = {".git", "__pycache__", ".ruff_cache", "node_modules"}
SKIP_FILES = {".private-terms"}
BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".pdf", ".ico", ".woff", ".woff2"}

BUILTIN = [
    ("home path", re.compile(r"/Us" r"ers/|/home/[a-z]")),
    ("figma file url", re.compile(r"figma\.com/(file|design|slides)/")),
    ("email", re.compile(r"[\w.+-]+@(?!example\.)[\w-]+\.[\w.-]+")),
]
IPV4 = re.compile(r"(?<![\d.])(\d{1,3}(?:\.\d{1,3}){3})(?![\d.])")
DOC_NETS = [ipaddress.ip_network(n) for n in ("192.0.2.0/24", "198.51.100.0/24", "203.0.113.0/24")]


def public_ip(text):
    try:
        ip = ipaddress.ip_address(text)
    except ValueError:
        return False
    if ip.is_private or ip.is_loopback or ip.is_unspecified or ip.is_link_local:
        return False
    if ip.is_multicast or ip.is_reserved:
        return False
    if ip in ipaddress.ip_network("100.64.0.0/10"):
        return False
    return not any(ip in n for n in DOC_NETS)


def private_patterns():
    raw = os.environ.get("CLAUDE_SKILLS_PRIVATE_TERMS", "")
    f = ROOT / ".private-terms"
    if not raw and f.exists():
        raw = f.read_text(encoding="utf-8")
    pats = [ln.strip() for ln in raw.splitlines() if ln.strip() and not ln.startswith("#")]
    return [re.compile(p, re.I) for p in pats]


def files():
    for p in ROOT.rglob("*"):
        if p.is_dir() or p.name in SKIP_FILES or p.suffix.lower() in BINARY_EXT:
            continue
        if SKIP_DIRS & set(p.relative_to(ROOT).parts):
            continue
        yield p


def main():
    private = private_patterns()
    if not private:
        print("notice: no private terms (CLAUDE_SKILLS_PRIVATE_TERMS or .private-terms); skipped")
    hits = 0
    for path in files():
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except (UnicodeDecodeError, OSError):
            continue
        rel = path.relative_to(ROOT)
        for n, line in enumerate(lines, 1):
            found = [name for name, rx in BUILTIN if rx.search(line)]
            found += [f"ip {m}" for m in IPV4.findall(line) if public_ip(m)]
            found += ["private term" for rx in private if rx.search(line)]
            for what in found:
                hits += 1
                print(f"{rel}:{n}: {what}")
    if hits:
        print(f"{hits} hit(s)")
        return 1
    print("terms ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

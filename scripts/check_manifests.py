#!/usr/bin/env python3
"""Validate marketplace.json, each plugin.json, and every SKILL.md in the repo."""

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
errors = []


def err(msg):
    errors.append(msg)


def load(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        err(f"{path.relative_to(ROOT)}: {exc}")
        return None


def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        return None
    out, key = {}, None
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z_-]+):\s*(.*)$", line)
        if km:
            key = km.group(1)
            out[key] = km.group(2).strip()
        elif key:
            out[key] += " " + line.strip()
    return out


def check_skill(skill_md):
    rel = skill_md.relative_to(ROOT)
    text = skill_md.read_text(encoding="utf-8")
    fm = frontmatter(text)
    if fm is None:
        err(f"{rel}: missing frontmatter")
        return
    if fm.get("name") != skill_md.parent.name:
        err(f"{rel}: name {fm.get('name')!r} != directory {skill_md.parent.name!r}")
    desc = fm.get("description", "").strip()
    if desc in ("", ">", "|"):
        err(f"{rel}: empty description")
    elif len(desc) >= 1024:
        err(f"{rel}: description is {len(desc)} chars, limit is 1023")
    for ref in set(re.findall(r"`((?:references|scripts)/[A-Za-z0-9_./-]+)`", text)):
        if "*" in ref or ref.endswith("/"):
            continue
        if not (skill_md.parent / ref).exists():
            err(f"{rel}: referenced file missing: {ref}")


def main():
    market = load(ROOT / ".claude-plugin" / "marketplace.json")
    if market:
        for p in market.get("plugins", []):
            src = ROOT / p.get("source", "")
            if not src.is_dir():
                err(f"marketplace: source missing for {p.get('name')}: {p.get('source')}")
    plugin_dirs = sorted((ROOT / "plugins").iterdir())
    for pdir in plugin_dirs:
        manifest = load(pdir / ".claude-plugin" / "plugin.json")
        if manifest and manifest.get("name") != pdir.name:
            err(f"{pdir.name}: plugin.json name {manifest.get('name')!r} differs from directory")
        skills = sorted(pdir.glob("skills/*/SKILL.md"))
        if not skills:
            err(f"{pdir.name}: no skills found")
        for s in skills:
            check_skill(s)
    if errors:
        print("\n".join(errors))
        return 1
    print("manifests ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())

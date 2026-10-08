# Contributing

Small fixes and new examples are welcome. Open an issue first for anything larger.

## Ground rules

- Examples must be fictional. Use `Acme`, `example.com`, `example.internal` and RFC 5737
  addresses such as `203.0.113.10`. Do not add real client, employer, host or person names.
- Write plain prose. No emoji, no em dashes in English text, no marketing tone.
- Each skill lives in `plugins/<plugin>/skills/<name>/` and needs a `SKILL.md` whose
  frontmatter `name` equals the directory name and whose `description` is under 1024
  characters. Every `references/...` or `scripts/...` path mentioned in a `SKILL.md`
  must exist.
- Keep skills self-contained. Cross-skill references use a path relative to the skill
  directory (for example `../doc-builder/scripts/build_doc.py`) or the skill name.

## Checks to run before a pull request

```bash
python3 scripts/check_manifests.py
ruff check . && ruff format --check .
shellcheck scripts/*.sh
python3 -m unittest discover -s tests      # needs pandoc
python3 scripts/check_terms.py             # reads .private-terms if you have one
```

`.private-terms` is gitignored. It holds one regular expression per line for words that
must never appear in the repo. CI reads the same list from the
`CLAUDE_SKILLS_PRIVATE_TERMS` secret and skips the check when it is not set.

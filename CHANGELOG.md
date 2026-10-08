# Changelog

## 0.1.0

First public release.

- Plugin marketplace `claude-skills` with three plugins:
  - `tech-docs`: `doc-builder`, `architecture-doc`
  - `figma-diagrams`: `figma-topology`, `figma-presentation`
  - `viet-writing`: `viet-lach`, `viet-ky-thuat`
- `doc-builder`: Chrome path for `--pdf` is read from the `CHROME` env var, then PATH,
  then the default macOS location.
- `scripts/install.sh` for a plain copy install.
- CI: manifest checks, lint, sanitizer tests, sensitive-term scan, gitleaks.

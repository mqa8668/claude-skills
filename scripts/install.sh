#!/usr/bin/env bash
# Copy every skill under plugins/*/skills/ into ~/.claude/skills (or the directory in $1).
# Refuses to overwrite an existing skill directory unless --force is given.
set -euo pipefail

force=0
dest=""
for arg in "$@"; do
  case "$arg" in
    --force) force=1 ;;
    *) dest="$arg" ;;
  esac
done
dest="${dest:-$HOME/.claude/skills}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

mkdir -p "$dest"
count=0
for skill in "$root"/plugins/*/skills/*/; do
  name="$(basename "$skill")"
  target="$dest/$name"
  if [ -e "$target" ]; then
    if [ "$force" -eq 1 ]; then
      rm -rf "$target"
    else
      echo "skip $name (exists; use --force to replace)"
      continue
    fi
  fi
  cp -R "$skill" "$target"
  echo "installed $name"
  count=$((count + 1))
done
echo "done: $count skill(s) installed to $dest"

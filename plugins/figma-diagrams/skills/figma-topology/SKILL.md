---
name: figma-topology
description: Draw professional infrastructure topology and DevOps architecture diagrams directly in Figma - Proxmox/K8s clusters, cloud architecture, network/security/data-flow maps. Use whenever the user wants to create, draw, or update a topology diagram, infrastructure map, system architecture, deployment/HA diagram, or DevOps flow in Figma (or shares a Figma URL of one). Produces clean, presentation-grade diagrams: white cards with colored icon tiles, category eyebrows, cluster containers, and labeled connectors.
---

# Figma Topology & Architecture Diagrams

Build polished, consultant-grade infrastructure/DevOps diagrams in Figma using the
Plugin API (`use_figma`). This skill encodes a fixed visual language so every diagram
looks like the same professional system - the "Slate" topology style.

## Golden rules

1. **Load `figma-use` FIRST.** Before any `use_figma` call you MUST invoke the
   `figma:figma-use` skill - it teaches the Plugin API contract (how code is executed,
   async loading of fonts, node creation, return values). This skill (`figma-topology`)
   teaches *what to draw*; `figma-use` teaches *how to call the API*. Load both.
2. **Always load fonts before setting text.** `await figma.loadFontAsync({family:"Inter",style:"Bold"})` and `"Regular"`. Inter is the only typeface.
3. **Use the design tokens verbatim** - see `references/design-tokens.md`. Never invent
   colors, radii, or font sizes. Consistency is the whole point.
4. **Build with the helper functions** in `references/helpers.js` - paste them once at
   the top of your `use_figma` script, then compose the diagram by calling them. Do not
   hand-roll card geometry each time.
5. **One frame per topology.** Each diagram is a single top-level `FRAME` on the page,
   sized ~1480 wide. Place multiple topologies side by side with ~100px gap.
6. **Cards are absolutely positioned on a grid; connectors are computed from card
   coordinates.** Keep a JS object of node rects so connectors snap to edges.

## Anatomy of a diagram

```
FRAME  "Topology N - <Title>"  (1480 × auto, bg #FFFFFF, radius 20, border #E5EBEB)
 ├─ H1 title      (Inter Bold 24, #1C2B33)           top-left, x50 y42
 ├─ Subtitle      (Inter Regular 13, #5F6F73)        x50 y78
 ├─ Cluster container(s)  - bordered panel + pill tab  (see helpers.clusterContainer)
 │    └─ Node cards  (helpers.card)                  laid out in a grid inside
 ├─ Standalone node cards (users, DB, HSM, backup…)
 ├─ Connectors    (helpers.connector)  with label pills
 └─ Footer summary bars / legend  (helpers.summaryBar)
```

### The node card (the core unit)
White rounded card, soft shadow, with:
- **Icon tile** - 44×44, radius 10, fill = category color, white SVG glyph (25px) centered.
- **Eyebrow** - UPPERCASE category, Inter Bold 9.5, tracking 0.6, color = category color.
- **Title** - Inter Bold 13.5, `#1C2B33`.
- **Meta lines** - 0-2 lines, Inter Regular 11, `#5F6F73`.

Standard sizes: compact `178×104`, standard `268×118`, wide list-row `390×58`
(icon-left, title + one meta inline - used for the per-node VM lists in cluster columns).

### Category → color (icon tile + eyebrow)
| Category    | Color     | Used for |
|-------------|-----------|----------|
| NETWORKING  | `#7C5CE0` | LB, ingress, HAProxy, firewall, VIP |
| COMPUTE     | `#EA7A1F` | services, workers, app pods |
| SECURITY    | `#E0483F` | HSM, zero-trust, WAF |
| DATABASE    | `#3B7DDD` | DB cluster, Patroni, SQL |
| STORAGE     | `#2FB36A` | Ceph, backup, object store |
| BLOCKCHAIN  | `#D9488F` | validators, chain nodes |
| OBSERVABILITY| `#0E9AC4` | Grafana/Loki, SIEM/Wazuh, metrics & logs |
| USERS/ACCESS| `#1C2B33` | end users, DevOps/NOC, internet edge, external/gov agency |

### Cluster container
A large rounded panel grouping related cards, with a small pill "tab" overlapping its
top-left border carrying the cluster name.
- **Solid style** (managed infra, e.g. Proxmox): bg `#F8FAFA`, 1px solid `#E1E8E8`,
  radius 16, slate tab `#1C2B33`.
- **Dashed style** (logical/orchestrated, e.g. Kubernetes): 2px dashed `#EA7A1F`,
  bg `rgba(249,115,22,0.03)`, orange tab `#EA7A1F`.

### Connector
Thin gray line (`#98A9AC`, 2px) from one card edge to another, ending in a filled
triangle arrowhead, with an optional **label pill** at its midpoint (white bg, 1px
border, radius 6, Inter 11 `#5F6F73`) - e.g. `HTTPS`, `L7`, `SQL`, `RPC`, `PKCS#11`,
`Backup · WAL`. Route orthogonally (horizontal or vertical segments), never diagonal.

## Workflow

1. **Plan the layers.** Topology diagrams read left→right or top→down as flow stages:
   `users → edge/LB → orchestration (K8s) → data/security`. Decide columns/rows first.
2. **Pick the canvas.** New file → use `figma-create-new-file`. Existing file (user gave
   a URL) → read it first with `get_metadata` + `get_screenshot` to match the existing
   frame's grid, then append a new frame to the right.
3. **Paste helpers** (`references/helpers.js`) at the top of the `use_figma` script.
4. **Build in this order** inside one script (so coordinates stay in scope):
   frame → title → cluster containers → cards (store each returned rect in a `nodes` map)
   → connectors (reference `nodes`) → summary/legend.
5. **Screenshot to verify.** After building, call `get_screenshot` on the new frame and
   visually check alignment, overlaps, and that every connector lands on a card edge.
   Fix coordinate math if anything is off. Not done until the screenshot looks clean.

## Icons
Use `figma.createNodeFromSvg(svgString)` with the white-glyph SVGs in
`references/icons.md`, then resize to 25×25 and center in the tile. If a needed glyph
isn't there, draw a simple 2px-stroke line icon (white) or fall back to a single bold
white letter. Keep glyphs minimal and monochrome white - the tile color carries meaning.

## Reference files (read when needed)
- `references/design-tokens.md` - every exact color, font size, radius, spacing, shadow.
- `references/helpers.js` - paste-in JS: `card`, `clusterContainer`, `connector`,
  `summaryBar`, `title`, `iconTile`, plus `hexToRgb`. Composable, coordinate-driven.
- `references/icons.md` - white SVG glyph library (server, k8s, db, shield, network,
  storage, blockchain, users, queue, key, backup, lock, firewall, shieldAlert/DDoS,
  webShield/WAF, gateway, proxy, activity, document/log, fileCheck/consent, radar/SIEM,
  vault, building/gov, cloud, mobile, globe) + brand-label fallback guidance.

## Quality bar
- Pixel-aligned grid (multiples of ~6-8px), equal gutters, nothing overlapping.
- Every card has icon + eyebrow + title; meta optional.
- Every connector has a clear direction and lands exactly on card edges.
- Colors used semantically (don't make a database green).
- Verify with a screenshot before reporting done.

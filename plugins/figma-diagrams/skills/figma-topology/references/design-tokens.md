# Design tokens - Figma Topology style

All values measured from a reference topology. Use verbatim.

## Typeface
`Inter` only. Load both before any `setCharacters`:
```js
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
```

## Type scale
| Role            | Style    | Size  | Color     | Notes |
|-----------------|----------|-------|-----------|-------|
| H1 (topology)   | Bold     | 24    | `#1C2B33` | frame title, x50 y42 |
| H1 subtitle     | Regular  | 13    | `#5F6F73` | x50 y78 |
| Cluster tab     | Bold     | 10    | white/color | UPPERCASE, tracking 0.5 |
| Card eyebrow    | Bold     | 9.5   | category  | UPPERCASE, tracking 0.6 |
| Card title      | Bold     | 13.5  | `#1C2B33` | (16 for emphasis cards) |
| Card meta       | Regular  | 11    | `#5F6F73` | up to 2 lines |
| Connector label | Regular  | 11    | `#5F6F73` | inside white pill |

## Colors
### Neutrals
- Page background: `#EEF3F3`
- Frame background: `#FFFFFF`
- Frame border: `#E5EBEB`
- Card background: `#FFFFFF`
- Card border: `#E1E8E8`
- Cluster panel bg (solid): `#F8FAFA`
- Title text: `#1C2B33`
- Meta text: `#5F6F73`
- Connector line / arrow: `#98A9AC`

### Category accents (icon tile fill + eyebrow text)
- NETWORKING `#7C5CE0`
- COMPUTE `#EA7A1F`
- SECURITY `#E0483F`
- DATABASE `#3B7DDD`
- STORAGE `#2FB36A`
- BLOCKCHAIN `#D9488F`
- OBSERVABILITY / MONITORING `#0E9AC4`  (Grafana, Loki, SIEM/Wazuh, metrics & logs)
- USERS / ACCESS / edge `#1C2B33`

## Geometry
- Card radius: `12`
- Icon tile: `44 × 44`, radius `10` (small variant `34 × 34` radius `8`)
- Icon glyph: `25 × 25` (small `19`), white, centered in tile
- Card shadow: `{ type:"DROP_SHADOW", color:{r:0.058,g:0.102,b:0.18,a:0.10}, offset:{x:0,y:2}, radius:6, spread:0, visible:true, blendMode:"NORMAL" }`
- Cluster panel radius: `16`
- Cluster tab pill: height `32-34`, radius `8`, horizontal padding `16`
- Connector line weight: `2`
- Connector arrowhead: triangle ~`12 × 10`
- Connector label pill: radius `6`, padding `4×6`, 1px border `#E1E8E8`, white bg

## Layout grid
- Frame width: `1480` (height auto, typically 860-940)
- Content inset: `50` left/right, title block top `42`
- Standard column gap: `~40`; row gap: `~14` (list rows) / `~32` (cards)
- Card sizes:
  - compact `178 × 104`
  - standard `268 × 118`
  - list-row `390 × 58` (icon-left, title + inline meta - cluster VM lists)
  - summary bar `full × 68-104`
- Cluster column width inside a 3-node Proxmox layout: `422`, internal padding `16`.

## Padding inside a standard card
- Icon tile at `x15 y15`
- Eyebrow at `x71 y17`
- Title at `x71 y30`
- Meta line 1 at `x71 y53`, meta line 2 at `x71 y68`
(For 44px tile + 71px text column. Scale proportionally for other card sizes.)

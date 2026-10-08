# Design tokens - Figma Presentation (Slate style)

Same palette as `figma-topology`, re-scaled for **1920 × 1080** slides. Use verbatim.

## Canvas
- Slide size: **1920 × 1080** (Figma Slides default 16:9).
- Safe content margin: **120px** left/right, **96px** top, **84px** bottom.
- Footer baseline: y ≈ **1012**.

## Typeface
`Inter` only. Load every style you use in ONE batch before any `setCharacters`:
```js
await Promise.all([
  figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
  figma.loadFontAsync({ family: "Inter", style: "Medium" }),
  figma.loadFontAsync({ family: "Inter", style: "Regular" }),
]);
```
If a weight isn't installed, fall back to Bold/Regular (don't let a missing style throw).

## Type ramp (slide-scaled)
| Role                  | Style     | Size | Color        | Notes |
|-----------------------|-----------|------|--------------|-------|
| Cover title           | Bold      | 96   | white        | 1-2 lines, line-height ~1.05 |
| Section divider title | Bold      | 72   | white        | over a ghost number |
| Ghost number/letter   | Bold      | 360  | white @ 6-8% | decorative, behind divider title |
| Slide title (H1)      | Bold      | 52   | `#1C2B33`    | content slides, x120 y150 |
| Eyebrow / kicker      | Bold      | 18   | category     | UPPERCASE, tracking 2.0 |
| Statement / quote     | Bold      | 56   | white        | centered, max ~70% width |
| Subtitle / deck       | Regular   | 26   | `#5F6F73`    | (white @ 80% on slate) |
| Card eyebrow          | Bold      | 14   | category     | UPPERCASE, tracking 1.2 |
| Card title            | Semi Bold | 26   | `#1C2B33`    | |
| Card meta / body      | Regular   | 19   | `#5F6F73`    | line-height ~1.4 |
| Stat number           | Bold      | 88   | category/slate| big KPI |
| Stat label            | Medium    | 20   | `#5F6F73`    | under the number |
| Bullet text           | Regular   | 24   | `#31434B`    | |
| Footer rail           | Regular   | 16   | `#869799`    | deck • section • page |
| Table header          | Bold      | 18   | white        | on slate header band |
| Table cell            | Regular   | 19   | `#31434B`    | |

## Colors
### Neutrals
- Slate (cover/divider/closing bg, primary ink): `#1C2B33`
- Slate-2 (panel on slate, raised): `#25373F`
- Content slide page bg: `#EEF3F3` (topology default) · `#F5F8F8` (light theme)
- Card / surface bg: `#FFFFFF`
- Card border: `#E1E8E8`
- Hairline / divider rule: `#E5EBEB`
- Title ink: `#1C2B33`
- Body ink: `#31434B`
- Muted text: `#5F6F73`
- Footer muted: `#869799`
- On-slate body: white @ 82% opacity; on-slate muted: white @ 60%.

### Topology theme (DEFAULT - `setTheme("topology")`, all-light)
Synced with the `figma-topology` palette. Cover / section dividers / closing render as
white "frames" with slate ink and a faint slate ghost mark (no dark slides); content slides
use the topology page bg with white cards. Use this to keep a deck consistent with an
embedded figma-topology diagram.
- Page bg (content): `#EEF3F3`  ·  Cover / divider / closing bg: `#FFFFFF`
- Ink on cover: `#1C2B33` (slate)  ·  Muted on cover: `#5F6F73`
- Ghost number/letter: slate `#1C2B33` @ 5-7% on white
- A lead-accent left-edge strip runs down cover / divider / closing; card shadow ON.
The classic slate-cover look is still available via `setTheme("light")` (page `#F5F8F8`,
cover/divider/closing slate `#1C2B33`, white ink).

### Dark theme (enterprise - `setTheme("dark")`)
The all-dark variant. Every slide (cover,
divider, content) shares one dark canvas; cards are raised slate panels, no drop shadow
(border separates them instead). Category accents are unchanged.
- Page / cover bg: `#11191D`
- Card / surface: `#1C2B33`
- Card border / hairline: `#2A3A42`
- Title ink: `#FFFFFF` · Body: `#C9D4D6` · Muted: `#A1B2B4` · Footer: `#6B7B80`
Helpers read these from the active `TH` theme object; call `setTheme("dark")` once at the
top of the build script (default is `light`). Lead accent for this deck = COMPUTE orange
`#EA7A1F`.

### Category accents (icon tile + eyebrow + accent rule + stat number)
- NETWORKING `#7C5CE0`
- COMPUTE `#EA7A1F`
- SECURITY `#E0483F`
- DATABASE `#3B7DDD`
- STORAGE `#2FB36A`
- BLOCKCHAIN `#D9488F`
- USERS / ACCESS / edge `#1C2B33`
- Positive / success `#2FB36A` · Warning `#F59E0B` · Negative `#E0483F` (status pills)

Pick ONE **lead accent** for the deck (the eyebrow + divider + cover-rule color). The
category colors still apply per-card; the lead accent is the connective thread.

## Geometry
- Card radius: `16` (large panels `20`).
- Icon tile: `56 × 56`, radius `14`, white glyph `32`. (small `44`, glyph `25`.)
- Card shadow: `{ type:"DROP_SHADOW", color:{r:0.058,g:0.102,b:0.18,a:0.10}, offset:{x:0,y:6}, radius:18, spread:0, visible:true, blendMode:"NORMAL" }`
- Accent rule under title: width `64`, height `5`, radius `2.5`, lead-accent fill.
- Pill / badge: radius `999` (full), padding `7×14`, Inter Semi Bold 15.
- Connector (architecture slides): 2.5px `#98A9AC` + triangle head (reuse topology).
- Footer accent square: `10 × 10`, radius `2`, lead-accent fill, left of footer text.

## Layout grid (content slides)
- Title block: eyebrow at `x120 y112`, title at `x120 y148`, accent rule at `x120 y226`.
- Body region starts at y ≈ **300**, ends at y ≈ **980** (above footer).
- Card row of N: total content width `1680` (120→1800), gutter `32`.
  - 2 cards → `824` wide · 3 cards → `538` · 4 cards → `396`.
- Stat band: card height `220`; number top, label bottom.
- Standard infoCard: height `300` (icon-tile card with 2-3 meta lines).
- Two-column split: left col x120 w `760`, right col x `940` w `860`.

## Card anatomy (slide-scaled infoCard)
- Icon tile at `x32 y32` (56×56).
- Eyebrow at `x108 y36`.
- Title at `x32 y112` (below the tile, full card width − 64 padding).
- Meta lines at `x32 y160`, step `30`.
(For tile-above-title layout. For tile-left compact rows, mirror topology's `listRow`.)

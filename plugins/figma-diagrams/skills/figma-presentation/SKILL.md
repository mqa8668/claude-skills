---
name: figma-presentation
description: Build polished consultant-grade slide decks (presentations) directly in Figma Slides, in the "Slate" visual language - all-light topology theme by default (white cover/divider/closing frames, #EEF3F3 content pages with white icon-tile cards; optional slate or all-dark themes), category accent colors, AWS-style service glyphs, big-number stat slides, roadmap/timeline rows, comparison columns, and embedded topology-style architecture slides. Use whenever the user wants to create, build, draft, or update a presentation, slide deck, pitch, proposal deck, technical deck, infra/architecture briefing, BOD/management report deck, or "thuyết trình"/"slide" in Figma (or shares a figma.com/slides URL). Sibling of figma-topology, same design system.
---

# Figma Presentation Decks (Slate style)

Build presentation-grade slide decks in **Figma Slides** using the Plugin API
(`use_figma`), in the same fixed visual language as the `figma-topology` skill - slate
`#1C2B33`, white cards with colored icon tiles, category accent colors, Inter typeface.
This skill encodes *what a good slide looks like*; `figma-use-slides` encodes *how to
call the Slides API*. **Load both.**

## Golden rules

1. **Load `figma-use-slides` FIRST (and `figma-use`).** Before any `use_figma` call you
   MUST invoke the `figma:figma-use-slides` skill - it teaches the Slides Plugin API
   contract (slide grid, themes, the critical appendChild-before-x/y trap, validation
   without `get_metadata`). Pass its name in the `skillNames` param of every `use_figma`
   call (prefix `resource:` if loaded as an MCP resource). This skill (`figma-presentation`)
   teaches the visual system layered on top.
2. **appendChild BEFORE setting x/y - every node, every nesting level.** Newly created
   nodes auto-parent to `(240,240)`; setting position before the real `appendChild`
   yields a `(−240,−240)` shift. The helpers in `references/helpers.js` enforce this -
   use them, never hand-roll `createFrame`+`.x=` order.
3. **Use the design tokens verbatim** - `references/design-tokens.md`. Slides are
   **1920 × 1080**. Never invent colors/sizes; the whole point is one consistent system.
4. **Build with the helpers** in `references/helpers.js` - paste the whole block at the
   top of every `use_figma` build script, then compose slides by calling
   `coverSlide()` / `sectionDivider()` / `infoCard()` / `statCard()` / etc.
5. **One deck = one Slides file.** Create with `create_new_file` (Slides editor) if the
   user has no file; otherwise read the existing deck first and match it. Do NOT call
   `figma.createPage()` (Design-only) - organize with the slide grid / slide rows.
6. **Never delete slides to rebuild.** Edit in place. Only start over if the user says so.
7. **Reuse the topology design system for architecture slides.** When a slide IS a
   topology/architecture diagram, drop the `figma-topology` cards + connectors onto a
   light content slide - the tokens are identical, so they compose seamlessly.

## The deck's visual signature

Same DNA as the Slate topology style, applied to slides:

- **Background.** The **default `topology` theme is all-light** (synced with figma-topology):
  cover + section dividers + closing are white `#FFFFFF` "frames" with slate ink and a faint
  slate ghost number/letter; content slides sit on the `#EEF3F3` topology page with white
  `#FFFFFF` cards. This keeps a deck consistent with an embedded topology diagram. For the
  classic look call `setTheme("light")` (slate `#1C2B33` cover/dividers, `#F5F8F8` content),
  or `setTheme("dark")` for the all-dark enterprise variant. A lead-accent left-edge strip runs
  down every cover-type slide in all themes.
- **The eyebrow.** Every slide opens with a small UPPERCASE kicker (Inter Bold 18,
  tracking ~2px) in a category accent color, with a short accent rule under/beside the
  title. This is the recurring motif that ties the deck together.
- **Icon-tile cards.** The same white rounded card with a 56-64px colored icon tile,
  eyebrow, title, and meta lines - scaled up from topology. This is the workhorse unit.
- **Category color = meaning.** NETWORKING purple, COMPUTE orange, SECURITY red,
  DATABASE blue, STORAGE green, BLOCKCHAIN pink, USERS/edge slate. Don't decorate; color
  carries category, exactly as in topology.
- **Footer rail.** A thin footer on content slides: deck name • section • page number,
  Inter Regular 16 muted, with a tiny accent square. Keeps the deck branded.

## Slide archetypes (the deck's building blocks)

Read `references/slide-archetypes.md` for the exact recipe (layout + helper calls) of
each. The core set:

| Archetype          | Bg     | Use it for |
|--------------------|--------|------------|
| **Cover**          | slate   | title slide - eyebrow, big title, subtitle, presenter/date, accent rule |
| **Section divider**| slate   | chapter break - oversized ghost number + section name |
| **Agenda / TOC**   | light  | numbered list of sections |
| **Statement**      | slate   | one big quote / thesis sentence, centered |
| **Bullet + cards** | light  | a title + 2-4 `infoCard`s in a row (the default content slide) |
| **Stat band**      | light  | 2-4 big-number `statCard`s (KPIs, metrics) |
| **Two-column**     | light  | text left / visual or card right; or before-vs-after |
| **Comparison**     | light  | 2-3 columns compared (options, vendors, phases) |
| **Roadmap / timeline** | light | horizontal phase row with connector + phase cards |
| **Architecture**   | light  | embedded topology diagram (reuse figma-topology cards/connectors) |
| **Table / matrix** | light  | grid of rows×cols with header band |
| **Closing**        | slate   | thank you / contact / next steps |

## Workflow (follow `figma-use-slides`' two-phase deck workflow)

### Phase 1 - Plan (before any code)
1. **Read the brief.** Who's the audience (BOD, partner, technical team, KD/VH)? What's
   the takeaway per slide? Vietnamese-audience decks: Vietnamese with diacritics, keep
   tech/severity terms in English, no decorative emoji (see user's doc conventions).
2. **Outline every slide**: archetype + one-line content + which category accent leads.
   Aim for layout *variety* - don't do "cards, cards, cards". Alternate slate dividers
   between content runs.
3. **Lock the palette + fonts** = the tokens (don't re-derive). Pick ONE lead accent for
   the deck (e.g. NETWORKING purple for an infra deck) used on eyebrows/dividers.
4. **Reference file?** If the user gave a figma.com URL, study it first (Slides → read
   via `use_figma` read-only + `get_screenshot`; Design → `get_design_context`) and match
   its palette/type before designing.

### Phase 2 - Build (batches of 3-5 slides)
5. **Paste `references/helpers.js`** at the top of every build script (it bundles the
   palette `C`, font loading, base `addFrame/addText/addRect`, and all archetype helpers).
6. **Theme the deck once.** On a freshly created Slides file, overwrite the default light
   theme - set the deck background and theme fonts to Inter (see archetypes doc). Don't
   rely on the default theme tokens.
7. **Build 3-5 complete slides per `use_figma` call.** Each slide is an isolated subtree;
   large batches are safe with the append-first helpers.
8. **Validate each batch** with the deterministic batch-validation script from
   `figma-use-slides` (overlaps / text clipping / out-of-bounds, ~3s). Screenshot only on
   failure, plus one checkpoint screenshot after batch 1 (visual system) and after the
   final batch (overall quality).
9. **Speaker notes**: only if the user asks (then write presenter-facing bullets, not a
   repeat of the slide).

## Quality bar
- 1920×1080, content inside a 120px safe margin; nothing clipped or off-slide.
- Every content slide: eyebrow + title + accent rule + footer rail. Consistent placement.
- Category colors used semantically; one lead accent threads the deck.
- Real layout variety across the deck (cover → divider → cards → stats → two-col → …).
- Vietnamese text has full diacritics; English tech terms kept as-is; no emoji decoration.
- Verify with the batch validator + a screenshot before reporting done.

## Reference files (read when needed)
- `references/design-tokens.md` - exact colors, slide-scaled type ramp, geometry, margins.
- `references/helpers.js` - paste-in JS: base append-first helpers + `coverSlide`,
  `sectionDivider`, `contentScaffold` (eyebrow+title+rule+footer), `infoCard`,
  `statCard`, `bulletList`, `pill`, `phaseCard`, `iconTile`, `newSlide`. Coordinate-driven.
- `references/slide-archetypes.md` - per-archetype layout recipe + which helpers to call.
- `references/icons.md` - white SVG glyph library (shared with figma-topology).

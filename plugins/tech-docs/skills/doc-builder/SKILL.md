---
name: doc-builder
description: Turn Markdown (or content you draft) into a polished, consultant-grade HTML document - and optionally a PDF - in a clean light theme with one accent color (teal by default). Light airy masthead, accent rules, light table headers, note cards, optional headline stat block, Inter type. Diagrams and timelines are drawn in Figma with the figma-topology skill and embedded as images, never as ascii art. Built-in sanitizer strips AI-tell typography and emoji so the output reads like a human typed it on a keyboard (em/en dash become -, arrows become ->, smart quotes become straight quotes, bullets/middots become -, pictographs removed) while leaving professional and technical English untouched. Use whenever the user wants to produce, render, or export a proposal, quote, statement of work, report, brief, spec, one-pager, or any client deliverable as a clean HTML/PDF document, or asks to convert a .md file into a styled document. Sibling of figma-topology / figma-presentation, same visual family.
---

# doc-builder - clean light HTML/PDF documents

Build clean, professional documents (proposals, quotes, SOWs, reports, specs) from
Markdown. The theme is light and airy on white with one accent color (teal by default),
in the spirit of a polished client quote - not dark, not busy. Inter type, generous
spacing, restrained color. The output is meant to look like a careful person made it,
not a machine - so a sanitizer pass removes the small typographic tells that give AI
text away.

**Diagrams belong in Figma, not in text.** Any architecture, topology, timeline, gantt,
or flow goes through the `figma-topology` skill (draw it in Figma, export a PNG, embed
the image). Never hand-draw ascii diagrams or box-drawing "art" in a document - it reads
as machine output and looks unprofessional. See "Embedding diagrams" below.

## Golden rules

1. **Write the content as Markdown first, then render.** Author or edit a `.md` file
   (headings, GFM pipe tables, lists, blockquotes, fenced code), then run the build
   script. Keep prose plain and human - short sentences, no filler, no emoji, no
   decorative glyphs. Leave domain/technical English exactly as the field writes it
   (API names, SKU, OAuth, Pub/Sub, ERP, etc.).
2. **Always go through `build_doc.py`.** Do not hand-write HTML. The script applies the
   design system AND the sanitizer in one pass. Hand-written HTML loses both.
3. **One Markdown file = one document.** Title comes from the first `# H1` (or pass
   `--title`). Everything else is body.
4. **Use the design system verbatim** - `references/styles.css`. Never invent colors or
   fonts. Consistency across the topology, deck, and document is the whole point.
5. **PDF is for delivery; HTML is for review.** Render HTML to share/iterate; add
   `--pdf` only when the user wants a final file. PDF uses headless Chrome.

## What the sanitizer fixes (the point of difference)

The build always rewrites these before rendering. It runs on prose and inside code
blocks (alignment in fenced blocks is preserved; only the glyphs change).

| AI-tell glyph | becomes | note |
|---------------|---------|------|
| em dash       | `-`     | single hyphen, the plain way people type |
| en dash       | `-`     | ranges: `6-9 weeks` |
| arrows        | `->` `<-` `<->` `=>` | |
| smart quotes  | `"` `'` | straight quotes only |
| ellipsis      | `...`   | three dots |
| bullet / middot / dot leaders | `-` | |
| math glyphs   | `x` `>=` `<=` `~` `!=` `+/-` | multiplication, comparators |
| box-drawing / block shading | ascii (`#`, `=`, `-`, `\|`, `+`) | for ascii timelines/gantt |
| non-breaking / thin / zero-width spaces | normal space / removed | |
| emoji + pictographs + dingbats | removed | no AI icons |

Kept as-is: `(c)`, `(r)`, degree, section sign, currency, and all real words. Technical
terms are never translated or "simplified".

> If the user explicitly wants a glyph kept (e.g. a real multiplication sign in a math
> doc), edit the `GLYPHS` map in `scripts/build_doc.py` for that run, or note the
> exception - do not disable the whole pass.

## Workflow

1. **Get or write the Markdown.** If converting an existing `.md`, use it directly. If
   drafting, write clean Markdown to a file first.
2. **Draw any diagrams in Figma first** (see "Embedding diagrams"), export PNGs into an
   `assets/` folder next to the Markdown, and reference them with `![caption](assets/x.png)`.
3. **Pick the document framing** via flags. First decide the document *type* - it sets how
   much prose belongs in the body (see "Document types - match depth to the deliverable").
   - `--eyebrow` small kicker (e.g. `Proposal`, `Statement of Work`, `Cost & Timeline`)
   - `--title` (or rely on the first H1), `--subtitle`, `--meta`
   - `--accent` one hex - default `#0F766E` (teal). Pick a calm, well-liked color: teal
     `#0F766E`, blue `#2563EB`, indigo `#4F46E5`, emerald `#059669`. Keep client docs
     restrained, not loud.
   - `--brand "Name"` small bold brand line above the title.
   - `--stat "$9,000 USD"` `--stat-label "Total investment"` `--stat-note "6-9 weeks"`
     a headline number block in the masthead (great for quotes).
   - `--confidential` shows a ribbon (use `--ribbon "Internal - not for client"` to set
     the text); pair with a red accent for internal notes.
   - `--footer` left-side footer line.
   - `--wide-figures` in print, let each figure bleed past the text column out to the
     paper margin (193mm instead of 158mm on A4). Use it for any document carrying
     topology diagrams: a wider diagram is a taller diagram, so it fills more of the
     sheet it lands on instead of leaving white space under it. Size it with
     `--fig-max-h 160mm`, or per figure from the document's own style block.
   - `--var NAME=VALUE` set a CSS custom property on the document (repeatable), so a
     rule written once in the markdown can be re-tuned per build.
4. **Render HTML** for review:
   ```bash
   # run from this skill's directory (scripts/ is relative to it)
   python3 scripts/build_doc.py INPUT.md \
     --eyebrow "Proposal" --brand "Studio" --subtitle "Automated PO intake pipeline" \
     --meta "Prepared for <client>  |  2026-06-28" \
     --stat "$X,XXX USD" --stat-label "Total investment" --stat-note "6-9 weeks" \
     --accent "#0F766E"
   ```
5. **Open the HTML** to check it (`open INPUT.html`). Verify tables, the masthead, images,
   and that no emoji or smart punctuation survived.
6. **Render the PDF** when approved: add `--pdf`. Output lands next to the HTML.
7. **Check the pagination** on any document with diagrams. A figure cannot be split, so
   one that does not fit in what is left of a page jumps and strands a half-empty sheet.
   Long tables now split across sheets (the header row repeats), which removes most of
   it; for the rest, widen the figures, cap the one that just misses the foot of its
   page, and only then reach for `<div class="pagebreak"></div>` in the markdown. Render
   the pages (`pdftoppm -png -r 55 DOC.pdf /tmp/pg`) and look at where the ink stops:
   over ~120mm of empty page bottom is a defect, ~55mm reads as a normal break.

## Embedding diagrams (the professional way)

Documents must not contain ascii diagrams or box-drawing timelines. Instead:

1. Build the diagram in Figma with the **figma-topology** skill (architecture, topology,
   roadmap/timeline rows). Keep it in the light card style so it matches the document.
2. Export the frame to PNG: call `get_screenshot` for the frame's node id, then `curl`
   the returned URL to `assets/<name>.png` (use a high `maxDimension`, e.g. 2200, for a
   crisp image).
3. Reference it in the Markdown on its own line:
   ```markdown
   ![Architecture: Gmail to Claude to Indigo8 pipeline](assets/architecture.png)
   ```
   The alt text becomes a centered caption (pandoc `implicit_figures`).

The build keeps relative image paths working in the PDF by rendering next to the source.

## Pricing tiers (good / better / best)

For a 3-package proposal, write the cards as a raw HTML block in the Markdown (pandoc
passes raw HTML through; the sanitizer only touches glyphs, so tags survive). Put a
feature-comparison Markdown table right below it. Mark the middle card `featured`.

```html
<div class="tiers">
  <div class="tier">
    <div class="tier-name">Starter</div>
    <div class="tier-price">$2,500</div>
    <div class="tier-tag">One-line positioning.</div>
    <div class="tier-best">Best for ...</div>
  </div>
  <div class="tier featured">
    <div class="badge">Recommended</div>
    <div class="tier-name">Standard</div>
    <div class="tier-price">$4,900</div>
    <div class="tier-tag">One-line positioning.</div>
    <div class="tier-best">Best for ...</div>
  </div>
  <div class="tier">
    <div class="tier-name">Complete</div>
    <div class="tier-price">$7,500</div>
    <div class="tier-tag">One-line positioning.</div>
    <div class="tier-best">Best for ...</div>
  </div>
</div>
```

In the comparison table use `Yes` / `-` (not check-mark glyphs - the sanitizer strips
dingbats) and short qualifiers (`CSV export`, `API push`, `Basic`, `Full`).

## Anatomy of a document

```
.doc (white card on light page)
 |- masthead        light: brand, eyebrow, title, subtitle, accent rule, meta,
 |                  optional headline stat (flat figure, hairline rules - no filled box)
 |- doc-body        h2 with accent left-bar, h3, h4 accent kicker,
 |                  light-header tables w/ zebra rows, note-card blockquotes,
 |                  embedded Figma diagrams (figures w/ caption), accent markers
 |- doc-foot        hairline footer line
```

## Markdown -> component mapping

- `# H1`        -> document title (pulled into the masthead, removed from body)
- `## H2`       -> section header with accent left-bar
- `### H3`      -> sub-header
- `#### H4`     -> uppercase accent kicker (good for small labels)
- pipe table    -> light-header table, zebra rows, alignment respected
- `> quote`     -> note card (use for assumptions, callouts, "to confirm")
- `![alt](img)` -> centered figure with caption (embed Figma diagrams this way)
- `**bold**`    -> ink emphasis
- `---`         -> hairline divider

## Tooling notes

- `pandoc` does Markdown -> HTML (GFM tables, `implicit_figures`). Required.
- Headless **Google Chrome** does HTML -> PDF. The script polls for the output file then
  kills Chrome (its updater holds the process open) and strips the remote font link so it
  never blocks on the network. The binary is taken from the `CHROME` env var, then `google-chrome` / `chromium` on PATH, then the default macOS app path.
- Inter loads from Google Fonts for screen; PDF falls back to the system stack - both
  render cleanly.

## Document types - match depth to the deliverable

This skill renders any deliverable, but the right *amount of prose* differs by type. First
decide what the document is (the user's word usually says it - quote/báo giá, proposal/đề
xuất, SOW/phụ lục, report/báo cáo, brief, spec, one-pager), then apply that type's depth.
When unsure, ask one line: "quote (lean) or proposal (fuller)?"

| Type | Purpose | Length | Prose level |
|---|---|---|---|
| Quote / Báo giá | Price + terms to decide on | 1-3 pages | Minimal - tables/bullets carry it, prose is connective tissue only |
| Proposal / Đề xuất | Pitch the solution + win the deal | 8-25 pages | Fuller - context, approach, and *why* are allowed, but still structured |
| SOW / Phụ lục | Contractual scope after sign | 10-15 pages | Precise - exhaustive scope, deliverables, acceptance; numbered clauses, little narrative |
| Report / Báo cáo | Findings + evidence | as needed | Analytical - claims backed by data; prose explains, tables/figures prove |
| Brief / Spec | Align on a decision or design | short | Tight and decision-oriented; no background padding |
| One-pager | Single-glance summary | 1 page | Ruthless - headline, key facts, nothing else |

### Universal discipline (every type)

These hold regardless of length - they are what separates a human-authored doc from AI
filler:

- **One fact, one place.** If it lives in a table, a milestone row, or an embedded diagram,
  do not also narrate it in a paragraph.
- **Don't restate the table or the diagram in prose.** A closing "In short, after X you get
  Y and Z" that re-lists the table above - delete it. A topology/timeline image plus its
  caption needs a one-line intro, not a blow-by-blow walkthrough.
- **One idea, one sentence.** Collapse "First, ... Second, ... Third, ..." narration into a
  bullet list with a bold lead per item. Cut scene-setting clauses ("quick to set up",
  "with our scale", "as you can see").
- **Keep protective/legal lines, trim their fat.** Fixed-price guarantees, scope
  boundaries, assumptions, IP terms stay - they protect both sides - but in two sentences,
  not five.
- **What was covered live gets a one-line recap, not a re-explanation.** Point at the scope
  it sets, then move on.

### Applying it by type

The universal rules are the floor for all types. Then scale prose to the table above: a
quote cuts to the bone (if a section is three paragraphs, ask which two sentences could be
a bullet list); a proposal earns more narrative for context and approach but never
repetition; a SOW trades narrative for clause-level precision; a report keeps the prose
that carries analysis but still proves with tables and figures. More pages is never the
goal - the right depth for the job is.

## Quality bar

- No emoji, no smart quotes, no em/en dashes, no arrows or box-drawing glyphs anywhere in
  the output. Open the HTML and scan for them before delivering.
- Light, airy, restrained. Tables aligned, light headers with an accent underline, zebra
  rows. Nothing overflows the card.
- Diagrams are embedded Figma images, never ascii. No ascii timelines or box-drawing.
- Language is plain and direct. Technical English left intact. No marketing filler, no
  arrow-chain summaries (write "Gmail to extraction to Indigo8" as a sentence, not glyphs).
- One accent color per document, used consistently. Matches the embedded Figma diagram.

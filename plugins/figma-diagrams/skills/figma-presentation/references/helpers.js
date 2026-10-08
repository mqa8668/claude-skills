// ============================================================================
// figma-presentation helpers - paste this WHOLE block at the top of every
// use_figma build script, then compose slides by calling coverSlide()/
// sectionDivider()/contentScaffold()/infoCard()/statCard()/etc.
//
// CRITICAL: every helper appends the node to its parent BEFORE setting x/y
// (Slides auto-parent bug → (-240,-240) shift). Never reorder this.
// Fonts must be loaded first (see design-tokens.md). Slides are 1920 x 1080.
// All helpers return the created node so you can position siblings off it.
//
// THEME: default is "topology" - all-light, synced with the figma-topology palette
// (cover/divider/closing are white frames with slate ink; content slides on the #EEF3F3
// page with white cards). Call setTheme("light") for the classic slate-cover + light-
// content look, or setTheme("dark") for the enterprise all-dark look. The category
// ACCENT colors are theme-independent; only surfaces/ink/bg swap.
// ============================================================================

const SW = 1920, SH = 1080;            // slide dimensions
const MX = 120;                        // side safe margin

// Category accents (theme-independent) - color carries meaning, as in topology.
const C = {
  cat: {
    NETWORKING: "#7C5CE0", COMPUTE: "#EA7A1F", SECURITY: "#E0483F",
    DATABASE: "#3B7DDD", STORAGE: "#2FB36A", BLOCKCHAIN: "#D9488F",
    USERS: "#98A9AC", ACCESS: "#98A9AC",
    SUCCESS: "#2FB36A", WARNING: "#F59E0B", NEGATIVE: "#E0483F",
  },
  line: "#98A9AC",
};

// Theme palettes. coverBg = bg for cover/divider/statement/closing slides.
const THEMES = {
  // DEFAULT - all-light, synced with the figma-topology palette. Cover / section
  // dividers / closing render as white "frames" with slate ink + a faint slate ghost mark;
  // content slides sit on the #EEF3F3 topology page with white cards. Keeps a deck
  // visually consistent with a figma-topology diagram embedded in it.
  topology: {
    pageBg: "#EEF3F3", coverBg: "#FFFFFF", surface: "#FFFFFF",
    border: "#E1E8E8", hairline: "#E5EBEB",
    title: "#1C2B33", body: "#31434B", meta: "#5F6F73", footer: "#869799",
    onCover: "#1C2B33", onCoverMuted: "#5F6F73", shadow: true,
  },
  light: {                             // classic slate-cover + light-content
    pageBg: "#F5F8F8", coverBg: "#1C2B33", surface: "#FFFFFF",
    border: "#E1E8E8", hairline: "#E5EBEB",
    title: "#1C2B33", body: "#31434B", meta: "#5F6F73", footer: "#869799",
    onCover: "#FFFFFF", onCoverMuted: "#C8D3D5", shadow: true,
  },
  dark: {                              // enterprise all-dark
    pageBg: "#11191D", coverBg: "#11191D", surface: "#1C2B33",
    border: "#2A3A42", hairline: "#2A3A42",
    title: "#FFFFFF", body: "#C9D4D6", meta: "#A1B2B4", footer: "#6B7B80",
    onCover: "#FFFFFF", onCoverMuted: "#A1B2B4", shadow: false,
  },
};
let TH = THEMES.topology;
function setTheme(name) { TH = THEMES[name] || THEMES.topology; }

// Pick the deck's lead accent once, e.g. LEAD = C.cat.COMPUTE; (orange)
let LEAD = C.cat.NETWORKING;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255 };
}
const solid = (hex, a = 1) => [{ type: "SOLID", color: hexToRgb(hex), opacity: a }];

const CARD_SHADOW = { type:"DROP_SHADOW", color:{r:0.058,g:0.102,b:0.18,a:0.10},
  offset:{x:0,y:6}, radius:18, spread:0, visible:true, blendMode:"NORMAL" };
const cardEffects = () => (TH.shadow ? [CARD_SHADOW] : []);

// ---- base helpers (append-first; the only safe way to create nodes) --------
function addFrame(parent, x, y, w, h, fillHex, radius) {
  const f = figma.createFrame();
  parent.appendChild(f);
  f.resize(w, h);
  f.fills = fillHex ? solid(fillHex) : [];
  if (radius !== undefined) f.cornerRadius = radius;
  f.clipsContent = false;
  f.x = x; f.y = y;
  return f;
}
function addRect(parent, x, y, w, h, fillHex, radius, opacity) {
  const r = figma.createRectangle();
  parent.appendChild(r);
  r.resize(w, h);
  r.fills = solid(fillHex, opacity === undefined ? 1 : opacity);
  if (radius !== undefined) r.cornerRadius = radius;
  r.x = x; r.y = y;
  return r;
}
// style: "Bold" | "Semi Bold" | "Medium" | "Regular"
function addText(parent, str, { x, y, size = 19, style = "Regular", color = TH.meta,
                                w, track = 0, upper = false, align = "LEFT", lh } = {}) {
  const t = figma.createText();
  parent.appendChild(t);
  t.fontName = { family: "Inter", style };
  t.fontSize = size;
  t.characters = upper ? str.toUpperCase() : str;
  if (track) t.letterSpacing = { value: track, unit: "PIXELS" };
  if (lh) t.lineHeight = { value: lh, unit: "PIXELS" };
  t.fills = solid(color);
  t.textAlignHorizontal = align;
  if (w) { t.textAutoResize = "HEIGHT"; t.resize(w, t.height); }
  else   { t.textAutoResize = "WIDTH_AND_HEIGHT"; }
  t.x = x; t.y = y;
  return t;
}

// ---- slide creation --------------------------------------------------------
// Append a new blank slide and paint its bg. mode: "page" | "cover".
function newSlide(mode) {
  const slide = figma.createSlide();              // appended to grid automatically
  slide.fills = solid(mode === "cover" ? TH.coverBg : TH.pageBg);
  return slide;
}

// ---- icon tile (white SVG glyph on a colored rounded square) ---------------
function iconTile(parent, x, y, colorHex, svg, size = 56, glyph = 32) {
  const tile = addRect(parent, x, y, size, size, colorHex, Math.round(size * 0.25));
  if (svg) {
    const node = figma.createNodeFromSvg(svg);
    parent.appendChild(node);
    node.resize(glyph, glyph);
    node.x = x + (size - glyph) / 2; node.y = y + (size - glyph) / 2;
  }
  return tile;
}

// ---- pill / status badge ---------------------------------------------------
function pill(parent, { x, y, label, color = LEAD, filled = false }) {
  const f = figma.createFrame();
  parent.appendChild(f);
  f.layoutMode = "HORIZONTAL"; f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO";
  f.paddingLeft = 14; f.paddingRight = 14; f.paddingTop = 7; f.paddingBottom = 7;
  f.cornerRadius = 999;
  f.fills = filled ? solid(color) : solid(color, 0.16);
  addText(f, label, { x: 0, y: 0, size: 15, style: "Semi Bold", color: filled ? "#FFFFFF" : color });
  f.x = x; f.y = y;
  return f;
}

// ---- accent rule (the recurring motif under a title) -----------------------
function accentRule(parent, x, y, color = LEAD, w = 64) {
  return addRect(parent, x, y, w, 5, color, 2.5);
}

// ============================================================================
// ARCHETYPE HELPERS
// ============================================================================

// COVER - cover-bg, eyebrow, big title, subtitle, presenter/date, accent rule,
// faint oversized ghost mark. opts:
//  { eyebrow, title, subtitle, footerLeft, footerRight, accent=LEAD, ghost }
function coverSlide({ eyebrow, title, subtitle, footerLeft, footerRight, accent = LEAD, ghost }) {
  const s = newSlide("cover");
  addRect(s, 0, 0, 10, SH, accent, 0);                 // accent edge strip
  if (ghost) {
    const g = addText(s, ghost, { x: 1080, y: 300, size: 360, style: "Bold", color: TH.onCover, upper: true });
    g.opacity = 0.06;
  }
  addText(s, eyebrow, { x: MX, y: 360, size: 18, style: "Bold", color: accent, track: 2, upper: true });
  accentRule(s, MX, 398, accent, 72);
  addText(s, title, { x: MX, y: 430, size: 96, style: "Bold", color: TH.onCover, w: 1500, lh: 100 });
  if (subtitle) addText(s, subtitle, { x: MX, y: 660, size: 26, style: "Regular", color: TH.onCoverMuted, w: 1300 });
  if (footerLeft)  addText(s, footerLeft,  { x: MX,   y: 1000, size: 16, style: "Regular", color: TH.onCoverMuted });
  if (footerRight) addText(s, footerRight, { x: 1400, y: 1000, size: 16, style: "Regular", color: TH.onCoverMuted, w: 400, align: "RIGHT" });
  return s;
}

// SECTION DIVIDER - cover-bg, oversized ghost number + section title.
function sectionDivider({ number, title, subtitle, accent = LEAD }) {
  const s = newSlide("cover");
  addRect(s, 0, 0, 10, SH, accent, 0);                 // accent edge strip
  if (number) {
    const g = addText(s, String(number).padStart(2, "0"), { x: 1180, y: 240, size: 420, style: "Bold", color: TH.onCover });
    g.opacity = 0.07;
  }
  addText(s, "SECTION", { x: MX, y: 430, size: 18, style: "Bold", color: accent, track: 2, upper: true });
  accentRule(s, MX, 468, accent, 72);
  addText(s, title, { x: MX, y: 500, size: 72, style: "Bold", color: TH.onCover, w: 1300, lh: 78 });
  if (subtitle) addText(s, subtitle, { x: MX, y: 640, size: 24, style: "Regular", color: TH.onCoverMuted, w: 1100 });
  return s;
}

// CONTENT SCAFFOLD - page-bg + eyebrow + title + accent rule + footer rail.
// Build your body region (y≈300..980) on the returned SLIDE.
function contentScaffold({ eyebrow, title, accent = LEAD, footerDeck, footerSection, page }) {
  const s = newSlide("page");
  if (eyebrow) addText(s, eyebrow, { x: MX, y: 112, size: 18, style: "Bold", color: accent, track: 2, upper: true });
  addText(s, title, { x: MX, y: 148, size: 52, style: "Bold", color: TH.title, w: 1680 });
  accentRule(s, MX, 226, accent, 64);
  footerRail(s, { deck: footerDeck, section: footerSection, page, accent });
  return s;
}

// FOOTER RAIL - accent square • deck • section ... page.
function footerRail(parent, { deck, section, page, accent = LEAD } = {}) {
  const y = 1012;
  if (deck || section) {
    addRect(parent, MX, y + 4, 10, 10, accent, 2);
    const left = [deck, section].filter(Boolean).join("   •   ");
    addText(parent, left, { x: MX + 22, y, size: 16, style: "Regular", color: TH.footer });
  }
  if (page !== undefined) addText(parent, String(page), { x: 1760, y, size: 16, style: "Regular", color: TH.footer, w: 40, align: "RIGHT" });
}

// INFO CARD - surface card, icon tile (top-left), eyebrow, title, meta lines.
function infoCard(parent, opts) {
  const { x, y, w = 538, h = 300, category, title, meta = [], svg } = opts;
  const accent = opts.accent || C.cat[category] || LEAD;
  const eyebrow = opts.eyebrow || category || "";
  const f = addFrame(parent, x, y, w, h, TH.surface, 16);
  f.strokes = solid(TH.border); f.strokeWeight = 1; f.effects = cardEffects();
  f.name = title;
  iconTile(f, 32, 32, accent, svg, 56, 32);
  if (eyebrow) addText(f, eyebrow, { x: 108, y: 44, size: 14, style: "Bold", color: accent, track: 1.2, upper: true });
  addText(f, title, { x: 32, y: 112, size: 26, style: "Semi Bold", color: TH.title, w: w - 64 });
  meta.forEach((m, i) => addText(f, m, { x: 32, y: 160 + i * 30, size: 19, style: "Regular", color: TH.meta, w: w - 64, lh: 26 }));
  return f;
}

// STAT CARD - big number + label (+ optional caption).
function statCard(parent, opts) {
  const { x, y, w = 396, h = 220, number, label, caption } = opts;
  const accent = opts.accent || LEAD;
  const f = addFrame(parent, x, y, w, h, TH.surface, 16);
  f.strokes = solid(TH.border); f.strokeWeight = 1; f.effects = cardEffects();
  f.name = label || String(number);
  addRect(f, 0, 0, 6, h, accent, 0);                 // accent spine on the left
  addText(f, String(number), { x: 36, y: 38, size: 84, style: "Bold", color: accent, w: w - 60 });
  if (label)   addText(f, label,   { x: 36, y: 150, size: 20, style: "Medium",  color: TH.title, w: w - 72 });
  if (caption) addText(f, caption, { x: 36, y: 182, size: 16, style: "Regular", color: TH.meta,  w: w - 72 });
  return f;
}

// PHASE CARD - for roadmap/timeline rows.
function phaseCard(parent, opts) {
  const { x, y, w = 396, h = 300, phase, title, items = [], status } = opts;
  const accent = opts.accent || LEAD;
  const f = addFrame(parent, x, y, w, h, TH.surface, 16);
  f.strokes = solid(TH.border); f.strokeWeight = 1; f.effects = cardEffects();
  f.name = title;
  addRect(f, 0, 0, w, 6, accent, 0);                 // accent cap on top
  addText(f, phase, { x: 28, y: 28, size: 14, style: "Bold", color: accent, track: 1.2, upper: true });
  addText(f, title, { x: 28, y: 54, size: 24, style: "Semi Bold", color: TH.title, w: w - 56 });
  items.forEach((it, i) => {
    addRect(f, 28, 112 + i * 34 + 8, 8, 8, accent, 4);
    addText(f, it, { x: 46, y: 112 + i * 34, size: 17, style: "Regular", color: TH.body, w: w - 74, lh: 22 });
  });
  if (status) pill(f, { x: 28, y: h - 48, label: status, color: accent });
  return f;
}

// BULLET LIST - accented bullets in a column.
function bulletList(parent, { x, y, w = 760, items = [], accent = LEAD, gap = 56, size = 24 }) {
  items.forEach((it, i) => {
    const yy = y + i * gap;
    addRect(parent, x, yy + size * 0.4, 12, 12, accent, 3);
    addText(parent, it, { x: x + 30, y: yy, size, style: "Regular", color: TH.body, w: w - 30, lh: size * 1.35 });
  });
}

// NUMBERED ROW - for agenda / TOC.
function numberedRow(parent, { x, y, w = 1500, n, title, desc, accent = LEAD }) {
  addText(parent, String(n).padStart(2, "0"), { x, y, size: 40, style: "Bold", color: accent, w: 80 });
  addText(parent, title, { x: x + 100, y: y + 2, size: 32, style: "Semi Bold", color: TH.title, w: w - 100 });
  if (desc) addText(parent, desc, { x: x + 100, y: y + 44, size: 19, style: "Regular", color: TH.meta, w: w - 100 });
  addRect(parent, x, y + 92, w, 1, TH.hairline, 0);  // hairline separator
}

// STATEMENT - cover-bg, one big centered sentence.
function statementSlide({ text, attribution, accent = LEAD }) {
  const s = newSlide("cover");
  accentRule(s, 860, 360, accent, 200);
  addText(s, text, { x: 280, y: 420, size: 56, style: "Bold", color: TH.onCover, w: 1360, align: "CENTER", lh: 70 });
  if (attribution) addText(s, attribution, { x: 280, y: 760, size: 22, style: "Regular", color: TH.onCoverMuted, w: 1360, align: "CENTER" });
  return s;
}

// CLOSING - cover-bg, big thank-you + contact/next-steps lines.
function closingSlide({ title, lines = [], accent = LEAD, eyebrow = "CẢM ƠN" }) {
  const s = newSlide("cover");
  addRect(s, 0, 0, 10, SH, accent, 0);                 // accent edge strip
  addText(s, eyebrow, { x: MX, y: 380, size: 18, style: "Bold", color: accent, track: 2, upper: true });
  accentRule(s, MX, 418, accent, 72);
  addText(s, title, { x: MX, y: 450, size: 80, style: "Bold", color: TH.onCover, w: 1500, lh: 84 });
  lines.forEach((l, i) => addText(s, l, { x: MX, y: 700 + i * 40, size: 22, style: "Regular", color: TH.onCoverMuted, w: 1400 }));
  return s;
}

// ---- card edge anchors (for architecture-slide connectors; see figma-topology)
const rightOf  = c => ({ x: c.x + c.width,     y: c.y + c.height / 2 });
const leftOf   = c => ({ x: c.x,               y: c.y + c.height / 2 });
const topOf    = c => ({ x: c.x + c.width / 2, y: c.y });
const bottomOf = c => ({ x: c.x + c.width / 2, y: c.y + c.height });

// Column x-positions for a row of N cards across the 1680px content band.
function cols(n, gutter = 32) {
  const total = SW - MX * 2;                  // 1680
  const w = (total - gutter * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: MX + i * (w + gutter), w }));
}

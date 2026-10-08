// ============================================================================
// figma-topology helpers - paste this whole block at the top of a use_figma
// script, then compose your diagram by calling card()/clusterContainer()/etc.
// Requires Inter fonts loaded first (see design-tokens.md).
// All functions return the created node so you can read .x/.y/.width/.height
// for connector routing. Keep a `nodes` map: nodes.users = card(...).
// ============================================================================

const T = {
  cardBg: "#FFFFFF", cardBorder: "#E1E8E8", frameBg: "#FFFFFF",
  frameBorder: "#E5EBEB", panelBg: "#F8FAFA", panelBorder: "#E1E8E8",
  title: "#1C2B33", meta: "#5F6F73", line: "#98A9AC",
  cat: {
    NETWORKING: "#7C5CE0", COMPUTE: "#EA7A1F", SECURITY: "#E0483F",
    DATABASE: "#3B7DDD", STORAGE: "#2FB36A", BLOCKCHAIN: "#D9488F",
    USERS: "#1C2B33", ACCESS: "#1C2B33",
  },
};

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255 };
}
const fill = (hex, a = 1) => [{ type: "SOLID", color: hexToRgb(hex), opacity: a }];

function text(str, { x, y, size = 11, bold = false, color = T.meta, w, track = 0, upper = false }) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: bold ? "Bold" : "Regular" };
  t.fontSize = size;
  t.characters = upper ? str.toUpperCase() : str;
  if (track) t.letterSpacing = { value: track, unit: "PIXELS" };
  t.fills = fill(color);
  if (w) { t.textAutoResize = "HEIGHT"; t.resize(w, t.height); }
  t.x = x; t.y = y;
  return t;
}

const CARD_SHADOW = { type:"DROP_SHADOW", color:{r:0.058,g:0.102,b:0.18,a:0.10},
  offset:{x:0,y:2}, radius:6, spread:0, visible:true, blendMode:"NORMAL" };

// Icon tile with a white SVG glyph. svg = string from icons.md (or null for a letter).
function iconTile(parent, x, y, colorHex, svg, size = 44, glyph = 25) {
  const tile = figma.createRectangle();
  tile.resize(size, size); tile.x = x; tile.y = y;
  tile.cornerRadius = Math.round(size * 0.23);
  tile.fills = fill(colorHex);
  parent.appendChild(tile);
  if (svg) {
    const node = figma.createNodeFromSvg(svg);   // glyph must be white in the SVG
    node.resize(glyph, glyph);
    node.x = x + (size - glyph) / 2; node.y = y + (size - glyph) / 2;
    parent.appendChild(node);
  }
  return tile;
}

// Standard node card. Returns the card frame (absolute-positioned).
// opts: { x, y, w=268, h=118, category, title, meta=[], svg, dark=false }
function card(parent, opts) {
  const { x, y, w = 268, h = 118, category, title, meta = [], svg } = opts;
  const accent = T.cat[category] || opts.color || "#67777A";
  const f = figma.createFrame();
  f.name = title; f.resize(w, h); f.x = x; f.y = y;
  f.cornerRadius = 12; f.fills = fill(T.cardBg);
  f.strokes = fill(T.cardBorder); f.strokeWeight = 1;
  f.effects = [CARD_SHADOW]; f.clipsContent = false;
  parent.appendChild(f);
  iconTile(f, 15, 15, accent, svg, 44, 25);
  f.appendChild(text(category, { x: 71, y: 17, size: 9.5, bold: true, color: accent, track: 0.6, upper: true }));
  f.appendChild(text(title, { x: 71, y: 30, size: 13.5, bold: true, color: T.title, w: w - 82 }));
  meta.forEach((m, i) => f.appendChild(text(m, { x: 71, y: 53 + i * 15, size: 11, color: T.meta, w: w - 82 })));
  return f;
}

// Compact list row (icon-left, title + inline meta) - used for VM lists in columns.
// opts: { x, y, w=390, h=58, category, title, meta, svg }
function listRow(parent, opts) {
  const { x, y, w = 390, h = 58, category, title, meta = "", svg } = opts;
  const accent = T.cat[category] || opts.color || "#67777A";
  const f = figma.createFrame();
  f.name = title; f.resize(w, h); f.x = x; f.y = y;
  f.cornerRadius = 10; f.fills = fill(T.cardBg);
  f.strokes = fill(T.cardBorder); f.strokeWeight = 1; f.effects = [CARD_SHADOW]; f.clipsContent = false;
  parent.appendChild(f);
  iconTile(f, 12, 12, accent, svg, 34, 19);
  f.appendChild(text(title, { x: 58, y: 12, size: 13, bold: true, color: T.title, w: 200 }));
  if (meta) f.appendChild(text(meta, { x: 58, y: 33, size: 11, color: T.meta, w: 200 }));
  return f;
}

// Cluster container panel with an overlapping pill tab on its top-left border.
// opts: { x, y, w, h, label, accent="#1C2B33", dashed=false }
function clusterContainer(parent, opts) {
  const { x, y, w, h, label, accent = "#1C2B33", dashed = false } = opts;
  const panel = figma.createFrame();
  panel.name = label; panel.resize(w, h); panel.x = x; panel.y = y;
  panel.cornerRadius = 16; panel.clipsContent = false;
  panel.fills = dashed ? [{ type:"SOLID", color: hexToRgb(accent), opacity: 0.03 }] : fill(T.panelBg);
  panel.strokes = fill(dashed ? accent : T.panelBorder);
  panel.strokeWeight = dashed ? 2 : 1;
  if (dashed) panel.dashPattern = [6, 6];
  parent.appendChild(panel);
  // pill tab
  const tab = figma.createFrame();
  tab.layoutMode = "HORIZONTAL"; tab.primaryAxisSizingMode = "AUTO"; tab.counterAxisSizingMode = "AUTO";
  tab.paddingLeft = 16; tab.paddingRight = 16; tab.paddingTop = 9; tab.paddingBottom = 9;
  tab.cornerRadius = 8; tab.fills = fill(accent); tab.x = x + 16; tab.y = y - 16;
  const tt = text(label, { x: 0, y: 0, size: 10, bold: true, color: "#FFFFFF", track: 0.5, upper: true });
  tab.appendChild(tt); parent.appendChild(tab);
  return panel;
}

// Pre-oriented arrowhead SVGs (filled #98A9AC) - no rotation math needed.
const ARROW = {
  right: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M2 1 L11 6 L2 11 Z" fill="#98A9AC"/></svg>`,
  left:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M10 1 L1 6 L10 11 Z" fill="#98A9AC"/></svg>`,
  down:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M1 2 L11 2 L6 11 Z" fill="#98A9AC"/></svg>`,
  up:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M1 10 L11 10 L6 1 Z" fill="#98A9AC"/></svg>`,
};

// Orthogonal connector (horizontal OR vertical) between two edge points.
// Shaft = 2px rounded rectangle; arrowhead = pre-oriented SVG triangle at `to`.
// from/to: { x, y } in the SAME coordinate space as `parent`'s children.
// dir: "H" or "V". Routing must be straight on one axis - pick edges accordingly.
function connector(parent, from, to, { label = "", dir = "H" } = {}) {
  const shaft = figma.createRectangle();
  shaft.fills = fill(T.line); shaft.cornerRadius = 1;
  const dx = to.x - from.x, dy = to.y - from.y;
  if (dir === "H") { shaft.resize(Math.max(Math.abs(dx) - 8, 1), 2); shaft.x = Math.min(from.x, to.x); shaft.y = from.y - 1; }
  else            { shaft.resize(2, Math.max(Math.abs(dy) - 8, 1)); shaft.x = from.x - 1; shaft.y = Math.min(from.y, to.y); }
  parent.appendChild(shaft);
  const headSvg = dir === "H" ? (dx >= 0 ? ARROW.right : ARROW.left) : (dy >= 0 ? ARROW.down : ARROW.up);
  const head = figma.createNodeFromSvg(headSvg);
  head.resize(11, 11);
  if (dir === "H") { head.x = to.x - (dx >= 0 ? 11 : 0); head.y = to.y - 5.5; }
  else             { head.x = to.x - 5.5; head.y = to.y - (dy >= 0 ? 11 : 0); }
  parent.appendChild(head);
  if (label) {
    const pill = figma.createFrame();
    pill.layoutMode = "HORIZONTAL"; pill.primaryAxisSizingMode = "AUTO"; pill.counterAxisSizingMode = "AUTO";
    pill.paddingLeft = 6; pill.paddingRight = 6; pill.paddingTop = 3; pill.paddingBottom = 3;
    pill.cornerRadius = 6; pill.fills = fill("#FFFFFF");
    pill.strokes = fill(T.cardBorder); pill.strokeWeight = 1;
    pill.appendChild(text(label, { x: 0, y: 0, size: 11, color: T.meta }));
    parent.appendChild(pill);
    pill.x = (from.x + to.x) / 2 - pill.width / 2;
    pill.y = (from.y + to.y) / 2 - pill.height / 2;
  }
  return line;
}

// Full-width summary / legend bar (Topology-1 footer style).
// opts: { x, y, w, h=104, category, eyebrow, title, meta=[], svg }
function summaryBar(parent, opts) {
  const { x, y, w, h = 104, category, eyebrow, title, meta = [], svg } = opts;
  const accent = T.cat[category] || opts.color || "#67777A";
  const f = figma.createFrame();
  f.name = title; f.resize(w, h); f.x = x; f.y = y;
  f.cornerRadius = 12; f.fills = fill(T.cardBg);
  f.strokes = fill(T.cardBorder); f.strokeWeight = 1; f.effects = [CARD_SHADOW]; f.clipsContent = false;
  parent.appendChild(f);
  iconTile(f, 16, 16, accent, svg, 46, 26);
  f.appendChild(text(eyebrow, { x: 76, y: 18, size: 9.5, bold: true, color: accent, track: 0.6, upper: true }));
  f.appendChild(text(title, { x: 76, y: 31, size: 15, bold: true, color: T.title, w: w - 96 }));
  meta.forEach((m, i) => f.appendChild(text(m, { x: 76, y: 55 + i * 16, size: 11, color: T.meta, w: w - 96 })));
  return f;
}

// Helper to get edge anchor points of a card for routing.
const right  = c => ({ x: c.x + c.width,     y: c.y + c.height / 2 });
const left   = c => ({ x: c.x,               y: c.y + c.height / 2 });
const top    = c => ({ x: c.x + c.width / 2, y: c.y });
const bottom = c => ({ x: c.x + c.width / 2, y: c.y + c.height });

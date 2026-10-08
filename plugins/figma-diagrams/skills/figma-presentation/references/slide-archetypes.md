# Slide archetypes - layout recipes

Each archetype = a layout + the helper calls that build it. All coordinates assume a
1920×1080 slide and the helpers in `helpers.js` (already pasted at the top of your
script). Set the deck's lead accent once: `LEAD = C.cat.NETWORKING;` (or whatever fits).

Build order for ANY slide: create the slide (helper does this) → background is painted →
add body content in the y≈300..980 region → footer (scaffold adds it). Append-first is
handled inside the helpers; if you add raw nodes, use `addFrame/addRect/addText`.

---

## 1. Cover (slate)
```js
coverSlide({
  eyebrow: "ACME · HẠ TẦNG PRODUCTION",
  title: "Đánh giá An toàn Hạ tầng\n& Lộ trình Khắc phục",
  subtitle: "Báo cáo kỹ thuật trình Ban Lãnh đạo - Tháng 6/2026",
  footerLeft: "Acme", footerRight: "Bảo mật · Nội bộ",
  ghost: "VD",                     // faint oversized mark, dimmed automatically
});
```
Big title can hold a `\n`. Keep to ≤2 lines.

## 2. Section divider (slate)
```js
sectionDivider({ number: 2, title: "Hiện trạng & Rủi ro", subtitle: "Bốn nhóm vấn đề trọng yếu" });
```
The padded ghost number (`02`) sits dimmed behind the title.

## 3. Agenda / TOC (light)
```js
const s = contentScaffold({ eyebrow: "NỘI DUNG", title: "Chương trình", footerDeck: "Acme Infra", footerSection: "Mở đầu", page: 2 });
const rows = [
  { n:1, title:"Bối cảnh & mục tiêu",     desc:"Vì sao cần làm ngay" },
  { n:2, title:"Hiện trạng & rủi ro",     desc:"Bốn nhóm vấn đề" },
  { n:3, title:"Lộ trình 3 giai đoạn",    desc:"Quick-win → nền tảng → trưởng thành" },
  { n:4, title:"Nguồn lực & cam kết",     desc:"Thời gian, chi phí, KPI" },
];
rows.forEach((r, i) => numberedRow(s, { x: MX, y: 320 + i * 150, ...r }));
```

## 4. Statement / thesis (slate)
```js
statementSlide({ text: "“4 cơ sở dữ liệu đang mở IP công khai ra Internet, không TLS.”", attribution: "Kết quả rà soát 22/06/2026" });
```

## 5. Bullet + cards (light) - the default content slide
```js
const s = contentScaffold({ eyebrow: "RỦI RO", title: "Bốn nhóm vấn đề trọng yếu", footerDeck:"Acme Infra", footerSection:"Hiện trạng", page: 5 });
const c = cols(4);               // 4 columns across the content band
infoCard(s, { x:c[0].x, y:320, w:c[0].w, category:"SECURITY", title:"DB public-IP", meta:["4 cluster mở Internet","Không TLS"], svg: ICONS.shield });
infoCard(s, { x:c[1].x, y:320, w:c[1].w, category:"SECURITY", title:"Secrets plaintext", meta:["ConfigMap không mã hoá"], svg: ICONS.key });
infoCard(s, { x:c[2].x, y:320, w:c[2].w, category:"NETWORKING", title:"DNS-only Cloudflare", meta:["Mất lớp WAF/CDN"], svg: ICONS.network });
infoCard(s, { x:c[3].x, y:320, w:c[3].w, category:"COMPUTE", title:"K8s 1.23 EOL", meta:["Hết vá bảo mật"], svg: ICONS.k8s });
```
Use 2-4 cards. For 2-3 wider cards add a second meta-rich card or a `bulletList` beside.

## 6. Stat band (light) - KPIs / metrics
```js
const s = contentScaffold({ eyebrow:"SỐ LIỆU", title:"Quy mô hệ thống", page: 6 });
const c = cols(4);
statCard(s, { x:c[0].x, y:360, w:c[0].w, number:"13", label:"Backend services", accent:C.cat.COMPUTE });
statCard(s, { x:c[1].x, y:360, w:c[1].w, number:"45", label:"Image production",  accent:C.cat.STORAGE });
statCard(s, { x:c[2].x, y:360, w:c[2].w, number:"4",  label:"DB phơi Internet",  accent:C.cat.SECURITY });
statCard(s, { x:c[3].x, y:360, w:c[3].w, number:"2 năm", label:"Vận hành thật",  accent:C.cat.NETWORKING });
```

## 7. Two-column (light) - text left, visual/cards right
```js
const s = contentScaffold({ eyebrow:"BỐI CẢNH", title:"Vì sao cần làm ngay", page: 4 });
bulletList(s, { x: MX, y: 340, w: 720, items:[
  "Hệ thống kinh doanh thật, vận hành 2 năm.",
  "Mặt tấn công đang mở rộng theo thời gian.",
  "Chi phí khắc phục tăng nếu trì hoãn.",
]});
// right column: one tall infoCard or an embedded image/diagram
infoCard(s, { x: 940, y: 320, w: 860, h: 560, category:"SECURITY", title:"Ưu tiên cao nhất", meta:["Đóng public-IP DB","Bật TLS","Rotate secrets"], svg: ICONS.shield });
```

## 8. Comparison (light) - 2-3 columns compared
Use `infoCard`s of equal height in a `cols(2)`/`cols(3)`, each with a header pill
(`pill(card,{...})`) for the option name, and a `bulletList` of pros/cons inside.

## 9. Roadmap / timeline (light)
```js
const s = contentScaffold({ eyebrow:"LỘ TRÌNH", title:"Ba giai đoạn khắc phục", page: 8 });
const c = cols(3);
phaseCard(s, { x:c[0].x, y:340, w:c[0].w, phase:"GĐ 1 · 0-1 THÁNG", title:"Quick-win", items:["Đóng public-IP DB","Bật TLS","Rotate secrets"], status:"Ưu tiên cao", accent:C.cat.SECURITY });
phaseCard(s, { x:c[1].x, y:340, w:c[1].w, phase:"GĐ 2 · 1-3 THÁNG", title:"Nền tảng",  items:["Nâng K8s","Network policy","Vault"], status:"Kế tiếp", accent:C.cat.NETWORKING });
phaseCard(s, { x:c[2].x, y:340, w:c[2].w, phase:"GĐ 3 · 3-6 THÁNG", title:"Trưởng thành", items:["Observability","DR drill","Audit định kỳ"], status:"Mục tiêu", accent:C.cat.STORAGE });
// optional baseline connector beneath the row of cards (reuse topology connector style)
```

## 10. Architecture (light) - embedded topology
This is where `figma-presentation` meets `figma-topology`. On a light content slide,
drop topology cards + connectors. The tokens are identical, so paste the topology
`card()/clusterContainer()/connector()` helpers too (or use `infoCard` + the edge
anchors `leftOf/rightOf/topOf/bottomOf` from `helpers.js`). Keep the diagram inside the
y≈300..980 band, centered. Scale topology cards down ~15% if the diagram is dense.

## 11. Table / matrix (light)
```js
const s = contentScaffold({ eyebrow:"ĐỐI SOÁT", title:"Ma trận rủi ro", page: 7 });
// header band
const headers = ["Hạng mục","Mức độ","Ảnh hưởng","Hành động"];
const colW = [620, 200, 460, 400]; let cx = MX;
const head = addFrame(s, MX, 320, 1680, 64, C.slate, 10);
let hx = 0; headers.forEach((h, i) => { addText(head, h, { x: 24 + hx, y: 20, size: 18, style:"Bold", color:"#FFFFFF" }); hx += colW[i]; });
// rows: alternate white / faint fill, hairline separators; severity as a status pill
```
Keep [HIGH]/[MEDIUM]/[LOW] severity labels in English (user convention). Use status
colors: `C.cat.NEGATIVE` / `C.cat.WARNING` / `C.cat.SUCCESS`.

## 12. Closing (slate)
```js
closingSlide({ title: "Sẵn sàng triển khai\nngay giai đoạn 1.", lines:["Liên hệ: nhóm Hạ tầng - Acme","Tài liệu chi tiết: kèm theo deck"] });
```

---

## Theme the deck once (after create_new_file)
A new Slides file ships a default light theme. Set the background + theme fonts to Inter
so any auto-created text matches, then build with helpers (which set fonts explicitly
anyway). Don't rely on the default theme tokens - every helper sets its own fills/fonts.

## Layout variety checklist
Read the deck outline straight through. If three+ content slides in a row are all
"title + card row", break them up: insert a slate divider, swap one for a stat band, a
two-column, or a statement. The slate/light alternation is the deck's rhythm - use it.

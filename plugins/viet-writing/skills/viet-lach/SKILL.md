---
name: viet-lach
description: >
  Viết lách tài liệu, slide, báo cáo tiếng Việt (và song ngữ) theo 9 cấu trúc chuẩn (Diátaxis, Pyramid/Minto, Inverted Pyramid, SCQA, PREP, README, Runbook/SOP, ADR, Slide Narrative). Có 6 format output (slide, markdown doc, report PDF, Confluence/Notion, email/memo, spec/RFC), 6 domain preset (kỹ thuật/DevOps, hướng dẫn người dùng cuối, báo cáo quản lý/BOD, đề xuất khách hàng, đào tạo, API/developer), thư viện opener, văn phong kỹ thuật và kỹ thuật biên tập. Render qua doc-builder (HTML/PDF) và figma-presentation (slide).
  TRIGGERS: "viết tài liệu", "viết README", "viết hướng dẫn", "viết runbook", "viết SOP", "viết spec", "viết RFC", "viết ADR", "viết đề xuất", "viết proposal", "viết báo cáo", "viết slide", "viết thuyết trình", "soạn slide", "làm slide tiếng việt", "tài liệu bàn giao", "cấu trúc tài liệu", "viết executive summary", "Diátaxis", "Minto Pyramid", "SCQA", "PREP", "viết lách".
  Dùng khi cần VIẾT hoặc CẤU TRÚC tài liệu, hướng dẫn, báo cáo, slide, spec. Không dùng cho content bán hàng/quảng cáo.
---

# Công Thức Viết Tài Liệu & Slide: Structure + Format + Domain + Văn phong VN

Skill này lo phần VIẾT LÁCH: cấu trúc thông tin, dòng lập luận, câu chữ, văn phong. Nó KHÔNG tự render đẹp. Khi cần xuất bản đẹp thì bàn giao:

- **Slide đẹp trong Figma** → skill `figma-presentation`
- **Report HTML/PDF consultant-grade** → skill `doc-builder`
- **Sơ đồ kiến trúc/topology** → skill `figma-topology`

Trình tự chuẩn: skill này viết ra nội dung + cấu trúc (Markdown), rồi hand off cho skill render tương ứng. Xem `references/formats/` để biết cách bàn giao.

## Smart Loading Rules (QUAN TRỌNG, đọc trước mọi tác vụ)

Để tối ưu token, KHÔNG load tự động mọi reference. Tuân thủ quy tắc sau.

### Auto-load (mặc định)

1. **`references/glossary.md`** (~3KB): luôn auto-load. Định nghĩa nguyên tắc viết rõ (clarity) + kiến trúc thông tin dùng xuyên mọi cấu trúc. File nhỏ, hữu ích mọi lần.
2. **`references/vietnamese-style.md`** (~4KB): auto-load khi output là tiếng Việt (mặc định). Quy tắc thuật ngữ Anh/Việt, register, dấu câu, số, và danh sách "AI-tell" cần tránh. Bỏ qua nếu user yêu cầu viết thuần tiếng Anh.

### Load on-demand theo signal

3. **`references/INDEX.md`**: load khi user CHƯA chỉ định cấu trúc cụ thể. Đọc INDEX để chọn cấu trúc nhanh dựa trên mục đích + audience + độ dài + medium.
4. **`references/structures/[tên].md`**: load core file của cấu trúc ĐÃ CHỌN.
5. **`references/examples/[tên].md`**: load khi user yêu cầu viết tài liệu thật (không chỉ hỏi lý thuyết), hoặc cần ví dụ để inspire.
6. **`references/formats/[format].md`**: load khi biết medium đích. Detect keyword:
   - "slide", "thuyết trình", "deck", "trình chiếu", "PowerPoint", "Figma Slides" → `formats/slide.md`
   - "README", "markdown", "docs repo", "wiki repo", ".md" → `formats/markdown-doc.md`
   - "report", "PDF", "báo cáo đẹp", "one-pager", "in ra" → `formats/report-pdf.md`
   - "Confluence", "Notion", "wiki công ty", "knowledge base" → `formats/confluence-notion.md`
   - "email", "memo", "thông báo", "announcement" → `formats/email-memo.md`
   - "spec", "RFC", "design doc", "technical spec" → `formats/spec-rfc.md`
7. **`references/domains/[domain].md`**: load khi biết chủ đề/audience. Detect keyword:
   - "hạ tầng", "DevOps", "Docker", "K8s", "deploy", "server", "CI/CD", "bàn giao kỹ thuật" → `domains/technical-devops.md`
   - "hướng dẫn sử dụng", "người dùng cuối", "end user", "khách dùng", "cách dùng app" → `domains/end-user-guide.md`
   - "báo cáo sếp", "BOD", "ban lãnh đạo", "quản lý", "management", "tiến độ dự án" → `domains/management-report.md`
   - "đề xuất", "proposal", "SOW", "chào giá kỹ thuật", "khách hàng" → `domains/proposal-client.md`
   - "đào tạo", "training", "khóa học", "onboarding nhân sự", "giáo trình" → `domains/training-education.md`
   - "API", "developer", "SDK", "endpoint", "reference tech" → `domains/api-developer.md`
8. **`references/hooks-openers.md`** (~5KB): load khi cần (a) đặt tiêu đề mạnh, (b) mở đầu tài liệu/slide/email, (c) viết TL;DR hoặc executive summary, (d) bí ý tưởng mở bài.
9. **`references/toolkit.md`** (~6KB): load khi cần biên tập sâu (cắt gọt, viết lại cho rõ), quyết định trình bày (bảng vs prose vs sơ đồ vs list), xử lý nội dung phức tạp, hoặc kiểm tra chất lượng cuối.

### Quy tắc tóm tắt

| Use case | Files load |
|----------|-----------|
| "Diátaxis là gì?" | SKILL + glossary + structures/diataxis.md |
| "Viết README cho repo này" | SKILL + glossary + vietnamese-style + structures/readme.md + examples/readme.md + domains/technical-devops.md + formats/markdown-doc.md |
| "Viết runbook deploy stack Docker" | SKILL + glossary + vietnamese-style + structures/runbook.md + domains/technical-devops.md + formats/markdown-doc.md |
| "Làm slide báo cáo tiến độ cho sếp" | SKILL + glossary + vietnamese-style + INDEX + structures/pyramid.md + structures/slide-narrative.md + domains/management-report.md + formats/slide.md |
| "Viết đề xuất kỹ thuật cho khách" | SKILL + glossary + vietnamese-style + structures/scqa.md + examples/scqa-proposal.md + domains/proposal-client.md + formats/report-pdf.md |
| "Đặt 5 tiêu đề cho tài liệu này" | SKILL + glossary + hooks-openers.md |
| "Ghi lại quyết định chọn HAProxy thay Nginx" | SKILL + glossary + structures/adr.md + examples/adr.md + domains/technical-devops.md |

KHÔNG load tất cả files. Chỉ load đúng file cần.

## Quy trình bắt buộc

### Bước 1: Thu thập bối cảnh + Xác định mục tiêu

Trước khi viết, cần biết tối thiểu:

| Thông tin | Lý do |
|-----------|-------|
| Mục tiêu tài liệu | Người đọc xong PHẢI làm/hiểu được gì (1 câu) |
| Đối tượng đọc | Trình độ, vai trò, thứ họ đã biết vs chưa biết |
| Loại việc người đọc cần | Học lần đầu, làm theo bước, tra cứu, hay hiểu vì sao (map sang Diátaxis) |
| Độ dài + medium | Slide, README, report PDF, email, spec (chọn format preset) |
| Domain / chủ đề | Để load domain preset, dùng đúng từ vựng và quy ước |
| Nguồn nội dung có sẵn | File, code, ghi chú, số liệu để không bịa |
| Ngôn ngữ + register | Tiếng Việt/Anh/song ngữ, trang trọng hay thân thiện |

Nếu user chưa cung cấp đủ → hỏi ngắn gọn, CHỈ hỏi cái thiếu và ảnh hưởng đến cấu trúc. Nếu có sẵn code/file trong repo → đọc để lấy sự thật thay vì hỏi.

**Nguyên tắc chống bịa (QUAN TRỌNG với tài liệu kỹ thuật):** Không bịa lệnh, cờ, tên file, số phiên bản, kết quả. Nếu chưa chắc, đọc source (code, config, log) hoặc đánh dấu `[[cần xác nhận]]` để user điền, đừng đoán liều.

### Bước 2: Chọn cấu trúc

**Nếu user chỉ định cấu trúc** → dùng đúng cấu trúc đó.

**Nếu user KHÔNG chỉ định** → load `references/INDEX.md`, chọn theo bảng "mục đích × loại việc người đọc cần × độ dài".

Có thể kết hợp: ví dụ 1 slide deck có thể dùng `slide-narrative` (dòng kể) lồng `pyramid` (kết luận trước) cho phần tóm tắt.

### Bước 3: Dựng outline TRƯỚC khi viết câu chữ

Đây là bước quyết định chất lượng. Với tài liệu, cấu trúc sai thì câu chữ hay cũng vô nghĩa.

**Quy trình:**

1. Viết **1 câu mục tiêu**: "Sau khi đọc, [ai] sẽ [làm/hiểu được gì]".
2. Dựng **outline theo cấu trúc đã chọn**: các heading + 1 dòng nội dung mỗi heading. Kiểm tra dòng chảy: mỗi phần dẫn tự nhiên sang phần sau (given-new).
3. Đánh dấu chỗ cần **bảng / sơ đồ / code block / ảnh** thay vì prose (xem `toolkit.md` khi cần).
4. Chốt **tiêu đề + câu mở đầu** (load `hooks-openers.md` nếu cần).

**Trình bày outline cho user trước khi viết (với tài liệu trung/dài hoặc slide):**

```
📐 Outline dự kiến:
- Mục tiêu: [1 câu]
- Cấu trúc: [tên] vì [lý do]
- Khung: [liệt kê heading/slide chính, mỗi cái 1 dòng]
- Sơ đồ/bảng cần: [nếu có]
```

Nếu user đồng ý → viết. Nếu tài liệu ngắn (email, 1 mục README, 1 answer) → có thể bỏ qua bước trình bày, viết luôn.

### Bước 4: Viết nội dung

Viết theo outline, áp dụng nguyên tắc viết rõ ở `glossary.md` và quy ước domain/format đã load. Mỗi phần: 1 ý chính, dẫn chứng/ví dụ cụ thể, chuyển ý mượt.

### Bước 5: Tự biên tập (bắt buộc)

Không có bản nào đúng ngay lần đầu. Trước khi giao:
- Đọc lại theo checklist của cấu trúc đã dùng.
- Cắt từ thừa, gộp câu, xoá lặp (kỹ thuật ở `toolkit.md`).
- Soát "AI-tell" và em dash (xem `vietnamese-style.md`).
- Kiểm tra sự thật kỹ thuật: lệnh/tên/số có khớp source không.

## Quy tắc viết (áp dụng mọi tài liệu)

1. **1 câu mục tiêu, 1 người đọc**: viết cho 1 đối tượng cụ thể với 1 việc cần đạt. Tài liệu "cho tất cả mọi người" không phục vụ ai.
2. **Kết luận/việc-cần-làm lên trước** (trừ tutorial dạy từ đầu): người đọc kỹ thuật quét chứ không đọc tuần tự. Đừng bắt họ đọc hết mới biết ý chính.
3. **Cụ thể thắng chung chung**: "chạy `docker compose up -d`, chờ ~40s tới khi 17 container healthy" > "khởi động hệ thống".
4. **Câu ngắn, đoạn ngắn**: trung bình 15-20 từ/câu, tối đa 3-4 câu/đoạn. Ý phức tạp thì tách bullet/bảng, đừng nhồi 1 câu dài.
5. **Chủ động, người thật làm**: "Bạn chạy lệnh sau" > "Lệnh sau cần được chạy". Ngôi xưng nhất quán trong 1 tài liệu.
6. **Song song hoá (parallelism)**: các mục cùng cấp cùng dạng ngữ pháp. Bullet cùng bắt đầu bằng động từ, heading cùng kiểu.
7. **Given-new**: câu sau nối vào thông tin câu trước đã nêu. Giới thiệu khái niệm trước khi dùng nó.
8. **Trình bày đúng công cụ**: bước tuần tự → list đánh số; so sánh nhiều chiều → bảng; luồng/kiến trúc → sơ đồ (figma-topology); lệnh/output → code block. Đừng mô tả bằng prose cái mà bảng/sơ đồ nói rõ hơn.
9. **Signposting**: heading nói đúng nội dung bên dưới, có TL;DR cho tài liệu dài, có "điều kiện tiên quyết" trước khi bắt người ta làm.
10. **Nhất quán thuật ngữ**: 1 khái niệm 1 tên xuyên suốt. Không lúc "máy chủ" lúc "server" lúc "node" cho cùng 1 thứ (trừ khi cố ý chú thích).
11. **Không bịa**: xem Bước 1. Chưa chắc thì đánh dấu, không đoán.
12. **KHÔNG em dash + KHÔNG AI-tell**: tuyệt đối không dùng ký tự em dash (U+2014) hay en dash (U+2013) giữa câu. Ngắt câu dùng dấu chấm hoặc phẩy. Gạch ngang ngắn (-) chỉ dùng cho: (a) đầu bullet, (b) từ ghép/khoảng số ("CI-CD", "3-5 ngày"). Tránh giọng văn AI sáo rỗng (xem danh sách ở `vietnamese-style.md`).

## Định dạng output

Với tài liệu, xuất **nội dung Markdown sạch, sẵn sàng dùng** (không bọc trong khối giải thích dài dòng). Trước khối nội dung, 1 header meta ngắn:

```
📄 [Tên tài liệu]
Cấu trúc: [tên] | Format: [format] | Domain: [nếu có] | Người đọc: [ai]

---

[NỘI DUNG TÀI LIỆU DẠNG MARKDOWN]
```

Với **slide**: xuất outline từng slide (tiêu đề + 3-5 gạch nội dung + ghi chú người trình bày nếu cần), rồi hỏi user có muốn hand off cho `figma-presentation` để render không.

Với **report/proposal cần đẹp**: xuất Markdown, rồi đề xuất hand off cho `doc-builder`.

**Lưu ý:**
1. Quy tắc KHÔNG em dash áp dụng cho TOÀN BỘ output kể cả dòng meta-header (dùng dấu `|` hoặc `,` để ngăn cách, không dùng `-`).
2. Nếu tài liệu dài, xuất theo phần và hỏi trước khi viết tiếp, tránh đổ 1 khối khổng lồ.
3. Nếu user yêu cầu song ngữ, viết tiếng Việt trước, tiếng Anh sau, hoặc theo layout user chỉ định.

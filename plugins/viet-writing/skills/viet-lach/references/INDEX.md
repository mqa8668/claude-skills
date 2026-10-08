# INDEX 9 cấu trúc tài liệu, Router chọn nhanh

Đọc file này TRƯỚC khi load structure cụ thể, khi user chưa chỉ định cấu trúc. Mỗi cấu trúc 1 dòng, đủ để chọn nhanh.

## Bảng chọn cấu trúc theo mục đích

| # | Cấu trúc | Khi dùng | Người đọc cần | Độ dài | Medium hay đi kèm |
|---|----------|----------|---------------|--------|-------------------|
| 1 | Diátaxis | Phân loại đúng loại tài liệu trước khi viết (Tutorial / How-to / Reference / Explanation) | Học, làm, tra, hiểu | Mọi | Docs repo, wiki |
| 2 | Pyramid (Minto) | Báo cáo, tóm tắt cho sếp, đưa kết luận trước rồi mới lý do | Ra quyết định nhanh | 1-5 trang | Report, slide, email |
| 3 | Inverted Pyramid | Thông báo, release notes, changelog, tin quan trọng lên đầu | Nắm tin nhanh, đọc thêm nếu cần | Ngắn-Trung | Email, announcement |
| 4 | SCQA | Đề xuất, brief, khung hoá vấn đề trước khi đề giải pháp | Bị thuyết phục theo logic | 1-10 trang | Proposal, slide mở đầu |
| 5 | PREP | Trả lời/giải thích ngắn gọn, 1 bullet slide, 1 câu trả lời có lập luận | Hiểu 1 luận điểm nhanh | Đoạn ngắn | Slide, comment, FAQ |
| 6 | README | Tài liệu gốc của repo/dự án phần mềm | Bắt đầu dùng dự án | 1-3 trang | Markdown repo |
| 7 | Runbook / SOP | Quy trình vận hành lặp lại, xử lý sự cố, bàn giao thao tác | Làm đúng từng bước, không sai | Trung | Markdown, wiki |
| 8 | ADR | Ghi lại 1 quyết định kiến trúc/kỹ thuật và lý do | Hiểu vì sao chọn thế | 1 trang | Markdown repo |
| 9 | Slide Narrative | Dựng dòng kể cho cả bộ slide thuyết trình | Theo dõi 1 câu chuyện | Deck | Figma Slides |

## Quy tắc chọn nhanh

1. **Chưa biết viết loại gì** → đọc `structures/diataxis.md` trước. Nó phân loại 4 loại tài liệu (dạy, hướng dẫn thao tác, tra cứu, giải thích) và cấm trộn lẫn. Đây là bước phân loại gốc.
2. **Báo cáo / tóm tắt cho lãnh đạo** → Pyramid (Minto). Kết luận + đề xuất lên đầu, chi tiết xuống dưới.
3. **Thông báo, release notes, changelog** → Inverted Pyramid. Cái quan trọng nhất câu đầu.
4. **Thuyết phục (đề xuất, xin duyệt, pitch kỹ thuật)** → SCQA. Dựng bối cảnh, va chạm, câu hỏi, rồi trả lời bằng giải pháp.
5. **Trả lời ngắn / 1 luận điểm / 1 bullet slide** → PREP.
6. **Tài liệu mở đầu cho phần mềm/repo** → README.
7. **Quy trình thao tác lặp lại, xử lý sự cố, checklist vận hành** → Runbook/SOP.
8. **Chốt 1 quyết định kỹ thuật cho hậu thế** → ADR.
9. **Cả bộ slide thuyết trình** → Slide Narrative (dựng dòng kể tổng), rồi từng slide dùng Pyramid hoặc PREP.

## Kết hợp thường gặp

- **Slide báo cáo tiến độ**: Slide Narrative (khung deck) + Pyramid (slide tóm tắt đầu) + PREP (từng slide nội dung).
- **Đề xuất khách hàng dạng report**: SCQA (khung lập luận) + Pyramid (executive summary) + Diátaxis Reference (phụ lục kỹ thuật).
- **Tài liệu bàn giao hệ thống**: README (tổng quan) + Runbook (vận hành) + ADR (các quyết định) + Diátaxis How-to (tác vụ lẻ).
- **Wiki nội bộ 1 tính năng**: Diátaxis (chia đúng 4 loại) + Inverted Pyramid (mỗi trang mở đầu bằng ý chính).

## Sau khi chọn

Load `references/structures/[tên].md` (core). Nếu user yêu cầu viết tài liệu thật, load thêm `references/examples/[tên].md` nếu có.

Tham khảo `references/glossary.md` cho nguyên tắc viết chung. Load `references/domains/[domain].md` nếu xác định được chủ đề. Load `references/formats/[format].md` nếu xác định được medium đích. Load `references/hooks-openers.md` khi cần tiêu đề/opener.

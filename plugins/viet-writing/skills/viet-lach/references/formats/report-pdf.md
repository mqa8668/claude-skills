# Format: Report / Proposal (PDF đẹp để in hoặc gửi khách / sếp)

## Đặc trưng

- Đọc tuyến tính từ đầu tới cuối, không quét kiểu dev đọc README.
- In được, cần chỉn chu: lề, font, màu nhấn nhất quán.
- Đối tượng là khách hàng hoặc lãnh đạo, thời gian đọc ít, kỳ vọng cao.
- Ấn tượng đầu quan trọng: cover và executive summary quyết định phần còn lại có được đọc không.

## Cấu trúc chuẩn

1. **Cover**: tên tài liệu, khách hàng, ngày, phiên bản.
2. **Executive summary**: kết luận, đề xuất, con số chính (áp `pyramid`).
3. **Thân bài**: bối cảnh, phân tích, giải pháp, lộ trình, chi phí.
4. **Phụ lục**: chi tiết kỹ thuật, bảng tham chiếu, giả định.

## Quy ước trình bày

- Viết Markdown SẠCH rồi bàn giao render, không tự căn chỉnh bằng tay.
- Một thông điệp mỗi trang, đừng dồn hai luận điểm lớn vào một trang.
- Số liệu có nguồn, ghi rõ mốc thời gian và đơn vị (Specificity).
- Executive summary đứng độc lập: đọc riêng nó vẫn nắm được quyết định.
- Ngôi xưng và thuật ngữ nhất quán toàn tài liệu (Consistency).

## Giới hạn / ngưỡng

- Executive summary tối đa 1 trang.
- Mỗi đoạn thân bài 3-4 câu, ý phức tạp tách bảng.

## Tránh

- Markdown-ism chỉ GitHub hiểu: task list `- [ ]`, @mention, emoji.
- ASCII diagram, bảng ký tự vẽ tay (vẽ sơ đồ bằng `figma-topology`).
- Tính từ tự khen không có số liệu đỡ.
- Nhồi chi tiết kỹ thuật vào thân bài, đẩy xuống phụ lục (Progressive disclosure).

## Bàn giao render

Hand off skill `doc-builder` để render HTML/PDF consultant-grade. Nó tự sanitize AI-tell và em dash, dùng 1 accent color, layout sạch. Đưa cho nó file Markdown hoàn chỉnh. Sơ đồ kiến trúc nhờ `figma-topology` xuất ảnh, chèn link ảnh vào Markdown để `doc-builder` nhúng.

## Cấu trúc (structure) ưu tiên

- `pyramid`: khung tổng và executive summary.
- `scqa`: phần lập luận thuyết phục (bối cảnh, va chạm, câu hỏi, giải pháp).
- `diataxis` Reference: phụ lục tra cứu kỹ thuật.

# Format: Email / Memo / Thông báo nội bộ

## Đặc trưng

- Đọc lướt trên mobile, giữa nhiều việc khác, chú ý rất ngắn.
- Subject quyết định người ta có mở hay không.
- Thường cần đúng một hành động: người đọc xong biết mình phải làm gì.
- Quét 10 giây phải nắm được ý, không thì bị bỏ qua.

## Cấu trúc chuẩn

1. **Subject**: rõ, cụ thể, nói đúng nội dung.
2. **Dòng đầu là BLUF**: kết luận hoặc việc cần làm ngay câu đầu tiên.
3. **Thân ngắn**: vài câu bối cảnh đủ để hiểu, không hơn.
4. **Hành động rõ**: ai làm gì, trước khi nào.
5. **P.S.** nếu cần nhấn một điểm dễ bị bỏ sót.

## Quy ước trình bày

- Subject <= ~50 ký tự, cụ thể ("Cần duyệt: mở port 443 cho demo.example.com trước T5", không "Về việc triển khai").
- Một hành động chính mỗi email, nhiều việc thì đánh số hoặc tách email.
- Đoạn 1-2 câu, xuống dòng thoáng để đọc trên mobile.
- Bold hoặc tách dòng riêng cho phần action (Scannability).

## Giới hạn / ngưỡng

- Body ngắn, đọc lướt 10 giây nắm được ý chính và việc cần làm.
- Vượt quá vài đoạn thì nội dung nên là tài liệu đính kèm, không phải email.

## Tránh

- Subject mơ hồ ("Update", "FYI", "Về việc...").
- Chôn action giữa bài, người đọc lướt qua là mất.
- Email dài như tài liệu, khi đó đính kèm doc riêng thay vì nhồi vào body.
- CC tràn lan làm loãng trách nhiệm, không rõ ai phải hành động.

## Bàn giao render

Không cần render. Email và memo đọc dạng text thuần. Nếu nội dung cần đẹp và dài, tách ra thành report và hand off `doc-builder`, email chỉ giữ phần BLUF và link tới doc.

## Cấu trúc (structure) ưu tiên

- `inverted-pyramid`: tin quan trọng câu đầu, chi tiết xuống sau.
- `pyramid`: khi cần lập luận ngắn có kết luận trước.
- BLUF (glossary): dòng đầu luôn là kết luận hoặc việc cần làm.

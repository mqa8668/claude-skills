# Format: Technical spec / RFC / Design doc

## Đặc trưng

- Viết để REVIEW trước khi build, không phải để mô tả cái đã xong.
- Cần đủ chi tiết để người khác phản biện được từng lựa chọn.
- Sống trong repo hoặc wiki, có vòng góp ý và bình luận.
- Người đọc là kỹ sư đồng cấp, họ tìm lỗ hổng trong thiết kế.

## Cấu trúc chuẩn

1. **Summary**: một đoạn nói đề xuất là gì và vì sao (BLUF).
2. **Motivation / Goals**: vấn đề cần giải, mục tiêu cụ thể.
3. **Non-goals**: cái cố ý không làm, để chốt phạm vi.
4. **Proposed design**: thiết kế chính, đánh số requirement (R1, R2...).
5. **Alternatives considered**: các phương án khác và lý do loại.
6. **Risks / Trade-offs**: rủi ro và đánh đổi, nêu thẳng.
7. **Rollout / Migration**: cách triển khai và di trú.
8. **Open questions**: câu hỏi để mở cho reviewer.

## Quy ước trình bày

- Goals và Non-goals nêu rõ ràng để chốt phạm vi trước khi bàn giải pháp.
- Đánh số requirement (R1, R2) để reviewer trích dẫn chính xác khi góp ý.
- Open questions để mở thật, không tự trả lời hết, đó là mời phản biện.
- Quyết định con tách ra `adr` riêng và link tới, không nhồi hết vào spec.

## Giới hạn / ngưỡng

- Summary gọn trong một đoạn.
- Mỗi phương án ở Alternatives nêu đủ ưu, nhược, lý do loại, không lan man.

## Tránh

- Mơ hồ scope, không tách Non-goals, để phạm vi trôi.
- Bỏ Alternatives, người đọc không biết đã cân nhắc gì.
- Giấu rủi ro, review xong mới lộ thì mất niềm tin.
- Viết như đã chốt. Spec là để bàn, dùng giọng đề xuất chứ không phải công bố.

## Bàn giao render

Sống trong repo hoặc wiki nên thường không cần render đẹp. Sơ đồ kiến trúc và luồng dữ liệu nhờ `figma-topology` xuất ảnh rồi nhúng, không vẽ ASCII.

## Cấu trúc (structure) ưu tiên

- `scqa`: khung phần Motivation (bối cảnh, va chạm, câu hỏi, giải pháp).
- `pyramid`: phần Summary và Proposed design, kết luận trước.
- `adr`: mỗi quyết định con tách ra và link.

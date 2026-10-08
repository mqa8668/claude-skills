# Thư viện Tiêu đề + Opener + TL;DR

Load khi cần đặt tiêu đề mạnh, mở đầu tài liệu/slide/email, viết TL;DR hoặc executive summary, hoặc bí ý mở bài. Tài liệu khác quảng cáo: mở đầu để định hướng và tạo tin, không để câu view.

## A. Nguyên tắc tiêu đề tài liệu

Tiêu đề tốt = người đọc biết ngay tài liệu này CHO AI, VỀ GÌ, GIÚP LÀM GÌ.

1. **Cụ thể hơn kêu**: "Hướng dẫn deploy full-stack FIDO2 lên AWS EC2" > "Tài liệu triển khai hệ thống".
2. **Bắt đầu bằng động từ cho tài liệu thao tác**: "Khôi phục Portal khi mất kết nối WG", "Cấu hình HAProxy 6 domain 1 cert".
3. **Danh từ cho tài liệu tra cứu**: "Tham chiếu biến môi trường `.env`", "Danh mục 17 container và vai trò".
4. **Nêu đối tượng nếu cần lọc**: "README cho người tiếp nhận bàn giao (không cần biết trước hệ thống)".
5. **Đánh số phiên bản/ngày nếu tài liệu sống**: "Sổ tay vận hành v3, cập nhật 07/2026".

## B. Mẫu tiêu đề theo loại tài liệu

| Loại | Khuôn tiêu đề | Ví dụ |
|------|---------------|-------|
| Tutorial | "Bắt đầu với X: [kết quả đạt được]" | "Bắt đầu với stack FIDO2: chạy được demo trong 15 phút" |
| How-to | "[Động từ] [đối tượng] [điều kiện]" | "Re-domain FIDO2 sang tên miền mới" |
| Reference | "Tham chiếu [đối tượng]" | "Tham chiếu lệnh `vm.sh` và `tf.sh`" |
| Explanation | "Vì sao [quyết định/thiết kế]" | "Vì sao dùng HAProxy single ingress thay Nginx" |
| Report | "[Chủ đề]: [kết luận/trạng thái]" | "Tiến độ AWS deploy: 4 domain public đã xanh E2E" |
| ADR | "ADR-NNN: [quyết định]" | "ADR-012: Chọn coturn hardened cho TURN relay" |
| Proposal | "Đề xuất [giải pháp] cho [khách/vấn đề]" | "Đề xuất hạ tầng FIDO2 on-demand trên AWS" |

## C. Opener: 6 kiểu mở đầu tài liệu

Chọn theo loại tài liệu. 1-3 câu, đặt trước phần thân.

1. **Mục tiêu thẳng** (mọi how-to, README): "Tài liệu này giúp bạn [làm gì] trong [bao lâu/bao nhiêu bước]. Sau khi xong, bạn sẽ [kết quả]."
   Ví dụ: "Tài liệu này giúp bạn deploy toàn bộ stack lên 1 EC2 t3.large trong ~20 phút. Xong, bạn có 4 domain public chạy HTTPS."
2. **Bối cảnh + việc cần** (runbook, SOP): "Dùng quy trình này khi [tình huống]. Điều kiện tiên quyết: [gì]."
3. **Kết luận trước** (report, Pyramid): nêu luôn kết quả/đề xuất ở câu đầu, chi tiết xuống dưới.
   Ví dụ: "Stack đã chạy ổn định trên AWS, 4 domain public xanh. Còn 2 việc trước khi bàn giao: đổi mật khẩu mặc định và pin lại IP SSH."
4. **Vấn đề (SCQA)** cho proposal/pitch: "Hiện trạng: [tình hình ổn]. Vấn đề: [cái phá vỡ]. Câu hỏi: [cần quyết gì]." Rồi thân bài trả lời.
5. **Định nghĩa phạm vi** (spec, reference): "Tài liệu này mô tả [cái gì]. Không bao gồm [cái gì]. Đối tượng: [ai]."
6. **Cảnh báo trước** (tài liệu có rủi ro): "Trước khi làm theo: [thao tác này xoá dữ liệu / cần backup / chỉ chạy trên môi trường X]."

## D. TL;DR và Executive Summary

**TL;DR** (đầu tài liệu kỹ thuật dài): 2-4 bullet, mỗi bullet 1 ý chốt. Người đọc lười đọc mỗi cái này vẫn nắm được.
```
TL;DR
- Stack chạy 17 container, khởi động ~40s bằng `docker compose up -d`.
- 6 domain đi qua 1 HAProxy ingress, 1 cert wildcard.
- Re-domain cần xoá cert cũ + reseed FIDO2, xem mục 4.
```

**Executive Summary** (đầu report/proposal cho lãnh đạo): 1 đoạn 3-5 câu theo Pyramid. Trả lời: tình hình, kết luận/đề xuất, tác động/con số, việc cần quyết. Người bận chỉ đọc phần này.

Quy tắc: TL;DR và Exec Summary viết SAU CÙNG, sau khi thân bài xong, để tóm đúng cái đã viết.

## E. Opener cho slide

- **Slide tiêu đề**: tên chủ đề + 1 dòng định vị (ai trình bày, cho ai, ngày). Không nhồi nội dung.
- **Slide agenda**: 3-5 mục, song song hoá, cho người xem biết hành trình.
- **Slide mở nội dung**: 1 câu hook định hướng (số gây chú ý, câu hỏi khung, hoặc kết luận trước). Ví dụ mở deck báo cáo: "3 tháng, từ 0 tới 4 domain public chạy thật."
- Xem thêm `structures/slide-narrative.md` cho dòng kể cả deck.

## F. Câu kết (thay cho kết sáo rỗng)

Tài liệu không kết bằng "hy vọng hữu ích". Kết bằng 1 trong:
- **Next step**: "Bước tiếp: chạy `verify-mesh-p2p.sh` để xác nhận P2P."
- **Nơi hỏi thêm**: "Vướng mắc, xem mục Xử lý sự cố hoặc liên hệ [ai]."
- **Tóm 1 dòng** (nếu tài liệu dài): nhắc lại việc cần làm chính.
- **Link liên quan**: trỏ tới tài liệu kế tiếp trong bộ.

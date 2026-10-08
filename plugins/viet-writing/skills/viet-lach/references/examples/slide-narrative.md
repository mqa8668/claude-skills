# Ví dụ: Outline deck báo cáo BOD (Slide Narrative)

Load file này khi user yêu cầu làm slide/deck báo cáo cho lãnh đạo. Mẫu dưới đây là outline hoàn chỉnh từng slide: loại slide, tiêu đề dạng câu khẳng định (assertion), 3-5 gạch nội dung, và một dòng speaker notes. Đây là NỘI DUNG để bàn giao render, không phải slide đã đẹp.

Điểm cần bám khi phóng tác: mỗi tiêu đề là một câu khẳng định người xem nhớ được (không phải nhãn danh từ kiểu "Kết quả"), một slide một ý, có slide stat cho con số đắt nhất, kết bằng next step chứ không "cảm ơn đã lắng nghe". Cuối file có ghi chú bàn giao cho `figma-presentation`.

---

## Deck: Đưa stack FIDO2 lên AWS: từ demo nội bộ tới 4 domain public

**Người xem:** Ban lãnh đạo (BOD). **Thời lượng:** 8-10 phút. **Mục tiêu:** BOD duyệt lịch mở demo public và giao đầu mối đổi mật khẩu.

---

**Slide 1 - Cover**
Tiêu đề: FIDO2 demo đã lên public trên AWS, sẵn sàng cho khách xem
- Báo cáo tiến độ hạ tầng
- Nhóm hạ tầng FIDO2
- 07/07/2026
- `demo.example.com`
Speaker notes: Mở bằng kết quả, không kể quá trình: stack đã public và xanh.

---

**Slide 2 - Agenda**
Tiêu đề: Ba câu hỏi buổi này trả lời
- Đã đưa được gì lên public
- Chi phí kiểm soát ra sao
- BOD cần quyết gì để mở cho khách
Speaker notes: Đặt kỳ vọng, cuối buổi xin đúng ba quyết định ở slide chốt.

---

**Slide 3 - Divider**
Tiêu đề: Phần 1. Đã đưa được gì lên public
- (slide phân mục, không nội dung)
Speaker notes: Chuyển sang phần kết quả kỹ thuật, giữ ngắn.

---

**Slide 4 - Nội dung**
Tiêu đề: Toàn bộ stack 17 container đã chạy public, không cắt bớt
- EC2 `t3.large` (amd64), EIP cố định `203.0.113.10`
- Một HAProxy ingress, một cert wildcard cho các domain
- Khởi động lại sau ~40 giây mỗi lần bật máy
- Hạ tầng khai báo bằng Terraform, dựng lại được từ mã
Speaker notes: Nhấn "y hệt bản nội bộ", khách thấy hệ thống thật chứ không phải bản rút gọn.

---

**Slide 5 - Stat**
Tiêu đề: 4 domain public đã xanh end-to-end
- 4/4 domain: portal, api, idp, grpc
- Cert `*.demo.example.com` hợp lệ tới 26/12/2026
- Đăng ký và xác thực FIDO2 thật đã chạy qua
Speaker notes: Con số đắt nhất của buổi, để nó chiếm cả slide.

---

**Slide 6 - Divider**
Tiêu đề: Phần 2. Chi phí và cách vận hành
- (slide phân mục)
Speaker notes: Chuyển sang phần BOD quan tâm nhất: tiền và độ dễ vận hành.

---

**Slide 7 - Nội dung**
Tiêu đề: Chỉ trả tiền khi thực sự demo, tiết kiệm khoảng 75%
- Bật máy trước buổi: `./vm.sh on`, tự lên sau ~40 giây
- Tắt sau buổi: `./vm.sh off`, ngừng tính giờ compute
- On-demand ~$18-25/tháng so với ~$80-90 nếu chạy 24/7
- EIP giữ nguyên IP, DNS không phải trỏ lại
Speaker notes: Nhấn cơ chế on-demand là lý do chi phí thấp, không phải may mắn.

---

**Slide 8 - Nội dung**
Tiêu đề: Còn ba việc phải đóng trước khi mở cho khách rộng
- Đổi toàn bộ mật khẩu mặc định (mức cao)
- SSH khoá theo IP, đổi IP thì `./tf.sh apply` (mức trung bình)
- Portal qua WireGuard đôi khi cần toggle netbird, đã có runbook (mức thấp)
Speaker notes: Trung thực về rủi ro, nhưng nhấn cả ba đều có đường xử lý rõ.

---

**Slide 9 - Nội dung (quyết định)**
Tiêu đề: BOD cần chốt ba việc trong tuần này
- Duyệt lịch và phạm vi khách được mời xem
- Giao một đầu mối đổi mật khẩu trước ngày mở
- Duyệt runbook bật/tắt một trang cho người phụ trách demo
Speaker notes: Đây là slide xin quyết định, dừng lại đủ lâu để BOD phản hồi từng ý.

---

**Slide 10 - Kết**
Tiêu đề: Đóng hai việc bảo mật, nhóm báo "sẵn sàng mở"
- Sau khi đổi mật khẩu và chốt lịch, nhóm gửi xác nhận sẵn sàng
- Kèm runbook bật/tắt để người phụ trách demo tự chạy
- Đầu mối kỹ thuật: nhóm hạ tầng FIDO2
Speaker notes: Kết bằng next step cụ thể, không câu cảm ơn sáo.

---

## Bàn giao render

Outline này là nội dung + dòng kể, chưa phải slide đẹp. Bàn giao cho skill `figma-presentation` để render deck trong Figma Slides (dark cover + divider, light content, slide stat big-number cho Slide 5). Sơ đồ kiến trúc stack nếu cần thêm thì dựng bằng `figma-topology` rồi nhúng vào Slide 4.

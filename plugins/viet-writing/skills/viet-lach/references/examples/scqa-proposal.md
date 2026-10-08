# Ví dụ: Đề xuất theo SCQA

Load file này khi user yêu cầu viết một đề xuất theo SCQA (Situation, Complication, Question, Answer). Mẫu dưới đây dẫn người đọc từ bối cảnh quen thuộc tới đúng câu hỏi, rồi mới đưa lời giải, kèm phạm vi, chi phí ước lượng, mốc thời gian, và phần ngoài phạm vi.

Điểm cần bám khi phóng tác: Situation là điều người đọc đã đồng ý (không gây tranh cãi), Complication là cái làm tình hình hiện tại không còn đủ, Question là câu hỏi tự nhiên bật ra, Answer trả lời thẳng câu đó rồi mới triển khai chi tiết. Chi phí và mốc thời gian phải có số, phần ngoài phạm vi để chặn kỳ vọng.

---

## Đề xuất: Chuyển demo FIDO2 sang hạ tầng AWS on-demand

### Situation

Stack demo FIDO2 (17 container, một HAProxy ingress cho 6 domain, một cert wildcard) đang chạy tốt tại chỗ. Khởi động một lệnh `docker compose up -d`, sau khoảng 40 giây là sẵn sàng. Nhóm dùng nó để phát triển và diễn tập nội bộ, kết quả ổn định.

### Complication

Sếp muốn cho khách xem trực tiếp qua Internet, không phải qua máy nội bộ hay chia sẻ màn hình. Nhưng để một máy chủ chạy public 24/7 chỉ để thỉnh thoảng demo thì tốn tiền vô ích: phần lớn thời gian không ai truy cập mà vẫn tính giờ compute. Cần vừa public được cho khách, vừa không trả tiền cho thời gian máy nằm không.

### Question

Làm sao đưa stack lên public cho khách xem, mà chỉ trả chi phí khi thực sự dùng, và bật/tắt đủ đơn giản để người phụ trách demo tự làm?

### Answer

Dựng stack trên một EC2 `t3.large` (amd64) tại `demo.example.com`, gắn EIP cố định, và điều khiển bật/tắt on-demand bằng một script. Toàn bộ hạ tầng khai báo bằng Terraform để dựng lại được từ mã.

Cách vận hành:
- Trước buổi demo: `./vm.sh on` bật máy, EIP gắn lại đúng IP cũ, stack tự lên qua cloud-init sau khoảng 40 giây.
- Sau buổi demo: `./vm.sh off` tắt máy để ngừng tính giờ compute.
- EIP giữ nguyên IP `203.0.113.10` qua các lần bật/tắt, nên DNS `demo.example.com` không phải trỏ lại.
- Security Group khoá SSH port 22 theo IP người vận hành; khi IP đổi thì `./tf.sh apply`.

Khách truy cập 4 domain public dưới `demo.example.com` (portal, api, idp, grpc) qua cert wildcard hợp lệ, thấy khoá xanh, không cảnh báo bảo mật.

### Phạm vi

Trong phạm vi đề xuất này:
- Terraform IaC cho EC2, EIP, Security Group, key.
- Script `vm.sh` (bật/tắt) và `tf.sh` (cập nhật hạ tầng theo IP người gọi).
- Đưa stack lên, reseed dữ liệu FIDO2 theo domain `demo.example.com`, cấp cert wildcard.
- Verify 4 domain end-to-end và một runbook bật/tắt một trang cho người phụ trách demo.

### Chi phí ước lượng

Đơn giá tham khảo vùng `ap-southeast-1` (Singapore), on-demand:

| Khoản | Đơn giá | Ghi chú |
|-------|---------|---------|
| EC2 `t3.large` | ~$0,106/giờ | Chỉ tính khi máy bật |
| EBS gp3 30 GB | ~$2,7/tháng | Tính cả khi máy tắt (dữ liệu vẫn giữ) |
| EIP (IPv4 public) | ~$3,6/tháng | Tính cả khi máy tắt |
| Data transfer | Nhỏ | Lưu lượng demo thấp |

Ước tính hai kịch bản:
- **On-demand** (bật ~6 giờ/buổi, ~20 buổi/tháng ≈ 120 giờ): khoảng $18-25/tháng.
- **Chạy 24/7** để so sánh: khoảng $80-90/tháng.

On-demand tiết kiệm khoảng 75% so với để máy chạy liên tục, đúng nhu cầu demo theo lịch.

### Mốc thời gian

| Tuần | Việc | Kết quả |
|------|------|---------|
| Tuần 1 | Dựng Terraform, provision EC2, mở SG, cài Docker | `./vm.sh on/off` chạy được, SSH vào được |
| Tuần 2 | Đưa stack lên, reseed theo `demo.example.com`, cấp cert wildcard | Stack `Up`, cert khoá xanh |
| Tuần 3 | Verify 4 domain E2E, hardening coturn, đổi mật khẩu, viết runbook | 4 domain xanh, runbook bật/tắt bàn giao |

### Ngoài phạm vi

- Không bao gồm auto-scaling hay high-availability đa vùng; đây là một máy demo bật/tắt theo buổi.
- Không bao gồm CDN, WAF, hay chịu tải người dùng thật quy mô lớn.
- Không bao gồm giám sát/alerting 24/7; máy chỉ sống trong khung giờ demo.
- Đổi mật khẩu mặc định và quản lý bí mật dài hạn là việc phải làm nhưng nằm trong quy trình bảo mật riêng, đề xuất này chỉ nêu như điều kiện trước khi mở public.

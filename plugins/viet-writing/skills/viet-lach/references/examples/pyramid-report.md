# Ví dụ: Báo cáo Minto Pyramid cho sếp

Load file này khi user yêu cầu viết một báo cáo tiến độ cho lãnh đạo theo Pyramid Principle (Minto). Mẫu dưới đây mở bằng governing thought (kết luận + đề xuất ngay đầu), rồi ba nhóm lý do MECE, mỗi nhóm đỡ bằng dữ kiện có số. Có sẵn executive summary 3-4 câu để dán lên đầu email hoặc slide tóm tắt.

Điểm cần bám khi phóng tác: BLUF ở câu đầu (đọc một dòng là nắm), ba nhóm không chồng lấn và gộp lại phủ hết (đã làm / rủi ro / cần quyết), mỗi luận điểm có con số cụ thể, kết bằng đề nghị quyết định rõ ràng chứ không "mong nhận chỉ đạo".

---

## Báo cáo tiến độ: Đưa stack FIDO2 lên AWS

**Gửi:** Ban lãnh đạo
**Từ:** Nhóm hạ tầng FIDO2
**Ngày:** 07/07/2026

### Executive summary

Stack FIDO2 đã chạy public trên AWS tại `demo.example.com` với 4 domain xanh end-to-end và cert wildcard hợp lệ tới 26/12/2026. Chi phí vận hành ở mức thấp nhờ cơ chế bật/tắt on-demand: chỉ trả tiền compute khi thực sự demo. Còn hai việc cần chốt trước khi mở cho khách xem rộng: đổi toàn bộ mật khẩu mặc định, và xác nhận quy trình bật/tắt cho người không phải kỹ thuật. Đề nghị Ban lãnh đạo duyệt lịch mở demo và giao đầu mối đổi mật khẩu.

### Governing thought

Nên tiến hành mở demo FIDO2 public cho khách theo lịch, vì hạ tầng đã sẵn sàng và chi phí đã kiểm soát; điều kiện duy nhất là đóng hai việc bảo mật/vận hành còn lại trong tuần này.

Ba nhóm cơ sở cho kết luận trên: đã làm được gì, còn rủi ro gì, và cần Ban lãnh đạo quyết gì.

### 1. Đã làm được gì

Hạ tầng public đã dựng xong và kiểm chứng:

- Stack 17 container chạy trên AWS EC2 `t3.large` (amd64), EIP cố định `203.0.113.10`, khởi động lại sau khoảng 40 giây mỗi lần bật máy.
- 4 domain public đã xanh end-to-end: portal, api, idp, grpc dưới `demo.example.com`, kiểm bằng đăng ký và xác thực FIDO2 thật.
- Cert wildcard `*.demo.example.com` hợp lệ, trình duyệt hiện khoá xanh.
- Hạ tầng quản lý bằng Terraform (`cloud/aws/`): dựng lại được từ mã, EIP giữ nguyên IP qua các lần bật/tắt.
- Mesh netbird đã re-provision, `wt0` up, `NETBIRD_VERSION` pin 0.74.0 và lazy-connection đã tắt để peer không relay-flap.

### 2. Còn rủi ro gì

Ba rủi ro cần đóng trước khi mở rộng cho khách:

- **Mật khẩu mặc định chưa đổi.** Các dịch vụ nội bộ còn dùng credential mặc định từ giai đoạn dev. Public mà chưa đổi là lỗ hổng rõ. Mức độ: cao, phải đóng trước khi share link rộng.
- **Security Group khoá SSH theo IP người gọi.** Khi IP người vận hành đổi (mạng khác, 4G), phải chạy `./tf.sh apply` mới SSH lại được. Không ảnh hưởng khách xem web, nhưng ảnh hưởng người trực vận hành nếu quên. Mức độ: trung bình, cần ghi vào runbook.
- **Portal qua WireGuard đôi khi "alive-but-dead" sau restart.** Đã có cách sửa (`netbird down/up` trên máy tiêu thụ) nhưng phụ thuộc thao tác tay. Mức độ: thấp, có runbook, nhưng cần người trực biết.

### 3. Cần Ban lãnh đạo quyết gì

Ba quyết định để chốt tuần này:

- **Lịch mở demo public.** Hạ tầng sẵn sàng, cần Ban lãnh đạo chốt ngày và phạm vi khách được mời xem, để nhóm bật máy đúng khung giờ và tắt sau khi xong nhằm tiết kiệm chi phí.
- **Đầu mối đổi mật khẩu.** Giao một người chịu trách nhiệm đổi toàn bộ credential mặc định trước ngày mở, kèm nơi lưu bí mật an toàn.
- **Quy trình bật/tắt cho người không kỹ thuật.** Duyệt việc nhóm viết runbook một trang để người phụ trách demo tự chạy `./vm.sh on` trước buổi và `./vm.sh off` sau buổi, không cần gọi kỹ thuật mỗi lần.

### Đề nghị

Duyệt lịch mở demo và giao đầu mối đổi mật khẩu trong tuần này. Sau khi hai việc này xong, nhóm sẽ báo lại "sẵn sàng mở" kèm runbook bật/tắt một trang.

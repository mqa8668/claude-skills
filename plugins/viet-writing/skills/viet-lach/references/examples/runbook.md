# Ví dụ: Runbook xử lý sự cố + Runbook re-domain

Load file này khi user yêu cầu viết một RUNBOOK/SOP thật (không chỉ hỏi lý thuyết). Hai runbook dưới đây là mẫu hoàn chỉnh: một runbook xử lý sự cố (vào theo triệu chứng) và một runbook thao tác nguy hiểm (có phá huỷ dữ liệu, cần cảnh báo front-load và rollback).

Điểm cần bám khi phóng tác: mỗi bước đánh số một hành động, có lệnh trong `backtick` và kết quả mong đợi để verify, cảnh báo đặt NGAY TRƯỚC bước nguy hiểm, và mọi quy trình có thể hỏng đều có đường lùi.

---

## Runbook 1: Khôi phục Portal khi mất kết nối qua WireGuard

**Mục đích.** Đưa Portal FIDO2 truy cập được trở lại khi kết nối qua netbird/WireGuard rơi vào trạng thái "alive-but-dead" sau restart stack.

**Khi nào chạy.**
- Triệu chứng: mở Portal thì trình duyệt quay vòng rồi timeout, dù stack vẫn `Up`.
- `netbird status` trên máy đang truy cập cho thấy peer ở trạng thái Connected nhưng relay-flap, không có ICE.
- Thường xuất hiện ngay sau `docker compose restart` hoặc sau khi bật lại máy AWS.

Không chạy runbook này nếu Portal lỗi 502/503 (đó là stack chưa lên, xem runbook deploy) hoặc lỗi cert (xem Troubleshooting trong README).

**Tiền điều kiện.**
- Có quyền chạy `netbird` trên chính máy đang truy cập Portal (máy tiêu thụ, không phải máy chủ stack).
- Stack đích đang `Up`: xác nhận bằng `docker compose ps` thấy 17 container healthy.
- Biết domain Portal đang dùng (mặc định `portal.example.internal` local, `portal.demo.example.com` public).

### Các bước

1. **Xác nhận stack đích còn sống.** Trên máy chủ stack:
   ```bash
   docker compose ps
   ```
   Mong đợi: 17 container cột STATUS là `Up` hoặc `healthy`. Nếu có container `Restarting`, dừng ở đây và xử lý stack trước, lỗi không nằm ở WireGuard.

2. **Xác nhận đúng bệnh trên máy tiêu thụ.** Trên máy đang mở Portal:
   ```bash
   netbird status
   ```
   Mong đợi thấy peer của máy chủ Portal ở trạng thái `Connected` nhưng qua relay (không có dòng ICE/P2P), hoặc relay-flap. Đây đúng là triệu chứng zombie signal stream.

3. **Toggle netbird trên máy tiêu thụ.** Đây là bước sửa chính, idempotent, chạy lại vô hại:
   ```bash
   netbird down && netbird up
   ```
   Mong đợi: lệnh trả về không lỗi, `wt0` up lại sau vài giây.

4. **Chờ peer tái lập kết nối.** Đợi khoảng 10-15 giây rồi kiểm tra lại:
   ```bash
   netbird status
   ```
   Mong đợi: peer Portal chuyển sang `Connected` với đường P2P (có dòng ICE), hoặc ít nhất relay ổn định không flap.

5. **Verify Portal đã vào được.** Từ máy tiêu thụ:
   ```bash
   curl -kI https://portal.example.internal     # mong đợi HTTP/2 200
   ```
   Rồi reload Portal trên trình duyệt. Trang đăng nhập FIDO2 hiện lên là đã khỏi.

**Cảnh báo.** Chỉ toggle netbird trên MÁY TIÊU THỤ (máy đang truy cập). Toggle nhầm netbird trên máy chủ stack sẽ ngắt cả mesh và ảnh hưởng mọi peer khác, không phải nơi phát sinh bệnh.

**Rollback.** Bước 3 không phá gì nên không cần rollback. Nếu sau bước 4 vẫn deaf: kiểm tra `NETBIRD_VERSION` đang là `0.74.0` và lazy-connection đã tắt trên management (lazy-connection bật là nguyên nhân peer idle/relay-flap). Nếu peer báo `setup key invalid`, DB management đã bị wipe: phải re-provision bằng OIDC login và cấp lại `NB_SETUP_KEY` + `DEMO_API_TOKEN` trong `.env`.

---

## Runbook 2: Re-domain FIDO2 sang tên miền mới

**Mục đích.** Chuyển stack sang một domain gốc mới (ví dụ từ `example.internal` sang `demo.example.com`): render lại config, cấp cert khớp tên mới, và reseed dữ liệu FIDO2 theo redirect URI mới.

**Khi nào chạy.** Khi đổi `DOMAIN` để phục vụ môi trường khác (local sang public, hoặc đổi khách hàng). Không chạy trên môi trường đang phục vụ traffic thật mà chưa có backup.

> CẢNH BÁO PHÁ HUỶ DỮ LIỆU. Runbook này xoá `certs/demo/*.pem` và truncate các store dữ liệu FIDO2 (mysql, mongo, redis). Mọi dữ liệu người dùng đã đăng ký sẽ mất và phải reseed lại. Backup trước khi bắt đầu. Sai domain ở bước render là phải làm lại từ đầu.

**Tiền điều kiện.**
- Đã backup: `cp -r certs/demo certs/demo.bak` và dump các DB cần giữ.
- Đã sửa `DOMAIN` trong `.env` sang tên mới và kiểm tra lại chính tả.
- Đúng máy đích (không nhầm giữa local và public).

### Các bước

1. **Backup cert và dữ liệu hiện tại.**
   ```bash
   cp -r certs/demo certs/demo.bak
   ```
   Mong đợi: thư mục `certs/demo.bak` tồn tại với đủ file `.pem`. Đây là đường lùi cho cert.

2. **Xoá cert cũ để buộc render cấp cert theo tên mới.**
   ```bash
   rm certs/demo/*.pem
   ```
   Mong đợi: `ls certs/demo/` trống phần `.pem`. Bước này không chạy lại được nếu chưa có backup ở bước 1.

3. **Render lại config theo domain mới.**
   ```bash
   ./render.sh
   ```
   Mong đợi: config trong `templates/` render ra giá trị domain mới, cert wildcard mới xuất hiện lại trong `certs/demo`. Kiểm tra một file render bất kỳ đã mang tên miền mới.

4. **Reseed dữ liệu FIDO2 theo domain mới.** Nếu giữ được OIDC client (client_id/secret), reseed bằng dump-transform: sed redirect URI trong dump sang domain mới rồi import-over (dump có `DROP TABLE IF EXISTS` nên grant còn nguyên, không dùng `DROP DATABASE`). Nếu reseed từ trống, truncate ba store:
   ```bash
   # phương án reseed từ trống: truncate rồi để app seed lại
   docker compose stop auth-demo
   # truncate auth-demo/data/{mysql,mongo,redis*} theo quy trình reseed nội bộ
   docker compose up -d auth-demo
   ```
   Mong đợi: FIDO2 khởi động sạch, RP ID lấy từ env đã là domain mới (RP ID không nằm trong mysql).

5. **Khởi động lại ingress và verify.**
   ```bash
   docker compose restart haproxy
   curl -kI https://portal.<domain-moi>      # mong đợi HTTP/2 200
   ```
   Mong đợi: Portal mở được ở domain mới, cert trình duyệt khớp tên, đăng ký FIDO2 mới hoạt động.

**Cảnh báo idempotent.** Bước 1 và 3 chạy lại an toàn. Bước 2 và 4 KHÔNG idempotent: chạy lại bước 4 sau khi đã có dữ liệu mới sẽ xoá dữ liệu đó.

**Rollback.** Nếu render sai domain hoặc cert hỏng:
```bash
rm certs/demo/*.pem
cp certs/demo.bak/*.pem certs/demo/
# sửa lại DOMAIN trong .env cho đúng, rồi ./render.sh
docker compose restart haproxy
```
Với dữ liệu: import lại dump gốc đã backup ở bước 1. Nếu là netbird management, wipe DB mgmt sẽ vô hiệu `NB_SETUP_KEY`, phải re-provision riêng.

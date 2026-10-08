# Runbook / SOP (quy trình thao tác lặp lại và xử lý sự cố, từng bước một)

Runbook là danh sách bước để một người làm đúng một việc mà không cần hiểu toàn bộ hệ thống. SOP là cùng ý đó cho thao tác định kỳ. Dùng khi việc lặp lại (deploy, backup, re-domain), khi có sự cố cần xử lý dưới áp lực, hoặc khi bàn giao cho người chưa quen tay. Người đọc runbook thường đang vội hoặc đang sự cố, nên mỗi bước phải đánh số, có lệnh cụ thể, có cách tự kiểm tra đã đúng. KHÔNG dùng runbook để giải thích vì sao (đó là ADR) hay để dạy khái niệm nền (đó là Explanation). Runbook chỉ lo làm đúng, đúng thứ tự, kiểm được kết quả.

## Các biến thể

### 1. Runbook deploy
Từ code/config tới hệ thống chạy. Bước tuần tự: kéo image, render config, `up -d`, chờ healthy, smoke test. Mỗi bước một lệnh và một dấu hiệu đã xong. Ví dụ: deploy `full-stack-demo` lên EC2 qua `vm.sh` rồi verify 6 domain.

### 2. Runbook xử lý sự cố (incident/troubleshooting)
Vào theo triệu chứng, không theo thứ tự tuyến tính. Cấu trúc: triệu chứng quan sát được, cách xác nhận đúng bệnh, cách sửa, cách verify đã khỏi. Ví dụ: Portal qua WireGuard báo Connected nhưng không vào được, sửa bằng toggle `netbird down/up` trên máy đó.

### 3. SOP thao tác định kỳ
Việc làm theo lịch: backup, xoay cert, kiểm tra sức khoẻ hàng tuần. Nêu tần suất, ai làm, cửa sổ thời gian an toàn, và verify sau mỗi lần.

### 4. Checklist bàn giao
Danh sách hộp tick cho người tiếp nhận tự chạy qua: truy cập được chưa, start/stop được chưa, biết xem log ở đâu, biết chạy verify script nào. Ví dụ: chạy `verify-mesh-p2p.sh` để xác nhận mesh P2P còn xanh.

## Bộ section chuẩn

1. Mục đích: quy trình này làm được gì (một câu).
2. Khi nào chạy: điều kiện kích hoạt, không chạy khi nào.
3. Tiền điều kiện (prereq): quyền, công cụ, backup, trạng thái hệ thống trước khi bắt đầu.
4. Các bước ĐÁNH SỐ: mỗi bước một hành động + lệnh.
5. Kết quả mong đợi sau mỗi bước: cách biết bước đó đã đúng (verify).
6. Rollback / khi hỏng thì sao: quay lại trạng thái an toàn ra sao.

## Kỹ thuật cốt lõi

### 1. Mỗi bước có lệnh + kết quả mong đợi (Show-then-tell)
Đừng bảo "khởi động stack" rồi để người ta đoán đã xong chưa. Đưa lệnh và dấu hiệu:
```bash
docker compose up -d
# Mong đợi: docker compose ps thấy 17 container STATUS Up/healthy sau ~40s
```
Người vận hành cần biết đã làm đúng trước khi sang bước sau.

### 2. Cảnh báo TRƯỚC bước nguy hiểm (front-load)
Bước xoá dữ liệu, wipe DB, restart prod phải có cảnh báo NGAY TRƯỚC nó, không phải cuối trang. Ví dụ trong runbook re-domain FIDO2:
> CẢNH BÁO: bước sau xoá `certs/demo/*.pem` và truncate DB để reseed. Backup trước. Sai domain ở đây là phải làm lại từ đầu.
Đặt cảnh báo nơi mắt người đọc chạm tới đúng lúc, không chôn trong ghi chú.

### 3. Ghi rõ bước idempotent hay không
Nói rõ bước nào chạy lại nhiều lần vẫn an toàn, bước nào chạy hai lần là hỏng. `docker compose up -d` chạy lại vô hại. Truncate DB rồi import chạy lại sẽ mất dữ liệu mới. Người vận hành cần biết khi nào được retry.

### 4. Verify bằng lệnh cụ thể, không "kiểm tra lại"
Thay "kiểm tra stack đã lên" bằng lệnh đọc được kết quả: `docker compose ps` cột STATUS, hoặc `curl -I https://demo.example.com` trả 200, hoặc chạy `verify-mesh-p2p.sh` thấy 12/12 link P2P. Verify mơ hồ là verify vô dụng.

### 5. Vào sự cố theo triệu chứng
Với runbook troubleshooting, đầu mục là cái người ta quan sát được, không phải nguyên nhân. Ví dụ: "Triệu chứng: Portal báo Connected nhưng trình duyệt timeout. Xác nhận: `netbird status` thấy peer relay-flap, không có ICE. Sửa: `netbird down && netbird up` trên máy đang gọi. Verify: reload Portal, vào được."

### 6. Rollback rõ ràng cho mỗi quy trình nguy hiểm
Bước nào có thể hỏng phải kèm đường lùi. "Nếu reseed sai domain: restore cert từ backup `certs/demo.bak`, import lại dump gốc, `docker compose restart haproxy`." Không có rollback thì người vận hành mắc kẹt khi lỗi.

### 7. Chunking theo giai đoạn
Runbook 20 bước liền mạch khó theo. Gộp thành giai đoạn (chuẩn bị, thực thi, xác minh, dọn dẹp), mỗi giai đoạn vài bước. Người đọc biết mình đang ở đoạn nào và còn bao xa tới đích.

### 8. Prereq chặn trước khi bắt đầu
Liệt kê tiền điều kiện thành checklist ở đầu: có backup chưa, đúng máy chưa, port SSH 22 đã mở cho IP của bạn chưa (SG khoá theo IP, chạy `./tf.sh apply` nếu IP đổi). Thiếu prereq mà đã chạy nửa quy trình là kẹt giữa đường.

## Ví dụ runbook rút gọn (khôi phục Portal mất kết nối WG)

```markdown
## Khôi phục Portal khi mất kết nối qua WireGuard

Mục đích: Portal báo Connected nhưng trình duyệt timeout, đưa về vào được.
Khi nào chạy: sau khi restart stack, peer tiêu thụ mất kết nối tới Portal.
Prereq: có quyền SSH vào máy đang gọi Portal.

1. Xác nhận đúng bệnh: chạy `netbird status`.
   Mong đợi: thấy peer relay-flap, không có ICE (zombie signal stream).
2. Toggle netbird trên máy đang gọi: `netbird down && netbird up`.
   Mong đợi: lệnh trả về không lỗi, wt0 up lại.
   (Bước idempotent, chạy lại vô hại.)
3. Verify: reload Portal trên trình duyệt.
   Mong đợi: trang load, đăng nhập được.

Rollback: nếu vẫn hỏng, kiểm tra netbird-client + haproxy + portal đã
recreate cùng nhau chưa; nếu chưa, recreate cả trio rồi lặp lại từ bước 1.
```

## Checklist trước khi xuất

1. Mọi bước đều đánh số và có một hành động rõ, không gộp nhiều việc vào một bước?
2. Mỗi bước có lệnh cụ thể trong `backtick` và kết quả mong đợi để verify?
3. Bước nguy hiểm (xoá, wipe, restart prod) có cảnh báo NGAY TRƯỚC nó?
4. Đã ghi bước nào idempotent, bước nào chạy lại là hỏng?
5. Verify bằng lệnh đọc được kết quả, không phải "kiểm tra lại"?
6. Có rollback cho mỗi quy trình có thể hỏng?
7. Prereq nêu đủ để không kẹt giữa đường?
8. Không em dash, không AI-tell?

## Lỗi cần tránh

1. **Cảnh báo đặt cuối trang**: người vận hành đã xoá xong mới đọc thấy. Front-load ngay trước bước nguy hiểm.
2. **Verify mơ hồ**: "kiểm tra lại xem ổn chưa" không nói cách kiểm. Đưa lệnh và kết quả đọc được.
3. **Gộp nhiều việc vào một bước**: "cấu hình và khởi động và kiểm tra" nên tách ba bước, ba verify.
4. **Bỏ prereq**: nhảy vào bước 1 mà chưa nói cần backup, cần quyền, cần đúng máy.
5. **Không có đường lùi**: quy trình chỉ có đường tiến, gặp lỗi là mắc kẹt.
6. **Lệnh không copy được**: kể lệnh trong prose thay vì code block, hoặc thiếu tham số thật.

## Nguyên tắc glossary khuyến nghị

Show-then-tell, Specificity, Chunking, Signposting, Parallelism, Active voice, Curse of knowledge, BLUF.

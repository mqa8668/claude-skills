# README (tài liệu gốc, cửa vào của repo/dự án phần mềm)

README là trang đầu tiên người ta đọc khi mở repo. Nó trả lời ba câu trong vài giây: dự án này LÀ GÌ, chạy thử ra sao, và tra cứu sâu ở đâu. Dùng khi cần một điểm khởi đầu cho người mới, cho người tiếp nhận bàn giao, hoặc cho chính bạn sáu tháng sau quên sạch. KHÔNG dùng README để nhồi toàn bộ tài liệu: quy trình vận hành dài thuộc về Runbook, quyết định kiến trúc thuộc về ADR, hướng dẫn thao tác lẻ thuộc về How-to. README chỉ mở cửa và chỉ đường. Người đọc README là người đang vội và chưa có bối cảnh, nên mọi thứ phải quét được và Quickstart phải chạy được ngay.

## Các biến thể

### 1. README app/service
Cho một ứng dụng hoặc dịch vụ chạy được (như `full-stack-demo`). Trọng tâm là Quickstart: clone về, `docker compose up -d`, chờ tới khi container healthy, mở được URL. Nêu rõ prereq (Docker, RAM, port), cấu hình qua `.env`, và cách kiểm tra stack đã sống.

### 2. README thư viện/lib
Cho code người khác import vào dự án của họ. Trọng tâm là cài đặt (package manager) + đoạn code dùng tối thiểu (minimal usage) chạy được ngay dưới phần cài. Ít nói về vận hành, nhiều về API surface và link sang reference.

### 3. README monorepo
Cho repo chứa nhiều package/service. Trọng tâm là bản đồ: mỗi thư mục con là gì, chạy từng cái ra sao, và link vào README riêng của từng module. README gốc điều phối, không lặp lại nội dung con.

### 4. README bàn giao (cho người tiếp nhận)
Cho người nhận vận hành hệ thống bạn viết. Ngoài Quickstart, nó cần: sơ đồ thành phần ở mức cao, thông tin truy cập (không kèm mật khẩu thật), các file cần biết, và link sang Runbook cho từng tác vụ vận hành. Mục tiêu là người nhận tự chạy được mà không cần hỏi lại.

## Bộ section chuẩn (điều chỉnh theo biến thể)

1. Tên dự án + một câu nói repo LÀ GÌ (BLUF, ngay dòng đầu dưới tiêu đề).
2. Badge/status nếu có (build, version, license): đặt sát tiêu đề, không lạm dụng.
3. Tính năng chính: 3-6 bullet, mỗi bullet một năng lực cụ thể.
4. Yêu cầu (prereq): phiên bản công cụ, RAM, port, OS.
5. Quickstart: các lệnh copy-paste chạy được, có kết quả mong đợi.
6. Cấu hình: bảng biến `.env`/config, mặc định, ý nghĩa.
7. Cấu trúc thư mục: cây rút gọn, chú thích thư mục quan trọng.
8. Vận hành cơ bản: start, stop, xem log, kiểm tra sức khoẻ.
9. Troubleshooting: 3-5 lỗi hay gặp + cách xử lý.
10. License / contact / link tài liệu sâu.

## Kỹ thuật cốt lõi

### 1. Dòng đầu nói repo LÀ GÌ (BLUF)
Ngay dưới tiêu đề, một câu duy nhất: cái này là gì, giải quyết việc gì. Ví dụ: "`full-stack-demo`: bộ demo FIDO2 gồm 17 container Docker Compose, một HAProxy làm ingress cho 6 domain qua một cert wildcard." Không mở bài kể lể trước khi nói repo là gì.

### 2. Quickstart copy-paste chạy được (Show-then-tell)
Đưa lệnh thật trước, giải thích sau. Người đọc kỹ thuật tin lệnh chạy được hơn mô tả. Ghi rõ thời gian chờ và cách biết đã xong:
```bash
git clone <repo> && cd full-stack-demo
cp .env.example .env      # sửa domain, mật khẩu trước khi chạy
docker compose up -d      # chờ ~40s tới khi 17 container healthy
docker compose ps         # tất cả cột STATUS phải là Up/healthy
```
Đặt mục tiêu Quickstart chạy xong trong vài phút. Nếu cần bước thủ công dài, tách sang Runbook và link tới.

### 3. Ưu tiên câu lệnh thật hơn mô tả
Thay "khởi động hệ thống" bằng `docker compose up -d`. Thay "dừng dịch vụ" bằng `docker compose down`. Mọi lệnh, tên file, đường dẫn để trong `backtick`. Đừng bắt người đọc dịch prose thành lệnh.

### 4. Cấu hình trình bày dạng bảng
Biến môi trường là dữ liệu có cấu trúc, dùng bảng chứ không prose. Cột: tên biến, mặc định, ý nghĩa, bắt buộc hay không. Ví dụ: `NETBIRD_VERSION` (mặc định `0.74.0`, pin cứng, không tự nâng), `DOMAIN`, thư mục cert `certs/demo`.

### 5. Link sang tài liệu sâu (Progressive disclosure)
README giữ tầng mặt. Chi tiết đẩy xuống tầng sau qua link: "Vận hành chi tiết xem `docs/runbook-deploy.md`", "Vì sao chọn HAProxy xem `docs/adr/0001-haproxy-ingress.md`". Người đọc chọn độ sâu, README không phình to.

### 6. Cấu trúc thư mục dạng cây rút gọn
Chỉ liệt kê thư mục người đọc cần biết, chú thích một dòng mỗi cái. Bỏ file rác. Ví dụ: `templates/` (config j2 render ra), `certs/demo/` (cert wildcard 6 domain), `cloud/aws/` (Terraform + `vm.sh` bật/tắt EC2).

### 7. Badge/status đặt đúng chỗ
Nếu có CI, version, license, đặt badge ngay dưới tiêu đề để quét trạng thái tức thì. Không rải badge marketing không mang tin. Với repo nội bộ/bàn giao, một dòng "trạng thái: đang chạy public tại demo.example.com, bật/tắt qua `vm.sh`" còn hữu ích hơn badge.

## Ví dụ phần mở đầu README (BLUF + Quickstart)

```markdown
# full-stack-demo

Bộ demo FIDO2 gồm 17 container Docker Compose. Một HAProxy làm ingress cho
6 domain qua một cert wildcard (`certs/demo`). Đã chạy public trên AWS EC2
tại demo.example.com, bật/tắt on-demand qua `vm.sh`.

## Yêu cầu
- Docker + Docker Compose v2
- RAM >= 8GB, port 443 mở
- Cert wildcard đặt trong `certs/demo/`

## Quickstart
    cp .env.example .env      # sửa DOMAIN, mật khẩu trước khi chạy
    docker compose up -d      # chờ ~40s tới khi 17 container healthy
    docker compose ps         # STATUS mọi container phải Up/healthy

Vận hành chi tiết xem `docs/runbook-deploy.md`.
Vì sao chọn HAProxy xem `docs/adr/0001-haproxy-ingress.md`.
```

## Checklist trước khi xuất

1. Dòng đầu có nói repo LÀ GÌ trong một câu không (BLUF)?
2. Quickstart có copy-paste chạy được, có kết quả mong đợi cho mỗi lệnh không?
3. Prereq nêu đủ phiên bản, RAM, port trước khi bắt người ta chạy chưa?
4. Lệnh, tên file, đường dẫn đều trong `backtick`?
5. Cấu hình để dạng bảng, không nhồi vào prose?
6. Có link sang Runbook/ADR/docs thay vì nhồi hết vào README không?
7. Troubleshooting có 3-5 lỗi thật hay gặp, không phải lỗi giả định?
8. Không lộ mật khẩu/token thật trong ví dụ config?
9. Không em dash, không AI-tell?

## Lỗi cần tránh

1. **Mở bài rỗng trước khi nói repo là gì**: bỏ "Đây là một dự án...", vào thẳng "`full-stack-demo` là...".
2. **Quickstart không chạy được**: thiếu bước `cp .env`, thiếu prereq, hoặc lệnh sai. Test lại trên máy sạch trước khi giao.
3. **Nhồi toàn bộ tài liệu vào README**: quy trình dài, quyết định kiến trúc, API đầy đủ đều tràn ra khỏi phạm vi. Tách và link.
4. **Số liệu bịa hoặc lỗi thời**: "17 container" phải khớp `docker compose ps` thật. Sai một con số là mất tin cả trang.
5. **Lệnh kể trong prose**: "bạn dùng lệnh compose up để khởi động" thay vì code block. Người đọc phải copy được.
6. **Ba tính từ tự khen** ("nhanh, mạnh, an toàn"): thay bằng số đo được (khởi động ~40s, một cert phục vụ 6 domain).

## Nguyên tắc glossary khuyến nghị

BLUF, Show-then-tell, Progressive disclosure, Scannability, Specificity, Word economy, Chunking, Consistency.

# Ví dụ: README app/service (bàn giao)

Load file này khi user yêu cầu viết một README THẬT cho một app/service theo cấu trúc README bàn giao (không chỉ hỏi lý thuyết). Dưới đây là một README hoàn chỉnh cho `full-stack-demo`, dùng làm khuôn: giữ nguyên bộ section và giọng văn, chỉ thay số liệu, tên domain, đường dẫn theo repo thật của user.

Điểm cần bám khi phóng tác từ mẫu này: dòng đầu nói repo LÀ GÌ (BLUF), Quickstart copy-paste được kèm kết quả mong đợi, cấu hình để dạng bảng, lệnh trong `backtick`, Troubleshooting là lỗi thật hay gặp chứ không phải lỗi giả định.

---

````markdown
# full-stack-demo

Bộ demo FIDO2 gồm 17 container Docker Compose, một HAProxy làm ingress cho 6 domain qua một cert wildcard duy nhất (`certs/demo`). Khởi động một lệnh, chạy được sau khoảng 40 giây.

Trạng thái: đang chạy public tại `demo.example.com` (AWS EC2 `t3.large`, EIP `203.0.113.10`), bật/tắt on-demand qua `vm.sh`. Bản local dùng để phát triển và diễn tập.

## Tính năng chính

- Đăng ký và xác thực FIDO2/WebAuthn end-to-end (portal, API, IdP).
- Một HAProxy làm ingress duy nhất cho cả 6 domain, dùng chung một cert wildcard.
- coturn/TURN cho WebRTC, netbird mesh P2P giữa các peer (pin `NETBIRD_VERSION` 0.74.0).
- Deploy public lên AWS qua Terraform, EIP cố định, bật/tắt máy theo giờ bằng `vm.sh`.
- Reseed dữ liệu và đổi tên miền bằng một quy trình re-domain có sẵn.

## Yêu cầu

| Thành phần | Yêu cầu tối thiểu |
|------------|-------------------|
| Docker Engine | 24.x trở lên, kèm plugin `docker compose` v2 |
| Runtime | Colima (macOS) hoặc Docker Desktop; Linux dùng Docker Engine trực tiếp |
| RAM cấp cho Docker | 8 GB (17 container, dưới 8 GB dễ OOM lúc khởi động) |
| Đĩa trống | 15 GB cho image và volume dữ liệu |
| Port | 80, 443 rảnh trên host (HAProxy bind 0.0.0.0) |

Trên macOS với Colima, cấp máy ảo đủ tài nguyên trước khi chạy:

```bash
colima start --cpu 4 --memory 8 --disk 60
```

## Quickstart

```bash
git clone <repo-url> && cd full-stack-demo
cp .env.example .env          # sửa DOMAIN và mật khẩu trước khi chạy
./render.sh                   # render config từ template theo domain trong .env
docker compose up -d          # chờ ~40s tới khi 17 container healthy
docker compose ps             # tất cả cột STATUS phải là Up hoặc healthy
```

Khi stack đã lên, mở trình duyệt vào một trong các domain đã cấu hình trong `.env` (mặc định là các domain `*.example.internal`, đã trỏ về `127.0.0.1` trong `/etc/hosts`). Trang portal FIDO2 hiện lên là stack sống.

Kiểm tra nhanh từ dòng lệnh:

```bash
curl -kI https://portal.example.internal    # mong đợi HTTP/2 200
```

## Cấu hình `.env`

Sửa `.env` rồi chạy lại `./render.sh` mỗi khi đổi domain. Các biến chính:

| Biến | Mặc định | Ý nghĩa |
|------|----------|---------|
| `DOMAIN` | `example.internal` | Domain gốc, quyết định RP ID của FIDO2 và tên 6 subdomain |
| `NETBIRD_VERSION` | `0.74.0` | Pin cứng, không tự nâng. Nâng version đã gây relay-flap ở lần thử trước |
| `NB_SETUP_KEY` | (trống) | Setup key netbird, lấy sau khi login OIDC. Trống thì netbird-client loop |
| `DEMO_API_TOKEN` | (trống) | Token API mesh, gắn với setup key. Wipe DB mgmt là phải cấp lại |
| `CERT_DIR` | `certs/demo` | Thư mục cert wildcard phục vụ cả 6 domain |

Không commit `.env` thật và không đưa mật khẩu/token thật vào ví dụ. File `.env.example` chỉ giữ giá trị mẫu.

## Cấu trúc thư mục

```
full-stack-demo/
├── docker-compose.yml      # định nghĩa 17 container
├── .env / .env.example     # cấu hình domain, version, secret
├── render.sh               # render template j2 ra config theo domain
├── templates/              # nguồn config (haproxy, turnserver.conf.j2, ...)
├── certs/demo/             # cert wildcard cho cả 6 domain (*.pem)
├── auth-demo/data/         # volume dữ liệu FIDO2 (mysql, mongo, redis)
└── cloud/aws/              # Terraform IaC + vm.sh (bật/tắt EC2) + tf.sh
```

## Vận hành

Khởi động và dừng:

```bash
docker compose up -d        # khởi động, chờ ~40s
docker compose ps           # xem trạng thái 17 container
docker compose logs -f haproxy   # theo dõi log ingress
docker compose down         # dừng, giữ nguyên volume dữ liệu
```

Bật/tắt máy AWS on-demand (chạy trong `cloud/aws/`):

```bash
cd cloud/aws
./vm.sh on                  # bật EC2, gắn EIP, stack tự lên qua cloud-init
./vm.sh off                 # tắt EC2 để ngừng tính giờ compute
```

Lưu ý: Security Group khoá SSH port 22 theo IP người gọi. Khi IP của bạn đổi, chạy `./tf.sh apply` để cập nhật rule trước khi SSH.

## Troubleshooting

**Portal báo Connected nhưng trình duyệt timeout (Portal qua WireGuard "alive-but-dead").**
Hay xảy ra sau khi restart stack: peer đang tiêu thụ giữ một signal stream cũ, hiện Connected nhưng không có ICE. Sửa trên chính máy đang truy cập:

```bash
netbird down && netbird up
```

Reload portal, vào lại được. Chi tiết xem `docs/runbook-portal-wg.md`.

**Trình duyệt báo lỗi cert (`ERR_CERT_AUTHORITY_INVALID` hoặc sai tên miền).**
Cert trong `certs/demo` là wildcard cho domain đang cấu hình. Nếu vừa đổi `DOMAIN` mà chưa render lại, cert cũ không khớp tên mới. Xoá cert cũ rồi render lại:

```bash
rm certs/demo/*.pem
./render.sh && docker compose restart haproxy
```

Với bản local self-signed, import CA vào trust store của máy hoặc chấp nhận cảnh báo khi demo.

**Vài container restart liên tục ngay sau `up -d`.**
Thường do thiếu RAM (dưới 8 GB) nên OOM lúc khởi động đồng loạt. Kiểm tra:

```bash
docker compose ps           # tìm container STATUS Restarting
docker stats --no-stream    # xem mức RAM đang dùng
```

Tăng RAM cho Colima/Docker Desktop lên 8 GB rồi `docker compose up -d` lại.

## Liên hệ

- Chủ sở hữu vận hành: nhóm hạ tầng (nội bộ).
- Tài liệu sâu: Runbook trong `docs/`, quyết định kiến trúc trong `docs/adr/`.
- Sự cố khẩn: bật lại máy AWS qua `./vm.sh on`, sau đó báo kênh vận hành nội bộ.
````

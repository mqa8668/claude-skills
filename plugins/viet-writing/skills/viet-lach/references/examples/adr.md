# Ví dụ: ADR theo template Nygard

Load file này khi user yêu cầu ghi lại một quyết định kiến trúc (ADR) thật. Hai ADR dưới đây theo template Nygard: Title (ADR-NNN), Status, Context, Decision, Consequences, Alternatives considered.

Điểm cần bám khi phóng tác: Context nói rõ áp lực dẫn tới quyết định (không kể lể), Decision viết ở thể chủ động và dứt khoát ("Chúng tôi chọn..."), Consequences ghi cả mặt được và mặt phải chịu, Alternatives nêu phương án đã cân nhắc và lý do loại. Một quyết định một ADR, không gộp.

---

## ADR-004: Dùng HAProxy single ingress thay vì Nginx cho 6 domain

**Status:** Accepted (2026-07-05)

### Context

Stack `full-stack-demo` phục vụ 6 domain (portal, api, idp, grpc, và hai domain phụ) trên cùng một host. Bản đầu dùng nhiều file cấu hình Nginx, mỗi domain một server block, cộng một lớp reverse proxy riêng.

Cấu hình này sinh ra hai vấn đề. Thứ nhất, mỗi lần re-domain phải sửa nhiều file Nginx rời rạc, dễ sót và khó kiểm tra tính nhất quán. Thứ hai, TLS bị phân mảnh: cert phải được tham chiếu ở nhiều nơi, và có gotcha là Nginx phân giải DNS upstream lúc load config, khiến việc restart proxy đôi khi chết khi một upstream container chưa sẵn sàng.

Yêu cầu vận hành: một điểm vào duy nhất, một cert wildcard cho cả 6 domain, cấu hình render được từ template theo `DOMAIN`, và chịu được thứ tự khởi động 17 container không xác định.

### Decision

Chúng tôi chọn một HAProxy làm ingress duy nhất, bind `0.0.0.0` cho cả 6 domain, dùng chung một cert wildcard trong `certs/demo`.

Cụ thể:
- Một file cấu hình HAProxy render từ template, thay cả cụm file Nginx.
- Định tuyến theo SNI/Host tới backend tương ứng, tất cả trong một chỗ.
- Dùng runtime DNS resolver của HAProxy để phân giải tên backend lúc chạy, không phải lúc load config. Điều này khử luôn gotcha "restart proxy chết vì upstream chưa lên".
- SSO wait-loop trong portal/api/grpc để chịu được thứ tự khởi động container.

### Consequences

Mặt được:
- Re-domain chỉ đụng một cấu hình render từ một biến `DOMAIN`, ít điểm sai.
- Một cert wildcard phục vụ cả 6 domain, gia hạn và thay cert một lần.
- Ingress khởi động ổn định bất kể container backend lên trước hay sau, nhờ runtime resolver.
- Ít lớp proxy hơn, một chỗ để đọc log ingress (`docker compose logs -f haproxy`).

Mặt phải chịu:
- Cấu hình HAProxy đặc thù hơn Nginx, người tiếp nhận cần quen cú pháp `frontend`/`backend`/`acl`.
- Một ingress là một điểm chịu tải chung; lỗi cấu hình ảnh hưởng cả 6 domain cùng lúc, nên mọi thay đổi phải test trước khi `restart haproxy`.
- Cần giữ kỷ luật render từ template, không sửa tay file đã render.

### Alternatives considered

- **Giữ nhiều file Nginx (nguyên trạng).** Loại vì phân mảnh cấu hình và gotcha DNS-lúc-load-config làm restart không đáng tin khi container chưa sẵn sàng.
- **Traefik với auto-discovery qua Docker labels.** Loại vì thêm phụ thuộc và độ phức tạp không cần cho một stack cố định 17 container; auto-discovery giải bài toán mà stack này không có (service co giãn động).
- **Một Nginx duy nhất thay cụm nhiều file.** Gần đạt, nhưng vẫn vướng cách Nginx phân giải upstream lúc load config, phải thêm biến resolver và cấu hình vòng để né. HAProxy runtime resolver giải sạch hơn.

---

## ADR-007: Pin `NETBIRD_VERSION` 0.74.0 và tắt lazy-connection

**Status:** Accepted (2026-07-07)

### Context

Stack dùng netbird làm mesh P2P giữa các peer, chạy như sidecar cạnh Portal và các thành phần khác. Trước đây `NETBIRD_VERSION` để trôi theo bản mới nhất.

Hai vấn đề xuất hiện. Thứ nhất, nâng version thiếu kiểm soát làm hành vi kết nối đổi giữa các lần deploy, khó tái lập sự cố và khó bàn giao. Thứ hai, netbird 0.74.0 bật lazy-connection theo mặc định trên management: peer chỉ dựng kết nối khi có traffic, dẫn tới peer idle rồi relay-flap, và trên box AWS mgmt gây tình trạng peer đứng ở relay không lên P2P.

Yêu cầu: hành vi mesh phải tái lập được giữa local, NUC, và AWS; kết nối P2P phải ổn định cho demo, không phụ thuộc traffic để "đánh thức".

### Decision

Chúng tôi pin cứng `NETBIRD_VERSION` ở `0.74.0` trong `.env` và tắt lazy-connection trên management.

Cụ thể:
- `NETBIRD_VERSION=0.74.0`, không tự nâng. Nâng version chỉ làm có chủ đích, kèm test lại mesh.
- Tắt lazy-connection trên box management để peer chủ động dựng và giữ kết nối P2P thay vì chờ traffic.
- Kiểm chứng bằng `verify-mesh-p2p.sh`: mong đợi các link nội bộ VM xanh P2P (đã đo 12/12 link qua docker bridge host candidates).

### Consequences

Mặt được:
- Hành vi mesh nhất quán giữa local, NUC amd64, và AWS; sự cố tái lập được.
- Peer giữ P2P ổn định, không idle rồi relay-flap, demo không bị "Connected nhưng deaf".
- Bàn giao rõ ràng: một version cố định, một script verify.

Mặt phải chịu:
- Không tự nhận bản vá/tính năng mới của netbird; phải chủ động đánh giá và nâng khi cần.
- Tắt lazy-connection tốn tài nguyên giữ kết nối liên tục hơn, chấp nhận được ở quy mô demo.
- Sidecar netbird foreground của Portal vẫn STUN-blind (chạy `--disable-dns`, khác net với mesh demo), nên vài đường vẫn relay; đây là giới hạn đã biết, không phải hồi quy.

### Alternatives considered

- **Để version trôi theo latest.** Loại vì hành vi đổi giữa các deploy, không tái lập được sự cố, khó bàn giao.
- **Giữ 0.74.0 nhưng để lazy-connection bật (mặc định).** Loại vì đây chính là nguyên nhân peer idle/relay-flap quan sát được trên mgmt.
- **Hạ về bản cũ hơn 0.74.0.** Cân nhắc rồi loại: bản cũ thiếu một số fix cần, và 0.74.0 sau khi tắt lazy-connection đã ổn định cho nhu cầu hiện tại.

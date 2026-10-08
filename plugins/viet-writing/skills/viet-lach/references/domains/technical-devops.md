# Domain: Kỹ thuật / Hạ tầng / DevOps / Bàn giao

## Đối tượng đọc

Kỹ sư tiếp nhận hệ thống, người trực on-call lúc 2 giờ sáng, người deploy lại sau khi bạn nghỉ việc. Họ biết Docker, Linux, mạng cơ bản, nhưng KHÔNG ở trong đầu bạn. Họ đọc tài liệu này lúc đang gấp: dịch vụ down, hoặc cần dựng lại stack trên máy mới. Họ cần copy-paste chạy được ngay, không cần bạn giải thích Docker là gì.

Bối cảnh đọc quyết định văn phong: người đọc đang stress, quét nhanh tìm đúng lệnh, không có thời gian đọc văn xuôi dài. Thiết kế cho việc quét (Scannability), không cho việc đọc tuần tự.

## Từ vựng & giọng văn

Giữ nhiều tiếng Anh: Docker, container, image, volume, cert, deploy, port, healthcheck, ingress, mesh. Dịch ra nghe lạ với dân kỹ thuật. Register chuyên nghiệp trung tính, xưng "bạn" với người đọc, "nhóm" hoặc "chúng tôi" khi nói về bên vận hành. Không suồng sã, không trang trọng kiểu văn bản hành chính.

## Nỗi đau của người đọc (viết để tránh)

- Chạy theo hướng dẫn nhưng hỏng vì thiếu tiền điều kiện không được nêu (chưa cài Docker, chưa có file `.env`, chưa mở port).
- Lệnh dán vào terminal không chạy: xuống dòng sai, thiếu escape, đường dẫn tương đối không rõ đứng ở đâu.
- Làm xong không biết đã đúng chưa vì không có bước verify, phải đoán.
- Thao tác lỗi mà không có đường lùi: tài liệu thiếu rollback, hỏng là hỏng luôn.
- Không biết version nào: tài liệu viết chung chung, phiên bản mới đã đổi cờ, đổi hành vi.

## Quy ước bắt buộc

- Mọi lệnh phải copy-paste chạy được nguyên khối. Đường dẫn tuyệt đối hoặc nêu rõ thư mục đứng. Đặt lệnh trong code block, không trộn vào câu văn.
- Nêu version pin của mọi thành phần nhạy cảm. Ví dụ: `NETBIRD_VERSION` ghim `0.74.0`, không viết "phiên bản mới nhất".
- Mỗi thủ tục có bước verify ở cuối: lệnh kiểm tra + kết quả mong đợi cụ thể ("`docker compose ps` phải thấy 17 container `healthy`").
- Mỗi thao tác thay đổi trạng thái có bước rollback hoặc cách hoàn tác đi kèm.
- Kiến trúc nhiều thành phần thì vẽ sơ đồ topology (hand off `figma-topology`), đừng tả luồng bằng văn xuôi.
- Phân biệt rõ "chạy 1 lần" (dựng ban đầu, provision) với "chạy định kỳ" (restart, backup). Đặt tiêu đề tách bạch.
- Cảnh báo TRƯỚC mọi thao tác phá huỷ dữ liệu (reseed, wipe DB, `rm` volume) bằng dòng cảnh báo đặt trên lệnh, kèm điều kiện an toàn.

## Cấu trúc & format hay dùng

- `structures/readme.md`: điểm vào của repo, cho người mới cần bức tranh tổng thể và cách chạy nhanh.
- `structures/runbook.md`: thủ tục vận hành lặp lại (deploy, restart, backup, xử lý sự cố). Đây là xương sống của bàn giao.
- `structures/adr.md`: ghi lại quyết định kiến trúc và lý do (ví dụ vì sao 1 HAProxy single ingress thay vì nhiều Nginx).
- `structures/diataxis.md`: phân loại tài liệu theo 4 mode để không trộn tra cứu với dạy học.
- Format: `formats/markdown-doc.md` (repo, wiki nội bộ). Áp dụng Progressive disclosure: quickstart lên đầu, chi tiết và ngoại lệ xuống mục sau hoặc phụ lục.

## Mẫu mở đầu / ví dụ ngắn

Mở đầu runbook restart (BLUF, vào thẳng việc):

> Stack `full-stack-demo` gồm ~18 container Docker Compose. Khởi động lại toàn bộ mất khoảng 40 giây. Trước khi chạy, đảm bảo Docker daemon đang chạy và bạn đang đứng ở thư mục gốc repo (nơi có `docker-compose.yml`).
>
> ```bash
> cd /data/full-stack-demo
> docker compose up -d
> ```
>
> Verify: `docker compose ps` phải liệt kê tất cả container ở trạng thái `healthy` sau ~40s. Nếu HAProxy `unhealthy`, xem mục "Cert và ingress" bên dưới.

Cảnh báo trước thao tác phá huỷ (đặt ngay trên lệnh):

> Cảnh báo: bước reseed sẽ xoá sạch dữ liệu MySQL/Mongo/Redis của FIDO2 và nạp lại từ dump. Không hoàn tác được nếu chưa backup. Chỉ chạy khi đổi domain hoặc dựng môi trường mới.

## Lỗi hay gặp

- Viết "khởi động hệ thống" thay vì lệnh thật + thời gian chờ + dấu hiệu thành công (vi phạm Specificity).
- Bỏ qua điều kiện tiên quyết vì "hiển nhiên với mình" (Curse of knowledge): người tiếp nhận không có ngữ cảnh đó.
- Lệnh không nói đứng ở thư mục nào, hoặc dùng đường dẫn tương đối mà không nêu gốc.
- Ghi "phiên bản mới nhất" thay vì version pin cụ thể, khiến kết quả không lặp lại được.
- Đưa thao tác wipe/reseed mà không cảnh báo và không kèm bước backup trước đó.

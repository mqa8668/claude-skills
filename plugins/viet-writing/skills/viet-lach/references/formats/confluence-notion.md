# Format: Wiki công ty / Knowledge base (Confluence, Notion)

## Đặc trưng

- Nhiều người cùng sửa, không có một tác giả duy nhất.
- Phải tìm ra được (findable): người ta tới trang qua ô search, không qua mục lục.
- Có cây trang (page tree), trang này link trang kia.
- Sống lâu và dễ lỗi thời: viết xong không ai đụng, nội dung trôi khỏi thực tế.

## Cấu trúc chuẩn

- Page tree tổ chức theo Diátaxis: nhóm Tutorial, How-to, Reference, Explanation.
- Mỗi trang mở đầu bằng ý chính (Inverted Pyramid), người đọc nắm được ngay ở màn hình đầu.
- Mỗi trang ghi owner và ngày cập nhật cuối ngay đầu trang.

## Quy ước trình bày

- Tiêu đề trang chứa từ khoá người ta thật sự search ("Deploy full-stack-demo lên AWS", không "Hướng dẫn triển khai").
- Dùng panel info / warning / note cho cảnh báo và điều kiện tiên quyết.
- Bảng cho nội dung tham chiếu (biến môi trường, port, endpoint).
- Link nội bộ giữa các trang thay vì copy nội dung.
- Gắn label cho trang để lọc và gom theo chủ đề, tăng khả năng tìm ra (findable).
- Một nguồn sự thật: mỗi thông tin nằm đúng một chỗ, nơi khác link tới (Consistency).

## Giới hạn / ngưỡng

- Trang dài thì tách theo Diátaxis, đừng gộp Tutorial lẫn Reference một trang.
- Bảng tham chiếu dài thì để riêng một trang con.

## Tránh

- Trang mồ côi không trang nào link tới, search may rủi mới thấy.
- Nội dung trùng lặp nhiều nơi, sửa một chỗ quên chỗ kia.
- Trang không ai sở hữu, hỏng không ai chịu trách nhiệm.
- Để lỗi thời mà không đánh dấu (thêm banner "cần review" hoặc ngày rà soát).

## Bàn giao render

Không cần render riêng. Confluence và Notion tự render. Viết nội dung Markdown hoặc dán trực tiếp, dùng panel và bảng có sẵn của nền tảng. Sơ đồ kiến trúc nhờ `figma-topology` xuất ảnh rồi nhúng. Khi cần bản in gửi ngoài, tách một bản báo cáo và hand off `doc-builder`.

## Cấu trúc (structure) ưu tiên

- `diataxis`: xương sống của cây trang.
- `inverted-pyramid`: mỗi trang mở bằng ý chính.
- `runbook`: quy trình vận hành, xử lý sự cố.

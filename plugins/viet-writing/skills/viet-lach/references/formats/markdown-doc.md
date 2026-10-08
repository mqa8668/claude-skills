# Format: Markdown doc (README / wiki repo / .md trong git)

## Đặc trưng

- Đọc trên GitHub hoặc trong editor, render Markdown, không có CSS riêng.
- Diff-friendly: mỗi thay đổi hiện rõ trong pull request, người review đọc từng dòng.
- Sống trong repo, đi cùng code, version theo git.
- Người đọc là dev, quen quét heading và code fence (Scannability).

## Cấu trúc chuẩn

- Theo `readme` (tổng quan dự án) hoặc theo Diátaxis (chia Tutorial / How-to / Reference / Explanation thành file hoặc mục riêng).
- File dài thì mở đầu bằng TOC hoặc mục lục link tới các phần.

## Quy ước trình bày

- Heading ATX (`#`, `##`, `###`), không nhảy cấp (đừng từ `#` xuống thẳng `###`).
- Code fence luôn ghi tên ngôn ngữ: ```bash, ```yaml, ```json để tô màu đúng.
- Link tương đối tới file khác trong repo (`./docs/deploy.md`), không hardcode URL tuyệt đối.
- Bảng Markdown cho so sánh nhiều chiều, giữ cột gọn.
- Giữ dòng ngắn, xuống dòng theo ý để diff sạch, tránh dòng khổng lồ đổi một chữ mà đỏ cả dòng.
- Bold từ khoá, `inline code` cho lệnh, tên file, cờ, biến.

## Giới hạn / ngưỡng

- Một file quá dài (quá ~2 màn hình cuộn) thì tách nhiều file link nhau (Progressive disclosure).
- TOC khi file vượt ~2 màn hình.
- Bảng không quá rộng, tràn ngang trên GitHub thì tách hoặc chuyển sang list.

## Tránh

- Nhồi HTML thô (`<div>`, `<table>` phức tạp) trừ khi Markdown thuần không diễn đạt được.
- Ảnh nặng nhúng inline làm repo phình, chỉ nhúng khi cần và để trong thư mục assets.
- Heading nhảy cấp làm hỏng outline tự sinh.
- Bảng quá rộng, ASCII diagram vẽ tay dễ vỡ khi font đổi.

## Bàn giao render

GitHub và editor tự render Markdown nên thường không cần render riêng. Khi cùng nội dung cần bản đẹp gửi ngoài (khách, sếp), tách một bản báo cáo và hand off `doc-builder`. Sơ đồ kiến trúc nhờ `figma-topology` xuất ảnh rồi nhúng thay cho ASCII.

## Cấu trúc (structure) ưu tiên

- `readme`: file gốc của repo.
- `diataxis`: chia đúng loại tài liệu khi wiki repo nhiều trang.
- `runbook`: quy trình vận hành, xử lý sự cố.
- `adr`: ghi lại từng quyết định kỹ thuật.

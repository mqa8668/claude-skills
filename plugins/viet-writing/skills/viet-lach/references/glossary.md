# Glossary: Nguyên tắc viết rõ + Kiến trúc thông tin

File này định nghĩa ngắn gọn các nguyên tắc dùng xuyên suốt 9 cấu trúc. Đọc 1 lần, áp dụng mọi nơi. Mỗi mục: định nghĩa 1 dòng + 1 ví dụ siêu ngắn. Khi 1 structure nhắc tên nguyên tắc (ví dụ "áp dụng Given-New"), tra file này.

## A. Nguyên tắc viết rõ (Clarity)

**BLUF (Bottom Line Up Front)**: Đặt kết luận/việc cần làm ở câu đầu, lý do xuống sau. Ví dụ: "Nên chọn HAProxy. Ba lý do: ..." thay vì kể lể rồi mới chốt cuối bài.

**One idea per sentence**: Mỗi câu 1 ý. Câu có 2 mệnh đề "và... nhưng... đồng thời..." thì tách đôi. Ví dụ: tách "Hệ thống chạy Docker và cần 8GB RAM và mở port 443" thành 3 câu hoặc 3 bullet.

**Plain language**: Chọn từ phổ thông thay vì từ kêu. "Dùng" > "sử dụng", "giúp" > "hỗ trợ", "vì" > "do bởi việc". Không đánh mất chính xác kỹ thuật để đổi lấy sự đơn giản.

**Active voice**: Nêu rõ ai làm gì. "Script tạo cert" > "Cert được tạo". Bị động chỉ dùng khi chủ thể không quan trọng hoặc chưa biết.

**Word economy**: Bỏ từ thừa không đổi nghĩa. Cắt "một cách", "việc", "của việc", "có thể được", "nhằm mục đích". "Nhằm mục đích tối ưu hoá" → "để tối ưu".

**Parallelism (song song)**: Các mục cùng cấp cùng dạng ngữ pháp. Bullet cùng mở đầu bằng động từ ("Cài...", "Chạy...", "Kiểm tra..."), không lẫn danh từ với mệnh đề.

**Signposting**: Dùng heading, TL;DR, "bước tiếp theo", câu chuyển để người đọc luôn biết mình đang ở đâu. Heading phải mô tả đúng nội dung bên dưới, không mơ hồ kiểu "Tổng quan", "Giới thiệu" rỗng.

**Progressive disclosure**: Lộ thông tin theo tầng. Ý chính trước, chi tiết/ngoại lệ/nâng cao sau (hoặc trong mục gập, phụ lục, link). Người đọc chọn độ sâu.

**Chunking**: Nhóm thông tin thành cụm 3-7 mục. Danh sách 15 bước dài → gộp thành 4 giai đoạn, mỗi giai đoạn vài bước.

**Concrete over abstract**: Số, tên, lệnh cụ thể thắng mô tả chung. "chờ ~40s" > "chờ một lát". "17 container" > "nhiều container".

## B. Kiến trúc thông tin (Information Architecture)

**Given-New Contract**: Câu/đoạn sau bắt đầu bằng thông tin đã biết (given) rồi mới thêm cái mới (new). Tạo mạch đọc liền. Ngược lại là văn "nhảy cóc" khó theo.

**Inverted Pyramid**: Quan trọng nhất lên đầu, chi tiết bổ trợ xuống dưới, nền/lịch sử cuối cùng. Người đọc dừng ở đâu cũng đã nắm ý chính. Gốc từ báo chí.

**Pyramid Principle (Minto)**: Bắt đầu bằng 1 câu trả lời/luận điểm chính, đỡ bởi 3 nhóm lý do, mỗi nhóm lại đỡ bởi dữ kiện. Đọc từ trên xuống theo dạng cây.

**MECE (Mutually Exclusive, Collectively Exhaustive)**: Khi chia mục, các mục không chồng lấn nhau và gộp lại phủ hết. Tránh danh mục vừa thừa vừa thiếu.

**Diátaxis 4 modes**: 4 loại tài liệu phục vụ 4 nhu cầu khác nhau, không trộn: Tutorial (học qua làm), How-to (đạt 1 mục tiêu cụ thể), Reference (tra cứu chính xác), Explanation (hiểu vì sao). Chi tiết ở `structures/diataxis.md`.

**Scannability**: Người đọc kỹ thuật quét chứ không đọc tuần tự. Thiết kế để quét: heading rõ, bold từ khoá, bullet, bảng, code block tách khỏi prose.

**Curse of knowledge**: Người viết quên mất cảm giác chưa biết. Chống bằng cách nêu điều kiện tiên quyết, định nghĩa thuật ngữ lần đầu dùng, không nhảy bước hiển nhiên-với-mình.

**Cognitive load**: Trí nhớ làm việc có hạn. Giảm tải bằng chunking, sơ đồ thay prose dài, 1 màn hình/slide 1 ý.

## C. Chất lượng câu chữ

**Consistency (nhất quán)**: 1 khái niệm 1 tên, 1 lệnh 1 cách viết, 1 kiểu heading, 1 ngôi xưng, xuyên suốt tài liệu. Bất nhất làm người đọc nghi ngờ độ tin.

**Specificity**: Thay tính từ mơ hồ ("nhanh", "dễ", "an toàn") bằng bằng chứng đo được ("khởi động ~40s", "3 bước", "cert TLS 1.3"). Với tài liệu kỹ thuật, tính từ tự khen là tiếng ồn.

**Show, then tell**: Với thao tác, đưa lệnh/ảnh/ví dụ trước, giải thích sau. Người đọc kỹ thuật tin ví dụ chạy được hơn mô tả.

**Peak-End (áp cho tài liệu dài/slide)**: Người đọc nhớ đỉnh và kết. Đầu tư vào slide/đoạn quan trọng nhất và câu kết (next step, tóm tắt, CTA).

## D. Cách dùng glossary này

Khi 1 structure hay checklist nhắc tên nguyên tắc (ví dụ "kiểm tra Parallelism", "áp dụng BLUF"), tra định nghĩa ở đây thay vì lặp lại trong từng file. Khi user hỏi 1 nguyên tắc cụ thể, mở file này trả lời.

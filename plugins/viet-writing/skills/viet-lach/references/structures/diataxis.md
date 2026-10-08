# Diátaxis (bốn loại tài liệu: Tutorial, How-to, Reference, Explanation)

Diátaxis không phải một khuôn viết câu, mà là lăng kính phân loại: mọi tài liệu kỹ thuật phục vụ đúng một trong bốn nhu cầu, và bốn nhu cầu đó không nên trộn trong cùng một trang. Dùng nó ở bước lập mục lục cho một bộ tài liệu, một wiki, hay một gói bàn giao, trước khi viết câu chữ. Ai đang viết docs cho `full-stack-demo` hoặc bất kỳ hệ thống nào cũng nên chạy qua bước phân loại này để khỏi viết một trang "vừa dạy vừa tra cứu vừa giải thích" mà không loại nào ra hồn. Không cần Diátaxis cho một email, một slide lẻ, hay một câu trả lời ngắn: nó là công cụ cho quy mô bộ tài liệu, không phải cho từng mẩu. Nguyên tắc gốc là MECE: bốn loại không chồng lấn, gộp lại phủ hết nhu cầu người đọc.

## Các biến thể (bốn mode, không trộn trong một trang)

### 1. Tutorial (học qua làm)
Đưa người mới chưa biết gì tới cảm giác "tôi làm được", qua một hành trình có kết quả thấy được.
- Tâm thế người đọc: mới toanh, cần được dắt tay, không muốn phải quyết định gì.
- Giọng văn: "chúng ta cùng làm", ngôi thứ nhất số nhiều, trấn an, không rẽ nhánh.
- Cấu trúc điển hình: một mạch tuyến tính từ số 0 tới thành quả, mỗi bước có kết quả quan sát được.
- Ví dụ FIDO2: "Chạy được demo trong 15 phút". Không giải thích vì sao có 17 container, chỉ cần người đọc `docker compose up -d`, chờ ~40s, và thấy trang đăng nhập lên.

### 2. How-to (đạt một mục tiêu cụ thể)
Dẫn người đã biết cơ bản hoàn thành một tác vụ có thật trong công việc.
- Tâm thế người đọc: có mục tiêu rõ, đang giữa việc, cần đúng các bước.
- Giọng văn: mệnh lệnh, ngắn, giả định người đọc đã biết ngữ cảnh.
- Cấu trúc điển hình: điều kiện tiên quyết, các bước đánh số, cách kiểm tra thành công.
- Ví dụ FIDO2: "Re-domain FIDO2". Không dạy từ đầu, chỉ nêu đúng chuỗi thao tác (sửa `.env`, `rm certs/demo/*.pem`, chạy lại render, reseed DB) cho người đang cần đổi domain.

### 3. Reference (tra cứu chính xác)
Trả lời "cái này là gì, giá trị nào, ở đâu" thật khô, đầy đủ, tra nhanh.
- Tâm thế người đọc: đã biết mình tìm gì, cần con số hoặc tên đúng, không muốn đọc văn.
- Giọng văn: trung tính, mô tả, không thuyết phục, không kể chuyện.
- Cấu trúc điển hình: bảng, danh mục, tra theo mục, sắp xếp nhất quán để quét.
- Ví dụ FIDO2: "Danh mục 17 container" (tên service, port, phụ thuộc, healthcheck). Không giải thích lý do thiết kế, chỉ liệt kê đúng và đủ.

### 4. Explanation (hiểu vì sao)
Cho người đọc cái nền để hiểu vì sao hệ thống được thiết kế thế này, các đánh đổi, bối cảnh.
- Tâm thế người đọc: rảnh hơn, muốn hiểu sâu, không đang gấp làm việc gì.
- Giọng văn: bàn luận, nêu lựa chọn thay thế và lý do loại bỏ.
- Cấu trúc điển hình: đặt vấn đề, các phương án, đánh đổi, kết luận.
- Ví dụ FIDO2: "Vì sao HAProxy thay Nginx". Bàn về single ingress phục vụ 6 domain, một cert wildcard `certs/demo`, cái gì Nginx không giải được, chứ không hướng dẫn cấu hình từng dòng.

## Kỹ thuật cốt lõi

### 1. Hỏi bốn câu để định loại
Trước khi viết một trang, hỏi: người đọc đang HỌC lần đầu, đang LÀM một việc, đang TRA một dữ kiện, hay đang muốn HIỂU vì sao? Bốn động từ này map thẳng sang Tutorial, How-to, Reference, Explanation. Một trang chỉ được trả lời một động từ.

### 2. Bảng phân biệt bốn loại
Khi phân vân, chiếu vào bảng theo bốn trục.

| Trục | Tutorial | How-to | Reference | Explanation |
|------|----------|--------|-----------|-------------|
| Người đọc muốn | Học | Làm xong việc | Tra dữ kiện | Hiểu vì sao |
| Điểm xuất phát | Số 0 | Đã biết cơ bản | Biết mình tìm gì | Muốn bối cảnh |
| Giọng | Dắt tay | Mệnh lệnh | Khô, mô tả | Bàn luận |
| Ví dụ FIDO2 | Demo 15 phút | Re-domain | 17 container | HAProxy vs Nginx |

### 3. Dấu hiệu một trang đang bị trộn loại
Cảnh báo khi thấy:
- Một How-to chen đoạn "để hiểu sâu, cần biết rằng...". Đó là Explanation lạc chỗ.
- Một Reference bỗng có bước 1-2-3. Đó là How-to.
- Một Tutorial dừng lại liệt kê mọi cờ của một lệnh. Đó là Reference.
Mỗi lần văn đổi giọng đột ngột là một chỗ nghi trộn loại.

### 4. Tách trang bị trộn thay vì nhồi
Khi phát hiện trộn, cắt phần lạc ra thành trang riêng đúng loại của nó, rồi để lại một link. Ví dụ: runbook "Re-domain FIDO2" (How-to) chỉ cần một dòng "vì sao phải xoá cert trước, xem [Explanation]" thay vì giải thích tại chỗ. Đây là Progressive disclosure: người vội làm không bị chặn, người muốn hiểu bấm link.

### 5. Đặt tên trang lộ đúng loại
Tên trang nên báo trước loại tài liệu: "Bắt đầu với demo" (Tutorial), "Cách re-domain FIDO2" (How-to), "Danh mục container và port" (Reference), "Vì sao chọn HAProxy" (Explanation). Signposting bằng chính tiêu đề giúp người đọc biết ngay có nên vào hay không.

### 6. Điều hướng chéo bằng link, không copy
Bốn loại bổ trợ nhau nhưng ở trang khác nhau. Nối chúng bằng link một chiều (How-to trỏ tới Reference của lệnh, Explanation trỏ tới How-to áp dụng), không dán trùng nội dung. Trùng nội dung là mầm bất nhất khi hệ thống đổi.

### 7. Dùng Diátaxis để dựng mục lục gói bàn giao
Một gói bàn giao `full-stack-demo` chuẩn gồm: một Tutorial (chạy demo lần đầu), vài How-to (re-domain, bật/tắt AWS bằng `vm.sh`), một khối Reference (container, port, biến `.env`), vài Explanation (các quyết định kiến trúc). Chia trước theo bốn loại rồi mới viết, mục lục tự MECE.

### 8. Phân loại không thay được chất lượng viết từng loại
Diátaxis chỉ nói trang này thuộc loại nào, không tự làm nó hay. Sau khi phân loại, mỗi loại vẫn cần cấu trúc riêng: How-to mượn Runbook, phần giải thích quyết định mượn ADR, tóm tắt mượn Pyramid. Diátaxis là bước chia, không phải bước viết.

## Checklist trước khi xuất

1. Mỗi trang trả lời đúng MỘT trong bốn động từ (học/làm/tra/hiểu)?
2. Tiêu đề trang lộ rõ nó thuộc loại nào?
3. Không trang nào đổi giọng giữa chừng (dấu hiệu trộn loại)?
4. Phần lạc loại đã tách ra trang riêng và nối bằng link?
5. Reference chỉ mô tả, không lén thành How-to (không có bước 1-2-3)?
6. Tutorial không sa đà liệt kê mọi tuỳ chọn (không lén thành Reference)?
7. Bộ tài liệu gộp lại phủ đủ bốn nhu cầu, không thừa không thiếu (MECE)?
8. Không em dash, không AI-tell?

## Lỗi cần tránh

- Viết một trang "tất cả trong một" vừa dạy vừa hướng dẫn vừa tra cứu. Người mới ngợp, người vội bực.
- Nhét lý do thiết kế vào giữa How-to. Người đang gấp làm việc không cần nghe vì sao.
- Reference kể chuyện. Bảng port mà thêm văn "như bạn thấy, thật tiện lợi" là tiếng ồn.
- Tutorial cho người đọc quá nhiều lựa chọn. Mỗi nhánh "nếu bạn muốn X thì..." làm người mới mất phương hướng.
- Coi Diátaxis là khuôn bắt buộc cho mọi mẩu chữ. Một email thông báo không cần chia bốn loại.

## Nguyên tắc glossary khuyến nghị

Diátaxis 4 modes (lõi), MECE (chia bốn loại không chồng lấn, phủ hết), Signposting (tiêu đề lộ loại), Progressive disclosure (tách chi tiết ra trang riêng nối bằng link), Scannability (đặc biệt cho Reference), Given-New (mạch đọc trong Tutorial và Explanation).

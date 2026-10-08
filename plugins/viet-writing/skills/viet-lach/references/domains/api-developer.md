# Domain: Tài liệu API / SDK / Developer

## Đối tượng đọc

Lập trình viên tích hợp API của bạn vào hệ thống của họ. Họ đọc trong lúc code, mở tài liệu bên cạnh IDE, copy ví dụ vào chạy thử. Họ cần độ chính xác tuyệt đối: một tham số sai tên, một mã lỗi thiếu, là họ mất hàng giờ debug. Họ không đọc tuần tự, mà nhảy tới đúng endpoint đang cần rồi copy ví dụ.

Với nhóm này, tài liệu lệch code thật còn tệ hơn không có tài liệu: nó khiến người ta tin nhầm rồi mất thời gian gấp đôi.

## Từ vựng & giọng văn

Giữ nguyên tiếng Anh kỹ thuật, chính xác từng ký tự: tên endpoint, tham số, header, mã lỗi phải khớp hệt code. Register trung tính, ngắn gọn, không văn hoa. Không cần "bạn" hay lời dẫn dài, đi thẳng vào method, path, ví dụ. Câu mô tả ngắn, phần lớn nội dung là code và bảng.

## Nỗi đau của người đọc (viết để tránh)

- Tài liệu sai lệch code thật: tham số đã đổi tên, endpoint đã bỏ, nhưng docs chưa cập nhật.
- Thiếu ví dụ request và response thật, chỉ mô tả bằng chữ, người đọc phải tự đoán JSON trông thế nào.
- Không rõ cơ chế xác thực: gắn token vào đâu, header nào, lấy token ở đâu.
- Thiếu bảng mã lỗi: gặp lỗi không tra được nghĩa và cách xử lý.
- Không có quickstart: người mới không biết bắt đầu từ đâu để có call thành công đầu tiên.

## Quy ước bắt buộc

- Reference chính xác 100% khớp code. Không bịa tham số, không đoán kiểu dữ liệu. Nếu chưa chắc, đọc source hoặc đánh dấu `[[cần xác nhận]]`, không phỏng đoán.
- Mỗi endpoint đủ khối: method + path + mô tả một dòng + bảng tham số (tên, kiểu, bắt buộc/tuỳ chọn, mô tả) + request mẫu + response mẫu + bảng mã lỗi + ví dụ `curl` chạy được.
- Nêu rõ xác thực và versioning: cách lấy và gắn token, header bắt buộc, cách chỉ định version API.
- Code sample copy-paste chạy được: giá trị thật hoặc placeholder rõ ràng (`<YOUR_TOKEN>`), không cắt xén khiến chạy lỗi.
- Có quickstart dẫn tới "call thành công đầu tiên": từ số 0 tới một request trả về 200 trong ít bước nhất.
- Nhất quán định dạng giữa các endpoint: cùng thứ tự mục, cùng kiểu trình bày, để người đọc quét quen mắt (Scannability, Parallelism).

## Cấu trúc & format hay dùng

- Diátaxis Reference: mode chủ đạo, mô tả chính xác từng endpoint để tra cứu. Xem `structures/diataxis.md`.
- Diátaxis How-to: cho các tác vụ tích hợp cụ thể ("Cách làm mới token").
- Diátaxis Tutorial: cho phần quickstart dẫn call đầu tiên.
- Format: `formats/markdown-doc.md`, hợp với docs trong repo và trang developer.

## Mẫu mở đầu / ví dụ ngắn

Một endpoint đúng chuẩn (Show-then-tell: ví dụ chạy được trước, giải thích sau):

> ### `POST /api/v1/auth/register`
> Bắt đầu đăng ký một khoá FIDO2 cho người dùng. Trả về challenge để trình duyệt tạo credential.
>
> Xác thực: header `Authorization: Bearer <YOUR_TOKEN>`.
>
> ```bash
> curl -X POST https://demo.example.com/api/v1/auth/register \
>   -H "Authorization: Bearer <YOUR_TOKEN>" \
>   -H "Content-Type: application/json" \
>   -d '{"username": "alice"}'
> ```
>
> Response `200`:
> ```json
> { "challenge": "a1b2c3...", "rp": { "id": "demo.example.com" } }
> ```
>
> Mã lỗi: `400` thiếu `username`, `401` token sai hoặc hết hạn, `409` username đã đăng ký.

## Lỗi hay gặp

- Docs lệch code sau khi API đổi mà tài liệu không cập nhật theo, để lại tham số hoặc endpoint chết.
- Mô tả tham số bằng văn xuôi thay vì bảng, người đọc phải tự bóc tách.
- Thiếu response mẫu và bảng mã lỗi, người tích hợp không biết xử lý trường hợp lỗi.
- Ví dụ `curl` cắt xén hoặc thiếu header, dán vào chạy không được.
- Bịa tham số hoặc kiểu dữ liệu khi không chắc, thay vì đọc source hoặc đánh dấu cần xác nhận.

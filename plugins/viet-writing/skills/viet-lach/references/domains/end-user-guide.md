# Domain: Hướng dẫn người dùng cuối

## Đối tượng đọc

Người dùng bình thường, không rành kỹ thuật. Họ chỉ muốn làm xong một việc: đăng ký tài khoản, đăng nhập, đổi mật khẩu. Họ không quan tâm hệ thống chạy gì bên dưới. Họ sợ bấm nhầm làm hỏng, sợ mất dữ liệu, sợ bị khoá tài khoản. Họ đọc trên điện thoại hoặc màn hình nhỏ, vừa đọc vừa làm theo.

Với nhóm này, thứ khiến họ bỏ cuộc là một câu họ không hiểu. Mỗi từ chuyên môn không giải thích là một chỗ họ có thể dừng lại và gọi hỗ trợ.

## Từ vựng & giọng văn

Dịch sang tiếng Việt đời thường, tránh jargon tối đa. Nếu buộc phải dùng một từ tiếng Anh (ví dụ khoá bảo mật FIDO2), chú thích ngắn trong ngoặc lần đầu rồi dùng từ Việt xuyên suốt: "khoá bảo mật (security key)". Register thân thiện, xưng "bạn", đôi khi "mình" khi hướng dẫn. Câu hỏi trực tiếp để dẫn dắt: "Bạn thấy nút màu xanh chưa?".

## Nỗi đau của người đọc (viết để tránh)

- Gặp thuật ngữ lạ (token, xác thực hai lớp, cache) không giải thích, đọc xong vẫn không hiểu.
- Sợ bấm sai làm hỏng, nên đứng im không dám thao tác tiếp.
- Không có ảnh minh hoạ, phải tự đoán nút nào nằm ở đâu trên màn hình.
- Tài liệu giả định họ đã biết sẵn (đã có tài khoản, đã cắm thiết bị), trong khi họ chưa.
- Làm xong không biết đúng chưa vì hướng dẫn không tả kết quả trông thế nào.

## Quy ước bắt buộc

- Mỗi bước chỉ 1 hành động. Không gộp "mở trang, đăng nhập rồi vào cài đặt" thành một bước.
- Có ảnh chụp màn hình hoặc chỉ dẫn trực quan cho bước quan trọng (khoanh vùng nút cần bấm). Hand off `doc-builder` để chèn ảnh gọn gàng.
- Dùng mẫu "nếu bạn thấy X thì làm Y" cho các nhánh: xử lý trường hợp màn hình khác nhau mà không bắt người đọc suy luận.
- Nêu kết quả đúng sau mỗi bước để họ tự đối chiếu: "Sau khi bấm, màn hình hiện dòng chữ Đăng ký thành công màu xanh".
- Không giả định kiến thức nền (chống Curse of knowledge): nói rõ cần chuẩn bị gì trước khi bắt đầu.
- Ngôn ngữ tích cực, trấn an: nếu có bước rủi ro, nói trước "bước này an toàn, bạn có thể làm lại nếu nhầm".
- Đánh số bước liên tục, không đảo, không nhảy. Người đọc bám theo số để không lạc.
- Có mục "Gặp trục trặc" ở cuối, gom các lỗi thường gặp và cách xử lý, để họ không phải gọi hỗ trợ ngay.

## Cấu trúc & format hay dùng

- Diátaxis Tutorial: dạy người mới làm lần đầu, đi từng bước từ đầu tới khi thấy kết quả. Đây là mode chủ đạo.
- Diátaxis How-to: cho người đã biết cơ bản, chỉ cần làm một việc cụ thể (ví dụ "Cách đổi khoá bảo mật").
- Xem `structures/diataxis.md` để không trộn hai mode.
- Format: `formats/markdown-doc.md` cho tài liệu đơn giản, hoặc `formats/confluence-notion.md` nếu đăng lên trang trợ giúp nội bộ.

## Mẫu mở đầu / ví dụ ngắn

Mở đầu tutorial đăng ký (nói rõ đích đến và thời gian, dùng Show-then-tell):

> Hướng dẫn này giúp bạn tạo tài khoản và đăng nhập bằng khoá bảo mật (security key), một thiết bị nhỏ cắm vào máy tính thay cho mật khẩu. Mất khoảng 3 phút. Bạn cần chuẩn bị: một khoá bảo mật và trình duyệt Chrome hoặc Safari.

Một bước đúng chuẩn (1 hành động, có kết quả đối chiếu):

> Bước 3. Cắm khoá bảo mật vào cổng USB của máy tính. Khi khoá nhấp nháy đèn, chạm nhẹ vào nút trên khoá.
>
> Bạn sẽ thấy: màn hình hiện dòng "Đã đăng ký khoá thành công". Nếu không thấy đèn nhấp nháy, rút ra cắm lại rồi thử lại bước này.

Một nhánh xử lý theo mẫu "nếu thấy X thì làm Y":

> Nếu màn hình báo "Trình duyệt không hỗ trợ", bạn đang dùng trình duyệt cũ. Hãy mở lại trang bằng Chrome hoặc Safari phiên bản mới rồi làm lại từ Bước 1. Việc này không ảnh hưởng gì tới tài khoản của bạn.

## Lỗi hay gặp

- Dùng thuật ngữ kỹ thuật mà quên người đọc không biết (viết như cho đồng nghiệp, không cho khách).
- Gộp nhiều hành động vào một bước, khiến người đọc lạc giữa chừng.
- Chỉ tả bằng chữ, không có ảnh, người đọc không tìm ra nút trên màn hình.
- Không nói kết quả đúng trông thế nào, người đọc làm xong vẫn phân vân.
- Giọng văn khô hoặc doạ dẫm khiến người đọc sợ, thay vì trấn an để họ tự tin thao tác.

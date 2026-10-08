# Minto Pyramid (kết luận lên trước, đỡ bởi các nhóm lý do)

Minto Pyramid dựng tài liệu như một cái cây lộn ngược: câu trả lời chính (governing thought) đứng trên cùng, đỡ bởi khoảng ba nhóm lý do MECE, mỗi nhóm lại đỡ bởi dữ kiện. Dùng khi người đọc bận và cần ra quyết định nhanh: báo cáo cho sếp, executive summary, slide tóm tắt đầu deck, email xin duyệt. Nó phục vụ người đọc quét từ trên xuống, dừng ở tầng nào cũng đã nắm ý chính. Không hợp cho tài liệu dạy từng bước (Tutorial) hay khi bản thân bạn chưa biết kết luận: Pyramid đòi bạn đã có câu trả lời rồi mới viết. Đây là hiện thân trực tiếp của Pyramid Principle và BLUF.

## Các biến thể

### 1. Executive summary (nửa trang đầu report)
Governing thought một câu, rồi ba nhóm lý do thành ba đoạn hoặc ba bullet, mỗi nhóm một câu chốt cộng vài dữ kiện.
- Khi dùng: report dài mà người ký duyệt chỉ đọc trang đầu.
- Ví dụ: "Stack đã chạy ổn trên AWS, còn hai việc trước bàn giao" mở đầu, ba nhóm bên dưới là hạ tầng, chức năng, việc tồn.

### 2. Báo cáo ra quyết định
Trên cùng là đề xuất kèm việc cần sếp quyết, ba nhóm lý do là các trục đánh giá (chi phí, rủi ro, thời gian), đáy là số liệu.
- Khi dùng: cần một chữ ký, một cái gật đầu.
- Ví dụ: "Đề nghị duyệt chạy AWS on-demand thay vì để chạy 24/7" đỡ bởi nhóm tiền, nhóm vận hành, nhóm rủi ro.

### 3. Slide tóm tắt đầu deck
Một slide: tiêu đề là governing thought, ba ô là ba nhóm lý do, mỗi ô một con số. Cả deck phía sau chỉ là khai triển ba nhóm đó.
- Khi dùng: mở deck báo cáo, người xem nắm kết luận ngay slide đầu.
- Ví dụ: tiêu đề "4 domain public đã xanh E2E", ba ô là hạ tầng, cert, bảo mật.

### 4. Trả lời email cho sếp
Câu đầu email là kết luận và việc cần làm, các gạch sau là lý do gọn. Sếp đọc một câu là quyết được, chi tiết để đọc thêm nếu muốn.
- Khi dùng: xin duyệt hoặc báo trạng thái qua email ngắn.
- Ví dụ: "Em đã public xong `demo.example.com`, xin phép đổi mật khẩu mặc định trước khi gửi khách. Ba lý do:" rồi ba gạch.

### 5. One-pager bàn giao trạng thái
Đầu trang là một câu trạng thái tổng, thân là ba khối theo hệ thống con (hạ tầng, dịch vụ, việc tồn), mỗi khối vài dòng dữ kiện.
- Khi dùng: bàn giao cho người tiếp nhận cần nắm nhanh "đang ở đâu, còn gì phải làm".
- Ví dụ: câu tổng "Stack public 4 domain đã xanh E2E, còn 2 việc trước khi khoá bàn giao", ba khối bên dưới đi vào từng phần.

## Kỹ thuật cốt lõi

### 1. Viết governing thought thành một câu
Ép cả tài liệu xuống một câu khẳng định có nội dung, không phải nhãn chủ đề. "Trạng thái AWS" là nhãn, vô nghĩa. "Stack đã chạy ổn trên `demo.example.com`, còn hai việc trước khi bàn giao khách" là governing thought: nó khẳng định điều gì đó và báo trước cấu trúc. Đây là BLUF ở mức toàn tài liệu.

### 2. Nhóm lý do theo MECE
Ba tới bốn nhóm, không chồng lấn, gộp lại phủ hết. Với báo cáo AWS:
- Hạ tầng: EC2 t3.large, EIP cố định, Terraform (`tf.sh`).
- Chức năng: 4 domain xanh E2E, cert wildcard hợp lệ.
- Việc tồn: đổi mật khẩu mặc định, SG khoá SSH theo IP người gọi.
Đừng để một dữ kiện rơi được vào hai nhóm, và đừng bỏ sót một mảng người đọc sẽ hỏi.

### 3. Kiểm tra "so-what" cho mỗi tầng
Cây Pyramid đúng khi hai chiều đọc đều khớp:
- Từ dưới lên: đọc mỗi nhóm lý do và hỏi "vậy thì sao". Câu trả lời phải chính là governing thought. Nếu nó dẫn tới kết luận khác, nhóm đó gộp nhầm chỗ.
- Từ trên xuống: đọc governing thought và hỏi "tại sao, bằng cách nào". Câu trả lời phải đúng là các nhóm bên dưới, không thừa không thiếu.
Chạy cả hai chiều bắt được nhóm lạc và nhóm bị bỏ sót.

### 4. Đảm bảo đọc top-down vẫn hiểu
Người đọc chỉ đọc dòng đầu mỗi tầng phải nắm được toàn bộ lập luận. Câu chốt của mỗi nhóm tự nó là một câu hoàn chỉnh, không phải tiêu đề cụt. "Chi phí" là tiêu đề cụt; "Chạy on-demand cắt được khoảng 70% giờ chạy máy" là câu chốt đọc được.

### 5. Dùng SCR để dẫn vào đỉnh tháp
Trước governing thought, một đoạn ngắn Situation - Complication - Resolution mở khung: tình huống người đọc đã biết, va chạm mới xuất hiện, rồi resolution chính là governing thought. Với báo cáo AWS: tình huống (demo chạy tốt tại chỗ), va chạm (sếp muốn public và bật/tắt tiết kiệm), resolution (đã dựng xong, đây là trạng thái). SCR nối liền vào SCQA khi cần thuyết phục sâu hơn.

### 6. Sắp thứ tự nhóm theo sức nặng với người đọc
Trong ba nhóm, đặt nhóm sếp quan tâm nhất lên trước (thường là tiền hoặc rủi ro), không theo thứ tự bạn làm ra chúng. Tận dụng Peak-End: nhóm mạnh nhất mở đầu, việc cần quyết chốt cuối.

### 7. Cắt mọi thứ không đỡ cho đỉnh tháp
Nếu một câu không đỡ trực tiếp cho nhóm nào, hoặc nhóm nào không đỡ governing thought, cắt. Pyramid gọn vì mọi câu đều có vị trí trong cây. Word economy áp ở đây rất mạnh.

### 8. Đáy tháp giữ dữ kiện, đỉnh giữ câu chốt
Số liệu chi tiết, log, ảnh chụp thuộc tầng đáy, không dồn lên summary. Đỉnh chỉ giữ câu khẳng định; người đọc muốn kiểm chứng thì đi xuống. Đây là Progressive disclosure áp cho báo cáo: nông trước, sâu sau.

### 9. Một trang một đỉnh tháp
Đừng chồng hai governing thought lên cùng một báo cáo. Nếu có hai kết luận độc lập (ví dụ "AWS đã ổn" và "mesh P2P đã verify"), tách thành hai tháp, hoặc gộp lên một governing thought bao trùm cả hai rồi để chúng thành hai nhánh. Hai đỉnh trên một trang khiến người đọc không biết đâu là thông điệp chính.

## Checklist trước khi xuất

1. Có đúng một governing thought, viết thành câu khẳng định có nội dung?
2. Ba tới bốn nhóm lý do, MECE, không chồng lấn không sót?
3. Mỗi câu chốt nhóm tự đứng được, không phải tiêu đề cụt?
4. Đọc riêng các dòng đầu mỗi tầng vẫn hiểu trọn lập luận?
5. "So-what" của mỗi nhóm dẫn về đúng governing thought?
6. Nhóm quan trọng nhất với người đọc đặt trước, việc cần quyết nêu rõ?
7. Đã cắt câu/nhóm không đỡ cho đỉnh tháp?
8. Số liệu chi tiết nằm ở đáy, không dồn lên summary?
9. Không em dash, không AI-tell?

## Lỗi cần tránh

- Kể lể bối cảnh rồi mới chốt ở cuối. Đó là kể chuyện, không phải Pyramid. Kết luận lên đầu.
- Governing thought là nhãn chủ đề ("Về việc deploy AWS") thay vì một khẳng định.
- Nhóm lý do chồng lấn: "chi phí" và "tiết kiệm" là một nhóm, tách ra là giả MECE.
- Nhồi mọi số liệu vào summary. Đáy tháp để dưới, đỉnh chỉ giữ câu chốt.
- Ba nhóm nhưng thực chất chỉ có một ý bị chẻ ba cho đủ số. Số nhóm theo nội dung, không theo hình thức.

## Nguyên tắc glossary khuyến nghị

Pyramid Principle (lõi), BLUF (kết luận lên đầu), MECE (nhóm lý do), Word economy (cắt câu không đỡ), Peak-End (thứ tự nhóm), Progressive disclosure (đỉnh nông, đáy sâu), Signposting (câu chốt nhóm đọc được), Scannability (dòng đầu mỗi tầng quét được).

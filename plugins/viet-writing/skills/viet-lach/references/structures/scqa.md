# SCQA (Situation, Complication, Question, Answer)

SCQA là khung mở đầu để thuyết phục: dựng một tình huống người đọc đồng thuận (Situation), nêu va chạm phá vỡ tình huống đó (Complication), gọi tên câu hỏi mà va chạm đặt ra (Question), rồi trả lời bằng chính luận điểm hoặc giải pháp của bạn (Answer). Dùng khi cần đưa người đọc từ chỗ chưa quan tâm tới chỗ thấy vấn đề là của họ: đề xuất, brief, slide mở đầu, phần dẫn nhập của report thuyết phục. Nó tạo căng thẳng có kiểm soát rồi giải toả, khiến giải pháp đến đúng lúc người đọc đang muốn nghe. Không hợp cho tài liệu tra cứu hay hướng dẫn thao tác, nơi người đọc đã biết mình cần gì. Answer của SCQA thường chính là governing thought để nối tiếp vào Minto Pyramid.

## Các biến thể

### 1. Đề xuất (proposal)
S là hiện trạng khách hoặc sếp công nhận, C là vấn đề hoặc cơ hội mới, Q là "vậy nên làm gì", A là đề xuất của bạn kèm khung triển khai.
- Khi dùng: xin duyệt một hướng đi, một khoản đầu tư, một thay đổi hạ tầng.
- Ví dụ (chuyển demo lên AWS on-demand): S là demo chạy tốt tại chỗ; C là sếp muốn public cho khách xem mà không tốn tiền khi tắt; Q là làm sao public mà tắt đi không mất chi phí; A là EC2 kèm EIP kèm `vm.sh` on/off.

### 2. Brief hoặc slide mở đầu
Bốn phần gói trong một tới hai slide đầu deck: một slide S+C, một slide Q, rồi A mở sang phần thân.
- Khi dùng: mở một buổi trình bày cần dẫn người nghe vào vấn đề.
- Đặc điểm: đặt căng thẳng ngay đầu buổi, cả deck còn lại là khai triển Answer.

### 3. Khung hoá vấn đề trước khi đề giải pháp
Dùng SCQA chỉ ở phần dẫn, trước khi vào bảng phương án.
- Khi dùng: đảm bảo người đọc đồng ý "có vấn đề thật" trước khi bàn cách giải.
- Đặc điểm: bỏ bước này, giải pháp treo lơ lửng không rõ giải cái gì.

### 4. Mở đầu report thuyết phục
Nửa trang đầu report chạy SCQA để dẫn tới executive summary.
- Khi dùng: report cần thuyết phục, không chỉ báo cáo trạng thái.
- Đặc điểm: Answer ở đây trùng với governing thought của phần Pyramid ngay sau. Người bận đọc hết SCQA là đã thấy vấn đề và câu trả lời.

### 5. Mở đầu ADR hoặc design doc
Phần "Bối cảnh" của một ADR chạy đúng mạch SCQA trước khi tới quyết định.
- Khi dùng: ghi lại một quyết định kỹ thuật, cần cho người sau hiểu vì sao.
- Ví dụ: S là mọi domain đi qua một ingress; C là Nginx khó chia sáu domain trên một cert wildcard; Q là dùng gì cho single ingress; A là chọn HAProxy, phần sau ghi đánh đổi.

## Kỹ thuật cốt lõi

### 1. Chọn S là điều người đọc gật đầu ngay
Situation phải là sự thật người đọc đã công nhận, không tranh cãi, không phải nơi bán hàng. Nó tạo điểm chung để cùng bước tiếp. Ví dụ: "Demo `full-stack-demo` chạy ổn định tại chỗ, 17 container lên trong ~40s" là điều sếp đã thấy tận mắt. Đừng nhét lợi ích giải pháp vào S.

### 2. Để C tạo căng thẳng hoặc một thay đổi
Complication là cái phá vỡ trạng thái yên của S: một thay đổi, một rủi ro, một cơ hội mới, một yêu cầu mới. Nó khiến người đọc thấy "không thể để yên". Ví dụ: "Sếp muốn cho khách xem qua Internet, nhưng để máy chạy 24/7 thì tốn tiền vô ích khi không demo". C càng cụ thể, căng thẳng càng thật.

### 3. Đặt Q đúng câu người đọc đang nghĩ
Question phải là câu bật ra tự nhiên trong đầu người đọc ngay sau C, không phải câu bạn muốn hỏi. Nếu Q khớp, người đọc thấy bạn đọc được suy nghĩ của họ. Ví dụ: "Làm sao để public cho khách xem mà tắt đi thì gần như không tốn chi phí?". Sắc, một câu, đúng cái đang vướng.

### 4. Answer chính là luận điểm, nối được vào Pyramid
Answer không phải câu úp mở, mà là giải pháp hoặc luận điểm đầy đủ, tự nó đứng được như governing thought. Ví dụ: "Dựng EC2 t3.large kèm EIP cố định `203.0.113.10`, bật/tắt on-demand bằng `vm.sh`, hạ tầng khai báo bằng Terraform (`tf.sh`)". Từ Answer này, ba nhóm lý do (chi phí, thao tác, bảo mật) mở ra thành thân bài theo Minto.

### 5. Giữ S-C-Q ngắn, dồn sức cho A
Ba phần đầu chỉ để dẫn, mỗi phần một tới ba câu. Nếu S dài thành bài sử, người đọc mất kiên nhẫn trước khi tới Answer. Word economy ở phần dẫn, chi tiết dồn cho phần giải pháp phía sau.

### 6. Kiểm tra mạch S tới A liền một hơi
Đọc liền bốn phần và soi ba mối nối:
- S tới C: va chạm phải nảy ra từ chính tình huống vừa dựng, không phải một vấn đề rơi từ trời xuống.
- C tới Q: câu hỏi phải là hệ quả trực tiếp của va chạm.
- Q tới A: Answer phải trả lời đúng Q đã nêu, không phải một câu hỏi khác.
Nếu Answer trả lời lệch Q, mạch gãy. Đây là Given-New ở cấp đoạn: mỗi phần nối vào cái phần trước vừa dựng.

### 7. Một bộ SCQA cho một vấn đề
Đừng nhồi nhiều va chạm vào một khung. Nếu đề xuất giải quyết hai vấn đề tách biệt, hoặc chọn một cái làm trục chính, hoặc chạy hai SCQA ngắn nối tiếp. Trộn nhiều C vào một khung làm loãng căng thẳng.

### 8. Chuyển từ A sang thân bài không hụt bước
Sau Answer, phần thân phải khai triển đúng những gì Answer hứa, theo đúng thứ tự. Nếu Answer nêu ba trục (chi phí, thao tác, bảo mật) thì thân bài đi ba mục đó, không thêm mục lạ. Signposting giữ người đọc không lạc giữa dẫn nhập và giải pháp.

### 9. Đóng khung ở phần kết bằng chính C
Với đề xuất, phần kết nên vòng lại va chạm ban đầu và cho thấy Answer xoá được nó: "để máy chạy 24/7 tốn tiền vô ích, `vm.sh` off cắt đúng khoản đó". Người đọc thấy vòng lập luận khép kín, không hụt. Đây là Peak-End: mở bằng căng thẳng, đóng bằng đúng căng thẳng đã được giải.

## Checklist trước khi xuất

1. S có phải điều người đọc gật đầu ngay, không cãi, không bán hàng?
2. C có tạo được căng thẳng thật (thay đổi, rủi ro, cơ hội) không?
3. Q có đúng câu người đọc tự hỏi ngay sau C không?
4. A trả lời trọn Q và tự đứng được như một luận điểm?
5. Answer nối được vào các nhóm lý do của phần thân (Pyramid)?
6. S-C-Q gọn, không lấn thời lượng của Answer?
7. Chỉ một vấn đề trục trong một khung SCQA?
8. Thân bài khai triển đúng những gì Answer hứa, đúng thứ tự?
9. Phần kết vòng lại C và cho thấy nó đã được giải?
10. Không em dash, không AI-tell?

## Lỗi cần tránh

- S nhét sẵn lợi ích giải pháp. Người đọc thấy bị dẫn dắt, mất tin.
- C mờ nhạt, chung chung ("thị trường thay đổi"). Không có căng thẳng thì Answer không có chỗ đáp.
- Q không phải câu người đọc nghĩ, mà là câu tiện cho bạn trả lời. Người đọc thấy lệch.
- Answer úp mở, hẹn "sẽ trình bày sau". SCQA cần Answer thẳng, phần sau chỉ khai triển.
- Dựng SCQA dài ba trang rồi mới tới giải pháp. Người bận bỏ cuộc. Giữ phần dẫn ngắn.
- Nhầm SCQA với dàn ý cả tài liệu. Nó là khung dẫn nhập; sau Answer, thân bài vẫn cần Pyramid hoặc cấu trúc riêng.
- Đặt Q dạng câu hỏi tu từ rồi lờ đi. Q đã nêu thì Answer buộc phải trả lời thẳng nó.

## Nguyên tắc glossary khuyến nghị

Given-New (mạch S tới A liền hơi), BLUF (Answer thẳng, không úp mở), Pyramid Principle (Answer thành governing thought của thân bài), Word economy (S-C-Q gọn), Specificity (C và A cụ thể), Signposting (chuyển từ A sang thân bài), Peak-End (căng thẳng mở đầu, giải pháp đóng khung dẫn).

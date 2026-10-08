# Inverted Pyramid (tin quan trọng nhất câu đầu, chi tiết dồn xuống dưới)

Inverted Pyramid là lối viết của báo chí: câu đầu chứa tin quan trọng nhất, các đoạn giữa bổ trợ chi tiết theo mức giảm dần, phần nền và lịch sử nằm cuối. Đặc tính then chốt là cắt được ở bất kỳ đâu mà phần còn lại vẫn tự đủ. Dùng cho thông báo, release notes, changelog, thông báo sự cố hay bảo trì, announcement nội bộ: những nội dung mà người đọc cần nắm tin trong ba giây rồi tự quyết đọc thêm hay không. Không hợp cho tài liệu cần dẫn dắt cảm xúc hay xây lập luận tăng dần: ở đó điểm nhấn nằm cuối, ngược với Inverted Pyramid. Đây là hiện thân của nguyên tắc cùng tên trong glossary.

## Các biến thể

### 1. Release notes một phiên bản
Cấu trúc: dòng đầu nêu phiên bản và thay đổi lớn nhất ảnh hưởng người dùng; giữa liệt kê tính năng mới, sửa lỗi, thay đổi phá vỡ (breaking); cuối là ghi chú nâng cấp và link chi tiết.
- Khi dùng: phát hành một bản, cần người dùng nắm nhanh cái gì đổi.
- Ví dụ: "Bản này pin `NETBIRD_VERSION` 0.74.0 và tắt lazy-connection trên box mgmt" đứng đầu, chi tiết từng mục xuống dưới.

### 2. Changelog
Mỗi mục một dòng, nhóm theo Added / Changed / Fixed / Removed, mục ảnh hưởng lớn lên trước trong nhóm.
- Khi dùng: nhật ký thay đổi theo phiên bản trong repo.
- Đặc điểm: người đọc quét nhóm liên quan tới mình, bỏ qua phần còn lại. Ngắn, khô, không văn hoa.

### 3. Thông báo sự cố hoặc downtime bảo trì
Cấu trúc: dòng đầu nêu cái gì, khi nào, ảnh hưởng ai; giữa là phạm vi, thời lượng, việc người đọc cần làm; cuối là nguyên nhân, bối cảnh, đầu mối liên hệ.
- Khi dùng: báo trước bảo trì hoặc thông báo đang có sự cố.
- Ví dụ: "Bảo trì `full-stack-demo` 22h-22h30 ngày 07/07, các domain trên `demo.example.com` gián đoạn ~30 phút" mở đầu, lý do kỹ thuật để cuối cho ai quan tâm.

### 4. Announcement nội bộ
Cấu trúc: dòng đầu nêu quyết định hoặc thay đổi kèm ngày hiệu lực; giữa nói nó đổi gì với người đọc; cuối là nền và đầu mối hỏi đáp.
- Khi dùng: phổ biến một thay đổi cho cả nhóm.
- Đặc điểm: người bận nắm ngay điều cần biết mà không phải đọc hết.

### 5. Tóm tắt commit hoặc mô tả pull request
Dòng đầu (subject) nói commit làm gì, không phải làm thế nào; thân mô tả thay đổi chính; cuối là ngữ cảnh và cân nhắc.
- Khi dùng: viết message commit, mô tả PR cho người review.
- Ví dụ: "Pin `NETBIRD_VERSION` 0.74.0 và tắt lazy-connection trên box mgmt" ở subject, lý do kỹ thuật ở thân.

## Kỹ thuật cốt lõi

### 1. Viết lead một câu tự đủ
Câu đầu (lead) phải đứng một mình vẫn truyền trọn tin chính, kể cả khi người đọc dừng ngay đó. Với thông báo downtime, lead trả lời được "có ảnh hưởng tôi không, khi nào" mà không cần đọc tiếp. Đây là BLUF ở mức câu mở.

### 2. Nén 5W1H vào phần đầu, bỏ cái thừa
Sáu yếu tố tin (ai, cái gì, khi nào, ở đâu, vì sao, thế nào) không ngang hàng. Với thông báo bảo trì, thứ tự ưu tiên thường là:
- Cái gì và ảnh hưởng ai: lên lead, người đọc cần nhất.
- Khi nào và ở đâu: ngay sau lead, để người đọc tự soi mình có dính không.
- Thế nào và vì sao: dồn xuống đoạn nền, chỉ ai quan tâm mới đọc.
Không nhồi cả sáu vào một câu. Với release notes, "cái gì đổi" và "ai bị ảnh hưởng" lên trước, "vì sao đổi" để cuối.

### 3. Viết nut graf sau lead
Sau câu lead, một đoạn ngắn (nut graf) đặt tin vào ngữ cảnh và báo trước phần còn lại chứa gì. Với thông báo bảo trì: lead nói giờ và ảnh hưởng, nut graf nói phạm vi (6 domain qua HAProxy, riêng portal qua netbird) và việc người dùng cần làm. Đây là Given-New: nối tin mới vào cái người đọc vừa đọc.

### 4. Phân tầng để cắt được ở bất kỳ đâu
Sắp đoạn theo mức quan trọng giảm dần, sao cho biên tập viên xoá từ dưới lên mà phần trên vẫn đủ nghĩa. Thử nghiệm: xoá đoạn cuối cùng, đọc lại; nếu hụt thông tin thiết yếu thì đoạn đó bị đặt sai tầng. Đây chính là Progressive disclosure áp cho tin tức.

### 5. Nhóm chi tiết theo mức quan trọng, không theo thời gian
Người viết hay kể theo trình tự xảy ra. Inverted Pyramid xếp theo cái người đọc cần biết trước. Với changelog, breaking change lên đầu dù nó được làm sau cùng. Với sự cố, ảnh hưởng hiện tại lên trước diễn biến theo giờ.

### 6. Tách việc-người-đọc-phải-làm ra khỏi nền
Nếu thông báo yêu cầu hành động (nâng cấp, tránh giờ bảo trì, đổi cấu hình), tách nó thành một khối riêng rõ ràng, đặt cao, không chôn trong đoạn nền lịch sử. Người đọc bận chỉ cần thấy đúng khối đó.

### 7. Giữ giọng khô, để sự kiện tự nói
Thông báo và changelog không phải chỗ tự khen. Bỏ tính từ, nêu thẳng cái gì đổi và ảnh hưởng đo được. Specificity thắng, so sánh hai cách viết cùng một tin:
- Yếu: "Đã có cải tiến mạnh mẽ về kết nối, hệ thống ổn định hơn."
- Chắc: "Tắt lazy-connection trên box mgmt, hết tình trạng peer idle rồi relay-flap."
Bản chắc nêu đúng cái gì đổi và hệ quả, không cần một tính từ tự khen nào.

### 8. Thống nhất nhãn nhóm và thì của động từ
Trong changelog, dùng đúng một bộ nhãn (Added/Changed/Fixed/Removed) và một dạng động từ cho mọi mục ("Thêm...", "Sửa...", "Bỏ..."), không lẫn danh từ với mệnh đề. Đây là Parallelism: các mục cùng cấp cùng dạng, người đọc quét nhanh hơn.

### 9. Cập nhật thông báo sự cố theo tầng, không viết lại từ đầu
Khi sự cố còn diễn ra, thêm bản cập nhật mới lên đầu (giờ, trạng thái mới nhất), giữ nguyên các mốc cũ bên dưới theo thứ tự giảm dần. Người vào sau đọc lead là biết tình hình hiện tại; người theo dõi từ đầu cuộn xuống thấy diễn biến. Lead luôn là trạng thái mới nhất, không phải mốc đầu tiên.

## Checklist trước khi xuất

1. Câu lead đứng một mình có truyền trọn tin chính không?
2. Người đọc dừng sau ba dòng đầu đã nắm đủ cái cần biết?
3. Xoá đoạn cuối cùng đi, phần trên còn tự đủ không?
4. Việc người đọc phải làm được tách riêng và đặt cao?
5. Chi tiết xếp theo mức quan trọng, không theo trình tự thời gian?
6. Giọng khô, không tính từ tự khen, số liệu cụ thể?
7. Nhóm changelog nhất quán nhãn và dạng động từ (Parallelism)?
8. Không em dash, không AI-tell?

## Lỗi cần tránh

- Mở bằng bối cảnh lịch sử rồi mới tới tin. Người đọc bỏ đi trước khi tới câu quan trọng.
- Lead ôm cả 5W1H thành một câu dài 40 từ. Tách, giữ lead một tin chính.
- Chôn việc-phải-làm giữa đoạn nền. Người cần hành động không thấy.
- Kể theo dòng thời gian sự cố thay vì ảnh hưởng hiện tại. Người đọc cần biết giờ này còn hỏng không, không cần biết 21h45 đã xảy ra gì.
- Tô màu thông báo bằng tính từ. Changelog là chỗ khô nhất trong mọi tài liệu.
- Quên nêu thời điểm phục hồi dự kiến trong thông báo downtime. Người đọc cần một mốc để chờ, không phải một "sẽ sớm khắc phục".
- Trộn nhiều tin không liên quan vào một announcement. Mỗi tin một thông báo, đừng ghép "bảo trì" với "đổi quy trình" cho tiện.

## Nguyên tắc glossary khuyến nghị

Inverted Pyramid (lõi), BLUF (lead lên đầu), Progressive disclosure (phân tầng cắt được), Given-New (nut graf nối vào lead), Specificity (số liệu thay tính từ), Parallelism (nhãn và động từ changelog), Scannability (nhóm quét được), Word economy (giọng khô).

# PREP (Point, Reason, Example, Point)

PREP là khung bốn nhịp cho một mẩu lập luận ngắn: nêu luận điểm trước (Point), một lý do mạnh nhất (Reason), một ví dụ cụ thể chạy được (Example), rồi lặp lại luận điểm để chốt (Point). Dùng khi cần trả lời gọn mà vẫn có sức nặng: một câu trả lời Q&A, một bullet slide có lập luận, một comment review, một mục FAQ, giải thích một quyết định nhỏ. Nó ép người viết chốt ý trước rồi mới đỡ, đúng tinh thần BLUF, nên người đọc nắm kết luận ngay câu đầu. Không hợp cho nội dung dài nhiều nhánh hay tài liệu tra cứu: PREP là công cụ cho một luận điểm, không phải cho cả tài liệu. Với nội dung dài, dùng Minto hoặc SCQA và để PREP lo từng ô nhỏ bên trong.

## Các biến thể

### 1. Trả lời nhanh trong Q&A
Point một câu trả lời thẳng câu hỏi, Reason một lý do, Example một dẫn chứng, Point chốt lại.
- Khi dùng: bị hỏi trực tiếp trong họp hoặc chat, cần đáp gọn mà chắc.
- Đặc điểm: người hỏi nghe câu đầu là có đáp án, phần sau là để tin.

### 2. Nội dung một slide
Tiêu đề slide là Point, thân là Reason cộng Example, dòng cuối nhắc lại Point dưới dạng câu chốt.
- Khi dùng: một slide một luận điểm, không nhồi hai ý.
- Đặc điểm: người xem rời slide vẫn nhớ đúng một câu.

### 3. Giải thích một quyết định nhỏ
Khi cần biện minh một lựa chọn kỹ thuật lẻ (không đủ lớn để viết cả ADR), PREP gói vừa: quyết định là gì, vì sao, bằng chứng, chốt.
- Khi dùng: quyết định nhỏ trong review hoặc trong docs.
- Ví dụ: giải thích vì sao SG khoá SSH port 22 theo IP người gọi.

### 4. Comment review hoặc mục FAQ
Comment: nêu ý kiến trước, một lý do, một ví dụ trong chính diff, chốt đề nghị. FAQ: câu hỏi là tiêu đề, phần trả lời chạy PREP gọn.
- Khi dùng: phản hồi code review, dựng mục hỏi đáp.
- Đặc điểm: người đọc quét câu Point đầu là đủ, đọc tiếp nếu cần thuyết phục.

### 5. Ghi chú người trình bày dưới slide
Mỗi slide một ghi chú PREP để người trình bày nói đúng một luận điểm, không lan man.
- Khi dùng: chuẩn bị nói cho từng slide trong deck.
- Đặc điểm: Point khớp tiêu đề slide, Reason và Example là những gì người trình bày nói thêm, Point chốt là câu chuyển sang slide sau.

## Kỹ thuật cốt lõi

### 1. Point trước, không rào đón
Câu đầu là luận điểm trần trụi, không mở bài, không "theo tôi thì có lẽ". BLUF ở mức mẩu nhỏ. Ví dụ: "Nên pin `NETBIRD_VERSION` 0.74.0 để tránh vỡ khi bản mới đổi default". Người đọc biết ngay bạn đứng ở đâu.

### 2. Chọn một Reason mạnh nhất, không rải nhiều
PREP khác Pyramid ở chỗ chỉ dùng một lý do, cái nặng ký nhất. Nhiều lý do làm loãng và kéo dài. Ví dụ lý do pin phiên bản: "bản mới bật lazy-connection mặc định, đổi hành vi kết nối mà mình chưa test kỹ". Một câu, đúng gốc vấn đề.

### 3. Example phải cụ thể và chạy được
Ví dụ là chỗ PREP thắng hay thua. Dùng sự việc thật, số thật, lệnh thật, không giả định. Ví dụ: "Khi không pin, peer rơi vào trạng thái idle rồi relay-flap, `wt0` chập chờn, đúng lỗi đã gặp trên box mgmt". Đây là Show-then-tell: đưa bằng chứng trước, người đọc tự tin vào Point.

### 4. Point cuối lặp lại nhưng thêm hành động
Chốt không copy y nguyên câu đầu mà đóng lại kèm việc cần làm hoặc điều kiện. Ví dụ: "Nên giữ pin 0.74.0 cho tới khi test kỹ bản mới trên môi trường tách biệt". Peak-End: câu cuối là cái người đọc nhớ, cho nó một next step.

Ghép bốn nhịp trên thành một mẩu hoàn chỉnh về việc pin phiên bản netbird:
- Point: Nên pin `NETBIRD_VERSION` 0.74.0 để tránh vỡ khi bản mới đổi default.
- Reason: Bản mới bật lazy-connection mặc định, đổi hành vi kết nối mà mình chưa test kỹ.
- Example: Khi không pin, peer rơi vào idle rồi relay-flap, `wt0` chập chờn, đúng lỗi đã gặp trên box mgmt.
- Point: Giữ pin 0.74.0 cho tới khi test kỹ bản mới trên môi trường tách biệt.

### 5. Giữ toàn mẩu trong bốn tới sáu câu
PREP ngắn mới có tác dụng. Nếu Reason cần ba đoạn và Example cần một bảng, luận điểm đã quá lớn cho PREP, chuyển sang Minto. Word economy là ràng buộc, không phải gợi ý.

### 6. Một PREP một luận điểm
Đừng nhét hai kết luận vào một khung. Nếu comment review có hai vấn đề, viết hai mẩu PREP tách bạch. Trộn lại làm cả hai mờ.

### 7. Ghép chuỗi PREP cho danh sách bullet có lập luận
Khi một slide có nhiều bullet mà mỗi bullet cần đứng vững, cho mỗi bullet một PREP siêu gọn (Point là bullet, Reason và Example nén vào một dòng phụ). Các bullet giữ Parallelism: cùng mở đầu bằng một Point dạng khẳng định, không lẫn bullet mô tả với bullet lập luận.

### 8. Biết khi nào bỏ PREP mà đổi khung
PREP vỡ khi luận điểm cần nhiều hơn một lý do hoặc ví dụ cần cả một bảng. Dấu hiệu đổi khung:
- Cần hai tới ba nhóm lý do để thuyết phục: chuyển sang Minto Pyramid.
- Cần dựng bối cảnh và va chạm trước khi người đọc chịu nghe: chuyển sang SCQA.
- Chỉ cần liệt kê dữ kiện, không cần lập luận: đó là Reference, không phải PREP.
Cố nhét luận điểm lớn vào PREP làm Reason hoặc Example phình ra, mất luôn cái gọn vốn là điểm mạnh của khung.

## Checklist trước khi xuất

1. Câu đầu có phải luận điểm trần trụi, không rào đón?
2. Chỉ một Reason, và là cái mạnh nhất?
3. Example cụ thể, có số/lệnh/sự việc thật, không giả định?
4. Point cuối chốt lại kèm hành động hoặc điều kiện?
5. Toàn mẩu gói trong bốn tới sáu câu?
6. Một luận điểm duy nhất, không trộn hai kết luận?
7. Nếu ghép chuỗi, các bullet giữ Parallelism (cùng dạng)?
8. Không em dash, không AI-tell?

## Lỗi cần tránh

- Mở bằng bối cảnh rồi mới tới Point ở cuối. Đó là kể chuyện, mất luôn tác dụng BLUF.
- Rải bốn năm lý do. PREP chỉ cần một; nhiều lý do thì dùng Pyramid.
- Example chung chung ("nhiều trường hợp gặp lỗi"). Không có bằng chứng cụ thể thì Reason treo.
- Point cuối copy y nguyên Point đầu, không thêm gì. Chốt nên đóng bằng hành động.
- Dùng PREP cho nội dung lớn nhiều nhánh. Nó vỡ khung; chuyển sang Minto hoặc SCQA.
- Bỏ Point cuối, kết ở Example. Người đọc nhớ ví dụ mà quên luận điểm. Luôn đóng bằng Point.

## Nguyên tắc glossary khuyến nghị

BLUF (Point lên đầu), Word economy (giữ mẩu ngắn), Show-then-tell (Example cụ thể trước), Specificity (số/lệnh thật trong Example), Peak-End (Point cuối kèm hành động), Parallelism (khi ghép chuỗi bullet), One idea per sentence (mỗi nhịp một câu gọn).

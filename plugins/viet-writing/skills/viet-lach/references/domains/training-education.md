# Domain: Đào tạo / Onboarding / Giáo trình

## Đối tượng đọc

Người học: nhân sự mới vào nhóm, học viên một khoá, kỹ sư chuyển sang mảng mới. Họ chưa có ngữ cảnh, đang xây kiến thức từ nền. Họ cần biết học xong làm được gì, và cần được dẫn từng bước để không lạc. Khác với người tra cứu (đã biết, chỉ cần lấy thông tin), người học cần lộ trình và cần thực hành để nhớ.

Người học lo nhất là bị bỏ lại: một bước nhảy cóc, một thuật ngữ chưa giải thích, là họ mất mạch và nản.

## Từ vựng & giọng văn

Dịch và giải thích thuật ngữ ngay khi giới thiệu lần đầu, sau đó dùng nhất quán. Register thân thiện, xưng "bạn", giọng khuyến khích. Được phép hỏi trực tiếp và dùng ví dụ đời thường để bắc cầu từ cái đã quen sang cái mới (Given-New).

## Nỗi đau của người đọc (viết để tránh)

- Nhảy bước: tài liệu bỏ qua bước "hiển nhiên" mà người mới chưa biết, họ kẹt không đi tiếp được.
- Không có mục tiêu học rõ: học một hồi không biết để làm gì, mất động lực.
- Toàn lý thuyết, không có thực hành: đọc hiểu nhưng không làm được, quên nhanh.
- Không biết mình đã hiểu chưa: không có cách tự kiểm tra, học xong mơ hồ.

## Quy ước bắt buộc

- Nêu mục tiêu học ở đầu mỗi bài: "Học xong phần này, bạn sẽ tự chạy được stack trên máy mình". Mục tiêu phải là việc làm được, đo được.
- Đi từ dễ tới khó, mỗi phần dựa trên phần trước. Không giới thiệu khái niệm chưa được chuẩn bị nền.
- Dạy qua làm (Tutorial mindset): mỗi khái niệm kèm ví dụ chạy được và một bài tập thực hành nhỏ để người học tự tay làm.
- Tổng kết cuối mỗi phần: nhắc lại các ý chính, kèm vài câu hỏi tự kiểm để người học tự đánh giá đã nắm chưa.
- Chống Curse of knowledge: nêu điều kiện tiên quyết, định nghĩa mọi thuật ngữ lần đầu, không cho rằng người học đã biết những gì bạn thấy hiển nhiên.
- Chia nhỏ (chunking): một buổi học một cụm mục tiêu, không nhồi cả hệ thống vào một bài.
- Báo trước lộ trình đầu khoá: liệt kê các buổi và mục tiêu từng buổi, để người học biết mình đang ở đâu trong bức tranh lớn (Signposting).

## Cấu trúc & format hay dùng

- Diátaxis Tutorial: mode chủ đạo. Dẫn người học đi trọn một hành trình có kết quả cụ thể ở cuối. Xem `structures/diataxis.md`.
- `structures/slide-narrative.md`: cho deck đào tạo trình bày trên lớp, mỗi slide một ý, có nhịp nghỉ để thực hành.
- Format: `formats/slide.md` (hand off `figma-presentation`) cho buổi dạy trực tiếp, hoặc `formats/markdown-doc.md` cho giáo trình tự học.

## Mẫu mở đầu / ví dụ ngắn

Mở đầu buổi onboarding (nêu mục tiêu học đo được, đặt kỳ vọng thời gian):

> Buổi này bạn sẽ tự chạy được stack FIDO2 trên máy mình. Học xong, bạn có thể: khởi động toàn bộ hệ thống bằng một lệnh, kiểm tra các thành phần đã chạy đúng, và biết dừng lại ở đâu khi có lỗi. Chúng ta đi từ chạy thử tới hiểu từng phần, mất khoảng một buổi.
>
> Trước khi bắt đầu, bạn cần: máy đã cài Docker và đã clone repo về. Nếu chưa, làm bước chuẩn bị ở phần A.

Bài tập thực hành (dạy qua làm, có tự kiểm):

> Thực hành: chạy `docker compose up -d`, đợi khoảng 40 giây, rồi chạy `docker compose ps`.
> Tự kiểm: bạn đếm được bao nhiêu container ở trạng thái `healthy`? Nếu có container `unhealthy`, thử đoán nó là thành phần nào và vì sao, rồi đọc tiếp phần sau để đối chiếu.

Tổng kết cuối phần (chốt lại ý chính, mở đường sang phần sau):

> Bạn vừa chạy được toàn bộ stack và kiểm tra được trạng thái. Điều cần nhớ: một lệnh dựng cả hệ thống, và `docker compose ps` là chỗ đầu tiên để soi khi nghi có lỗi. Phần sau ta đi vào từng thành phần: HAProxy, coturn, và netbird mesh.

## Lỗi hay gặp

- Bắt đầu bằng lý thuyết trừu tượng thay vì cho người học làm và thấy kết quả sớm.
- Không nêu mục tiêu học, người học không biết đang hướng tới đâu.
- Nhảy bước hoặc dùng thuật ngữ chưa giải thích (Curse of knowledge), bỏ rơi người mới.
- Chỉ có nội dung để đọc, thiếu bài tập, người học không có cơ hội tự tay làm.
- Nhồi quá nhiều mục tiêu vào một buổi, quá tải, không ai nhớ hết.
- Bỏ phần tổng kết và câu hỏi tự kiểm, người học rời buổi mà không biết mình đã nắm tới đâu.

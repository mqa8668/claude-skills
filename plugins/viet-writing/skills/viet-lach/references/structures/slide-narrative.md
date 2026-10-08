# Slide Narrative (dựng dòng kể cho cả bộ slide, không trang trí từng trang)

Slide Narrative lo phần dòng chảy của cả deck: thứ tự các message dẫn người nghe từ đầu tới kết luận. Đây là bước viết lách, chưa phải bước làm slide đẹp. Dùng khi bạn có một bộ slide cần kể một câu chuyện có đích (báo cáo tiến độ, pitch, briefing kỹ thuật), không phải khi cần vài slide rời rạc. Người nghe slide khác người đọc tài liệu: họ theo bạn theo thời gian thực, không tua lại được, nên mỗi slide chỉ được mang một message và cả deck phải có một luận điểm tổng. KHÔNG dùng cấu trúc này để trang trí, chọn màu, hay layout: xong dòng kể thì bàn giao cho skill `figma-presentation` render. Slide Narrative dựng xương, `figma-presentation` đắp da.

## Các biến thể (arc dòng kể)

### 1. What-Why-How
Cái gì, vì sao quan trọng, làm ra sao. Cho briefing kỹ thuật hoặc giới thiệu một hệ thống. Ví dụ: giới thiệu kiến trúc `full-stack-demo` cho nhóm mới.

### 2. Problem-Solution-Benefit
Vấn đề, giải pháp, lợi ích thu được. Cho pitch hoặc xin duyệt. Mở bằng nỗi đau người nghe thấy quen, đóng bằng cái họ được.

### 3. SCR (Situation-Complication-Resolution)
Tình huống ổn định, biến cố phá vỡ nó, cách giải quyết. Cho báo cáo có kịch tính hoặc thuyết phục. Ví dụ: "Stack chạy nội bộ ổn (S), sếp muốn public trên AWS bật/tắt được (C), giải bằng Terraform + `vm.sh` on-demand (R)."

### 4. Story arc
Bối cảnh, thử thách, cao trào, kết. Cho keynote hoặc demo có cảm xúc. Ít dùng cho báo cáo khô, hợp khi cần người nghe nhớ lâu.

## Kỹ thuật cốt lõi

### 1. Một slide một message (Cognitive load)
Mỗi slide chỉ đỡ một ý. Nếu một slide có hai ý tách được, tách thành hai slide. Người nghe không đọc lại được, nhồi hai message một trang là mất cả hai. Nội dung phụ đẩy xuống speaker notes.

### 2. Tiêu đề slide là câu khẳng định (assertion), không phải nhãn danh từ
Tiêu đề phải nói kết luận của slide, không đặt tên chủ đề. Viết "4 domain public đã xanh E2E trên demo.example.com" thay vì "Kết quả". Viết "Bật/tắt stack theo nhu cầu cắt chi phí EC2" thay vì "Chi phí". Người lướt nhanh chỉ đọc tiêu đề vẫn nắm được mạch.

### 3. Mỗi slide đỡ luận điểm tổng của deck (Pyramid)
Cả deck có một câu trả lời chính, ví dụ "Deploy AWS xong, hệ thống chạy public ổn định và tắt được khi không dùng". Mỗi slide là một dữ kiện đỡ câu đó. Slide nào không đỡ luận điểm tổng thì cắt hoặc đẩy sang phụ lục.

### 4. Agenda + divider theo section (Signposting)
Deck dài cần một slide agenda ở đầu và slide divider mở mỗi phần. Người nghe luôn biết đang ở đâu và còn bao xa. Với báo cáo BOD 12-15 slide, chia 3-4 section, mỗi section một divider.

### 5. Slide số liệu lớn: một con số một slide (Peak-End)
Con số quan trọng nhất được một slide riêng, chữ to, một dòng ngữ cảnh. Ví dụ một slide chỉ ghi "t3.large, chi phí ~X/giờ, tắt là dừng tính tiền". Số đứng một mình đập vào mắt mạnh hơn nằm trong bảng dày.

### 6. Kết bằng next step, không kết sáo
Slide cuối là hành động, không phải "Cảm ơn đã lắng nghe". Ví dụ: "Đề xuất: cấp ngân sách EC2 tháng, đổi mật khẩu mặc định trước khi mở rộng người dùng." Người nghe rời phòng biết phải làm gì tiếp.

### 7. Speaker notes tách khỏi slide
Chữ trên slide là điểm neo, không phải kịch bản. Chi tiết, số phụ, câu trả lời phản biện để trong speaker notes. Slide 3-5 bullet ngắn, phần còn lại người trình bày nói. Slide đầy chữ là slide để đọc, không để nghe.

### 8. Progressive disclosure trong deck
Ý chính ở section đầu, chi tiết kỹ thuật ở section sau hoặc phụ lục sau slide kết. BOD cần bức tranh lớn trước; kỹ sư muốn đào sâu xem phụ lục. Đừng bắt cả phòng nghe chi tiết resolver runtime khi họ chỉ cần biết stack đã xanh.

## Bàn giao cho figma-presentation

Xong outline, không tự vẽ. Đưa cho skill `figma-presentation` mỗi slide gồm bốn thứ:
- **Tiêu đề**: câu khẳng định (assertion), không phải nhãn.
- **3-5 bullet nội dung**: ngắn, song song, mỗi bullet một ý.
- **Loại slide**: cover / divider / nội dung / stat (số lớn).
- **Speaker notes**: phần người trình bày nói, tách khỏi chữ trên slide.

Ví dụ outline một slide trong deck báo cáo AWS deploy cho BOD:
```
Slide 5 [nội dung]
Tiêu đề: 4 domain public đã xanh E2E với cert wildcard hợp lệ
Bullet:
- demo.example.com + 3 domain con chạy qua một HAProxy ingress
- Cert wildcard *.demo.example.com, xanh, hạn tới 26/12/2026
- coturn/TURN đã siết, mesh P2P verify 12/12 link
Speaker notes: nhắc SG khoá SSH theo IP, mỗi lần IP đổi chạy tf.sh apply

Slide 6 [stat]
Tiêu đề: Tắt stack là dừng tính tiền EC2
Bullet:
- t3.large chỉ chạy khi cần, on/off một lệnh vm.sh
Speaker notes: cắt chi phí giờ nhàn rỗi, dữ liệu giữ nguyên khi tắt
```

## Checklist trước khi xuất

1. Cả deck có một luận điểm tổng, mỗi slide đỡ nó?
2. Mỗi slide chỉ một message, ý thứ hai đã tách slide hoặc xuống notes?
3. Tiêu đề mọi slide là câu khẳng định, không phải nhãn danh từ?
4. Có agenda đầu deck và divider mở mỗi section?
5. Số quan trọng nhất được slide riêng, một con số?
6. Slide cuối là next step cụ thể, không phải lời cảm ơn sáo?
7. Speaker notes tách khỏi chữ trên slide, slide không quá 5 bullet?
8. Mỗi slide đã ghi rõ loại (cover/divider/nội dung/stat) để bàn giao?
9. Không em dash, không AI-tell?

## Lỗi cần tránh

1. **Tiêu đề là nhãn danh từ**: "Kết quả", "Tổng quan", "Chi phí" không nói gì. Đổi thành câu khẳng định.
2. **Nhồi nhiều message một slide**: người nghe không tua lại được, mất hết. Một slide một ý.
3. **Slide đầy chữ như tài liệu**: người nghe đọc thay vì nghe. Chuyển chi tiết xuống speaker notes.
4. **Không có dòng kể, chỉ là các slide rời**: thiếu luận điểm tổng, người nghe không thấy đích.
5. **Kết sáo rỗng**: "Cảm ơn đã lắng nghe" thay vì hành động tiếp theo.
6. **Tự trang trí thay vì bàn giao**: cấu trúc này dựng dòng kể, việc render đẹp là của `figma-presentation`.

## Nguyên tắc glossary khuyến nghị

Pyramid Principle, Cognitive load, Signposting, Peak-End, Specificity, Progressive disclosure, Parallelism, BLUF.

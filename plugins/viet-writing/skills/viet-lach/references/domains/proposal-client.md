# Domain: Đề xuất / SOW / Pitch kỹ thuật cho khách hàng

## Đối tượng đọc

Bên khách hàng, thường có hai nhóm cùng đọc một tài liệu. Nhóm kỹ thuật đánh giá giải pháp có chạy được không, có phù hợp hệ thống của họ không. Nhóm quyết ngân sách nhìn giá trị, chi phí, rủi ro, và có nên chọn nhà cung cấp này không. Đề xuất phải phục vụ cả hai mà không làm nhóm nào thấy thừa hoặc thiếu.

Khách đọc đề xuất để so sánh và ra quyết định chọn, không phải để học kỹ thuật. Họ hỏi ngầm: "Bên này có hiểu vấn đề của tôi không, làm được không, đáng tiền không".

## Từ vựng & giọng văn

Cân bằng. Thuật ngữ kỹ thuật giữ nguyên cho phần dành cho người kỹ thuật đọc, nhưng giải thích ngắn khi lần đầu xuất hiện để người quyết ngân sách theo được. Register trang trọng, xưng "Quý khách", bên mình là "chúng tôi". Tự tin nhưng không khoác lác: mọi khẳng định năng lực phải có bằng chứng đỡ.

## Nỗi đau của người đọc (viết để tránh)

- Đề xuất chung chung, đọc xong không thấy giá trị cụ thể cho chính họ, giống bản mẫu gửi cho ai cũng được.
- Không rõ phạm vi: làm tới đâu, không làm gì, khách phải chuẩn bị gì.
- Không thấy năng lực nhà cung cấp: nói hay nhưng không có bằng chứng đã làm được việc tương tự.
- Thiếu mốc thời gian và chi phí, khách không lập kế hoạch và duyệt ngân sách được.

## Quy ước bắt buộc

- Khung SCQA: bối cảnh của khách, vấn đề họ đang gặp, câu hỏi cần giải, rồi mới tới giải pháp. Vấn đề nêu bằng chính ngôn ngữ và số liệu của khách, chứng tỏ đã hiểu họ.
- Nêu giá trị và ROI cụ thể: tiết kiệm bao nhiêu, giảm rủi ro gì, nhanh hơn bao nhiêu. Tránh tính từ khen suông.
- Phạm vi rõ, kèm mục ngoài phạm vi (non-goals): liệt kê thẳng những gì KHÔNG bao gồm để tránh tranh cãi về sau.
- Mốc thời gian: chia giai đoạn, mỗi giai đoạn có đầu ra và khoảng thời gian ("3-5 tuần").
- Bằng chứng năng lực: dẫn dự án thật đã làm, kèm số đo được, không nói chung "nhiều kinh nghiệm".
- Nêu giả định và điều kiện: những gì đề xuất dựa trên đó (khách cung cấp quyền truy cập, hạ tầng có sẵn), để giá và tiến độ có cơ sở.
- Kết bằng bước tiếp theo cụ thể: mời họp chốt phạm vi, thời hạn hiệu lực báo giá, đầu mối liên hệ. Không kết bằng lời chúc suông.

## Cấu trúc & format hay dùng

- `structures/scqa.md`: khung chủ đạo, dẫn từ bối cảnh khách tới giải pháp theo mạch thuyết phục.
- `structures/pyramid.md`: cho phần tóm tắt đề xuất và trình bày giải pháp theo cây luận điểm.
- Format: `formats/report-pdf.md` (hand off `doc-builder`) cho bản đề xuất gửi đọc, hoặc `formats/slide.md` (hand off `figma-presentation`) cho buổi pitch trực tiếp.

## Mẫu mở đầu / ví dụ ngắn

Mở đầu theo SCQA (bối cảnh và vấn đề bằng ngôn ngữ khách):

> Quý khách đang cần một hệ thống xác thực mạnh (FIDO2) cho ứng dụng nội bộ, nhưng chỉ dùng theo đợt demo và đánh giá, không chạy liên tục cả năm. Duy trì server bật 24/7 cho nhu cầu không thường xuyên gây lãng phí chi phí hạ tầng.
>
> Chúng tôi đề xuất triển khai hạ tầng xác thực FIDO2 dạng bật/tắt theo nhu cầu trên AWS: bật trong ít phút khi cần demo, tắt hoàn toàn khi không dùng, chỉ trả tiền cho thời gian chạy thực tế.

Mục phạm vi (kèm ngoài phạm vi):

> Bao gồm: dựng hạ tầng, cấu hình chứng chỉ bảo mật cho các domain của Quý khách, tài liệu vận hành bật/tắt, một buổi bàn giao.
> Ngoài phạm vi: phát triển tính năng ứng dụng, hỗ trợ vận hành 24/7 sau bàn giao (có thể ký gói riêng).

Bằng chứng năng lực (dự án thật, số đo được, không tính từ suông):

> Chúng tôi đã triển khai stack tương tự lên AWS và đưa 4 domain công khai vào hoạt động với chứng chỉ hợp lệ, thời gian bật hệ thống từ trạng thái tắt dưới 5 phút. Tài liệu vận hành và kịch bản bật/tắt đã được kiểm chứng trên môi trường thật.

## Lỗi hay gặp

- Viết đề xuất một khuôn gửi cho mọi khách, không cá nhân hoá bối cảnh và vấn đề của khách này.
- Bán giải pháp trước khi chứng minh đã hiểu vấn đề (bỏ qua phần S và C của SCQA).
- Khoe năng lực bằng tính từ thay vì dự án thật kèm số.
- Bỏ mục ngoài phạm vi, dẫn tới hiểu nhầm về khối lượng công việc và tranh cãi khi nghiệm thu.
- Nêu giá và tiến độ mà không nêu giả định làm cơ sở, khiến con số trông tuỳ tiện.
- Kết đề xuất bằng lời chúc chung chung thay vì bước tiếp theo cụ thể, làm khách không biết chốt deal thế nào.

# Domain: Báo cáo cho quản lý / BOD / Sếp

## Đối tượng đọc

Lãnh đạo bận, đọc lướt giữa hai cuộc họp, có thể trên điện thoại. Họ quan tâm ba thứ: kết quả (được gì rồi), rủi ro (có gì đáng lo), và nguồn lực (tốn bao nhiêu tiền, mất bao lâu). Họ KHÔNG quan tâm bạn dùng HAProxy hay Nginx, chạy bao nhiêu container. Họ cần biết đủ để ra quyết định, không cần hiểu cách vận hành.

Sếp đọc để quyết, không để học. Nếu đọc hết một trang mà chưa thấy phải quyết gì, báo cáo đã thất bại.

## Từ vựng & giọng văn

Hạn chế jargon. Thuật ngữ kỹ thuật bắt buộc thì chú thích một câu ngắn theo tác động, không theo định nghĩa: "coturn (thành phần giúp gọi video xuyên tường lửa)". Register trang trọng chuyên nghiệp. Xưng "chúng tôi/nhóm", gọi người đọc là "Ban lãnh đạo" hoặc không dùng ngôi thứ hai. Không suồng sã, không dùng "bạn".

## Nỗi đau của người đọc (viết để tránh)

- Phải đọc hết mới thấy kết luận: báo cáo giấu kết quả ở cuối.
- Đầy jargon kỹ thuật, sếp không dịch được sang ý nghĩa kinh doanh.
- Không rõ cần lãnh đạo quyết gì, đọc xong không biết phải làm gì tiếp.
- Toàn chữ, không có số: "tiến độ tốt" mà không nói xong bao nhiêu phần trăm.
- Dài dòng: ba trang cho thứ đáng lẽ nửa trang.

## Quy ước bắt buộc

- BLUF: kết luận và executive summary đặt ngay đầu. Sếp đọc 5 dòng đầu là nắm được tình hình.
- Mọi số liệu kèm tác động: không chỉ "khởi động 40 giây" mà "bật/tắt theo nhu cầu, chỉ trả tiền server khi dùng, tiết kiệm chi phí AWS".
- Nêu rõ việc cần lãnh đạo quyết, tách thành mục riêng "Cần quyết định", mỗi mục một câu hỏi có/không hoặc chọn phương án.
- Dùng trạng thái màu: xanh (đúng kế hoạch), vàng (có rủi ro cần theo dõi), đỏ (cần can thiệp). Gắn cho từng hạng mục.
- Ngắn: gói trong 1 trang nếu được. Chi tiết kỹ thuật đẩy xuống phụ lục cho ai muốn đào sâu (Progressive disclosure).
- Dịch kỹ thuật sang tác động kinh doanh: mọi thành tựu kỹ thuật phải trả lời câu "vậy thì sao, ảnh hưởng gì tới tiền/thời gian/rủi ro".
- Mỗi rủi ro đi kèm hành động giảm thiểu và ai chịu trách nhiệm, không nêu rủi ro trần rồi bỏ đó.
- Dùng số so sánh có mốc: "xong 4/4 domain", "tiết kiệm khoảng 70% giờ chạy server", để lãnh đạo cân nhắc trên nền cụ thể.

## Cấu trúc & format hay dùng

- `structures/pyramid.md` (Minto): luận điểm chính lên đầu, đỡ bởi 3 nhóm lý do. Hợp với báo cáo một trang.
- `structures/slide-narrative.md`: khi báo cáo trình bày dạng deck cho cuộc họp BOD.
- Format: `formats/slide.md` (hand off `figma-presentation`) cho họp, hoặc `formats/report-pdf.md` (hand off `doc-builder`) cho bản gửi đọc.

## Mẫu mở đầu / ví dụ ngắn

Executive summary (BLUF, số liệu kèm tác động, nêu việc cần quyết):

> Dự án đưa hệ thống xác thực FIDO2 lên hạ tầng AWS công khai đã hoàn thành giai đoạn triển khai. 4 trên 4 domain công khai hoạt động ổn định (trạng thái xanh), truy cập được từ internet với chứng chỉ bảo mật hợp lệ. Chi phí vận hành theo mô hình bật/tắt theo nhu cầu, chỉ tính tiền khi hệ thống chạy.
>
> Một rủi ro cần theo dõi (vàng): hệ thống đang dùng mật khẩu mặc định, cần đổi trước khi mở rộng người dùng.
>
> Cần Ban lãnh đạo quyết: lịch chuyển sang domain chính thức, để nhóm chốt thời điểm và chi phí chứng chỉ.

Bảng trạng thái nhanh (sếp quét trong vài giây):

> | Hạng mục | Trạng thái | Ghi chú |
> |----------|-----------|---------|
> | Triển khai 4 domain công khai | Xanh | Đang chạy ổn định |
> | Mật khẩu mặc định | Vàng | Cần đổi trước khi mở rộng |
> | Chuyển domain chính thức | Chờ quyết | Cần lãnh đạo chốt lịch |

## Lỗi hay gặp

- Chôn kết luận ở cuối, bắt sếp đọc hết mới thấy (ngược BLUF).
- Kể chi tiết kỹ thuật mà không dịch sang tác động: sếp không biết "vậy thì sao".
- Không tách rõ việc cần quyết, trộn lẫn vào phần mô tả tiến độ.
- Nói "tốt", "ổn định", "an toàn" mà không có số hay trạng thái đo được (thiếu Specificity).
- Viết dài như báo cáo kỹ thuật, không tôn trọng quỹ thời gian đọc của lãnh đạo.

# Format: Slide / Thuyết trình

## Đặc trưng

- Chiếu lên màn, người xem đọc lướt trong vài giây rồi quay lại nghe người trình bày.
- Người trình bày nói phần thoại, slide chỉ giữ ý neo. Slide không phải tài liệu để đọc một mình.
- Một ý một slide. Nhồi hai ý thì tách hai slide.
- Cognitive load thấp: mắt người xem chỉ xử lý được vài dòng khi vẫn phải nghe.
- Hình, sơ đồ, số lớn thắng đoạn văn. Chữ càng ít càng dễ theo.

## Cấu trúc chuẩn (deck)

1. **Cover**: tên bài, người trình bày, ngày, bối cảnh.
2. **Agenda**: 3-5 mục sẽ đi qua.
3. **Section divider**: chuyển chương, đặt lại ngữ cảnh.
4. **Slide nội dung**: tiêu đề assertion + 3-5 bullet.
5. **Slide số liệu (stat)**: một con số lớn làm chủ đạo, một dòng chú thích.
6. **Slide kết / next step**: chốt lại và nêu việc cần làm tiếp.

## Quy ước trình bày

- Tiêu đề slide là câu khẳng định (assertion), không phải nhãn. Viết "Stack chạy ổn định 30 ngày không downtime", không viết "Kết quả".
- 3-5 bullet mỗi slide, mỗi bullet gói trong một dòng.
- Font lớn, đủ đọc từ cuối phòng. Bullet là cụm từ, không phải câu đầy đủ.
- Speaker notes tách riêng: phần thoại, số liệu chi tiết, câu chuyển để dưới notes chứ không lên slide.
- Sơ đồ, ảnh, biểu đồ thay cho mô tả bằng chữ khi có thể (Scannability, Cognitive load).
- Áp Parallelism: các bullet cùng slide cùng dạng ngữ pháp.

## Giới hạn / ngưỡng

- Tối đa ~5 bullet mỗi slide.
- Lý tưởng ~6 từ mỗi bullet, đừng để bullet tràn dòng.
- Một số lớn mỗi slide stat, không xếp nhiều số ngang hàng gây loãng.

## Tránh

- Nhồi chữ, biến slide thành trang tài liệu.
- Đọc nguyên văn slide khi trình bày.
- Bullet dài 2-3 dòng, người xem đọc thì không nghe được.
- Quá nhiều slide khiến mỗi slide bị lướt qua, không đọng lại (Peak-End).

## Bàn giao render

Khi cần render đẹp, hand off skill `figma-presentation` (phong cách của figma-presentation). Đưa cho nó outline gồm mỗi slide: `{ loại slide, tiêu đề assertion, 3-5 bullet, speaker notes }`. Sơ đồ kiến trúc trong deck nhờ `figma-topology` xuất ảnh rồi nhúng.

## Cấu trúc (structure) ưu tiên

- `slide-narrative`: khung dòng kể cho cả deck.
- `pyramid`: slide tóm tắt đầu, kết luận lên trước.
- `prep`: từng slide nội dung, một luận điểm gọn.

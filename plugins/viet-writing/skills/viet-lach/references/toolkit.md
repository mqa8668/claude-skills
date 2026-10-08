# Toolkit: Biên tập + Trình bày + Kiểm tra chất lượng

Load khi cần biên tập sâu, quyết định cách trình bày (bảng/prose/sơ đồ/list), xử lý nội dung phức tạp, hoặc soát chất lượng cuối. KHÔNG cần load mỗi lần.

## A. Kỹ thuật biên tập (cắt gọt, viết lại cho rõ)

| # | Kỹ thuật | Cách làm | Ví dụ |
|---|----------|----------|-------|
| 1 | **Cut 20%** | Ép cắt 1/5 độ dài mà không mất ý. Buộc lộ từ thừa | Đoạn 100 từ ép còn 80, thường rõ hơn |
| 2 | **Danh-từ-hoá ngược** | Đổi danh từ hành động về động từ | "thực hiện việc triển khai" → "triển khai" |
| 3 | **Bỏ mở đầu rỗng** | Xoá câu dẫn không mang tin, vào thẳng ý | Bỏ "Cần lưu ý rằng...", còn lại nội dung |
| 4 | **Gộp câu trùng chủ đề** | 2-3 câu cùng nói 1 ý → gộp 1 | Xoá lặp lại thông tin |
| 5 | **1 câu 1 ý** | Câu nhiều mệnh đề "và/nhưng/đồng thời" → tách | Câu 40 từ → 2-3 câu ngắn |
| 6 | **Động từ mạnh thay cụm** | "làm cho... trở nên nhanh hơn" → "tăng tốc" | Ngắn và cụ thể hơn |
| 7 | **Thay tính từ bằng số** | "rất nhanh" → "khởi động 40s" | Bằng chứng thay lời khen |
| 8 | **Front-load câu** | Đưa từ khoá/kết luận lên đầu câu | "Sau nhiều thử nghiệm chúng tôi thấy X" → "X, qua nhiều thử nghiệm" |

**Quy trình biên tập 2 lượt**: Lượt 1 sửa cấu trúc (thứ tự, thiếu/thừa mục, dòng chảy). Lượt 2 sửa câu chữ (cắt từ, active voice, thuật ngữ). Đừng trộn 2 lượt, dễ sa vào chữ mà bỏ lỗi cấu trúc.

## B. Quyết định cách trình bày

Chọn công cụ theo bản chất thông tin, đừng mặc định prose.

| Thông tin có dạng | Dùng | Không nên |
|-------------------|------|-----------|
| Bước tuần tự phải làm đúng thứ tự | List đánh số | Prose "đầu tiên... sau đó... rồi..." |
| Các mục ngang hàng, không thứ tự | Bullet list | Câu văn nối bằng dấu phẩy dài |
| So sánh nhiều đối tượng theo nhiều tiêu chí | Bảng | Prose so sánh lòng vòng |
| Luồng, kiến trúc, quan hệ, mạng | Sơ đồ (figma-topology) | Mô tả prose "A nối B, B nối C..." |
| Lệnh, code, output, config | Code block (backtick) | Kể lệnh trong câu văn |
| Quyết định rẽ nhánh (nếu... thì...) | Bảng điều kiện hoặc list if/then | Đoạn văn nhiều "nếu" lồng nhau |
| Số liệu theo thời gian/danh mục | Bảng hoặc chart (dataviz) | Liệt kê số trong câu |
| Định nghĩa nhiều thuật ngữ | Bảng thuật ngữ hoặc definition list | Rải định nghĩa trong prose |

**Nguyên tắc**: nếu đang viết prose mà thấy 3+ dấu phẩy liệt kê hoặc 2+ "nếu", dừng lại, chuyển sang bảng/list/sơ đồ.

**Table hygiene**: cột đầu là khoá/nhãn, các ô cùng cột cùng dạng dữ liệu, không nhồi đoạn văn dài vào ô. Bảng quá 6-7 cột thì chia hoặc xoay.

## C. Xử lý nội dung phức tạp

**Layering (phân tầng)**: Tầng 1 cho mọi người (ý chính, TL;DR). Tầng 2 cho người cần làm (chi tiết bước). Tầng 3 cho người đào sâu (ngoại lệ, nội bộ, phụ lục). Dùng mục gập, phụ lục, hoặc link để không ép ai đọc tầng không cần.

**Ví dụ trước, quy tắc sau**: Với khái niệm khó, đưa 1 ví dụ cụ thể chạy được trước, rồi mới tổng quát hoá thành quy tắc. Người đọc bám ví dụ để hiểu quy tắc.

**Analogy có kiểm soát**: Ví von với cái quen thuộc để mở đầu, nhưng nói rõ chỗ ví von hết đúng. Không để analogy dẫn tới hiểu sai kỹ thuật.

**Định nghĩa trước khi dùng**: Thuật ngữ mới xuất hiện lần đầu phải được định nghĩa hoặc link ngay chỗ đó, không để người đọc đoán rồi mấy đoạn sau mới giải thích.

**Chia để trị**: Tài liệu quá 2000 từ hoặc phủ nhiều chủ đề → tách thành nhiều trang/tài liệu liên kết (theo Diátaxis), đừng nhồi 1 file khổng lồ.

## D. Xử lý số liệu và dẫn chứng

- **Nêu nguồn/thời điểm** cho mọi số quan trọng: "17 container (đo ngày 06/07/2026)". Số không nguồn trong tài liệu kỹ thuật dễ bị nghi.
- **Đơn vị và mốc so sánh**: "nhanh hơn 3 lần" phải nói nhanh hơn cái gì. "40s" tốt hơn "nhanh".
- **Không làm tròn ẩu** khi con số là sự thật đo được: "chờ ~40s" nếu là ước lượng, "17 container" nếu đếm được chính xác.
- **Bịa là lỗi nặng nhất**: chưa có số thật thì viết `[[cần đo]]` hoặc bỏ, không phịa.

## E. Checklist chất lượng cuối (mọi tài liệu)

**Cấu trúc:**
1. Có 1 câu mục tiêu rõ (ai đọc xong làm/hiểu được gì)?
2. Ý chính/kết luận nằm ở đầu (trừ tutorial)?
3. Heading mô tả đúng nội dung, quét là hiểu bố cục?
4. Các mục MECE, không chồng lấn, không thiếu?
5. Dòng chảy given-new, không nhảy cóc?

**Câu chữ:**
6. Câu trung bình dưới 20 từ, không câu nào quá 25 mà không tách được?
7. Đoạn tối đa 3-4 câu, ý phức tạp đã chuyển bảng/list?
8. Chủ động, ít bị động rỗng, ít danh-từ-hoá?
9. Thuật ngữ nhất quán 1 khái niệm 1 tên?

**Trình bày:**
10. Thông tin đã ở đúng dạng (bảng/list/sơ đồ/code), không nhồi prose?
11. Lệnh/tên/đường dẫn trong backtick?

**Sự thật + văn phong:**
12. Lệnh/tên/số khớp source, không bịa, chỗ chưa chắc đã đánh dấu?
13. Không em dash, không AI-tell (xem `vietnamese-style.md` mục D)?

Thiếu 3 mục trở lên → biên tập lại trước khi giao.

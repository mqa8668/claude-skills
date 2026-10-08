# Văn phong tiếng Việt kỹ thuật + Chống AI-tell

Auto-load khi output tiếng Việt (mặc định). Đây là chuẩn văn phong để tài liệu đọc như người thật viết, chuyên nghiệp, không sáo rỗng.

## A. Thuật ngữ Anh hay Việt

Quy tắc: ưu tiên thuật ngữ mà người đọc THẬT dùng trong công việc, không dịch máy móc.

**Giữ nguyên tiếng Anh** (dịch ra nghe lạ hoặc sai nghĩa với dân kỹ thuật):
- Tên công nghệ, sản phẩm, giao thức: Docker, Kubernetes, HAProxy, container, cert, token, endpoint, deploy, commit, merge, port, DNS, TLS.
- Thuật ngữ đã thành chuẩn ngành: firewall, cache, backend, frontend, log, script, image (Docker), volume, healthcheck.

**Dịch sang tiếng Việt** (có từ Việt phổ thông, rõ):
- máy chủ (server, khi văn cảnh phổ thông), ổ cắm/cổng (port, khi giải thích cho người không kỹ thuật), sao lưu (backup), khôi phục (restore), cấu hình (config), phiên bản (version).

**Nguyên tắc chọn**: audience kỹ thuật → giữ tiếng Anh nhiều hơn, đọc tự nhiên. Audience người dùng cuối / lãnh đạo → dịch nhiều hơn, chú thích tiếng Anh trong ngoặc lần đầu: "sao lưu (backup)".

**Nhất quán**: chọn 1 cách cho cả tài liệu. Không lúc "container" lúc "vùng chứa". Không lúc "deploy" lúc "triển khai" cho cùng ngữ cảnh (trừ khi cố ý cặp đôi lần đầu).

**Không chèn tiếng Anh làm dáng**: nếu có từ Việt phổ thông và đúng, dùng từ Việt. "leverage cái này" → "dùng cái này". "optimize lại flow" → "tối ưu lại luồng".

## B. Register (mức trang trọng)

| Register | Ngôi xưng | Dùng cho |
|----------|-----------|----------|
| Trang trọng | "Quý khách", "Ban lãnh đạo", không ngôi thứ 2 suồng sã | Đề xuất khách hàng, báo cáo BOD, văn bản chính thức |
| Chuyên nghiệp trung tính | "bạn" (người đọc), "chúng tôi/nhóm" | README, tài liệu kỹ thuật, hướng dẫn, wiki nội bộ |
| Thân thiện | "bạn", "mình", câu hỏi trực tiếp | Hướng dẫn người dùng cuối, tài liệu onboarding, blog nội bộ |

Chọn 1 register và giữ suốt tài liệu. Không lẫn "Quý khách" với "bạn" trong cùng văn bản.

## C. Dấu câu, số, định dạng

- **KHÔNG em dash (-) và en dash (-) giữa câu.** Ngắt câu dùng dấu chấm hoặc phẩy. Gạch ngang ngắn (-) chỉ cho đầu bullet, từ ghép ("CI-CD"), khoảng số ("3-5 ngày", "10-200 nhân sự").
- **Dấu câu sát chữ trước, cách chữ sau**: "Xong. Bước tiếp" không "Xong .Bước tiếp".
- **Số**: tiếng Việt dùng dấu chấm phân cách nghìn, phẩy cho thập phân: "1.847 doanh nghiệp", "4,8/5 sao". Nhưng số kỹ thuật/tiền tệ quốc tế hoặc code giữ nguyên gốc ("8GB", "$797", "203.0.113.10" là IP). Nhất quán trong 1 tài liệu.
- **Ngày**: "ngày 7 tháng 7 năm 2026" (trang trọng) hoặc "07/07/2026" (kỹ thuật). Không dùng "Jul 7".
- **Đơn vị**: cách số 1 space hoặc không, chọn 1 kiểu: "8 GB" hoặc "8GB" nhất quán.
- **Code, lệnh, tên file, đường dẫn**: luôn để trong `backtick`. Ví dụ: chạy `docker compose up -d`, sửa file `.env`, thư mục `certs/demo`.
- **Viết hoa**: tên riêng công nghệ viết đúng chuẩn của nó (HAProxy không Haproxy, Kubernetes không kubernetes ở đầu câu, GitHub không Github).

## D. AI-tell cần TRÁNH (làm văn nghe như máy)

Đây là dấu hiệu văn AI. Cắt hoặc thay hết.

**Cụm sáo rỗng mở đầu**: "Trong thế giới ngày càng phát triển...", "Trong thời đại số hiện nay...", "Không thể phủ nhận rằng...", "Như chúng ta đã biết...". Bỏ, vào thẳng nội dung.

**Từ đệm rỗng**: "một cách", "vô cùng", "cực kỳ", "đáng kể", "nhất định", "chắc chắn rằng", "điều quan trọng cần lưu ý là", "cần nhấn mạnh rằng". Cắt gần hết.

**Động từ kêu rỗng**: "tận dụng tối đa", "khai thác triệt để", "nâng tầm", "kiến tạo", "đồng hành", "giải pháp toàn diện", "tối ưu hoá trải nghiệm". Thay bằng động từ cụ thể.

**Câu kết sáo**: "Hy vọng bài viết hữu ích", "Tóm lại, có thể thấy rằng", "Nhìn chung". Với tài liệu, kết bằng next step cụ thể hoặc bỏ luôn.

**Liệt kê 3 tính từ đối xứng**: "nhanh chóng, hiệu quả và bền vững", "mạnh mẽ, linh hoạt và an toàn". Rất AI. Thay bằng 1 bằng chứng cụ thể.

**Lạm dụng emoji + bold**: rải emoji đầu mỗi bullet, bold nửa câu. Với tài liệu kỹ thuật, dùng emoji rất tiết chế (nếu có), bold chỉ từ khoá thật sự cần nhấn.

**"Không chỉ... mà còn..."** lặp lại: cấu trúc này 1 lần thì được, rải khắp bài là AI-tell.

## E. Câu văn tự nhiên hơn

- Biến câu bị động rỗng thành chủ động: "Việc cấu hình được thực hiện bởi script" → "Script tự cấu hình".
- Bỏ danh-từ-hoá: "tiến hành việc kiểm tra" → "kiểm tra"; "thực hiện quá trình cài đặt" → "cài đặt".
- Câu dài quá 25 từ: tách. Đoạn quá 4 câu: tách hoặc chuyển bullet.
- Đọc to (trong đầu): chỗ nào hụt hơi hoặc lặp âm, sửa.

## F. Checklist soát tiếng Việt trước khi giao

1. Không còn ký tự em dash/en dash nào giữa câu?
2. Thuật ngữ Anh/Việt nhất quán, không chèn tiếng Anh làm dáng?
3. Register thống nhất, ngôi xưng không lẫn?
4. Số, ngày, đơn vị đúng chuẩn và nhất quán?
5. Lệnh/tên file/đường dẫn đều trong backtick?
6. Đã cắt hết cụm AI-tell ở mục D?
7. Không câu nào quá 25 từ mà không tách được?

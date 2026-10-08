# ADR (Architecture Decision Record, ghi lại một quyết định kỹ thuật và lý do)

ADR chép lại một quyết định kiến trúc: bối cảnh nào đẩy tới nó, chọn gì, và đánh đổi ra sao. Dùng khi quyết định có hệ quả dài, khó đảo, hoặc sẽ bị hỏi lại "vì sao hồi đó làm thế". Người đọc ADR là bạn hoặc đồng nghiệp trong tương lai, đang cân nhắc có nên thay đổi quyết định cũ, và cần hiểu lực đẩy ban đầu trước khi động vào. KHÔNG dùng ADR để mô tả cách vận hành (đó là Runbook) hay để liệt kê tính năng (đó là README). ADR bất biến: khi quyết định thay đổi, viết ADR mới thay thế ADR cũ, không sửa đè. Một ADR gói gọn một quyết định, ngắn, thường một trang.

## Các biến thể

### 1. ADR ngắn
Đủ 5 mục Nygard, mỗi mục vài câu. Cho quyết định rõ ràng, ít tranh cãi. Ví dụ: pin `NETBIRD_VERSION` `0.74.0` để tránh regression khi tự nâng.

### 2. ADR có so sánh alternatives
Thêm mục cân nhắc phương án, mỗi phương án nói vì sao loại. Cho quyết định có nhiều lựa chọn ngang tài và cần chứng minh đã xét đủ. Ví dụ: chọn HAProxy single ingress thay vì Nginx hay Traefik.

### 3. ADR superseded (thay ADR cũ)
Viết khi đảo một quyết định cũ. ADR mới nêu Status `accepted, supersedes ADR-NNN`, ADR cũ đổi Status thành `superseded by ADR-MMM` (chỉ sửa dòng status, giữ nguyên phần còn lại). Context giải thích điều gì đã đổi khiến quyết định cũ hết đúng.

## Template chuẩn Nygard

1. **Tiêu đề**: `ADR-NNN: [quyết định ở thể khẳng định]`. Ví dụ: `ADR-0001: Dùng HAProxy làm single ingress cho 6 domain`.
2. **Status**: `proposed` / `accepted` / `superseded by ADR-MMM` / `deprecated`.
3. **Context**: lực đẩy và ràng buộc dẫn tới quyết định. Nêu vấn đề, không kể giải pháp.
4. **Decision**: một câu dứt khoát ("Chúng tôi chọn X") rồi chi tiết cách làm.
5. **Consequences**: hệ quả cả tốt lẫn xấu, gồm đánh đổi phải chấp nhận.
6. **Alternatives considered**: các phương án đã xét, mỗi cái nói vì sao loại.

## Kỹ thuật cốt lõi

### 1. Context nêu lực đẩy, không kể lể
Context là các áp lực và ràng buộc buộc phải quyết, không phải nhật ký. Ví dụ ADR HAProxy: "Sáu domain phải chung một EC2, một cert wildcard `certs/demo`, ingress phải resolve DNS runtime để restart không chết. Trước đó dùng nhiều file Nginx rời, khó giữ đồng bộ." Nêu ràng buộc đo được, để người sau hiểu quyết định sinh ra từ đâu.

### 2. Decision viết thể chủ động, dứt khoát (Active voice)
Mở bằng một câu quyết đoán: "Chúng tôi chọn HAProxy làm ingress duy nhất, 0.0.0.0 cho cả 6 domain, một cert wildcard." Không "có thể nên cân nhắc dùng". ADR chốt, không phân vân. Chi tiết kỹ thuật (resolver runtime, SSO wait-loop) đặt sau câu chốt.

### 3. Consequences trung thực cả mặt trái
Liệt kê cả cái được lẫn cái mất. Được: một ingress, một cert, một chỗ sửa. Mất: HAProxy thành single point of failure; cấu hình DNS resolver runtime là cái bẫy dễ quên khi restart proxy. ADR giấu đánh đổi là ADR vô dụng cho người sau ra quyết định.

### 4. Mỗi alternative nói vì sao loại
Không chỉ liệt kê tên phương án. Với mỗi cái, một câu vì sao không chọn. Ví dụ ADR pin NetBird: "Dải `0.75+`: lazy-connection bật mặc định làm peer idle rồi relay-flap, đã tái hiện trên box mgmt. `0.73`: thiếu fix id_token. Chốt `0.74.0` vì ổn định đã kiểm và không dính lazy-connection." Người đọc thấy bạn đã xét, không đoán bừa.

### 5. Immutable, viết mới để thay cũ (Progressive disclosure theo thời gian)
Không sửa nội dung ADR đã accepted. Khi đảo quyết định, tạo ADR mới supersedes cái cũ, chỉ đổi dòng Status của ADR cũ trỏ tới cái mới. Chuỗi ADR trở thành lịch sử quyết định đọc được, không phải một file bị viết đè mất dấu vết.

### 6. Một ADR một quyết định (MECE)
Đừng gói "chọn HAProxy và pin NetBird và chọn coturn" vào một ADR. Mỗi quyết định độc lập một file, đánh số riêng. Chúng chồng lấn thì tách, để sau này đảo một cái không kéo theo cái khác.

### 7. Tiêu đề là câu khẳng định, đánh số tuần tự
Tiêu đề nói quyết định, không phải chủ đề. `ADR-0002: Pin NETBIRD_VERSION ở 0.74.0` rõ hơn `ADR-0002: Về phiên bản NetBird`. Số tăng dần, không tái dùng số của ADR đã superseded.

## Ví dụ ADR rút gọn (đầy đủ 5 mục)

```markdown
# ADR-0001: Dùng HAProxy làm single ingress cho 6 domain

Status: accepted (07/07/2026)

## Context
6 domain phải chung một EC2 t3.large, một cert wildcard `certs/demo`.
Ingress phải resolve DNS lúc runtime, nếu không restart proxy sẽ chết vì
IP backend đổi. Trước đó dùng nhiều file Nginx rời, khó giữ đồng bộ khi
đổi domain hay xoay cert.

## Decision
Chúng tôi chọn HAProxy làm ingress duy nhất, bind 0.0.0.0 cho cả 6 domain,
một cert wildcard. Dùng resolver runtime để restart không phụ thuộc IP
tĩnh. Thêm SSO wait-loop ở portal/api/grpc chờ backend sẵn sàng.

## Consequences
- Được: một chỗ cấu hình, một cert, một điểm sửa khi đổi domain.
- Được: restart an toàn nhờ resolver runtime.
- Mất: HAProxy thành single point of failure.
- Mất: resolver runtime là cái bẫy dễ quên, thiếu nó proxy chết khi restart.

## Alternatives considered
- Nginx nhiều file rời: khó đồng bộ khi re-domain, đã bỏ.
- Traefik: auto-discovery thừa cho stack cố định 6 domain, thêm phụ thuộc.
```

## Checklist trước khi xuất

1. Tiêu đề là câu khẳng định nêu rõ quyết định, có số `ADR-NNN`?
2. Status đúng một trong các giá trị chuẩn (proposed/accepted/superseded/deprecated)?
3. Context nêu lực đẩy và ràng buộc, không lẫn giải pháp vào?
4. Decision mở bằng một câu chủ động dứt khoát?
5. Consequences có cả mặt trái và đánh đổi, không chỉ khoe cái được?
6. Mỗi alternative có lý do bị loại?
7. Một ADR chỉ chốt một quyết định (MECE)?
8. Không sửa đè ADR cũ mà tạo ADR mới supersedes?
9. Không em dash, không AI-tell?

## Lỗi cần tránh

1. **Context thành nhật ký**: kể lể quá trình thay vì nêu lực đẩy. Chỉ giữ ràng buộc dẫn tới quyết định.
2. **Consequences một chiều**: chỉ liệt kê ưu điểm, giấu đánh đổi. Người sau cần thấy cái mất để cân nhắc.
3. **Alternatives liệt kê suông**: nêu tên mà không nói vì sao loại, đọc như bịa cho đủ mục.
4. **Sửa đè ADR cũ**: mất lịch sử quyết định. Luôn viết ADR mới supersedes.
5. **Gói nhiều quyết định vào một ADR**: sau này khó đảo từng cái, khó tham chiếu.
6. **Decision phân vân**: "có lẽ nên dùng X" không phải quyết định. ADR phải chốt.

## Nguyên tắc glossary khuyến nghị

Active voice, BLUF, MECE, Specificity, Word economy, Consistency, Progressive disclosure.

---
name: viet-ky-thuat
description: >
  Viết tài liệu kỹ thuật tiếng Việt (hạ tầng, bảo mật, DevOps, tuân thủ) theo lối lai chuẩn - giữ nguyên thuật ngữ tiếng Anh mà kỹ sư Việt thật sự dùng (DMZ, edge, failover, quorum, cluster, backup, erasure coding), chỉ dịch những gì có từ Việt phổ thông và đúng nghĩa, và dùng đúng từ pháp lý tiếng Việt khi trích văn bản nhà nước (vùng mạng, sao lưu bất biến, hồ sơ đề xuất cấp độ). Có bảng thuật ngữ tra nhanh cho infra/security/compliance, quy tắc dựng cặp tài liệu EN + VI song song (parity heading/bảng/hình), và checklist soát trước khi giao.
  TRIGGERS: "viết tiếng việt", "bản tiếng việt", "làm bản VI", "song ngữ", "EN và VI", "viết lai tiếng anh", "giữ nguyên thuật ngữ", "ANAT", "TCVN 11930", "hồ sơ cấp độ".
  Dùng khi user muốn tài liệu kỹ thuật bằng tiếng Việt, hoặc bản tiếng Việt song song với một tài liệu tiếng Anh đã có. Bổ sung cho viet-lach (cấu trúc, văn phong chung) và doc-builder (render HTML/PDF).
---

# viet-ky-thuat - tiếng Việt kỹ thuật, giữ nguyên thuật ngữ ngành

Tài liệu kỹ thuật tiếng Việt dịch sạch 100% thì đọc như máy dịch và sai nghĩa với người trong nghề. "Vùng phi quân sự" thay cho DMZ, "chuyển đổi dự phòng" thay cho failover, "biên" thay cho edge - kỹ sư đọc xong phải dịch ngược lại trong đầu. Skill này chốt luật giữ hay dịch, và cách dựng cặp EN + VI không lệch nhau.

## Luật gốc

**Phép thử một câu:** nếu một kỹ sư hạ tầng người Việt nói câu đó trong buổi standup mà không thấy gượng, viết đúng như vậy.

"HAProxy health check backend rồi loại node chết ra khỏi rotation" - đúng.
"HAProxy kiểm tra tình trạng máy chủ hậu cần rồi loại nút đã chết khỏi vòng quay" - sai, không ai nói thế.

Ba nhóm, xử lý khác nhau:

| Nhóm | Xử lý | Ví dụ |
|---|---|---|
| Thuật ngữ ngành | Giữ nguyên tiếng Anh, không in nghiêng, không giải thích | DMZ, edge, failover, quorum, cluster, node, replica, erasure coding, object lock, hardening, stateless |
| Từ có tiếng Việt phổ thông và đúng nghĩa | Dịch | máy chủ, vùng mạng, cấu hình, phiên bản, giám sát, tuân thủ, rủi ro tồn dư |
| Từ trích từ văn bản pháp luật | Dùng đúng chữ của văn bản, kể cả khi bản kỹ thuật đang dùng từ tiếng Anh | "sao lưu bất biến", "vùng mạng", "hồ sơ đề xuất cấp độ", "diễn tập thực chiến" |

Nhóm 3 là chỗ hay sai nhất. Trong phần kỹ thuật viết "backup ghi vào MinIO"; trong phần trích Công điện 33 viết "sao lưu bất biến (immutable backup)". Hội đồng thẩm định đọc theo chữ của văn bản, kỹ sư đọc theo chữ của nghề, tài liệu phải phục vụ cả hai. Đây không phải mâu thuẫn, đây là hai ngữ cảnh khác nhau.

## Bảng tra nhanh

### Giữ nguyên tiếng Anh

Mạng và hạ tầng: DMZ, edge, gateway, ingress, backend, frontend, host, node, cluster, replica, replica set, quorum, failover, floating IP, health check, rate limit, port mirror, passthrough, wildcard, subnet, overlay, mesh, peer.

Vận hành: container, image, tag, registry, deploy, rollback, rolling update, orchestrator, runbook, baseline, hardening, patch, staging, production, scale ngang, scale dọc.

Dữ liệu và lưu trữ: datastore, schema, primary key, index, snapshot, erasure coding, object lock, immutable, air-gapped, hot, cold, chunk, bucket, retention.

Bảo mật: zero trust, pentest, scrubbing, exfiltration, session, token, credential, RBAC, SIEM, HIDS, FIM, WAF, IDS, SBOM, playbook.

Danh từ riêng: mọi tên sản phẩm, giao thức, chuẩn - HAProxy, Patroni, WireGuard, OIDC, WebAuthn, TLS, ALPN, gRPC, SNI, VRRP.

### Dịch sang tiếng Việt

máy chủ (server), vùng mạng (network zone), tường lửa (firewall) - trừ khi đang gọi đúng tên thiết bị, cấu hình (config/configuration), phiên bản (version), giám sát (monitoring) - riêng stack thì gọi observability, xác thực (authentication), phân quyền (authorization), mã hoá (encryption), tuân thủ (compliance), rủi ro tồn dư (residual risk), điều kiện tiên quyết (prerequisite), dung lượng cấp phát (provisioned storage), khoảng trống (gap), bằng chứng (evidence).

### Tuỳ ngữ cảnh, chọn một và giữ suốt tài liệu

| Từ | Kỹ thuật | Pháp lý / trích văn bản |
|---|---|---|
| backup | backup | sao lưu |
| log | log | nhật ký |
| audit trail | audit | nhật ký kiểm toán |
| session recording | bản ghi phiên | bản ghi hình phiên |
| high availability | HA, high availability | tính sẵn sàng cao |
| data center | DC | trung tâm dữ liệu |
| identity provider | identity provider | hệ thống định danh |

## Cặp tài liệu EN + VI

Bản tiếng Việt là **bản song song**, không phải bản tóm tắt và cũng không phải bản dịch từng chữ. Luật:

1. **Parity cấu trúc.** Cùng số heading, cùng số bảng, cùng số dòng bảng, cùng số hình, cùng thứ tự. Kiểm bằng lệnh, đừng tin mắt:
   ```bash
   paste <(grep -c '^###* ' EN.md) <(grep -c '^###* ' VI.md)
   paste <(grep -c '^|' EN.md) <(grep -c '^|' VI.md)
   paste <(grep -c '^!\[' EN.md) <(grep -c '^!\[' VI.md)
   ```
2. **Không dịch định danh.** Tên VM, tên service, tên database, tên file, cờ dòng lệnh, tên miền, mã tài liệu giữ nguyên trong backtick: `edge-01/02`, `mesh_core_db`, `--single-account-mode-domain`, `sso.example.com`, `PR-BK-06`.
3. **Số giữ định dạng kỹ thuật.** `2.45 TB`, `1250 GB`, `49152-65535`, `100.64.0.0/10` - không đổi dấu chấm thành dấu phẩy trong tài liệu kỹ thuật, vì diagram và bảng bên EN đang dùng định dạng đó. Riêng số đếm trong câu văn thuần thì theo lối Việt.
4. **Caption hình dịch, chữ trong hình thì không.** Diagram export từ Figma là tiếng Anh, giữ nguyên. Caption dịch và phải ghi rõ "sơ đồ logic" hay "sơ đồ vật lý".
5. **Header bảng dịch, ô định danh không.** "VM | Vai trò | Vùng mạng | SL | vCPU | RAM (GB) | Đĩa OS (GB) | Đĩa data (GB) | Cơ chế HA".
6. **Sửa một bên là phải sửa bên kia trong cùng lượt.** Cặp lệch nhau một vòng review là mất niềm tin vào cả hai.

## Văn phong

Kế thừa toàn bộ `viet-lach/references/vietnamese-style.md`. Nhấn thêm bốn điểm hay hỏng ở tài liệu hạ tầng:

- **Không em dash, không en dash.** Tách câu bằng dấu chấm hoặc phẩy. Dấu `-` chỉ cho bullet, từ ghép, khoảng số.
- **Câu ngắn.** Ý phức tạp thì tách bullet hoặc bảng, đừng nhồi mệnh đề phụ.
- **Chủ ngữ là thứ thật sự hành động.** "HAProxy loại backend hỏng" chứ không phải "backend hỏng sẽ được loại bỏ".
- **Đừng chèn tiếng Anh làm dáng.** Có từ Việt phổ thông và đúng thì dùng từ Việt: "tối ưu lại luồng" chứ không "optimize lại flow"; "giải thích" chứ không "explain".

## Checklist trước khi giao

1. `grep -c $'-\|-'` trên cả hai bản, phải bằng 0.
2. Ba lệnh parity ở trên, ba cặp số phải bằng nhau.
3. Không định danh nào bị dịch: soát tên VM, tên service, tên database, mã tài liệu.
4. Một khái niệm một tên xuyên suốt: không lúc "backup" lúc "sao lưu" trong cùng ngữ cảnh kỹ thuật.
5. Thuật ngữ pháp lý dùng đúng chữ của văn bản gốc trong phần trích dẫn.
6. Caption hình có ghi loại sơ đồ (logic hay vật lý).
7. Render xong thì **mở ra nhìn** - dấu tiếng Việt trong bảng, trong masthead, trong caption. Đừng giao bản chưa nhìn tận mắt.

## Bàn giao

Skill này chỉ lo câu chữ và cặp song ngữ. Cấu trúc tài liệu và dòng lập luận theo `viet-lach`. Render HTML/PDF theo `doc-builder`. Vẽ diagram theo `figma-topology`. Tài liệu kiến trúc gửi khách theo `architecture-doc`.

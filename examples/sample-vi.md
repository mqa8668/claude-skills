# Acme Logistics - Đề xuất kiến trúc HA cho nền tảng dispatch

## Tóm tắt

Hệ thống dispatch của Acme Logistics hiện chạy trên hai site nhưng chung một failure domain.
Khi job queue mất quorum, toàn bộ depot dừng nhận lệnh cho đến khi kỹ sư can thiệp bằng tay.
Đề xuất này nâng queue lên cluster ba node, thêm database standby và thay runbook failover thủ
công bằng quy trình đã được kiểm thử. API công khai giữ nguyên.

> **Lưu ý:** mọi số liệu trong tài liệu là dữ liệu mẫu cho một khách hàng hư cấu.

## Hiện trạng

| Thành phần | SL | Vai trò | Rủi ro |
|---|---|---|---|
| Load balancer | 2 | Terminate TLS, active/passive | Thấp |
| API node | 4 | Dispatch API stateless | Thấp |
| Queue node | 2 | Job queue, một leader | Cao: mất quorum khi down một node |
| Database | 1 | PostgreSQL primary, một replica async | Trung bình: promote thủ công |

## Phương án đề xuất

1. Thay queue hai node bằng cluster ba node để đa số còn lại sau một lần hỏng.
2. Thêm database standby, kèm quy trình failover có kiểm thử.
3. Cảnh báo theo queue depth và replica lag, page on-call trước khi depot nhận ra.
4. Diễn tập failover mỗi quý và lưu lại kết quả.

## Nghiệm thu

| Giai đoạn | Tuần | Hoàn thành khi |
|---|---|---|
| Build | 1-2 | Cluster chạy trên staging và qua bài kiểm tra mất node |
| Cutover | 3 | Dispatch chạy trên queue mới 7 ngày không cần thao tác tay |
| Hypercare | 4-5 | Hai lần failover test đạt; vận hành Acme chấp nhận runbook |

Khối lượng ước tính: 15 ngày công trong năm tuần. Liên hệ: ops@example.com.

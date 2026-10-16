# Kiểm tra V2 — Toàn cầu hóa

## Kết quả kỹ thuật

- Video: H.264/yuv420p, 1920×1080, 30 FPS.
- Số khung hình: 3098; thời lượng 103.266667 giây.
- Audio gốc giải mã: 103.235918 giây.
- Audio AAC xuất: 103.236009 giây.
- Video dài hơn audio gốc khoảng 30.75 ms, không cắt lời cuối.
- Waveform MP3/AAC tương quan 0.99998077; không thêm nhạc hoặc thay giọng.
- MP4: 33,109,139 byte; SHA-256 `18a54e7a497f1c6450ee6f925edce136ad43c30c48611de1cb14de307f0fa00c`.
- Checksum V1 và MP3 đầu vào khớp các giá trị bảo toàn đã ghi trước khi sửa.

## Kiểm tra hình ảnh

Đã render 30 pose Canvas ở các mốc hành động trước bản xuất đầy đủ. Sau đó,
trích 105 khung hình từ MP4 cuối, gồm các mốc nội dung, hai phía ranh giới
câu và các điểm camera chuyển giữa môi trường. Có bảng ảnh tổng hợp 15 mốc.
Bảng cặp khung hình có thay đổi lớn nhất được dùng để xem các pan nhanh.
Chênh lệch pixel chỉ hỗ trợ tìm đoạn cần xem, không thay thế đánh giá hoạt họa.

Các vòng sửa trước bản cuối: dáng đứng/chiều dài tay, tư thế ngồi có ghế,
phân biệt kiểu nội thất, hình học dầm/cáp cẩu và sàn xe nhận container, vị trí
thanh chắn trước xe, nhận diện kỹ thuật viên, tay nhấc điện thoại từ quầy,
bàn giao hộp theo tay, xe đi vào/ra khung, phiếu đơn được rút khỏi bảng và
kho trống thay vì hàng tự mờ đi. Không có cảnh địa cầu trong V2; bản đồ phẳng
chỉ nằm ở chặng điều phối quốc tế ngắn khoảng 28–35 giây.

FFprobe đếm đủ toàn bộ khung hình. FFmpeg giải mã toàn bộ video khi trích ảnh
và toàn bộ audio khi so sánh waveform, không báo lỗi giải mã.
Script chọn hơn 100 mốc ảnh dùng biểu thức cộng cân bằng để tránh giới hạn
độ sâu bộ phân tích biểu thức FFmpeg; không bỏ bớt các điểm kiểm tra.

## Phạm vi và giới hạn

Timestamp theo câu vẫn là ước lượng đã được người dùng chấp nhận, không phải
forced alignment. Các không gian là sân khấu minh họa liên tục bằng Canvas 2D,
không phải bản đồ/tỷ lệ địa lý thực tế. Bản cũ `output/globalization.mp4`, nguồn
V1, audio, transcript và 20 phong cách gốc được giữ nguyên. V2 có nguồn và tệp
đầu ra riêng; chỉ xuất bản lên `video-exports`, không tạo PR hoặc merge main.

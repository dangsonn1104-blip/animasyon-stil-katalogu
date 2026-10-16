# Kiểm tra bản dựng Toàn cầu hóa

- Trạng thái: đã render và kiểm tra MP4 cuối sau một vòng sửa bố cục.
- Video: H.264, yuv420p, 1920×1080, 30 FPS, 3098 khung hình.
- Thời lượng video/container: 103.266667 giây.
- Audio gốc giải mã: 103.235918 giây; AAC xuất: 103.236009 giây.
- Video dài hơn audio gốc khoảng 30.75 ms; không cắt lời cuối.
- Dung lượng: 13,840,726 byte.
- SHA-256 MP4: `2fa083b04019479161998836613a03705f19e5edf39d4b61aa36246ea9bcec90`.

## Audio và đồng bộ

Dùng nguyên bản thu người dùng cung cấp, không thêm nhạc hoặc tạo lại giọng.
SHA-256 tệp MP3 được kiểm tra với dữ liệu đầu vào. So sánh waveform audio sau
mã hóa AAC với MP3 giải mã cho hệ số tương quan 0.99998077.
Timestamp 20 câu là **ước lượng** từ độ dài câu, tốc độ đọc và các khoảng lặng
thực đo, theo yêu cầu đã được người dùng chấp nhận cho bản dựng đầu tiên.
Không sử dụng mô hình AI, không khẳng định đồng bộ chính xác từng từ.

## Hình ảnh và tính liên tục

Đã trích 52 khung hình từ MP4 cuối: các mốc nội dung và hai phía của
19 ranh giới câu. Đã xem bảng khung hình chính và các cặp có thay đổi lớn nhất
quanh ranh giới câu. Mức thay đổi pixel trung bình lớn nhất giữa hai mẫu cách
nhau 2 khung hình là 4.4500/255; con số này chỉ hỗ trợ tìm điểm cần xem,
không thay thế đánh giá hình ảnh.

Đã sửa và render lại sau khi phát hiện điện thoại che nhãn quốc gia ở phần đầu
và chồng lên nhân vật/đường kết nối ở phần kết. Bản cuối đưa điện thoại sang bên
khi cần, giữ các đối tượng và đường dẫn liên tục, không hard cut hoặc màn đen.
Ảnh tổng hợp cuối: `output/globalization-contact-sheet.jpg`.

FFprobe đếm đủ khung hình; FFmpeg đã giải mã toàn bộ luồng video khi trích các
khung hình và giải mã toàn bộ audio khi so sánh waveform, không báo lỗi.
Mã nguồn 20 phong cách gốc giữ nguyên. Các tệp cần thiết được đưa lên nhánh
`video-exports`; không tạo Pull Request hoặc merge main.

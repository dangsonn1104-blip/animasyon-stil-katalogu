# Kiểm tra bản xuất đầu tiên

- MP4: H.264/yuv420p, 1920×1080, 30/1 FPS, đúng 1.800 frame; video, audio và container đều 60,000 giây theo FFprobe.
- AAC stereo 48 kHz; tương quan dạng sóng với bản phối WAV: 0,99848.
- Hai WAV PCM 16-bit stereo 48 kHz, mỗi tệp 2.880.000 mẫu/kênh = 60 giây, không clipping.
- Giải mã toàn bộ 1.800 frame để kiểm tra; không có frame đen. Độ chênh trung bình lớn nhất giữa hai frame liên tiếp ở ảnh giảm kích thước là 2,192/255. Đây là phép dò lỗi kỹ thuật, không phải điểm chất lượng nghệ thuật.
- Trích xuất 32 ảnh từ MP4, gồm 17 mốc truyện và các frame sát chuyển tiếp. Đã xem contact sheet và các nhóm frame 719–721, 809–811, 1349–1351.
- Vòng kiểm tra đầu phát hiện mặt sông bật lên ở frame 721. Đã đổi sang chuyển động hình học từ ngoài khung, render lại và chạy lại kiểm tra thành công.
- Bản phim không có chữ thuyết minh, thoại hoặc TTS. Nhạc/hiệu ứng được tổng hợp bằng Python; không dùng âm thanh tải về.
- Các tệp đã tồn tại trong repository không bị sửa hoặc xóa. Chỉ bổ sung dự án này và hai đầu ra liên quan.

Thông số và SHA-256 đầy đủ nằm trong `validation.json`. Công cụ không đánh giá thay người xem về chất lượng diễn xuất hay âm sắc; đây là phiên bản đầu tiên để xem và góp ý.

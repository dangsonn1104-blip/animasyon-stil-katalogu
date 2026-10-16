# Toàn cầu hóa — hoạt ảnh Canvas liên tục

Bản dựng đầu tiên theo storyboard đã được duyệt. Mã nguồn mới nằm hoàn toàn
trong dự án này; không sửa mã nguồn 20 phong cách gốc. Video dùng nguyên bản
thuyết minh do người dùng cung cấp, không tạo lại giọng, không thêm nhạc hoặc
phụ đề toàn màn hình.

## Nội dung và dữ liệu

- `narration.mp3`: audio gốc, giữ nguyên từng byte.
- `transcript.txt`: nguyên văn 20 câu thuyết minh.
- `STORYBOARD.md`: storyboard 14 phân đoạn đã duyệt.
- `TIMELINE.md`: timestamp câu và timeline phân đoạn cho bản dựng này.
- `alignment.json`: timestamp **ước lượng**, khoảng lặng thực đo, thời lượng,
  số khung hình và SHA-256 của audio. Không có timestamp từng từ giả định.
- `estimate_timing.py`: ước lượng timestamp không dùng mô hình AI.
- `anim.html`, `animation.js`: toàn bộ tạo hình vector và timeline Canvas.
- `render.mjs`: Playwright → JPEG pipe → FFmpeg, một trang trình duyệt,
  hai luồng mã hóa; không lưu hàng nghìn khung hình vào repository.
- `fonts/`: Fredoka Latin/Latin-ext từ mẫu Kurzgesagt, kèm giấy phép SIL OFL.

## Ước lượng thời gian

Người dùng chấp nhận sai số đồng bộ nhỏ cho bản dựng đầu tiên và cho phép bỏ
forced alignment. `estimate_timing.py` dùng FFprobe và số mẫu audio giải mã,
FFmpeg silencedetect (-32 dB, khoảng lặng tối thiểu 0,30 giây), rồi chọn ranh
giới câu bằng quy hoạch động, so sánh số đơn vị chữ với thời gian có tiếng nói
và ưu tiên các khoảng nghỉ dài. Không cần tải mô hình hoặc thư viện AI.

Các timestamp chỉ là ước lượng theo câu, không khẳng định nhận dạng từng từ.
Giữ nguyên văn bản và giọng đọc, không kéo giãn hoặc cắt audio để khớp hình.

## Dựng lại trên môi trường Linux đã thiết lập

```sh
cd /workspace/animasyon-stil-katalogu
python3 projects/globalization/estimate_timing.py
node projects/globalization/render.mjs output/globalization.mp4
ffprobe -v error -count_frames -show_streams -show_format -of json output/globalization.mp4
python3 projects/globalization/verify.py
```

Ước lượng timestamp chỉ cần Python tiêu chuẩn và FFmpeg. Kiểm tra khung hình/âm thanh
dùng NumPy và Pillow đã có sẵn. Render cần Node.js, Chromium `/usr/bin/chromium`, Playwright tại
`/workspace/cloud-setup/animation` và FFmpeg có libx264/AAC. Renderer phục vụ
thư mục dự án bằng HTTP nội bộ tạm thời rồi đóng khi xong. Renderer từ chối
đè tệp đầu ra đang tồn tại; dùng tên khác nếu muốn giữ bản trước.

Thông số: 1920×1080, 30 FPS, H.264/yuv420p CRF 18, AAC 160 kb/s.
Audio có 4.552.704 mẫu ở 44.100 Hz: 103,235918 giây. Video được làm tròn lên
3.098 khung hình, tức 103,266667 giây; không cắt mất lời cuối.

## Ngôn ngữ hình ảnh và tính liên tục

Kế thừa hình học vector, bảng màu xanh tím/turquoise/vàng/hồng, bóng lưỡi liềm
và easing từ `stiller/kurzgesagt/anim.html`. Một không gian địa cầu duy nhất,
một điện thoại tồn tại xuyên suốt và các tuyến vận chuyển được giữ lại qua
các phân đoạn. Camera tiến vào cùng nút sản xuất rồi lùi ra mạng toàn cầu.
Gói tín hiệu biến đổi dần thành biểu tượng văn hóa trên cùng đường đi.
Không hard cut, không fade-to-black và không dựng các trang infographic độc lập.

Bản đồ và luồng hàng hóa là minh họa khái niệm, không phải dữ liệu địa lý hoặc
thống kê chính xác. Không gán số liệu không có nguồn cho lợi ích/rủi ro.

Đầu ra được lưu ở `output/globalization.mp4`, chỉ xuất bản trên `video-exports`,
không tạo PR và không merge main. Xem `VALIDATION.md` để biết kết quả kiểm tra.

[Video MP4](../../output/globalization.mp4) · [Khung hình kiểm tra](../../output/globalization-contact-sheet.jpg)

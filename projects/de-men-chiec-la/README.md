# Dế Mèn — Chiếc Lá Cuối Mùa

Phim ngắn nguyên bản, lấy cảm hứng từ thế giới côn trùng phiêu lưu; không chuyển thể một đoạn truyện hoặc dùng hình minh họa có sẵn. Bản đầu tiên, 60 giây, 1920×1080, 30 FPS. Không lời thoại, lời dẫn hoặc TTS.

## Thiết kế

Nghiên cứu `stiller/kagit-kesik/anim.html` (09): thớ giấy cố định, mép sáng, bóng đổ, các lớp bìa cắt và chuyển động parallax. Nhân vật, hình học, diễn biến và nhạc được viết mới. Không sửa mẫu gốc hoặc dự án trước.

| Khung hình / giây | Hành động và diễn xuất | Không gian, chuyển động | Nhạc |
|---|---|---|---|
| 0–359 / 0–12 | Thở khi ngủ, mí mắt nhắm; ngẩng đầu, giật mình, chuẩn bị vươn tay khi lá rời mái che | Rừng nhiều lớp; camera tiến gần; phiến lá nghiêng trước khi rơi | Chủ đề D–A–C–E–D trên piano tổng hợp mềm, chuông, Dm9–Bbmaj7 |
| 360–809 / 12–27 | Nắm cuống lá, chân co và đạp trong gió; đầu và râu có độ trễ | Camera theo lá; thân cây và tán giấy xoay, gập hẹp rồi trôi khỏi khung như trang sách | Pizzicato mô hình dây gảy, câu nhạc bị phân mảnh, nhịp ngắn dần |
| 810–1349 / 27–45 | Lá uốn thành lòng thuyền; nhân vật chuyển từ bám sang ngồi, mở tay và mỉm cười; lá mở thành cánh | Dòng trăng hình thành từ các dải giấy; cánh có đường viền lông cắt, đập có easing; toàn cảnh mở rộng | Bè dây tổng hợp legato, hòa âm mở và giai điệu tăng quãng |
| 1350–1799 / 45–60 | Đáp đồi, lá tách thành mảnh giấy sao; nhìn lên, một sao đậu đúng đầu râu | Đồi đón vật thể liên tục; camera tiến gần rồi giữ hình cuối; không fade-to-black | Dây và piano đạt cao trào nhẹ, nốt D chuông tại frame 1710 ngân đến cuối |

Cơ thể gồm đầu, bụng, ngực, nắp cánh, ba đôi chi, mắt và hai râu. Các chi có khớp riêng; tay dùng IK hướng tới cuống lá; mắt, đầu, râu và chân có đường diễn hoạt riêng. Silhouette lá giữ cùng tập đỉnh qua các lần biến hình. Mọi pose được tính theo thời gian tuyệt đối, không phụ thuộc tốc độ chạy trình duyệt.

## Tệp

- `anim.html`, `animation.js`: phim HTML Canvas 2D.
- `timeline.json`: 1.800 frame; các cue dùng chung cho JS và Python. Một frame = 1.600 mẫu âm thanh 48 kHz.
- `music.py`: sáng tác/tổng hợp âm thanh từ NumPy/SciPy, không tải nhạc, không dùng sample hoặc mô hình AI. Piano dùng họa âm tắt dần/độ lệch dây, pizzicato dùng Karplus–Strong, dây legato là dàn dao động lệch tần số có vibrato, chuông có họa âm phi điều hòa. Stereo reverb bằng nhiều đường trễ.
- `score.wav`: nhạc riêng, PCM 16-bit stereo 48 kHz, chính xác 60 giây.
- `soundtrack.wav`: nhạc cộng gió, giấy và điểm nhấn tổng hợp; nguồn âm thanh ghép vào MP4.
- `music-events.json`: từng nốt có frame bắt đầu, nhạc cụ và cao độ.
- `render.mjs`: Playwright/Chromium → FFmpeg H.264/AAC; từ chối ghi đè đầu ra.
- `verify.py`, `validation.json`: kiểm tra file đã mã hóa, thời lượng, số frame, WAV, đối chiếu âm thanh AAC, các cặp frame chuyển tiếp.
- `../../output/de-men-chiec-la-60s.mp4`: phim hoàn chỉnh.
- `../../output/de-men-chiec-la-contact-sheet.jpg`: ảnh lấy từ MP4.

## Tái tạo trong môi trường Linux hiện tại

```bash
python3 projects/de-men-chiec-la/music.py
node projects/de-men-chiec-la/render.mjs
python3 projects/de-men-chiec-la/verify.py
```

Phụ thuộc: Node, Playwright tại `/workspace/cloud-setup/animation`, Chromium `/usr/bin/chromium`, FFmpeg/FFprobe, Python NumPy/SciPy/Pillow. Renderer dùng một trang Chromium và hai luồng FFmpeg. Môi trường khác có thể thay đường dẫn Playwright/Chromium trong renderer.

Không có footage, sprite tĩnh, ảnh stock, nhạc thu sẵn hoặc lời nói. Chất âm là nhạc cụ tổng hợp bằng code, không phải bản thu dàn nhạc thật. Độ đồng bộ cue xác định bằng frame; thời gian ngân và attack nhạc cụ có chủ ý kéo qua cue để nối mạch cảm xúc.

## Kiểm tra nhạc trước khi ghép

177 sự kiện nốt được tổng hợp. FFmpeg EBU R128: −14,9 LUFS integrated, true peak −1,7 dBFS, LRA 2,8 LU. WAV 2.880.000 mẫu/kênh, stereo 48 kHz. Các frame 0, 360, 810, 1.350 đều có sự kiện âm nhạc, chung mốc với timeline hình.

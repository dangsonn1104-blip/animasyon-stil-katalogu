# Toàn cầu hóa — V2, diễn hoạt nhân vật và môi trường

V2 được triển khai sau khi người dùng duyệt `STORYBOARD_V2_PROPOSAL.md`.
Bản đầu tiên, audio và transcript được giữ nguyên. Không sửa `animation.js`,
`anim.html`, `render.mjs` hoặc video V1 để tạo phiên bản này.

## Các tệp V2

- `v2.html`: entry point mới, dùng lại font địa phương của dự án.
- `v2/animation.js`: Canvas 2D xác định theo thời gian, camera trong không gian
  đường phố/khu làm việc liên tục; không nối các clip tĩnh hoặc dựng 3D.
- `render-v2.mjs`: Playwright và FFmpeg, dùng lại `narration.mp3` và
  `alignment.json` ở thư mục dự án.
- `verify-v2.py`: FFprobe, kiểm tra waveform, trích khung hình câu và camera.
- `validation-v2.json`, `VALIDATION_V2.md`: kết quả kiểm tra bản xuất cuối.
- `../../output/globalization-v2.mp4`: video mới.
- `../../output/globalization-v2-contact-sheet.jpg`: các khung hình MP4 cuối.

## Thay đổi so với V1

Không còn quả địa cầu làm sân khấu chung. Một bản đồ phẳng được dùng ngắn
trong đoạn điều phối quốc tế, khoảng 28–35 giây. Các khu vực có kiểu nội thất
riêng: nhà ở ấm, bàn thiết kế/văn phòng, nhà xưởng, kho, cửa hàng có mái che,
cảng biển và khu dân cư ở đoạn kết. Ngoại cảnh có lớp trời, thành phố xa,
công trình chính và mặt đường/tiền cảnh với parallax khác nhau.

Nhân vật có khớp vai/khuỷu/cổ tay và hông/gối/cổ chân. IK đặt tay theo đồ vật;
đi bộ có pha nhấc chân và chuyển trụ; tư thế ngồi có ghế và chân gập riêng.
Đầu, mắt, tay và biểu cảm được điều khiển theo hành động. Diễn hoạt gồm nâng
điện thoại, thiết kế, đưa linh kiện vào khay, lắp ráp, kiểm tra/đóng gói, quét
hàng, chỉnh máy, lựa chọn sản phẩm, di dời máy, kiểm tra ngăn hàng trống,
giảm đơn, xem TV và chia sẻ nội dung.

Container có cáp nâng, dầm cẩu, tải hạ xuống sàn xe trống rồi xe rời cảng.
Băng chuyền có con lăn quay, công đoạn máy có bộ phận chuyển động và sản phẩm.
Các chuyến bàn giao theo hộp vàng và container giữ nhận diện xuyên khu vực.
Các địa điểm là bố trí sân khấu giải thích 2D, không phải tỷ lệ địa lý thật.

## Dựng lại

```sh
cd /workspace/animasyon-stil-katalogu
node projects/globalization/render-v2.mjs output/globalization-v2.mp4
python3 projects/globalization/verify-v2.py
```

Renderer từ chối đè tệp đã tồn tại. Dùng tên đầu ra khác khi thử một bản mới;
không xóa hoặc thay thế `output/globalization.mp4`.

Môi trường: Node, Playwright tại `/workspace/cloud-setup/animation`, Chromium
`/usr/bin/chromium`, FFmpeg/libx264/AAC, Python NumPy và Pillow để kiểm tra.
Không tải mô hình AI. Các timestamp vẫn là ước lượng theo câu đã được chấp
nhận trong bản trước; không thay đổi tốc độ hoặc nội dung thuyết minh.

Mục tiêu: 1920×1080, 30 FPS, H.264/yuv420p và AAC, 3.098 khung hình,
103,266667 giây so với audio gốc 103,235918 giây. Không thêm nhạc hoặc phụ đề
thuyết minh toàn màn hình. Chữ là nhãn bối cảnh và khái niệm ngắn.

## Bảo toàn bản đầu tiên

SHA-256 audio gốc:
`00596ae5953dc9c32bcce75016abc82bba22864624e8f1b6377fc6eba9af5090`

SHA-256 `output/globalization.mp4` (V1):
`2fa083b04019479161998836613a03705f19e5edf39d4b61aa36246ea9bcec90`

Cả hai được kiểm tra lại trước khi xuất bản. Không sửa mã nguồn 20 phong cách,
không merge main và không tạo PR.

[Video V2](../../output/globalization-v2.mp4) · [Khung hình V2](../../output/globalization-v2-contact-sheet.jpg) · [Video V1 được giữ lại](../../output/globalization.mp4)

# Toàn cầu hóa — storyboard đã duyệt

## Trạng thái

Storyboard 14 phân đoạn đã được duyệt trong cuộc hội thoại. Người dùng sau đó
cho phép bỏ forced alignment và dùng timestamp ước lượng từ tốc độ đọc, độ dài
câu và khoảng lặng thực đo. Không tiếp tục tải mô hình AI.

Xem `TIMELINE.md` và `alignment.json` để biết các mốc áp dụng trong bản dựng.
Các cụm lời đọc dưới đây giữ vai trò neo nội dung, không phải timestamp từng từ.

## Hệ thống tạo hình

Canvas vector 2D, 1920×1080, 30 FPS, H.264/AAC. Nền xanh tím #0a1030 / #1c1552;
đại dương xanh #1f86c9; điểm kết nối turquoise #4fd6ea; hàng hóa vàng #ffcb57;
rủi ro coral #ff6e78; văn hóa hồng #ff78ad. Dùng khối tròn, viền sáng và bóng
lưỡi liềm như mẫu Kurzgesagt. Không ảnh thật, không thay đổi phong cách.

Một chiếc điện thoại, một kiện hàng vàng và cùng một mạng lưới quốc gia đi xuyên
suốt câu chuyện. Tất cả tồn tại trong cùng không gian 2D có tọa độ ổn định.
Camera chuyển tâm/zoom bằng easing; không hard cut, fade-to-black hay thay trang.
Chữ chỉ dùng tên địa danh/khái niệm ngắn, font có đủ dấu tiếng Việt.

## Storyboard theo lời thuyết minh

| Đoạn | Cụm lời đọc làm mốc (timestamp xem TIMELINE.md) | Hình ảnh và chuyển động | Camera và điểm nối |
|---|---|---|---|
| 01 | “Hãy nhìn vào chiếc điện thoại bạn đang sử dụng.” | Bàn tay nâng điện thoại; ngón tay chạm màn hình. Vỏ máy có lớp sáng/tối và phản quang chuyển nhẹ. | Tiến gần màn hình. Điện thoại tiếp tục tồn tại ở đoạn 02. |
| 02 | “Nó có thể được thiết kế tại Mỹ…” đến “…Trung Quốc hoặc Việt Nam.” | Điện thoại mở thành các lớp linh kiện có đường nối. Bản thiết kế trượt về Mỹ; chip, màn hình và camera theo các cung tới Hàn Quốc, Đài Loan, Nhật Bản. Hai điểm lắp ráp Trung Quốc/Việt Nam được trình bày là phương án thay thế, không khẳng định một chuỗi cung ứng cụ thể. | Lùi ra để thấy đường nối nằm trên bản đồ cách điệu; điện thoại vẫn ở trung tâm. |
| 03 | “Một sản phẩm nhỏ bé…” đến “…biểu hiện của toàn cầu hóa.” | Các linh kiện quay lại lắp thành cùng chiếc điện thoại. Đường đi vẫn sáng, mở rộng thành mạng quốc gia. Nhãn ngắn “TOÀN CẦU HÓA” đi theo mạng. | Tiếp tục lùi, bản đồ cong dần thành địa cầu vector. |
| 04 | “Toàn cầu hóa là quá trình…” đến “…thông tin và văn hóa.” | Các đường nối lần lượt có kiện hàng, đồng vốn, chip, tín hiệu và nốt nhạc chuyển động. Mỗi loại được nhấn đúng cụm lời đọc; các loại trước vẫn còn nhưng giảm tương phản. | Quay/pan rất nhẹ quanh cùng địa cầu, không đổi nền. |
| 05 | “Hãy tưởng tượng thế giới là một mạng lưới khổng lồ.” đến “…những điểm đó.” | Camera tiến tới một điểm mạng. Các nút mở rộng để thấy cảng, doanh nghiệp và người dân. Kiện hàng vàng chuyển lên tàu, đồng vốn và ý tưởng chạy theo các tuyến khác. | Theo kiện hàng vàng dọc một cung đường tới doanh nghiệp ở đoạn 06. |
| 06 | “Nhờ toàn cầu hóa…” đến “…thị trường mới.” | Một kiện hàng rời nhà máy, chia thành các đơn hàng tới nhiều cửa hàng. Người mua chọn giữa nhiều sản phẩm; một bộ máy mới được chuyển tới doanh nghiệp, đồng vốn đi theo chiều ngược lại. | Theo kiện hàng tới cửa nhà máy; các tuyến quốc tế vẫn hiện ở hậu cảnh. |
| 07 | “Nhưng toàn cầu hóa không chỉ mang lại lợi ích.” | Xe chở kiện hàng chậm lại. Ánh sáng ấm giảm nhẹ; một tuyến chuyển sang coral. Không thay toàn bộ màu hoặc xóa vật thể. | Camera hạ thấp tới người lao động bên cạnh nhà máy đang có từ đoạn 06. |
| 08 | “Khi doanh nghiệp chuyển nhà máy…” đến “…mất việc làm.” | Máy móc được đặt lên xe và chuyển theo tuyến sẵn có đến một nhà máy khác. Công nhân dừng tay, hạ cánh tay; một vị trí làm việc trống dần. Nhà máy cũ vẫn tồn tại. | Đi theo xe một đoạn rồi lùi ra để cả nơi đi và nơi đến cùng xuất hiện. |
| 09 | “Những quốc gia phụ thuộc…” đến “…xảy ra khủng hoảng.” | Cùng kiện hàng bị chặn ở một nút cảng. Những kiện phía sau xếp hàng; đồng hồ quay, băng chuyền đầu nhận chậm rồi dừng. | Theo đường cung ứng đang bị nghẽn; các nút liên quan lần lượt giảm nhịp. |
| 10 | “Và khi một nền kinh tế lớn…” đến “…quốc gia khác.” | Một nút kinh tế lớn co nhẹ; xung coral lan dọc chính các đường nối trước đó, tác động sang các nhà máy và cửa hàng khác. Không tạo hiệu ứng domino vô cớ ngoài mạng. | Lùi ra để thấy sự lan truyền và giữ rõ nơi bắt đầu. |
| 11 | “Toàn cầu hóa còn làm thay đổi văn hóa…” đến “…thời gian ngắn.” | Một màn hình tại nút mạng bật phát nhạc/phim. Nốt nhạc và cuộn phim trượt theo cùng đường truyền; người ở các nút khác đeo tai nghe và chuyển động theo nhịp. Các xung rủi ro lắng xuống nhưng mạng không biến mất. | Theo một nốt nhạc vòng quanh địa cầu rồi trở về chiếc điện thoại ban đầu. |
| 12 | “Vậy toàn cầu hóa là tốt hay xấu?” đến “Câu trả lời không đơn giản.” | Màn hình điện thoại phản chiếu hai dòng đang tồn tại: vàng/turquoise của cơ hội và coral của rủi ro. Điện thoại xoay nhẹ để cả hai cùng nằm trong khung hình. | Giữ nhịp chậm, không hiện bảng so sánh rời rạc hay biểu tượng tốt/xấu tuyệt đối. |
| 13 | “Nó tạo ra cơ hội…” đến “…sự phụ thuộc.” | Các dòng từ màn hình kéo thành hai nhánh nối tới cùng các nhân vật: hàng hóa/công nghệ đến một nhóm; nút thắt và nơi làm việc trống hiện ở nhóm khác. Kích thước luồng và số người nhận thể hiện phân phối không đều, không đặt số liệu giả. | Camera theo các nhánh ra khỏi điện thoại, kết nối trở lại mạng toàn cầu. |
| 14 | “Điều quan trọng không chỉ là…” đến hết. | Mạng vẫn chuyển động, nhưng một số điểm nhận nhiều luồng lợi ích và một số chịu nhiều xung rủi ro. Camera cho thấy đồng thời cả hai. Chiếc điện thoại trở về tay người mở đầu, địa cầu phía sau vẫn hoạt động. | Lùi nhẹ và giữ khung kết đến hết audio; không ngụ ý lợi ích đã tự động được phân chia công bằng. |

## Âm thanh, đồng bộ và đầu ra dự kiến

Giữ nguyên nội dung và tốc độ MP3 gốc; không tạo lại giọng, không thêm nhạc hoặc
phụ đề toàn màn hình. AAC sẽ được mã hóa từ bản thu gốc trong MP4.
Video không ngắn hơn toàn bộ audio. Với thời lượng hiện đo, dự kiến cần ít nhất
3098 khung hình ở 30 FPS (103.266667 giây); chốt theo số mẫu audio sau giải mã,
không cắt lời để vừa số khung hình.

Quy trình sản xuất: tạo dữ liệu timestamp ước lượng theo yêu cầu mới, lập trình một timeline
Canvas toàn cục, render thử điểm nối, kiểm tra khung hình và audio, render đầy đủ,
ffprobe/giải mã toàn bộ, rồi commit các tệp cần thiết lên `video-exports`.
Không sửa 20 phong cách gốc, không merge main, không tạo PR.

# Toàn cầu hóa — thiết kế nâng cấp hoạt họa V2 để duyệt

Trạng thái: thiết kế đã được người dùng duyệt trong cuộc hội thoại; đang triển khai V2 tách biệt.
Audio và transcript giữ nguyên. Dùng lại timestamp ước lượng trong `alignment.json`.
Các khoảng dưới đây gồm cả thời gian nghỉ và nối hình giữa các câu; mốc nội dung
vẫn neo theo timestamp câu gốc, không thay tốc độ giọng đọc.

## Định hướng thay đổi

Chuyển trọng tâm sang con người, sản phẩm và các môi trường có hoạt động.
Bản đồ phẳng chỉ là một chặng giải thích mạng quốc tế khoảng 6–8 giây, chủ yếu
28,45–35,00 giây; không giữ địa cầu làm nền ở các đoạn nhà máy, mua sắm hoặc văn hóa.
Các quốc gia được gọi tên ở phần đầu bằng nhãn trên bàn thiết kế/khay linh kiện,
không cần mở thêm một bản đồ hoặc sáu bối cảnh độc lập trong tám giây.

Chuỗi vật thể dẫn chuyện: điện thoại → khay linh kiện → hộp hàng vàng có dấu
nhận diện hình thoi → container xanh → xe tải → cùng hộp hàng tới cửa hàng →
điện thoại trong gia đình. Sau đó những địa điểm đã đi qua được quay lại để
thấy hệ quả, thay vì giới thiệu một bộ biểu tượng mới.

Ba nhân vật dễ nhận diện: A — người dùng áo vàng ở nhà/cửa hàng; B — công nhân
áo teal, cũng là thành viên gia đình ở đoạn văn hóa; C — kỹ thuật viên áo coral
ở văn phòng/xưởng. Nhân vật phụ chỉ xuất hiện khi thao tác cần người thứ hai.
Không đưa các nhân vật từ những quốc gia khác nhau vào cùng một địa điểm chỉ
để kết thúc câu chuyện; mỗi nơi có cửa sổ, kiến trúc và nhãn riêng khi cần.

Bảng màu và tạo khối Kurzgesagt giữ nguyên: xanh tím nền, teal cho máy móc,
vàng cho sản phẩm, coral cho tình trạng gián đoạn. Giữ bóng khối lệch sáng,
viền sáng mỏng, nét nhân vật đồng nhất. Không chuyển thành 3D hay ảnh thật.

## So sánh bản cũ và bản mới

| Phần | Bản cũ | Bản V2 | Mức thay đổi |
|---|---|---|---|
| Điện thoại / chuỗi sản xuất, 0–19,17s | Điện thoại, linh kiện và địa cầu; nhân vật chỉ là bàn tay. | Mở ở bàn sinh hoạt, theo thiết bị sang bàn thiết kế và dây chuyền lắp ráp; người thật sự thao tác với sản phẩm. | Mạnh |
| Định nghĩa, 19,17–28,45s | Các loại biểu tượng chạy trên đường nối. | Một lô hàng tạo ra giao dịch, thanh toán và cập nhật máy; thông tin dẫn tới thao tác cụ thể. | Rất mạnh |
| Mạng quốc tế, 28,45–39,82s | Địa cầu trung tâm và nhiều đường cong tương tự nhau. | Bản đồ ngắn để xác lập các điểm quốc gia; camera bám container rời sơ đồ vào cảng và lên xe tải. | Mạnh |
| Lợi ích, 39,82–51,92s | Nhà máy/cửa hàng nhỏ trên cùng địa cầu. | Cận thao tác đóng gói, quét hàng, nhận hàng, chọn sản phẩm và dùng máy mới. | Rất mạnh |
| Mất việc, 51,92–60,69s | Xe chở chip; công nhân đổi biểu cảm nhỏ. | Công nhân tự ngắt máy, tháo dụng cụ; thiết bị được di dời, chỗ làm trống và nhân vật không còn nhiệm vụ. | Rất mạnh |
| Phụ thuộc / lan truyền khủng hoảng, 60,69–73,94s | Dấu X và xung coral chạy giữa các nút. | Container bị giữ, kho không nhận linh kiện, một công đoạn dừng; đơn hàng và việc làm ở các nơi liên quan giảm theo. | Rất mạnh |
| Văn hóa, 73,94–83,76s | Nốt nhạc và phim trên mạng. | Gia đình mở điện thoại, truyền sang TV; người xem phản ứng, chia sẻ tới người khác trong môi trường sinh hoạt. | Rất mạnh |
| Đánh giá / kết luận, 83,76–103,27s | Điện thoại trước địa cầu và hai nhóm người nhỏ. | Quay lại người dùng, cửa hàng và người lao động đã quen thuộc; cùng thấy cơ hội và gánh nặng trong hành động đời sống. | Rất mạnh |

## Storyboard chuyển động chi tiết

### 01 — 0,00–2,44s: Một đồ vật trong đời sống

**Lời:** “Hãy nhìn vào chiếc điện thoại bạn đang sử dụng.” (0,00–1,97s).

- **Bố cục / hành động chính:** Cận vừa bàn sinh hoạt. A đang ngồi, đưa tay lấy điện thoại, xoay cổ tay và chạm màn hình; ánh mắt đi theo thiết bị.
- **Hoạt ảnh phụ:** Khuỷu tay mở trước khi nâng; ngón tay co sau chạm; vai và đầu theo sau, không chỉ dịch cả nhân vật. Ánh màn hình phản lên má.
- **Camera:** Dolly 2D ngắn từ bàn lên thiết bị; cốc ở tiền cảnh trượt nhanh hơn tường/cửa sổ ở hậu cảnh.
- **Nối:** Camera đi sát màn hình; lưới trên màn hình mở rộng thành tờ bản vẽ dưới tay C. Viền điện thoại và khung bản vẽ khớp vị trí khi biến đổi, không che toàn màn hình rồi đổi cảnh.

### 02 — 2,44–10,87s: Thiết kế, linh kiện, lắp ráp

**Lời:** Câu về Mỹ, Hàn Quốc, Đài Loan, Nhật Bản, Trung Quốc hoặc Việt Nam (2,44–10,21s).

- **Bố cục / hành động chính:** Bàn thiết kế dài và dãy trạm sản xuất nối nhau trong một khung ngang. C kéo nét thiết kế tại nhãn “Mỹ”. Camera chuyển sang khay linh kiện: chip, màn hình và camera đi vào các khớp tương ứng; tay thợ lắp ráp hạ vỏ máy và gài chốt.
- **Hoạt ảnh phụ:** Bút bám tay; ba linh kiện có độ trễ khác nhau, xoay đúng phương rồi dừng trong khay. Kẹp máy mở, tay nhả linh kiện và rút về. Nhãn địa danh xuất hiện khi loại linh kiện được nhắc.
- **Camera:** Một đường tracking dọc bàn, ba điểm nhìn chính: thiết kế → khay linh kiện → khâu lắp ráp. Không cố dựng sáu cảnh đầy đủ trong tám giây.
- **Nối:** Khay linh kiện trượt thành khay điện thoại hoàn thiện; camera theo chính khay đó tới trạm kiểm tra.
- **Ràng buộc nội dung:** “Trung Quốc hoặc Việt Nam” là hai khả năng minh họa, không vẽ như sản phẩm bắt buộc đi qua cả hai nước; không gán nhà cung cấp hoặc nhãn hiệu có thật.

### 03 — 10,87–19,17s: Nhiều nơi cùng tạo ra một sản phẩm

**Lời:** “Một sản phẩm nhỏ bé…” và “Đó chính là một biểu hiện của toàn cầu hóa.” (10,87–17,93s).

- **Bố cục / hành động chính:** Cận trạm kiểm tra trong nhà máy. B cầm điện thoại, bật kiểm tra, xoay nhìn hai mặt rồi đặt vào hộp vàng; nắp gập xuống và hộp được đẩy lên băng chuyền.
- **Hoạt ảnh phụ:** Ngón tay giữ đúng cạnh máy, phản quang đổi theo góc quay; miếng chèn lún nhẹ khi đặt điện thoại; con dấu hình thoi đóng lên hộp; con lăn băng chuyền quay.
- **Camera:** Từ cận tay kéo ra vừa đủ thấy các công đoạn đã đóng góp phía sau; theo hộp về cửa xuất hàng. Chữ ngắn “Toàn cầu hóa” gắn vào biển phía trên cửa.
- **Nối:** Hộp đi qua cùng cửa sang kho, không biến thành một chấm trên địa cầu.

### 04 — 19,17–28,45s: Kết nối tạo ra giao dịch và chuyển giao

**Lời:** Định nghĩa thương mại, đầu tư, công nghệ, thông tin, văn hóa (19,17–27,67s).

- **Bố cục / hành động chính:** Kho nối với văn phòng và ô máy qua cửa kính. B chuyển hộp lên xe đẩy; nhân viên quét đơn, giao dịch xác nhận; C nhận bản hướng dẫn trên màn hình và dùng thông tin đó chỉnh máy mới để xử lý lô tiếp theo.
- **Hoạt ảnh phụ:** Tay giữ hộp khi xe đẩy khởi động; người nhận đưa máy quét lại gần mã; tay kỹ thuật viên xoay núm và nhấn chạy, máy đáp lại bằng một chu kỳ gắp. Khi nhắc văn hóa, người chờ ở khu nghỉ tiếp nhận một nội dung trên điện thoại — chỉ gieo chi tiết cho phần văn hóa về sau.
- **Camera:** Trượt ngang theo hộp qua cửa kho, dừng ở trao đổi giữa hai người rồi kéo cao nhìn hành lang kết nối ba khu.
- **Nối:** Các tuyến đi lại thực tế trong kho thu nhỏ thành tuyến trên một bảng bản đồ logistics đặt trong văn phòng. Chính hộp/container vừa theo dõi trở thành vật đang được định vị trên bảng.
- **Ưu tiên nhịp:** Giao dịch và sử dụng hướng dẫn là hai hành động rõ nhất; các khái niệm còn lại được gắn vào chúng, không chạy năm tiểu cảnh cạnh tranh cùng lúc.

### 05 — 28,45–35,00s: Chỉ lúc này mới mở bản đồ quốc tế

**Lời:** “Hãy tưởng tượng…”; “Mỗi quốc gia…”; đầu câu “Hàng hóa, tiền bạc…” (28,45–39,04s).

- **Bố cục / hành động chính:** Góc từ trên xuống bảng logistics, bản đồ phẳng chiếm khung. Container xanh mang lô hộp vàng rời điểm xuất phát; nhân viên điều phối kéo tuyến tới cảng nhận. Hai tuyến khác cho thanh toán và hành trình con người được kích hoạt theo lời đọc.
- **Hoạt ảnh phụ:** Đầu tuyến tiến tới đích thay vì lóe sáng sẵn; người điều phối đặt chốt và kéo tay về; một chuyến đi có điểm xuất phát/đích rõ, không phủ hàng chục đường lên toàn hình.
- **Camera:** Bám container trên tuyến, tiến dần tới biểu tượng cảng ở cuối tuyến.
- **Nối:** Cạnh container giữ hình dạng và màu; ký hiệu cảng mở thành cầu cảng được vẽ đủ cấu trúc quanh nó. Container vẫn ở cùng vị trí trên màn hình trong lúc tỷ lệ thay đổi. Tới khoảng 35s, bản đồ ra khỏi khung, không còn làm nền.

### 06 — 35,00–39,82s: Một mạng lưới hoạt động ngoài đời

**Lời:** Phần còn lại của “Hàng hóa, tiền bạc, con người và ý tưởng…” (33,62–39,04s).

- **Bố cục / hành động chính:** Toàn cảnh cảng biển. Tàu cập bến giảm tốc; cẩu lấy đúng container xanh và hạ xuống xe tải chờ sẵn; nhân viên bến nhận xác nhận giao hàng trên máy cầm tay.
- **Hoạt ảnh phụ:** Thân tàu còn trôi nhẹ sau khi dừng; cáp căng trước khi container rời boong; tải đung đưa ít rồi ổn định, giảm tốc trước khi đặt lên xe; người điều phối giơ tay, tài xế đáp lại.
- **Camera:** Theo container từ boong xuống xe, rồi tracking ngang theo xe rời cảng; mặt nước, cột bến và kho xa có parallax khác nhau.
- **Nối:** Xe chạy theo đường liên tục qua cổng tới khu sản xuất; biển cổng và nhà kho xuất hiện dần trong không gian, không dùng xe hoặc container che kín để giấu một hard cut.

### 07 — 39,82–44,21s: Doanh nghiệp bán hàng ra thế giới

**Lời:** “Nhờ toàn cầu hóa, một doanh nghiệp có thể bán sản phẩm ra khắp thế giới.” (39,82–43,62s).

- **Bố cục / hành động chính:** Xe dừng tại xưởng/kho nhận. Cửa container mở, B nhận một khay hàng; trong cùng khu xuất hàng, đồng nghiệp đóng các đơn có nhãn đích khác nhau rồi phân lên hai xe giao nhận.
- **Hoạt ảnh phụ:** Chân bước đổi trụ khi bê khay; tay đặt hàng rồi mới nhả; máy dán băng chạy trên nắp hộp, con lăn đẩy hộp sang nhánh phân loại phù hợp.
- **Camera:** Theo một hộp vàng qua điểm quét và lên xe giao cửa hàng. Không bắt người xem theo cả hai xe.
- **Nối:** Camera theo hộp/xe được chọn đến mặt tiền cửa hàng ở đoạn 08; các đơn khác tiếp tục ở hậu cảnh để diễn tả mở rộng thị trường.

### 08 — 44,21–51,92s: Lựa chọn và tiếp cận nguồn lực

**Lời:** “Người tiêu dùng có thêm lựa chọn…” đến “…thị trường mới.” (44,21–50,83s).

- **Bố cục / hành động chính:** Cửa hàng có chiều sâu 2D. Chủ cửa hàng nhận hộp, đặt hai mẫu sản phẩm lên kệ; A cầm thử, so sánh rồi đưa một mẫu tới quầy. Qua lối nhìn bên cạnh, C hướng dẫn người vận hành dùng máy mới tại doanh nghiệp nhận đầu tư.
- **Hoạt ảnh phụ:** A chuyển mắt giữa hai mẫu trước khi với tay; khuỷu tay hạ theo trọng lượng đồ; nhân viên nhận thanh toán, trả hàng; ở xưởng bên cạnh, người học lặp lại thao tác C vừa chỉ và máy thực sự chạy được.
- **Camera:** Từ toàn vừa quầy nhận hàng tiến gần lựa chọn của A, rồi trượt theo gói hàng ngang cửa sổ nhìn sang xưởng. Giao dịch là tiêu điểm trước, vận hành máy là tiêu điểm sau.
- **Nối:** Ở cuối đoạn, camera theo một đơn hàng gửi trở lại doanh nghiệp và tiến gần B ở dây chuyền quen thuộc. B nhận thông báo thay đổi, đưa vào nhịp chậm của đoạn 09.

### 09 — 51,92–60,69s: Công việc không đi cùng máy móc

**Lời:** “Nhưng…” (51,92–54,01s); “Khi doanh nghiệp chuyển nhà máy…” (54,64–59,90s).

- **Bố cục / hành động chính:** Cận vừa B bên máy. B đọc thông báo di dời, kết thúc sản phẩm đang làm, tắt máy và tháo dụng cụ. Tổ vận chuyển đẩy máy lên sàn nâng; xe mang máy rời đi, để lại vị trí làm việc trống. B cầm hộp đồ cá nhân, dừng lại trước chỗ làm cũ.
- **Hoạt ảnh phụ:** Băng chuyền giảm tốc trước khi dừng; tay B còn giữ thói quen với tới sản phẩm rồi hạ xuống; vai rũ và mắt nhìn khoảng trống. Sàn nâng đi lên trước khi xe khởi động; không để máy tự bay hoặc biến mất.
- **Camera:** Giữ B và máy đủ lớn để đọc được tương tác; đi theo máy một đoạn rồi chậm lại, để B ở lại trong khung trong khi xe rời xa.
- **Nối:** Camera chọn theo xe ra đường hậu cần; tuyến đường dẫn về cảng/kho cũ, nơi một lô linh kiện khác đang chờ.

### 10 — 60,69–66,97s: Thiếu một mắt xích, công đoạn phải chờ

**Lời:** “Những quốc gia phụ thuộc…” (60,69–66,15s).

- **Bố cục / hành động chính:** Container linh kiện bị giữ ở cửa cảng; xe tới kho nhưng không nhận được hàng. Camera theo một khay trống được đẩy về xưởng: người lắp ráp tìm linh kiện, kiểm tra ngăn dự phòng rồi dừng vì thiếu đúng bộ phận đó.
- **Hoạt ảnh phụ:** Hàng xe dừng lần lượt, không dừng cùng một khung hình; người kho kiểm kê rồi lắc đầu; bàn tay người lắp ráp dừng giữa thao tác và đặt sản phẩm chưa hoàn thiện xuống; chỉ công đoạn phụ thuộc bị dừng, không làm mọi nhà máy trên thế giới cùng tắt.
- **Camera:** Theo hành trình cảng → kho → bàn lắp ráp qua các cửa và đường đi đã thiết lập; dùng khay trống như điểm bám, không thay bằng dấu X trên bản đồ.
- **Nối:** Từ sản phẩm dang dở trên bàn, camera theo người quản lý bước vào văn phòng xử lý đơn hàng.

### 11 — 66,97–73,94s: Tác động lan truyền qua quyết định thực

**Lời:** “Và khi một nền kinh tế lớn…” (66,97–72,35s).

- **Bố cục / hành động chính:** Văn phòng của bên đặt hàng giảm một đơn lớn. Bên cung ứng nhận thông báo, rút bớt phiếu việc khỏi bảng; một bàn sản xuất chậm lại. Người giao hàng chờ lâu hơn, cửa hàng nhận ít hộp hơn và nhân viên phải thu hẹp chỗ trưng bày.
- **Hoạt ảnh phụ:** Tay nhân viên phân loại phiếu, công nhân hoàn tất nốt sản phẩm rồi chờ; xe bốc ít hàng thay vì biến mất; chủ cửa hàng dịch kệ và kéo bớt nhãn trưng bày.
- **Camera:** Theo thông báo từ màn hình ở văn phòng tới phiếu việc ở nhà máy; tracking xe tới cửa hàng. Giữ cùng hộp vàng và kiến trúc đã biết để chứng minh quan hệ nhân quả.
- **Nối:** Theo người giao hàng ra khu dân cư; một người nhận mở cửa, camera đi cùng vào không gian gia đình. Không cần quay về địa cầu để minh họa khủng hoảng.

### 12 — 73,94–83,76s: Văn hóa đi vào sinh hoạt

**Lời:** Hai câu về văn hóa, âm nhạc, phim ảnh và xu hướng (73,94–82,73s).

- **Bố cục / hành động chính:** B về nhà, ngồi bên người thân. Một thành viên mở nội dung trên điện thoại rồi chuyển sang TV; người xem nghiêng người theo động tác trong video, cười và học lại một động tác tay. Họ gửi nội dung cho A, người đang nghỉ ở căn hộ lân cận; A xem và thử theo.
- **Hoạt ảnh phụ:** Ngón tay chạm/chia sẻ, người nhận nhìn thông báo rồi mới nâng máy; TV có nhân vật vector chuyển động thực sự, không là ảnh tĩnh. Tư thế ngồi, đầu và tay có follow-through; điện thoại và TV giữ chung màu/chi tiết nhận diện nội dung.
- **Camera:** Đi qua hành lang/cửa sổ trong mô hình khu dân cư 2D; từ căn phòng B theo nội dung trên thiết bị sang người nhận. Có thể dùng một nhịp visual match màn hình nhỏ → TV, không thay toàn hình đột ngột.
- **Nối:** Dừng lại ở A đang cầm đúng chiếc điện thoại mở đầu; từ phản ứng vui, A hạ máy và nhìn ra khu phố phía ngoài.
- **Âm thanh:** Chỉ có thuyết minh gốc; nhân vật có thể xem nội dung âm nhạc mà không thêm một bản nhạc mới vào soundtrack.

### 13 — 83,76–95,16s: Hai trải nghiệm cùng tồn tại

**Lời:** “Tốt hay xấu?”, “Câu trả lời không đơn giản.” và câu về cơ hội/thách thức (83,76–94,29s).

- **Bố cục / hành động chính:** A đặt điện thoại xuống bàn cạnh hộp sản phẩm mới, nhìn ra phố. Camera mở qua cửa sổ để thấy chủ cửa hàng xử lý thêm đơn trong khi B ở nhà sắp đồ tìm việc và một doanh nghiệp vẫn chờ linh kiện. Nhấn từng tình huống theo lời đọc, không dựng ba khung infographic cạnh nhau.
- **Hoạt ảnh phụ:** Chủ cửa hàng gập hộp, người nhận nhận hàng; B kiểm tra một cơ hội việc làm rồi đặt giấy xuống, chỉnh lại dụng cụ; người ở xưởng kiểm tra ngăn linh kiện trống. Biểu cảm và nhịp thao tác thay đổi có lý do.
- **Camera:** Chuyển tiêu điểm bằng tracking chậm qua các không gian nối nhau của khu phố, giữ mối quan hệ vị trí. Mỗi lần chỉ một tương tác ở mức tương phản cao.
- **Nối:** Camera tiếp tục lùi, đưa những người và địa điểm vừa quan sát vào cùng một toàn cảnh để chuẩn bị câu hỏi phân phối.
- **Ràng buộc ý nghĩa:** Không dùng dấu tích/X để chấm “tốt/xấu”, không thể hiện tỷ lệ hay thu nhập giả; không khẳng định mọi công nhân mất việc đều có cùng hoàn cảnh.

### 14 — 95,16–103,27s: Kết thúc bằng con người và sự phân chia

**Lời:** “Điều quan trọng không chỉ là…” đến hết (95,16–103,24s).

- **Bố cục / hành động chính:** Một toàn cảnh khu phố có cửa hàng, khu sinh hoạt và cơ sở sản xuất đã đi qua. Các đơn hàng vẫn tới quầy mua sắm; một công nhân vẫn chờ việc, một bộ phận sản xuất vẫn chờ hàng. A cầm điện thoại trong tiền cảnh, nay thấy được bối cảnh rộng hơn phía ngoài.
- **Hoạt ảnh phụ:** Nhịp đóng gói/nhận hàng tiếp tục ở nơi có đơn, nhịp chờ ở nơi bị ảnh hưởng vẫn được giữ; các nhân vật có hành động nhỏ cụ thể thay vì chỉ đứng dưới luồng sáng. Hộp vàng ở bàn A khép lại chuỗi vật thể đã theo dõi.
- **Camera:** Lùi nhẹ trong phần đầu câu, rồi giữ đủ lâu để đọc được các trải nghiệm khác nhau; lớp cửa sổ tiền cảnh, khu phố giữa và mái xưởng xa có parallax nhẹ. Không mở lại bản đồ hoặc địa cầu.
- **Kết:** Có thể đặt hai câu hỏi ngắn “Ai hưởng lợi?” / “Ai chịu rủi ro?” gắn với toàn cảnh, không thành end card riêng. Giữ hoạt động tới hết audio; không tự dựng một giải pháp công bằng khi lời đọc chưa nói tới.

## Kỷ luật diễn hoạt và tiêu chí duyệt bản sau

1. Chân có pha đặt chân/chuyển trụ/nhấc chân; tránh kéo nhân vật trượt trên sàn.
2. Khi cầm đồ, bàn tay bám điểm cầm; khi nhả, tay rút ra sau khi vật được đỡ.
3. Công việc là chu kỳ có điều kiện: máy chỉ nhận vật khi băng chuyền đưa tới;
   máy dừng thì sản phẩm và phản ứng người vận hành phải thay đổi theo.
4. Cẩu/xe nâng có tăng giảm tốc, giữ tải và đặt xuống; không để container
   xuyên người, xuyên sàn, tự trượt khỏi phương tiện hoặc lơ lửng không có cáp.
5. Mỗi đoạn chỉ có một hành động chính và tối đa hai chuyển động hỗ trợ rõ;
   những hoạt động ở hậu cảnh giảm tương phản và không tạo thêm tiêu điểm.
6. Chuyển tiếp cần có vật thể/người/đường đi tiếp nối, được bố trí đủ thời gian;
   không dùng chuyển động camera hoặc vật che toàn khung để thay cảnh tĩnh.
7. Trong khoảng 6–8 giây bản đồ, phải thấy nó giúp giải thích quan hệ quốc tế;
   ở các đoạn còn lại, nhà máy/cảng/cửa hàng/gia đình chiếm diện tích chính.
8. Những mốc 2–4 giây không nhồi nhiều màn trình diễn; ưu tiên động tác đọc
   được, dùng thời gian nghỉ câu cho anticipation và chuyển tiêu điểm.

## Bảo toàn bản cũ và bước tiếp theo sau duyệt

Chưa thay `anim.html`, `animation.js`, `render.mjs`, `alignment.json`, audio hoặc
video hiện có ở giai đoạn đề xuất này. Chỉ thêm tài liệu thiết kế V2 riêng.

Sau khi được duyệt, triển khai nguồn V2 tách biệt để đối chiếu với V1; đầu ra
mới dự kiến `output/globalization-v2.mp4`. Giữ `output/globalization.mp4` nguyên
vẹn. Thời lượng vẫn 3.098 khung hình / 30 FPS = 103,266667 giây, sử dụng bản thu
gốc dài 103,235918 giây. Không thêm nhạc, không thay transcript.

Trước render cuối, kiểm tra các pose hành động và đoạn nối ở tỷ lệ thấp; sau đó
render 1080p, xem khung hình/video chuyển động, kiểm tra FFprobe và audio. Chỉ
xuất bản khi đã kiểm tra; không tạo PR hoặc merge main.

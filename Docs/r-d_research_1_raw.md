agora 
SDK :agora
tính năng 
*Video call : https://www.youtube.com/watch?v=HX6AM_1-jNM
*livestream :https://www.youtube.com/watch?v=QvNzL_FmzLQ&list=PLOlBH_Cmfhb_IDLIXsRfdsuHtdKPCfYaD&index=10
*voice chat :https://www.youtube.com/watch?v=j7jSdLLNodQ&list=PLTwZJUo8myH7P8LwQa6rzbB81I-TbWPMX
*chat  : https://youtube.com/watch?v=2_mgyBD8dKc
3.x Web SDK ? https://docs-legacy.agora.io/en/video-legacy/downloads?platform=Web
Mục đích dùng agora:
- Video call với các user
- Live stream
- Voice chat 
- Chat text

agora ?
agora làm những gì, nó hoạt động ra sao?
### Agora Video Call:
Agora Video Call cho phép các cuộc gọi một-một hoặc một-nhiều dễ dàng và thuận tiện, đồng thời hỗ trợ các chế độ chỉ thoại và video với Agora RTC SDK.
+ Function: Audio mixing - Gửi âm thanh local và trực tuyến kèm theo giọng nói của người dùng tới những người dùng khác trong kênh; Screen sharing - Cho phép người dùng local chia sẻ màn hình với những người dùng khác trong kênh. Hỗ trợ chỉ định màn hình hoặc cửa sổ nào sẽ chia sẻ và hỗ trợ chỉ định vùng chia sẻ; Basic image enhancement - Đặt các hiệu ứng làm đẹp cơ bản, bao gồm làm mịn da, làm trắng và đánh má hồng; Modify the ră data - Cho phép các nhà phát triển lấy và sửa đổi dữ liệu giọng nói hoặc video thô và tạo các hiệu ứng đặc biệt, chẳng hạn như thay đổi giọng nói; Customize the video source and render - Cho phép tùy chỉnh nguồn video và trình kết xuất. Điều này cho phép người dùng sử dụng camera và video tự tạo từ việc chia sẻ màn hình hoặc tập tin để xử lý video, chẳng hạn như để nâng cao và lọc hình ảnh.

| Property   |      Agora Video Call specifications      |
|----------|:-------------:|
| SDK package size |  4.61 MB to 13.94 MB |
| Capacity |    17 users   |
| Video profile| SDK video source: Up to 1080p @ 60 fps |
| | Custom video source: Up to 4K | 
|Audio profile	|Sample rate: 16 kHz to 48 kHz|
||Support for mono and stereo sound|
|Audio anti-packet-loss rate	|80% (uplink and downlink)|

Khả năng tương thích
Android >= 4.1
IOS >= 9.0
Window >= 7
Web

The Agora Web SDK is a JavaScript library loaded by an HTML web page. sử dụng API trong trình duyệt web để thiết lập kết nối và kiểm soát các dịch vụ truyền thông và phát trực tiếp tương tác.

/*Note*/ Để kích hoạt khả năng tương tác giữa Agora Native SDK và Agora Web SDK, hãy sử dụng Agora Native SDK v1.12 trở lên.

Các vấn đề và hạn chế
Chrome deprecates and removes the Plan B dialect

|Web SDK version|Impact|
|:--|:---:|
|v2.5.0-2.9.0|After a stream is published, the method call of switchDevice causes video freezes or no sound issues.|
|v3.0.0-3.6.1|Sau khi luồng được xuất bản, lệnh gọi phương thức của switchDevice sẽ khiến video bị treo hoặc gặp vấn đề không có âm thanh.|
|v4.0.0-4.0.1|	Các phương thức xuất bản và đăng ký không có hiệu lực.|

Hạn chế
 - Do những thay đổi về chính sách tự động phát của trình duyệt web, các phương thức Stream.play, Stream.startAudioMixing và Stream.getAudioLevel cần được kích hoạt bằng cử chỉ của người dùng trên Chrome 70 trở lên và trên Safari.
 - Agora Web SDK hỗ trợ cấu hình video có độ phân giải lên tới 1080p nếu khách hàng đã cài đặt camera HD thực sự. Tuy nhiên, độ phân giải tối đa bị giới hạn bởi khả năng của thiết bị camera.
 - Trên một số thiết bị iOS, khi bạn chuyển trình duyệt Safari sang chạy nền và quay lại trong khi gọi, các thanh màu đen có thể xuất hiện xung quanh video của bạn.
 - Agora Web SDK không hỗ trợ mã hóa mã.

Chi phí cho giao tiếp thời gian thực
khi sử dụng Voice Call, Video Call, and Interactive Live Streaming Premium.
Thanh toán xảy ra hàng tháng. Vào cuối mỗi tháng, Agora tính toán tổng thời lượng sử dụng âm thanh và video (tính bằng phút) trong tháng đó trong tất cả các dự án trong tài khoản Agora của bạn. Lưu ý rằng việc sử dụng video được chia thành bốn loại khác nhau dựa trên độ phân giải tổng hợp và được định giá riêng. Sau khi trừ đi 10.000 phút miễn phí hàng tháng mà Agora cấp cho mỗi tài khoản, Agora nhân mức sử dụng còn lại với đơn giá tương ứng và cộng chi phí để có được tổng chi phí cho tháng đó.

Monthly cost = audio minutes × audio unit price + video minutes of each type × video unit price of each type

Trong mỗi cuộc gọi video hoặc sự kiện phát trực tiếp, người dùng liên lạc với nhau trên kênh RTC. Agora đo lường mức sử dụng của mỗi người dùng từ thời điểm họ tham gia kênh cho đến thời điểm họ rời khỏi kênh đó. Nếu người dùng đăng ký video từ những người dùng khác trong kênh thì mức sử dụng được tính là mức sử dụng video (thuộc loại áp dụng); nếu không, mức sử dụng sẽ được tính là mức sử dụng âm thanh. Agora tính toán mức sử dụng chỉ dựa trên số lượt đăng ký của người dùng trên các kênh mà họ tham gia. Cho dù họ xuất bản các luồng không quan trọng.

Mức sử dụng âm thanh là tốc độ mặc định mà người dùng phải trả khi tham gia một kênh. Bất kỳ thời gian nào người dùng dành cho một kênh mà họ không đăng ký video đều được tính là mức sử dụng âm thanh, bất kể họ có thực sự đăng ký âm thanh từ người dùng khác hay không. Lưu ý rằng trong các kênh chỉ có một người dùng, mức sử dụng này được tính là mức sử dụng âm thanh vì người dùng không đăng ký bất kỳ video nào.

Mức sử dụng video là lượng thời gian mà người dùng trong kênh đăng ký video (thuộc bất kỳ loại nào) từ những người dùng khác. Khi người dùng đăng ký cả âm thanh và video cùng lúc, Agora chỉ tính đây là mức sử dụng video. Agora tính toán mức sử dụng video cho từng người dùng dựa trên độ phân giải tổng hợp. Độ phân giải tổng hợp là tổng độ phân giải của tất cả các luồng video mà người dùng đăng ký cùng lúc, tức là tổng số pixel trong luồng video mà người dùng nhận được. Tính toán này áp dụng khi người dùng đăng ký một luồng video hoặc nhiều luồng video. Dựa trên độ phân giải tổng hợp của tất cả các luồng video nhận được, Agora chia video thành các loại sau và tính toán thời lượng sử dụng của từng loại riêng biệt:

|Video type	|Aggregate resolution (px)|
|:-----|:----:|
|High-definition (HD)	|Less than or equal to 921,600 (1280 × 720)|
|Full High-definition (Full HD)	|From greater than 921,600 (1280 × 720) to 2,073,600 (1920 × 1080)|
|2K	|From greater than 2,073,600 (1920 × 1080) to 3,686,400 (2560 × 1440)|
|2K+	|From greater than 3,686,400 (2560 × 1440) to 8,847,360 (4096 × 2160)|

Ví dụ: nếu người dùng đăng ký hai luồng video 960 × 720 cùng lúc thì độ phân giải tổng hợp là (960 × 720) + (960 × 720) = 1.382.400. Vì 1.382.400 lớn hơn 921.600 nhưng nhỏ hơn 2.073.600 nên Agora tính mức sử dụng video này là loại Full HD và tính phí theo đơn giá Full HD.
Đơn giá

|Usage type	|Pricing (US$/1,000 minutes)|
|:----|:----:|
|Audio	|0.99|
|Video HD	|3.99|
|Video Full HD	|8.99|
|Video 2K	|15.99|
|Video 2K+	|35.99|

Giảm giá theo số lượng sử dụng
Agora tự động cung cấp các mức giảm giá theo bậc sau cho tổng mức sử dụng hàng tháng vượt quá 100.000 phút:

|Minutes used	|Discount level|
|:----|:----:|
|100,000 to 499,999	|5%|
|500,000 to 999,999	|7%|
|1,000,000 to 3,000,000	|10%|

Những giảm giá này áp dụng cho việc sử dụng trong mỗi cấp. Ví dụ: nếu Agora tính phí cho một tài khoản cho 600.000 phút thì mức sử dụng từ 1 đến 99.999 phút sẽ không được giảm giá, mức sử dụng từ 100.000 đến 499.999 phút sẽ được giảm giá 5% và mức sử dụng từ 500.000 đến 600.000 phút sẽ được giảm giá 7%.

/*Nếu bạn dự kiến ​​tổng mức sử dụng hàng tháng của mình vượt quá 3.000.000 phút, hãy liên hệ với sales-us@agora.io để được giảm giá thêm.*/

Tại sao chọn agora
hago chọn
top công cụ handle live stream trên app, web


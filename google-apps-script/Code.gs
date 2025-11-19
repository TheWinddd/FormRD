/**
 * GOOGLE APPS SCRIPT - WEB APP
 * 
 * Script này nhận dữ liệu từ form React và:
 * 1. Ghi vào Google Sheet
 * 2. Tự động chạy hàm generateProfiles() để tạo Profile và Nhu cầu mong muốn
 * 
 * CÁCH SETUP:
 * 1. Mở Google Sheet của bạn
 * 2. Vào Extensions > Apps Script
 * 3. Copy toàn bộ code này vào Code.gs
 * 4. Copy code từ generateProfiles.gs vào một file mới tên generateProfiles.gs
 * 5. Deploy as Web App: Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy URL deployment vào file .env của React app
 */

/**
 * Hàm xử lý POST request từ form React
 */
function doPost(e) {
  try {
    // Parse JSON data từ request
    const requestData = JSON.parse(e.postData.contents);
    const sheetId = requestData.sheetId;
    const rowData = requestData.data;
    
    // Mở Google Sheet
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheetByName('sheet1') || ss.getSheets()[0];
    
    // Kiểm tra xem đã có header chưa
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      // Nếu sheet trống, thêm header row
      const headers = getSheetHeaders();
      sheet.appendRow(headers);
    }
    
    // Thêm dữ liệu mới
    sheet.appendRow(rowData);
    
    // Lấy số dòng vừa thêm
    const newRowNumber = sheet.getLastRow();
    Logger.log(`Đã ghi dữ liệu vào dòng ${newRowNumber}`);
    
    // Đợi 2 giây để đảm bảo dữ liệu đã được ghi
    Utilities.sleep(2000);
    
    // Tự động chạy hàm generateProfiles() CHỈ cho dòng vừa thêm
    try {
      Logger.log(`Bắt đầu tạo profile cho dòng ${newRowNumber}...`);
      generateProfiles(newRowNumber);  // Truyền số dòng cụ thể
      Logger.log('✅ Tạo profile thành công!');
    } catch (error) {
      Logger.log('❌ Lỗi khi chạy generateProfiles: ' + error.message);
      Logger.log('Stack trace: ' + error.stack);
      // Không throw error để không ảnh hưởng đến response
    }
    
    // Trả về response thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Đã ghi dữ liệu và tạo profile thành công',
        row: lastRow + 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.message);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm xử lý GET request (để test)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Google Sheets Web App is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Trả về danh sách headers cho Google Sheet
 * (Giống với hàm getSheetHeaders() trong googleSheets.ts)
 */
function getSheetHeaders() {
  return [
    'Timestamp',
    'Họ và tên',
    'Đơn vị',
    'Phòng ban',
    'Vị trí công tác',
    'Email liên hệ',
    'Số điện thoại',
    'Số năm kinh nghiệm R&D',
    'Bậc học',
    'Chuyên ngành',
    'Từ khóa chuyên sâu (Cung cấp 2-5 từ khóa mô tả hẹp về chuyên môn sâu)',
    'Các dự án R&D nổi bật đã tham gia (Liệt kê 2-3 dự án chính)',
    // Năng lực NỀN TẢNG - PHẦN B
    '1.1.1. Phương pháp luận nghiên cứu khoa học\n\n(Nắm vững và áp dụng các nguyên tắc, quy trình chuẩn để thực hiện một nghiên cứu khoa học)',
    '1.1.2. Xây dựng đề cương nghiên cứu khoa học\n\n(Lập kế hoạch chi tiết cho một nghiên cứu, bao gồm mục tiêu, đối tượng, phương pháp và dự trù kinh phí.)',
    '1.1.3. Phương pháp phân tích số liệu khoa học\n\n(Sử dụng các công cụ và kỹ thuật thống kê, toán học để xử lý và diễn giải dữ liệu nghiên cứu.)',
    '1.1.4. Công bố khoa học và sở hữu trí tuệ\n\n(Viết bài báo khoa học, trình bày kết quả và thực hiện các thủ tục đăng ký bằng sáng chế, giải pháp hữu ích.)',
    '1.2.1. Năng lực Sáng tạo & Phát triển Ý tưởng\n\n(Năng lực phát triển các ý tưởng sản phẩm mới có tính đột phá và khả thi.)',
    '1.2.2. Năng lực Hoạch định Chiến lược R&D\n\n(Khả năng xây dựng Hồ sơ Sản phẩm Mục tiêu - Target Product Profile, xác định lộ trình R&D, và định vị sản phẩm.)',
    '1.2.3. Quản lý và triển khai dự án nghiên cứu\n\n(Lập kế hoạch, tổ chức, theo dõi và kiểm soát tiến độ, nguồn lực và rủi ro của dự án R&D.)',
    '1.2.4. Năng lực Quản lý Danh mục Dự án\n\n(Lựa chọn, ưu tiên và quản lý cân bằng các dự án R&D để tối ưu hóa nguồn lực và phù hợp với chiến lược kinh doanh.)',
    '1.3.1. Hệ thống hóa thông tin khoa học\n\n(Thu thập, sắp xếp, lưu trữ và tra cứu thông tin, phân tích và  tài liệu khoa học một cách logic và hiệu quả.)',
    '1.3.2.  Áp dụng AI trong hoạt động nghiên cứu khoa học và chuyển đổi số\n\n(Tích hợp các công nghệ trí tuệ nhân tạo để tự động hóa, tối ưu hóa quy trình và khám phá tri thức mới từ dữ liệu.)',
    // Năng lực CHUYÊN MÔN - PHẦN B
    '2.1.1. Năng lực Phân tích Thị trường & Xu hướng sản phẩm\n\n(Khả năng phân tích dữ liệu thị trường, nhận diện nhu cầu chưa được đáp ứng, và dự báo xu hướng ngành)',
    '2.2.1. Năng lực Nghiên cứu Y học Cổ truyền\n\n(Khả năng tra cứu, phân tích và kế thừa các bài thuốc, kinh nghiệm dân gian và tài liệu y văn cổ.)',
    '2.2.2. Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao\n\n(Triển khai và quản lý vùng trồng dược liệu theo tiêu chuẩn Thực hành tốt trồng trọt và thu hái dược liệu- GACP)',
    '2.2.3. Tiêu chuẩn hóa và đảm bảo chất lượng dược liệu\n\n(Xây dựng bộ tiêu chuẩn kỹ thuật, phương pháp kiểm nghiệm và quy trình kiểm soát để đảm bảo dược liệu đầu vào đồng nhất, an toàn. Phân lập các chất trong dược liệu để làm chất chuẩn)',
    '2.2.4. Tối ưu hóa chiết xuất tạo cao định chuẩn\n\n(Nghiên cứu (dung môi, nhiệt độ, thời gian) để xây dựng quy trình chiết xuất hiệu suất cao và ổn định.  Xây dựng tiêu chuẩn và phương pháp kiểm nghiệm cho nguyên liệu đầu vào và bán thành phẩm (cao) là hỗn hợp phức tạp.',
    '2.2.5. Năng lực Công nghệ Sinh học Dược liệu (Biotechnology)\n\n(Nuôi cấy mô, tế bào thực vật để sản xuất hoạt chất quý hiếm hoặc nhân giống quy mô lớn.)',
    '2.3.1. Xây dựng công thức sản phẩm\n\n(Phối hợp các thành phần hoạt chất, tá dược để tạo ra công thức tối ưu, ổn định và đáp ứng mục tiêu sản phẩm.)',
    '2.3.2. RD sản phẩm mới (Triển khai và quản lý dự án R&D cho sản phẩm cụ thể)\n\n(Quản lý vòng đời R&D của một sản phẩm, từ ý tưởng, nghiên cứu, thử nghiệm đến khi chuyển giao sản xuất.)',
    '2.3.3. Năng lực Công nghệ Bào chế Nâng cao\n\n(Chuyên môn về các hệ phân phối hoạt chất tiên tiến như nano, liposome, vi nhũ tương để tăng hiệu quả sản phẩm)',
    '2.4.1.  Nghiên cứu tin sinh học - in silico\n\n(Nắm được nguyên lý và sử dụng được các công cụ Tin sinh học, in silico trong việc phân tích, dự đoán tác dụng sinh học tiềm năng của hoạt chất)',
    '2.4.2. Đánh giá tác dụng sinh học của dược liệu (in vitro, in vivo)\n\n(Thực hiện các thử nghiệm trong ống nghiệm (tế bào) và trên động vật để chứng minh hiệu quả sơ bộ.)',
    '2.5.1. Năng lực Thiết kế & Quản lý Thử nghiệm Lâm sàng Thuốc Thảo dược/TPCN/mỹ phẩm\n\n(Lên đề cương, triển khai, giám sát (monitoring) và quản lý dữ liệu thử nghiệm theo GCP.)',
    '2.5.2. Kiến thức về nghiên cứu sinh khả dụng và tương đương sinh học (BA/BE)\n\n(Hiểu rõ nguyên tắc, phương pháp đánh giá tốc độ và mức độ hấp thu hoạt chất vào cơ thể.)',
    '2.6.1. Năng lực Pháp chế & Đăng ký (Regulatory Affairs - RA)\n\n(Biên soạn hồ sơ đăng ký (ACTD, ICH...) và hồ sơ đăng ký thuốc cổ truyền/thuốc dược liệu/TPCN/Mỹ phẩm.)',
    '2.6.2. Năng lực Pháp chế Quốc tế (International RA)\n\n(Biên soạn hồ sơ đăng ký sản phẩm tại các thị trường khác (ASEAN, FDA, EMA...).)',
    '2.7.1. Năng lực Chuyển giao Công nghệ\n\n(Chuyển giao quy trình từ quy mô R&D (lab-scale) lên quy mô sản xuất (pilot/commercial scale), bao gồm thẩm định quy trình)',
    '2.7.2. Vận hành máy móc thiết bị sản xuất\n\n(Có khả năng thiết lập, sử dụng và bảo trì cơ bản các thiết bị trong dây chuyền sản xuất dược/mỹ phẩm.)',
    '2.8.1. Năng lực Cảnh giác Dược/Mỹ phẩm\n\n(Theo dõi, thu thập và báo cáo các phản ứng có hại (ADR) hoặc biến cố bất lợi (AE) sau khi sản phẩm ra thị trường.)',
    '2.8.2. Năng lực Hỗ trợ Kỹ thuật & Y khoa  (Medical Affairs)\n\n(Hỗ trợ chuyên môn cho Marketing, Sales,  các chuyên gia (KOLs)  và giải đáp các thắc mắc khoa học về sản phẩm. ',
    // PHẦN C: Nhu cầu đào tạo
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Phương pháp luận NCKH]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Xây dựng đề cương NCKH]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Phương pháp phân tích số liệu khoa học]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Công bố khoa học và sở hữu trí tuệ]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Năng lực Sáng tạo & Phát triển Ý tưởng]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Hoạch định Chiến lược R&D]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Quản lý Danh mục Dự án]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Quản lý và triển khai dự án nghiên cứu]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Hệ thống hóa thông tin khoa học]',
    '1. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực NỀN TẢNG sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Áp dụng AI trong hoạt động nghiên cứu khoa học và chuyển đổi số]',
    '2. Hãy liệt kê một vài Năng lực NỀN TẢNG khác mà bạn mong muốn được đào tạo (nếu có)',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Phân tích Thị trường & Xu hướng sản phẩm]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Nghiên cứu Y học Cổ truyền và y học dân tộc]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Tiêu chuẩn hóa và đảm bảo chất lượng dược liệu]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Tối ưu hóa chiết xuất tạo cao định chuẩn]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Công nghệ Sinh học Dược liệu (Biotechnology)]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Xây dựng công thức sản phẩm TPCN, mỹ phẩm, thuốc dược liệu]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [RD sản phẩm mới (Triển khai và quản lý dự án R&D cho sản phẩm cụ thể)]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Công nghệ Bào chế Nâng cao]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Nghiên cứu tin sinh học - in silico]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Đánh giá tác dụng sinh học của dược liệu (in vitro, in vivo)]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Năng lực Thiết kế & Quản lý Thử nghiệm Lâm sàng Thuốc Thảo dược/TPCN/mỹ phẩm]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Nghiên cứu sinh khả dụng và tương đương sinh học]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Năng lực Pháp chế & Đăng ký]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Năng lực Pháp chế Quốc tế]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Kiến thức về Công nghệ và dây chuyền sản xuất dược - mỹ phẩm]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Vận hành máy móc thiết bị sản xuất]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Chuyển giao Công nghệ]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Cảnh giác Dược/Mỹ phẩm]',
    '3. Hãy xác định mức độ Bạn mong muốn được đào tạo các Năng lực CHUYÊN MÔN sau trong 1 năm tới (Hãy chọn 2-3 năng lực anh/chị muốn ưu tiên, tập trung cải thiện trong năm tới) [Năng lực Hỗ trợ Kỹ thuật & Y khoa (Medical Affairs)]',
    '4. Hãy liệt kê một vài Năng lực CHUYÊN MÔN khác mà bạn mong muốn được đào tạo (nếu có)',
    '5. Khó khăn bạn đang gặp phải trong quá trình làm R&D hiện nay là gì? Bạn cần Ban R&D có hỗ trợ cụ thể gì để giải quyết khó khăn này?',
    '4. Bạn có đề xuất cụ thể gì về chương trình workshop/ khóa đào tạo/ hoạt động coaching/ hoạt động mentor ...để giúp bạn phát triển các năng lực trên?'
  ];
}


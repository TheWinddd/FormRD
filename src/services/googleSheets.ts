/**
 * Google Sheets Integration Service
 * Gửi dữ liệu form lên Google Sheets và tự động trigger AppScript
 */

interface FormDataToSubmit {
  step1: any;
  step2: any;
  step3: any;
  step4: any;
}

/**
 * Chuyển đổi mức độ năng lực thành format AppScript mong đợi
 */
const formatCompetencyLevel = (level: number): string => {
  const labels = {
    0: '0: Chưa có kiến thức/Kỹ năng',
    1: '1: Cơ bản',
    2: '2: Áp dụng',
    3: '3: Thành thạo',
    4: '4: Chuyên gia'
  };
  return labels[level as keyof typeof labels] || '0: Chưa có kiến thức/Kỹ năng';
};

/**
 * Chuyển đổi mức độ ưu tiên đào tạo thành format AppScript mong đợi
 */
const formatTrainingPriority = (priority: string): string => {
  const mapping = {
    'not-relevant': '0: Không phù hợp với chuyên môn của tôi',
    'not-priority': '1: Sẽ học nếu có thời gian (chưa phải là ưu tiên trong năm tới)',
    'high-priority': '2: Muốn được học ngay (Ưu tiên cao trong năm tới)'
  };
  return mapping[priority as keyof typeof mapping] || '0: Không phù hợp với chuyên môn của tôi';
};

/**
 * Chuyển đổi dữ liệu form thành mảng theo đúng thứ tự cột của Google Sheets
 * Theo cấu trúc AppScript yêu cầu
 */
export const mapFormDataToSheetRow = (formData: FormDataToSubmit): string[] => {
  const { step1, step2, step3, step4 } = formData;
  
  // Timestamp (cột A)
  const timestamp = new Date().toLocaleString('vi-VN');
  
  // PHẦN A: Thông tin cơ bản (cột B-L)
  const basicInfo = [
    step1.fullName,                          // B: Họ và tên
    step1.department || step1.unit,          // C: Đơn vị
    step1.unit || step1.department,          // D: Phòng ban
    step1.position,                          // E: Vị trí công tác
    step1.email,                             // F: Email liên hệ
    step1.phone,                             // G: Số điện thoại
    step1.yearsExperience,                   // H: Số năm kinh nghiệm R&D
    step1.degree === 'other' ? step1.otherDegree : 
      (step1.degree === 'phd' ? 'Tiến sĩ (PhD)' :
       step1.degree === 'master' ? 'Thạc sĩ (Master)' :
       step1.degree === 'bachelor' ? 'Đại học (Bachelor)' : step1.degree), // I: Bậc học
    step1.major,                             // J: Chuyên ngành
    step1.keywords.join(', '),               // K: Từ khóa chuyên sâu
    step1.notableProjects                    // L: Các dự án R&D nổi bật
  ];
  
  // PHẦN B: Năng lực hiện tại (cột M-AO)
  // Năng lực NỀN TẢNG (10 năng lực: M-V)
  const foundationCompetencies = [
    formatCompetencyLevel(step2.methodology1),  // M: 1.1.1. Phương pháp luận NCKH
    formatCompetencyLevel(step2.methodology2),  // N: 1.1.2. Xây dựng đề cương NCKH
    formatCompetencyLevel(step2.methodology3),  // O: 1.1.3. Phương pháp phân tích số liệu
    formatCompetencyLevel(step2.methodology4),  // P: 1.1.4. Công bố khoa học và sở hữu trí tuệ
    formatCompetencyLevel(step2.creativity1),   // Q: 1.2.1. Sáng tạo & Phát triển Ý tưởng
    formatCompetencyLevel(step2.creativity2),   // R: 1.2.2. Hoạch định Chiến lược R&D
    formatCompetencyLevel(step2.creativity3),   // S: 1.2.3. Quản lý và triển khai dự án
    formatCompetencyLevel(step2.creativity4),   // T: 1.2.4. Quản lý Danh mục Dự án
    formatCompetencyLevel(step2.tools1),        // U: 1.3.1. Hệ thống hóa thông tin
    formatCompetencyLevel(step2.tools2)         // V: 1.3.2. Áp dụng AI
  ];
  
  // Năng lực CHUYÊN MÔN (18 năng lực: W-AO)
  const professionalCompetencies = [
    formatCompetencyLevel(step3.market1),       // W: 2.1.1. Phân tích Thị trường
    formatCompetencyLevel(step3.source1),       // X: 2.2.1. Nghiên cứu Y học Cổ truyền
    formatCompetencyLevel(step3.source2),       // Y: 2.2.2. Tạo vùng trồng GACP
    formatCompetencyLevel(step3.source3),       // Z: 2.2.3. Tiêu chuẩn hóa dược liệu
    formatCompetencyLevel(step3.source4),       // AA: 2.2.4. Tối ưu chiết xuất
    formatCompetencyLevel(step3.source5),       // AB: 2.2.5. Công nghệ Sinh học
    formatCompetencyLevel(step3.formula1),      // AC: 2.3.1. Xây dựng công thức
    formatCompetencyLevel(step3.formula2),      // AD: 2.3.2. R&D sản phẩm mới
    formatCompetencyLevel(step3.formula3),      // AE: 2.3.3. Công nghệ Bào chế Nâng cao
    formatCompetencyLevel(step3.preclinical1),  // AF: 2.4.1. Tin sinh học - in silico
    formatCompetencyLevel(step3.preclinical2),  // AG: 2.4.2. Đánh giá tác dụng sinh học
    formatCompetencyLevel(step3.clinical1),     // AH: 2.5.1. Thử nghiệm Lâm sàng
    formatCompetencyLevel(step3.clinical2),     // AI: 2.5.2. Sinh khả dụng BA/BE
    formatCompetencyLevel(step3.regulatory1),   // AJ: 2.6.1. Pháp chế & Đăng ký
    formatCompetencyLevel(step3.regulatory2),   // AK: 2.6.2. Pháp chế Quốc tế
    formatCompetencyLevel(step3.transfer1),     // AL: 2.7.1. Chuyển giao Công nghệ
    formatCompetencyLevel(step3.transfer2),     // AM: 2.7.2. Vận hành máy móc
    formatCompetencyLevel(step3.postmarket1),   // AN: 2.8.1. Cảnh giác Dược/Mỹ phẩm
    formatCompetencyLevel(step3.postmarket2)    // AO: 2.8.2. Hỗ trợ Kỹ thuật & Y khoa
  ];
  
  // PHẦN C: Nhu cầu đào tạo (cột AP trở đi)
  // Nhu cầu đào tạo Năng lực NỀN TẢNG (10 cột: AP-AY)
  const foundationPriorities = [
    formatTrainingPriority(step4.foundationPriorities[0] || ''),  // AP: Phương pháp luận NCKH
    formatTrainingPriority(step4.foundationPriorities[1] || ''),  // AQ: Xây dựng đề cương NCKH
    formatTrainingPriority(step4.foundationPriorities[2] || ''),  // AR: Phân tích số liệu
    formatTrainingPriority(step4.foundationPriorities[3] || ''),  // AS: Công bố khoa học
    formatTrainingPriority(step4.foundationPriorities[4] || ''),  // AT: Sáng tạo & Phát triển
    formatTrainingPriority(step4.foundationPriorities[5] || ''),  // AU: Hoạch định Chiến lược
    formatTrainingPriority(step4.foundationPriorities[6] || ''),  // AV: Quản lý Danh mục
    formatTrainingPriority(step4.foundationPriorities[7] || ''),  // AW: Quản lý dự án
    formatTrainingPriority(step4.foundationPriorities[8] || ''),  // AX: Hệ thống hóa thông tin
    formatTrainingPriority(step4.foundationPriorities[9] || '')   // AY: Áp dụng AI
  ];
  
  // Năng lực NỀN TẢNG khác (cột AZ)
  const otherFoundation = [step4.otherFoundation || ''];
  
  // Nhu cầu đào tạo Năng lực CHUYÊN MÔN (20 cột: BA-BT)
  const professionalPriorities = [
    formatTrainingPriority(step4.professionalPriorities[0] || ''),   // BA: Phân tích Thị trường
    formatTrainingPriority(step4.professionalPriorities[1] || ''),   // BB: Y học Cổ truyền
    formatTrainingPriority(step4.professionalPriorities[2] || ''),   // BC: Vùng trồng GACP
    formatTrainingPriority(step4.professionalPriorities[3] || ''),   // BD: Tiêu chuẩn hóa
    formatTrainingPriority(step4.professionalPriorities[4] || ''),   // BE: Tối ưu chiết xuất
    formatTrainingPriority(step4.professionalPriorities[5] || ''),   // BF: Công nghệ Sinh học
    formatTrainingPriority(step4.professionalPriorities[6] || ''),   // BG: Xây dựng công thức
    formatTrainingPriority(step4.professionalPriorities[7] || ''),   // BH: R&D sản phẩm mới
    formatTrainingPriority(step4.professionalPriorities[8] || ''),   // BI: Bào chế Nâng cao
    formatTrainingPriority(step4.professionalPriorities[9] || ''),   // BJ: Tin sinh học
    formatTrainingPriority(step4.professionalPriorities[10] || ''),  // BK: Tác dụng sinh học
    formatTrainingPriority(step4.professionalPriorities[11] || ''),  // BL: Lâm sàng
    formatTrainingPriority(step4.professionalPriorities[12] || ''),  // BM: BA/BE
    formatTrainingPriority(step4.professionalPriorities[13] || ''),  // BN: Pháp chế
    formatTrainingPriority(step4.professionalPriorities[14] || ''),  // BO: Pháp chế Quốc tế
    formatTrainingPriority(step4.professionalPriorities[15] || ''),  // BP: Công nghệ sản xuất
    formatTrainingPriority(step4.professionalPriorities[16] || ''),  // BQ: Vận hành máy móc
    formatTrainingPriority(step4.professionalPriorities[17] || ''),  // BR: Chuyển giao
    formatTrainingPriority(step4.professionalPriorities[18] || ''),  // BS: Cảnh giác Dược
    formatTrainingPriority(step4.professionalPriorities[19] || '')   // BT: Medical Affairs
  ];
  
  // Năng lực CHUYÊN MÔN khác (cột BU)
  const otherProfessional = [step4.otherProfessional || ''];
  
  // Khó khăn và đề xuất (cột BV-BW)
  const additional = [
    step4.challenges || '',    // BV: Khó khăn hiện tại
    step4.suggestions || ''    // BW: Đề xuất chương trình đào tạo
  ];
  
  // Ghép tất cả các phần lại
  return [
    timestamp,
    ...basicInfo,
    ...foundationCompetencies,
    ...professionalCompetencies,
    ...foundationPriorities,
    ...otherFoundation,
    ...professionalPriorities,
    ...otherProfessional,
    ...additional
  ];
};

/**
 * Gửi dữ liệu lên Google Sheets và trigger AppScript
 */
export const submitToGoogleSheets = async (formData: FormDataToSubmit): Promise<void> => {
  try {
    const rowData = mapFormDataToSheetRow(formData);
    
    // Hardcode thông tin Google Sheets và Web App URL
    const SHEET_ID = '1_7lq6bYecw-vz98RsMnCuR0sVJOeM2zsHEl1iEVPW2E';
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbytYSukKj7OOO5xXYVq-1ckhFIR--wnTHXjF1oD0kObMwJ_gnJ3lzzkKvN5nzeuuvs_ew/exec';
    
    // Gửi dữ liệu lên Google Apps Script Web App
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script yêu cầu no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheetId: SHEET_ID,
        data: rowData
      })
    });
    
    // Note: Với mode 'no-cors', không thể đọc response body
    // Nhưng request sẽ được gửi thành công
    console.log('Đã gửi dữ liệu lên Google Sheets');
    
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu lên Google Sheets:', error);
    throw new Error('Không thể gửi dữ liệu lên Google Sheets. Vui lòng thử lại.');
  }
};

/**
 * Tạo header row cho Google Sheets (chỉ cần chạy 1 lần)
 */
export const getSheetHeaders = (): string[] => {
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
    '1.1.1. Phương pháp luận nghiên cứu khoa học',
    '1.1.2. Xây dựng đề cương nghiên cứu khoa học',
    '1.1.3. Phương pháp phân tích số liệu khoa học',
    '1.1.4. Công bố khoa học và sở hữu trí tuệ',
    '1.2.1. Năng lực Sáng tạo & Phát triển Ý tưởng',
    '1.2.2. Năng lực Hoạch định Chiến lược R&D',
    '1.2.3. Quản lý và triển khai dự án nghiên cứu',
    '1.2.4. Năng lực Quản lý Danh mục Dự án',
    '1.3.1. Hệ thống hóa thông tin khoa học',
    '1.3.2. Áp dụng AI trong hoạt động nghiên cứu khoa học và chuyển đổi số',
    // Năng lực CHUYÊN MÔN - PHẦN B
    '2.1.1. Năng lực Phân tích Thị trường & Xu hướng sản phẩm',
    '2.2.1. Năng lực Nghiên cứu Y học Cổ truyền',
    '2.2.2. Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao',
    '2.2.3. Tiêu chuẩn hóa và đảm bảo chất lượng dược liệu',
    '2.2.4. Tối ưu hóa chiết xuất tạo cao định chuẩn',
    '2.2.5. Năng lực Công nghệ Sinh học Dược liệu (Biotechnology)',
    '2.3.1. Xây dựng công thức sản phẩm',
    '2.3.2. R&D sản phẩm mới (Triển khai và quản lý dự án R&D cho sản phẩm cụ thể)',
    '2.3.3. Năng lực Công nghệ Bào chế Nâng cao',
    '2.4.1. Nghiên cứu tin sinh học - in silico',
    '2.4.2. Đánh giá tác dụng sinh học của dược liệu (in vitro, in vivo)',
    '2.5.1. Năng lực Thiết kế & Quản lý Thử nghiệm Lâm sàng Thuốc Thảo dược/TPCN/mỹ phẩm',
    '2.5.2. Kiến thức về nghiên cứu sinh khả dụng và tương đương sinh học (BA/BE)',
    '2.6.1. Năng lực Pháp chế & Đăng ký (Regulatory Affairs - RA)',
    '2.6.2. Năng lực Pháp chế Quốc tế (International RA)',
    '2.7.1. Năng lực Chuyển giao Công nghệ',
    '2.7.2. Vận hành máy móc thiết bị sản xuất',
    '2.8.1. Năng lực Cảnh giác Dược/Mỹ phẩm',
    '2.8.2. Năng lực Hỗ trợ Kỹ thuật & Y khoa (Medical Affairs)',
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
};


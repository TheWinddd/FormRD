/**
 * GOOGLE APPS SCRIPT - GENERATE PROFILES
 * 
 * Script này tạo Profile và Nhu cầu mong muốn cho mỗi nhân sự
 * Copy code AppScript gốc của bạn vào đây
 * 
 * LƯU Ý: Cần sửa 3 dòng sau theo file của bạn:
 */

// ====== CẦN SỬA 5 DÒNG NÀY THEO FILE CỦA BẠN ======
const SHEET_NAME = 'sheet1';              // tên sheet chứa dữ liệu form
const TEMPLATE_ID = '1VCFTxBmoTWxPXrznY3N7lJECItbsT5k9SvaSKdHaeQg';   // ID file Google Docs template PROFILE
const OUTPUT_FOLDER_DOCS = '1g5Pgiqke6djK2qhsmf2Z28ekFSZi9uUk';      // ID thư mục chứa file DOCS
const OUTPUT_FOLDER_PDF = '1gYAr25mGDYqiI_VhGv_THXwFPM2AbDEW';        // ID thư mục chứa file PDF
const START_COL_PART_C = 42; // cột bắt đầu của PHẦN C (AP = 42). Đã thêm Email và SĐT nên shift 2 cột
// ==================================================

/**
 * CHẠY HÀM NÀY để tạo:
 * - Profile - Họ tên (Docs + PDF)
 * - Nhu cầu mong muốn - Họ tên (Docs + PDF) – trình bày đẹp hơn
 * 
 * @param {number} specificRow - Số dòng cụ thể cần tạo profile (optional)
 *                                Nếu không truyền, sẽ tạo cho dòng cuối cùng
 */
function generateProfiles(specificRow) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    Logger.log('Không có dữ liệu để tạo profile');
    return;
  }

  // Lấy header để dùng cho phần C
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Xác định dòng cần xử lý
  let rowToProcess;
  let startRow, numRows;
  
  if (specificRow && specificRow >= 2 && specificRow <= lastRow) {
    // Nếu có chỉ định dòng cụ thể
    startRow = specificRow;
    numRows = 1;
    Logger.log(`Tạo profile cho dòng ${specificRow}`);
  } else {
    // Mặc định: chỉ xử lý dòng cuối cùng (người vừa điền form)
    startRow = lastRow;
    numRows = 1;
    Logger.log(`Tạo profile cho dòng mới nhất: ${lastRow}`);
  }

  // Lấy dữ liệu của dòng cần xử lý
  const data = sheet.getRange(startRow, 1, numRows, lastCol).getValues();

  // Lấy các folder
  const folderDocs = DriveApp.getFolderById(OUTPUT_FOLDER_DOCS);
  const folderPdf = DriveApp.getFolderById(OUTPUT_FOLDER_PDF);
  const templateFile = DriveApp.getFileById(TEMPLATE_ID);

  data.forEach((row) => {
    const hoTen = getCell(row, 2); // cột B - Họ và tên
    if (!hoTen) return; // bỏ các dòng trống

    // ===== Chuẩn bị object chứa các giá trị cho PROFILE =====
    const fields = {};

    // --- Thông tin chung ---
    fields.HoTen        = hoTen;
    fields.DonVi        = getCell(row, 3);  // C
    fields.PhongBan     = getCell(row, 4);  // D
    fields.ViTri        = getCell(row, 5);  // E
    fields.Email        = getCell(row, 6);  // F
    fields.SoDienThoai  = getCell(row, 7);  // G
    fields.SoNamRD      = getCell(row, 8);  // H
    fields.BacHoc       = getCell(row, 9);  // I
    fields.ChuyenNganh  = getCell(row, 10); // J
    fields.TuKhoa       = getCell(row, 11); // K
    fields.DuAn         = getCell(row, 12); // L

    // Tóm tắt chuyên môn
    fields.TomTat = buildSummary(fields);

    // --- Năng lực NỀN TẢNG ---
    fields.NL_1_1_1 = formatLevel(getCell(row, 13)); // M
    fields.NL_1_1_2 = formatLevel(getCell(row, 14)); // N
    fields.NL_1_1_3 = formatLevel(getCell(row, 15)); // O
    fields.NL_1_1_4 = formatLevel(getCell(row, 16)); // P
    fields.NL_1_2_1 = formatLevel(getCell(row, 17)); // Q
    fields.NL_1_2_2 = formatLevel(getCell(row, 18)); // R
    fields.NL_1_2_3 = formatLevel(getCell(row, 19)); // S
    fields.NL_1_2_4 = formatLevel(getCell(row, 20)); // T
    fields.NL_1_3_1 = formatLevel(getCell(row, 21)); // U
    fields.NL_1_3_2 = formatLevel(getCell(row, 22)); // V

    // --- Năng lực CHUYÊN MÔN ---
    fields.NL_2_1_1 = formatLevel(getCell(row, 23)); // W
    fields.NL_2_2_1 = formatLevel(getCell(row, 24)); // X
    fields.NL_2_2_2 = formatLevel(getCell(row, 25)); // Y
    fields.NL_2_2_3 = formatLevel(getCell(row, 26)); // Z
    fields.NL_2_2_4 = formatLevel(getCell(row, 27)); // AA
    fields.NL_2_2_5 = formatLevel(getCell(row, 28)); // AB
    fields.NL_2_3_1 = formatLevel(getCell(row, 29)); // AC
    fields.NL_2_3_2 = formatLevel(getCell(row, 30)); // AD
    fields.NL_2_3_3 = formatLevel(getCell(row, 31)); // AE
    fields.NL_2_4_1 = formatLevel(getCell(row, 32)); // AF
    fields.NL_2_4_2 = formatLevel(getCell(row, 33)); // AG
    fields.NL_2_5_1 = formatLevel(getCell(row, 34)); // AH
    fields.NL_2_5_2 = formatLevel(getCell(row, 35)); // AI
    fields.NL_2_6_1 = formatLevel(getCell(row, 36)); // AJ
    fields.NL_2_6_2 = formatLevel(getCell(row, 37)); // AK
    fields.NL_2_7_1 = formatLevel(getCell(row, 38)); // AL
    fields.NL_2_7_2 = formatLevel(getCell(row, 39)); // AM
    fields.NL_2_8_1 = formatLevel(getCell(row, 40)); // AN
    fields.NL_2_8_2 = formatLevel(getCell(row, 41)); // AO

    // ===== 1. TẠO FILE PROFILE =====
    const profileName = `Profile - ${fields.HoTen}`;
    
    // Tạo file Docs trong folder Docs
    const newProfileFile = templateFile.makeCopy(profileName, folderDocs);
    const docProfile = DocumentApp.openById(newProfileFile.getId());
    const bodyProfile = docProfile.getBody();

    Object.keys(fields).forEach(key => {
      bodyProfile.replaceText(`{{${key}}}`, fields[key] || '');
    });

    docProfile.saveAndClose();
    
    Logger.log(`✅ Đã tạo file Docs: ${profileName}`);

    // Tạo file PDF trong folder PDF
    const pdfProfile = newProfileFile
      .getAs('application/pdf')
      .setName(`${profileName}.pdf`);
    folderPdf.createFile(pdfProfile);
    
    Logger.log(`✅ Đã tạo file PDF: ${profileName}.pdf`);

    // ===== 2. TẠO FILE "NHU CẦU MONG MUỐN - HỌ TÊN" =====
    createNeedsDoc(fields, headers, row, START_COL_PART_C, folderDocs, folderPdf);
  });

  Logger.log('🎉 Hoàn tất tạo Profile + Nhu cầu mong muốn!');
}

/**
 * Lấy giá trị ô theo số cột (columnIndex: A=1, B=2,...)
 */
function getCell(row, columnIndex) {
  return row[columnIndex - 1] || '';
}

/**
 * Tách mức độ từ chuỗi "3: Thành thạo: ...." → "3 – Thành thạo"
 */
function formatLevel(raw) {
  if (!raw) return '';
  const s = String(raw).trim();
  const level = s.charAt(0); // ký tự đầu "0".."4"
  const labels = {
    '0': 'Chưa có',
    '1': 'Cơ bản',
    '2': 'Áp dụng',
    '3': 'Thành thạo',
    '4': 'Chuyên gia'
  };
  // Nếu bắt được level thì trả về chỉ chữ, nếu không thì trả lại nguyên chuỗi gốc
  return labels[level] || s;
}

/**
 * Tạo đoạn tóm tắt chuyên môn cho PROFILE
 */
function buildSummary(f) {
  const parts = [];
  if (f.HoTen && (f.DonVi || f.PhongBan)) {
    let s = `${f.HoTen} hiện đang công tác tại `;
    if (f.DonVi) s += f.DonVi;
    if (f.PhongBan) s += ` – ${f.PhongBan}`;
    if (f.SoNamRD) s += ` với ${f.SoNamRD} năm kinh nghiệm trong lĩnh vực R&D`;
    s += '.';
    parts.push(s);
  }
  if (f.TuKhoa) {
    parts.push(`Thế mạnh chuyên môn tập trung vào: ${f.TuKhoa}.`);
  }
  if (f.DuAn) {
    parts.push(`Một số dự án R&D tiêu biểu đã tham gia: ${f.DuAn}.`);
  }
  return parts.join(' ');
}

/**
 * Phân loại mức độ mong muốn đào tạo dựa trên text câu trả lời
 * Trả về: 'HIGH' | 'MEDIUM' | 'NONE'
 */
function categorizeTrainingNeed(raw) {
  if (!raw) return 'NONE';
  const s = String(raw).toLowerCase();
  // Các cụm từ bạn đang dùng trong form
  if (s.indexOf('không có nhu cầu') !== -1 || s.indexOf('không phù hợp') !== -1) {
    return 'NONE';
  }
  if (s.indexOf('muốn được học ngay') !== -1 || s.indexOf('ưu tiên cao') !== -1) {
    return 'HIGH';
  }
  // Còn lại (ví dụ: "Sẽ học nếu có thời gian", "Chưa phải là ưu tiên...")
  return 'MEDIUM';
}

/**
 * Helper: thêm 1 nhóm nhu cầu (tiêu đề + bullet danh sách)
 */
function appendNeedGroup(body, title, items) {
  if (!items || items.length === 0) return;
  body.appendParagraph(title)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  items.forEach(name => body.appendListItem(name));
  body.appendParagraph('');
}

/**
 * Tạo file "Nhu cầu mong muốn - Họ tên"
 * - Dùng dữ liệu phần C (từ cột START_COL_PART_C trở đi)
 * - Trình bày gọn, nhóm theo mức độ ưu tiên
 * 
 * @param {Object} fields - Thông tin người dùng
 * @param {Array} headers - Header của sheet
 * @param {Array} row - Dữ liệu dòng hiện tại
 * @param {number} startCol - Cột bắt đầu phần C
 * @param {Folder} folderDocs - Thư mục chứa file Docs
 * @param {Folder} folderPdf - Thư mục chứa file PDF
 */
function createNeedsDoc(fields, headers, row, startCol, folderDocs, folderPdf) {
  const title = `Nhu cầu mong muốn - ${fields.HoTen}`;
  const lastCol = headers.length;

  // ======= CẤU HÌNH TÊN NĂNG LỰC TƯƠNG ỨNG VỚI CỘT =======
  // 1. Năng lực NỀN TẢNG (10 năng lực)
  const coreSkills = [
    'Phương pháp luận NCKH',
    'Xây dựng đề cương NCKH',
    'Phương pháp phân tích số liệu khoa học',
    'Công bố khoa học & sở hữu trí tuệ',
    'Năng lực Sáng tạo & Phát triển Ý tưởng',
    'Hoạch định Chiến lược R&D',
    'Quản lý Danh mục Dự án',
    'Quản lý và triển khai dự án nghiên cứu',
    'Hệ thống hóa thông tin khoa học',
    'Áp dụng AI trong nghiên cứu & chuyển đổi số'
  ];

  // 2. Năng lực CHUYÊN MÔN (20 năng lực)
  const specSkills = [
    'Phân tích Thị trường & Xu hướng sản phẩm',
    'Nghiên cứu Y học Cổ truyền & y học dân tộc',
    'Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao',
    'Tiêu chuẩn hóa & đảm bảo chất lượng dược liệu',
    'Tối ưu hóa chiết xuất tạo cao định chuẩn',
    'Công nghệ Sinh học Dược liệu (Biotechnology)',
    'Xây dựng công thức sản phẩm TPCN, mỹ phẩm, thuốc dược liệu',
    'R&D sản phẩm mới (dự án R&D cho sản phẩm cụ thể)',
    'Công nghệ Bào chế Nâng cao',
    'Nghiên cứu tin sinh học - in silico',
    'Đánh giá tác dụng sinh học của dược liệu (in vitro, in vivo)',
    'Thiết kế & Quản lý Thử nghiệm Lâm sàng',
    'Nghiên cứu sinh khả dụng & tương đương sinh học (BA/BE)',
    'Pháp chế & Đăng ký (Regulatory Affairs)',
    'Pháp chế Quốc tế (International RA)',
    'Kiến thức về Công nghệ & dây chuyền sản xuất dược - mỹ phẩm',
    'Vận hành máy móc thiết bị sản xuất',
    'Chuyển giao Công nghệ',
    'Cảnh giác Dược/Mỹ phẩm',
    'Hỗ trợ Kỹ thuật & Y khoa (Medical Affairs)'
  ];

  const coreCount = coreSkills.length;   // 10
  const specCount = specSkills.length;   // 20

  // Xác định cột tương ứng trong sheet
  const colCoreStart = startCol;                         // 40 = AN
  const colCoreEnd   = Math.min(colCoreStart + coreCount - 1, lastCol);
  const colCoreOther = colCoreEnd + 1 <= lastCol ? colCoreEnd + 1 : null;

  const colSpecStart = colCoreOther ? colCoreOther + 1 : null;
  const colSpecEnd   = colSpecStart ? Math.min(colSpecStart + specCount - 1, lastCol) : null;
  const colSpecOther = colSpecEnd && colSpecEnd + 1 <= lastCol ? colSpecEnd + 1 : null;

  const colDifficulties = colSpecOther && colSpecOther + 1 <= lastCol ? colSpecOther + 1 : null;
  const colProposal     = colDifficulties && colDifficulties + 1 <= lastCol ? colDifficulties + 1 : null;

  // ======= PHÂN LOẠI NHU CẦU CHO NỀN TẢNG & CHUYÊN MÔN =======
  const coreHigh = [], coreMed = [], coreNone = [];
  for (let i = 0; i < coreSkills.length; i++) {
    const colIndex = colCoreStart + i;
    if (colIndex > lastCol) break;
    const ans = row[colIndex - 1];
    const cat = categorizeTrainingNeed(ans);
    if (cat === 'HIGH') coreHigh.push(coreSkills[i]);
    else if (cat === 'MEDIUM') coreMed.push(coreSkills[i]);
    else coreNone.push(coreSkills[i]);
  }

  const specHigh = [], specMed = [], specNone = [];
  if (colSpecStart) {
    for (let i = 0; i < specSkills.length; i++) {
      const colIndex = colSpecStart + i;
      if (colIndex > lastCol) break;
      const ans = row[colIndex - 1];
      const cat = categorizeTrainingNeed(ans);
      if (cat === 'HIGH') specHigh.push(specSkills[i]);
      else if (cat === 'MEDIUM') specMed.push(specSkills[i]);
      else specNone.push(specSkills[i]);
    }
  }

  const textCoreOther   = colCoreOther   ? (row[colCoreOther   - 1] || '') : '';
  const textSpecOther   = colSpecOther   ? (row[colSpecOther   - 1] || '') : '';
  const textDifficult   = colDifficulties? (row[colDifficulties- 1] || '') : '';
  const textProposal    = colProposal    ? (row[colProposal    - 1] || '') : '';

  // ======= TẠO DOC =======
  const doc = DocumentApp.create(title);
  const file = DriveApp.getFileById(doc.getId());

  // Di chuyển file vào thư mục Docs
  folderDocs.addFile(file);
  DriveApp.getRootFolder().removeFile(file); // bỏ khỏi My Drive gốc (cho gọn)

  const body = doc.getBody();

  // Tiêu đề
  body.appendParagraph('NHU CẦU ĐÀO TẠO & ĐỊNH HƯỚNG PHÁT TRIỂN CÁ NHÂN')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);

  body.appendParagraph(`Họ và tên: ${fields.HoTen}`);
  body.appendParagraph(`Đơn vị: ${fields.DonVi}`);
  body.appendParagraph(`Phòng ban/Nhóm: ${fields.PhongBan}`);
  body.appendParagraph(`Vị trí công tác: ${fields.ViTri}`);
  body.appendParagraph(''); // dòng trống

  // I. Năng lực NỀN TẢNG
  body.appendParagraph('I. Nhu cầu đào tạo NĂNG LỰC NỀN TẢNG trong 1 năm tới')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2);

  appendNeedGroup(body, '1. Các năng lực ưu tiên cao trong năm tới', coreHigh);
  appendNeedGroup(body, '2. Các năng lực có thể xem xét/đào tạo khi phù hợp', coreMed);
  appendNeedGroup(body, '3. Các năng lực hiện chưa có nhu cầu', coreNone);

  if (textCoreOther) {
    body.appendParagraph('4. Các năng lực NỀN TẢNG khác mong muốn được đào tạo')
        .setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph(textCoreOther);
    body.appendParagraph('');
  }

  // II. Năng lực CHUYÊN MÔN
  body.appendParagraph('II. Nhu cầu đào tạo NĂNG LỰC CHUYÊN MÔN trong 1 năm tới')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2);

  appendNeedGroup(body, '1. Các năng lực chuyên môn ưu tiên cao trong năm tới', specHigh);
  appendNeedGroup(body, '2. Các năng lực chuyên môn có thể xem xét/đào tạo khi phù hợp', specMed);
  appendNeedGroup(body, '3. Các năng lực chuyên môn hiện chưa có nhu cầu', specNone);

  if (textSpecOther) {
    body.appendParagraph('4. Các năng lực CHUYÊN MÔN khác mong muốn được đào tạo')
        .setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph(textSpecOther);
    body.appendParagraph('');
  }

  // III. Khó khăn hiện tại
  if (textDifficult) {
    body.appendParagraph('III. Khó khăn hiện tại trong công việc R&D')
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(textDifficult);
    body.appendParagraph('');
  }

  // IV. Đề xuất chương trình hỗ trợ / đào tạo
  if (textProposal) {
    body.appendParagraph('IV. Đề xuất chương trình workshop/đào tạo/coaching/mentoring')
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(textProposal);
  }

  doc.saveAndClose();
  
  Logger.log(`✅ Đã tạo file Docs: ${title}`);

  // Xuất thêm PDF vào folder PDF
  const pdfBlob = file.getAs('application/pdf')
                      .setName(`${title}.pdf`);
  folderPdf.createFile(pdfBlob);
  
  Logger.log(`✅ Đã tạo file PDF: ${title}.pdf`);
}


# 🐛 DEBUG: Tự động tạo Profile không chạy

## Vấn đề
Dữ liệu đã gửi vào Google Sheet thành công nhưng **KHÔNG tự động tạo Profile PDF**.

## ✅ Các bước debug

### 1. Kiểm tra Apps Script Logs

1. Mở Google Sheet
2. Vào **Extensions > Apps Script**
3. Vào **View > Executions** (hoặc icon ⏱️ bên trái)
4. Xem log của lần chạy gần nhất
5. Tìm lỗi (nếu có)

### 2. Các lỗi thường gặp

#### ❌ Lỗi: "generateProfiles is not defined"
**Nguyên nhân**: File `generateProfiles.gs` chưa được tạo hoặc chưa save

**Giải pháp**:
- Tạo file mới: Click **+** > Script
- Đặt tên: `generateProfiles`
- Copy code từ `google-apps-script/generateProfiles.gs`
- **SAVE** (Ctrl+S)

#### ❌ Lỗi: "Template not found" hoặc "Folder not found"
**Nguyên nhân**: ID template hoặc folder không đúng

**Giải pháp**:
Trong file `generateProfiles.gs`, kiểm tra lại:
```javascript
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';       // ← Kiểm tra ID này
const OUTPUT_FOLDER_ID = 'YOUR_FOLDER_ID';     // ← Kiểm tra ID này
```

Cách lấy ID:
- **Template ID**: Mở Google Docs template, copy từ URL
  ```
  https://docs.google.com/document/d/[TEMPLATE_ID]/edit
  ```
- **Folder ID**: Mở thư mục Google Drive, copy từ URL
  ```
  https://drive.google.com/drive/folders/[FOLDER_ID]
  ```

#### ❌ Lỗi: "Sheet 'sheet1' not found"
**Nguyên nhân**: Tên sheet không khớp

**Giải pháp**:
```javascript
const SHEET_NAME = 'sheet1';  // ← Phải đúng tên sheet trong Google Sheets
```

#### ❌ Lỗi: "Cannot read property 'getBody'"
**Nguyên nhân**: Template không có các placeholder cần thiết

**Giải pháp**:
- Mở Google Docs template
- Copy toàn bộ nội dung từ file `TEMPLATE_PROFILE.txt`
- Paste vào template
- Đảm bảo có đầy đủ placeholders: `{{HoTen}}`, `{{Email}}`, `{{SoDienThoai}}`, etc.

### 3. Test manual AppScript

Thử chạy thủ công để xem lỗi:

1. Mở Apps Script Editor
2. Chọn function **`generateProfiles`** từ dropdown
3. Click nút **Run** (▶️)
4. Xem kết quả trong **Execution log**

Nếu chạy thành công → AppScript OK, vấn đề ở trigger
Nếu có lỗi → Fix lỗi theo message

### 4. Kiểm tra START_COL_PART_C

⚠️ **QUAN TRỌNG**: Sau khi thêm Email và Phone, cột đã shift 2 vị trí!

Kiểm tra trong `generateProfiles.gs`:
```javascript
const START_COL_PART_C = 42;  // PHẢI LÀ 42, KHÔNG PHẢI 40!
```

Nếu vẫn là 40, profile sẽ đọc sai dữ liệu!

### 5. Kiểm tra quyền truy cập

Đảm bảo Apps Script có quyền:
- ✅ Truy cập Google Drive
- ✅ Tạo file mới
- ✅ Đọc/ghi Google Sheets

Khi chạy lần đầu, Google sẽ hỏi authorize → Click **Allow**

## 🔧 Giải pháp nhanh

### Option 1: Chạy manual sau mỗi lần submit

1. Sau khi submit form
2. Mở Apps Script Editor
3. Chọn function `generateProfiles`
4. Click **Run**

### Option 2: Fix trigger tự động

Kiểm tra trong `Code.gs`, dòng 26-28:
```javascript
try {
  generateProfiles();  // ← Dòng này phải có
} catch (error) {
  Logger.log('Lỗi khi chạy generateProfiles: ' + error.message);
}
```

### Option 3: Thêm log để debug

Thêm log vào `Code.gs`:
```javascript
// Sau dòng sheet.appendRow(rowData);
Logger.log('Đã ghi dữ liệu vào sheet');
Logger.log('Bắt đầu chạy generateProfiles...');

try {
  generateProfiles();
  Logger.log('✅ generateProfiles chạy thành công!');
} catch (error) {
  Logger.log('❌ LỖI generateProfiles: ' + error.message);
  Logger.log('Stack trace: ' + error.stack);
}
```

## 📊 Checklist Debug

- [ ] File `generateProfiles.gs` đã được tạo và save
- [ ] `TEMPLATE_ID` đúng (test bằng cách mở URL)
- [ ] `OUTPUT_FOLDER_ID` đúng (test bằng cách mở URL)
- [ ] `SHEET_NAME` khớp với tên sheet
- [ ] `START_COL_PART_C = 42` (không phải 40)
- [ ] Template có đầy đủ placeholders (copy từ `TEMPLATE_PROFILE.txt`)
- [ ] Apps Script có quyền truy cập Drive và Sheets
- [ ] Chạy manual `generateProfiles()` thành công
- [ ] Kiểm tra Execution log không có lỗi

## 🎯 Expected Behavior

Sau khi submit form:
1. **~2 giây**: Dữ liệu xuất hiện trong Google Sheet
2. **~5-10 giây**: Apps Script tự động chạy `generateProfiles()`
3. **~10-20 giây**: 2 file PDF xuất hiện trong thư mục:
   - `Profile - [Họ tên].pdf`
   - `Nhu cầu mong muốn - [Họ tên].pdf`

## 📞 Quick Fix Commands

### Xem log gần nhất:
```javascript
// Trong Apps Script Editor > Executions
// Hoặc: View > Logs
```

### Force run generateProfiles:
```javascript
// Chọn function: generateProfiles
// Click: Run
```

### Test doPost manually:
```javascript
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        sheetId: '1_7lq6bYecw-vz98RsMnCuR0sVJOeM2zsHEl1iEVPW2E',
        data: ['test', 'test', 'test'] // ... your test data
      })
    }
  };
  
  doPost(testData);
}
```

---

**Nếu vẫn không được, vui lòng check Apps Script Executions log và gửi error message cụ thể!**


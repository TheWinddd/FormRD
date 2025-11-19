# 📧📱 CẬP NHẬT: Đã thêm Email và Số điện thoại

## ✅ Những gì đã được cập nhật

### 1. **React App** (`src/services/googleSheets.ts`)
- ✅ Thêm mapping cho Email (cột F)
- ✅ Thêm mapping cho Số điện thoại (cột G)
- ✅ Shift tất cả cột sau đó sang 2 cột

### 2. **Google Apps Script** 
#### `google-apps-script/Code.gs`
- ✅ Thêm headers "Email liên hệ" và "Số điện thoại"

#### `google-apps-script/generateProfiles.gs`
- ✅ Đọc Email từ cột F
- ✅ Đọc Số điện thoại từ cột G
- ✅ Cập nhật mapping tất cả các cột
- ✅ **Cập nhật `START_COL_PART_C` từ 40 → 42**

### 3. **Template** (`TEMPLATE_PROFILE.txt`)
- ✅ Thêm placeholder `{{Email}}`
- ✅ Thêm placeholder `{{SoDienThoai}}`

### 4. **Documentation**
- ✅ `SETUP_GOOGLE_SHEETS.md`: Cập nhật hướng dẫn
- ✅ `CHECKLIST_SETUP.md`: Checklist setup chi tiết
- ✅ `GOOGLE_SHEETS_COLUMNS.md`: Bảng mapping cột

## 🔄 Thay đổi cấu trúc Google Sheets

### Trước đây (73 cột):
```
A: Timestamp
B-J: Thông tin cá nhân (9 cột)
K-T: Nền tảng (10 cột)
U-AM: Chuyên môn (18 cột)
AN-AW: Nhu cầu nền tảng
AX: Nền tảng khác
AY-BR: Nhu cầu chuyên môn
BS: Chuyên môn khác
BT-BU: Khó khăn & đề xuất
```

### Hiện tại (75 cột):
```
A: Timestamp
B-L: Thông tin cá nhân (11 cột) ✨ +2 cột
    └─ F: Email ✨
    └─ G: Số điện thoại ✨
M-V: Nền tảng (10 cột)
W-AO: Chuyên môn (18 cột)
AP-AY: Nhu cầu nền tảng
AZ: Nền tảng khác
BA-BT: Nhu cầu chuyên môn
BU: Chuyên môn khác
BV-BW: Khó khăn & đề xuất
```

## 🚀 Bạn cần làm gì?

### Nếu chưa setup:
1. ✅ Follow hướng dẫn trong `CHECKLIST_SETUP.md`
2. ✅ Sử dụng template mới từ `TEMPLATE_PROFILE.txt`
3. ✅ Đảm bảo `START_COL_PART_C = 42` trong AppScript

### Nếu đã setup trước đây:
1. ⚠️ **CẬP NHẬT AppScript**:
   - Copy lại code từ `google-apps-script/Code.gs`
   - Copy lại code từ `google-apps-script/generateProfiles.gs`
   - **QUAN TRỌNG**: Đổi `START_COL_PART_C = 42` (từ 40)

2. ⚠️ **CẬP NHẬT Template Google Docs**:
   - Thêm dòng: `- Email liên hệ: {{Email}}`
   - Thêm dòng: `- Số điện thoại: {{SoDienThoai}}`

3. ⚠️ **CẬP NHẬT React App**:
   - Pull code mới nhất từ repository
   - Chạy `npm install` (nếu cần)

4. ✅ **Test lại**:
   - Điền form mới
   - Kiểm tra Email và Phone trong Google Sheet
   - Kiểm tra Email và Phone trong Profile PDF

## 📊 Chi tiết Mapping

| Field | Cột Cũ | Cột Mới | Thay đổi |
|-------|---------|---------|----------|
| Timestamp | A | A | - |
| Họ và tên | B | B | - |
| Đơn vị | C | C | - |
| Phòng ban | D | D | - |
| Vị trí | E | E | - |
| **Email** | ❌ | **F** | ✨ MỚI |
| **Phone** | ❌ | **G** | ✨ MỚI |
| Số năm R&D | F | H | +2 |
| Bậc học | G | I | +2 |
| Chuyên ngành | H | J | +2 |
| Từ khóa | I | K | +2 |
| Dự án | J | L | +2 |
| Nền tảng 1 | K | M | +2 |
| ... | ... | ... | +2 |
| PHẦN C start | AN (40) | AP (42) | +2 |

## 🐛 Lý do không gửi được dữ liệu

Nếu bạn không gửi được dữ liệu, có thể do:

### 1. ❌ Chưa tạo file `.env.local`
**Giải pháp**:
```bash
# Copy file example
cp .env.local.example .env.local

# Chỉnh sửa với thông tin thực tế
VITE_GOOGLE_SHEET_ID=your_actual_sheet_id
VITE_GOOGLE_WEB_APP_URL=your_actual_web_app_url
```

### 2. ❌ Web App URL sai hoặc chưa deploy
**Giải pháp**:
- Mở Apps Script Editor
- Deploy > New deployment
- Copy URL chính xác
- Paste vào `.env.local`

### 3. ❌ Web App access không phải "Anyone"
**Giải pháp**:
- Deploy > Manage deployments
- Edit deployment
- Who has access: **Anyone**

### 4. ❌ Sheet ID sai
**Giải pháp**:
- Mở Google Sheet
- Copy ID từ URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- Paste vào `.env.local`

### 5. ❌ Browser cache
**Giải pháp**:
```bash
# Stop server
Ctrl+C

# Clear cache và restart
npm run dev
```

## 📝 Checklist Test

- [ ] Form hiển thị đúng trường Email và Phone
- [ ] Có thể nhập Email và Phone
- [ ] Submit form thành công
- [ ] Dữ liệu xuất hiện trong Google Sheet cột F và G
- [ ] Profile PDF có Email và Phone
- [ ] Format Email và Phone hiển thị đúng

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Check Console browser (F12)
2. Check Apps Script Executions log
3. Verify tất cả ID đúng
4. Test Web App URL trực tiếp trên browser

---

**Happy coding! 🎉**


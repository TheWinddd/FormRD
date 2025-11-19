# ✅ CHECKLIST SETUP HOÀN CHỈNH

## 📋 Bước 1: Chuẩn bị Google Drive

### 1.1 Google Sheet
- [ ] Tạo Google Sheet mới
- [ ] Đặt tên sheet đầu tiên là **"sheet1"**
- [ ] Copy **Sheet ID** từ URL (giữa `/d/` và `/edit`)
  ```
  https://docs.google.com/spreadsheets/d/[SHEET_ID_NÀY]/edit
  ```
- [ ] Lưu Sheet ID vào notepad

### 1.2 Template Google Docs
- [ ] Tạo Google Docs mới
- [ ] Copy nội dung từ file `TEMPLATE_PROFILE.txt` vào Docs
- [ ] Đảm bảo tất cả placeholder có dạng `{{TenBien}}`
- [ ] Quan trọng: Phải có `{{Email}}` và `{{SoDienThoai}}`
- [ ] Copy **Template ID** từ URL
- [ ] Lưu Template ID vào notepad

### 1.3 Thư mục Output
- [ ] Tạo thư mục mới trên Google Drive
- [ ] Đặt tên: "R&D Profiles Output" (hoặc tùy ý)
- [ ] Copy **Folder ID** từ URL
- [ ] Lưu Folder ID vào notepad

## 📝 Bước 2: Setup Google Apps Script

### 2.1 Mở Apps Script
- [ ] Mở Google Sheet vừa tạo
- [ ] Vào menu **Extensions > Apps Script**
- [ ] Xóa code mặc định trong `Code.gs`

### 2.2 Thêm Code.gs
- [ ] Copy toàn bộ nội dung file `google-apps-script/Code.gs`
- [ ] Paste vào Apps Script Editor
- [ ] **Save** (Ctrl+S / Cmd+S)

### 2.3 Thêm generateProfiles.gs
- [ ] Click nút **+** bên cạnh Files
- [ ] Chọn **Script**
- [ ] Đặt tên: `generateProfiles`
- [ ] Copy toàn bộ nội dung file `google-apps-script/generateProfiles.gs`
- [ ] Paste vào file mới
- [ ] **Save**

### 2.4 Cấu hình Variables
Trong file `generateProfiles.gs`, sửa dòng 11-14:

```javascript
const SHEET_NAME = 'sheet1';              // Tên sheet (mặc định: sheet1)
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // Thay bằng Template ID đã lưu
const OUTPUT_FOLDER_ID = 'YOUR_FOLDER_ID'; // Thay bằng Folder ID đã lưu
const START_COL_PART_C = 42;              // GIỮ NGUYÊN SỐ 42
```

- [ ] Thay `YOUR_TEMPLATE_ID` bằng Template ID thực tế
- [ ] Thay `YOUR_FOLDER_ID` bằng Folder ID thực tế
- [ ] Kiểm tra `SHEET_NAME` đúng với tên sheet
- [ ] **QUAN TRỌNG**: Giữ nguyên `START_COL_PART_C = 42`
- [ ] **Save**

### 2.5 Deploy Web App
- [ ] Click nút **Deploy** (góc trên bên phải)
- [ ] Chọn **New deployment**
- [ ] Click icon ⚙️ > Chọn **Web app**
- [ ] Cấu hình:
  - Description: "R&D Profile Builder"
  - Execute as: **Me**
  - Who has access: **Anyone**
- [ ] Click **Deploy**
- [ ] Click **Authorize access**
- [ ] Chọn tài khoản Google
- [ ] Click **Advanced** > **Go to [Project] (unsafe)**
- [ ] Click **Allow**
- [ ] Copy **Web App URL** (dạng: `https://script.google.com/.../exec`)
- [ ] Lưu URL vào notepad

### 2.6 Test AppScript (Optional)
- [ ] Trong Apps Script Editor, chọn function `generateProfiles`
- [ ] Click **Run**
- [ ] Xem log để đảm bảo không có lỗi

## ⚙️ Bước 3: Cấu hình React App

### 3.1 Clone Repository
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_FOLDER>
```

- [ ] Clone repository thành công
- [ ] Navigate vào thư mục project

### 3.2 Install Dependencies
```bash
npm install
```

- [ ] Tất cả dependencies đã được cài đặt
- [ ] Không có lỗi cài đặt

### 3.3 Tạo file .env.local
- [ ] Tạo file mới tên `.env.local` ở thư mục gốc
- [ ] Copy nội dung từ `.env.local.example`:

```env
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
VITE_GOOGLE_WEB_APP_URL=https://script.google.com/macros/s/your_deployment_id/exec
```

- [ ] Thay `your_google_sheet_id_here` bằng Sheet ID thực tế
- [ ] Thay URL bằng Web App URL đã copy
- [ ] **Save** file

### 3.4 Chạy Development Server
```bash
npm run dev
```

- [ ] Server chạy thành công
- [ ] Mở browser tại `http://localhost:5173`
- [ ] Form hiển thị đúng

## 🧪 Bước 4: Test Toàn Bộ Hệ Thống

### 4.1 Test Web App Endpoint
- [ ] Mở browser
- [ ] Paste Web App URL vào address bar
- [ ] Bấm Enter
- [ ] Kết quả: Thấy text "Google Sheets Web App is running!"

### 4.2 Test Form Submit
- [ ] Mở form tại `http://localhost:5173`
- [ ] Điền đầy đủ thông tin:
  - [ ] Email liên hệ
  - [ ] Số điện thoại
  - [ ] Họ và tên
  - [ ] Đơn vị, Phòng ban
  - [ ] Vị trí công tác
  - [ ] Số năm kinh nghiệm
  - [ ] Bậc học
  - [ ] Chuyên ngành
  - [ ] 1-5 từ khóa chuyên sâu
  - [ ] Dự án R&D nổi bật
- [ ] Đánh giá năng lực (Step 2-3)
- [ ] Chọn nhu cầu đào tạo (Step 4)
- [ ] Review và Submit
- [ ] Thấy toast: "Đang gửi dữ liệu lên Google Sheets..."
- [ ] Sau đó thấy: "Đã gửi phiếu khảo sát thành công!"

### 4.3 Kiểm tra Google Sheet
- [ ] Mở Google Sheet
- [ ] Thấy dữ liệu mới được thêm vào
- [ ] Kiểm tra các cột:
  - [ ] A: Timestamp
  - [ ] B: Họ và tên
  - [ ] C: Đơn vị
  - [ ] D: Phòng ban
  - [ ] E: Vị trí
  - [ ] F: **Email** (MỚI)
  - [ ] G: **Số điện thoại** (MỚI)
  - [ ] H: Số năm R&D
  - [ ] I: Bậc học
  - [ ] J: Chuyên ngành
  - [ ] K: Từ khóa
  - [ ] L: Dự án

### 4.4 Kiểm tra File Output
- [ ] Mở thư mục Output trên Google Drive
- [ ] Thấy 2 file mới:
  - [ ] `Profile - [Họ tên].pdf`
  - [ ] `Nhu cầu mong muốn - [Họ tên].pdf`
- [ ] Mở file Profile PDF:
  - [ ] Họ và tên đúng
  - [ ] **Email đúng** ✨
  - [ ] **Số điện thoại đúng** ✨
  - [ ] Các thông tin khác đúng
  - [ ] Năng lực hiển thị đúng format
- [ ] Mở file Nhu cầu mong muốn PDF:
  - [ ] Nhu cầu được phân loại đúng
  - [ ] Format đẹp

## 🔍 Bước 5: Troubleshooting

### Nếu không gửi được dữ liệu:

#### Kiểm tra Console Browser
- [ ] Mở DevTools (F12)
- [ ] Tab Console
- [ ] Có lỗi không?
  - Nếu lỗi CORS: OK, đây là bình thường với `no-cors` mode
  - Nếu lỗi 404: Kiểm tra lại Web App URL
  - Nếu lỗi khác: Copy lỗi và debug

#### Kiểm tra Apps Script Logs
- [ ] Mở Apps Script Editor
- [ ] Vào **View > Executions**
- [ ] Xem log của lần chạy gần nhất
- [ ] Có lỗi không?
  - Nếu "Sheet not found": Kiểm tra `SHEET_NAME`
  - Nếu "Template not found": Kiểm tra `TEMPLATE_ID`
  - Nếu "Folder not found": Kiểm tra `OUTPUT_FOLDER_ID`

#### Kiểm tra .env.local
- [ ] File `.env.local` tồn tại ở thư mục gốc
- [ ] Không có khoảng trắng thừa trong ID
- [ ] URL đầy đủ và đúng

#### Kiểm tra Template
- [ ] Template có placeholder `{{Email}}`
- [ ] Template có placeholder `{{SoDienThoai}}`
- [ ] Tất cả placeholder đều có dạng `{{TenBien}}`

## 📊 Cấu trúc Cột Sau Khi Thêm Email & Phone

### Thay đổi quan trọng:
- **Trước**: 73 cột (A-BU)
- **Sau**: 75 cột (A-BW)
- **Thêm**: F (Email) và G (Số điện thoại)
- **START_COL_PART_C**: 40 → **42** (shift 2 cột)

### Mapping mới:
| Phần | Cột | Nội dung |
|------|-----|----------|
| A | A-L | Thông tin cá nhân (thêm Email + Phone) |
| B | M-AO | Năng lực (shift 2 cột) |
| C | AP-BW | Nhu cầu đào tạo (shift 2 cột) |

## ✅ HOÀN TẤT!

Nếu tất cả checkbox đã tích ✅, hệ thống đã sẵn sàng!

### Sử dụng hàng ngày:
1. User điền form
2. Submit
3. Tự động ghi vào Google Sheet
4. Tự động tạo Profile PDF
5. Tự động tạo Nhu cầu mong muốn PDF

### Lưu ý bảo mật:
- ⚠️ **KHÔNG commit** file `.env.local` lên Git
- ⚠️ Web App URL là public, ai có URL đều gửi được dữ liệu
- ✅ Cân nhắc thêm validation hoặc authentication nếu cần

---

**Chúc mừng bạn đã setup thành công! 🎉**


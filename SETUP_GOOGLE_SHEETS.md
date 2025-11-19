# Hướng dẫn Setup Tích hợp Google Sheets

Hướng dẫn chi tiết để kết nối form React với Google Sheets và tự động tạo Profile bằng AppScript.

## 📋 Tổng quan

Hệ thống hoạt động theo luồng sau:

1. **User điền form** trên React app
2. **React app gửi dữ liệu** lên Google Apps Script Web App
3. **AppScript nhận dữ liệu** và ghi vào Google Sheets
4. **AppScript tự động chạy** hàm `generateProfiles()` để tạo:
   - Profile - Họ tên.pdf
   - Nhu cầu mong muốn - Họ tên.pdf

## 🔧 Bước 1: Chuẩn bị Google Sheet

### 1.1 Tạo Google Sheet mới

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một sheet mới
3. Đặt tên sheet là `sheet1` (hoặc tên khác nhưng nhớ update trong code)
4. **LƯU Ý ID của Sheet**: Copy ID từ URL
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

### 1.2 Tạo Template Google Docs cho Profile

1. Tạo một Google Docs mới
2. Thiết kế template với các placeholder:
   ```
   Họ và tên: {{HoTen}}
   Đơn vị: {{DonVi}}
   Phòng ban: {{PhongBan}}
   Vị trí: {{ViTri}}
   
   ...và các placeholder khác theo nhu cầu...
   ```
3. Lưu ID của file template này

### 1.3 Tạo thư mục Output

1. Tạo một thư mục trên Google Drive để chứa các file Profile được tạo ra
2. Lưu ID của thư mục này

## 🔧 Bước 2: Setup Google Apps Script

### 2.1 Mở Apps Script Editor

1. Mở Google Sheet vừa tạo
2. Vào menu **Extensions > Apps Script**
3. Xóa code mặc định

### 2.2 Thêm file Code.gs

1. Trong Apps Script Editor, đảm bảo file `Code.gs` đang được chọn
2. Copy toàn bộ nội dung từ file `google-apps-script/Code.gs` trong project
3. Paste vào Apps Script Editor

### 2.3 Thêm file generateProfiles.gs

1. Click nút **+** bên cạnh "Files"
2. Chọn **Script**
3. Đặt tên file: `generateProfiles`
4. Copy toàn bộ nội dung từ file `google-apps-script/generateProfiles.gs`
5. Paste vào file mới tạo

### 2.4 Cấu hình các biến trong generateProfiles.gs

Sửa 4 dòng đầu tiên trong file `generateProfiles.gs`:

```javascript
const SHEET_NAME = 'sheet1';              // Tên sheet chứa dữ liệu
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ID file Google Docs template
const OUTPUT_FOLDER_ID = 'YOUR_FOLDER_ID'; // ID thư mục output
const START_COL_PART_C = 42;              // Cột bắt đầu PHẦN C (AP=42) - ĐÃ CẬP NHẬT DO THÊM EMAIL & PHONE
```

⚠️ **QUAN TRỌNG**: 
- Thay `YOUR_TEMPLATE_ID` và `YOUR_FOLDER_ID` bằng ID đã lưu ở Bước 1
- **GIỮ NGUYÊN** `START_COL_PART_C = 42` (đã cập nhật từ 40 do thêm 2 cột Email và Phone)

### 2.5 Deploy Web App

1. Click nút **Deploy** (góc trên bên phải)
2. Chọn **New deployment**
3. Click vào icon ⚙️ bên cạnh "Select type"
4. Chọn **Web app**
5. Cấu hình deployment:
   - **Description**: "R&D Profile Builder Web App"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
   
   ⚠️ **LƯU Ý**: Chọn "Anyone" để form có thể gửi dữ liệu mà không cần đăng nhập

6. Click **Deploy**
7. Click **Authorize access**
8. Chọn tài khoản Google của bạn
9. Click **Advanced** > **Go to [Project name] (unsafe)** > **Allow**
10. **LƯU LẠI WEB APP URL** - URL sẽ có dạng:
    ```
    https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec
    ```

## 🔧 Bước 3: Cấu hình React App

### 3.1 Tạo file .env.local

1. Trong thư mục gốc của project React, tạo file `.env.local`
2. Copy nội dung từ `.env.local.example`:
   ```env
   VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
   VITE_GOOGLE_WEB_APP_URL=https://script.google.com/macros/s/your_deployment_id/exec
   ```
3. Thay thế:
   - `your_google_sheet_id_here` bằng Sheet ID từ Bước 1.1
   - `your_deployment_id` bằng Deployment ID từ Bước 2.5

### 3.2 Cài đặt dependencies

```bash
npm install
```

### 3.3 Chạy development server

```bash
npm run dev
```

## 🧪 Bước 4: Test Hệ thống

### 4.1 Test Web App

1. Mở trình duyệt và truy cập URL Web App từ Bước 2.5
2. Bạn sẽ thấy text: "Google Sheets Web App is running!"
3. Nếu thấy lỗi, kiểm tra lại quyền truy cập trong deployment settings

### 4.2 Test Form

1. Mở React app (`http://localhost:5173`)
2. Điền đầy đủ thông tin trong form
3. Submit form
4. Kiểm tra:
   - Console browser không có lỗi
   - Dữ liệu đã được ghi vào Google Sheet
   - Các file Profile và Nhu cầu mong muốn đã được tạo trong thư mục Output

### 4.3 Troubleshooting

#### Lỗi CORS

- **Nguyên nhân**: Google Apps Script Web App yêu cầu `mode: 'no-cors'`
- **Giải pháp**: Code đã được cấu hình đúng, không cần thay đổi

#### Không thấy dữ liệu trong Sheet

- Kiểm tra `VITE_GOOGLE_SHEET_ID` trong `.env.local`
- Kiểm tra quyền truy cập của Web App (phải là "Anyone")
- Xem log trong Apps Script Editor: View > Logs

#### Không tạo được Profile

- Kiểm tra `TEMPLATE_ID` và `OUTPUT_FOLDER_ID` trong `generateProfiles.gs`
- Đảm bảo tài khoản Google có quyền truy cập template và thư mục output
- Xem log chi tiết trong Apps Script: View > Executions

## 📊 Cấu trúc Dữ liệu Google Sheets

### Headers (Dòng 1)

Google Sheet sẽ có các cột theo thứ tự:

| Cột | Tên cột | Mô tả |
|-----|---------|-------|
| A | Timestamp | Thời gian submit |
| B | Họ và tên | |
| C | Đơn vị | |
| D | Phòng ban | |
| E | Vị trí công tác | |
| **F** | **Email liên hệ** ✨ | **MỚI THÊM** |
| **G** | **Số điện thoại** ✨ | **MỚI THÊM** |
| H | Số năm kinh nghiệm R&D | |
| I | Bậc học | |
| J | Chuyên ngành | |
| K | Từ khóa chuyên sâu | |
| L | Các dự án R&D nổi bật | |
| M-V | **10 Năng lực NỀN TẢNG** | Điểm tự đánh giá (0-4) |
| W-AO | **18 Năng lực CHUYÊN MÔN** | Điểm tự đánh giá (0-4) |
| AP-AY | **Nhu cầu đào tạo Nền tảng** | Mức độ ưu tiên |
| AZ | Năng lực Nền tảng khác | Text tự do |
| BA-BT | **Nhu cầu đào tạo Chuyên môn** | Mức độ ưu tiên |
| BU | Năng lực Chuyên môn khác | Text tự do |
| BV | Khó khăn hiện tại | Text tự do |
| BW | Đề xuất chương trình đào tạo | Text tự do |

### Format dữ liệu

#### Năng lực (Cột K-AM)
```
0: Chưa có kiến thức/Kỹ năng
1: Cơ bản
2: Áp dụng
3: Thành thạo
4: Chuyên gia
```

#### Nhu cầu đào tạo (Cột AN-BR)
```
0: Không phù hợp với chuyên môn của tôi
1: Sẽ học nếu có thời gian (chưa phải là ưu tiên trong năm tới)
2: Muốn được học ngay (Ưu tiên cao trong năm tới)
```

## 🔄 Cập nhật và Bảo trì

### Cập nhật AppScript

1. Mở Apps Script Editor
2. Sửa code
3. **Lưu** (Ctrl+S hoặc Cmd+S)
4. **Không cần deploy lại** - code mới sẽ tự động áp dụng

### Tạo deployment mới (nếu cần)

1. Click **Deploy** > **Manage deployments**
2. Click **New deployment**
3. Làm theo Bước 2.5

### Xem logs và debug

1. Trong Apps Script Editor, vào **View > Logs** hoặc **View > Executions**
2. Xem chi tiết các lần chạy hàm và lỗi (nếu có)

## ⚙️ Tùy chỉnh

### Thay đổi tên sheet

Sửa `SHEET_NAME` trong `generateProfiles.gs`:
```javascript
const SHEET_NAME = 'ten_sheet_moi';
```

### Thay đổi cột bắt đầu PHẦN C

⚠️ **QUAN TRỌNG**: Hiện tại đã có Email và Phone, nên:
```javascript
const START_COL_PART_C = 42; // ĐÃ CẬP NHẬT (trước đây là 40)
```

Nếu thêm/bớt cột trong PHẦN A hoặc PHẦN B, cần update số này.

### Thêm/bớt năng lực

1. Update mảng `coreSkills` và `specSkills` trong `generateProfiles.gs`
2. Update form React (Step2, Step3, Step4)
3. Update mapping trong `src/services/googleSheets.ts`

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra Console browser (F12)
2. Kiểm tra Apps Script Logs
3. Đảm bảo các ID (Sheet, Template, Folder) đúng
4. Đảm bảo quyền truy cập đúng

## ✅ Checklist Setup

- [ ] Tạo Google Sheet và lưu ID
- [ ] Tạo Template Docs và lưu ID
- [ ] Tạo thư mục Output và lưu ID
- [ ] Copy code vào Apps Script (Code.gs và generateProfiles.gs)
- [ ] Cấu hình 3 biến: TEMPLATE_ID, OUTPUT_FOLDER_ID, SHEET_NAME
- [ ] Deploy Web App và lưu URL
- [ ] Tạo `.env.local` với SHEET_ID và WEB_APP_URL
- [ ] Test form và kiểm tra kết quả

---

**Chúc bạn setup thành công! 🎉**


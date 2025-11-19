# R&D Profile Builder - Hệ thống Khảo sát Năng lực R&D

## Giới thiệu

Ứng dụng khảo sát và xây dựng hồ sơ năng lực R&D cho nhân sự, tích hợp với Google Sheets để tự động tạo Profile và Nhu cầu đào tạo cá nhân.

## Project info

**URL**: https://lovable.dev/projects/d0b58fb5-864d-40de-8288-12fb75874594

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d0b58fb5-864d-40de-8288-12fb75874594) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Sheets API
- Google Apps Script

## 🚀 Tính năng chính

### 1. Form khảo sát đa bước
- **Bước 1**: Thông tin cá nhân và học vấn
- **Bước 2**: Đánh giá năng lực nền tảng (10 năng lực)
- **Bước 3**: Đánh giá năng lực chuyên môn (18 năng lực)
- **Bước 4**: Nhu cầu đào tạo và phát triển
- **Bước 5**: Xem lại và xác nhận

### 2. Tích hợp Google Sheets
- Tự động gửi dữ liệu lên Google Sheets
- Tự động trigger AppScript để tạo Profile
- Xuất file PDF cho từng nhân sự:
  - Profile - Họ tên.pdf
  - Nhu cầu mong muốn - Họ tên.pdf

### 3. Giao diện hiện đại
- Responsive design
- Loading states
- Validation form
- Toast notifications

## ⚙️ Setup Google Sheets Integration

Xem hướng dẫn chi tiết trong file [SETUP_GOOGLE_SHEETS.md](./SETUP_GOOGLE_SHEETS.md)

### Quick Start

1. **Tạo file `.env.local`** từ `.env.local.example`:
```bash
cp .env.local.example .env.local
```

2. **Cấu hình environment variables**:
```env
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
VITE_GOOGLE_WEB_APP_URL=https://script.google.com/macros/s/your_deployment_id/exec
```

3. **Setup Google Apps Script**:
   - Copy code từ `google-apps-script/Code.gs` và `google-apps-script/generateProfiles.gs`
   - Deploy as Web App
   - Update URL vào `.env.local`

Xem chi tiết trong [SETUP_GOOGLE_SHEETS.md](./SETUP_GOOGLE_SHEETS.md)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d0b58fb5-864d-40de-8288-12fb75874594) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

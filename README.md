# DRW Foundation Website

Website resmi DRW Foundation - Yayasan Sosial dan Kemanusiaan

**Live URL:** https://drwfoundation.vercel.app

---

## 📋 Deskripsi Project

Website DRW Foundation adalah platform digital untuk:
- Menampilkan program-program yayasan
- Publikasi berita dan kegiatan
- Laporan keuangan dan transparansi
- Admin panel untuk mengelola konten

**Tech Stack:**
- **Framework:** Next.js 16.1.4 (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Storage:** GitHub (untuk konten artikel, gambar, dll)
- **Admin Auth:** Simple password-based authentication

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 22.13.0)
- npm atau pnpm
- Git
- GitHub account
- Vercel account (untuk deployment)

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/multimediadrw/drwfoundation.git
   cd drwfoundation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   
   Buat file `.env.local` di root directory:
   ```env
   # GitHub Configuration
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_OWNER=multimediadrw
   GITHUB_REPO=drwfoundation
   GITHUB_BRANCH=main

   # Admin Authentication
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=drwfoundation2024
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   - Website: http://localhost:3000
   - Admin panel: http://localhost:3000/admin/login

---

## 📁 Struktur Project

```
drwfoundation/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── tentang/             # About page
│   ├── program/             # Programs page
│   ├── berita/              # News page
│   ├── laporan/             # Reports page
│   ├── admin/               # Admin panel
│   └── api/                 # API routes
├── components/              # React components
├── lib/                     # Utility functions
├── content/                 # Content storage (Markdown)
├── public/                  # Static assets
└── data/                    # JSON data
```

---

## 🔧 Environment Variables

**Required:**
- `GITHUB_TOKEN` - GitHub Personal Access Token (dengan repo access)
- `GITHUB_OWNER` - GitHub username (default: multimediadrw)
- `GITHUB_REPO` - Repository name (default: drwfoundation)
- `GITHUB_BRANCH` - Branch name (default: main)
- `ADMIN_USERNAME` - Admin username (default: admin)
- `ADMIN_PASSWORD` - Admin password (default: drwfoundation2024)

**Cara mendapatkan GitHub Token:**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy token dan paste ke `.env.local`

---

## 🚢 Deployment ke Vercel

1. **Push code ke GitHub**
2. **Import project di Vercel** dari GitHub
3. **Setup environment variables** di Vercel dashboard
4. **Deploy** - Vercel akan otomatis build dan deploy

**Custom Domain:**
- Add domain di Vercel project settings
- Update DNS records di domain provider
- Wait for DNS propagation

---

## 📝 Content Management

### Admin Panel

**Login:**
- URL: https://your-domain.com/admin/login
- Username: admin
- Password: drwfoundation2024

**Features:**
- Create/Edit/Delete articles
- Upload images
- Manage static pages
- Dual language support (ID/EN)

### Manual Content Management

**Artikel:**
- Location: `content/posts/`
- Format: Markdown (.md)

**Program:**
- Location: `content/programs/`
- Format: Markdown (.md)

**Static Pages:**
- Location: `content/pages/`
- Format: Markdown (.md)

---

## 🐛 Troubleshooting

### Build Errors

**"Module not found"**
```bash
rm -rf node_modules && npm install
```

**"GitHub API rate limit"**
- Pastikan `GITHUB_TOKEN` sudah di-set

### Deployment Issues

**Vercel deployment failed**
- Check build logs
- Verify environment variables
- Verify GitHub token

**Domain not working**
- Check DNS records
- Wait for DNS propagation (up to 48 hours)

---

## 📚 Additional Documentation

- `SETUP-CUSTOM-DOMAIN-GUIDE.md` - Setup custom domain
- `DELETE-ARTICLE-FIX.md` - Technical notes
- `BUG-FIX-REPORT.md` - Bug fix history

---

## 📞 Support

**Resources:**
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

## 📄 License

Copyright © 2026 DRW Foundation. All rights reserved.

---

**Developed by:** Manus AI Assistant  
**Date:** January 2026

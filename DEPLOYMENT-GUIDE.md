# Panduan Deployment DRW Foundation Website

Panduan lengkap untuk deploy website DRW Foundation dari awal.

---

## 📋 Prerequisites

Sebelum mulai, pastikan Anda sudah punya:
- [ ] GitHub account
- [ ] Vercel account
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Source code project (ZIP file atau Git repository)

---

## 🚀 Step 1: Setup GitHub Repository

### 1.1 Create New Repository

1. Go to: https://github.com/new
2. Repository name: `drwfoundation`
3. Description: "DRW Foundation Website"
4. Visibility: **Private** (recommended) atau Public
5. **JANGAN** initialize dengan README, .gitignore, atau license
6. Click **"Create repository"**

### 1.2 Push Code ke GitHub

**Jika Anda punya source code di local:**

```bash
cd /path/to/drwfoundation
git init
git add .
git commit -m "Initial commit - DRW Foundation Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drwfoundation.git
git push -u origin main
```

**Jika Anda extract dari ZIP:**

```bash
unzip drwfoundation-backup.zip
cd drwfoundation
git init
git add .
git commit -m "Initial commit from backup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drwfoundation.git
git push -u origin main
```

### 1.3 Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** > **"Generate new token (classic)"**
3. Note: "DRW Foundation Website"
4. Expiration: **No expiration** (atau pilih durasi)
5. Select scopes:
   - [x] **repo** (Full control of private repositories)
6. Click **"Generate token"**
7. **COPY TOKEN** dan simpan di tempat aman (akan digunakan nanti)

---

## 🌐 Step 2: Deploy ke Vercel

### 2.1 Import Project

1. Go to: https://vercel.com/new
2. Login dengan GitHub account
3. Click **"Import Git Repository"**
4. Pilih repository **"drwfoundation"**
5. Click **"Import"**

### 2.2 Configure Project

**Project Settings:**
- Framework Preset: **Next.js** (auto-detected)
- Root Directory: `./` (default)
- Build Command: `next build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Environment Variables:**

Click **"Add Environment Variable"** dan tambahkan:

| Name | Value | Notes |
|------|-------|-------|
| `GITHUB_TOKEN` | `ghp_xxxxxxxxxxxxx` | Token dari Step 1.3 |
| `GITHUB_OWNER` | `YOUR_USERNAME` | GitHub username Anda |
| `GITHUB_REPO` | `drwfoundation` | Repository name |
| `GITHUB_BRANCH` | `main` | Branch name |
| `ADMIN_USERNAME` | `admin` | Admin username |
| `ADMIN_PASSWORD` | `drwfoundation2024` | Admin password (ganti!) |

**PENTING:** Ganti `ADMIN_PASSWORD` dengan password yang kuat!

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Vercel akan build dan deploy project
4. Setelah selesai, Anda akan dapat URL: `https://drwfoundation-xxx.vercel.app`

### 2.4 Test Website

1. Buka URL deployment
2. Test homepage, about, program, berita, laporan
3. Test admin panel: `https://your-url.vercel.app/admin/login`
   - Username: `admin`
   - Password: (password yang Anda set)

---

## 🌍 Step 3: Setup Custom Domain (Optional)

### 3.1 Add Domain di Vercel

1. Go to project di Vercel
2. Click tab **"Settings"**
3. Click **"Domains"** di sidebar
4. Click **"Add"**
5. Enter domain: `drwfoundation.com`
6. Click **"Add"**

Vercel akan memberikan instruksi DNS records.

### 3.2 Update DNS di Domain Provider

**Jika menggunakan Cloudflare:**

1. Login ke Cloudflare Dashboard
2. Pilih domain `drwfoundation.com`
3. Go to **"DNS"** > **"Records"**
4. **Hapus record lama** (jika ada)
5. **Tambahkan record baru** sesuai instruksi Vercel:

**Untuk root domain (@):**
```
Type: A
Name: @
Value: 76.76.21.21
Proxy: DNS only (gray cloud)
TTL: Auto
```

**Untuk www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (atau value dari Vercel)
Proxy: DNS only (gray cloud)
TTL: Auto
```

6. Click **"Save"**

### 3.3 Verify Domain

1. Kembali ke Vercel Dashboard
2. Wait 5-10 minutes untuk DNS propagation
3. Click **"Refresh"** di Vercel
4. Status domain akan berubah dari "Pending" ke "Valid"
5. SSL certificate akan otomatis di-generate

### 3.4 Test Custom Domain

1. Buka: https://drwfoundation.com
2. Pastikan website muncul dengan benar
3. Check SSL certificate (padlock icon di browser)

---

## 🔒 Step 4: Security Setup

### 4.1 Ganti Admin Password

**Via Environment Variables:**
1. Go to Vercel project settings
2. Environment Variables
3. Edit `ADMIN_PASSWORD`
4. Set password baru yang kuat
5. Click **"Save"**
6. Redeploy project (Vercel akan otomatis redeploy)

**Recommended password format:**
- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, simbol
- Contoh: `DRW@2026!SecurePass`

### 4.2 Enable Vercel Protection (Optional)

1. Go to project settings
2. **"Deployment Protection"**
3. Enable **"Vercel Authentication"** untuk preview deployments
4. Enable **"Password Protection"** jika ingin protect production

### 4.3 GitHub Repository Security

1. Set repository ke **Private** (jika belum)
2. Enable **"Branch protection rules"** untuk main branch:
   - Require pull request reviews
   - Require status checks
3. Enable **"Dependabot alerts"**

---

## 📊 Step 5: Monitoring & Maintenance

### 5.1 Vercel Analytics

1. Go to project di Vercel
2. Click tab **"Analytics"**
3. Monitor:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### 5.2 Error Monitoring

1. Go to **"Logs"** tab
2. Check for errors
3. Set up email notifications untuk errors

### 5.3 Regular Maintenance

**Weekly:**
- Check Vercel logs untuk errors
- Monitor website performance
- Backup content (sudah otomatis di GitHub)

**Monthly:**
- Update dependencies: `npm update`
- Check security alerts di GitHub
- Review analytics data

**Quarterly:**
- Update Next.js version
- Review dan update content
- Performance optimization

---

## 🆘 Troubleshooting

### Deployment Failed

**Error: "Build failed"**
- Check build logs di Vercel
- Verify `package.json` dependencies
- Try: `npm install && npm run build` locally

**Error: "Environment variables not set"**
- Check all required env vars di Vercel settings
- Redeploy after adding env vars

### Domain Issues

**Domain not working after 24 hours**
- Check DNS records di domain provider
- Verify proxy status = "DNS only" (gray cloud)
- Use https://dnschecker.org untuk check propagation

**SSL Certificate Error**
- Wait 10-15 minutes untuk Vercel generate certificate
- Check domain status di Vercel (harus "Valid")
- Try remove dan add domain lagi

### Admin Panel Issues

**Cannot login**
- Check `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di Vercel env vars
- Clear browser cache
- Try incognito mode

**Images not uploading**
- Check `GITHUB_TOKEN` permissions
- Verify token tidak expired
- Check file size (max 5MB)

---

## 📞 Support

**Jika ada masalah:**
1. Check troubleshooting section di atas
2. Check Vercel logs untuk error details
3. Check GitHub repository untuk code issues
4. Contact developer atau Vercel support

**Useful Links:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com

---

## ✅ Deployment Checklist

Sebelum go live, pastikan:
- [ ] Code sudah di-push ke GitHub
- [ ] Project sudah deployed di Vercel
- [ ] Environment variables sudah di-set
- [ ] Website accessible via Vercel URL
- [ ] Admin panel bisa login
- [ ] Custom domain sudah di-setup (jika ada)
- [ ] DNS records sudah di-update
- [ ] SSL certificate active
- [ ] Admin password sudah diganti
- [ ] Website tested di berbagai devices
- [ ] Content sudah di-review
- [ ] Analytics sudah di-setup

---

**Selamat! Website DRW Foundation sudah live! 🎉**

Jika ada pertanyaan atau butuh bantuan, jangan ragu untuk contact developer.

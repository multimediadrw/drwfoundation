# Environment Variables Configuration

Dokumentasi lengkap untuk environment variables yang dibutuhkan project DRW Foundation.

---

## 📋 Required Variables

### GitHub Configuration

**`GITHUB_TOKEN`**
- **Description:** GitHub Personal Access Token untuk read/write files via GitHub API
- **Required:** Yes
- **Example:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **How to get:**
  1. Go to: https://github.com/settings/tokens
  2. Click "Generate new token (classic)"
  3. Select scope: `repo` (Full control of private repositories)
  4. Copy token

**`GITHUB_OWNER`**
- **Description:** GitHub username atau organization name
- **Required:** Yes
- **Default:** `multimediadrw`
- **Example:** `your-github-username`

**`GITHUB_REPO`**
- **Description:** Repository name
- **Required:** Yes
- **Default:** `drwfoundation`
- **Example:** `drwfoundation`

**`GITHUB_BRANCH`**
- **Description:** Branch name untuk read/write files
- **Required:** Yes
- **Default:** `main`
- **Example:** `main` atau `master`

### Admin Authentication

**`ADMIN_USERNAME`**
- **Description:** Username untuk login admin panel
- **Required:** Yes
- **Default:** `admin`
- **Example:** `admin`
- **Security:** Bisa diganti dengan username lain

**`ADMIN_PASSWORD`**
- **Description:** Password untuk login admin panel
- **Required:** Yes
- **Default:** `drwfoundation2024`
- **Example:** `MySecurePassword123!`
- **Security:** **WAJIB DIGANTI** di production!

---

## 🔧 Setup Instructions

### Local Development

1. **Create `.env.local` file** di root directory:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** dan isi dengan values yang benar:
   ```env
   GITHUB_TOKEN=ghp_your_actual_token_here
   GITHUB_OWNER=multimediadrw
   GITHUB_REPO=drwfoundation
   GITHUB_BRANCH=main
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password_here
   ```

3. **Save file** dan restart dev server:
   ```bash
   npm run dev
   ```

### Vercel Deployment

1. **Go to Vercel project settings**
2. **Click "Environment Variables"**
3. **Add each variable:**
   - Name: `GITHUB_TOKEN`
   - Value: `ghp_xxxxxxxxxxxx`
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

4. **Repeat for all variables**

5. **Redeploy** project (Vercel akan otomatis redeploy setelah add env vars)

---

## 🔒 Security Best Practices

### 1. Never Commit `.env.local`

`.env.local` sudah ada di `.gitignore`. **JANGAN PERNAH** commit file ini ke Git!

```bash
# Check .gitignore
cat .gitignore | grep .env
# Should show: .env.local
```

### 2. Use Strong Passwords

**Bad password:**
- `admin123`
- `password`
- `drwfoundation`

**Good password:**
- `DRW@2026!SecurePass`
- `MyV3ry$tr0ngP@ssw0rd`
- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, simbol

### 3. Rotate GitHub Token Regularly

- Generate new token setiap 3-6 bulan
- Delete old token setelah update
- Update token di Vercel environment variables

### 4. Limit GitHub Token Scope

- Hanya berikan scope `repo` yang dibutuhkan
- Jangan berikan scope lain yang tidak perlu
- Review token permissions secara berkala

---

## 🧪 Testing Environment Variables

### Check if Variables are Loaded

**Local Development:**
```bash
# Run this in terminal
node -e "console.log(process.env.GITHUB_TOKEN ? 'GITHUB_TOKEN is set' : 'GITHUB_TOKEN is NOT set')"
```

**In Code:**
```typescript
// Check in API route or server component
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'Set' : 'Not set')
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME)
```

### Test GitHub API Connection

1. Login ke admin panel
2. Try upload image atau create article
3. Check if save to GitHub berhasil
4. Check GitHub repository untuk new commits

### Test Admin Authentication

1. Go to: http://localhost:3000/admin/login
2. Enter username dan password dari `.env.local`
3. Should be able to login successfully

---

## 🆘 Troubleshooting

### Error: "GitHub API rate limit exceeded"

**Cause:** `GITHUB_TOKEN` tidak di-set atau invalid

**Solution:**
1. Check `.env.local` file
2. Verify `GITHUB_TOKEN` value
3. Generate new token jika expired
4. Restart dev server

### Error: "Cannot login to admin panel"

**Cause:** `ADMIN_USERNAME` atau `ADMIN_PASSWORD` salah

**Solution:**
1. Check `.env.local` file
2. Verify credentials
3. Clear browser cache dan cookies
4. Try incognito mode
5. Restart dev server

### Error: "Failed to save to GitHub"

**Cause:** GitHub token tidak punya write permission

**Solution:**
1. Check token scopes di GitHub
2. Regenerate token dengan `repo` scope
3. Update `GITHUB_TOKEN` di `.env.local`
4. Restart dev server

### Variables Not Loading in Vercel

**Cause:** Environment variables belum di-set di Vercel

**Solution:**
1. Go to Vercel project settings
2. Environment Variables
3. Add all required variables
4. Select all environments (Production, Preview, Development)
5. Redeploy project

---

## 📝 Environment Variables Checklist

Sebelum deploy, pastikan semua variables sudah di-set:

**Local Development:**
- [ ] `.env.local` file created
- [ ] `GITHUB_TOKEN` set dengan valid token
- [ ] `GITHUB_OWNER` set dengan correct username
- [ ] `GITHUB_REPO` set dengan correct repo name
- [ ] `GITHUB_BRANCH` set dengan correct branch
- [ ] `ADMIN_USERNAME` set
- [ ] `ADMIN_PASSWORD` set dan diganti dari default
- [ ] Dev server bisa run tanpa error
- [ ] Admin panel bisa login
- [ ] Upload image berfungsi

**Vercel Production:**
- [ ] All variables added di Vercel settings
- [ ] Variables selected untuk Production environment
- [ ] `ADMIN_PASSWORD` diganti dari default
- [ ] Project deployed successfully
- [ ] Admin panel bisa login di production
- [ ] Upload image berfungsi di production

---

## 📞 Support

Jika ada pertanyaan tentang environment variables:
1. Check dokumentasi di atas
2. Check troubleshooting section
3. Verify all variables di `.env.local` dan Vercel
4. Contact developer jika masih ada masalah

---

**Last Updated:** January 2026

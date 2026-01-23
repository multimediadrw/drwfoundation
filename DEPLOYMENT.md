# 🚀 Deployment Guide - DRW Foundation Next.js

## ✅ Pre-Deployment Checklist

- [x] Next.js project built successfully (88 static pages generated)
- [x] 85 posts imported from WordPress
- [x] 8 pages imported from WordPress  
- [x] 47MB images copied from WordPress
- [x] Git repository initialized
- [x] Initial commit created

## 📋 Content Migration Status

### WordPress → Next.js Migration Complete

| Item | Count | Status |
|------|-------|--------|
| Blog Posts | 85 | ✅ Migrated |
| Pages | 8 | ✅ Migrated |
| Media Files | 47MB | ✅ Copied |
| Build Status | Success | ✅ Working |

## 🔧 Local URLs

- **WordPress (Docker)**: http://localhost:8094
- **Next.js Dev**: http://localhost:3000 (when running `npm run dev`)

## 📦 GitHub Deployment Steps

### 1. Prepare GitHub Repository

```bash
# Repository already created: drwfoundation
# Repository URL: https://github.com/[username]/drwfoundation.git
```

### 2. Push to GitHub

Ganti `[username]` dengan username GitHub Anda:

```bash
cd /root/drwfoundation-nextjs

# Add remote repository
git remote add origin https://github.com/[username]/drwfoundation.git

# or use SSH (recommended)
git remote add origin git@github.com:[username]/drwfoundation.git

# Push to GitHub
git push -u origin main
```

Jika menggunakan HTTPS, Anda akan diminta:
- Username GitHub
- Personal Access Token (bukan password!)

#### Cara Membuat Personal Access Token:

1. Buka: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Pilih scope: `repo` (full control of private repositories)
4. Click "Generate token"
5. Copy token dan gunakan sebagai password saat push

### 3. Deploy ke Vercel

#### A. Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**:
   - Kunjungi: https://vercel.com
   - Login with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select repository: `drwfoundation`
   - Framework Preset: **Next.js** (auto-detected)

3. **Configure Build Settings**:
   ```
   Build Command: next build
   Output Directory: .next
   Install Command: npm install
   Development Command: next dev
   ```

4. **Environment Variables** (optional):
   ```
   NODE_ENV=production
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 menit
   - Site akan live di: https://drwfoundation.vercel.app

#### B. Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /root/drwfoundation-nextjs
vercel --prod
```

### 4. Setup Custom Domain

#### A. Di Vercel Dashboard

1. Go to Project → Settings → Domains
2. Add domain:
   ```
   drwfoundation.com
   www.drwfoundation.com
   ```

3. Vercel akan memberikan DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

#### B. Update DNS di Domain Registrar

Login ke domain registrar (Namecheap, GoDaddy, dll) dan update DNS:

1. **A Record**:
   - Type: A
   - Host: @
   - Points to: 76.76.21.21
   - TTL: 3600

2. **CNAME Record**:
   - Type: CNAME
   - Host: www
   - Points to: cname.vercel-dns.com
   - TTL: 3600

3. **Save Changes** dan tunggu 5-15 menit untuk DNS propagation

### 5. Verify Deployment

#### Check DNS Propagation

```bash
# Check A record
dig drwfoundation.com

# Check CNAME
dig www.drwfoundation.com

# Or use online tools:
# https://dnschecker.org
```

#### Test URLs

- Main site: https://drwfoundation.com
- WWW: https://www.drwfoundation.com
- Blog post example: https://drwfoundation.com/posts/sejahterakan-guru-ngaji-drw-skincare-laksanakan-program-spp-apa-it

## 🔄 Future Updates

### Update Content

```bash
# Edit content in content/posts/ or content/pages/
# Example:
nano content/posts/new-article.md

# Commit and push
git add .
git commit -m "Add new article"
git push origin main

# Vercel will auto-deploy in 2-3 minutes
```

### Re-import from WordPress (if needed)

```bash
# Make sure WordPress Docker is running
docker ps | grep drwfoundation-wordpress

# Run import script
cd /root/drwfoundation-nextjs
node scripts/import-from-wordpress.js

# Review changes
git status

# Commit and push
git add content/
git commit -m "Update content from WordPress"
git push origin main
```

## 📊 Performance Expectations

- **Build Time**: 10-15 seconds
- **Deploy Time**: 2-3 minutes
- **Page Load**: <1 second (CDN)
- **Lighthouse Score**: 90+ expected

## 🎯 Post-Deployment Checklist

- [ ] GitHub repository accessible
- [ ] Vercel deployment successful
- [ ] Custom domain pointing to Vercel
- [ ] HTTPS certificate active (auto by Vercel)
- [ ] All 85 posts accessible
- [ ] Images loading correctly
- [ ] Mobile responsive working
- [ ] SEO meta tags present

## 🔒 Security Notes

- ✅ No WordPress vulnerabilities (static site)
- ✅ HTTPS enforced by Vercel
- ✅ No database exposed
- ✅ No PHP vulnerabilities
- ✅ DDoS protection by Vercel CDN

## 📞 Support

Jika ada masalah:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify DNS settings
4. Check build logs: `npm run build`

---

**Current Status**: ✅ Ready for deployment!

**Next Action**: Push to GitHub → Deploy to Vercel → Setup domain

---

Built with ❤️ by DRW Foundation

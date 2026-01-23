# 🎯 Yang Harus Anda Lakukan Sekarang

## ✅ Status Saat Ini

- ✅ **233 gambar** (47MB) sudah di MinIO CDN
- ✅ **CDN aktif**: https://cdn.drwskincare.com/drwfoundation/images/
- ✅ **Vercel deployment** sudah running (tunggu 2-3 menit)
- ✅ **85 posts + 8 pages** semua URL sudah update

## 📋 Langkah Selanjutnya (5-10 Menit)

### 1. **Tunggu Vercel Deployment Selesai** ⏳
```bash
# Tunggu 2-3 menit, lalu cek:
curl -I https://drwfoundation.vercel.app/
```

Lihat header `age: 0` = deployment baru sudah live.

---

### 2. **Verifikasi Gambar Muncul** 🖼️

Buka browser dan cek halaman ini:
- Homepage: https://drwfoundation.vercel.app/
- Berita: https://drwfoundation.vercel.app/berita
- Sample post: https://drwfoundation.vercel.app/posts/500-sembako-gratis-disalurkan-drw-skincare-untuk-warga-pelosok-kulon-progo

**Cek:**
1. Apakah gambar muncul? ✅
2. Buka DevTools (F12) → Network → Filter "images"
3. Pastikan gambar load dari: `cdn.drwskincare.com/drwfoundation/images/`

---

### 3. **Test CDN Langsung** 🌐

Test beberapa gambar langsung:
```bash
# Test 1: Logo
curl -I https://cdn.drwskincare.com/drwfoundation/images/2024/12/Logo.png

# Test 2: Sample image (ganti dengan path yang ada di markdown)
curl -I https://cdn.drwskincare.com/drwfoundation/images/2023/08/DRW-FOUNDATION-LOGO.png
```

**Expected:** HTTP 200 OK

---

### 4. **Setup Domain drwfoundation.com** 🌍

Setelah semua OK di Vercel, setup custom domain:

#### A. Di Vercel Dashboard
1. Buka: https://vercel.com/multimediadrw/drwfoundation/settings/domains
2. Klik "Add Domain"
3. Masukkan: `drwfoundation.com` dan `www.drwfoundation.com`
4. Vercel akan kasih instruksi DNS

#### B. Di Domain Registrar (Cloudflare/Namecheap/dll)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21

Type: AAAA (Optional)
Name: @
Value: 2606:4700:10::6816:1515
```

**Tunggu propagasi:** 5-15 menit

---

### 5. **Monitoring & Maintenance** 📊

#### Check Vercel Deployment
```bash
# Check latest deployment
https://vercel.com/multimediadrw/drwfoundation

# Check logs
https://vercel.com/multimediadrw/drwfoundation/deployments
```

#### Check MinIO Status
```bash
# MinIO Console (local)
http://localhost:9101
# Login: drwcorp / Rahasiakita.88

# Check bucket files
mc ls drwminio/drwfoundation/images/ | wc -l
```

#### Check CDN Stats
```bash
# See what's in MinIO
mc du drwminio/drwfoundation

# Check specific folder
mc ls drwminio/drwfoundation/images/2024/
```

---

## 🚨 Troubleshooting

### Gambar Tidak Muncul?

**Problem 1: Old Cache**
```bash
# Force refresh Vercel
# Di browser: Ctrl+Shift+R (hard refresh)
# Atau tunggu 10 menit (revalidate)
```

**Problem 2: CDN Down**
```bash
# Check MinIO container
docker ps | grep minio

# Restart if needed
docker restart drw-minio
```

**Problem 3: Wrong URL**
```bash
# Check markdown files
grep -r "cdn.drwskincare.com" content/posts/*.md | head -3

# Should see: https://cdn.drwskincare.com/drwfoundation/images/...
```

---

### Post Pages 404?

Ini karena `dynamicParams = true` di [app/posts/\[slug\]/page.tsx](app/posts/[slug]/page.tsx). First request akan generate page.

**Solusi:**
1. Kunjungi URL post dari homepage (klik link)
2. Atau tunggu 1 jam (ISR revalidate)
3. Atau trigger manual: kunjungi URL langsung

---

## 📝 Development Local

Kalau mau edit content atau develop:

### Quick Start
```bash
# 1. Clone repo
git clone https://github.com/multimediadrw/drwfoundation.git
cd drwfoundation

# 2. Install
npm install

# 3. Setup environment
cp .env.example .env.local

# 4. Run
npm run dev
```

Buka: http://localhost:3000

**Note:** Gambar akan load dari production CDN (cdn.drwskincare.com), tidak perlu setup MinIO local.

---

## 🎨 Next Features (Opsional)

Kalau mau develop lebih lanjut:

### 1. **CMS Admin Panel** 
- Install Tiptap editor
- Buat `/admin` route
- CRUD posts via UI
- Upload images ke MinIO langsung

### 2. **Analytics**
- Google Analytics
- Vercel Analytics
- Track post views

### 3. **SEO Optimization**
- Sitemap.xml (auto-generated)
- robots.txt
- Meta tags per post
- Schema.org markup

### 4. **Performance**
- Image optimization (Next.js Image)
- CDN caching headers
- Lazy loading

---

## 📞 Kontak MinIO

Kalau ada masalah dengan CDN:

**MinIO Info:**
- Endpoint: https://cdn.drwskincare.com
- Console: http://localhost:9101 atau https://cdn.drwskincare.com
- User: `drwcorp`
- Password: `Rahasiakita.88`
- Bucket: `drwfoundation`
- Policy: Public Read

**Container:**
```bash
# Check status
docker ps | grep drw-minio

# View logs
docker logs drw-minio --tail 50

# Restart
docker restart drw-minio
```

---

## ✅ Checklist

- [ ] Vercel deployment selesai (tunggu 2-3 menit)
- [ ] Homepage muncul dengan navigasi
- [ ] Gambar load dari cdn.drwskincare.com
- [ ] Post pages accessible (tidak 404)
- [ ] Setup custom domain drwfoundation.com (opsional)
- [ ] Test di mobile browser
- [ ] Share link ke tim/stakeholder

---

## 🎉 Done!

Setelah semua checklist ✅:
1. **Website live**: https://drwfoundation.vercel.app
2. **Custom domain**: https://drwfoundation.com (setelah setup DNS)
3. **CDN images**: https://cdn.drwskincare.com/drwfoundation/
4. **GitHub repo**: https://github.com/multimediadrw/drwfoundation

**Congratulations!** Website Anda sudah aman dari malware dan berjalan di infrastructure modern (Next.js + Vercel + MinIO CDN). 🚀

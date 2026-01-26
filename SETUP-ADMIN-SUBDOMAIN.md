# Panduan Setup Subdomain Admin: admin.drwfoundation.com

**Tujuan:** Membuat admin panel dapat diakses melalui `admin.drwfoundation.com` yang langsung redirect ke halaman login admin

**Estimasi Waktu:** 5-10 menit

**Status Code:** ✅ Sudah di-deploy ke production!

---

## 🎯 Apa yang Akan Anda Dapatkan?

Setelah setup DNS selesai:

### Admin Subdomain (BARU!)
- `admin.drwfoundation.com` → **Langsung ke halaman login admin** 🔐
- Setelah login → **Dashboard admin**
- URL yang lebih profesional dan mudah diingat
- Semua route admin bisa diakses via subdomain

### Website Public (Tetap)
- `drwfoundation.com` → Website public
- `www.drwfoundation.com` → Website public (www)

### Legacy Admin (Backward Compatibility)
- `drwfoundation.com/admin` → Masih bisa diakses untuk transisi

---

## 🔧 Cara Kerja Routing (Sudah Aktif!)

Code routing sudah di-deploy dan siap bekerja setelah DNS setup:

### Middleware Detection
```
Request → Middleware → Detect Hostname
                    ↓
        Is admin subdomain?
                    ↓
            Yes → Route to /admin/login
            No  → Route to public pages
```

### Flow Admin Subdomain
1. User akses `admin.drwfoundation.com`
2. Middleware detect subdomain "admin"
3. Auto redirect ke `/admin/login`
4. User login dengan username & password
5. Setelah login → Redirect ke `/admin/dashboard`
6. Semua menu admin bisa diakses normal

### Flow Main Domain
1. User akses `drwfoundation.com`
2. Tampil website public
3. Route `/admin` masih bisa diakses (backward compatibility)

---

## 📋 Langkah Setup DNS

### Langkah 1: Tambahkan Domain di Vercel

#### A. Login ke Vercel Dashboard
1. Buka https://vercel.com/dashboard
2. Login dengan akun Anda
3. Pilih project **drwfoundation**

#### B. Tambahkan Subdomain
1. Di halaman project, klik tab **"Settings"**
2. Scroll ke bagian **"Domains"**
3. Klik tombol **"Add"** atau **"Add Domain"**
4. Masukkan: `admin.drwfoundation.com`
5. Klik **"Add"**

#### C. Catat DNS Records
Vercel akan menampilkan DNS records yang perlu ditambahkan:
- **Type:** CNAME
- **Name:** admin
- **Value:** cname.vercel-dns.com (atau value yang diberikan Vercel)

**JANGAN TUTUP HALAMAN INI!** Anda akan perlu informasi DNS ini untuk langkah berikutnya.

---

### Langkah 2: Setup DNS di Cloudflare

#### A. Login ke Cloudflare Dashboard
1. Buka https://dash.cloudflare.com
2. Login dengan akun Anda
3. Pilih domain **drwfoundation.com**

#### B. Tambahkan DNS Record
1. Klik tab **"DNS"** di menu sebelah kiri
2. Klik tombol **"Add record"**
3. Isi form sebagai berikut:
   - **Type:** CNAME
   - **Name:** admin
   - **Target:** cname.vercel-dns.com (sesuai yang diberikan Vercel)
   - **Proxy status:** ✅ Proxied (orange cloud) - RECOMMENDED
   - **TTL:** Auto
4. Klik **"Save"**

#### C. Tunggu Propagasi DNS
- DNS propagasi biasanya 1-5 menit
- Cloudflare dengan proxy biasanya sangat cepat (< 2 menit)
- Bisa cek status di: https://dnschecker.org

---

### Langkah 3: Verifikasi di Vercel

#### A. Kembali ke Vercel Dashboard
1. Kembali ke halaman Vercel project settings → Domains
2. Tunggu beberapa saat (refresh halaman jika perlu)
3. Status `admin.drwfoundation.com` akan berubah dari **"Invalid Configuration"** menjadi **"Valid Configuration"** dengan ✅

#### B. SSL Certificate
- Vercel akan otomatis generate SSL certificate (Let's Encrypt)
- Proses ini biasanya 1-2 menit
- Setelah selesai, subdomain akan memiliki HTTPS

---

### Langkah 4: Test Akses

#### A. Test Subdomain
Buka browser dan akses:
- `https://admin.drwfoundation.com` → Harus redirect ke halaman **login admin**
- Login dengan username & password
- Setelah login → Harus masuk ke **dashboard admin**
- Test menu: Tentang, Program, Berita, Laporan

#### B. Verifikasi Routing
Pastikan:
- ✅ `admin.drwfoundation.com` redirect ke login
- ✅ HTTPS aktif (gembok hijau di browser)
- ✅ Login berfungsi normal
- ✅ Dashboard tampil setelah login
- ✅ Semua menu admin bisa diakses
- ✅ Data tetap sama dengan akses via `drwfoundation.com/admin`

#### C. Test Public Website
Pastikan website public tidak terpengaruh:
- ✅ `drwfoundation.com` → Tampil normal
- ✅ `www.drwfoundation.com` → Tampil normal
- ✅ Semua halaman public berfungsi

---

## 🎯 Hasil Akhir

Setelah setup selesai, struktur domain Anda:

### Domain Admin (BARU!)
```
admin.drwfoundation.com
├── / → Redirect ke /admin/login
├── /admin/login → Halaman login
├── /admin/dashboard → Dashboard (setelah login)
├── /admin/tentang → Edit tentang
├── /admin/program → Edit program
├── /admin/posts → Kelola berita
└── /admin/laporan → Kelola laporan
```

### Domain Public
```
drwfoundation.com
├── / → Homepage
├── /tentang → Tentang kami
├── /program → Program
├── /berita → Berita
├── /laporan → Laporan
└── /admin → Masih bisa diakses (backward compatibility)
```

---

## 🔧 Troubleshooting

### Masalah: "Invalid Configuration" di Vercel
**Solusi:**
1. Cek DNS record di Cloudflare sudah benar
2. Pastikan Type = CNAME, Name = admin
3. Target harus sesuai yang diberikan Vercel
4. Tunggu 5-10 menit untuk propagasi
5. Refresh halaman Vercel

### Masalah: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solusi:**
1. DNS belum propagasi, tunggu 5-10 menit
2. Cek DNS record di Cloudflare sudah save
3. Test dengan tool: https://dnschecker.org
4. Clear DNS cache: `ipconfig /flushdns` (Windows) atau `sudo dscacheutil -flushcache` (Mac)

### Masalah: "Too Many Redirects"
**Solusi:**
1. Di Cloudflare, pastikan SSL/TLS mode = "Full" atau "Full (strict)"
2. Settings → SSL/TLS → Overview → Pilih "Full"
3. Clear browser cache (Ctrl+Shift+R)

### Masalah: Tidak redirect ke login
**Solusi:**
1. Pastikan deployment Vercel sudah selesai
2. Cek di Vercel dashboard → Deployments → Latest deployment harus "Ready"
3. Clear browser cache
4. Test di incognito/private window

### Masalah: Login tidak berfungsi
**Solusi:**
1. Pastikan menggunakan username & password yang benar
2. Cek browser console untuk error (F12)
3. Pastikan cookies enabled di browser
4. Test di browser lain

---

## 💡 Tips & Best Practices

### 1. Update Bookmark
Setelah setup selesai, update bookmark Anda:
- Hapus bookmark lama: `drwfoundation.com/admin`
- Tambah bookmark baru: `admin.drwfoundation.com`

### 2. Share dengan Tim
Sekarang Anda bisa share URL admin yang lebih profesional:
```
Admin Panel: https://admin.drwfoundation.com
Username: [your-username]
Password: [your-password]
```

### 3. Redirect Legacy URL (Opsional)
Jika Anda mau semua akses admin via subdomain, edit middleware.ts dan uncomment bagian redirect:

```typescript
// Di middleware.ts, uncomment ini:
if (pathname.startsWith('/admin')) {
  const adminUrl = new URL(request.url)
  adminUrl.hostname = 'admin.drwfoundation.com'
  return NextResponse.redirect(adminUrl)
}
```

Lalu commit dan push ke GitHub.

### 4. Security Enhancement (Opsional)
Tambahkan IP whitelist di Cloudflare untuk subdomain admin:
1. Cloudflare → Security → WAF
2. Create rule untuk `admin.drwfoundation.com`
3. Allow only dari IP kantor/rumah Anda

### 5. Monitor Access
Cek access logs di Vercel untuk monitoring:
- Vercel Dashboard → Project → Analytics
- Lihat traffic ke subdomain admin

---

## 📊 Keuntungan Setup Ini

✅ **Professional** - URL admin yang dedicated: `admin.drwfoundation.com`  
✅ **Security** - Bisa tambahkan firewall rules khusus untuk subdomain admin  
✅ **Easy to Remember** - Tim mudah ingat URL admin  
✅ **Direct to Login** - Langsung ke halaman login, tidak perlu tambah `/admin`  
✅ **Same Codebase** - Tetap satu project, mudah maintain  
✅ **Shared Data** - Database dan authentication tetap sama  
✅ **Free** - Tidak perlu beli domain baru  
✅ **Fast Setup** - Hanya 5-10 menit  
✅ **Auto SSL** - HTTPS otomatis dari Vercel  
✅ **Backward Compatible** - Route lama masih berfungsi  

---

## 🚀 Code yang Sudah Di-Deploy

### 1. Middleware (middleware.ts)
```typescript
// Detect admin subdomain
const isAdminSubdomain = hostname.startsWith('admin.')

// Redirect root to login
if (isAdminSubdomain && pathname === '/') {
  return NextResponse.redirect(new URL('/admin/login', request.url))
}
```

### 2. Security Headers (vercel.json)
```json
{
  "headers": [
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    }
  ]
}
```

### 3. Login Flow
- Login page: `/admin/login`
- After login redirect: `/admin/dashboard`
- Session management: Cookie-based

---

## ✅ Checklist Setup

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan:

- [ ] Login ke Vercel dashboard
- [ ] Tambahkan domain `admin.drwfoundation.com` di Vercel
- [ ] Catat DNS records yang diberikan Vercel
- [ ] Login ke Cloudflare dashboard
- [ ] Tambahkan CNAME record: admin → cname.vercel-dns.com
- [ ] Set proxy status ke Proxied (orange cloud)
- [ ] Save DNS record
- [ ] Tunggu 2-5 menit untuk propagasi
- [ ] Refresh halaman Vercel, cek status domain
- [ ] Tunggu SSL certificate selesai generate
- [ ] Test akses `https://admin.drwfoundation.com`
- [ ] Verifikasi redirect ke login
- [ ] Test login dengan username & password
- [ ] Verifikasi masuk ke dashboard
- [ ] Test semua menu admin
- [ ] Update bookmark ke URL baru
- [ ] Share URL baru ke tim

---

## 📞 Butuh Bantuan?

Jika ada masalah saat setup:
1. Screenshot error yang muncul
2. Cek DNS dengan: https://dnschecker.org
3. Verifikasi DNS record di Cloudflare
4. Cek status domain di Vercel dashboard
5. Cek deployment status di Vercel
6. Test di incognito/private window

---

## 📝 Technical Details

### Deployment Info
- **Commit:** 2844f61
- **Message:** "feat: Add admin subdomain routing with middleware"
- **Files Changed:**
  - `middleware.ts` (new)
  - `vercel.json` (new)
  - `app/admin/page-redirect.tsx` (new)
- **Deploy Status:** ✅ Production Ready
- **Deploy Time:** ~23 Jan 2026, 21:40 WIB

### Routing Logic
```
Request to admin.drwfoundation.com
    ↓
Middleware checks hostname
    ↓
Is "admin" subdomain? → Yes
    ↓
Check pathname
    ↓
Is "/" ? → Yes → Redirect to /admin/login
    ↓
Is "/admin/*" ? → Yes → Allow access
    ↓
Other paths? → Redirect to /admin
```

---

**Setup Date:** 23 Januari 2026  
**Project:** DRW Foundation  
**Domain:** admin.drwfoundation.com  
**Status:** Code Deployed, DNS Setup Required  

Selamat mencoba! 🚀

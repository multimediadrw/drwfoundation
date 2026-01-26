# Quick Setup: admin.drwfoundation.com

## 🚀 3 Langkah Cepat (5 Menit)

### 1️⃣ Vercel (2 menit)

1. Buka: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Pilih project **drwfoundation**
3. Settings → Domains → Add
4. Masukkan: `admin.drwfoundation.com`
5. Catat DNS record yang diberikan (biasanya: `cname.vercel-dns.com`)

### 2️⃣ Cloudflare (2 menit)

1. Buka: [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Pilih **drwfoundation.com**
3. DNS → Add record
4. **Type:** CNAME
5. **Name:** admin
6. **Target:** cname.vercel-dns.com (sesuai yang diberikan Vercel)
7. **Proxy:** ✅ Proxied (orange cloud)
8. Save

### 3️⃣ Tunggu & Test (1 menit)

1. Tunggu 2-5 menit untuk DNS propagation
2. Refresh Vercel dashboard (cek status domain)
3. Test: [https://admin.drwfoundation.com](https://admin.drwfoundation.com)

---

## ✅ Hasil Setelah Setup

### Akses Admin Subdomain
- `admin.drwfoundation.com` → **Langsung ke Login Admin** 🔐
- Setelah login → **Dashboard Admin** 📊
- Semua route admin bisa diakses via subdomain

### Website Public
- `drwfoundation.com` → Website Public
- `www.drwfoundation.com` → Website Public

### Backward Compatibility
- `drwfoundation.com/admin` → Masih bisa diakses (untuk transisi)

---

## 🎯 Cara Kerja Routing

**Ketika akses `admin.drwfoundation.com`:**
1. Middleware detect subdomain admin
2. Redirect otomatis ke `/admin/login`
3. User login dengan username & password
4. Setelah login → Redirect ke `/admin/dashboard`
5. Semua menu admin bisa diakses normal

**Ketika akses `drwfoundation.com`:**
1. Tampil website public normal
2. Route `/admin` masih bisa diakses (backward compatibility)

---

## 📋 DNS Record Detail

```
Type:   CNAME
Name:   admin
Target: cname.vercel-dns.com
Proxy:  Proxied (orange cloud)
TTL:    Auto
```

---

## 🔗 Links Cepat

- **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **Cloudflare DNS:** [https://dash.cloudflare.com](https://dash.cloudflare.com)
- **DNS Checker:** [https://dnschecker.org](https://dnschecker.org)
- **Test Admin:** [https://admin.drwfoundation.com](https://admin.drwfoundation.com)

---

## 🚀 Sudah Deploy!

Code untuk routing sudah di-deploy ke production:
- ✅ Middleware untuk detect subdomain
- ✅ Auto redirect ke login
- ✅ Routing ke dashboard setelah login
- ✅ Security headers

**Tinggal setup DNS saja!** 🎉

---

**Panduan Lengkap:** Lihat file `SETUP-ADMIN-SUBDOMAIN.md`

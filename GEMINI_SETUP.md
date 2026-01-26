# Setup Gemini API untuk AI Assistant

**Panduan Cepat Setup Google Gemini API**

---

## 🎯 Kenapa Gemini?

AI Assistant sekarang menggunakan **Google Gemini** karena:
- ✅ **Gratis** untuk usage normal
- ✅ **Lebih stabil** dan reliable
- ✅ **Mudah setup** - tidak perlu billing
- ✅ **Cepat** - response time bagus
- ✅ **Bahasa Indonesia** - support bagus

---

## 🚀 Cara Mendapatkan API Key Gemini

### **Langkah 1: Buka Google AI Studio**

1. Buka browser
2. Kunjungi: https://makersuite.google.com/app/apikey
3. Login dengan akun Google Anda

### **Langkah 2: Create API Key**

1. Klik tombol **"Create API Key"** atau **"Get API Key"**
2. Pilih project (atau buat project baru)
3. API key akan di-generate otomatis
4. **Copy API key** (format: `AIzaSy...`)

### **Langkah 3: Simpan API Key**

⚠️ **PENTING:** Simpan API key di tempat aman!
- Jangan share ke orang lain
- Jangan commit ke Git
- Simpan di password manager

---

## ⚙️ Setup di Vercel

### **Langkah 1: Login ke Vercel**

1. Buka: https://vercel.com
2. Login dengan akun Anda
3. Pilih project **"drwfoundation"**

### **Langkah 2: Tambahkan Environment Variable**

1. Klik tab **"Settings"**
2. Klik **"Environment Variables"** di sidebar
3. Klik tombol **"Add New"**

### **Langkah 3: Masukkan API Key**

**Name/Key:**
```
GEMINI_API_KEY
```

**Value:**
```
AIzaSy... [API key Gemini Anda]
```

**Environment:**
- ✅ Production
- ✅ Preview  
- ✅ Development

### **Langkah 4: Save & Redeploy**

1. Klik **"Save"**
2. Vercel akan otomatis trigger redeploy
3. Tunggu 2-3 menit sampai status **"Ready"** ✅

---

## ✅ Verifikasi Setup

### **Langkah 1: Tunggu Deployment**

1. Buka tab **"Deployments"** di Vercel
2. Lihat deployment terbaru
3. Tunggu sampai status **"Ready"** ✅

### **Langkah 2: Test AI Assistant**

1. Buka admin CMS: https://drwfoundation.com/admin
2. Login
3. Klik **"Artikel Baru"**
4. Klik tombol **🤖** di pojok kanan bawah
5. Ketik: **"Halo"**
6. Tekan **Enter**

### **Langkah 3: Cek Response**

✅ **Berhasil:** AI merespons dalam 2-3 detik  
❌ **Gagal:** Error message muncul

---

## 🔍 Troubleshooting

### **Masalah: API key not configured**

**Solusi:**
1. Pastikan environment variable name: `GEMINI_API_KEY` (bukan `OPENAI_API_KEY`)
2. Cek spelling - harus exact match
3. Redeploy setelah tambah variable

### **Masalah: Invalid API key**

**Solusi:**
1. Cek API key di Google AI Studio
2. Pastikan tidak ada spasi di awal/akhir
3. Copy-paste ulang API key
4. Generate API key baru jika perlu

### **Masalah: API key works but no response**

**Solusi:**
1. Cek quota di Google AI Studio
2. Pastikan API enabled
3. Tunggu beberapa menit (propagation)
4. Refresh halaman admin

### **Masalah: Rate limit exceeded**

**Solusi:**
- Gemini free tier: 60 requests/minute
- Tunggu 1 menit lalu coba lagi
- Upgrade ke paid tier jika perlu banyak request

---

## 💡 Tips

### **Free Tier Limits:**

**Gemini Pro (Free):**
- 60 requests per minute
- 1,500 requests per day
- 1 million tokens per month

**Cukup untuk:**
- ~50 artikel per hari
- ~1,500 chat messages per hari
- Usage normal yayasan

### **Best Practices:**

1. **Jangan spam request** - tunggu response sebelum kirim lagi
2. **Monitor usage** - cek di Google AI Studio
3. **Rotate API key** - ganti setiap 3-6 bulan
4. **Set alerts** - jika mendekati limit

---

## 📊 Perbandingan: OpenAI vs Gemini

| Feature | OpenAI GPT | Google Gemini |
|---------|------------|---------------|
| **Harga** | Paid ($) | Free (limited) |
| **Setup** | Perlu billing | Langsung pakai |
| **Bahasa ID** | Bagus | Sangat bagus |
| **Response** | 3-5 detik | 2-3 detik |
| **Stability** | Kadang down | Sangat stabil |
| **Limit** | Pay per token | 60 req/min free |

**Winner:** Gemini untuk use case DRW Foundation! 🏆

---

## 🎓 Cara Pakai AI Assistant

Setelah setup berhasil, Anda bisa:

### **1. Generate Judul**
```
Buatkan 3 judul artikel untuk berita penyaluran 5.000 paket sembako
```

### **2. Buat Key Highlight**
```
Buatkan Key Highlight untuk artikel tentang program beasiswa tahfidz
```

### **3. Improve Paragraf**
```
Perbaiki paragraf ini agar lebih scannable: [paste paragraf panjang]
```

### **4. Struktur Artikel**
```
Buatkan struktur artikel (heading H2) untuk topik: program wakaf
```

### **5. Format Bullet Points**
```
Ubah informasi ini jadi bullet points: [paste text]
```

### **6. Tanya CMS**
```
Bagaimana cara upload gambar di editor?
```

---

## 📞 Support

**Dokumentasi:**
- GEMINI_SETUP.md (file ini)
- AI_ASSISTANT_SETUP.md (panduan lengkap)
- QUICK_START_AI_ASSISTANT.md (quick start)

**Kontak:**
- 📱 WhatsApp: 0816-200-261
- 📧 Email: drwfoundation88@gmail.com

**Google AI Studio:**
- Dashboard: https://makersuite.google.com
- API Keys: https://makersuite.google.com/app/apikey
- Docs: https://ai.google.dev/docs

---

## ✅ Checklist Setup

- [ ] Buka Google AI Studio
- [ ] Login dengan Google account
- [ ] Generate API key
- [ ] Copy API key
- [ ] Login ke Vercel
- [ ] Pilih project drwfoundation
- [ ] Settings → Environment Variables
- [ ] Add: `GEMINI_API_KEY` = `[your key]`
- [ ] Environment: All (Production, Preview, Development)
- [ ] Save
- [ ] Tunggu deployment Ready ✅
- [ ] Test AI Assistant
- [ ] Ketik "Halo" dan cek response
- [ ] AI merespons dengan baik ✅

---

## 🎉 Selamat!

Jika semua checklist ✅, AI Assistant dengan Gemini siap digunakan!

**Keuntungan:**
- ⚡ Gratis untuk usage normal
- 🚀 Lebih cepat dan stabil
- 💬 Bahasa Indonesia sangat bagus
- 🎯 Mudah setup tanpa billing

Happy writing with Gemini AI! 🤖✨

---

**Terakhir diperbarui:** 26 Januari 2026  
**Versi:** 1.0 (Gemini)

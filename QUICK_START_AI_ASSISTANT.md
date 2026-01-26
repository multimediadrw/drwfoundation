# 🚀 Quick Start: Menggunakan AI Assistant

**Panduan Cepat 5 Menit untuk Menggunakan AI Assistant**

---

## ⚠️ PENTING: Setup API Key Dulu!

Sebelum AI Assistant bisa digunakan, Anda **HARUS** setup API key OpenAI di Vercel:

### **Setup API Key (5 Menit):**

1. **Login ke Vercel**
   - Buka: https://vercel.com
   - Login dengan akun Anda

2. **Pilih Project**
   - Klik project **"drwfoundation"**

3. **Buka Settings**
   - Klik tab **"Settings"** di menu atas
   - Klik **"Environment Variables"** di sidebar kiri

4. **Tambah Variable Baru**
   - Klik tombol **"Add New"** atau **"Add Variable"**

5. **Masukkan Data**
   - **Key/Name:** `OPENAI_API_KEY`
   - **Value:** `[API key OpenAI Anda]`
   - **Environment:** Centang semua (Production, Preview, Development)

6. **Save & Redeploy**
   - Klik **"Save"**
   - Vercel akan otomatis trigger redeploy
   - Tunggu 2-3 menit sampai deployment selesai
   - Cek status di tab "Deployments"

7. **Verifikasi Deployment**
   - Tunggu sampai status **"Ready"** ✅
   - Jika masih "Building", tunggu selesai

---

## 📍 Dimana AI Assistant Berada?

### **Lokasi AI Assistant:**

AI Assistant **HANYA** muncul di halaman:
- ✅ **Admin → Artikel Baru** (`/admin/posts/new`)
- ✅ **Admin → Edit Artikel** (`/admin/posts/edit/[slug]`)

AI Assistant **TIDAK** muncul di:
- ❌ Dashboard (`/admin/dashboard`)
- ❌ List Artikel (`/admin/posts`)
- ❌ Halaman lain

---

## 🎯 Step-by-Step: Cara Menemukan AI Assistant

### **Langkah 1: Login ke Admin**

1. Buka browser
2. Ketik URL: `https://drwfoundation.com/admin` atau `https://admin.drwfoundation.com/admin`
3. Masukkan username dan password
4. Klik **"Login"**

### **Langkah 2: Buka Artikel Baru**

**Dari Dashboard:**
1. Setelah login, Anda akan masuk ke Dashboard
2. Lihat bagian **"Quick Actions"**
3. Klik card **"Artikel Baru"** (warna ungu dengan icon ➕)

**Atau dari Menu:**
1. Klik menu **"Posts"** di sidebar
2. Klik tombol **"+ Artikel Baru"** di pojok kanan atas

### **Langkah 3: Lihat Pojok Kanan Bawah**

Setelah halaman "Artikel Baru" terbuka:

1. **Scroll ke bawah** (jika perlu)
2. **Lihat pojok kanan bawah** layar
3. Anda akan melihat **2 tombol floating**:
   - **💡** (warna ungu) = Editor Helper
   - **🤖** (warna biru-cyan) = AI Assistant

### **Langkah 4: Klik Tombol AI 🤖**

1. Klik tombol **🤖** (biru-cyan gradient)
2. Panel chat AI akan muncul (420px x 600px)
3. Anda akan melihat:
   - Header biru dengan avatar AI
   - Pesan sambutan dari AI
   - 6 tombol Quick Prompts
   - Text area untuk chat

### **Langkah 5: Mulai Chat!**

**Cara 1: Gunakan Quick Prompts**
1. Klik salah satu tombol Quick Prompt (contoh: "✍️ Bantu Judul")
2. Template akan masuk ke text area
3. Edit sesuai kebutuhan
4. Tekan **Enter**

**Cara 2: Ketik Manual**
1. Klik di text area
2. Ketik pertanyaan (contoh: "Halo, apa yang bisa kamu bantu?")
3. Tekan **Enter** atau klik tombol **📤**

---

## 🖼️ Visual Guide

### **Tampilan Halaman Artikel Baru:**

```
┌─────────────────────────────────────────────────────┐
│  Header: ✍️ Artikel Baru  [👁️ Preview] [💾 Simpan]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📅 Tanggal Publikasi                               │
│  [input field]                                      │
│                                                     │
│  🇮🇩 Bahasa Indonesia | 🇬🇧 English                 │
│                                                     │
│  📝 Judul Artikel                                   │
│  [input field]                                      │
│                                                     │
│  💡 Key Highlight                                   │
│  [textarea]                                         │
│                                                     │
│  ✍️ Konten Artikel                                  │
│  [TipTap Editor - besar]                            │
│                                                     │
│                                                     │
│                                                     │
│                                    ┌──────┐         │
│                                    │ 💡  │ ← Editor Helper
│                                    └──────┘         │
│                                    ┌──────┐         │
│                                    │ 🤖  │ ← AI Assistant (INI!)
│                                    └──────┘         │
└─────────────────────────────────────────────────────┘
```

### **Tampilan AI Chat Panel (Setelah Klik 🤖):**

```
┌───────────────────────────────────────┐
│ 🤖 AI Assistant    [🔄]               │ ← Header (Biru)
│ Siap membantu Anda                    │
├───────────────────────────────────────┤
│                                       │
│  🤖 Halo! Saya AI Assistant...        │ ← Pesan AI (Kiri)
│     Saya siap membantu Anda dengan:   │
│     • Menulis judul artikel           │
│     • Membuat Key Highlight           │
│     • ...                             │
│                                       │
│                   Halo, apa yang  🙋  │ ← Pesan User (Kanan)
│                   bisa kamu bantu?    │
│                                       │
│  🤖 Saya bisa membantu Anda dengan... │
│                                       │
├───────────────────────────────────────┤
│ 💡 Quick Prompts:                     │
│ ┌─────┬─────┬─────┐                  │
│ │✍️   │💡   │📝   │                  │
│ │Bantu│Key  │Impro│                  │
│ │Judul│High │ve   │                  │
│ └─────┴─────┴─────┘                  │
│ ┌─────┬─────┬─────┐                  │
│ │📋   │🎯   │❓   │                  │
│ │Struk│Bulle│Cara │                  │
│ │tur  │t    │Pakai│                  │
│ └─────┴─────┴─────┘                  │
├───────────────────────────────────────┤
│ [Ketik pertanyaan...]          [📤]  │ ← Input
│ 💡 Tip: Enter = kirim              │
└───────────────────────────────────────┘
```

---

## ❓ Troubleshooting

### **Masalah 1: Tombol 🤖 Tidak Muncul**

**Penyebab & Solusi:**

✅ **Cek Halaman**
- Pastikan Anda di halaman **"Artikel Baru"** atau **"Edit Artikel"**
- Bukan di Dashboard atau List Artikel

✅ **Cek Mode**
- Pastikan di mode **Edit**, bukan mode **Preview**
- Jika di Preview, klik tombol **"✏️ Edit"** di header

✅ **Refresh Halaman**
- Tekan **F5** atau **Ctrl+R** untuk refresh
- Clear browser cache jika perlu

✅ **Cek Deployment**
- Pastikan deployment Vercel sudah selesai
- Cek di https://vercel.com → project drwfoundation → Deployments
- Status harus **"Ready"** ✅

✅ **Cek Browser**
- Gunakan browser modern (Chrome, Firefox, Edge)
- Update browser ke versi terbaru
- Disable extension yang mungkin block JavaScript

### **Masalah 2: AI Tidak Merespons**

**Penyebab & Solusi:**

✅ **Cek API Key**
- Pastikan API key sudah di-setup di Vercel
- Cek: Vercel → Settings → Environment Variables
- Harus ada `OPENAI_API_KEY`

✅ **Cek Deployment**
- Setelah tambah API key, harus redeploy
- Vercel biasanya auto-redeploy
- Tunggu sampai status "Ready"

✅ **Cek Console**
- Buka Developer Tools (F12)
- Tab Console
- Lihat apakah ada error merah
- Screenshot error untuk debugging

✅ **Cek Network**
- Tab Network di Developer Tools
- Filter: Fetch/XHR
- Cari request ke `/api/admin/ai-assistant`
- Cek status code (harus 200)

### **Masalah 3: Error "API key not configured"**

**Solusi:**
1. API key belum di-setup di Vercel
2. Ikuti langkah setup di atas
3. Tunggu redeploy selesai
4. Refresh halaman admin

### **Masalah 4: Response AI Lambat**

**Normal:**
- Response time: 3-5 detik (normal)
- Pertanyaan kompleks: 5-10 detik

**Jika > 30 detik:**
- Server OpenAI mungkin ramai
- Coba lagi dalam beberapa menit
- Refresh halaman

---

## 💡 Tips Cepat

### **Shortcut Keyboard:**
- **Enter** = Kirim pesan
- **Shift + Enter** = Baris baru
- **Esc** = (future) Close chat

### **Quick Test:**
Setelah buka AI Assistant, coba:
```
Halo, apa yang bisa kamu bantu?
```

AI harus merespons dalam 3-5 detik dengan daftar kemampuannya.

### **Contoh Pertanyaan:**
```
Buatkan 3 judul artikel untuk berita penyaluran bantuan sembako
```

```
Buatkan Key Highlight untuk artikel tentang program beasiswa
```

```
Bagaimana cara upload gambar di editor?
```

---

## 📞 Butuh Bantuan?

### **Jika Masih Belum Muncul:**

1. **Screenshot:**
   - Halaman Artikel Baru (full page)
   - Console (F12 → Console tab)
   - Network tab (jika ada error)

2. **Cek:**
   - URL halaman (harus `/admin/posts/new`)
   - Vercel deployment status
   - Environment variables di Vercel

3. **Kontak:**
   - 📱 WhatsApp: 0816-200-261
   - 📧 Email: drwfoundation88@gmail.com

### **Info untuk Debugging:**
- Browser: [Chrome/Firefox/Edge]
- Versi: [...]
- URL: [...]
- Error message: [...]

---

## ✅ Checklist Setup

Pastikan semua ini sudah dilakukan:

- [ ] API key OpenAI sudah ditambahkan di Vercel
- [ ] Environment variable name: `OPENAI_API_KEY`
- [ ] Environment: Production, Preview, Development (semua)
- [ ] Deployment Vercel status: **Ready** ✅
- [ ] Login ke admin CMS
- [ ] Buka halaman **"Artikel Baru"**
- [ ] Lihat pojok kanan bawah
- [ ] Tombol 🤖 muncul
- [ ] Klik tombol 🤖
- [ ] Chat panel terbuka
- [ ] Test chat: "Halo"
- [ ] AI merespons ✅

---

## 🎉 Selamat!

Jika semua checklist di atas sudah ✅, AI Assistant siap digunakan!

**Next Steps:**
1. Coba Quick Prompts
2. Tanya AI untuk bantu menulis artikel
3. Eksplorasi fitur-fitur AI
4. Baca dokumentasi lengkap: `AI_ASSISTANT_SETUP.md`

Happy writing with AI! 🤖✨

---

**Terakhir diperbarui:** 26 Januari 2026  
**Versi:** 1.0

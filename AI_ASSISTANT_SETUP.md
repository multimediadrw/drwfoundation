# Setup AI Assistant - DRW Foundation CMS

**Panduan Lengkap Setup dan Penggunaan AI Assistant**

---

## 📋 Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Setup di Vercel](#setup-di-vercel)
3. [Cara Menggunakan AI Assistant](#cara-menggunakan-ai-assistant)
4. [Fitur-Fitur AI](#fitur-fitur-ai)
5. [Quick Prompts](#quick-prompts)
6. [Tips Penggunaan](#tips-penggunaan)
7. [Troubleshooting](#troubleshooting)
8. [Keamanan & Best Practices](#keamanan--best-practices)

---

## 🤖 Pengenalan

**AI Assistant** adalah fitur baru di admin CMS yang menggunakan **OpenAI GPT-4o-mini** untuk membantu Anda menulis artikel dengan lebih cepat dan berkualitas.

### Kemampuan AI Assistant:

✅ **Menulis Judul Artikel** - Generate 3 judul menarik  
✅ **Membuat Key Highlight** - Ringkasan powerful 1-2 kalimat  
✅ **Improve Paragraf** - Pecah paragraf panjang jadi pendek  
✅ **Struktur Artikel** - Saran heading H2 untuk topik  
✅ **Format Bullet Points** - Ubah text jadi bullet points rapi  
✅ **Jawab Pertanyaan CMS** - Troubleshooting dan cara pakai  

### Keunggulan:

- 🎯 **Context-Aware** - Paham tentang DRW Foundation
- 📖 **Editorial Knowledge** - Tahu panduan penulisan
- 💬 **Conversational** - Chat natural seperti dengan manusia
- ⚡ **Real-Time** - Respons cepat dalam hitungan detik
- 🎨 **User-Friendly** - Interface chat yang modern

---

## ⚙️ Setup di Vercel

### Langkah 1: Login ke Vercel

1. Buka https://vercel.com
2. Login dengan akun Anda
3. Pilih project **drwfoundation**

### Langkah 2: Tambahkan Environment Variable

1. Klik tab **"Settings"**
2. Klik **"Environment Variables"** di sidebar
3. Klik tombol **"Add New"**

### Langkah 3: Masukkan API Key

**Name:**
```
OPENAI_API_KEY
```

**Value:**
```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **PENTING:** Gunakan API key OpenAI Anda sendiri! Jangan share API key ke public.

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Langkah 4: Save & Redeploy

1. Klik **"Save"**
2. Vercel akan otomatis redeploy
3. Tunggu 2-3 menit sampai deployment selesai

### Langkah 5: Verifikasi

1. Buka admin CMS: https://drwfoundation.com/admin
2. Login
3. Buka "Artikel Baru"
4. Klik tombol **🤖** di pojok kanan bawah
5. Coba tanya: "Halo, apa yang bisa kamu bantu?"

Jika AI merespons, setup berhasil! ✅

---

## 💬 Cara Menggunakan AI Assistant

### Membuka AI Assistant

**Lokasi:** Halaman Admin → Artikel Baru

**Cara Buka:**
1. Lihat pojok kanan bawah
2. Ada 2 tombol floating:
   - **💡** = Editor Helper (Template & Panduan)
   - **🤖** = AI Assistant (Chat dengan AI)
3. Klik tombol **🤖**

### Interface AI Assistant

#### **Header (Biru Gradient)**
- Avatar AI 🤖
- Nama: "AI Assistant"
- Status: "Siap membantu Anda"
- Tombol 🔄 untuk clear chat

#### **Chat Area (Putih)**
- Pesan dari AI (kiri, putih)
- Pesan Anda (kanan, biru)
- Scroll untuk lihat history

#### **Quick Prompts (Grid 3x2)**
6 tombol shortcut untuk pertanyaan umum

#### **Input Area (Bawah)**
- Text area untuk ketik pertanyaan
- Tombol 📤 untuk kirim
- Keyboard shortcuts

### Cara Chat dengan AI

#### **Metode 1: Ketik Manual**
1. Klik di text area
2. Ketik pertanyaan Anda
3. Tekan **Enter** atau klik **📤**

#### **Metode 2: Quick Prompts**
1. Klik salah satu tombol Quick Prompt
2. Template akan masuk ke input
3. Edit sesuai kebutuhan
4. Tekan Enter

#### **Keyboard Shortcuts:**
- **Enter** = Kirim pesan
- **Shift + Enter** = Baris baru
- **Esc** = (future) Close chat

---

## 🎯 Fitur-Fitur AI

### 1. **Generate Judul Artikel**

**Cara Pakai:**
```
Buatkan 3 judul artikel yang menarik untuk berita tentang 
penyaluran 5.000 paket sembako untuk korban banjir di Jakarta Timur
```

**Output AI:**
```
Berikut 3 judul artikel yang menarik:

1. "DRW Foundation Salurkan 5.000 Paket Sembako untuk Korban Banjir Jakarta Timur"
   (Langsung, informatif, 78 karakter)

2. "5.000 Keluarga Tertolong: Aksi Cepat DRW Foundation Bantu Korban Banjir"
   (Emosional, ada angka, 72 karakter)

3. "Solidaritas di Tengah Bencana: DRW Foundation Bagikan Bantuan Sembako"
   (Inspiratif, humanis, 74 karakter)

Semua judul sudah di bawah 80 karakter dan mengandung keyword utama! 😊
```

### 2. **Membuat Key Highlight**

**Cara Pakai:**
```
Buatkan Key Highlight (ringkasan 1-2 kalimat) untuk artikel tentang 
penyaluran 5.000 paket sembako senilai Rp 500 juta kepada korban banjir 
di 5 kecamatan Jakarta Timur dalam 3 hari
```

**Output AI:**
```
Berikut Key Highlight yang powerful:

"DRW Foundation menyalurkan 5.000 paket sembako senilai Rp 500 juta kepada 
korban banjir di 5 kecamatan Jakarta Timur, menjangkau lebih dari 10.000 
jiwa dalam waktu 3 hari sebagai bentuk kepedulian terhadap masyarakat 
terdampak bencana."

Key Highlight ini mengandung:
✅ Angka spesifik (5.000 paket, Rp 500 juta)
✅ Lokasi jelas (5 kecamatan Jakarta Timur)
✅ Timeframe (3 hari)
✅ Dampak (10.000 jiwa)
✅ Emosi (kepedulian)

Cocok untuk menarik perhatian pembaca! 💡
```

### 3. **Improve Paragraf**

**Cara Pakai:**
```
Perbaiki paragraf ini agar lebih scannable (max 3 kalimat per paragraf):

DRW Foundation telah menyalurkan bantuan kepada 500 keluarga terdampak 
bencana di wilayah Jakarta Timur pada tanggal 15 Januari 2026 dengan 
bantuan berupa paket sembako dan kebutuhan pokok lainnya yang diserahkan 
langsung oleh tim relawan kami yang telah dilatih khusus untuk menangani 
distribusi bantuan bencana dan kami juga menyediakan layanan konseling 
psikologis bagi para korban yang mengalami trauma akibat bencana tersebut.
```

**Output AI:**
```
Berikut paragraf yang sudah diperbaiki:

"DRW Foundation telah menyalurkan bantuan kepada 500 keluarga terdampak 
bencana di Jakarta Timur. Bantuan berupa paket sembako dan kebutuhan pokok 
diserahkan langsung oleh tim relawan terlatih pada 15 Januari 2026. 
Kami juga menyediakan layanan konseling psikologis bagi korban yang 
mengalami trauma."

Perbaikan:
✅ Dipecah jadi 3 kalimat
✅ Setiap kalimat fokus pada 1 ide
✅ Lebih mudah dibaca dan dipindai
✅ Tetap informatif dan lengkap

Lebih scannable kan? 😊
```

### 4. **Struktur Artikel**

**Cara Pakai:**
```
Buatkan struktur artikel (heading H2) untuk topik: 
Program beasiswa tahfidz untuk 100 santri dari keluarga kurang mampu
```

**Output AI:**
```
Berikut struktur artikel dengan heading H2:

## Latar Belakang Program Beasiswa Tahfidz

## Kriteria Penerima Beasiswa

## Detail Program Beasiswa

## Proses Seleksi dan Pendaftaran

## Manfaat yang Diterima Santri

## Testimoni Santri Penerima Beasiswa

## Cara Mendaftar Program Beasiswa

Struktur ini mengikuti alur:
1. Konteks (mengapa program ini ada)
2. Siapa yang bisa daftar
3. Apa isinya
4. Bagaimana prosesnya
5. Apa manfaatnya
6. Bukti sosial
7. Call-to-action

Heading akan otomatis dapat garis bawah biru dan gradient! 🎨
```

### 5. **Format Bullet Points**

**Cara Pakai:**
```
Ubah informasi ini menjadi bullet points yang rapi:

Program dilaksanakan di Jakarta Timur, Jakarta Barat, Tangerang, Bekasi, 
dan Depok dengan bantuan berupa 5000 paket sembako, 1000 paket hygiene kit, 
dan 500 paket obat-obatan untuk total 5000 keluarga penerima manfaat
```

**Output AI:**
```
Berikut format bullet points yang rapi:

**Lokasi Penyaluran:**
- Jakarta Timur
- Jakarta Barat
- Tangerang
- Bekasi
- Depok

**Bantuan yang Disalurkan:**
- 5.000 paket sembako
- 1.000 paket hygiene kit
- 500 paket obat-obatan

**Total Penerima Manfaat:** 5.000 keluarga

Lebih mudah dibaca dengan format ini! 📋
```

### 6. **Troubleshooting CMS**

**Cara Pakai:**
```
Bagaimana cara menambahkan gambar ke artikel?
```

**Output AI:**
```
Cara menambahkan gambar ke artikel:

1. **Di Editor:**
   - Klik tombol "Upload Image" di toolbar
   - Pilih gambar dari komputer (max 2MB)
   - Gambar akan otomatis ter-upload ke GitHub

2. **Format yang Didukung:**
   - JPG atau PNG
   - Resolusi minimum: 1200 x 800 px
   - Ukuran file: maksimal 2MB

3. **Styling Otomatis:**
   - Frame tipis 4px ✅
   - Shadow halus ✅
   - Rounded corners ✅
   - Hover effect ✅

4. **Tips:**
   - Compress gambar jika lebih dari 2MB
   - Gunakan nama file yang deskriptif
   - Tambahkan caption untuk SEO

Gambar Anda akan tampil cantik dengan styling otomatis! 🖼️
```

---

## 💡 Quick Prompts

### 1. **✍️ Bantu Judul**
```
Buatkan 3 judul artikel yang menarik untuk berita tentang: [jelaskan topik berita]
```

**Kapan Digunakan:**
- Bingung bikin judul
- Butuh variasi judul
- Ingin judul yang catchy

### 2. **💡 Key Highlight**
```
Buatkan Key Highlight (ringkasan 1-2 kalimat) untuk artikel tentang: [jelaskan topik]
```

**Kapan Digunakan:**
- Perlu ringkasan powerful
- Artikel sudah selesai, tinggal highlight
- Ingin opening yang kuat

### 3. **📝 Improve Paragraf**
```
Perbaiki paragraf ini agar lebih scannable (max 3 kalimat per paragraf): [paste paragraf]
```

**Kapan Digunakan:**
- Paragraf terlalu panjang
- Susah dibaca
- Perlu dipecah jadi lebih pendek

### 4. **📋 Struktur Artikel**
```
Buatkan struktur artikel (heading H2) untuk topik: [jelaskan topik]
```

**Kapan Digunakan:**
- Mulai artikel dari nol
- Bingung mau nulis apa dulu
- Perlu outline

### 5. **🎯 Bullet Points**
```
Ubah informasi ini menjadi bullet points yang rapi: [paste text]
```

**Kapan Digunakan:**
- Ada banyak detail teknis
- Text terlalu panjang
- Perlu format yang lebih readable

### 6. **❓ Cara Pakai CMS**
```
Bagaimana cara [jelaskan yang ingin ditanyakan] di CMS ini?
```

**Kapan Digunakan:**
- Bingung cara pakai fitur
- Lupa cara upload gambar
- Troubleshooting error

---

## 🎓 Tips Penggunaan

### 1. **Be Specific**

**❌ Kurang Spesifik:**
```
Buatkan judul artikel
```

**✅ Spesifik:**
```
Buatkan 3 judul artikel yang menarik untuk berita tentang penyaluran 
5.000 paket sembako untuk korban banjir di Jakarta Timur
```

### 2. **Berikan Konteks**

**❌ Tanpa Konteks:**
```
Improve paragraf ini: [paste paragraf]
```

**✅ Dengan Konteks:**
```
Perbaiki paragraf ini agar lebih scannable (max 3 kalimat per paragraf) 
untuk artikel berita yayasan: [paste paragraf]
```

### 3. **Iterasi**

Jangan ragu untuk:
- Tanya follow-up question
- Minta revisi
- Minta alternatif lain

**Contoh:**
```
User: Buatkan 3 judul artikel...
AI: [memberikan 3 judul]
User: Bagus! Tapi bisa lebih emosional?
AI: [memberikan versi lebih emosional]
```

### 4. **Copy-Paste Langsung**

AI memberikan output yang bisa langsung di-copy ke editor:
- Judul → copy ke field "Judul Artikel"
- Key Highlight → copy ke field "Ringkasan"
- Paragraf → copy ke editor
- Struktur → copy heading ke editor

### 5. **Kombinasi dengan Template**

Workflow efektif:
1. Klik **💡** → pilih template
2. Klik **🤖** → tanya AI untuk improve
3. Edit manual sesuai kebutuhan
4. Preview → Simpan

---

## 🔧 Troubleshooting

### Masalah: AI tidak merespons

**Penyebab:**
- API key belum di-setup di Vercel
- Koneksi internet bermasalah
- OpenAI API down

**Solusi:**
1. Cek environment variable di Vercel
2. Cek koneksi internet
3. Coba lagi dalam beberapa menit
4. Jika masih error, hubungi support

### Masalah: Response AI lambat

**Penyebab:**
- Server OpenAI sedang ramai
- Pertanyaan terlalu kompleks

**Solusi:**
1. Tunggu beberapa detik (normal 3-5 detik)
2. Pecah pertanyaan kompleks jadi lebih simple
3. Refresh halaman jika lebih dari 30 detik

### Masalah: AI memberikan jawaban yang tidak relevan

**Penyebab:**
- Pertanyaan kurang spesifik
- Konteks kurang jelas

**Solusi:**
1. Berikan konteks lebih detail
2. Gunakan Quick Prompts sebagai template
3. Tanya follow-up question untuk klarifikasi

### Masalah: Tombol 🤖 tidak muncul

**Penyebab:**
- Sedang di mode Preview
- Browser cache

**Solusi:**
1. Pastikan di mode Edit (bukan Preview)
2. Refresh halaman (F5)
3. Clear browser cache

---

## 🔐 Keamanan & Best Practices

### Keamanan API Key

✅ **DO (Yang Harus Dilakukan):**
- Simpan API key di environment variable
- Jangan commit API key ke Git
- Rotate API key secara berkala
- Monitor usage di OpenAI dashboard
- Set usage limits

❌ **DON'T (Jangan Dilakukan):**
- Share API key ke orang lain
- Commit API key ke repository
- Hardcode API key di code
- Gunakan API key di client-side

### Monitoring Usage

**Cek Usage di OpenAI:**
1. Login ke https://platform.openai.com
2. Klik "Usage"
3. Lihat grafik penggunaan
4. Set alerts jika mendekati limit

**Estimasi Cost:**
- GPT-4o-mini: $0.15 per 1M input tokens
- GPT-4o-mini: $0.60 per 1M output tokens
- Rata-rata 1 chat: ~500 tokens
- Estimasi: 2000 chat = $1

### Best Practices

1. **Gunakan untuk Produktivitas**
   - Bantu menulis lebih cepat
   - Improve kualitas konten
   - Belajar best practices

2. **Jangan Bergantung 100%**
   - AI adalah assistant, bukan pengganti
   - Selalu review output AI
   - Edit sesuai kebutuhan

3. **Protect Privacy**
   - Jangan share informasi sensitif ke AI
   - Jangan share data personal penerima manfaat
   - Gunakan untuk konten publik saja

4. **Rotate API Key**
   - Ganti API key setiap 3-6 bulan
   - Atau jika ada indikasi kebocoran
   - Update di Vercel environment variables

---

## 📞 Support

### Dokumentasi:
- **EDITORIAL_GUIDE.md** - Panduan penulisan
- **ADMIN_CMS_GUIDE.md** - Panduan admin CMS
- **AI_ASSISTANT_SETUP.md** - Panduan AI (file ini)

### Kontak:
- 📱 WhatsApp: 0816-200-261
- 📧 Email: drwfoundation88@gmail.com

### OpenAI Resources:
- Dashboard: https://platform.openai.com
- Documentation: https://platform.openai.com/docs
- Status: https://status.openai.com

---

## 🎉 Selamat!

Anda sekarang memiliki **AI Assistant** yang powerful untuk membantu menulis artikel!

**Manfaat:**
- ⚡ **3x lebih cepat** menulis artikel
- 📈 **Kualitas lebih baik** dengan AI suggestions
- 💡 **Belajar best practices** dari AI
- 🎯 **Konsistensi terjaga** dengan panduan built-in

**Next Steps:**
1. Setup API key di Vercel ✅
2. Coba chat dengan AI 💬
3. Gunakan Quick Prompts 💡
4. Tulis artikel pertama dengan bantuan AI ✍️

Happy writing! 🚀

---

**Terakhir diperbarui:** 26 Januari 2026  
**Versi:** 1.0 (Initial Release)

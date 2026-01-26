'use client'

import { useState } from 'react'

interface EditorHelperProps {
  onInsertTemplate: (template: string) => void
}

export default function EditorHelper({ onInsertTemplate }: EditorHelperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'templates' | 'guide' | 'tips'>('templates')

  const templates = {
    basic: `<h2>Latar Belakang Program</h2>
<p>DRW Foundation melaksanakan program ini sebagai bentuk kepedulian terhadap masyarakat. Program ini bertujuan untuk membantu mereka yang membutuhkan. Kegiatan dilaksanakan dengan penuh dedikasi dan profesionalisme.</p>

<h2>Pelaksanaan Kegiatan</h2>
<p>Program ini dilaksanakan dengan detail sebagai berikut:</p>

<p><strong>Tanggal Pelaksanaan:</strong></p>
<ul>
  <li>15-17 Januari 2026</li>
</ul>

<p><strong>Lokasi:</strong></p>
<ul>
  <li>Jakarta Timur</li>
  <li>Jakarta Barat</li>
  <li>Tangerang</li>
</ul>

<p><strong>Bantuan yang Disalurkan:</strong></p>
<ul>
  <li>5.000 paket sembako</li>
  <li>1.000 paket hygiene kit</li>
  <li>500 paket obat-obatan</li>
</ul>

<h2>Hasil dan Dampak</h2>
<p>Program ini berhasil menjangkau ribuan penerima manfaat. Bantuan diterima dengan baik oleh masyarakat. Kami berkomitmen untuk terus melanjutkan program serupa di masa mendatang.</p>`,

    donation: `<h2>Tentang Program Donasi</h2>
<p>DRW Foundation membuka program donasi untuk membantu masyarakat yang membutuhkan. Setiap donasi Anda akan disalurkan dengan transparan. Mari bersama-sama berbagi kebaikan.</p>

<h2>Cara Berdonasi</h2>
<p>Anda dapat berdonasi melalui beberapa cara:</p>

<p><strong>Via Transfer Bank:</strong></p>
<ul>
  <li>Bank BCA: 1234567890</li>
  <li>Bank Mandiri: 0987654321</li>
  <li>a.n. DRW Foundation</li>
</ul>

<p><strong>Via WhatsApp:</strong></p>
<ul>
  <li>Hubungi: 0816-200-261</li>
  <li>Konfirmasi donasi Anda</li>
</ul>

<p><strong>Via Email:</strong></p>
<ul>
  <li>drwfoundation88@gmail.com</li>
</ul>

<h2>Transparansi Donasi</h2>
<p>Setiap donasi yang masuk akan dilaporkan secara transparan. Kami menerbitkan laporan keuangan setiap bulan. Anda dapat memantau penyaluran donasi melalui website kami.</p>`,

    event: `<h2>Informasi Acara</h2>
<p>DRW Foundation dengan bangga mengumumkan acara spesial kami. Acara ini bertujuan untuk menggalang dana dan meningkatkan kesadaran. Kami mengundang seluruh masyarakat untuk berpartisipasi.</p>

<p><strong>Detail Acara:</strong></p>
<ul>
  <li><strong>Tanggal:</strong> 15 Februari 2026</li>
  <li><strong>Waktu:</strong> 09:00 - 16:00 WIB</li>
  <li><strong>Lokasi:</strong> Gedung Serbaguna Jakarta</li>
  <li><strong>Tema:</strong> Berbagi Kasih untuk Sesama</li>
</ul>

<h2>Agenda Kegiatan</h2>
<p><strong>Pagi (09:00 - 12:00):</strong></p>
<ul>
  <li>Registrasi peserta</li>
  <li>Sambutan ketua yayasan</li>
  <li>Talkshow inspiratif</li>
</ul>

<p><strong>Siang (12:00 - 16:00):</strong></p>
<ul>
  <li>Ishoma</li>
  <li>Penyerahan donasi</li>
  <li>Hiburan dan doorprize</li>
</ul>

<h2>Pendaftaran</h2>
<p>Untuk mendaftar, silakan hubungi kami melalui WhatsApp di 0816-200-261. Pendaftaran gratis dan terbuka untuk umum. Kami tunggu kehadiran Anda!</p>`,

    achievement: `<h2>Pencapaian Program</h2>
<p>Sepanjang tahun 2025, DRW Foundation telah mencapai berbagai milestone penting. Program-program kami telah menyentuh ribuan kehidupan. Berikut adalah ringkasan pencapaian kami.</p>

<p><strong>Statistik Penerima Manfaat:</strong></p>
<ul>
  <li>Total penerima: 120.000+ keluarga</li>
  <li>Wilayah jangkauan: 100+ kota/kabupaten</li>
  <li>Program dilaksanakan: 50+ program</li>
  <li>Dana tersalurkan: Rp 15 Miliar</li>
</ul>

<h2>Program Unggulan</h2>
<p><strong>Beasiswa Tahfidz:</strong></p>
<ul>
  <li>500 santri menerima beasiswa</li>
  <li>Total dana: Rp 2.5 Miliar</li>
</ul>

<p><strong>Bantuan Bencana:</strong></p>
<ul>
  <li>10.000 keluarga terbantu</li>
  <li>Total dana: Rp 3 Miliar</li>
</ul>

<h2>Testimoni</h2>
<blockquote>
  <p>"Bantuan dari DRW Foundation sangat membantu kami di masa sulit. Terima kasih atas kepeduliannya." - Ibu Siti, Penerima Bantuan</p>
</blockquote>

<p>Kami berkomitmen untuk terus meningkatkan kualitas dan jangkauan program kami.</p>`
  }

  const quickTips = [
    {
      title: 'Paragraf Pendek',
      content: 'Maksimal 3 kalimat per paragraf untuk readability yang lebih baik',
      icon: '📝'
    },
    {
      title: 'Gunakan Heading',
      content: 'H2 untuk topik utama, H3 untuk sub-topik. Heading akan otomatis ter-style dengan gradient',
      icon: '📑'
    },
    {
      title: 'Bullet Points',
      content: 'Gunakan bullet points untuk detail teknis, lokasi, tanggal, atau data',
      icon: '•'
    },
    {
      title: 'Istilah Asing',
      content: 'Gunakan italic untuk istilah asing atau bahasa Inggris',
      icon: '🌐'
    },
    {
      title: 'Key Highlight',
      content: 'Tulis ringkasan 1-2 kalimat di field "Excerpt" - akan muncul sebagai highlight',
      icon: '💡'
    },
    {
      title: 'Gambar',
      content: 'Gambar akan otomatis mendapat frame dan shadow. Tambahkan caption yang deskriptif',
      icon: '🖼️'
    }
  ]

  return (
    <>
      {/* Floating Helper Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-white text-2xl"
        title="Editor Helper"
      >
        {isOpen ? '✕' : '💡'}
      </button>

      {/* Helper Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
            <h3 className="text-lg font-bold">📚 Editor Helper</h3>
            <p className="text-sm text-purple-100">Template & Panduan Penulisan</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveSection('templates')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activeSection === 'templates'
                  ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📄 Template
            </button>
            <button
              onClick={() => setActiveSection('guide')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activeSection === 'guide'
                  ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📖 Panduan
            </button>
            <button
              onClick={() => setActiveSection('tips')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activeSection === 'tips'
                  ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              💡 Tips
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[450px]">
            {activeSection === 'templates' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Klik template untuk memasukkan ke editor:
                </p>
                
                <button
                  onClick={() => onInsertTemplate(templates.basic)}
                  className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border border-purple-200 transition"
                >
                  <div className="font-semibold text-purple-900 mb-1">📝 Template Dasar</div>
                  <div className="text-sm text-gray-600">Struktur artikel standar dengan heading dan bullet points</div>
                </button>

                <button
                  onClick={() => onInsertTemplate(templates.donation)}
                  className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg border border-green-200 transition"
                >
                  <div className="font-semibold text-green-900 mb-1">💰 Template Donasi</div>
                  <div className="text-sm text-gray-600">Artikel ajakan donasi dengan cara berdonasi</div>
                </button>

                <button
                  onClick={() => onInsertTemplate(templates.event)}
                  className="w-full text-left p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-lg border border-orange-200 transition"
                >
                  <div className="font-semibold text-orange-900 mb-1">🎉 Template Event</div>
                  <div className="text-sm text-gray-600">Pengumuman acara dengan detail lengkap</div>
                </button>

                <button
                  onClick={() => onInsertTemplate(templates.achievement)}
                  className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg border border-blue-200 transition"
                >
                  <div className="font-semibold text-blue-900 mb-1">🏆 Template Pencapaian</div>
                  <div className="text-sm text-gray-600">Laporan pencapaian dengan statistik</div>
                </button>
              </div>
            )}

            {activeSection === 'guide' && (
              <div className="space-y-4 text-sm">
                <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-purple-900 mb-2">📏 Format Paragraf</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Maksimal 3 kalimat per paragraf</li>
                    <li>• Satu paragraf = satu ide utama</li>
                    <li>• Beri jarak antar paragraf</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2">🎨 Heading</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>H2</strong> untuk topik utama (akan ada garis bawah biru)</li>
                    <li>• <strong>H3</strong> untuk sub-topik</li>
                    <li>• Jangan skip level (H1 → H3)</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-green-900 mb-2">📋 Bullet Points</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Untuk detail teknis (jumlah, lokasi, tanggal)</li>
                    <li>• Untuk list item atau data</li>
                    <li>• Lebih mudah dibaca daripada paragraf panjang</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-orange-900 mb-2">🖼️ Gambar</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Upload via tombol "Upload Image"</li>
                    <li>• Otomatis mendapat frame + shadow</li>
                    <li>• Tambahkan caption yang deskriptif</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'tips' && (
              <div className="space-y-3">
                {quickTips.map((tip, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 mt-4">
                  <h4 className="font-bold text-purple-900 mb-2">📞 Butuh Bantuan?</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Hubungi tim editorial:
                  </p>
                  <div className="space-y-1 text-sm">
                    <div>📱 WhatsApp: 0816-200-261</div>
                    <div>📧 Email: drwfoundation88@gmail.com</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

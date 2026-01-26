import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { getLaporanFromGitHub } from '@/lib/github-storage'
import DownloadButton from '@/components/DownloadButton'

export const metadata: Metadata = {
  title: 'Laporan | DRW Foundation',
  description: 'Laporan kegiatan dan keuangan DRW Foundation',
}

// Default data jika belum ada data di GitHub
const DEFAULT_LAPORAN = {
  title: 'Laporan Kegiatan DRW Foundation 2024',
  intro: 'DRW Foundation berkomitmen untuk transparansi penuh dalam setiap kegiatan dan pengelolaan dana. Berikut adalah laporan lengkap kegiatan kami sepanjang tahun 2024.',
  programs: [
    { name: 'Beasiswa Tahfidz', beneficiaries: '500 santri', budget: 'Rp 2.5 Miliar' },
    { name: 'Masjid Glowing Indonesia', beneficiaries: '50 masjid', budget: 'Rp 5 Miliar' },
    { name: 'Bantuan Bencana', beneficiaries: '10,000 keluarga', budget: 'Rp 3 Miliar' },
    { name: 'Qurban Idul Adha', beneficiaries: '5,000 keluarga', budget: 'Rp 2 Miliar' },
    { name: 'Ambulan Gratis', beneficiaries: '20 unit', budget: 'Rp 1.5 Miliar' },
  ],
  financials: {
    income: 'Rp 15 Miliar',
    distribution: 'Rp 17.15 Miliar',
    beneficiaries: '120,000+',
    programs: '50+',
    cities: '100+'
  }
}

export default async function LaporanPage() {
  // Fetch laporan data from GitHub
  let laporan = DEFAULT_LAPORAN
  try {
    const result = await getLaporanFromGitHub()
    if (result.success && result.data) {
      laporan = result.data
    }
  } catch (error) {
    console.error('Error loading laporan:', error)
    // Use default data if error
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{laporan.title}</h1>
              <p className="text-xl md:text-2xl max-w-4xl leading-relaxed">
                Transparansi dan akuntabilitas dalam setiap program yang kami jalankan
              </p>
            </div>
            
            {/* PDF Download Button */}
            <DownloadButton />
          </div>
        </div>
      </section>

      <main className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              {laporan.intro}
            </p>
          </div>

          {/* Prinsip Pelaporan */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Prinsip Pelaporan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparansi</h3>
                  <p className="text-gray-600">Setiap dana yang masuk dan keluar dilaporkan secara terbuka dan dapat dipertanggungjawabkan.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Akuntabilitas</h3>
                  <p className="text-gray-600">Kami bertanggung jawab penuh atas setiap program yang dijalankan dan hasilnya.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tepat Waktu</h3>
                  <p className="text-gray-600">Laporan disajikan secara berkala dan tepat waktu untuk memudahkan monitoring.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Terukur</h3>
                  <p className="text-gray-600">Setiap program memiliki indikator keberhasilan yang jelas dan terukur.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Program yang Dilaksanakan */}
          {laporan.programs && laporan.programs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Program yang Dilaksanakan</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">No</th>
                      <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Nama Program</th>
                      <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Penerima Manfaat</th>
                      <th className="text-right p-4 font-semibold text-gray-900 border border-gray-300">Anggaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laporan.programs.map((program, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 border border-gray-300">{index + 1}</td>
                        <td className="p-4 border border-gray-300 font-semibold">{program.name}</td>
                        <td className="p-4 border border-gray-300">{program.beneficiaries}</td>
                        <td className="p-4 text-right border border-gray-300">{program.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rekapitulasi Keuangan */}
          {laporan.financials && (
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Rekapitulasi Keuangan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Penerimaan */}
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">💰 Penerimaan Dana</h3>
                  <p className="text-4xl font-bold text-green-600">{laporan.financials.income}</p>
                  <p className="text-gray-600 mt-2">Total dana yang diterima</p>
                </div>

                {/* Penyaluran */}
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📤 Penyaluran Dana</h3>
                  <p className="text-4xl font-bold text-blue-600">{laporan.financials.distribution}</p>
                  <p className="text-gray-600 mt-2">Total dana yang disalurkan</p>
                </div>
              </div>
            </div>
          )}

          {/* Statistik */}
          {laporan.financials && (
            <div className="bg-gradient-to-br from-purple-700 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Statistik Penerima Manfaat</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-5xl font-bold mb-3">{laporan.financials.beneficiaries}</div>
                  <div className="text-purple-100 text-lg">Penerima Manfaat</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-5xl font-bold mb-3">{laporan.financials.programs}</div>
                  <div className="text-purple-100 text-lg">Program Dijalankan</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-5xl font-bold mb-3">{laporan.financials.cities}</div>
                  <div className="text-purple-100 text-lg">Kota/Kabupaten</div>
                </div>
              </div>
            </div>
          )}

          {/* Audit */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Audit dan Verifikasi</h2>
            <p className="text-gray-700 text-lg mb-6">
              Laporan ini telah diaudit oleh auditor independen dan dapat diverifikasi melalui sistem transparansi DRW Foundation.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✓</span>
                <span className="text-gray-700"><strong>Kantor Akuntan Publik (KAP)</strong> - Audit keuangan tahunan</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✓</span>
                <span className="text-gray-700"><strong>Lembaga Independen</strong> - Verifikasi program dan penyaluran</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✓</span>
                <span className="text-gray-700"><strong>Internal Audit</strong> - Monitoring berkala setiap bulan</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <span className="text-green-700 font-semibold">✅ Status Audit 2023: Wajar Tanpa Pengecualian (WTP)</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <span className="text-blue-700 font-semibold">🔄 Status Audit 2024: Dalam Proses</span>
              </div>
            </div>
          </div>

          {/* Komitmen */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Komitmen Transparansi</h2>
            <p className="text-gray-700 text-lg mb-6">Kami berkomitmen untuk:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✅</span>
                <span className="text-gray-700">Melaporkan setiap program secara terbuka</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✅</span>
                <span className="text-gray-700">Mempublikasikan laporan keuangan tahunan</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✅</span>
                <span className="text-gray-700">Menyediakan akses informasi kepada donatur</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✅</span>
                <span className="text-gray-700">Melakukan audit independen setiap tahun</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">✅</span>
                <span className="text-gray-700">Merespons setiap pertanyaan dan masukan</span>
              </div>
            </div>
          </div>

          {/* Info untuk Admin */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">📝 Data Laporan Dinamis</h3>
                <p className="text-blue-800 text-sm">
                  Data di halaman ini diambil dari admin panel. Edit laporan melalui <strong>/admin/laporan</strong> dan perubahan akan otomatis muncul di sini setelah website rebuild.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  )
}


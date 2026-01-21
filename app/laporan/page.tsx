import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laporan | DRW Foundation',
  description: 'Laporan kegiatan dan keuangan DRW Foundation',
}

export default function LaporanPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Laporan Kegiatan</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Transparansi dan akuntabilitas dalam setiap program yang kami jalankan
          </p>
        </div>
      </section>

      <main className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              DRW Foundation berkomitmen untuk menjalankan setiap program dengan <strong>transparansi</strong> dan <strong>akuntabilitas</strong> penuh. Halaman ini menyajikan laporan kegiatan dan program yang telah kami jalankan sebagai bentuk pertanggungjawaban kepada donatur, mitra, dan masyarakat.
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

          {/* Rekapitulasi Dana */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Rekapitulasi Dana 2024</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Penerimaan */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Penerimaan</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Sumber Dana</th>
                        <th className="text-right p-4 font-semibold text-gray-900 border border-gray-300">Jumlah (Rp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border border-gray-300">CSR DRW Corp</td>
                        <td className="p-4 text-right border border-gray-300">10.000.000.000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 border border-gray-300">Donatur Individual</td>
                        <td className="p-4 text-right border border-gray-300">3.000.000.000</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-gray-300">Donatur Korporat</td>
                        <td className="p-4 text-right border border-gray-300">2.000.000.000</td>
                      </tr>
                      <tr className="bg-purple-50 font-bold">
                        <td className="p-4 border border-gray-300">Total Penerimaan</td>
                        <td className="p-4 text-right border border-gray-300">15.000.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Penyaluran */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Penyaluran</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Program</th>
                        <th className="text-right p-4 font-semibold text-gray-900 border border-gray-300">Jumlah (Rp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border border-gray-300">Pendidikan</td>
                        <td className="p-4 text-right border border-gray-300">2.000.000.000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 border border-gray-300">Infrastruktur</td>
                        <td className="p-4 text-right border border-gray-300">7.000.000.000</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-gray-300">Kemanusiaan</td>
                        <td className="p-4 text-right border border-gray-300">2.900.000.000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 border border-gray-300">Kesehatan</td>
                        <td className="p-4 text-right border border-gray-300">250.000.000</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-gray-300">Ramadhan</td>
                        <td className="p-4 text-right border border-gray-300">3.500.000.000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 border border-gray-300">Operasional (10%)</td>
                        <td className="p-4 text-right border border-gray-300">1.500.000.000</td>
                      </tr>
                      <tr className="bg-purple-50 font-bold">
                        <td className="p-4 border border-gray-300">Total Penyaluran</td>
                        <td className="p-4 text-right border border-gray-300">17.150.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2">Saldo Awal Tahun</p>
                <p className="text-3xl font-bold text-purple-700">Rp 5.000.000.000</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2">Saldo Akhir Tahun (Proyeksi)</p>
                <p className="text-3xl font-bold text-purple-700">Rp 2.850.000.000</p>
              </div>
            </div>
          </div>

          {/* Statistik */}
          <div className="bg-gradient-to-br from-purple-700 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Statistik Penerima Manfaat 2024</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">120K+</div>
                <div className="text-purple-100">Penerima Manfaat</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-purple-100">Program Dijalankan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                <div className="text-purple-100">Kota/Kabupaten</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                <div className="text-purple-100">Relawan Terlibat</div>
              </div>
            </div>
          </div>

          {/* Audit */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Audit dan Verifikasi</h2>
            <p className="text-gray-700 text-lg mb-6">DRW Foundation telah diaudit oleh:</p>
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

        </div>
      </main>
      
      <Footer />
    </>
  )
}

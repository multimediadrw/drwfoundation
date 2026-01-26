'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { Download, Filter } from 'lucide-react'

// Data alokasi dana untuk pie chart
const ALLOCATION_DATA = [
  { category: 'Pendidikan', amount: 3.5, percentage: 35, color: '#9333EA' }, // purple-600
  { category: 'Masjid & Infrastruktur', amount: 2.5, percentage: 25, color: '#EC4899' }, // pink-600
  { category: 'Bantuan Sosial', amount: 2.0, percentage: 20, color: '#3B82F6' }, // blue-600
  { category: 'Kesehatan', amount: 1.2, percentage: 12, color: '#10B981' }, // green-600
  { category: 'Bantuan Bencana', amount: 0.8, percentage: 8, color: '#F59E0B' }, // amber-600
]

const YEARS = ['2024', '2023', '2022', '2021']
const CATEGORIES = ['Semua', 'Pendidikan', 'Masjid', 'Sosial', 'Kesehatan', 'Bencana']

const DEFAULT_LAPORAN = {
  title: 'Laporan Kegiatan DRW Foundation 2024',
  intro: 'DRW Foundation berkomitmen untuk transparansi penuh dalam setiap kegiatan dan pengelolaan dana. Berikut adalah laporan lengkap kegiatan kami sepanjang tahun 2024.',
  programs: [
    { name: 'Beasiswa Tahfidz', beneficiaries: '500 santri', budget: 'Rp 2.5 Miliar', category: 'Pendidikan' },
    { name: 'Masjid Glowing Indonesia', beneficiaries: '50 masjid', budget: 'Rp 5 Miliar', category: 'Masjid' },
    { name: 'Bantuan Bencana', beneficiaries: '10,000 keluarga', budget: 'Rp 3 Miliar', category: 'Bencana' },
    { name: 'Qurban Idul Adha', beneficiaries: '5,000 keluarga', budget: 'Rp 2 Miliar', category: 'Sosial' },
    { name: 'Ambulan Gratis', beneficiaries: '20 unit', budget: 'Rp 1.5 Miliar', category: 'Kesehatan' },
  ],
  financials: {
    income: 'Rp 15 Miliar',
    distribution: 'Rp 10 Miliar',
    beneficiaries: '120,000+',
    programs: '50+',
    cities: '100+'
  }
}

export default function LaporanPage() {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const laporan = DEFAULT_LAPORAN

  // Filter programs based on selected category
  const filteredPrograms = selectedCategory === 'Semua' 
    ? laporan.programs 
    : laporan.programs.filter(p => p.category === selectedCategory)

  // Calculate pie chart path
  const createPieSlice = (startAngle: number, endAngle: number) => {
    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  let currentAngle = -90 // Start from top

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Laporan Transparansi {selectedYear}</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Akuntabilitas penuh dalam setiap rupiah yang Anda percayakan kepada kami
          </p>
        </div>
      </section>

      <main className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Filter:</span>
              </div>
              
              {/* Year Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Tahun:</span>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Kategori:</span>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Download PDF Button */}
              <button 
                onClick={() => alert('Fitur download PDF akan segera tersedia')}
                className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Unduh Laporan PDF</span>
              </button>
            </div>
          </div>

          {/* Pie Chart Section - Alokasi Dana */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Alokasi Dana {selectedYear}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pie Chart */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {ALLOCATION_DATA.map((item, index) => {
                      const angle = (item.percentage / 100) * 360
                      const path = createPieSlice(currentAngle, currentAngle + angle)
                      const slice = (
                        <path
                          key={index}
                          d={path}
                          fill={item.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                          style={{ transformOrigin: '50% 50%' }}
                        />
                      )
                      currentAngle += angle
                      return slice
                    })}
                  </svg>
                  
                  {/* Center Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-900">Rp 10M</div>
                    <div className="text-gray-600">Total Penyaluran</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {ALLOCATION_DATA.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600">Rp {item.amount} Miliar</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              {laporan.intro}
            </p>
          </div>

          {/* Program yang Dilaksanakan */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Program yang Dilaksanakan
              {selectedCategory !== 'Semua' && (
                <span className="text-purple-600"> - {selectedCategory}</span>
              )}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">No</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Nama Program</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Kategori</th>
                    <th className="text-left p-4 font-semibold text-gray-900 border border-gray-300">Penerima Manfaat</th>
                    <th className="text-right p-4 font-semibold text-gray-900 border border-gray-300">Anggaran</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border border-gray-300">{index + 1}</td>
                      <td className="p-4 border border-gray-300 font-semibold">{program.name}</td>
                      <td className="p-4 border border-gray-300">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {program.category}
                        </span>
                      </td>
                      <td className="p-4 border border-gray-300">{program.beneficiaries}</td>
                      <td className="p-4 text-right border border-gray-300 font-semibold">{program.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rekapitulasi Keuangan */}
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

          {/* Statistik */}
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

        </div>
      </main>
      
      <Footer />
    </>
  )
}

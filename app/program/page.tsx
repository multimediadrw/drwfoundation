import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Kami | DRW Foundation',
  description: 'Program-program sosial dan kemanusiaan DRW Foundation',
}

const programs = [
  // Keagamaan
  {
    slug: 'masjid-glowing-indonesia',
    title: 'Masjid Glowing Indonesia',
    description: 'Program pembangunan dan renovasi masjid di seluruh Indonesia',
    icon: '🕌',
    category: 'Keagamaan'
  },
  {
    slug: 'qurban-idul-adha',
    title: 'Qurban Idul Adha',
    description: 'Program penyaluran hewan qurban untuk masyarakat',
    icon: '🐑',
    category: 'Keagamaan'
  },
  {
    slug: 'wakaf-masjid',
    title: 'Wakaf Masjid',
    description: 'Program wakaf untuk pembangunan masjid',
    icon: '🕌',
    category: 'Keagamaan'
  },
  // Kemanusiaan
  {
    slug: 'kado-spesial-ramadhan',
    title: 'Kado Spesial Ramadhan',
    description: 'Program pembagian sembako dan kado di bulan Ramadhan',
    icon: '🎁',
    category: 'Kemanusiaan'
  },
  {
    slug: 'bahagiakan-santri-yatim',
    title: 'Bahagiakan Santri Yatim',
    description: 'Program bantuan untuk santri yatim dan dhuafa',
    icon: '👦',
    category: 'Kemanusiaan'
  },
  {
    slug: 'support-bantuan-bencana',
    title: 'Support Bantuan Bencana',
    description: 'Program bantuan darurat untuk korban bencana alam',
    icon: '🆘',
    category: 'Kemanusiaan'
  },
  {
    slug: 'drw-goes-to-panti',
    title: 'DRW Goes To Panti',
    description: 'Program kunjungan dan bantuan ke panti asuhan',
    icon: '🏠',
    category: 'Kemanusiaan'
  },
  {
    slug: 'donasi-palestina',
    title: 'Donasi Saudara Muslim Palestina',
    description: 'Program bantuan kemanusiaan untuk Palestina',
    icon: '🇵🇸',
    category: 'Kemanusiaan'
  },
  // Pendidikan
  {
    slug: 'program-spp',
    title: 'SPP (Sejahterakan Pejuang Pendidikan)',
    description: 'Program bantuan kesejahteraan untuk guru ngaji',
    icon: '👨‍🏫',
    category: 'Pendidikan'
  },
  {
    slug: 'program-beasiswa-rumah-quran-darul-wahyu',
    title: 'Beasiswa Pendidikan',
    description: 'Program beasiswa tahfidz untuk penghafal Al-Quran',
    icon: '📚',
    category: 'Pendidikan'
  },
  // Ekonomi
  {
    slug: 'bantuan-modal-usaha',
    title: 'Bantuan Modal Usaha',
    description: 'Program bantuan modal untuk UMKM',
    icon: '💰',
    category: 'Ekonomi'
  },
  // Lingkungan
  {
    slug: 'berbagi-air-bersih',
    title: 'Berbagi Air Bersih',
    description: 'Program penyediaan air bersih untuk daerah kekeringan',
    icon: '💧',
    category: 'Lingkungan'
  },
  {
    slug: 'wakaf-sumur-bor',
    title: 'Wakaf Sumur Bor',
    description: 'Program wakaf pembuatan sumur bor',
    icon: '🚰',
    category: 'Lingkungan'
  },
  // Kesehatan
  {
    slug: 'ambulan-gratis',
    title: 'Ambulan Gratis',
    description: 'Program layanan ambulan gratis untuk masyarakat',
    icon: '🚑',
    category: 'Kesehatan'
  },
  {
    slug: 'khitan-massal',
    title: 'Khitan Massal',
    description: 'Program khitan massal gratis',
    icon: '⚕️',
    category: 'Kesehatan'
  },
  // Lainnya
  {
    slug: 'program-wakaf-kasih-sayang',
    title: 'Wakaf Kasih Sayang',
    description: 'Program wakaf untuk pemberdayaan masyarakat',
    icon: '💝',
    category: 'Kemanusiaan'
  },
  {
    slug: 'program-silaturahmi-doa-bersama-drw-foundation',
    title: 'Silaturahmi & Doa Bersama',
    description: 'Kegiatan silaturahmi dan doa bersama',
    icon: '🤝',
    category: 'Keagamaan'
  },
]

export default function ProgramPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Program Kami
            </h1>
            <p className="text-xl text-purple-100">
              Berbagai program sosial dan kemanusiaan untuk Indonesia lebih baik
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/program/${program.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {program.description}
                  </p>
                  <div className="text-purple-700 font-medium text-sm flex items-center">
                    <span>Selengkapnya</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

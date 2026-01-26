import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { User } from 'lucide-react'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Tentang Kami | DRW Foundation',
  description: 'Tentang DRW Foundation - Yayasan Sosial dan Kemanusiaan',
}

// Enable ISR
export const revalidate = 60

interface TentangData {
  hero: {
    title: string
    subtitle: string
  }
  pendiri: {
    nama: string
    jabatan: string
    foto: string
    deskripsi: string[]
    quote: string
  }
  visi: string
  misi: string[]
  sejarah: string
  unitBisnis: Array<{
    kategori: string
    deskripsi: string
  }>
  pencapaian: Array<{
    angka: string
    label: string
  }>
}

async function getTentangData(): Promise<TentangData> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'tentang.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading tentang data:', error)
    // Return default data if file doesn't exist
    return {
      hero: {
        title: 'Tentang Kami',
        subtitle: 'Yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat Indonesia'
      },
      pendiri: {
        nama: 'dr. Wahyu Triasmara',
        jabatan: 'Founder & CEO',
        foto: '/images/founder-placeholder.png',
        deskripsi: [
          'Memulai bisnis DRW Skincare dari minus, dr Wahyu Triasmara bertekad untuk membuat bisnis yang bisa sebanyak-banyaknya memberikan manfaat khususnya dalam pembukaan lapangan pekerjaan.',
          'DRW Foundation yang didirikan dr Wahyu Triasmara hadir sebagai pengelola dana CSR unit-unit bisnis DRW Corp di berbagai bidang diantaranya skincare, manufaktur, travel, transportasi, hospitality, kesehatan dan food beverage.'
        ],
        quote: 'Saya lewat DRW Foundation sebagai bentuk bahwa perusahaan tidak hanya untuk mengambil keuntungan, tapi hadir sebagai pelayan masyarakat dan mereka yang membutuhkan'
      },
      visi: 'Menjadi lembaga sosial terpercaya yang berkontribusi nyata dalam meningkatkan kesejahteraan dan kualitas hidup masyarakat Indonesia melalui program-program berkelanjutan di bidang pendidikan, kesehatan, dan pemberdayaan ekonomi.',
      misi: [
        'Memberikan akses pendidikan berkualitas, khususnya pendidikan Al-Quran dan tahfidz',
        'Menyediakan layanan kesehatan dan bantuan medis bagi masyarakat',
        'Membantu pemberdayaan ekonomi masyarakat',
        'Membangun dan merenovasi fasilitas umum',
        'Memberikan bantuan cepat kepada korban bencana'
      ],
      sejarah: 'Sebelumnya dikenal dengan nama drwskincarepeduli, kemudian berubah nama menjadi DRW Foundation seiring bertambahnya sumber dana dari berbagai lini bisnis DRW Corp. DRW Foundation mengelola dana CSR unit-unit bisnis DRW Corp tersebut dan dalam pengelolaannya bersinergi dan berkolaborasi dengan banyak lembaga sosial sebagai pelaksana.',
      unitBisnis: [
        { kategori: 'Skincare', deskripsi: 'DRW Skincare, DRW For Man, DRW Kids' },
        { kategori: 'Klinik Kecantikan', deskripsi: 'Klinik DRW Skincare' },
        { kategori: 'Manufacture', deskripsi: 'DRW Kosmetika' },
        { kategori: 'Travel & Transportasi', deskripsi: 'DRW Trans, Dzawani Tour, Dzawani Umroh' },
        { kategori: 'Hospitality', deskripsi: 'Dzawani Kost, Dzawani Villa, Dzawani Hotel' },
        { kategori: 'Food & Beverage', deskripsi: 'Kampung Pesona, Narendang, Bandha Rasa' }
      ],
      pencapaian: [
        { angka: '2', label: 'Rumah Quran' },
        { angka: '500+', label: 'Santri Tahfidz' },
        { angka: '150+', label: 'Masjid Dibangun' },
        { angka: '100K+', label: 'Penerima Manfaat' }
      ]
    }
  }
}

export default async function TentangPage() {
  const data = await getTentangData()
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            {data.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Pendiri Section - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {/* Left Column - Content */}
            <div className="lg:col-span-3">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                Pendiri
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {data.pendiri.nama}
              </h2>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {data.pendiri.deskripsi.map((paragraf, index) => (
                  <p key={index}>{paragraf}</p>
                ))}
                
                {/* Quote */}
                <blockquote className="border-l-4 border-purple-600 pl-6 py-4 my-8 bg-white rounded-r-lg">
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                    "{data.pendiri.quote}"
                  </p>
                  <cite className="text-purple-700 font-semibold not-italic">
                    - {data.pendiri.nama}
                  </cite>
                </blockquote>
              </div>
            </div>
            
            {/* Right Column - Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-lg sticky top-24">
                <div className="flex flex-col items-center text-center">
                  {data.pendiri.foto && data.pendiri.foto !== '/images/founder-placeholder.png' ? (
                    <div className="relative mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
                        <img 
                          src={data.pendiri.foto} 
                          alt={data.pendiri.nama}
                          className="w-full h-full object-contain scale-90"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
                      <User className="w-24 h-24 text-purple-600" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    {data.pendiri.jabatan}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    DRW Foundation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {data.visi}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi</h2>
                <ul className="space-y-3 text-gray-700 text-lg">
                  {data.misi.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sejarah */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sejarah</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {data.sejarah}
            </p>
          </div>

          {/* Unit Bisnis */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Unit Bisnis DRW Corp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.unitBisnis.map((unit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-purple-600 text-xl">•</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{unit.kategori}</h3>
                    <p className="text-gray-600">{unit.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pencapaian */}
          <div className="bg-gradient-to-br from-purple-700 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Pencapaian Kami</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.pencapaian.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{item.angka}</div>
                  <div className="text-purple-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Apa Kata Mereka - Testimonials */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Apa Kata Mereka</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Testimoni dari para penerima manfaat yang telah merasakan langsung dampak program DRW Foundation
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 - Wali Murid */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    W
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Wali Murid</h4>
                    <p className="text-sm text-gray-600">Penerima Donasi Seragam</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "Terimakasih yang sebesar besarnya kepada DRW Foundation atas bantuan seragam gratisnya. Semoga selalu bermanfaat untuk kedepannya."
                </p>
              </div>

              {/* Testimonial 2 - Santri Tahfidz */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Ahmad</h4>
                    <p className="text-sm text-gray-600">Santri Beasiswa Tahfidz</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "Alhamdulillah, berkat beasiswa dari DRW Foundation saya bisa fokus menghafal Al-Quran tanpa khawatir biaya. Semoga menjadi amal jariyah."
                </p>
              </div>

              {/* Testimonial 3 - Pengurus Masjid */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Pak Slamet</h4>
                    <p className="text-sm text-gray-600">Pengurus Masjid</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "Bantuan renovasi masjid dari DRW Foundation sangat membantu jamaah kami. Masjid sekarang lebih nyaman untuk beribadah. Jazakumullah khairan."
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

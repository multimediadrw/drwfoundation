import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Kami | DRW Foundation',
  description: 'Tentang DRW Foundation - Yayasan Sosial dan Kemanusiaan',
}

export default function TentangPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat Indonesia
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
                dr. Wahyu Triasmara
              </h2>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Memulai bisnis DRW Skincare dari minus, dr Wahyu Triasmara bertekad untuk membuat bisnis yang bisa sebanyak-banyaknya memberikan manfaat khususnya dalam pembukaan lapangan pekerjaan.
                </p>
                
                <p>
                  DRW Foundation yang didirikan dr Wahyu Triasmara hadir sebagai pengelola dana CSR unit-unit bisnis DRW Corp di berbagai bidang diantaranya skincare, manufaktur, travel, transportasi, hospitality, kesehatan dan food beverage.
                </p>
                
                {/* Quote */}
                <blockquote className="border-l-4 border-purple-600 pl-6 py-4 my-8 bg-white rounded-r-lg">
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                    "Saya lewat DRW Foundation sebagai bentuk bahwa perusahaan tidak hanya untuk mengambil keuntungan, tapi hadir sebagai pelayan masyarakat dan mereka yang membutuhkan"
                  </p>
                  <cite className="text-purple-700 font-semibold not-italic">
                    - dr Wahyu Triasmara
                  </cite>
                </blockquote>
              </div>
            </div>
            
            {/* Right Column - Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-lg sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                    <User className="w-16 h-16 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    Founder & CEO
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
                  Menjadi lembaga sosial terpercaya yang berkontribusi nyata dalam meningkatkan kesejahteraan dan kualitas hidup masyarakat Indonesia melalui program-program berkelanjutan di bidang pendidikan, kesehatan, dan pemberdayaan ekonomi.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi</h2>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">✓</span>
                    <span>Memberikan akses pendidikan berkualitas, khususnya pendidikan Al-Quran dan tahfidz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">✓</span>
                    <span>Menyediakan layanan kesehatan dan bantuan medis bagi masyarakat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">✓</span>
                    <span>Membantu pemberdayaan ekonomi masyarakat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">✓</span>
                    <span>Membangun dan merenovasi fasilitas umum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">✓</span>
                    <span>Memberikan bantuan cepat kepada korban bencana</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sejarah */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sejarah</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Sebelumnya dikenal dengan nama <strong>drwskincarepeduli</strong>, kemudian berubah nama menjadi <strong>DRW Foundation</strong> seiring bertambahnya sumber dana dari berbagai lini bisnis DRW Corp. DRW Foundation mengelola dana CSR unit-unit bisnis DRW Corp tersebut dan dalam pengelolaannya bersinergi dan berkolaborasi dengan banyak lembaga sosial sebagai pelaksana.
            </p>
          </div>

          {/* Unit Bisnis */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Unit Bisnis DRW Corp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Skincare</h3>
                  <p className="text-gray-600">DRW Skincare, DRW For Man, DRW Kids</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Klinik Kecantikan</h3>
                  <p className="text-gray-600">Klinik DRW Skincare</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Manufacture</h3>
                  <p className="text-gray-600">DRW Kosmetika</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Travel & Transportasi</h3>
                  <p className="text-gray-600">DRW Trans, Dzawani Tour, Dzawani Umroh</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Hospitality</h3>
                  <p className="text-gray-600">Dzawani Kost, Dzawani Villa, Dzawani Hotel</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 text-xl">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Food & Beverage</h3>
                  <p className="text-gray-600">Kampung Pesona, Narendang, Bandha Rasa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pencapaian */}
          <div className="bg-gradient-to-br from-purple-700 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Pencapaian Kami</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">2</div>
                <div className="text-purple-100">Rumah Quran</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-purple-100">Santri Tahfidz</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
                <div className="text-purple-100">Masjid Dibangun</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">100K+</div>
                <div className="text-purple-100">Penerima Manfaat</div>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  )
}

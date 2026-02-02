import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-purple-700">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau dihapus.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/program"
              className="px-6 py-3 bg-white text-purple-700 border-2 border-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Lihat Program
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">DRW Foundation</h3>
            <p className="text-gray-400 text-sm">
              Yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Berita
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Program Kami</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/program/beasiswa" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beasiswa Tahfidz
                </Link>
              </li>
              <li>
                <Link href="/program/wakaf" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Wakaf Kasih Sayang
                </Link>
              </li>
              <li>
                <Link href="/program/silaturahmi" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Silaturahmi & Doa
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@drwfoundation.com</li>
              <li>Telp: (0274) xxx-xxxx</li>
              <li>Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DRW Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

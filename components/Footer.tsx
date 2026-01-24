import Link from 'next/link'
import { Youtube, Instagram } from 'lucide-react'

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
              <li>Instagram: @drwfoundation</li>
              <li>TikTok: @drwfoundation</li>
              <li>YouTube: @drwfoundation</li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">Ikuti Kami</h4>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com/drwfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram DRW Foundation"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://tiktok.com/@drwfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                  aria-label="TikTok DRW Foundation"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@drwfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-110"
                  aria-label="YouTube DRW Foundation"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DRW Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

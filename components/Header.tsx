import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="DRW Foundation" 
              width={200} 
              height={47}
              className="h-10 w-auto"
              priority
            />
          </Link>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              Beranda
            </Link>
            <Link 
              href="/tentang" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              Tentang
            </Link>
            <Link 
              href="/program" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              Program
            </Link>
            <Link 
              href="/berita" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              Berita
            </Link>
            <Link 
              href="/laporan" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              Laporan
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

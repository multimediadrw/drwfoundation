'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.png" 
              alt="DRW Foundation" 
              width={200} 
              height={47}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 relative link-underline"
            >
              Beranda
            </Link>
            <Link 
              href="/tentang" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 relative link-underline"
            >
              Tentang Kami
            </Link>
            <Link 
              href="/program" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 relative link-underline"
            >
              Program
            </Link>
            <Link 
              href="/berita" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 relative link-underline"
            >
              Berita
            </Link>
            <Link 
              href="/laporan" 
              className="text-gray-700 hover:text-purple-700 font-medium transition-all duration-200 relative link-underline"
            >
              Laporan
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/tentang"
                className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link
                href="/program"
                className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Program
              </Link>
              <Link
                href="/berita"
                className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Berita
              </Link>
              <Link
                href="/laporan"
                className="text-gray-700 hover:text-purple-700 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Laporan
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .link-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background-color: #7c3aed;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .link-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  )
}

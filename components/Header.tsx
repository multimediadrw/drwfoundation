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
          <div className="hidden md:flex space-x-8">
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
              Tentang
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all duration-200 px-4 py-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              href="/tentang" 
              className="block text-gray-700 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all duration-200 px-4 py-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link 
              href="/program" 
              className="block text-gray-700 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all duration-200 px-4 py-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Program
            </Link>
            <Link 
              href="/berita" 
              className="block text-gray-700 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all duration-200 px-4 py-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Berita
            </Link>
            <Link 
              href="/laporan" 
              className="block text-gray-700 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all duration-200 px-4 py-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Laporan
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

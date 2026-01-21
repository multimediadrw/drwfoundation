'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    image: '/images/kegiatan/bersholawat_1.png',
    alt: 'DRW Bersholawat - Acara Sholawat Akbar'
  },
  {
    image: '/images/kegiatan/bersholawat_2.png',
    alt: 'DRW Bersholawat - Jamaah Bersholawat'
  },
  {
    image: '/images/kegiatan/bersholawat_3.png',
    alt: 'DRW Bersholawat Purworejo'
  },
  {
    image: '/images/kegiatan/bersholawat_4.png',
    alt: 'Santri Bersholawat'
  },
  {
    image: '/images/kegiatan/kebakaran_kutoarjo_1.jpg',
    alt: 'Peduli Kebakaran Kutoarjo'
  },
  {
    image: '/images/kegiatan/kebakaran_kutoarjo_2.jpg',
    alt: 'Bantuan Kebakaran Pasar Kutoarjo'
  },
  {
    image: '/images/kegiatan/masjid_glowing_1_croped1.jpg',
    alt: 'Masjid Glowing Indonesia'
  },
  {
    image: '/images/kegiatan/DSC01031-1-768x512.jpg',
    alt: 'Kegiatan Sosial DRW Foundation'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Purple Overlay - Lighter */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-800/50 to-purple-700/40" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-medium">
                Sinergi & Kolaborasi untuk Umat
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                DRW Foundation
              </h1>
            </div>

            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              Hadir untuk menginspirasi, DRW Foundation diprakarsai oleh dr Wahyu Triasmara, founder DRW Skincare – hadir sebagai lembaga yang berasal dari Indonesia, berfokus dalam pengelolaan dana CSR DRW Corp guna menyalurkannya ke daerah-daerah terlimpa bencana, kemiskinan, lembaga sosial, panti, pendidikan dan lain sebagainya.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/program"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition transform hover:scale-105 shadow-lg"
              >
                Lihat Program
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Tentang Kami
              </Link>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4 text-center">
                Program Kolaborasi
              </h2>
              <p className="text-gray-700 text-center mb-6 leading-relaxed">
                Bergabung dalam program pensejahteraan umat bersama DRW Foundation
              </p>
              <Link
                href="/program"
                className="block w-full bg-purple-700 text-white text-center py-4 rounded-lg font-semibold hover:bg-purple-800 transition shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Program DRW Foundation
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

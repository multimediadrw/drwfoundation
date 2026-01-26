'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Program {
  title: string
  description: string
  icon: string
  color: string
  link: string
  cta: string
}

const programs: Program[] = [
  {
    title: 'Beasiswa Tahfidz',
    description: 'Program beasiswa penuh untuk santri penghafal Al-Quran di Rumah Quran Darul Wahyu',
    icon: '📚',
    color: 'from-blue-500 to-blue-600',
    link: '/program/program-beasiswa-rumah-quran-darul-wahyu',
    cta: 'Daftar Sekarang'
  },
  {
    title: 'Masjid Glowing Indonesia',
    description: 'Pembangunan dan renovasi masjid di seluruh Indonesia untuk memakmurkan rumah Allah',
    icon: '🕌',
    color: 'from-green-500 to-green-600',
    link: '/program/masjid-glowing-indonesia',
    cta: 'Donasi Masjid'
  },
  {
    title: 'Wakaf Kasih Sayang',
    description: 'Program wakaf produktif untuk pemberdayaan ekonomi masyarakat kurang mampu',
    icon: '💝',
    color: 'from-pink-500 to-pink-600',
    link: '/program/program-wakaf-kasih-sayang',
    cta: 'Wakaf Sekarang'
  },
  {
    title: 'Bantuan Bencana',
    description: 'Respon cepat untuk korban bencana alam dengan bantuan logistik dan dana darurat',
    icon: '🤝',
    color: 'from-red-500 to-red-600',
    link: '/program/support-bantuan-bencana',
    cta: 'Bantu Sekarang'
  },
  {
    title: 'Qurban Idul Adha',
    description: 'Penyaluran hewan qurban untuk masyarakat kurang mampu di seluruh Indonesia',
    icon: '🐑',
    color: 'from-purple-500 to-purple-600',
    link: '/program/qurban-idul-adha',
    cta: 'Qurban Bersama'
  },
  {
    title: 'Khitan Massal',
    description: 'Program khitan gratis untuk anak-anak dari keluarga kurang mampu',
    icon: '⚕️',
    color: 'from-cyan-500 to-cyan-600',
    link: '/program/khitan-massal',
    cta: 'Daftar Khitan'
  }
]

export default function ProgramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % programs.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % programs.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Program <span className="text-purple-700">Unggulan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai program yang kami jalankan untuk membantu masyarakat Indonesia
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {programs.map((program, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left Side - Content */}
                      <div className="p-12 flex flex-col justify-center">
                        <div className={`w-20 h-20 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-6 text-4xl shadow-lg transform hover:scale-110 transition-transform`}>
                          {program.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{program.title}</h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{program.description}</p>
                        <div className="flex gap-4">
                          <Link
                            href={program.link}
                            className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${program.color} text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                          >
                            {program.cta}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </Link>
                          <Link
                            href={program.link}
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
                          >
                            Lihat Detail
                          </Link>
                        </div>
                      </div>

                      {/* Right Side - Visual */}
                      <div className={`bg-gradient-to-br ${program.color} p-12 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '30px 30px'
                          }}></div>
                        </div>
                        <div className="text-9xl relative z-10 animate-bounce-slow">{program.icon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-purple-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Programs Button */}
        <div className="text-center mt-12">
          <Link
            href="/program"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Program
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

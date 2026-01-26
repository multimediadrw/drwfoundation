'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const videos = [
  '/videos/v4.mp4',
  '/videos/Vidio1rct.mp4',
  '/videos/VID-20221202-WA0044.mp4'
]

export default function HeroVideo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Start fade out transition
      setIsTransitioning(true)
      
      // After fade out, switch to next video
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
        setIsTransitioning(false)
      }, 500) // 500ms fade out duration
    }

    video.addEventListener('ended', handleVideoEnd)
    return () => video.removeEventListener('ended', handleVideoEnd)
  }, [])

  useEffect(() => {
    // Reset video when index changes
    const video = videoRef.current
    if (video) {
      video.load()
      video.play().catch(err => console.log('Video play error:', err))
    }
  }, [currentVideoIndex])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600"></div>
        
        {/* Video element - rotates between 3 videos */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded && !isTransitioning ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-pattern" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-semibold mb-8 animate-fade-in-down">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Yayasan Sosial Terpercaya & Akuntabel</span>
          </div>

          {/* Main Heading - Extra Bold */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in-up">
            <span className="block mb-2">Sinergi Kolaborasi</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
              untuk Ummat
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Perpanjangan tangan DRW Corp dalam mengelola dana CSR secara profesional, transparan, dan akuntabel untuk membantu masyarakat Indonesia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/program"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              <span>Lihat Program Kami</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/tentang"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
            >
              <span>Tentang Kami</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-in-up animation-delay-600">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold">Terpercaya</div>
                <div className="text-sm text-gray-300">Audit Berkala</div>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20"></div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold">Transparan</div>
                <div className="text-sm text-gray-300">Laporan Publik</div>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20"></div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold">120K+</div>
                <div className="text-sm text-gray-300">Penerima Manfaat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Indicator Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentVideoIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex 
                ? 'bg-yellow-400 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Switch to video ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm font-semibold">Scroll untuk lebih lanjut</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pattern {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(50px) translateY(50px);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animate-pattern {
          animation: pattern 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

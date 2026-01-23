import Link from 'next/link';
import Image from 'next/image';
import { getPostsData } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

// Enable ISR - Revalidate every 10 minutes
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'DRW Foundation - Sinergi Kolaborasi untuk Ummat',
  description: 'DRW Foundation diprakarsai oleh dr Wahyu Triasmara, founder DRW Skincare. Fokus dalam pengelolaan dana CSR untuk membantu masyarakat Indonesia.',
  openGraph: {
    title: 'DRW Foundation - Sinergi Kolaborasi untuk Ummat',
    description: 'Lembaga sosial yang fokus membantu masyarakat Indonesia',
    url: 'https://drwfoundation.com',
    siteName: 'DRW Foundation',
    locale: 'id_ID',
    type: 'website',
  },
};

export default async function Home() {
  const posts = await getPostsData();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Carousel Section */}
        <HeroCarousel />

        {/* Kenapa DRW Foundation - Enhanced with Animations */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Kenapa <span className="text-purple-700">DRW Foundation?</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Komitmen kami untuk memberikan dampak nyata bagi masyarakat Indonesia
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-2xl"></div>
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Terpercaya</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dikelola secara profesional dengan transparansi penuh dan audit berkala untuk memastikan setiap donasi tersalurkan dengan baik.
                  </p>
                </div>
              </ScrollReveal>

              {/* Card 2 */}
              <ScrollReveal direction="up" delay={0.3}>
                <div className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-2xl"></div>
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Berdampak Luas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Telah menyalurkan bantuan ke 100+ kota/kabupaten dengan 120.000+ penerima manfaat di seluruh Indonesia.
                  </p>
                </div>
              </ScrollReveal>

              {/* Card 3 */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-2xl"></div>
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cepat Tanggap</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Respon cepat terhadap bencana dan kebutuhan mendesak masyarakat dengan sistem distribusi yang efisien.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Program Section with Animations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Program <span className="text-purple-700">Unggulan</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Berbagai program yang kami jalankan untuk membantu masyarakat Indonesia
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Beasiswa Tahfidz', icon: '📚', color: 'from-blue-500 to-blue-600' },
                { title: 'Masjid Glowing', icon: '🕌', color: 'from-green-500 to-green-600' },
                { title: 'Bantuan Bencana', icon: '🤝', color: 'from-red-500 to-red-600' },
                { title: 'Qurban', icon: '🐑', color: 'from-purple-500 to-purple-600' },
              ].map((program, index) => (
                <ScrollReveal key={index} direction="up" delay={0.2 + index * 0.1}>
                  <Link
                    href="/program"
                    className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{program.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">Program unggulan DRW Foundation</p>
                      <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                        <span>Lihat Detail</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="fade" delay={0.6}>
              <div className="text-center mt-12">
                <Link
                  href="/program"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Lihat Semua Program
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Berita Terbaru with Animations */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Berita <span className="text-purple-700">Terbaru</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Update terkini tentang kegiatan dan program DRW Foundation
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <ScrollReveal key={post.slug} direction="up" delay={0.2 + index * 0.1}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-3"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                        📰
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-purple-600 font-semibold mb-2">
                        {new Date(post.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                        <span>Baca Selengkapnya</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="fade" delay={0.5}>
              <div className="text-center mt-12">
                <Link
                  href="/berita"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-purple-700 text-purple-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 hover:text-white shadow-lg"
                >
                  Lihat Semua Berita
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Kegiatan DRW Foundation Gallery with Animations */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Kegiatan DRW Foundation
                </h2>
                <p className="text-xl text-gray-600">
                  Sedikit gambaran dari ratusan kegiatan pensejahteraan umat DRW Foundation
                </p>
              </div>
            </ScrollReveal>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { src: '/images/kegiatan/bersholawat_1.png', alt: 'DRW Bersholawat 1' },
                { src: '/images/kegiatan/bersholawat_2.png', alt: 'DRW Bersholawat 2' },
                { src: '/images/kegiatan/bersholawat_3.png', alt: 'DRW Bersholawat Purworejo', caption: 'DRW Bersholawat Purworejo' },
                { src: '/images/kegiatan/bersholawat_4.png', alt: 'DRW Bersholawat 4' },
                { src: '/images/kegiatan/DSC01031-1-768x512.jpg', alt: 'Kegiatan DRW Foundation' },
                { src: '/images/kegiatan/kebakaran_kutoarjo_1.jpg', alt: 'Bantuan Kebakaran Kutoarjo' },
                { src: '/images/kegiatan/kebakaran_kutoarjo_2.jpg', alt: 'Bantuan Kebakaran Kutoarjo 2' },
                { src: '/images/kegiatan/masjid_glowing_1_croped1.jpg', alt: 'Program Masjid Glowing' },
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={0.1 + index * 0.05}>
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <span className="text-white font-semibold">{item.caption}</span>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="fade" delay={0.6}>
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Cek kegiatan lain DRW Foundation di Official Social Media Kami
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://instagram.com/drwfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com/@drwfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@drwfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonial Section with Animations */}
        <section className="py-20 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Kata Mereka Tentang DRW Foundation
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <TestimonialCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section with Animations */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="fade" delay={0.1}>
              <div className="text-center text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Mari Bergabung Bersama Kami
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  Bersama kita bisa memberikan dampak yang lebih besar untuk masyarakat Indonesia
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/program"
                    className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Lihat Program
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/tentang"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-purple-700"
                  >
                    Tentang Kami
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { getPostsData } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroVideo from '@/components/HeroVideo';
import ImpactCounter from '@/components/ImpactCounter';
import ProgramCarousel from '@/components/ProgramCarousel';
import TransparencySection from '@/components/TransparencySection';
import FloatingCTA from '@/components/FloatingCTA';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

// Enable ISR - Revalidate every 60 seconds for fresh content
export const revalidate = 60;

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
        {/* Hero Section with Video Background */}
        <HeroVideo />

        {/* Impact Counter Section */}
        <ImpactCounter />

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

        {/* Program Carousel Section */}
        <ProgramCarousel />

        {/* Transparency Report Section */}
        <TransparencySection />

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
                      <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
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
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

        {/* Testimonial Section */}
        <TestimonialCarousel />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Mari Bersama Membangun Indonesia
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Setiap kontribusi Anda adalah investasi untuk masa depan yang lebih baik bagi sesama
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/program"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Mulai Berdonasi
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 hover:bg-white/20"
                >
                  Pelajari Lebih Lanjut
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Floating CTA Button */}
      <FloatingCTA />
      
      <Footer />
    </>
  );
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getPostsData } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita & Kegiatan | DRW Foundation',
  description: 'Berita dan kegiatan terbaru DRW Foundation',
}

export default async function BeritaPage() {
  const posts = await getPostsData()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Berita & Kegiatan
            </h1>
            <p className="text-xl text-purple-100">
              Update terbaru tentang kegiatan dan program DRW Foundation
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <time className="text-sm text-purple-700 font-medium">
                    {new Date(post.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  
                  <div className="mt-4 text-purple-700 font-medium text-sm flex items-center">
                    <span>Baca selengkapnya</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

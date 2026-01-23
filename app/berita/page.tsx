import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BeritaClient from '@/components/BeritaClient'
import { getPostsData } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita & Kegiatan | DRW Foundation',
  description: 'Berita dan kegiatan terbaru DRW Foundation',
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

        {/* Search and Articles - Client Component */}
        <BeritaClient posts={posts} />
      </main>
      <Footer />
    </>
  )
}

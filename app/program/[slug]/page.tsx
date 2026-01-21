import { getPageBySlug, getAllPages } from '@/lib/pages'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Program Not Found',
    }
  }

  return {
    title: `${page.title} | DRW Foundation`,
    description: page.title,
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Academic Paper Style Layout */}
        <article className="max-w-4xl mx-auto px-4 py-16">
          {/* Title - Centered, Uppercase, Bold */}
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 uppercase leading-tight">
            {page.title}
          </h1>

          {/* Author Number - Centered */}
          <div className="text-center text-xl text-gray-700 mb-2">
            1
          </div>

          {/* Affiliation - Centered */}
          <div className="text-center text-lg text-gray-600 mb-6">
            DRW Foundation
          </div>

          {/* Date Badge - Centered */}
          <div className="flex justify-center mb-8">
            <span className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Program DRW Foundation
            </span>
          </div>

          {/* Horizontal Line */}
          <hr className="border-t-2 border-gray-300 mb-8" />

          {/* Content - Justified Text */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-center prose-headings:font-bold prose-headings:uppercase prose-headings:mb-6
              prose-p:text-justify prose-p:leading-loose prose-p:mb-6
              prose-ul:text-justify prose-ul:leading-loose
              prose-ol:text-justify prose-ol:leading-loose
              prose-li:mb-2
              prose-strong:text-gray-900
              prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-justify
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8
              prose-h2:text-2xl prose-h3:text-xl
              prose-table:text-left"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* Horizontal Line */}
          <hr className="border-t-2 border-gray-300 mt-12 mb-8" />

          {/* Footer */}
          <div className="text-center text-gray-600">
            <p className="mb-2">Program ini dipublikasikan oleh DRW Foundation</p>
            <p className="text-sm">© 2024 DRW Foundation. All rights reserved.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

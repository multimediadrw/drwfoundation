import { getPostBySlug, getPostsData } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | DRW Foundation`,
    description: post.excerpt || post.title,
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16">
        {/* Academic Article Container */}
        <article className="max-w-4xl mx-auto px-4">
          
          {/* Title - Centered, Bold, Uppercase */}
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-gray-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          {/* Author - Centered */}
          {post.author && (
            <div className="text-center mb-2">
              <p className="text-xl font-medium text-gray-900">
                {post.author}
              </p>
            </div>
          )}
          
          {/* Affiliation/Organization - Centered */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              DRW Foundation
            </p>
          </div>
          
          {/* Date Badge - Centered */}
          <div className="text-center mb-12">
            <time className="inline-block px-6 py-2 bg-purple-100 text-purple-700 font-semibold uppercase tracking-wide text-sm rounded-full">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-300 mb-12" />
          
          {/* Article Content - Justified, Academic Style */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-center prose-headings:text-gray-900 prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-10
              prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-gray-800 prose-p:text-base prose-p:leading-loose prose-p:mb-6 prose-p:text-justify
              prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-em:text-gray-800 prose-em:italic
              prose-ul:list-disc prose-ul:ml-8 prose-ul:mb-6 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:ml-8 prose-ol:mb-6 prose-ol:space-y-2
              prose-li:text-gray-800 prose-li:text-base prose-li:leading-loose prose-li:text-justify
              prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:text-justify
              prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto
              prose-hr:border-gray-300 prose-hr:my-8
              prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom Line */}
          <hr className="border-gray-300 mt-12 mb-8" />
          
          {/* Footer Info */}
          <div className="text-center text-gray-600 text-sm">
            <p>Artikel ini dipublikasikan oleh DRW Foundation</p>
            <p className="mt-2">© {new Date(post.date).getFullYear()} DRW Foundation. All rights reserved.</p>
          </div>
          
        </article>
      </main>
      <Footer />
    </>
  )
}

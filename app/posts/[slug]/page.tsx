'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Post() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<'id' | 'en'>('id')

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await fetch(`/api/posts/${slug}`)
        const data = await response.json()
        if (data.success) {
          setPost(data.data)
        }
      } catch (error) {
        console.error('Failed to load post:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600">The article you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Parse content for dual language
  const hasEnglish = post.content.includes('---ENGLISH---')
  const [contentId, contentEn] = hasEnglish 
    ? post.content.split('---ENGLISH---').map((c: string) => c.trim())
    : [post.content, post.content]

  const currentTitle = language === 'en' && post.title_en ? post.title_en : post.title
  const currentExcerpt = language === 'en' && post.excerpt_en ? post.excerpt_en : post.excerpt
  const currentContent = language === 'en' ? contentEn : contentId

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16">
        {/* Academic Article Container */}
        <article className="max-w-4xl mx-auto px-4">
          
          {/* Language Switcher */}
          {hasEnglish && (
            <div className="flex justify-end mb-8">
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    language === 'id'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    language === 'en'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          )}
          
          {/* Title - Centered, Bold, Uppercase */}
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-gray-900 mb-8 leading-tight tracking-tight">
            {currentTitle}
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
              {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {/* Horizontal Divider */}
          <hr className="border-t-2 border-gray-300 mb-12" />
          
          {/* Content - Justified, Academic Style */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
              prose-p:text-justify prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-800
              prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-gray-900
              prose-ul:list-disc prose-ul:ml-8 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:ml-8 prose-ol:mb-6
              prose-li:mb-2 prose-li:text-gray-800
              prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: currentContent }}
          />
          
          {/* Horizontal Divider */}
          <hr className="border-t-2 border-gray-300 mt-12 mb-8" />
          
          {/* Footer Note */}
          <div className="text-center text-sm text-gray-600 italic">
            {language === 'en' 
              ? 'Article published by DRW Foundation'
              : 'Artikel ini dipublikasikan oleh DRW Foundation'
            }
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

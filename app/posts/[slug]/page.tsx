'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TableOfContents from '@/components/TableOfContents'

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
        <main className="min-h-screen bg-gray-50 py-16">
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
        <main className="min-h-screen bg-gray-50 py-16">
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
      <main className="min-h-screen bg-gray-50 py-12">
        {/* Modern Article Container */}
        <article className="max-w-4xl mx-auto px-4">
          
          {/* Language Switcher */}
          {hasEnglish && (
            <div className="flex justify-end mb-8">
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    language === 'id'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    language === 'en'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          )}
          
          {/* Header Section with White Background */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            {/* Category/Tag Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 font-semibold text-xs uppercase tracking-wider rounded-full">
                {language === 'en' ? 'News' : 'Berita'}
              </span>
              <span className="text-gray-400">•</span>
              <time className="text-sm text-gray-600 font-medium">
                {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Title - Modern, Bold */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {currentTitle}
            </h1>
            
            {/* Key Highlight / Excerpt */}
            {currentExcerpt && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg mb-6">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  💡 <span className="font-semibold">Key Highlight:</span> {currentExcerpt}
                </p>
              </div>
            )}
            
            {/* Author & Organization */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author ? post.author.charAt(0).toUpperCase() : 'D'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author || 'DRW Foundation'}
                </p>
                <p className="text-sm text-gray-600">
                  DRW Foundation
                </p>
              </div>
            </div>
          </div>
          
          {/* Table of Contents - Auto-generated for long articles */}
          <TableOfContents content={currentContent} language={language} />
          
          {/* Content Section with White Background */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Article Content - Modern, Scannable Style */}
            <div 
              className="article-content prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24
                
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 
                prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-blue-500
                prose-h2:text-transparent prose-h2:bg-clip-text 
                prose-h2:bg-gradient-to-r prose-h2:from-purple-600 prose-h2:to-blue-600
                
                prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
                prose-h3:text-gray-800
                
                prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3
                prose-h4:text-gray-800
                
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                prose-p:max-w-none
                
                prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline 
                hover:prose-a:underline hover:prose-a:text-purple-700
                
                prose-strong:font-bold prose-strong:text-gray-900
                
                prose-em:italic prose-em:text-gray-700
                
                prose-ul:my-6 prose-ul:space-y-3
                prose-ol:my-6 prose-ol:space-y-3
                
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-li:pl-2
                
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500 
                prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6 
                prose-blockquote:my-6 prose-blockquote:rounded-r-lg
                prose-blockquote:italic prose-blockquote:text-gray-700
                
                prose-img:rounded-xl prose-img:shadow-xl prose-img:border-4 
                prose-img:border-gray-100 prose-img:mx-auto prose-img:my-8
                prose-img:transition-transform prose-img:duration-300
                hover:prose-img:scale-[1.02]
                
                prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:px-2 
                prose-code:py-1 prose-code:rounded prose-code:text-sm
                
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl 
                prose-pre:p-6 prose-pre:my-6 prose-pre:shadow-lg
                
                prose-table:my-6 prose-table:border-collapse
                prose-th:bg-purple-100 prose-th:text-purple-900 prose-th:font-bold 
                prose-th:p-3 prose-th:border prose-th:border-gray-300
                prose-td:p-3 prose-td:border prose-td:border-gray-300
                prose-tr:even:bg-gray-50"
              dangerouslySetInnerHTML={{ __html: currentContent }}
            />
          </div>
          
          {/* Footer Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {language === 'en' ? 'Published by' : 'Dipublikasikan oleh'}
                  </p>
                  <p className="text-sm text-gray-600">DRW Foundation</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  {language === 'en' ? 'Share' : 'Bagikan'}
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                  {language === 'en' ? 'Print' : 'Cetak'}
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

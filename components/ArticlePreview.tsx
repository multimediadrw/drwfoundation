'use client'

interface ArticlePreviewProps {
  title: string
  excerpt: string
  content: string
  date: string
  author?: string
}

export default function ArticlePreview({ title, excerpt, content, date, author }: ArticlePreviewProps) {
  // Count words for reading time
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="bg-gray-50 rounded-xl p-6 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-900">👁️ Preview Artikel</h3>
        <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full">
          {wordCount} kata • {readingTime} menit baca
        </span>
      </div>

      {/* Preview Container - Matches actual article styling */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-8">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 font-semibold text-xs uppercase tracking-wider rounded-full">
              Berita
            </span>
            <span className="text-gray-400">•</span>
            <time className="text-sm text-gray-600 font-medium">
              {new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title || 'Judul Artikel Anda'}
          </h1>
          
          {/* Key Highlight */}
          {excerpt && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg mb-6">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                💡 <span className="font-semibold">Key Highlight:</span> {excerpt}
              </p>
            </div>
          )}
          
          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {author ? author.charAt(0).toUpperCase() : 'D'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {author || 'DRW Foundation'}
              </p>
              <p className="text-sm text-gray-600">
                DRW Foundation
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 border-t border-gray-100">
          <div 
            className="article-content prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 
              prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-blue-500
              prose-h2:text-transparent prose-h2:bg-clip-text 
              prose-h2:bg-gradient-to-r prose-h2:from-purple-600 prose-h2:to-blue-600
              
              prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
              prose-h3:text-gray-800
              
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              
              prose-strong:font-bold prose-strong:text-gray-900
              
              prose-em:italic prose-em:text-gray-700
              
              prose-ul:my-6 prose-ul:space-y-3
              prose-ol:my-6 prose-ol:space-y-3
              
              prose-li:text-gray-700 prose-li:leading-relaxed
              
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500 
              prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6 
              prose-blockquote:my-6 prose-blockquote:rounded-r-lg
              prose-blockquote:italic prose-blockquote:text-gray-700
              
              prose-img:rounded-xl prose-img:shadow-xl prose-img:border-4 
              prose-img:border-gray-100 prose-img:mx-auto prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 italic">Konten artikel akan muncul di sini...</p>' }}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Info:</strong> Preview ini menampilkan artikel persis seperti yang akan dilihat pengunjung di website.
          {wordCount > 500 && ' Table of Contents akan muncul otomatis karena artikel lebih dari 500 kata.'}
        </p>
      </div>
    </div>
  )
}

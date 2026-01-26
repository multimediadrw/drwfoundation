'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import EditorHelper from '@/components/EditorHelper'
import ArticlePreview from '@/components/ArticlePreview'

// Dynamically import TipTap editor (client-side only)
const TipTapEditor = dynamic(() => import('@/components/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-8 bg-gray-50 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
      <p className="text-gray-600">Loading editor...</p>
    </div>
  )
})

export default function NewPostPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState<'id' | 'en'>('id')
  const [showPreview, setShowPreview] = useState(false)
  const editorRef = useRef<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    excerpt_en: '',
    content: '',
    content_en: '',
  })

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const htmlToMarkdown = (html: string) => {
    return html
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n\n')
      .replace(/<strong>/g, '**')
      .replace(/<\/strong>/g, '**')
      .replace(/<em>/g, '*')
      .replace(/<\/em>/g, '*')
      .replace(/<h1>/g, '# ')
      .replace(/<\/h1>/g, '\n\n')
      .replace(/<h2>/g, '## ')
      .replace(/<\/h2>/g, '\n\n')
      .replace(/<h3>/g, '### ')
      .replace(/<\/h3>/g, '\n\n')
      .replace(/<ul>/g, '')
      .replace(/<\/ul>/g, '\n')
      .replace(/<ol>/g, '')
      .replace(/<\/ol>/g, '\n')
      .replace(/<li>/g, '- ')
      .replace(/<\/li>/g, '\n')
      .replace(/<blockquote>/g, '> ')
      .replace(/<\/blockquote>/g, '\n\n')
      .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')
      .replace(/<img[^>]+src="([^"]+)"[^>]*>/g, '![]($1)')
      .replace(/<br\s*\/?>/g, '\n')
      .trim()
  }

  const handleInsertTemplate = (template: string) => {
    if (activeTab === 'id') {
      setFormData({ ...formData, content: template })
    } else {
      setFormData({ ...formData, content_en: template })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Convert HTML to Markdown
      const contentMarkdown = htmlToMarkdown(formData.content)
      const contentMarkdownEn = htmlToMarkdown(formData.content_en)

      // Generate markdown content with dual language
      const markdown = `---
title: "${formData.title}"
title_en: "${formData.title_en || formData.title}"
date: "${formData.date}"
excerpt: "${formData.excerpt}"
excerpt_en: "${formData.excerpt_en || formData.excerpt}"
image: ""
---

${contentMarkdown}

---ENGLISH---

${contentMarkdownEn || contentMarkdown}
`

      // Save to GitHub via API
      const response = await fetch('/api/admin/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          content: markdown,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('✅ Artikel berhasil disimpan!')
        // Force router refresh to clear cache
        router.refresh()
        setTimeout(() => {
          router.push('/admin/posts')
          router.refresh()
        }, 1500)
      } else {
        setError(data.error || 'Gagal menyimpan artikel')
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  if (!mounted) {
    return null
  }

  const currentContent = activeTab === 'id' ? formData.content : formData.content_en
  const currentTitle = activeTab === 'id' ? formData.title : (formData.title_en || formData.title)
  const currentExcerpt = activeTab === 'id' ? formData.excerpt : (formData.excerpt_en || formData.excerpt)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-purple-600 hover:text-purple-700">
                ← Kembali
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">✍️ Artikel Baru</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                {showPreview ? '✏️ Edit' : '👁️ Preview'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition font-medium"
              >
                {saving ? '💾 Menyimpan...' : '💾 Simpan'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ❌ {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600 p-4 rounded-r-lg mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-purple-900 mb-1">Tips Penulisan Modern</h3>
              <p className="text-sm text-gray-700">
                Gunakan <strong>paragraf pendek (max 3 kalimat)</strong>, <strong>H2 untuk section utama</strong>, 
                dan <strong>bullet points untuk detail</strong>. Klik tombol 💡 di pojok kanan bawah untuk template & panduan lengkap!
              </p>
            </div>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="space-y-6">
            <ArticlePreview
              title={currentTitle}
              excerpt={currentExcerpt}
              content={currentContent}
              date={formData.date}
            />
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tanggal */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Tanggal Publikasi *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>

            {/* Language Tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setActiveTab('id')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'id'
                        ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🇮🇩 Bahasa Indonesia
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('en')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'en'
                        ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {activeTab === 'id' ? (
                  <>
                    {/* Indonesian Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        📝 Judul Artikel (Indonesia) *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Contoh: DRW Foundation Salurkan 5.000 Paket Sembako untuk Korban Banjir"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Maksimal 80 karakter, menarik dan informatif
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        💡 Key Highlight / Ringkasan *
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        rows={3}
                        placeholder="Contoh: DRW Foundation menyalurkan 5.000 paket sembako kepada korban banjir di Jakarta Timur sebagai bentuk kepedulian terhadap masyarakat terdampak bencana."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Ringkasan 1-2 kalimat yang powerful - akan muncul sebagai highlight di awal artikel
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ✍️ Konten Artikel (Indonesia) *
                      </label>
                      <div className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>📋 Tips:</strong> Gunakan H2 untuk section utama, paragraf max 3 kalimat, 
                          dan bullet points untuk detail. Klik tombol 💡 untuk template siap pakai!
                        </p>
                      </div>
                      <TipTapEditor
                        content={formData.content}
                        onChange={(html) => setFormData({ ...formData, content: html })}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* English Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        📝 Article Title (English)
                      </label>
                      <input
                        type="text"
                        value={formData.title_en}
                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Example: DRW Foundation Distributes 5,000 Food Packages to Flood Victims"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Optional - If empty, Indonesian title will be used
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        💡 Key Highlight / Excerpt (English)
                      </label>
                      <textarea
                        value={formData.excerpt_en}
                        onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        rows={3}
                        placeholder="Example: DRW Foundation distributed 5,000 food packages to flood victims in East Jakarta as a form of care for disaster-affected communities."
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Optional - If empty, Indonesian excerpt will be used
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ✍️ Article Content (English)
                      </label>
                      <TipTapEditor
                        content={formData.content_en}
                        onChange={(html) => setFormData({ ...formData, content_en: html })}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Optional - If empty, Indonesian content will be used
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button (Mobile) */}
            <div className="bg-white rounded-lg shadow p-6 lg:hidden">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition font-medium"
              >
                {saving ? '💾 Menyimpan...' : '💾 Simpan Artikel'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Editor Helper - Floating Button */}
      {!showPreview && <EditorHelper onInsertTemplate={handleInsertTemplate} />}
    </div>
  )
}

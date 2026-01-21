'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    image: '',
  })

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Generate markdown content
    const markdown = `---
title: "${formData.title}"
date: "${formData.date}"
excerpt: "${formData.excerpt}"
image: "${formData.image}"
---

${formData.content}
`

    // Show markdown for manual saving
    alert('Markdown generated! Copy dan simpan ke file:\n\n' + 
          `Filename: content/posts/${slug}.md\n\n` +
          'Markdown content akan ditampilkan di console.')
    console.log('=== MARKDOWN CONTENT ===')
    console.log(markdown)
    console.log('=== END MARKDOWN ===')
    console.log(`\nSave to: content/posts/${slug}.md`)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts" className="text-purple-600 hover:text-purple-700">
              ← Kembali
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Artikel Baru</h1>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Artikel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-lg font-semibold"
              placeholder="Masukkan judul artikel"
              required
            />
          </div>

          {/* Meta */}
          <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Gambar
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="https://cdn.example.com/image.jpg"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan (Excerpt) *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
              placeholder="Ringkasan singkat artikel (2-3 kalimat)"
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Konten Artikel (Markdown) *
              </label>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Panduan Markdown →
              </a>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none font-mono text-sm"
              placeholder="Tulis konten artikel dalam format Markdown...

Contoh:
## Heading 2
### Heading 3

Paragraf biasa dengan **bold** dan *italic*.

- List item 1
- List item 2

1. Numbered list
2. Item kedua

> Blockquote

[Link text](https://example.com)

![Alt text](https://cdn.example.com/image.jpg)"
              required
            />
          </div>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Cara Menyimpan Artikel</h3>
                <ol className="text-yellow-800 text-sm space-y-1 list-decimal list-inside">
                  <li>Klik tombol "Generate Markdown" di bawah</li>
                  <li>Markdown content akan ditampilkan di browser console (F12)</li>
                  <li>Copy markdown content tersebut</li>
                  <li>Buat file baru di <code className="bg-yellow-100 px-2 py-0.5 rounded">content/posts/nama-artikel.md</code></li>
                  <li>Paste markdown content ke file tersebut</li>
                  <li>Save file dan rebuild website</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition text-lg"
            >
              Generate Markdown
            </button>
            <Link
              href="/admin/posts"
              className="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition text-lg"
            >
              Batal
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

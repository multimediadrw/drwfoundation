'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'

export default function NewProgramPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
---

${formData.content}
`

    // Show markdown for manual saving
    alert('Markdown generated! Copy dan simpan ke file:\n\n' + 
          `Filename: content/pages/${slug}.md\n\n` +
          'Markdown content akan ditampilkan di console.')
    console.log('=== MARKDOWN CONTENT ===')
    console.log(markdown)
    console.log('=== END MARKDOWN ===')
    console.log(`\nSave to: content/pages/${slug}.md`)
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
            <Link href="/admin/pages" className="text-purple-600 hover:text-purple-700">
              ← Kembali
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Program Baru</h1>
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
              Nama Program *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none text-lg font-semibold"
              placeholder="Masukkan nama program"
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi Program (Markdown) *
              </label>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:text-green-700"
              >
                Panduan Markdown →
              </a>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none font-mono text-sm"
              placeholder="Tulis deskripsi program dalam format Markdown...

Contoh:
## Tentang Program

Program ini bertujuan untuk...

### Manfaat Program
- Manfaat 1
- Manfaat 2
- Manfaat 3

### Cara Berpartisipasi
1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga

> Quote atau catatan penting

**Kontak:** 
- Email: info@drwfoundation.com
- WhatsApp: 0812-3456-7890"
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
                <h3 className="font-semibold text-yellow-900 mb-1">Cara Menyimpan Program</h3>
                <ol className="text-yellow-800 text-sm space-y-1 list-decimal list-inside">
                  <li>Klik tombol "Generate Markdown" di bawah</li>
                  <li>Markdown content akan ditampilkan di browser console (F12)</li>
                  <li>Copy markdown content tersebut</li>
                  <li>Buat file baru di <code className="bg-yellow-100 px-2 py-0.5 rounded">content/pages/nama-program.md</code></li>
                  <li>Paste markdown content ke file tersebut</li>
                  <li>Save file dan rebuild website</li>
                  <li>Program akan muncul di halaman /program</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition text-lg"
            >
              Generate Markdown
            </button>
            <Link
              href="/admin/pages"
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

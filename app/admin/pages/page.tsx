'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'

export default function AdminPagesPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-purple-600 hover:text-purple-700">
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Program</h1>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Semua Program</h2>
            <p className="text-gray-600">Total: 17 program</p>
          </div>
          <Link
            href="/admin/pages/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Program Baru
          </Link>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Cara Edit Program</h3>
              <p className="text-blue-800 text-sm">
                Program disimpan dalam file Markdown (.md) di folder <code className="bg-blue-100 px-2 py-0.5 rounded">content/pages/</code>.
                Untuk mengedit program, Anda perlu mengakses file tersebut melalui file manager atau FTP.
              </p>
              <div className="mt-3 space-y-1 text-sm text-blue-800">
                <p>• <strong>Lokasi file:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">/content/pages/nama-program.md</code></p>
                <p>• <strong>Format:</strong> Markdown dengan frontmatter (title, dll)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Masjid Glowing Indonesia', slug: 'masjid-glowing-indonesia' },
            { title: 'Qurban Idul Adha', slug: 'qurban-idul-adha' },
            { title: 'Beasiswa Pendidikan', slug: 'beasiswa-pendidikan' },
            { title: 'Bantuan Bencana Alam', slug: 'bantuan-bencana-alam' },
            { title: 'Pembangunan Fasilitas Umum', slug: 'pembangunan-fasilitas-umum' },
            { title: 'Program Kesehatan Gratis', slug: 'program-kesehatan-gratis' },
          ].map((program, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Slug: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{program.slug}</code>
              </p>
              
              <div className="flex gap-2">
                <Link
                  href={`/program/${program.slug}`}
                  target="_blank"
                  className="flex-1 px-4 py-2 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  Lihat
                </Link>
                <button className="flex-1 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

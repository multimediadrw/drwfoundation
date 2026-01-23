'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'

const initialPrograms = [
  { title: 'Ambulan Gratis', slug: 'ambulan-gratis' },
  { title: 'Bahagiakan Santri Yatim', slug: 'bahagiakan-santri-yatim' },
  { title: 'Bantuan Modal Usaha', slug: 'bantuan-modal-usaha' },
  { title: 'Berbagi Air Bersih', slug: 'berbagi-air-bersih' },
  { title: 'Donasi Palestina', slug: 'donasi-palestina' },
  { title: 'DRW Goes to Panti', slug: 'drw-goes-to-panti' },
  { title: 'Kado Spesial Ramadhan', slug: 'kado-spesial-ramadhan' },
  { title: 'Khitan Massal', slug: 'khitan-massal' },
  { title: 'Masjid Glowing Indonesia', slug: 'masjid-glowing-indonesia' },
  { title: 'Peduli Guru Ngaji', slug: 'peduli-guru-ngaji' },
  { title: 'Peduli Santri Yatim', slug: 'peduli-santri-yatim' },
  { title: 'Pejuang Quran', slug: 'pejuang-quran' },
  { title: 'Program Donasi', slug: 'program-donasi' },
  { title: 'Qurban Idul Adha', slug: 'qurban-idul-adha' },
  { title: 'Sedekah Jumat', slug: 'sedekah-jumat' },
  { title: 'Seragam Gratis', slug: 'seragam-gratis' },
  { title: 'Wakaf Quran', slug: 'wakaf-quran' },
]

export default function AdminPagesPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [programs, setPrograms] = useState(initialPrograms)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus program "${title}"?\n\nProgram akan dihapus permanen dari GitHub dan tidak dapat dikembalikan.`)) {
      return
    }

    try {
      setDeleting(slug)
      const response = await fetch('/api/admin/delete-page', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug })
      })

      const data = await response.json()

      if (data.success) {
        alert('✅ Program berhasil dihapus!')
        // Remove from list
        setPrograms(programs.filter(p => p.slug !== slug))
      } else {
        alert(`❌ Gagal menghapus program: ${data.error}`)
      }
    } catch (error) {
      console.error('Error deleting program:', error)
      alert('❌ Gagal menghapus program. Silakan coba lagi.')
    } finally {
      setDeleting(null)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-green-600 hover:text-green-700 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
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
            <p className="text-gray-600">Total: {programs.length} program</p>
          </div>
          <Link
            href="/admin/pages/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
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
              <h3 className="font-semibold text-blue-900 mb-1">💾 Fitur Edit & Delete Aktif!</h3>
              <p className="text-blue-800 text-sm">
                Klik "Edit" untuk mengedit program atau "Hapus" untuk menghapus program. Semua perubahan akan tersimpan ke GitHub.
              </p>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex-1">
                  {program.title}
                </h3>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                  Active
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/pages/edit/${program.slug}`}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2 font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Program
                </Link>

                <Link
                  href={`/program/${program.slug}`}
                  target="_blank"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Lihat Program
                </Link>

                <button
                  onClick={() => handleDelete(program.slug, program.title)}
                  disabled={deleting === program.slug}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === program.slug ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus Program
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

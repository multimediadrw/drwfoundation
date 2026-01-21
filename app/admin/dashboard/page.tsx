'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    posts: 0,
    programs: 0,
    pages: 0,
  })

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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700">
              Lihat Website
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h2>
          <p className="text-purple-100">Kelola konten website DRW Foundation dari sini</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Artikel</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">85</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Program</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">17</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Halaman</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition group"
            >
              <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-600 transition">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Artikel Baru</p>
                <p className="text-sm text-gray-600">Buat artikel berita</p>
              </div>
            </Link>

            <Link
              href="/admin/posts"
              className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition group"
            >
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 transition">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Edit Artikel</p>
                <p className="text-sm text-gray-600">Kelola artikel berita</p>
              </div>
            </Link>

            <Link
              href="/admin/pages/new"
              className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition group"
            >
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-600 transition">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Program Baru</p>
                <p className="text-sm text-gray-600">Buat program baru</p>
              </div>
            </Link>

            <Link
              href="/admin/pages"
              className="flex items-center gap-3 p-4 border-2 border-orange-200 rounded-lg hover:border-orange-600 hover:bg-orange-50 transition group"
            >
              <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-600 transition">
                <svg className="w-6 h-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Edit Program</p>
                <p className="text-sm text-gray-600">Kelola program</p>
              </div>
            </Link>

            <Link
              href="/admin/laporan"
              className="flex items-center gap-3 p-4 border-2 border-pink-200 rounded-lg hover:border-pink-600 hover:bg-pink-50 transition group"
            >
              <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-600 transition">
                <svg className="w-6 h-6 text-pink-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Edit Laporan</p>
                <p className="text-sm text-gray-600">Kelola laporan kegiatan</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Website telah diupdate</p>
                <p className="text-sm text-gray-600">Format artikel akademik diterapkan</p>
              </div>
              <span className="text-sm text-gray-500">Hari ini</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Gallery kegiatan ditambahkan</p>
                <p className="text-sm text-gray-600">8 foto kegiatan DRW Foundation</p>
              </div>
              <span className="text-sm text-gray-500">Hari ini</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Logo dan favicon diupdate</p>
                <p className="text-sm text-gray-600">Brand identity baru diterapkan</p>
              </div>
              <span className="text-sm text-gray-500">Hari ini</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

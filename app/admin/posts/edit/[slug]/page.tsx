'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import Link from 'next/link'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    // Load post content
    loadPost()
  }, [router, slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/get-post?slug=${slug}`)
      const data = await response.json()

      if (data.success) {
        setContent(data.content)
      } else {
        setError(data.error || 'Failed to load post')
      }
    } catch (err) {
      setError('Failed to load post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const response = await fetch('/api/admin/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          content
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Artikel berhasil disimpan! ✅')
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      } else {
        setError(data.error || 'Failed to save post')
      }
    } catch (err) {
      setError('Failed to save post')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin/posts" className="text-purple-600 hover:text-purple-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
                <p className="text-sm text-gray-600">{slug}</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Simpan
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            ❌ {error}
          </div>
        </div>
      )}

      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {success}
          </div>
        </div>
      )}

      {/* Editor */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Artikel (Markdown)
            </label>
            <div className="text-xs text-gray-500 mb-2">
              Format: Markdown dengan frontmatter (---). Edit title, date, excerpt, author, dan konten artikel.
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
            placeholder="---
title: 'Judul Artikel'
date: '2024-01-01'
excerpt: 'Ringkasan artikel...'
author: 'Admin'
---

# Konten Artikel

Tulis konten artikel di sini..."
          />
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips Edit Artikel</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Jangan hapus bagian frontmatter (antara --- dan ---)</li>
            <li>• Format tanggal: YYYY-MM-DD (contoh: 2024-01-21)</li>
            <li>• Gunakan Markdown untuk format teks (# untuk heading, ** untuk bold, dll)</li>
            <li>• Gambar: gunakan path relatif seperti /images/nama-gambar.jpg</li>
            <li>• Klik "Simpan" untuk menyimpan perubahan</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

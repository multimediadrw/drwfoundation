'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'
import Link from 'next/link'

interface Program {
  name: string
  beneficiaries: string
  budget: string
}

interface Financials {
  income: string
  distribution: string
  beneficiaries: string
  programs: string
  cities: string
}

interface LaporanData {
  title: string
  intro: string
  programs: Program[]
  financials: Financials
}

export default function AdminLaporanPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [laporan, setLaporan] = useState<LaporanData>({
    title: '',
    intro: '',
    programs: [],
    financials: {
      income: '',
      distribution: '',
      beneficiaries: '',
      programs: '',
      cities: ''
    }
  })

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    loadLaporan()
  }, [router])

  const loadLaporan = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/get-laporan')
      const data = await response.json()

      if (data.success) {
        setLaporan(data.laporan)
      }
    } catch (err) {
      console.error('Error loading laporan:', err)
      setError('Failed to load laporan')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const response = await fetch('/api/admin/save-laporan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ laporan })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('✅ Laporan berhasil disimpan!')
        setIsEditing(false)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      } else {
        setError(data.error || 'Failed to save laporan')
      }
    } catch (err) {
      setError('Failed to save laporan')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleGenerateMarkdown = () => {
    const markdown = `---
title: "${laporan.title}"
date: "${new Date().toISOString().split('T')[0]}"
---

# ${laporan.title}

${laporan.intro}

## Program yang Dilaksanakan

${laporan.programs.map((p, i) => `### ${i + 1}. ${p.name}
- **Penerima Manfaat**: ${p.beneficiaries}
- **Anggaran**: ${p.budget}
`).join('\n')}

## Rekapitulasi Keuangan

### Penerimaan Dana
${laporan.financials.income}

### Penyaluran Dana
${laporan.financials.distribution}

## Statistik

- **Penerima Manfaat**: ${laporan.financials.beneficiaries}
- **Total Program**: ${laporan.financials.programs}
- **Kota/Kabupaten**: ${laporan.financials.cities}

## Audit dan Verifikasi

Laporan ini telah diaudit oleh auditor independen dan dapat diverifikasi melalui sistem transparansi DRW Foundation.

---

*Laporan ini dipublikasikan pada ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}*
`
    
    // Create a blob and download
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `laporan-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setSuccess('✅ Markdown file downloaded!')
    setTimeout(() => setSuccess(''), 3000)
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
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-purple-700 hover:text-purple-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Laporan</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Menyimpan...
                      </>
                    ) : (
                      <>💾 Simpan</>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleGenerateMarkdown}
                    className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50"
                  >
                    📄 Download Markdown
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                  >
                    ✏️ Edit Laporan
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Laporan
            </label>
            {isEditing ? (
              <input
                type="text"
                value={laporan.title}
                onChange={(e) => setLaporan({ ...laporan, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900">{laporan.title}</h2>
            )}
          </div>

          {/* Intro */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pengantar
            </label>
            {isEditing ? (
              <textarea
                value={laporan.intro}
                onChange={(e) => setLaporan({ ...laporan, intro: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{laporan.intro}</p>
            )}
          </div>

          {/* Programs */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Program yang Dilaksanakan</h3>
            <div className="space-y-4">
              {laporan.programs.map((program, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Program
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={program.name}
                          onChange={(e) => {
                            const newPrograms = [...laporan.programs]
                            newPrograms[index].name = e.target.value
                            setLaporan({ ...laporan, programs: newPrograms })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <p className="font-semibold text-gray-900">{program.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Penerima Manfaat
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={program.beneficiaries}
                          onChange={(e) => {
                            const newPrograms = [...laporan.programs]
                            newPrograms[index].beneficiaries = e.target.value
                            setLaporan({ ...laporan, programs: newPrograms })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <p className="text-gray-700">{program.beneficiaries}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anggaran
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={program.budget}
                          onChange={(e) => {
                            const newPrograms = [...laporan.programs]
                            newPrograms[index].budget = e.target.value
                            setLaporan({ ...laporan, programs: newPrograms })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <p className="text-purple-700 font-semibold">{program.budget}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rekapitulasi Keuangan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerimaan Dana
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.income}
                    onChange={(e) => setLaporan({
                      ...laporan,
                      financials: { ...laporan.financials, income: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-2xl font-bold text-green-600">{laporan.financials.income}</p>
                )}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penyaluran Dana
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.distribution}
                    onChange={(e) => setLaporan({
                      ...laporan,
                      financials: { ...laporan.financials, distribution: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-2xl font-bold text-purple-700">{laporan.financials.distribution}</p>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Statistik</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerima Manfaat
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.beneficiaries}
                    onChange={(e) => setLaporan({
                      ...laporan,
                      financials: { ...laporan.financials, beneficiaries: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-2xl font-bold text-purple-700">{laporan.financials.beneficiaries}</p>
                )}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Program
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.programs}
                    onChange={(e) => setLaporan({
                      ...laporan,
                      financials: { ...laporan.financials, programs: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-2xl font-bold text-purple-700">{laporan.financials.programs}</p>
                )}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota/Kabupaten
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.cities}
                    onChange={(e) => setLaporan({
                      ...laporan,
                      financials: { ...laporan.financials, cities: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-2xl font-bold text-purple-700">{laporan.financials.cities}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

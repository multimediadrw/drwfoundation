'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout } from '@/lib/admin/auth'
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
      setError('')
      
      const response = await fetch('/api/admin/get-laporan')
      const data = await response.json()

      if (data.success) {
        setLaporan(data.laporan)
      } else {
        setError(data.error || 'Gagal memuat laporan')
      }
    } catch (err) {
      console.error('Error loading laporan:', err)
      setError('Gagal memuat laporan. Silakan refresh halaman.')
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
        setSuccess('✅ Laporan berhasil disimpan dan di-commit ke GitHub!')
        setIsEditing(false)
        setTimeout(() => {
          setSuccess('')
        }, 5000)
      } else {
        setError(data.error || 'Gagal menyimpan laporan')
      }
    } catch (err) {
      setError('Gagal menyimpan laporan. Silakan coba lagi.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const addProgram = () => {
    setLaporan({
      ...laporan,
      programs: [...laporan.programs, { name: '', beneficiaries: '', budget: '' }]
    })
  }

  const removeProgram = (index: number) => {
    const newPrograms = laporan.programs.filter((_, i) => i !== index)
    setLaporan({ ...laporan, programs: newPrograms })
  }

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat laporan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-purple-700 hover:text-purple-800 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Laporan</h1>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold transition"
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
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center gap-2 font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Laporan
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
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
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </div>
        </div>
      )}

      {/* Info Box */}
      {!isEditing && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">💾 Auto-Save ke GitHub</h3>
                <p className="text-blue-800 text-sm">
                  Laporan disimpan dalam format JSON di GitHub repository. Perubahan akan otomatis di-commit dan website akan rebuild otomatis.
                </p>
              </div>
            </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl font-bold"
                placeholder="Contoh: Laporan Tahunan 2024"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900">{laporan.title || 'Belum ada judul'}</h2>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tulis pengantar laporan..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{laporan.intro || 'Belum ada pengantar'}</p>
            )}
          </div>

          {/* Programs */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Program yang Dilaksanakan</h3>
              {isEditing && (
                <button
                  onClick={addProgram}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Program
                </button>
              )}
            </div>
            <div className="space-y-4">
              {laporan.programs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Belum ada program. {isEditing && 'Klik "Tambah Program" untuk menambahkan.'}
                </div>
              ) : (
                laporan.programs.map((program, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-purple-700">Program #{index + 1}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeProgram(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Nama program"
                          />
                        ) : (
                          <p className="font-semibold text-gray-900">{program.name || '-'}</p>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Jumlah penerima"
                          />
                        ) : (
                          <p className="text-gray-700">{program.beneficiaries || '-'}</p>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Rp 0"
                          />
                        ) : (
                          <p className="text-gray-700">{program.budget || '-'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Financials */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rekapitulasi Keuangan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerimaan Dana
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.income}
                    onChange={(e) => setLaporan({ ...laporan, financials: { ...laporan.financials, income: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Rp 0"
                  />
                ) : (
                  <p className="text-xl font-semibold text-green-600">{laporan.financials.income || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penyaluran Dana
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.distribution}
                    onChange={(e) => setLaporan({ ...laporan, financials: { ...laporan.financials, distribution: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Rp 0"
                  />
                ) : (
                  <p className="text-xl font-semibold text-blue-600">{laporan.financials.distribution || '-'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Statistik</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerima Manfaat
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.beneficiaries}
                    onChange={(e) => setLaporan({ ...laporan, financials: { ...laporan.financials, beneficiaries: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="0 orang"
                  />
                ) : (
                  <p className="text-xl font-semibold text-purple-600">{laporan.financials.beneficiaries || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Program
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.programs}
                    onChange={(e) => setLaporan({ ...laporan, financials: { ...laporan.financials, programs: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="0 program"
                  />
                ) : (
                  <p className="text-xl font-semibold text-purple-600">{laporan.financials.programs || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota/Kabupaten
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={laporan.financials.cities}
                    onChange={(e) => setLaporan({ ...laporan, financials: { ...laporan.financials, cities: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="0 kota"
                  />
                ) : (
                  <p className="text-xl font-semibold text-purple-600">{laporan.financials.cities || '-'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

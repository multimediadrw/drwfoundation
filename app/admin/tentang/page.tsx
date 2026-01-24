'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TentangData {
  hero: {
    title: string
    subtitle: string
  }
  pendiri: {
    nama: string
    jabatan: string
    foto: string
    deskripsi: string[]
    quote: string
  }
  visi: string
  misi: string[]
  sejarah: string
  unitBisnis: Array<{
    kategori: string
    deskripsi: string
  }>
  pencapaian: Array<{
    angka: string
    label: string
  }>
}

export default function AdminTentangPage() {
  const [data, setData] = useState<TentangData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/get-tentang')
      const json = await res.json()
      setData(json)
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('❌ Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return
    
    setSaving(true)
    setMessage('')
    
    try {
      const res = await fetch('/api/admin/save-tentang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (res.ok) {
        setMessage('✅ Data berhasil disimpan!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Gagal menyimpan data')
      }
    } catch (error) {
      console.error('Error saving:', error)
      setMessage('❌ Gagal menyimpan data')
    } finally {
      setSaving(false)
    }
  }

  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !data) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const { url } = await res.json()
        setData({
          ...data,
          pendiri: {
            ...data.pendiri,
            foto: url
          }
        })
        setMessage('✅ Foto berhasil diupload!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Gagal upload foto')
      }
    } catch (error) {
      console.error('Error uploading:', error)
      setMessage('❌ Gagal upload foto')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFoto = () => {
    if (!data) return
    
    if (confirm('Apakah Anda yakin ingin menghapus foto pendiri?')) {
      setData({
        ...data,
        pendiri: {
          ...data.pendiri,
          foto: ''
        }
      })
      setMessage('✅ Foto berhasil dihapus! Jangan lupa klik Simpan.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Gagal memuat data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Halaman Tentang</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>💾 Simpan</span>
            )}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">1</span>
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={data.hero.subtitle}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Pendiri Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">2</span>
            Pendiri
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  value={data.pendiri.nama}
                  onChange={(e) => setData({ ...data, pendiri: { ...data.pendiri, nama: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
                <input
                  type="text"
                  value={data.pendiri.jabatan}
                  onChange={(e) => setData({ ...data, pendiri: { ...data.pendiri, jabatan: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto Pendiri</label>
              <div className="flex items-start space-x-4">
                {data.pendiri.foto && (
                  <div className="relative">
                    <img src={data.pendiri.foto} alt="Foto Pendiri" className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200" />
                  </div>
                )}
                <div className="flex flex-col space-y-2">
                  <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer text-center transition-colors">
                    {uploading ? '⏳ Uploading...' : '📷 Upload Foto'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadFoto}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {data.pendiri.foto && (
                    <button
                      onClick={handleDeleteFoto}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      🗑️ Hapus Foto
                    </button>
                  )}
                </div>
              </div>
              {data.pendiri.foto && (
                <p className="text-xs text-gray-500 mt-2 font-mono bg-gray-50 p-2 rounded">URL: {data.pendiri.foto}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Paragraf 1</label>
              <textarea
                value={data.pendiri.deskripsi[0]}
                onChange={(e) => {
                  const newDesc = [...data.pendiri.deskripsi]
                  newDesc[0] = e.target.value
                  setData({ ...data, pendiri: { ...data.pendiri, deskripsi: newDesc } })
                }}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Paragraf 2</label>
              <textarea
                value={data.pendiri.deskripsi[1]}
                onChange={(e) => {
                  const newDesc = [...data.pendiri.deskripsi]
                  newDesc[1] = e.target.value
                  setData({ ...data, pendiri: { ...data.pendiri, deskripsi: newDesc } })
                }}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <textarea
                value={data.pendiri.quote}
                onChange={(e) => setData({ ...data, pendiri: { ...data.pendiri, quote: e.target.value } })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Quote inspiratif dari pendiri..."
              />
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">3</span>
            Visi & Misi
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
              <textarea
                value={data.visi}
                onChange={(e) => setData({ ...data, visi: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Misi (5 poin)</label>
              <div className="space-y-2">
                {data.misi.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold mt-2">{index + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newMisi = [...data.misi]
                        newMisi[index] = e.target.value
                        setData({ ...data, misi: newMisi })
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder={`Misi ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sejarah */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">4</span>
            Sejarah
          </h2>
          <textarea
            value={data.sejarah}
            onChange={(e) => setData({ ...data, sejarah: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Ceritakan sejarah singkat DRW Foundation..."
          />
        </div>

        {/* Unit Bisnis DRW Corp */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">5</span>
            Unit Bisnis DRW Corp
          </h2>
          <div className="space-y-3">
            {data.unitBisnis.map((unit, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={unit.kategori}
                    onChange={(e) => {
                      const newUnitBisnis = [...data.unitBisnis]
                      newUnitBisnis[index].kategori = e.target.value
                      setData({ ...data, unitBisnis: newUnitBisnis })
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                    placeholder="Contoh: Skincare"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Deskripsi</label>
                  <input
                    type="text"
                    value={unit.deskripsi}
                    onChange={(e) => {
                      const newUnitBisnis = [...data.unitBisnis]
                      newUnitBisnis[index].deskripsi = e.target.value
                      setData({ ...data, unitBisnis: newUnitBisnis })
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                    placeholder="Contoh: DRW Skincare, DRW For Man, DRW Kids"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            💡 Tip: Pisahkan nama unit bisnis dengan koma (,) untuk tampilan yang rapi
          </p>
        </div>

        {/* Pencapaian */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm mr-3">6</span>
            Pencapaian Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.pencapaian.map((item, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <label className="block text-xs font-medium text-gray-600 mb-2">Pencapaian {index + 1}</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Angka (Contoh: 500+)"
                    value={item.angka}
                    onChange={(e) => {
                      const newPencapaian = [...data.pencapaian]
                      newPencapaian[index].angka = e.target.value
                      setData({ ...data, pencapaian: newPencapaian })
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent font-bold text-lg"
                  />
                  <input
                    type="text"
                    placeholder="Label (Contoh: Santri Tahfidz)"
                    value={item.label}
                    onChange={(e) => {
                      const newPencapaian = [...data.pencapaian]
                      newPencapaian[index].label = e.target.value
                      setData({ ...data, pencapaian: newPencapaian })
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Save Button Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden shadow-lg">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {saving ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}

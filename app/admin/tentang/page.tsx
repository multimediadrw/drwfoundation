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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-purple-600 hover:text-purple-700">
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Halaman Tentang</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
          <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pendiri</h2>
          <div className="space-y-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto Pendiri</label>
              <div className="flex items-center space-x-4">
                {data.pendiri.foto && (
                  <img src={data.pendiri.foto} alt="Foto Pendiri" className="w-24 h-24 object-cover rounded-lg" />
                )}
                <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  {uploading ? 'Uploading...' : '📷 Upload Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFoto}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
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
              />
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Misi (satu per baris)</label>
              {data.misi.map((item, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newMisi = [...data.misi]
                      newMisi[index] = e.target.value
                      setData({ ...data, misi: newMisi })
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sejarah */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sejarah</h2>
          <textarea
            value={data.sejarah}
            onChange={(e) => setData({ ...data, sejarah: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        {/* Pencapaian */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pencapaian</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.pencapaian.map((item, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Angka"
                  value={item.angka}
                  onChange={(e) => {
                    const newPencapaian = [...data.pencapaian]
                    newPencapaian[index].angka = e.target.value
                    setData({ ...data, pencapaian: newPencapaian })
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => {
                    const newPencapaian = [...data.pencapaian]
                    newPencapaian[index].label = e.target.value
                    setData({ ...data, pencapaian: newPencapaian })
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Save Button Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Menyimpan...' : '💾 Simpan'}
        </button>
      </div>
    </div>
  )
}

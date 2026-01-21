'use client'

import { useState, useEffect } from 'react'
import TipTapEditor from '@/components/TipTapEditor'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [author, setAuthor] = useState('DRW Foundation')
  const [editingSlug, setEditingSlug] = useState<string | null>(null)

  // Fetch posts
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts?published=false')
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingSlug ? `/api/posts/${editingSlug}` : '/api/posts'
      const method = editingSlug ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          content,
          excerpt,
          author,
          published: true,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert(editingSlug ? 'Post updated!' : 'Post created!')
        resetForm()
        fetchPosts()
        setShowEditor(false)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setContent('')
    setExcerpt('')
    setAuthor('DRW Foundation')
    setEditingSlug(null)
  }

  const handleEdit = (post: any) => {
    setTitle(post.title)
    setSlug(post.slug)
    setContent(post.content)
    setExcerpt(post.excerpt)
    setAuthor(post.author)
    setEditingSlug(post.slug)
    setShowEditor(true)
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Yakin ingin menghapus post ini?')) return

    try {
      const response = await fetch(`/api/posts/${slug}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (data.success) {
        alert('Post deleted!')
        fetchPosts()
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete post')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel - DRW Foundation</h1>
          <button
            onClick={() => {
              resetForm()
              setShowEditor(!showEditor)
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showEditor ? '📋 Lihat Posts' : '✏️ Buat Post Baru'}
          </button>
        </div>

        {showEditor ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingSlug ? 'Edit Post' : 'Buat Post Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Judul</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug (URL) - opsional
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="otomatis dari judul"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  rows={3}
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Penulis</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Konten</label>
                <TipTapEditor content={content} onChange={setContent} />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : editingSlug ? 'Update Post' : 'Publish Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setShowEditor(false)
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Semua Posts ({posts.length})</h2>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Slug: <code className="bg-gray-100 px-2 py-1 rounded">{post.slug}</code>
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(post.created_at).toLocaleDateString('id-ID')} • {post.author}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {posts.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Belum ada post. Buat post pertama Anda!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

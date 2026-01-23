'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback, useEffect } from 'react'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function TipTapEditor({ content, onChange, placeholder = 'Tulis konten di sini...' }: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      // Just pass the HTML content, let the backend handle markdown conversion if needed
      const html = editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const addImage = useCallback(() => {
    const url = window.prompt('Masukkan URL gambar:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const uploadImage = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      // Show loading
      const loadingToast = document.createElement('div')
      loadingToast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50'
      loadingToast.textContent = 'Uploading image...'
      document.body.appendChild(loadingToast)
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) throw new Error('Upload failed')
        
        const data = await response.json()
        
        if (data.url && editor) {
          editor.chain().focus().setImage({ src: data.url }).run()
          loadingToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50'
          loadingToast.textContent = '✓ Image uploaded!'
          setTimeout(() => loadingToast.remove(), 2000)
        }
      } catch (error) {
        loadingToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50'
        loadingToast.textContent = '✗ Upload failed'
        setTimeout(() => loadingToast.remove(), 3000)
        console.error('Upload error:', error)
      }
    }
    
    input.click()
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt('Masukkan URL link:')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-8 bg-gray-50 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading editor...</p>
      </div>
    )
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-3 flex flex-wrap gap-2 bg-gradient-to-r from-gray-50 to-gray-100">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-2 rounded font-bold transition ${
              editor.isActive('bold') 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-2 rounded italic transition ${
              editor.isActive('italic')
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-3 py-2 rounded line-through transition ${
              editor.isActive('strike')
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-2 rounded font-bold transition ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-2 rounded font-bold transition ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-2 rounded font-bold transition ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-2 rounded transition ${
              editor.isActive('bulletList')
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-2 rounded transition ${
              editor.isActive('orderedList')
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
            }`}
            type="button"
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        {/* Quote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-2 rounded transition ${
            editor.isActive('blockquote')
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
          }`}
          type="button"
          title="Blockquote"
        >
          &quot; Quote
        </button>

        {/* Image Upload */}
        <button
          onClick={uploadImage}
          className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white transition shadow-md"
          type="button"
          title="Upload Image"
        >
          📷 Upload
        </button>

        {/* Image URL */}
        <button
          onClick={addImage}
          className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          type="button"
          title="Insert Image URL"
        >
          🔗 Image
        </button>

        {/* Link */}
        <button
          onClick={addLink}
          className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          type="button"
          title="Insert Link"
        >
          🔗 Link
        </button>

        {/* Undo/Redo */}
        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-3 py-2 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            type="button"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-3 py-2 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            type="button"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

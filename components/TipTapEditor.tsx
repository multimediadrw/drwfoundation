'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback } from 'react'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Tulis konten artikel Anda di sini...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  })

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
      
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        const data = await response.json()
        
        if (data.success && editor) {
          editor.chain().focus().setImage({ src: data.url }).run()
        }
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Gagal upload gambar')
      }
    }
    
    input.click()
  }, [editor])

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          <s>S</s>
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          H3
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          type="button"
        >
          Quote
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <button
          onClick={uploadImage}
          className="px-3 py-1 rounded bg-white hover:bg-gray-100"
          type="button"
        >
          📷 Upload
        </button>
        <button
          onClick={addImage}
          className="px-3 py-1 rounded bg-white hover:bg-gray-100"
          type="button"
        >
          🔗 Image URL
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          type="button"
        >
          ↶ Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          type="button"
        >
          ↷ Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_PROMPTS = [
  {
    icon: '✍️',
    title: 'Bantu Judul',
    prompt: 'Buatkan 3 judul artikel yang menarik untuk berita tentang: [jelaskan topik berita]'
  },
  {
    icon: '💡',
    title: 'Key Highlight',
    prompt: 'Buatkan Key Highlight (ringkasan 1-2 kalimat) untuk artikel tentang: [jelaskan topik]'
  },
  {
    icon: '📝',
    title: 'Improve Paragraf',
    prompt: 'Perbaiki paragraf ini agar lebih scannable (max 3 kalimat per paragraf): [paste paragraf]'
  },
  {
    icon: '📋',
    title: 'Struktur Artikel',
    prompt: 'Buatkan struktur artikel (heading H2) untuk topik: [jelaskan topik]'
  },
  {
    icon: '🎯',
    title: 'Bullet Points',
    prompt: 'Ubah informasi ini menjadi bullet points yang rapi: [paste text]'
  },
  {
    icon: '❓',
    title: 'Cara Pakai CMS',
    prompt: 'Bagaimana cara [jelaskan yang ingin ditanyakan] di CMS ini?'
  }
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showQuickPrompts, setShowQuickPrompts] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Halo! Saya AI Assistant untuk DRW Foundation CMS. Saya siap membantu Anda dengan:\n\n• Menulis judul artikel yang menarik\n• Membuat Key Highlight yang powerful\n• Memperbaiki struktur artikel\n• Mengubah paragraf panjang jadi pendek\n• Format bullet points\n• Menjawab pertanyaan tentang CMS\n\nAda yang bisa saya bantu? 😊'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI Assistant error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: '❌ Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi tim support.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '👋 Chat telah direset. Ada yang bisa saya bantu? 😊'
      }
    ])
  }

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-white text-2xl"
        title="AI Assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* AI Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs text-blue-100">Siap membantu Anda</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              title="Clear chat"
            >
              🔄
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI sedang berpikir...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts - Collapsible */}
          <div className="border-t border-gray-200 bg-white">
            <button
              onClick={() => setShowQuickPrompts(!showQuickPrompts)}
              className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <p className="text-xs font-semibold text-gray-600">💡 Quick Prompts</p>
              <span className="text-gray-400 text-sm">{showQuickPrompts ? '▼' : '▶'}</span>
            </button>
            
            {showQuickPrompts && (
              <div className="px-3 pb-3">
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleQuickPrompt(prompt.prompt)
                        setShowQuickPrompts(false)
                      }}
                      className="text-xs bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 rounded-lg p-2 transition text-left"
                      title={prompt.prompt}
                    >
                      <div className="font-semibold text-blue-900 mb-1">{prompt.icon}</div>
                      <div className="text-gray-700 leading-tight">{prompt.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan Anda... (Enter untuk kirim)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Tekan <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> untuk kirim, <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Shift+Enter</kbd> untuk baris baru
            </p>
          </div>
        </div>
      )}
    </>
  )
}

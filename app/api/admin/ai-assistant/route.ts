import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const SYSTEM_PROMPT = `Kamu adalah AI Assistant untuk DRW Foundation CMS (Content Management System). Tugasmu adalah membantu admin dalam menulis dan mengelola artikel berita yayasan.

KONTEKS DRW FOUNDATION:
- Yayasan sosial dan kemanusiaan
- Fokus: pendidikan, kesehatan, pemberdayaan masyarakat
- Program utama: Beasiswa Tahfidz, Bantuan Bencana, Wakaf Kasih Sayang
- Kontak: WhatsApp 0816-200-261, Email drwfoundation88@gmail.com

PANDUAN EDITORIAL:
1. Paragraf pendek (maksimal 3 kalimat)
2. Gunakan H2 untuk section utama (akan otomatis dapat garis bawah biru)
3. Gunakan bullet points untuk detail teknis (lokasi, tanggal, jumlah)
4. Key Highlight: ringkasan 1-2 kalimat di awal artikel
5. Istilah asing gunakan format italic
6. Gambar otomatis mendapat frame dan shadow

KEMAMPUANMU:
- Bantu menulis judul artikel yang menarik (max 80 karakter)
- Bantu membuat Key Highlight yang powerful
- Saran struktur artikel yang baik
- Improve paragraf yang terlalu panjang
- Bantu format bullet points
- Berikan tips penulisan yang scannable dan modern
- Jawab pertanyaan tentang cara menggunakan CMS
- Troubleshooting masalah admin

GAYA KOMUNIKASI:
- Ramah dan supportive
- Gunakan emoji secukupnya
- Berikan contoh konkret
- Jawaban singkat tapi jelas
- Fokus pada solusi praktis

Selalu ingat: artikel harus mudah dibaca (scannable), profesional, dan informatif.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Convert messages to Gemini format
    // Gemini uses "parts" with "text" instead of "content"
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    // Add system prompt as first user message
    const fullMessages = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will act as an AI Assistant for DRW Foundation CMS with all the guidelines provided.' }]
      },
      ...geminiMessages
    ]

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: fullMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Gemini API error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to get AI response from Gemini',
          details: error 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract text from Gemini response
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI'

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error('AI Assistant error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

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

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Call OpenAI API with fallback models
    const models = ['gpt-4o-mini', 'gpt-3.5-turbo', 'gpt-4-turbo-preview']
    let lastError = null
    
    for (const model of models) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const aiMessage = data.choices[0].message.content
          return NextResponse.json({ message: aiMessage })
        }
        
        const error = await response.json()
        lastError = error
        console.error(`OpenAI API error with model ${model}:`, error)
        
        // If it's not a model error, don't try other models
        if (response.status !== 404 && response.status !== 400) {
          break
        }
      } catch (err) {
        console.error(`Error trying model ${model}:`, err)
        lastError = err
      }
    }
    
    // If all models failed
    console.error('All models failed. Last error:', lastError)
    return NextResponse.json(
      { 
        error: 'Failed to get AI response. Please check API key and try again.',
        details: lastError 
      },
      { status: 500 }
    )

    // This code is now handled in the loop above
  } catch (error) {
    console.error('AI Assistant error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

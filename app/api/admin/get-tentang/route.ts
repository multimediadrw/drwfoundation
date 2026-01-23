import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'tentang.json')
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Data tentang tidak ditemukan' },
        { status: 404 }
      )
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading tentang data:', error)
    return NextResponse.json(
      { error: 'Gagal membaca data tentang' },
      { status: 500 }
    )
  }
}

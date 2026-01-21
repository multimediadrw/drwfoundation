import { NextRequest, NextResponse } from 'next/server'
import { saveLaporanToGitHub } from '@/lib/github-storage'

export async function POST(request: NextRequest) {
  try {
    const { laporan } = await request.json()

    if (!laporan) {
      return NextResponse.json(
        { error: 'Missing laporan data' },
        { status: 400 }
      )
    }

    const result = await saveLaporanToGitHub(laporan)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Laporan saved and committed to GitHub',
        commit: result.commit
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to save laporan' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in save-laporan API:', error)
    return NextResponse.json(
      { error: 'Failed to save laporan' },
      { status: 500 }
    )
  }
}

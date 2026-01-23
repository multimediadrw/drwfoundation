import { NextRequest, NextResponse } from 'next/server'
import { getPageFromGitHub } from '@/lib/github-storage'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    const result = await getPageFromGitHub(slug)

    if (result.success) {
      return NextResponse.json({
        success: true,
        content: result.content
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Program not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error in get-page API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load program' },
      { status: 500 }
    )
  }
}

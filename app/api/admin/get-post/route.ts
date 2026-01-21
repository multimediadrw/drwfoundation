import { NextRequest, NextResponse } from 'next/server'
import { getPostFromGitHub } from '@/lib/github-storage'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    const result = await getPostFromGitHub(slug)

    if (result.success) {
      return NextResponse.json({
        success: true,
        content: result.content
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Post not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error in get-post API:', error)
    return NextResponse.json(
      { error: 'Failed to read post' },
      { status: 500 }
    )
  }
}

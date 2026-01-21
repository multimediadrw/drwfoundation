import { NextRequest, NextResponse } from 'next/server'
import { savePostToGitHub } from '@/lib/github-storage'

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json()

    if (!slug || !content) {
      return NextResponse.json(
        { error: 'Missing slug or content' },
        { status: 400 }
      )
    }

    const result = await savePostToGitHub(slug, content)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Post saved and committed to GitHub',
        commit: result.commit
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to save post' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in save-post API:', error)
    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    )
  }
}

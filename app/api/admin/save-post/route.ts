import { NextRequest, NextResponse } from 'next/server'
import { savePostToGitHub } from '@/lib/github-storage'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json()

    if (!slug || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing slug or content' },
        { status: 400 }
      )
    }

    // Save to GitHub
    const result = await savePostToGitHub(slug, content)

    if (result.success) {
      // Aggressive revalidation to clear all caches
      revalidatePath('/berita', 'page')
      revalidatePath(`/posts/${slug}`, 'page')
      revalidatePath('/admin/posts', 'page')
      revalidatePath('/', 'layout') // Clear entire layout cache
      
      // Wait a bit for GitHub to propagate
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return NextResponse.json({
        success: true,
        message: 'Post saved and committed to GitHub',
        commit: result.commit
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save post' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in save-post API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save post' },
      { status: 500 }
    )
  }
}

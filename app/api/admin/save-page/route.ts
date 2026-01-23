import { NextRequest, NextResponse } from 'next/server'
import { savePageToGitHub } from '@/lib/github-storage'
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
    const result = await savePageToGitHub(slug, content)

    if (result.success) {
      // Revalidate paths to update cache
      revalidatePath('/program')
      revalidatePath(`/program/${slug}`)
      revalidatePath('/admin/pages')
      revalidatePath('/')
      
      return NextResponse.json({
        success: true,
        message: 'Program saved and committed to GitHub',
        commit: result.commit
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save program' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in save-page API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save program' },
      { status: 500 }
    )
  }
}

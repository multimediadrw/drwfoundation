import { NextRequest, NextResponse } from 'next/server'
import { deletePostFromGitHub } from '@/lib/github-storage'
import { revalidatePath } from 'next/cache'

export async function DELETE(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    // Delete from GitHub
    const result = await deletePostFromGitHub(slug)

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
        message: 'Article deleted successfully'
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to delete article' },
        { status: result.error === 'Article not found' ? 404 : 500 }
      )
    }
  } catch (error: any) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete article' },
      { status: 500 }
    )
  }
}

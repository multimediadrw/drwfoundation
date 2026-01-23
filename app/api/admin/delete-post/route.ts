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
      // Revalidate paths
      revalidatePath('/berita')
      revalidatePath(`/posts/${slug}`)
      revalidatePath('/admin/posts')
      revalidatePath('/')

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

import { NextRequest, NextResponse } from 'next/server'
import { deletePageFromGitHub } from '@/lib/github-storage'
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
    const result = await deletePageFromGitHub(slug)

    if (result.success) {
      // Revalidate paths
      revalidatePath('/program')
      revalidatePath(`/program/${slug}`)
      revalidatePath('/admin/pages')
      revalidatePath('/')

      return NextResponse.json({
        success: true,
        message: 'Program deleted successfully'
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to delete program' },
        { status: result.error === 'Program not found' ? 404 : 500 }
      )
    }
  } catch (error: any) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete program' },
      { status: 500 }
    )
  }
}

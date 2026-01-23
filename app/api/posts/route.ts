import { NextResponse } from 'next/server'
import { getPostsData } from '@/lib/posts'

export const dynamic = 'force-dynamic' // Always fetch fresh data
export const revalidate = 0 // Disable caching

export async function GET() {
  try {
    const posts = await getPostsData()
    
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

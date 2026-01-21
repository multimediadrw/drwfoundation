import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(fileContents)

        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'Untitled',
          date: data.date || '',
          excerpt: data.excerpt || '',
          author: data.author || 'Admin'
        }
      })
      .sort((a, b) => {
        // Sort by date, newest first
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length
    })
  } catch (error) {
    console.error('Error listing posts:', error)
    return NextResponse.json(
      { error: 'Failed to list posts' },
      { status: 500 }
    )
  }
}

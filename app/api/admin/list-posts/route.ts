import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

// GitHub configuration
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})
const owner = 'multimediadrw'
const repo = 'drwfoundation'
const branch = 'main'

export const dynamic = 'force-dynamic' // Always fetch fresh data
export const revalidate = 0 // Disable caching

export async function GET() {
  try {
    // Try to fetch from GitHub first (always fresh data)
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: 'content/posts',
        ref: branch
      })

      if (!Array.isArray(data)) {
        throw new Error('Expected directory listing')
      }

      // Filter markdown files
      const markdownFiles = data.filter(file => 
        file.type === 'file' && file.name.endsWith('.md')
      )

      // Fetch metadata for each file
      const posts = await Promise.all(
        markdownFiles.map(async file => {
          try {
            const { data: fileData } = await octokit.repos.getContent({
              owner,
              repo,
              path: file.path,
              ref: branch
            })

            if ('content' in fileData && fileData.content) {
              const fileContents = Buffer.from(fileData.content, 'base64').toString('utf-8')
              const { data: frontmatter } = matter(fileContents)

              return {
                slug: file.name.replace('.md', ''),
                title: frontmatter.title || 'Untitled',
                date: frontmatter.date || '',
                excerpt: frontmatter.excerpt || '',
                author: frontmatter.author || 'Admin'
              }
            }
          } catch (error) {
            console.error(`Error fetching post ${file.name}:`, error)
          }
          return null
        })
      )

      // Filter out null values and sort by date
      const validPosts = posts.filter(post => post !== null)
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

      return NextResponse.json({
        success: true,
        posts: validPosts,
        total: validPosts.length,
        source: 'github' // Indicate data source
      })
    } catch (githubError) {
      console.error('GitHub API error, falling back to local filesystem:', githubError)
      
      // Fallback to local filesystem
      const postsDirectory = path.join(process.cwd(), 'content', 'posts')
      
      if (!fs.existsSync(postsDirectory)) {
        return NextResponse.json({
          success: true,
          posts: [],
          total: 0,
          source: 'local-empty'
        })
      }

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
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

      return NextResponse.json({
        success: true,
        posts,
        total: posts.length,
        source: 'local-fallback'
      })
    }
  } catch (error) {
    console.error('Error listing posts:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to list posts',
        posts: [],
        total: 0
      },
      { status: 500 }
    )
  }
}

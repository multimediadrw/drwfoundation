import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { injectCDNUrls } from './cdn'
import { Octokit } from '@octokit/rest'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// GitHub configuration
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})
const owner = 'multimediadrw'
const repo = 'drwfoundation'
const branch = 'main'

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  author?: string
}

async function markdownToHtml(markdown: string) {
  // Check if content is already HTML (from TipTap editor)
  // HTML content will have tags like <p>, <h2>, <img>, etc.
  const isHTML = /<[a-z][\s\S]*>/i.test(markdown)
  
  let htmlContent: string
  
  if (isHTML) {
    // Content is already HTML, just use it directly
    htmlContent = markdown
  } else {
    // Content is markdown, convert to HTML
    const result = await remark().use(html).process(markdown)
    htmlContent = result.toString()
  }
  
  // Inject CDN URLs for all image paths
  return injectCDNUrls(htmlContent)
}

// Fetch posts from GitHub API (always fresh data)
export async function getPostsData(): Promise<PostData[]> {
  try {
    // Get list of files from GitHub
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'content/posts',
      ref: branch
    })

    if (!Array.isArray(data)) {
      return []
    }

    // Filter markdown files
    const markdownFiles = data.filter(file => 
      file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'))
    )

    // Fetch content for each file
    const allPostsData = await Promise.all(
      markdownFiles.map(async file => {
        try {
          const slug = file.name.replace(/\.mdx?$/, '')
          
          // Get file content from GitHub
          const { data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path: file.path,
            ref: branch
          })

          if ('content' in fileData && fileData.content) {
            const fileContents = Buffer.from(fileData.content, 'base64').toString('utf-8')
            const { data, content } = matter(fileContents)
            const htmlContent = await markdownToHtml(content)

            return {
              slug,
              title: data.title || slug,
              date: data.date || new Date().toISOString(),
              excerpt: data.excerpt || content.slice(0, 200),
              content: htmlContent,
              author: data.author || 'DRW Foundation',
            } as PostData
          }
        } catch (error) {
          console.error(`Error fetching post ${file.name}:`, error)
        }
        return null
      })
    )

    // Filter out null values and sort by date
    const validPosts = allPostsData.filter(post => post !== null) as PostData[]
    
    return validPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error fetching posts from GitHub:', error)
    
    // Fallback to local file system if GitHub API fails
    return getPostsDataFromLocal()
  }
}

// Fallback: Read from local file system
async function getPostsDataFromLocal(): Promise<PostData[]> {
  // Check if content directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory does not exist yet')
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async fileName => {
        const slug = fileName.replace(/\.mdx?$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const htmlContent = await markdownToHtml(content)

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || content.slice(0, 200),
          content: htmlContent,
          author: data.author || 'DRW Foundation',
        } as PostData
      })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    // Try to fetch from GitHub first
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: `content/posts/${slug}.md`,
      ref: branch
    })

    if ('content' in data && data.content) {
      const fileContents = Buffer.from(data.content, 'base64').toString('utf-8')
      const { data: frontmatter, content } = matter(fileContents)
      const htmlContent = await markdownToHtml(content)

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || content.slice(0, 200),
        content: htmlContent,
        author: frontmatter.author || 'DRW Foundation',
      }
    }
  } catch (error) {
    console.error(`Error fetching post ${slug} from GitHub:`, error)
    
    // Fallback to local file system
    try {
      const fullPath = path.join(postsDirectory, `${slug}.md`)
      
      if (!fs.existsSync(fullPath)) {
        return null
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const htmlContent = await markdownToHtml(content)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 200),
        content: htmlContent,
        author: data.author || 'DRW Foundation',
      }
    } catch (localError) {
      console.error(`Error reading local post ${slug}:`, localError)
      return null
    }
  }

  return null
}

export async function getAllPostSlugs() {
  try {
    // Get from GitHub
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'content/posts',
      ref: branch
    })

    if (Array.isArray(data)) {
      return data
        .filter(file => file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx')))
        .map(file => ({
          params: {
            slug: file.name.replace(/\.mdx?$/, '')
          }
        }))
    }
  } catch (error) {
    console.error('Error fetching post slugs from GitHub:', error)
    
    // Fallback to local
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory)
      return fileNames
        .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map(fileName => ({
          params: {
            slug: fileName.replace(/\.mdx?$/, '')
          }
        }))
    }
  }

  return []
}

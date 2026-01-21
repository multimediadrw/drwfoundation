import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { injectCDNUrls } from './cdn'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  author?: string
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  const htmlContent = result.toString()
  
  // Inject CDN URLs for all image paths
  return injectCDNUrls(htmlContent)
}

export async function getPostsData(): Promise<PostData[]> {
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
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    // Try .md first, then .mdx
    let fileContents
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } else {
      const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, 'utf8')
      } else {
        return null
      }
    }

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
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

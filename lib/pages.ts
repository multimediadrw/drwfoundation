import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { injectCDNUrls } from './cdn'

const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface PageData {
  slug: string
  title: string
  content: string
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  const htmlContent = result.toString()
  
  // Inject CDN URLs for all image paths
  return injectCDNUrls(htmlContent)
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = await markdownToHtml(content)

    return {
      slug,
      title: data.title || slug,
      content: htmlContent,
    }
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error)
    return null
  }
}

export async function getAllPages(): Promise<PageData[]> {
  if (!fs.existsSync(pagesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(pagesDirectory)
  const pages = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const page = await getPageBySlug(slug)
        return page
      })
  )

  return pages.filter((page): page is PageData => page !== null)
}

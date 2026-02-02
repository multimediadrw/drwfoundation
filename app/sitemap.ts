import { MetadataRoute } from 'next'
import { getPostsData } from '@/lib/posts'
import { getAllPages } from '@/lib/pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or fallback to production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drwfoundation.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/laporan`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic pages - Posts and Programs
  try {
    const posts = await getPostsData()
    const postPages = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Get all program pages
    const pages = await getAllPages()
    const programPages = pages.map((page) => ({
      url: `${baseUrl}/program/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...postPages, ...programPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if there's an error
    return staticPages
  }
}

/**
 * CDN URL Configuration
 * 
 * This module handles all CDN-related URL transformations.
 * Switch between local MinIO and production CDN by changing NEXT_PUBLIC_CDN_URL in .env
 */

/**
 * Get the CDN base URL from environment
 * Falls back to production CDN if not set
 */
export function getCDNUrl(): string {
  return process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.drwskincare.com/drwfoundation'
}

/**
 * Convert relative image path to full CDN URL
 * @param path - Relative path like "images/2024/12/Logo.png"
 * @returns Full CDN URL
 */
export function getCDNImageUrl(path: string): string {
  const cdnBase = getCDNUrl()
  // Remove leading slash if exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cdnBase}/${cleanPath}`
}

/**
 * Replace all image URLs in HTML content with CDN URLs
 * Handles both markdown image syntax and HTML img tags
 * 
 * @param content - HTML content with image URLs
 * @returns Content with CDN URLs injected
 */
export function injectCDNUrls(content: string): string {
  const cdnBase = getCDNUrl()
  
  // Replace images/... paths with full CDN URL
  // Matches: images/2024/12/file.jpg
  let result = content.replace(
    /(['"])(images\/[^'"]+)(['"])/g,
    `$1${cdnBase}/$2$3`
  )
  
  // Also handle /images/... paths (with leading slash)
  result = result.replace(
    /(['"])(\/images\/[^'"]+)(['"])/g,
    (match, quote1, path, quote2) => {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path
      return `${quote1}${cdnBase}/${cleanPath}${quote2}`
    }
  )
  
  // Handle /uploads/... paths (uploaded files)
  result = result.replace(
    /(['"])(\/uploads\/[^'"]+)(['"])/g,
    (match, quote1, path, quote2) => {
      // uploads are served from the same domain, not CDN
      return `${quote1}${path}${quote2}`
    }
  )
  
  return result
}

/**
 * Get CDN configuration for Next.js Image component
 * Add this to next.config.js images.domains or remotePatterns
 */
export function getCDNDomain(): string {
  const cdnUrl = getCDNUrl()
  try {
    const url = new URL(cdnUrl)
    return url.hostname
  } catch {
    return 'cdn.drwskincare.com'
  }
}

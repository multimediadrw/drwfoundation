import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Detect if request is from admin subdomain
  const isAdminSubdomain = hostname.startsWith('admin.')
  
  // Detect if request is from main domain
  const isMainDomain = hostname === 'drwfoundation.com' || 
                       hostname === 'www.drwfoundation.com' ||
                       hostname.includes('vercel.app') ||
                       hostname === 'localhost:3000'
  
  // Handle admin subdomain routing
  if (isAdminSubdomain) {
    // If accessing root of admin subdomain, redirect to login
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // If accessing non-admin routes on admin subdomain, redirect to admin
    if (!pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    // Allow admin routes to proceed
    return NextResponse.next()
  }
  
  // Handle main domain routing
  if (isMainDomain) {
    // If accessing admin routes on main domain, redirect to admin subdomain
    if (pathname.startsWith('/admin')) {
      // Check if admin subdomain is configured
      // For now, allow admin access from main domain (backward compatibility)
      // Uncomment below to force redirect to admin subdomain
      /*
      const adminUrl = new URL(request.url)
      adminUrl.hostname = 'admin.drwfoundation.com'
      return NextResponse.redirect(adminUrl)
      */
    }
    
    // Allow public routes to proceed
    return NextResponse.next()
  }
  
  // For any other hostname, proceed normally
  return NextResponse.next()
}

// Configure which routes should be processed by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - uploads (uploaded files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
}

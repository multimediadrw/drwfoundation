import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'DRW Foundation - Sinergi & Kolaborasi untuk Umat',
  description: 'DRW Foundation adalah yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat. Program unggulan: Beasiswa Tahfidz, Masjid Glowing, Bantuan Bencana, dan Qurban.',
  keywords: ['DRW Foundation', 'yayasan', 'donasi', 'beasiswa tahfidz', 'bantuan sosial', 'qurban', 'zakat', 'infaq', 'sedekah'],
  authors: [{ name: 'DRW Foundation' }],
  creator: 'DRW Foundation',
  publisher: 'DRW Foundation',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://drwfoundation.com',
    siteName: 'DRW Foundation',
    title: 'DRW Foundation - Sinergi & Kolaborasi untuk Umat',
    description: 'Yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'DRW Foundation Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRW Foundation - Sinergi & Kolaborasi untuk Umat',
    description: 'Yayasan sosial dan kemanusiaan yang fokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_CODE', // User will replace this
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get Google Analytics ID from environment variable
  const gaId = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <html lang="id">
      <head>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

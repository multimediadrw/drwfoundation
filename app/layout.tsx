import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DRW Foundation',
  description: 'DRW Foundation - Yayasan Sosial dan Kemanusiaan',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

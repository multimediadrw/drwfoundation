'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  language: 'id' | 'en'
}

export default function TableOfContents({ content, language }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const h2Elements = doc.querySelectorAll('h2')
    
    const items: TOCItem[] = Array.from(h2Elements).map((heading, index) => {
      const text = heading.textContent || ''
      const id = `heading-${index}`
      heading.id = id // Add ID to heading for linking
      
      return {
        id,
        text,
        level: 2
      }
    })

    setHeadings(items)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    // Observe all h2 elements
    setTimeout(() => {
      document.querySelectorAll('h2[id^="heading-"]').forEach((heading) => {
        observer.observe(heading)
      })
    }, 100)

    return () => observer.disconnect()
  }, [content])

  // Count words in content (rough estimate)
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length

  // Only show TOC if article has more than 500 words and has headings
  if (wordCount < 500 || headings.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-12 border border-purple-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'en' ? 'Table of Contents' : 'Daftar Isi'}
        </h2>
      </div>
      
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
              activeId === heading.id
                ? 'bg-purple-600 text-white font-semibold shadow-md'
                : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
          >
            <span className="flex items-start gap-2">
              <span className="text-sm font-medium mt-0.5">
                {index + 1}.
              </span>
              <span className="flex-1 text-sm leading-relaxed">
                {heading.text}
              </span>
            </span>
          </button>
        ))}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-purple-200">
        <p className="text-xs text-gray-600 text-center">
          {language === 'en' 
            ? `📖 ${wordCount} words • ${Math.ceil(wordCount / 200)} min read`
            : `📖 ${wordCount} kata • ${Math.ceil(wordCount / 200)} menit baca`
          }
        </p>
      </div>
    </div>
  )
}

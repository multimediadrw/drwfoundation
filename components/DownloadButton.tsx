'use client'

import { Download } from 'lucide-react'

export default function DownloadButton() {
  return (
    <button 
      onClick={() => alert('Fitur download PDF akan segera tersedia')}
      className="flex items-center gap-3 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex-shrink-0"
    >
      <Download className="w-6 h-6" />
      <span>Unduh Laporan PDF</span>
    </button>
  )
}

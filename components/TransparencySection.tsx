'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FundAllocation {
  category: string
  percentage: number
  amount: string
  color: string
  icon: string
}

const fundData: FundAllocation[] = [
  { category: 'Pendidikan', percentage: 35, amount: 'Rp 3,5 M', color: 'bg-blue-500', icon: '📚' },
  { category: 'Masjid & Infrastruktur', percentage: 25, amount: 'Rp 2,5 M', color: 'bg-green-500', icon: '🕌' },
  { category: 'Bantuan Sosial', percentage: 20, amount: 'Rp 2 M', color: 'bg-purple-500', icon: '🤝' },
  { category: 'Kesehatan', percentage: 12, amount: 'Rp 1,2 M', color: 'bg-red-500', icon: '⚕️' },
  { category: 'Bantuan Bencana', percentage: 8, amount: 'Rp 800 Jt', color: 'bg-orange-500', icon: '🆘' },
]

export default function TransparencySection() {
  const [activeTab, setActiveTab] = useState<'allocation' | 'impact'>('allocation')

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Laporan Transparansi 2024</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Akuntabilitas <span className="text-purple-700">Penuh</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami berkomitmen untuk transparansi penuh dalam pengelolaan dana amanah Anda
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('allocation')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'allocation'
                  ? 'bg-white text-purple-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Alokasi Dana
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'impact'
                  ? 'bg-white text-purple-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dampak Program
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'allocation' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Chart */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
                  {/* Donut Chart Representation */}
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <svg viewBox="0 0 200 200" className="transform -rotate-90">
                      {fundData.reduce((acc, item, index) => {
                        const previousPercentage = fundData.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                        const circumference = 2 * Math.PI * 70
                        const offset = (previousPercentage / 100) * circumference
                        const strokeLength = (item.percentage / 100) * circumference

                        return [
                          ...acc,
                          <circle
                            key={index}
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke={item.color.replace('bg-', '')}
                            strokeWidth="30"
                            strokeDasharray={`${strokeLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            className="transition-all duration-500"
                          />
                        ]
                      }, [] as JSX.Element[])}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold text-gray-900">Rp 10M</div>
                      <div className="text-gray-600 font-semibold">Total Penyaluran</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend & Details */}
              <div className="space-y-4">
                {fundData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{item.category}</h4>
                          <p className="text-gray-600">{item.amount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-700">{item.percentage}%</div>
                        <div className={`w-3 h-3 ${item.color} rounded-full mt-2 ml-auto`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Santri Tahfidz', value: '500+', icon: '📖', color: 'from-blue-500 to-blue-600' },
                { title: 'Masjid Dibangun', value: '150+', icon: '🕌', color: 'from-green-500 to-green-600' },
                { title: 'Keluarga Terbantu', value: '10K+', icon: '👨‍👩‍👧‍👦', color: 'from-purple-500 to-purple-600' },
                { title: 'Korban Bencana', value: '5K+', icon: '🆘', color: 'from-red-500 to-red-600' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-semibold">{stat.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Lihat Laporan Lengkap Kami
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Akses laporan keuangan dan program lengkap kami untuk transparansi penuh
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/laporan"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Laporan Keuangan
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
              <Link
                href="/laporan"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 hover:bg-white/20"
              >
                Laporan Program
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

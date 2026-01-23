import { NextResponse } from 'next/server'
import { getLaporanFromGitHub } from '@/lib/github-storage'

const DEFAULT_LAPORAN = {
  title: 'Laporan Kegiatan DRW Foundation 2024',
  intro: 'DRW Foundation berkomitmen untuk transparansi penuh dalam setiap kegiatan dan pengelolaan dana. Berikut adalah laporan lengkap kegiatan kami sepanjang tahun 2024.',
  programs: [
    { name: 'Beasiswa Tahfidz', beneficiaries: '500 santri', budget: 'Rp 2.5 Miliar' },
    { name: 'Masjid Glowing Indonesia', beneficiaries: '50 masjid', budget: 'Rp 5 Miliar' },
    { name: 'Bantuan Bencana', beneficiaries: '10,000 keluarga', budget: 'Rp 3 Miliar' },
    { name: 'Qurban Idul Adha', beneficiaries: '5,000 keluarga', budget: 'Rp 2 Miliar' },
    { name: 'Ambulan Gratis', beneficiaries: '20 unit', budget: 'Rp 1.5 Miliar' },
    { name: 'Wakaf Kasih Sayang', beneficiaries: '100 penerima', budget: 'Rp 500 Juta' },
    { name: 'Bantuan Modal Usaha', beneficiaries: '200 UMKM', budget: 'Rp 1 Miliar' },
    { name: 'Beasiswa Pendidikan', beneficiaries: '300 siswa', budget: 'Rp 600 Juta' },
    { name: 'Santunan Yatim', beneficiaries: '1,000 anak', budget: 'Rp 500 Juta' }
  ],
  financials: {
    income: 'Rp 15 Miliar',
    distribution: 'Rp 17.15 Miliar',
    beneficiaries: '120,000+',
    programs: '50+',
    cities: '100+'
  }
}

export async function GET() {
  try {
    // Try to get from GitHub
    const result = await getLaporanFromGitHub()

    if (result.success) {
      return NextResponse.json({
        success: true,
        laporan: result.data
      })
    }

    // If not found, return default data
    return NextResponse.json({
      success: true,
      laporan: DEFAULT_LAPORAN
    })
  } catch (error) {
    console.error('Error in get-laporan API:', error)
    // Return default data on error
    return NextResponse.json({
      success: true,
      laporan: DEFAULT_LAPORAN
    })
  }
}

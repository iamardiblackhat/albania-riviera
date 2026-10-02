import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import LenisProvider from '@/components/LenisProvider'
import CustomCursor from '@/components/CustomCursor'
import GrainOverlay from '@/components/GrainOverlay'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Albania Riviera — Erda & Faton 2026',
  description: 'The complete guide to the Albanian Riviera for the wedding of Erda and Faton.',
  openGraph: {
    title: 'Albania Riviera — Erda & Faton 2026',
    description: 'Activities, restaurants, boat tours, and the wedding of Erda and Faton on the Albanian Riviera.',
    images: ['https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=1200&q=80'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albania Riviera — Erda & Faton 2026',
    description: 'Activities, restaurants, boat tours, and the wedding of Erda and Faton.',
    images: ['https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=1200&q=80'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body
        className="bg-[#1A1A1A] text-[#F8F5F0] font-[family-name:var(--font-inter)] antialiased overflow-x-hidden"
        style={{ cursor: 'none' }}
      >
        <LanguageProvider>
          <LenisProvider>
            <CustomCursor />
            <GrainOverlay />
            <Navbar />
            <main>{children}</main>
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

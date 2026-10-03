import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import LenisProvider from '@/components/LenisProvider'

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
    images: ['/img/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albania Riviera — Erda & Faton 2026',
    description: 'Activities, restaurants, boat tours, and the wedding of Erda and Faton.',
    images: ['/img/hero.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#F8F5F0] text-[#1A1A1A] font-[family-name:var(--font-inter)] antialiased overflow-x-hidden">
        <LanguageProvider>
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

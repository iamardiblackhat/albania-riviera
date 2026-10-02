'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const { lang, toggle } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // The wedding page is intentionally dark. Everything else is light paper.
  const dark = pathname?.startsWith('/wedding') ?? false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/activities', label: lang === 'en' ? 'Activities' : 'Aktivitete' },
    { href: '/restaurants', label: lang === 'en' ? 'Restaurants' : 'Restorantet' },
    { href: '/map', label: lang === 'en' ? 'Map' : 'Harta' },
    { href: '/my-day', label: lang === 'en' ? 'My Day' : 'Dita ime' },
    { href: '/wedding', label: lang === 'en' ? 'Wedding' : 'Dasma' },
  ]

  const shell = dark
    ? `bg-[#1A1A1A]/70 ${scrolled ? 'md:bg-[#1A1A1A]/90' : ''} text-[#F8F5F0] border-[#F8F5F0]/10`
    : `bg-[#F8F5F0]/85 ${scrolled ? 'md:bg-[#F8F5F0]/95' : ''} text-[#1A1A1A] border-[#1A1A1A]/10`

  const linkTone = dark
    ? 'text-[#F8F5F0]/70 hover:text-[#F8F5F0]'
    : 'text-[#1A1A1A]/65 hover:text-[#1A1A1A]'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-14 flex items-center justify-between backdrop-blur-md border-b transition-colors duration-300 ${shell}`}
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair)] text-lg tracking-wide"
          data-cursor="hover"
        >
          Albania
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm transition-colors ${linkTone}`} data-cursor="hover">
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className={`text-xs border px-2 py-1 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
              dark
                ? 'text-[#5DADE2] border-[#5DADE2]/40 hover:border-[#5DADE2]'
                : 'text-[#2A7F8A] border-[#2A7F8A]/40 hover:border-[#2A7F8A]'
            }`}
            aria-label="Toggle language"
            data-cursor="hover"
          >
            {lang === 'en' ? 'SQ' : 'EN'}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggle}
            className={`text-xs border px-2 py-1 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              dark ? 'text-[#5DADE2] border-[#5DADE2]/40' : 'text-[#2A7F8A] border-[#2A7F8A]/40'
            }`}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'SQ' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <line y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" />
              <line y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" />
              <line y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
              dark ? 'bg-[#1A1A1A] text-[#F8F5F0]' : 'bg-[#F8F5F0] text-[#1A1A1A]'
            }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 opacity-60 p-3 min-w-[44px] min-h-[44px]"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                <line x1="19" y1="1" x2="1" y2="19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-[family-name:var(--font-playfair)] text-3xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const { lang, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-14 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-[#1A1A1A]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="font-playfair text-[#F8F5F0] text-lg tracking-wide" data-cursor="hover">
          Albania
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#F8F5F0]/70 hover:text-[#F8F5F0] text-sm transition-colors"
              data-cursor="hover"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="text-xs text-[#2A7F8A] border border-[#2A7F8A]/40 px-2 py-1 hover:border-[#2A7F8A] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle language"
            data-cursor="hover"
          >
            {lang === 'en' ? 'SQ' : 'EN'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs text-[#2A7F8A] border border-[#2A7F8A]/40 px-2 py-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'SQ' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[#F8F5F0] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-[#F8F5F0]/60 p-3 min-w-[44px] min-h-[44px]"
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
                    className="font-playfair text-[#F8F5F0] text-3xl"
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

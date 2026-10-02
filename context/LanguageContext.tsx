'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en, sq } from '@/data/i18n'
import type { I18nStrings } from '@/data/types'

type Lang = 'en' | 'sq'

interface LanguageContextType {
  lang: Lang
  t: I18nStrings
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('albania-lang') as Lang | null
    if (saved === 'en' || saved === 'sq') setLang(saved)
  }, [])

  const toggle = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'sq' : 'en'
      localStorage.setItem('albania-lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, t: lang === 'en' ? en : sq, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

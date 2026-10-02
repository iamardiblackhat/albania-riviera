'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

interface PlanItem {
  id: string
  type: string
  name: string
  slug: string
  slot: 'morning' | 'afternoon' | 'evening' | 'unscheduled'
}

export default function MyDayPage() {
  const { t } = useLanguage()
  const [items, setItems] = useState<PlanItem[]>([])
  const [toast, setToast] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check URL share param first
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('plan')
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded))
        setItems(decoded)
        return
      } catch { /* fall through to localStorage */ }
    }
    try {
      const saved = localStorage.getItem('albania-trip')
      if (saved) setItems(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  const moveToSlot = (id: string, slot: PlanItem['slot']) => {
    setItems((prev) => {
      const updated = prev.map((item) => item.id === id ? { ...item, slot } : item)
      localStorage.setItem('albania-trip', JSON.stringify(updated))
      return updated
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      localStorage.setItem('albania-trip', JSON.stringify(updated))
      return updated
    })
  }

  const shareLink = () => {
    const encoded = btoa(JSON.stringify(items))
    const url = `${window.location.origin}/my-day?plan=${encoded}`
    navigator.clipboard.writeText(url).then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 2500)
    })
  }

  const slots: { key: PlanItem['slot']; label: string }[] = [
    { key: 'morning', label: t.morning },
    { key: 'afternoon', label: t.afternoon },
    { key: 'evening', label: t.evening },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-20 px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#F8F5F0]">{t.myDay}</h1>
          {items.length > 0 && (
            <button
              onClick={shareLink}
              className="text-sm text-[#2A7F8A] border border-[#2A7F8A]/30 px-4 py-2 hover:border-[#2A7F8A] transition-colors min-h-[44px]"
              data-cursor="hover"
            >
              {t.shareLink}
            </button>
          )}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#F8F5F0]/40 text-sm mb-4">
              Bookmark activities and restaurants to build your day.
            </p>
            <div className="flex flex-col gap-2 items-center">
              <Link href="/activities" className="text-[#2A7F8A] text-sm underline">Browse activities</Link>
              <Link href="/restaurants" className="text-[#2A7F8A] text-sm underline">Browse restaurants</Link>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="space-y-8">
            {/* Unscheduled */}
            {items.filter((i) => i.slot === 'unscheduled').length > 0 && (
              <div>
                <p className="text-xs text-[#F8F5F0]/40 uppercase tracking-widest mb-3">Not yet scheduled</p>
                <div className="space-y-2">
                  <AnimatePresence>
                    {items.filter((i) => i.slot === 'unscheduled').map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between bg-[#F8F5F0]/5 p-4 border border-[#F8F5F0]/10"
                      >
                        <div>
                          <span className="text-xs text-[#2A7F8A] block mb-0.5">{item.type}</span>
                          <Link href={item.slug} className="text-[#F8F5F0] text-sm font-medium hover:text-[#2A7F8A] transition-colors">
                            {item.name}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value="unscheduled"
                            onChange={(e) => moveToSlot(item.id, e.target.value as PlanItem['slot'])}
                            className="bg-[#1A1A1A] border border-[#F8F5F0]/20 text-[#F8F5F0]/60 text-xs px-2 py-1 min-h-[44px]"
                            aria-label={`Move ${item.name} to a time slot`}
                          >
                            <option value="unscheduled">Move to...</option>
                            <option value="morning">{t.morning}</option>
                            <option value="afternoon">{t.afternoon}</option>
                            <option value="evening">{t.evening}</option>
                          </select>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#F8F5F0]/20 hover:text-red-400 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label={`Remove ${item.name}`}
                          >
                            ✕
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Time slots */}
            {slots.map((slot) => {
              const slotItems = items.filter((i) => i.slot === slot.key)
              return (
                <div key={slot.key}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[#2A7F8A] uppercase tracking-widest">{slot.label}</span>
                    <div className="flex-1 h-px bg-[#F8F5F0]/5" />
                  </div>
                  {slotItems.length === 0 && (
                    <p className="text-[#F8F5F0]/20 text-sm py-3">Nothing here yet</p>
                  )}
                  <div className="space-y-2">
                    <AnimatePresence>
                      {slotItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-between bg-[#2A7F8A]/5 border border-[#2A7F8A]/20 p-4"
                        >
                          <div>
                            <span className="text-xs text-[#2A7F8A] block mb-0.5">{item.type}</span>
                            <Link href={item.slug} className="text-[#F8F5F0] text-sm font-medium hover:text-[#2A7F8A] transition-colors">
                              {item.name}
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={item.slot}
                              onChange={(e) => moveToSlot(item.id, e.target.value as PlanItem['slot'])}
                              className="bg-[#1A1A1A] border border-[#F8F5F0]/20 text-[#F8F5F0]/60 text-xs px-2 py-1 min-h-[44px]"
                              aria-label={`Move ${item.name}`}
                            >
                              <option value="morning">{t.morning}</option>
                              <option value="afternoon">{t.afternoon}</option>
                              <option value="evening">{t.evening}</option>
                              <option value="unscheduled">Unscheduled</option>
                            </select>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#F8F5F0]/20 hover:text-red-400 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                              aria-label={`Remove ${item.name}`}
                            >
                              ✕
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2A7F8A] text-[#F8F5F0] text-sm px-5 py-3 z-50"
          >
            {t.linkCopied}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

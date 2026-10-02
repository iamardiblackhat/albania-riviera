'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { restaurants } from '@/data/restaurants'
import images from '@/data/images.json'
import CommentThread from '@/components/CommentThread'
import { useLanguage } from '@/context/LanguageContext'

const proTips = [
  { icon: '🐟', tip: 'Quality restaurants show the raw catch on ice. If they cannot show you the fish, it is probably frozen.' },
  { icon: '⚖️', tip: 'Seafood is priced per kilogram, not per portion. Ask the waiter to weigh it and confirm the price before it goes on the grill.' },
  { icon: '🍷', tip: 'Skip imported wines. Order Albanian: Cobo white or Nurellari both pair well with seafood and cost much less.' },
  { icon: '💵', tip: 'Cash only at many smaller places. Find an ATM before you head out. A 5-10% tip is appreciated for good service.' },
]

export default function RestaurantsPage() {
  const { t } = useLanguage()
  const [showProTips, setShowProTips] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'fine' | 'local' | 'beach' | 'sunset'>('all')
  const [flipped, setFlipped] = useState<string | null>(null)

  const filtered = restaurants.filter((r) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'sunset') return r.sunsetView
    return r.tier === activeFilter
  })

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'fine', label: 'Fine Dining' },
    { key: 'local', label: 'Local' },
    { key: 'beach', label: 'Beach' },
    { key: 'sunset', label: 'Sunset Views' },
  ] as const

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={images.food} alt="Albanian seafood" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/20 to-[#1A1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <span className="text-xs uppercase tracking-widest text-[#2A7F8A] block mb-3">Food</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#F8F5F0]">Where to Eat</h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex-shrink-0 px-4 py-2 text-sm border transition-colors min-h-[44px] whitespace-nowrap ${
                activeFilter === f.key
                  ? 'bg-[#2A7F8A] border-[#2A7F8A] text-[#F8F5F0]'
                  : 'border-[#F8F5F0]/20 text-[#F8F5F0]/60 hover:border-[#2A7F8A]/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowProTips(true)}
            className="flex items-center gap-2 text-sm text-[#2A7F8A] border border-[#2A7F8A]/30 px-4 py-2 min-h-[44px] hover:border-[#2A7F8A] transition-colors"
            data-cursor="hover"
          >
            <span>💡</span> {t.proTips}
          </button>
        </div>

        {/* Restaurant cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <AnimatePresence>
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative transition-transform duration-500 cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped === r.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  onClick={() => setFlipped(flipped === r.id ? null : r.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setFlipped(flipped === r.id ? null : r.id)}
                  aria-label={`${r.name} — tap to see what to order`}
                >
                  {/* Front */}
                  <div className="border border-[#F8F5F0]/10 p-5 bg-[#1A1A1A]" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-0.5 capitalize ${
                        r.tier === 'fine' ? 'text-[#2A7F8A] bg-[#2A7F8A]/10' :
                        r.tier === 'local' ? 'text-amber-400 bg-amber-400/10' :
                        'text-blue-400 bg-blue-400/10'
                      }`}>{r.tier}</span>
                      {r.sunsetView && (
                        <span className="text-xs text-orange-400 animate-pulse">Sunset view</span>
                      )}
                    </div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#F8F5F0] mb-1">{r.name}</h2>
                    <p className="text-xs text-[#F8F5F0]/40 mb-3">{r.address}</p>
                    <p className="text-[#F8F5F0]/70 text-sm leading-relaxed mb-3">{r.description}</p>
                    {r.cashOnly && (
                      <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5">Cash only</span>
                    )}
                    <p className="text-[#F8F5F0]/30 text-xs mt-3">Tap to see what to order</p>
                    {r.urgency && (
                      <div className="mt-3 border border-[#2A7F8A]/30 p-2">
                        <p className="text-xs text-[#2A7F8A]">{r.urgency}</p>
                      </div>
                    )}
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 border border-[#2A7F8A]/30 p-5 bg-[#0D0D0D] flex flex-col justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-xs text-[#2A7F8A] uppercase tracking-widest mb-3">Order this</p>
                    <ul className="space-y-2">
                      {r.orderThis.map((dish) => (
                        <li key={dish} className="text-[#F8F5F0] text-sm flex gap-2">
                          <span className="text-[#2A7F8A]">—</span>{dish}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[#F8F5F0]/30 text-xs mt-4">Tap to flip back</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <CommentThread slug="restaurants" />
      </div>

      {/* Pro Tips bottom sheet (mobile) / side panel (desktop) */}
      <AnimatePresence>
        {showProTips && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowProTips(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-80 bg-[#0D0D0D] border-t md:border-t-0 md:border-l border-[#F8F5F0]/10 z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#F8F5F0]">{t.proTips}</h2>
                <button onClick={() => setShowProTips(false)} className="text-[#F8F5F0]/40 p-2 min-h-[44px]">✕</button>
              </div>
              <div className="space-y-5">
                {proTips.map((tip) => (
                  <div key={tip.icon} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <p className="text-[#F8F5F0]/70 text-sm leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

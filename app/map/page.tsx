'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { MapPoint } from '@/data/types'

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false })

export default function MapPage() {
  const [selected, setSelected] = useState<MapPoint | null>(null)

  return (
    <div className="h-screen bg-[#F8F5F0] flex flex-col pt-14">
      <div className="flex-1 relative">
        <MapComponent onPinClick={setSelected} />

        {/* Desktop side panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-4 right-4 w-72 bg-[#FFFFFF] border border-[#1A1A1A]/10 p-5 z-[400] hidden md:block"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-[#1A1A1A]/30 p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                ✕
              </button>
              <span className="text-xs text-[#2A7F8A] uppercase tracking-widest block mb-2">{selected.type}</span>
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#1A1A1A] mb-2">{selected.name}</h2>
              <p className="text-[#1A1A1A]/60 text-sm mb-4">{selected.description}</p>
              {selected.slug && (
                <Link
                  href={selected.slug}
                  className="text-[#2A7F8A] text-sm border border-[#2A7F8A]/30 px-3 py-2 inline-block hover:border-[#2A7F8A] transition-colors min-h-[44px] flex items-center"
                  data-cursor="hover"
                >
                  View details →
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[390] md:hidden"
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(_, info) => { if (info.offset.y > 80) setSelected(null) }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-[400] bg-[#FFFFFF] border-t border-[#1A1A1A]/10 p-5 md:hidden"
                style={{ maxHeight: '60vh' }}
              >
                <div className="w-10 h-1 bg-[#1A1A1A]/20 rounded-full mx-auto mb-4" />
                <span className="text-xs text-[#2A7F8A] uppercase tracking-widest block mb-2">{selected.type}</span>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#1A1A1A] mb-2">{selected.name}</h2>
                <p className="text-[#1A1A1A]/60 text-sm mb-4">{selected.description}</p>
                {selected.slug && (
                  <Link
                    href={selected.slug}
                    className="block text-center text-[#2A7F8A] text-sm border border-[#2A7F8A]/30 px-3 py-3 hover:border-[#2A7F8A] transition-colors"
                  >
                    View details →
                  </Link>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

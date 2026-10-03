'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import images from '@/data/images.json'
import { wedding } from '@/data/wedding'
import CommentThread from '@/components/CommentThread'

const PhotoWall = dynamic(() => import('@/components/PhotoWall'), { ssr: false })

function useCountdown(iso: string) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    if (!iso) return
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [iso])

  if (!iso || now === null) return null
  const diff = new Date(iso + 'T12:00:00').getTime() - now
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  }
}

export default function WeddingPage() {
  const countdown = useCountdown(wedding.isoDate)
  const schedule = wedding.schedule.filter((s) => s.title)
  const filled = wedding.notes.filter((n) => n.title && n.detail)
  const notes = filled.length ? filled : wedding.notes.filter((n) => n.title)

  return (
    <div className="min-h-screen bg-[#F8F5F0]">

      {/* Hero */}
      <section className="relative min-h-[86vh] flex items-end overflow-hidden">
        <Image src={images.wedding} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/30 to-[#0d0d0d]/50" />

        <div className="relative z-10 w-full px-5 md:px-8 pb-10 md:pb-14 text-center">
          <p className="text-[#F8F5F0]/70 text-[11px] md:text-xs uppercase tracking-[0.35em] mb-5">
            {wedding.dateLabel}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] leading-[0.9] tracking-tight">
            <span className="block text-[clamp(2.75rem,13vw,8rem)] text-[#F8F5F0]">{wedding.bride}</span>
            <span className="block text-[clamp(1.25rem,4vw,2.5rem)] text-[#2A7F8A] italic my-1 md:my-2">&amp;</span>
            <span className="block text-[clamp(2.75rem,13vw,8rem)] text-[#F8F5F0]">{wedding.groom}</span>
          </h1>
          <p className="mt-6 text-[#F8F5F0]/70 text-sm tracking-[0.25em] uppercase">
            {wedding.venue} &middot; {wedding.country}
          </p>
        </div>
      </section>

      {/* Countdown */}
      {countdown && (
        <section className="border-y border-[#1A1A1A]/10">
          <div className="mx-auto grid max-w-3xl grid-cols-4 divide-x divide-[#1A1A1A]/10">
            {[
              { v: countdown.days, l: 'days' },
              { v: countdown.hours, l: 'hours' },
              { v: countdown.mins, l: 'minutes' },
              { v: countdown.secs, l: 'seconds' },
            ].map((u) => (
              <div key={u.l} className="px-2 py-7 text-center">
                <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl tabular-nums">
                  {String(u.v).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/45">
                  {u.l}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Order of the day */}
      {schedule.length > 0 && (
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#2A7F8A] mb-2">The day</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl mb-10">
              Order of the day
            </h2>
            <ol>
              {schedule.map((s, i) => (
                <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < schedule.length - 1 && (
                    <span
                      className="absolute left-[7px] top-5 bottom-0 w-px bg-[#1A1A1A]/12"
                      aria-hidden
                    />
                  )}
                  <span className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#2A7F8A] bg-[#F8F5F0]" />
                  <div className="flex-1">
                    {s.time && (
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/45 mb-1">
                        {s.time}
                      </p>
                    )}
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl">{s.title}</h3>
                    {s.detail && <p className="mt-1 text-sm text-[#1A1A1A]/60">{s.detail}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Guest notes */}
      {notes.length > 0 && (
        <section className="px-5 md:px-8 pb-16 md:pb-24">
          <div className="mx-auto max-w-5xl grid gap-px bg-[#1A1A1A]/10 sm:grid-cols-2 lg:grid-cols-4">
            {notes.map((n) => (
              <div key={n.title} className="bg-[#F8F5F0] p-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#2A7F8A] mb-2">{n.title}</h3>
                <p className="text-sm text-[#1A1A1A]/65 leading-relaxed">{n.detail || 'Coming soon'}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Message */}
      {wedding.message && (
        <section className="px-5 md:px-8 pb-16 md:pb-24">
          <div className="mx-auto max-w-2xl border-t border-[#1A1A1A]/12 pt-10">
            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl italic leading-relaxed text-[#1A1A1A]/75">
              {wedding.message}
            </p>
          </div>
        </section>
      )}

      {/* Photos */}
      <section className="border-t border-[#1A1A1A]/10 px-5 md:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <PhotoWall />
        </div>
      </section>

      {/* Guestbook */}
      <section className="px-5 md:px-8 pb-16 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <CommentThread slug="wedding" />
        </div>
      </section>
    </div>
  )
}

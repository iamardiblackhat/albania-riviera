'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import images from '@/data/images.json'
import { wedding } from '@/data/wedding'

const categories = [
  { label: 'ATV & Quad', href: '/activities/atv', imageKey: 'atv', note: 'Off-road trails from Mesopotam to the Blue Eye.' },
  { label: 'Boat Tours', href: '/activities/boats', imageKey: 'boats', note: 'Northern and southern routes. Shared or private.' },
  { label: 'Horseback', href: '/activities/horseback', imageKey: 'horseback', note: 'Valley trails near Gjirokaster, farm rides on the Delvine road.' },
  { label: 'Day Trips', href: '/activities/day-trips', imageKey: 'blue-eye', note: 'Blue Eye, Butrint, Gjirokaster, Lekursi at sunset.' },
]

/** Dense contact sheet. Many small tiles, minimal chrome. */
const contactSheet = [
  { imageKey: 'riviera', label: 'Saranda' },
  { imageKey: 'ksamil', label: 'Ksamil' },
  { imageKey: 'coast', label: 'Dhermi' },
  { imageKey: 'blue-eye', label: 'Blue Eye' },
  { imageKey: 'butrint', label: 'Butrint' },
  { imageKey: 'gjirokaster', label: 'Gjirokaster' },
  { imageKey: 'gjirokaster-old', label: 'Gjirokaster' },
  { imageKey: 'boats', label: 'The coast' },
  { imageKey: 'harbour', label: 'The port' },
  { imageKey: 'lakes', label: 'Bistrica' },
  { imageKey: 'mountains', label: 'The interior' },
  { imageKey: 'atv', label: 'Llogara' },
  { imageKey: 'horseback', label: 'On horseback' },
  { imageKey: 'food', label: 'The food' },
]

const highlights = [
  { name: 'Blue Eye', note: '50 lek entry. 50m deep. 22km from Saranda.' },
  { name: 'Krorez Beach', note: 'Boat access only. Long stop, sunbeds on site.' },
  { name: 'Mare Nostrum', note: 'Bilal Golemi Street. Best kitchen in town.' },
  { name: 'Taverna Haxhi', note: 'Waterfront. Grilled octopus and mussels.' },
]

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t1 = window.setTimeout(() => {
      if (titleRef.current) titleRef.current.style.opacity = '1'
      if (subRef.current) subRef.current.style.opacity = '1'
    }, 120)
    return () => window.clearTimeout(t1)
  }, [])

  return (
    <div className="bg-[#F8F5F0]">

      {/* Hero. One photograph, edge to edge. No rules, no box. */}
      <section className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <Image
          src={images.hero}
          alt="The Albanian Riviera from the Llogara pass"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-[#0d0d0d]/10 to-[#0d0d0d]/35" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1
            ref={titleRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(3.5rem,15vw,11rem)] font-normal leading-[0.85] tracking-[-0.03em] text-[#F8F5F0] transition-opacity duration-1000"
            style={{ opacity: 0 }}
          >
            ALBANIA
          </h1>
          <p
            ref={subRef}
            className="mt-6 text-[#F8F5F0]/75 text-[11px] md:text-sm uppercase tracking-[0.4em] transition-opacity duration-1000 delay-200"
            style={{ opacity: 0 }}
          >
            {wedding.bride} &amp; {wedding.groom}
          </p>
        </div>
      </section>

      {/* What to do */}
      <section className="px-5 md:px-8 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#2A7F8A] mb-2">Four things to do</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl mb-8 md:mb-12">
            Pick a direction
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="group relative block aspect-square overflow-hidden">
              <Image
                src={images[c.imageKey as keyof typeof images]}
                alt={c.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-[#0d0d0d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-base md:text-lg text-[#F8F5F0] mb-1">
                  {c.label}
                </h3>
                <p className="text-[#F8F5F0]/70 text-[11px] md:text-xs leading-snug">{c.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dense contact sheet */}
      <section className="px-2 md:px-3 pt-16 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between px-3 md:px-0 mb-4 md:mb-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl">The Riviera</h2>
            <span className="text-xs text-[#1A1A1A]/40 hidden md:block">
              {contactSheet.length} photographs
            </span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-0.5 md:gap-1">
            {contactSheet.map((s, i) => (
              <figure
                key={`${s.imageKey}-${i}`}
                className="group relative aspect-square overflow-hidden bg-[#1A1A1A]/5"
              >
                <Image
                  src={images[s.imageKey as keyof typeof images]}
                  alt={s.label}
                  fill
                  loading="lazy"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 17vw, 12vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0d0d] to-transparent px-1.5 pb-1 pt-4">
                  <span className="block truncate text-[9px] md:text-[10px] uppercase tracking-wider text-[#F8F5F0]/90">
                    {s.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding */}
      <section className="px-5 md:px-8 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <Link href="/wedding" className="group block">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <Image
                src={images.hero}
                alt={`${wedding.bride} and ${wedding.groom}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-[#0d0d0d]/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[#F8F5F0]/70 text-[10px] uppercase tracking-[0.35em] mb-3">
                  {wedding.dateLabel} &middot; {wedding.venue}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,8vw,5.5rem)] leading-none text-[#F8F5F0]">
                  {wedding.bride} &amp; {wedding.groom}
                </h2>
                <span className="mt-6 inline-flex items-center gap-2 text-[#F8F5F0] text-xs uppercase tracking-[0.25em]">
                  Wedding details
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick hits */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl mb-6 md:mb-10">
            Worth the detour
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {highlights.map((h) => (
              <div key={h.name}>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg mb-1">{h.name}</h3>
                <p className="text-sm text-[#1A1A1A]/55 leading-relaxed">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <footer className="border-t border-[#1A1A1A]/10 px-5 md:px-8 py-12">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-xs text-[#1A1A1A]/45">
            {wedding.bride} &amp; {wedding.groom} &middot; {wedding.venue}, {wedding.country}
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ['/activities', 'Activities'],
              ['/restaurants', 'Restaurants'],
              ['/map', 'Map'],
              ['/my-day', 'My Day'],
              ['/wedding', 'Wedding'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/55 hover:text-[#1A1A1A] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import images from '@/data/images.json'

gsap.registerPlugin(ScrollTrigger)

const MetaballHero = dynamic(() => import('@/components/MetaballHero'), { ssr: false })

const categories = [
  {
    label: 'ATV & Quad',
    href: '/activities/atv',
    imageKey: 'atv',
    description: 'Off-road trails from Mesopotam to the Blue Eye.',
    accent: '#8B5A2B',
  },
  {
    label: 'Boat Tours',
    href: '/activities/boats',
    imageKey: 'boats',
    description: 'Northern and southern Riviera routes. Shared or private charter.',
    accent: '#1B4F72',
  },
  {
    label: 'Horseback',
    href: '/activities/horseback',
    imageKey: 'horseback',
    description: 'Valley trails near Gjirokaster and farm rides on the Kardhiq-Delvine road.',
    accent: '#C4832A',
  },
  {
    label: 'Day Trips',
    href: '/activities/day-trips',
    imageKey: 'blue-eye',
    description: 'Blue Eye, Butrint UNESCO, Gjirokaster, Lekursi Castle at sunset.',
    accent: '#2D6A4F',
  },
]

const spotlights = [
  {
    imageKey: 'riviera',
    label: 'Ionian Coast',
    note: 'The water is clearest in June and September.',
  },
  {
    imageKey: 'gjirokaster',
    label: 'Gjirokaster',
    note: 'UNESCO City of Stone. Full day from Saranda.',
  },
  {
    imageKey: 'butrint',
    label: 'Butrint',
    note: 'Greek, Roman, Byzantine, Venetian — all in one lagoon.',
  },
  {
    imageKey: 'ksamil',
    label: 'Ksamil',
    note: 'Three uninhabited islands you can wade between.',
  },
  {
    imageKey: 'food',
    label: 'The Food',
    note: 'Fish priced per kilo. Ask the weight before it hits the grill.',
  },
  {
    imageKey: 'horseback',
    label: 'The Interior',
    note: 'Most visitors never leave the coast. They miss the best parts.',
  },
]

const highlights = [
  { name: 'Mare Nostrum', tag: 'Fine Dining', note: 'Bilal Golemi Street. Best kitchen in town.' },
  { name: 'Taverna Haxhi', tag: 'Local', note: 'Waterfront. Grilled octopus and mussels.' },
  { name: 'Blue Eye', tag: 'Day Trip', note: '50 lek entry. 50 metres deep. 22km from Saranda.' },
  { name: 'Krorez Beach', tag: 'Boat Tour', note: 'Boat access only. 2.5hr stop. Sunbeds on site.' },
]

const photoStrip = [
  { imageKey: 'coast', label: 'Dhërmi', note: 'Long beach below the pass. Quieter than Ksamil.' },
  { imageKey: 'harbour', label: 'Saranda Port', note: 'Where every boat tour leaves from.' },
  { imageKey: 'mountains', label: 'The Interior', note: 'Most people never leave the coast.' },
  { imageKey: 'lakes', label: 'Bistrica Lake', note: 'Sits right on the ATV route.' },
  { imageKey: 'gjirokaster-old', label: 'Gjirokastër', note: 'Ottoman houses. Very steep streets.' },
]

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (overlayRef.current) overlayRef.current.style.opacity = '0'
      return
    }
    const tl = gsap.timeline()
    tl.to(overlayRef.current, { opacity: 0, duration: 1.6, ease: 'power2.out' })
      .from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
      .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .from(lineRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.out' }, '-=0.3')
    return () => { tl.kill() }
  }, [])

  return (
    <div className="bg-[#F8F5F0]">

      {/* ── Metaball Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <MetaballHero />

        {/* initial black fade-in overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#1A1A1A] z-10 pointer-events-none" />

        {/* text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1
            ref={titleRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(4rem,14vw,9rem)] font-bold text-[#F8F5F0] leading-none tracking-tight"
          >
            ALBANIA
          </h1>
          <p ref={subtitleRef} className="mt-4 text-[#F8F5F0]/60 text-base md:text-lg tracking-[0.3em] uppercase">
            Erda &amp; Faton &mdash; 2026
          </p>
          <div ref={lineRef} className="mt-5 h-px w-20 md:w-40 bg-[#2A7F8A]" />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#F8F5F0]/40">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ── Activity category blocks ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative block h-[85vh] md:h-[70vh] overflow-hidden"
            data-cursor="hover"
          >
            <Image
              src={images[cat.imageKey as keyof typeof images]}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="text-xs uppercase tracking-widest block mb-2" style={{ color: cat.accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#F8F5F0] mb-2 leading-tight">
                {cat.label}
              </h2>
              <p className="text-[#F8F5F0]/60 text-sm max-w-xs">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Image spotlight grid ──────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#2A7F8A] uppercase tracking-widest mb-2">The Riviera</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#1A1A1A] mb-8">
            What to expect
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {spotlights.map((s, i) => (
              <div
                key={s.label}
                className={`relative overflow-hidden ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}
              >
                <div className={`relative w-full ${i === 0 ? 'h-[50vw] md:h-full min-h-[300px]' : 'h-[30vw] md:h-48'} overflow-hidden`}>
                  <Image
                    src={images[s.imageKey as keyof typeof images]}
                    alt={s.label}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <p className="text-[#F8F5F0] text-sm font-medium">{s.label}</p>
                    <p className="text-[#F8F5F0]/50 text-xs mt-0.5 hidden md:block">{s.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wedding banner ────────────────────────────────────────────────── */}
      <Link
        href="/wedding"
        className="group relative block overflow-hidden"
        data-cursor="hover"
      >
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={images.wedding}
            alt="Erda and Faton wedding"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/65" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-[#2A7F8A] text-xs uppercase tracking-widest mb-4">Summer 2026 · Saranda, Albania</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,9vw,7rem)] text-[#F8F5F0] leading-none">
              Erda &amp; Faton
            </h2>
            <div className="mt-4 h-px w-0 bg-[#2A7F8A] transition-all duration-700 group-hover:w-32 mx-auto" />
            <p className="mt-6 text-[#F8F5F0]/40 text-sm">Wedding page &rarr;</p>
          </div>
        </div>
      </Link>

      {/* ── Quick highlights ──────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#1A1A1A]">
              Highlights
            </h2>
            <Link href="/activities" className="text-[#2A7F8A] text-sm" data-cursor="hover">
              All activities &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {highlights.map((h) => (
              <div
                key={h.name}
                className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-5 hover:border-[#2A7F8A]/50 transition-colors"
              >
                <span className="text-xs text-[#2A7F8A] uppercase tracking-widest block mb-2">{h.tag}</span>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-[#1A1A1A] mb-2">{h.name}</h3>
                <p className="text-[#1A1A1A]/55 text-sm leading-relaxed">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo strip ───────────────────────────────────────────────────── */}
      <div className="pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-8">
          {photoStrip.map((s) => (
            <div
              key={s.label}
              className="relative flex-shrink-0 w-[72vw] md:w-[26vw] h-[36vh] overflow-hidden group"
            >
              <Image
                src={images[s.imageKey as keyof typeof images]}
                alt={s.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 72vw, 26vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[#F8F5F0] text-sm font-medium">{s.label}</p>
                <p className="text-[#F8F5F0]/60 text-xs mt-0.5">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full-bleed restaurant teaser ──────────────────────────────────── */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={images.food}
          alt="Albanian seafood"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs text-[#2A7F8A] uppercase tracking-widest mb-3">Food &amp; Dining</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-[#F8F5F0] mb-6">
            Where to eat in Saranda
          </h2>
          <Link
            href="/restaurants"
            className="border border-[#F8F5F0]/40 text-[#F8F5F0] px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#F8F5F0] hover:text-[#1A1A1A] transition-colors min-h-[44px] inline-flex items-center"
            data-cursor="hover"
          >
            View restaurant guide
          </Link>
        </div>
      </div>

      {/* ── Map CTA with riviera image ────────────────────────────────────── */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src={images.riviera}
          alt="Albanian Riviera map"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl text-[#F8F5F0] mb-5">
            See everything on the map
          </h2>
          <Link
            href="/map"
            className="border border-[#2A7F8A] text-[#2A7F8A] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors min-h-[44px] inline-flex items-center"
            data-cursor="hover"
          >
            Open map
          </Link>
        </div>
      </div>

    </div>
  )
}

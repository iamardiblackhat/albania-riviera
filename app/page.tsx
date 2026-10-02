'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import images from '@/data/images.json'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { label: 'ATV & Quad', href: '/activities/atv', imageKey: 'atv', description: 'Off-road trails from Mesopotam to the Blue Eye. Guided. Safety gear included.' },
  { label: 'Boat Tours', href: '/activities/boats', imageKey: 'boats', description: 'Northern and southern Riviera routes. Shared or private charter.' },
  { label: 'Horseback', href: '/activities/horseback', imageKey: 'horseback', description: 'Valley trails near Gjirokaster and farm rides on the Kardhiq-Delvine road.' },
  { label: 'Day Trips', href: '/activities/day-trips', imageKey: 'blue-eye', description: 'Blue Eye, Butrint UNESCO, Gjirokaster, Lekursi Castle sunset.' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      if (overlayRef.current) overlayRef.current.style.opacity = '0'
      if (titleRef.current) titleRef.current.style.opacity = '1'
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1'
      if (lineRef.current) lineRef.current.style.opacity = '1'
      return
    }

    const tl = gsap.timeline()
    tl.to(overlayRef.current, { opacity: 0, duration: 1.4, ease: 'power2.out' })
      .from(titleRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .from(lineRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from(chevronRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  return (
    <div className="bg-[#1A1A1A]">
      {/* Hero */}
      <div ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={images.hero}
          preload="auto"
        >
          <source src="https://www.pexels.com/download/video/5990855/" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#1A1A1A]/50" />

        {/* Black overlay for reveal animation */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#1A1A1A] z-10" />

        {/* Hero text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1
            ref={titleRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,12vw,8rem)] font-bold text-[#F8F5F0] leading-none tracking-tight mb-4"
          >
            ALBANIA
          </h1>
          <p ref={subtitleRef} className="text-[#F8F5F0]/70 text-lg md:text-xl tracking-widest uppercase">
            Erda &amp; Faton &mdash; 2026
          </p>
          <div
            ref={lineRef}
            className="mt-6 h-px w-24 md:w-48 bg-[#2A7F8A]"
          />
        </div>

        {/* Scroll chevron */}
        <div
          ref={chevronRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#F8F5F0]/50">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Category blocks — vertical on mobile, grid on desktop */}
      <div className="md:grid md:grid-cols-2">
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative block h-[85vh] md:h-[70vh] overflow-hidden"
            data-cursor="hover"
          >
            <Image
              src={images[cat.imageKey as keyof typeof images] || images.hero}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="text-xs uppercase tracking-widest text-[#2A7F8A] block mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#F8F5F0] mb-2">
                {cat.label}
              </h2>
              <p className="text-[#F8F5F0]/60 text-sm max-w-xs">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Wedding banner */}
      <Link
        href="/wedding"
        className="group relative block bg-[#0D0D0D] px-6 py-16 md:py-24 text-center overflow-hidden"
        data-cursor="hover"
      >
        <p className="text-[#2A7F8A] text-xs uppercase tracking-widest mb-4">Summer 2026 · Saranda, Albania</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,8vw,6rem)] text-[#F8F5F0] leading-none">
          Erda &amp; Faton
        </h2>
        <div className="mt-4 h-px w-0 bg-[#2A7F8A] mx-auto transition-all duration-700 group-hover:w-32" />
        <p className="mt-6 text-[#F8F5F0]/40 text-sm">View the wedding page →</p>
      </Link>

      {/* Restaurants section */}
      <div className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#F8F5F0]">
              Where to eat
            </h2>
            <Link href="/restaurants" className="text-[#2A7F8A] text-sm" data-cursor="hover">
              All restaurants →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Mare Nostrum', tag: 'Fine Dining', note: 'Bilal Golemi Street. Best kitchen in town.' },
              { name: 'Taverna Haxhi', tag: 'Local', note: 'Waterfront. Grilled octopus and mussels.' },
              { name: 'Bar Restorant Pulebardha', tag: 'Beach', note: 'Eat with your feet in the sand.' },
            ].map((r) => (
              <Link
                key={r.name}
                href="/restaurants"
                className="border border-[#F8F5F0]/10 p-6 hover:border-[#2A7F8A]/50 transition-colors"
                data-cursor="hover"
              >
                <span className="text-xs text-[#2A7F8A] uppercase tracking-widest block mb-2">{r.tag}</span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#F8F5F0] mb-2">{r.name}</h3>
                <p className="text-[#F8F5F0]/50 text-sm">{r.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Map CTA */}
      <div className="px-4 md:px-8 pb-16 text-center">
        <Link
          href="/map"
          className="inline-block border border-[#2A7F8A] text-[#2A7F8A] px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors min-h-[44px]"
          data-cursor="hover"
        >
          View everything on the map
        </Link>
      </div>
    </div>
  )
}

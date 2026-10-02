'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import CommentThread from '@/components/CommentThread'

const PhotoWall = dynamic(() => import('@/components/PhotoWall'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

export default function WeddingPage() {
  const erdaRef = useRef<HTMLSpanElement>(null)
  const ampRef = useRef<HTMLSpanElement>(null)
  const fatonRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const locationRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Restore sound preference
    if (sessionStorage.getItem('wedding-sound') === 'on') setSoundOn(true)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      ;[erdaRef, ampRef, fatonRef, dateRef, locationRef, lineRef].forEach((r) => {
        if (r.current) (r.current as HTMLElement).style.opacity = '1'
      })
      return
    }

    const tl = gsap.timeline({ delay: 2 })
    tl.from(erdaRef.current, { x: -60, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from(ampRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from(fatonRef.current, { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from(dateRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .from(locationRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from(lineRef.current, { scaleX: 0, transformOrigin: 'center', duration: 0.8, ease: 'power2.out' }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/ambient.mp3')
      audioRef.current.loop = true
    }
    if (soundOn) {
      audioRef.current.pause()
      sessionStorage.setItem('wedding-sound', 'off')
    } else {
      audioRef.current.play().catch(() => {})
      sessionStorage.setItem('wedding-sound', 'on')
    }
    setSoundOn(!soundOn)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center border border-[#F8F5F0]/20 bg-[#0D0D0D]/80 text-[#F8F5F0]/60 hover:text-[#F8F5F0] transition-colors"
        aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
        data-cursor="hover"
      >
        {soundOn ? '🔊' : '🔇'}
      </button>

      {/* Hero section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-baseline justify-center gap-4 md:gap-8 flex-wrap">
          <span
            ref={erdaRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,10vw,7rem)] text-[#F8F5F0] leading-none"
          >
            Erda
          </span>
          <span
            ref={ampRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,6vw,4rem)] text-[#2A7F8A] leading-none"
          >
            &amp;
          </span>
          <span
            ref={fatonRef}
            className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,10vw,7rem)] text-[#F8F5F0] leading-none"
          >
            Faton
          </span>
        </div>

        <p ref={dateRef} className="mt-6 text-[#F8F5F0]/50 text-sm uppercase tracking-widest">
          Summer 2026
        </p>
        <p ref={locationRef} className="text-[#F8F5F0]/50 text-sm uppercase tracking-widest mt-1">
          Saranda, Albania
        </p>
        <div ref={lineRef} className="mt-6 h-px w-32 bg-[#2A7F8A]" />

        <div className="mt-12 animate-bounce text-[#F8F5F0]/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Wedding details */}
      <div className="relative z-10 px-4 md:px-8 py-16 max-w-2xl mx-auto">
        <div className="space-y-12">
          <div className="border-l-2 border-[#2A7F8A] pl-6">
            <p className="text-xs text-[#2A7F8A] uppercase tracking-widest mb-2">Ceremony</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-[#F8F5F0]">[CEREMONY VENUE]</p>
            <p className="text-[#F8F5F0]/50 text-sm mt-1">[CEREMONY TIME]</p>
          </div>

          <div className="border-l-2 border-[#2A7F8A] pl-6">
            <p className="text-xs text-[#2A7F8A] uppercase tracking-widest mb-2">Reception</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-[#F8F5F0]">[RECEPTION VENUE]</p>
            <p className="text-[#F8F5F0]/50 text-sm mt-1">[RECEPTION TIME]</p>
          </div>

          <div className="border-l-2 border-[#F8F5F0]/10 pl-6">
            <p className="text-xs text-[#F8F5F0]/40 uppercase tracking-widest mb-2">Dress code</p>
            <p className="text-[#F8F5F0]/70 text-sm">[DRESS CODE]</p>
          </div>
        </div>

        {/* Personal message */}
        <blockquote className="mt-16 border-t border-[#F8F5F0]/10 pt-10">
          <p className="font-[family-name:var(--font-playfair)] italic text-xl text-[#F8F5F0]/70 leading-relaxed">
            [ADD YOUR MESSAGE TO GUESTS HERE]
          </p>
        </blockquote>
      </div>

      {/* Photo wall */}
      <div className="relative z-10 px-4 md:px-8 py-8 max-w-6xl mx-auto border-t border-[#F8F5F0]/10">
        <PhotoWall />
      </div>

      {/* Comment thread */}
      <div className="relative z-10 px-4 md:px-8 pb-16 max-w-3xl mx-auto">
        <CommentThread slug="wedding" />
      </div>
    </div>
  )
}

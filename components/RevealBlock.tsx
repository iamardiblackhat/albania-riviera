'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealBlockProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function RevealBlock({ children, className = '', delay = 0 }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1, duration: 0.4, delay,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      })
      return
    }

    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

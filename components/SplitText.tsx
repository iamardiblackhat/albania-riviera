'use client'

import { useEffect, useRef, ElementType } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  as?: ElementType
}

export default function SplitTextAnim({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  as: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, delay })
      return
    }

    const split = new SplitType(el, { types: 'chars' })
    const chars = split.chars || []

    gsap.set(chars, { yPercent: 100, opacity: 0 })
    gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      stagger,
      delay,
      ease: 'power3.out',
    })

    return () => split.revert()
  }, [delay, stagger])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`overflow-hidden inline-block ${className}`}>
      {children}
    </Tag>
  )
}

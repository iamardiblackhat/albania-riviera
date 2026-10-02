'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterHover = () => ring.classList.add('cursor-ring--large')
    const onLeaveHover = () => ring.classList.remove('cursor-ring--large')

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterHover)
      el.addEventListener('mouseleave', onLeaveHover)
    })

    // Re-bind on DOM mutations
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterHover)
        el.addEventListener('mouseleave', onLeaveHover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 bg-[#2A7F8A] rounded-full -translate-x-1/2 -translate-y-1/2 hidden [@media(pointer:fine)]:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 border border-[#2A7F8A]/60 rounded-full -translate-x-1/2 -translate-y-1/2 hidden [@media(pointer:fine)]:block transition-[width,height,border-color] duration-200"
        aria-hidden="true"
        style={{ marginLeft: '-0.5rem', marginTop: '-0.5rem' }}
      />
      <style>{`
        .cursor-ring--large {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(42, 127, 138, 0.4) !important;
          margin-left: -0.75rem !important;
          margin-top: -0.75rem !important;
        }
      `}</style>
    </>
  )
}

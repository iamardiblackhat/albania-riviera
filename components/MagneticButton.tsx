'use client'

import { useRef, ReactNode, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  href?: string
}

export default function MagneticButton({ children, className = '', onClick, type = 'button' }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    // Only on fine pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.3
    const dy = (e.clientY - cy) * 0.3
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 400)
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-pointer ${className}`}
      data-cursor="hover"
    >
      {children}
    </button>
  )
}

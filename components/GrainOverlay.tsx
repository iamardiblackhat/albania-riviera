'use client'

import { useEffect, useRef } from 'react'

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrain = () => {
      frame++
      if (frame % 3 !== 0) {
        raf = requestAnimationFrame(drawGrain)
        return
      }
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 18 // very low alpha
      }
      ctx.putImageData(imageData, 0, 0)
      raf = requestAnimationFrame(drawGrain)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(drawGrain)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    />
  )
}

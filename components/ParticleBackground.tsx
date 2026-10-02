'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    let mounted = true
    let animId: number

    async function init() {
      const THREE = await import('three')
      if (!mounted || !container) return

      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
      camera.position.z = 5

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const count = isMobile || navigator.hardwareConcurrency < 4 ? 800 : 2000

      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const speeds = new Float32Array(count)

      const gold = new THREE.Color('#FFD700')
      const white = new THREE.Color('#FFFFFF')
      const teal = new THREE.Color('#2A7F8A')

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8
        speeds[i] = 0.002 + Math.random() * 0.004

        const r = Math.random()
        const col = r < 0.5 ? gold : r < 0.85 ? white : teal
        colors[i * 3] = col.r
        colors[i * 3 + 1] = col.g
        colors[i * 3 + 2] = col.b
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // Fade in
      let fadeIn = 0
      const fadeDuration = 2000
      const startTime = Date.now()

      // Mouse parallax
      let mouseX = 0
      let mouseY = 0
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      const onResize = () => {
        const nw = container.clientWidth
        const nh = container.clientHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      const tick = () => {
        if (!mounted) return

        // Fade in opacity
        const elapsed = Date.now() - startTime
        fadeIn = Math.min(elapsed / fadeDuration, 1)
        mat.opacity = fadeIn * 0.85

        // Move particles upward
        const pos = geo.attributes.position
        const posArr = pos.array as Float32Array
        for (let i = 0; i < count; i++) {
          posArr[i * 3 + 1] = posArr[i * 3 + 1] + speeds[i]
          if (posArr[i * 3 + 1] > 6) {
            posArr[i * 3 + 1] = -6
          }
        }
        pos.needsUpdate = true

        // Subtle mouse parallax
        particles.rotation.x += (-mouseY * 0.05 - particles.rotation.x) * 0.02
        particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.02

        renderer.render(scene, camera)
        animId = requestAnimationFrame(tick)
      }
      tick()

      return () => {
        mounted = false
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })
    return () => {
      mounted = false
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

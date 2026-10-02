'use client'

import { useEffect, useRef, useState } from 'react'

interface PanoramaViewerProps {
  imageUrl: string
  fallbackUrl?: string
  label?: string
}

function PanoramaFallback({ fallbackUrl, label }: PanoramaViewerProps) {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#1A1A1A] overflow-hidden">
      {fallbackUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fallbackUrl} alt={label || 'Location view'} className="w-full h-full object-cover" />
      )}
      {label && (
        <div className="absolute bottom-4 left-4 text-[#F8F5F0]/60 text-xs uppercase tracking-widest">
          {label}
        </div>
      )}
    </div>
  )
}

function PanoramaCanvas({ imageUrl, label }: PanoramaViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [showGyroPrompt, setShowGyroPrompt] = useState(false)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    let mounted = true
    let animId: number

    async function init() {
      const THREE = await import('three')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js' as any)
      if (!mounted || !container) return

      const w = container.clientWidth || 400
      const h = container.clientHeight || 300

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
      camera.position.set(0, 0, 0.1)

      const texture = new THREE.TextureLoader().load(imageUrl)
      texture.colorSpace = THREE.SRGBColorSpace

      const geo = new THREE.SphereGeometry(500, 60, 40)
      geo.scale(-1, 1, 1)
      const mat = new THREE.MeshBasicMaterial({ map: texture })
      scene.add(new THREE.Mesh(geo, mat))

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enablePan = false
      controls.rotateSpeed = -0.3
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.4

      let autoTimer: ReturnType<typeof setTimeout>
      controls.addEventListener('start', () => { controls.autoRotate = false })
      controls.addEventListener('end', () => {
        clearTimeout(autoTimer)
        autoTimer = setTimeout(() => { controls.autoRotate = true }, 4000)
      })

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) setShowGyroPrompt(true)

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
        controls.update()
        renderer.render(scene, camera)
        animId = requestAnimationFrame(tick)
      }
      tick()

      return () => {
        mounted = false
        cancelAnimationFrame(animId)
        clearTimeout(autoTimer)
        window.removeEventListener('resize', onResize)
        controls.dispose()
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
  }, [imageUrl])

  const enableGyro = async () => {
    const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }
    if (typeof DOE.requestPermission === 'function') {
      const perm = await DOE.requestPermission()
      if (perm === 'granted') setShowGyroPrompt(false)
    } else {
      setShowGyroPrompt(false)
    }
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] bg-black overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      {showGyroPrompt && (
        <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
          <button
            onClick={enableGyro}
            className="pointer-events-auto bg-[#1A1A1A]/80 text-[#F8F5F0] text-sm px-4 py-2 border border-[#F8F5F0]/20 min-h-[44px]"
          >
            Tap to enable gyroscope
          </button>
        </div>
      )}
      {label && (
        <div className="absolute bottom-4 left-4 text-[#F8F5F0]/60 text-xs uppercase tracking-widest pointer-events-none">
          {label}
        </div>
      )}
    </div>
  )
}

export default function PanoramaViewer(props: PanoramaViewerProps) {
  const [ready, setReady] = useState<'loading' | 'supported' | 'unsupported'>('loading')
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const lowEnd = navigator.hardwareConcurrency < 4
      setReady(gl && !lowEnd ? 'supported' : 'unsupported')
    } catch {
      setReady('unsupported')
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {ready === 'loading' && <div className="w-full h-[50vh] bg-[#1A1A1A]/5 animate-pulse" />}
      {ready === 'unsupported' && <PanoramaFallback {...props} />}
      {ready === 'supported' && visible && <PanoramaCanvas {...props} />}
    </div>
  )
}

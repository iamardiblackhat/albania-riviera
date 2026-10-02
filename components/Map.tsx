'use client'

import { useEffect, useRef } from 'react'
import { mapPoints } from '@/data/map-points'
import type { MapPoint } from '@/data/types'

const CATEGORY_COLORS: Record<MapPoint['type'], string> = {
  atv: '#8B5A2B',
  boats: '#1B4F72',
  horseback: '#C4832A',
  'day-trip': '#2D6A4F',
  restaurant: '#2A7F8A',
  landmark: '#F8F5F0',
}

const CATEGORY_ICONS: Record<MapPoint['type'], string> = {
  atv: '🏍',
  boats: '⚓',
  horseback: '🐴',
  'day-trip': '🧭',
  restaurant: '🍴',
  landmark: '📍',
}

interface MapComponentProps {
  onPinClick?: (point: MapPoint) => void
}

export default function MapComponent({ onPinClick }: MapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let map: import('leaflet').Map | null = null

    async function init() {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (!containerRef.current) return

      map = L.map(containerRef.current, {
        center: [39.87, 20.00],
        zoom: 11,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // Add pins with staggered animation
      mapPoints.forEach((point, i) => {
        const color = CATEGORY_COLORS[point.type]
        const icon = CATEGORY_ICONS[point.type]

        const customIcon = L.divIcon({
          html: `<div style="
            background:${color};
            color:#fff;
            width:36px;height:36px;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            display:flex;align-items:center;justify-content:center;
            font-size:14px;
            box-shadow:0 2px 8px rgba(0,0,0,0.4);
            opacity:0;
            transition:opacity 0.3s ease ${i * 60}ms;
          " class="pin-${i}">
            <span style="transform:rotate(45deg)">${icon}</span>
          </div>`,
          className: '',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        })

        const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map!)

        // Fade in with delay
        setTimeout(() => {
          const el = document.querySelector(`.pin-${i}`) as HTMLElement
          if (el) el.style.opacity = '1'
        }, i * 60 + 100)

        marker.on('click', () => {
          if (onPinClick) onPinClick(point)
          map?.panTo([point.lat, point.lng], { animate: true, duration: 0.5 })
        })
      })
    }

    init()
    return () => { map?.remove() }
  }, [onPinClick])

  return <div ref={containerRef} className="w-full h-full" />
}

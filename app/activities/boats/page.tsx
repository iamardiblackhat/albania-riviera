import Image from 'next/image'
import type { Metadata } from 'next'
import images from '@/data/images.json'
import CommentThread from '@/components/CommentThread'
import PhotoSpot from '@/components/PhotoSpot'

export const metadata: Metadata = {
  title: 'Boat Tours — Albania Riviera',
  description: 'Northern and southern Riviera boat routes. Shared or private charter.',
}

const northernStops = [
  { name: 'Turtle Cave', note: 'Rock formations shaped like turtle shells. Photo stop only.' },
  { name: 'Secret Beach', note: 'Massive anchors left by old fish farms. Photo only.' },
  { name: 'Gremina', note: 'Rock archway. First swimming and snorkeling stop.' },
  { name: 'Kakome Bay', note: 'Hidden gem. Calm, clear water. Small beach.' },
  { name: 'Krorez Beach', note: '2.5 to 3hr stop. Sunbeds to rent, restaurant on the shore. Boat access only.' },
  { name: 'Military Bay (Rrojdhes)', note: 'Final swim. Old military infrastructure still visible.' },
]

const southernStops = [
  { name: 'Pigeon Cave (Shpella e Pellumbave)', note: 'Red rock cavern. Electric-blue water. Best snorkeling on the coast. Go early for the light.' },
  { name: 'Ruined Monastery', note: 'Centuries old. Sits directly above the water.' },
  { name: 'Mirror Beach (Pasqyra)', note: 'When calm, the sea mirrors the mountains perfectly.' },
  { name: 'Ksamil Islands', note: '3 uninhabited islets. Wade between them, snorkel, or stay on the boat.' },
]

const amenities = [
  { icon: '🔊', label: 'Bluetooth sound' },
  { icon: '🧊', label: 'Cooler and soft drinks' },
  { icon: '🤿', label: 'Snorkeling gear' },
  { icon: '🦺', label: 'Life jackets' },
  { icon: '🪑', label: 'Sunbeds at Krorez' },
  { icon: '⛵', label: 'Professional skipper' },
]

const operators = [
  { name: 'Saranda Tours', url: 'https://sarandatours.com', note: 'Locals. Boat tours and historical day trips.' },
  { name: 'Iona LB', url: 'https://ionalb.com', note: 'ONHEZMUS 1 — Albanian-style boat on the Ionian coast.' },
  { name: 'Saranda Summer Tours', url: 'https://sarandasummertours.com', note: 'Sailing and Butrint packages.' },
]

export default function BoatsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={images.boats} alt="Boat tours Albania" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/20 to-[#1A1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <span className="text-xs uppercase tracking-widest block mb-3" style={{ color: '#5DADE2' }}>Boat Tours</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#F8F5F0]">The Riviera by Sea</h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="border border-[#1A1A1A]/10 p-5">
            <h3 className="text-[#1A1A1A] font-medium mb-1">Shared boat</h3>
            <p className="font-[family-name:var(--font-playfair)] text-2xl" style={{ color: '#5DADE2' }}>£24 to £43</p>
            <p className="text-[#1A1A1A]/40 text-xs mt-1">per person</p>
          </div>
          <div className="border border-[#1A1A1A]/10 p-5">
            <h3 className="text-[#1A1A1A] font-medium mb-1">Private charter</h3>
            <p className="font-[family-name:var(--font-playfair)] text-2xl" style={{ color: '#5DADE2' }}>£344 to £430</p>
            <p className="text-[#1A1A1A]/40 text-xs mt-1">up to 8-10 people</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#1A1A1A] mb-4">What is included</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenities.map((a) => (
              <div key={a.label} className="flex items-center gap-2 text-sm text-[#1A1A1A]/70 bg-[#1A1A1A]/5 p-3">
                <span>{a.icon}</span><span>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#1A1A1A] mb-2">Northern Route</h2>
          <p className="text-[#1A1A1A]/50 text-sm mb-6">Turtle Cave, Gremina, Kakome, Krorez Beach. Best for beaches and swimming.</p>
          <div className="relative h-[36vh] -mx-4 md:-mx-8 mb-8 overflow-hidden">
            <Image src={images.coast} alt="Northern Riviera coastline" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#1A1A1A]/25" />
          </div>
          <div className="space-y-4">
            {northernStops.map((stop, i) => (
              <div key={stop.name} className="flex gap-4 border-b border-[#1A1A1A]/5 pb-4">
                <span className="text-xs w-5 flex-shrink-0 mt-0.5" style={{ color: '#5DADE2' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[#1A1A1A] text-sm font-medium mb-0.5">{stop.name}</h3>
                  <p className="text-[#1A1A1A]/50 text-sm">{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#2A7F8A] mb-1">Ksamil Islands</p>
          <PhotoSpot
            src={images.ksamil}
            alt="Ksamil Islands"
            caption="Three uninhabited islets. You can wade between them."
            height="h-[44vh] md:h-[54vh]"
          />
        </div>

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#1A1A1A] mb-2">Southern Route</h2>
          <p className="text-[#1A1A1A]/50 text-sm mb-6">Pigeon Cave, Mirror Beach, Ksamil Islands. Best for snorkeling.</p>
          <div className="relative h-[36vh] -mx-4 md:-mx-8 mb-8 overflow-hidden">
            <Image src={images.ksamil} alt="Ksamil Islands" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#1A1A1A]/25" />
          </div>
          <div className="space-y-4">
            {southernStops.map((stop, i) => (
              <div key={stop.name} className="flex gap-4 border-b border-[#1A1A1A]/5 pb-4">
                <span className="text-xs w-5 flex-shrink-0 mt-0.5" style={{ color: '#5DADE2' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[#1A1A1A] text-sm font-medium mb-0.5">{stop.name}</h3>
                  <p className="text-[#1A1A1A]/50 text-sm">{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Harbour band */}
        <div className="relative h-[34vh] -mx-4 md:-mx-8 mb-12 overflow-hidden">
          <Image src={images.harbour} alt="Boats in Saranda harbour" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#1A1A1A]/35" />
        </div>

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#1A1A1A] mb-4">Operators</h2>
          <div className="space-y-3">
            {operators.map((op) => (
              <a key={op.name} href={op.url} target="_blank" rel="noopener noreferrer"
                className="flex items-baseline justify-between border border-[#1A1A1A]/10 p-4 hover:border-[#5DADE2]/40 transition-colors"
                data-cursor="hover">
                <div>
                  <span className="text-[#1A1A1A] text-sm font-medium block">{op.name}</span>
                  <span className="text-[#1A1A1A]/40 text-xs">{op.note}</span>
                </div>
                <span style={{ color: '#5DADE2' }} className="text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>

        <CommentThread slug="activities/boats" />
      </div>
    </div>
  )
}

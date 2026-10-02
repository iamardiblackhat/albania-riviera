import Image from 'next/image'
import type { Metadata } from 'next'
import images from '@/data/images.json'
import CommentThread from '@/components/CommentThread'

export const metadata: Metadata = {
  title: 'Horseback Riding — Albania Riviera',
  description: 'Horseback riding near Gjirokaster and Saranda. All skill levels. Farm rides and mountain trails.',
}

const operators = [
  {
    name: 'Caravan Horse Riding Albania',
    location: 'Antigone village, near Gjirokaster',
    imageKey: 'horseback',
    directions: 'From the main square in Gjirokaster, walk east on Rruga Ismail Qemali. Turn left at Bulevardi 18 Shtatori. Walk 500 metres past Rruga Piro Masha.',
    description: 'Scenic hills and ancient trails near the UNESCO city. All skill levels. Calm horses throughout. Experienced riders can gallop ahead on open sections.',
    duration: 'Half-day',
    difficulty: 'All levels',
  },
  {
    name: 'Fauna Agroturizem',
    location: 'Kardhiq-Delvine road, near Saranda',
    imageKey: 'gjirokaster-old',
    directions: 'On the Kardhiq-Delvine road. Ask your accommodation for exact directions.',
    description: '3hr experience. Farm tour first, then saddle up. You pass free-grazing sheep, goats, and active beehives. Stop at a natural mountain spring. Back at the farm for a homemade lunch with organic cheese.',
    duration: '3 hours',
    difficulty: 'All levels',
  },
]

const vjosaRoute = [
  { name: 'Fir of Hotova National Park', note: 'Start point in Permet.' },
  { name: 'Vjosa River', note: "One of Europe's last wild rivers. Pristine banks." },
  { name: 'Natural Hot Springs', note: 'Stop here. Worth it.' },
  { name: 'Lengarica Canyon', note: 'Dramatic. Narrow canyon walls.' },
  { name: 'Ottoman Stone Bridges', note: 'Ancient crossings still in regular use.' },
  { name: 'Picnic Stop', note: 'Local fruit, nuts, regional wine.' },
]

export default function HorsebackPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={images.horseback} alt="Horseback riding Albania" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/20 to-[#1A1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <span className="text-xs uppercase tracking-widest block mb-3" style={{ color: '#C4832A' }}>Horseback</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#F8F5F0]">Riding the Riviera</h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
        <div className="space-y-6 mb-16">
          {operators.map((op) => (
            <div
              key={op.name}
              className="border border-[#1A1A1A]/10 bg-[#FFFFFF] overflow-hidden md:grid md:grid-cols-2"
            >
              <div className="relative h-56 md:h-full min-h-[14rem]">
                <Image
                  src={images[op.imageKey as keyof typeof images]}
                  alt={op.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1A1A1A]">{op.name}</h2>
                    <p className="text-xs text-[#1A1A1A]/45 mt-1">{op.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#C4832A]/15 text-[#8B5A2B] px-2 py-1">{op.duration}</span>
                    <span className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/55 px-2 py-1">{op.difficulty}</span>
                  </div>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm mb-4">{op.description}</p>
                <div className="border-t border-[#1A1A1A]/10 pt-4">
                  <p className="text-xs text-[#1A1A1A]/45 uppercase tracking-widest mb-1">Getting there</p>
                  <p className="text-[#1A1A1A]/60 text-sm">{op.directions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vjosa band */}
        <div className="relative h-[34vh] -mx-4 md:-mx-8 mb-12 overflow-hidden">
          <Image src={images.mountains} alt="Fir of Hotova National Park" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-3xl text-[#F8F5F0] text-center max-w-2xl leading-snug">
              The Vjosa is one of the last wild rivers in Europe. Ride it while it is still wild.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#1A1A1A] mb-2">
            Vjosa National Park, Permet
          </h2>
          <p className="text-[#1A1A1A]/50 text-sm mb-6">
            Further out. Half-day through Fir of Hotova. Local guides based in Permet town.
          </p>
          <div className="space-y-4">
            {vjosaRoute.map((stop, i) => (
              <div key={stop.name} className="flex gap-4 border-b border-[#1A1A1A]/5 pb-4">
                <span className="text-xs w-5 flex-shrink-0 mt-0.5" style={{ color: '#C4832A' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[#1A1A1A] text-sm font-medium mb-0.5">{stop.name}</h3>
                  <p className="text-[#1A1A1A]/50 text-sm">{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CommentThread slug="activities/horseback" />
      </div>
    </div>
  )
}

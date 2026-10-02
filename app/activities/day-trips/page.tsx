import Image from 'next/image'
import type { Metadata } from 'next'
import images from '@/data/images.json'
import CommentThread from '@/components/CommentThread'
import PanoramaViewer from '@/components/PanoramaViewer'

export const metadata: Metadata = {
  title: 'Day Trips — Albania Riviera',
  description: 'Blue Eye, Butrint UNESCO, Gjirokaster, Lekursi Castle. Full and half-day excursions from Saranda.',
}

const dayTrips = [
  {
    name: 'Blue Eye (Syri i Kaltër)',
    accent: '#2D6A4F',
    imageKey: 'blue-eye',
    facts: [
      'Karst spring 22km from Saranda',
      '18,400 litres per second surface from 50m+ deep',
      'Platform viewing only — no swimming',
      'Entry 50 lek (about €0.50)',
      'Parking 300 lek up to 3 hours',
    ],
    description: 'The water is blue and very cold. The depth is unknown beyond 50 metres. You look at it from a wooden platform. It is worth the trip.',
    tourOptions: ['Air-conditioned van from Saranda', 'E-bike countryside tour', 'Kayak and nature escape', 'Panoramic train ride (avoids the uphill walk)'],
    operatorUrl: 'https://sarandatours.com',
  },
  {
    name: 'Butrint',
    accent: '#2D6A4F',
    imageKey: 'butrint',
    facts: [
      'UNESCO World Heritage Site',
      'Greek amphitheaters, Roman ruins, Byzantine basilicas, Venetian fortresses',
      'All inside a forested lagoon',
      'South of Saranda near the Greek border',
    ],
    description: "One of the densest layers of Mediterranean history in a single site. It is small enough to walk in an afternoon but worth taking the time to read what you are looking at.",
    operatorUrl: 'https://sarandatours.com',
  },
  {
    name: 'Gjirokaster',
    accent: '#2D6A4F',
    imageKey: 'gjirokaster',
    facts: [
      'UNESCO World Heritage Site',
      'Known as the City of Stone',
      'Ottoman-era tower houses throughout',
      'Skenduli House — best preserved example',
      'Gjirokaster Castle at the top of the hill',
      'Cold War Tunnel under the castle',
    ],
    description: 'Steep cobblestone streets. You will feel it in your knees. The castle is massive. The Cold War Tunnel is eerie and worth the extra ticket. Full day from Saranda.',
    operatorUrl: 'https://sarandatours.com',
  },
  {
    name: 'Lekursi Castle Sunset',
    accent: '#2D6A4F',
    imageKey: 'riviera',
    facts: [
      'Hilltop fortress directly above Saranda',
      '180-degree views: Ionian Sea, Saranda Bay, Butrint Lake, Corfu',
      'Restaurant on site',
      'Book a dinner table for sunset if possible',
    ],
    description: 'The view of Corfu from here at sunset is one of the best on the Riviera. Many full-day tours end here. Restaurant tables at sunset fill up fast.',
  },
]

export default function DayTripsPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={images.riviera} alt="Day trips Albania" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/20 to-[#1A1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <span className="text-xs uppercase tracking-widest block mb-3" style={{ color: '#2D6A4F' }}>Day Trips</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#F8F5F0]">Beyond the Coast</h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-12 max-w-5xl mx-auto space-y-16">
        {dayTrips.map((trip, idx) => (
          <div key={trip.name}>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <span className="text-xs uppercase tracking-widest block mb-3" style={{ color: trip.accent }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#F8F5F0] mb-4">
                  {trip.name}
                </h2>
                <p className="text-[#F8F5F0]/70 text-sm leading-relaxed mb-6">{trip.description}</p>
                <ul className="space-y-1 mb-4">
                  {trip.facts.map((f) => (
                    <li key={f} className="text-xs text-[#F8F5F0]/50 flex gap-2">
                      <span style={{ color: trip.accent }}>—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {trip.tourOptions && (
                  <div>
                    <p className="text-xs text-[#F8F5F0]/40 uppercase tracking-widest mb-2">Tour options</p>
                    <ul className="space-y-1">
                      {trip.tourOptions.map((o) => (
                        <li key={o} className="text-sm text-[#F8F5F0]/60 flex gap-2">
                          <span style={{ color: trip.accent }}>•</span>{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {trip.operatorUrl && (
                  <a href={trip.operatorUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-6 border border-[#2D6A4F] text-[#2D6A4F] px-4 py-2 text-sm hover:bg-[#2D6A4F] hover:text-[#F8F5F0] transition-colors min-h-[44px]"
                    data-cursor="hover">
                    Book via Saranda Tours ↗
                  </a>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={images[trip.imageKey as keyof typeof images] || images.riviera}
                  alt={trip.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Panorama on Blue Eye */}
            {trip.name === 'Blue Eye (Syri i Kaltër)' && (
              <div className="mt-8">
                <p className="text-xs text-[#F8F5F0]/40 uppercase tracking-widest mb-2">360 View</p>
                <PanoramaViewer imageUrl={images['blue-eye']} fallbackUrl={images['blue-eye']} label="Blue Eye (Syri i Kaltër)" />
              </div>
            )}
          </div>
        ))}

        <CommentThread slug="activities/day-trips" />
      </div>
    </div>
  )
}

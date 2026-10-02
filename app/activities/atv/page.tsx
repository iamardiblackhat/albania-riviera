import Image from 'next/image'
import type { Metadata } from 'next'
import images from '@/data/images.json'
import { activities } from '@/data/activities'
import CommentThread from '@/components/CommentThread'

export const metadata: Metadata = {
  title: 'ATV & Quad Tours — Albania Riviera',
  description: 'Off-road ATV tours from Mesopotam through Byzantine trails to the Blue Eye. Real operators, real routes.',
}

const atvTours = activities.filter((a) => a.category === 'atv')

const tourImages = ['atv', 'mountains', 'lakes', 'blue-eye', 'coast'] as const

const waypoints = [
  { name: 'Mesopotam Village', note: 'Start. Safety briefing at Monastery of Saint Nicholas, 13th century.' },
  { name: 'Bistrica River', note: 'Ancient Byzantine trading route along the bank.' },
  { name: "Justinian's Bridge", note: 'Roman and Byzantine stone bridge. Hidden in the landscape.' },
  { name: 'Mountain Passes', note: '4x4 mode on. Steep rocky ascent. Cliffside caves off the main path.' },
  { name: 'Muzine Viewpoint', note: 'Best panoramic photography on the route.' },
  { name: 'Blue Eye (Syri i Kaltër)', note: 'Karst spring. 50m+ deep. 18,400 litres per second. Entry 50 lek.' },
  { name: 'Brailat Forest', note: 'Dense forest. River crossings. You will get wet.' },
  { name: 'Monastery of Saint Mary, Kostar', note: 'Final stop. Peaceful. Steep ascent to get here.' },
]

export default function ATVPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={images.atv} alt="ATV tours Albania" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/30 to-[#1A1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5A2B] block mb-3">ATV & Quad</span>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#F8F5F0]">
            Off-Road Tours
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
        {/* Requirements */}
        <div className="border border-[#8B5A2B]/30 p-4 md:p-6 mb-12">
          <h2 className="text-[#8B5A2B] text-sm uppercase tracking-widest mb-3">Requirements</h2>
          <ul className="space-y-1">
            <li className="text-[#1A1A1A]/70 text-sm">Drivers must be 18 or older with a valid driving license</li>
            <li className="text-[#1A1A1A]/70 text-sm">Passengers can be from age 8 when accompanied by an adult</li>
            <li className="text-[#1A1A1A]/70 text-sm">450cc single or double-rider ATVs, or 700cc for experienced riders</li>
          </ul>
        </div>

        {/* Full bleed */}
        <div className="relative h-[38vh] -mx-4 md:-mx-8 mb-12 overflow-hidden">
          <Image src={images.mountains} alt="Albanian mountains" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#1A1A1A]/45" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-3xl text-[#F8F5F0] text-center max-w-2xl leading-snug">
              You start on tarmac. By midday you are fording the Bistrica.
            </p>
          </div>
        </div>

        {/* Tour cards */}
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#1A1A1A] mb-6">Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {atvTours.map((tour, i) => (
            <div
              key={tour.id}
              className="border border-[#1A1A1A]/10 bg-[#FFFFFF] overflow-hidden hover:border-[#8B5A2B]/50 transition-colors"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={images[tourImages[i % tourImages.length]]}
                  alt={tour.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs text-[#8B5A2B] uppercase tracking-widest block mb-1">{tour.operator}</span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#1A1A1A]">{tour.name}</h3>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 capitalize flex-shrink-0 ${
                      tour.difficulty === 'easy'
                        ? 'text-emerald-700 bg-emerald-700/10'
                        : tour.difficulty === 'moderate'
                          ? 'text-amber-700 bg-amber-700/10'
                          : 'text-red-700 bg-red-700/10'
                    }`}
                  >
                    {tour.difficulty}
                  </span>
                </div>
                <p className="text-[#1A1A1A]/60 text-sm mb-3">{tour.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-[#1A1A1A]/45">
                  {tour.distanceKm && <span>{tour.distanceKm}km</span>}
                  <span>{tour.duration}</span>
                  {tour.priceFrom && <span>From {tour.priceFrom}</span>}
                </div>
                {tour.amenities && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tour.amenities.map((a) => (
                      <span key={a} className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/55 px-2 py-0.5">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Route imagery */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-10 -mx-4 md:-mx-8">
          <div className="relative h-48 md:h-72 overflow-hidden">
            <Image src={images.lakes} alt="Bistrica Lake on the ATV route" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="relative h-48 md:h-72 overflow-hidden">
            <Image src={images['blue-eye']} alt="Blue Eye spring" fill className="object-cover" sizes="50vw" />
          </div>
        </div>

        {/* Byzantine Route Timeline */}
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[#1A1A1A] mb-2">
          The Byzantine Route
        </h2>
        <p className="text-[#1A1A1A]/50 text-sm mb-8">
          The main off-road itinerary. Starts in Mesopotam, ends back at Bistrica River. Full day.
        </p>

        {/* Mobile: vertical timeline */}
        <div className="relative pl-6 md:pl-0">
          <div className="absolute left-0 md:hidden top-2 bottom-2 w-px bg-[#8B5A2B]/30" />
          <div className="space-y-6">
            {waypoints.map((wp, i) => (
              <div key={wp.name} className="relative flex gap-4 md:gap-8">
                <div className="md:w-6 flex-shrink-0 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#8B5A2B] flex-shrink-0 md:mt-1 -ml-1.5 md:ml-0" />
                </div>
                <div className="pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs text-[#8B5A2B]">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[#1A1A1A] font-medium">{wp.name}</h3>
                  </div>
                  <p className="text-[#1A1A1A]/50 text-sm">{wp.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CommentThread slug="activities/atv" />
      </div>
    </div>
  )
}

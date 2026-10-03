import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import images from '@/data/images.json'

export const metadata: Metadata = {
  title: 'Activities — Albania Riviera',
  description: 'ATV tours, boat trips, horseback riding, and day trips on the Albanian Riviera.',
}

const categories = [
  { label: 'ATV & Quad Tours', href: '/activities/atv', imageKey: 'atv', accent: '#8B5A2B', description: 'Off-road routes from Mesopotam through Byzantine trails to the Blue Eye. Guided, gear included.' },
  { label: 'Boat Tours', href: '/activities/boats', imageKey: 'boats', accent: '#1B4F72', description: 'Northern route: Turtle Cave, Kakome, Krorez Beach. Southern route: Pigeon Cave, Ksamil Islands.' },
  { label: 'Horseback Riding', href: '/activities/horseback', imageKey: 'horseback', accent: '#C4832A', description: 'Antigone village near Gjirokaster, farm rides on Kardhiq-Delvine road, Vjosa National Park.' },
  { label: 'Day Trips', href: '/activities/day-trips', imageKey: 'blue-eye', accent: '#2D6A4F', description: 'Blue Eye (50 lek entry), Butrint UNESCO, Gjirokaster, Lekursi Castle at sunset.' },
]

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <div className="pt-24 pb-8 px-4 md:px-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[#1A1A1A]">Activities</h1>
        <p className="mt-3 text-[#1A1A1A]/50 max-w-lg">Everything to do on the Riviera. Pick a category.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative block aspect-[3/4] overflow-hidden"
            data-cursor="hover"
          >
            <Image
              src={images[cat.imageKey as keyof typeof images] || images.hero}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={i < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: cat.accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-base md:text-xl text-[#F8F5F0] mb-2">{cat.label}</h2>
              <p className="text-[#F8F5F0]/70 text-xs max-w-[200px]">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

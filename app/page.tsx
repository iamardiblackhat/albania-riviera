import PhotoWall from '@/components/PhotoWall'
import { weddingData } from '@/data/wedding'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/hero.jpg"
            alt="Albanian Riviera"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white mb-6">
            Albania Riviera
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light">
            Discover the untouched beauty of the Mediterranean
          </p>
        </div>
      </section>

      {/* Photo Wall */}
      <PhotoWall />

      {/* Wedding Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">Wedding</h2>
            <p className="mt-3 text-lg text-gray-600">Join us in celebration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Photo tile matching site style */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl group">
              <img
                src="/img/riviera.jpg"
                alt="Sarandë coastline"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Right: Details card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#F9F5F0] to-[#D4E8E4] rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif text-[#2D5F57]">Erda & Faton</h3>
                <div className="w-16 h-px bg-[#2D5F57]/40 my-4" />
                <p className="text-gray-700 leading-relaxed">
                  October 3, 2026<br />
                  Sarandë, Albania
                </p>
                <a
                  href="/wedding"
                  className="inline-block mt-6 px-6 py-3 bg-[#2D5F57] text-white rounded-lg hover:bg-[#2D5F57]/90 transition-colors font-medium"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2026 Albania Riviera. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

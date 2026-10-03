'use client'

import { weddingData } from '@/data/wedding'

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero - Distinct from homepage */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9F5F0] via-[#E8F4F2] to-[#D4E8E4]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-[#2D5F57]" />
          <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full border border-[#2D5F57]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-8">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto opacity-60">
              <path d="M10 30 Q30 10 50 30" fill="none" stroke="#2D5F57" strokeWidth="2"/>
              <circle cx="30" cy="20" r="2" fill="#2D5F57"/>
            </svg>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-serif text-[#2D5F57] mb-4">
            Erda <span className="italic font-light">&</span> Faton
          </h1>
          
          <div className="w-24 h-px bg-[#2D5F57]/40 mx-auto my-8" />
          
          <p className="text-xl sm:text-2xl text-gray-700 font-light tracking-wide">
            October 3, 2026
          </p>
          <p className="text-lg text-gray-600 mt-2">Sarandë, Albania</p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">Celebration Details</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {weddingData.details.map((detail, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-4">{detail.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{detail.title}</h3>
                <p className="text-gray-600">{detail.time}</p>
                <p className="text-gray-500 text-sm mt-1">{detail.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F9F5F0] to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-8">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {weddingData.story}
          </p>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">Moments</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weddingData.photos.map((photo, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#2D5F57] to-[#3A7A6E]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-6">
            Can't Wait to Celebrate With You
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Your presence is the greatest gift. For any questions, reach out anytime.
          </p>
          <a
            href="mailto:example@email.com"
            className="inline-block px-8 py-4 bg-white text-[#2D5F57] rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  )
}

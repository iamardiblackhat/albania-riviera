'use client'

// Simple photo wall — paste a Google Photos shared album link
// to show photos from the wedding. No backend, no keys, no uploads.
// Alternatively upgrade later with Supabase storage.

const ALBUM_URL = '' // paste your Google Photos shared album URL here

export default function PhotoWall() {
  return (
    <section className="mt-16 border-t border-[#F8F5F0]/10 pt-8">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#F8F5F0] mb-4">
        Wedding Photos
      </h2>

      {ALBUM_URL ? (
        <a
          href={ALBUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-[#2A7F8A] text-[#2A7F8A] px-6 py-4 text-sm hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors min-h-[44px]"
          data-cursor="hover"
        >
          <span>📷</span>
          <span>View the wedding photo album</span>
          <span>↗</span>
        </a>
      ) : (
        <div className="border border-dashed border-[#F8F5F0]/20 p-8 text-center">
          <p className="text-[#F8F5F0]/40 text-sm mb-2">
            Create a shared Google Photos album during the wedding.
          </p>
          <p className="text-[#F8F5F0]/30 text-xs">
            Then paste the link into <code className="text-[#2A7F8A]">components/PhotoWall.tsx</code>
          </p>
        </div>
      )}
    </section>
  )
}

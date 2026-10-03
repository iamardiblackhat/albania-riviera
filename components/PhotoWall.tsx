'use client'

/**
 * Photo wall. If an album URL is supplied we link out to a shared album
 * (Google Photos / iCloud / Dropbox). Otherwise we invite guests to add one.
 * No accounts, no API keys, no uploads handled by this app.
 */

interface PhotoWallProps {
  albumUrl?: string
}

export default function PhotoWall({ albumUrl = '' }: PhotoWallProps) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-2">Photos</h2>
      <p className="text-sm text-[#1A1A1A]/55 mb-6 max-w-prose">
        Everyone has photos. The best ones will be taken by you, not by us.
      </p>

      {albumUrl ? (
        <a
          href={albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-[#2A7F8A] text-[#2A7F8A] px-6 py-3 text-sm hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors min-h-[44px]"
        >
          Open the photo album
          <span aria-hidden>&rarr;</span>
        </a>
      ) : (
        <div className="border border-dashed border-[#1A1A1A]/20 p-6 max-w-prose">
          <p className="text-sm text-[#1A1A1A]/70 mb-3">
            Make a shared album during the wedding and everyone can add to it. Google Photos, iCloud
            and Dropbox all work.
          </p>
          <p className="text-xs text-[#1A1A1A]/45">
            Paste the link into <code className="text-[#2A7F8A]">data/wedding.ts</code> as{' '}
            <code className="text-[#2A7F8A]">photoAlbumUrl</code>.
          </p>
        </div>
      )}
    </div>
  )
}

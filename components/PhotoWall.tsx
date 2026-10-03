'use client'

import { useRef, useState } from 'react'

/**
 * Direct photo sharing with no backend: guests pick photos and the
 * device share sheet sends them straight to the group chat / album.
 * Falls back to a WhatsApp hint on desktop.
 */
export default function PhotoWall() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState('')

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (images.length === 0) return

    setStatus(`Sharing ${images.length} photo${images.length > 1 ? 's' : ''}...`)
    try {
      if (navigator.canShare && navigator.canShare({ files: images })) {
        await navigator.share({ files: images, title: 'Wedding photos' })
        setStatus('Thanks!')
      } else {
        setStatus('Your phone cannot share files directly. Send them in the group WhatsApp instead.')
      }
    } catch {
      setStatus('')
    }
  }

  return (
    <div>
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-2">Photos</h2>
      <p className="text-sm text-[#1A1A1A]/55 mb-6 max-w-prose">
        The best shots will be taken by you. Pick your favourites and send them straight to the group
        WhatsApp — no upload, no account.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-3 border border-[#2A7F8A] text-[#2A7F8A] px-6 py-3 text-sm hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors min-h-[44px]"
      >
        Share your wedding photos
      </button>
      {status && <p className="mt-3 text-sm text-[#1A1A1A]/60">{status}</p>}
    </div>
  )
}

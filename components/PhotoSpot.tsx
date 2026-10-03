'use client'

import Image from 'next/image'

/**
 * A single place, shown well. Full bleed on mobile, framed on desktop.
 */
interface PhotoSpotProps {
  src: string
  alt: string
  caption?: string
  /** Height as a CSS value. */
  height?: string
}

export default function PhotoSpot({ src, alt, caption, height = 'h-[46vh] md:h-[58vh]' }: PhotoSpotProps) {
  return (
    <figure className="my-8 md:my-12">
      <div className={`relative w-full overflow-hidden ${height}`}>
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1024px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[#1A1A1A]/45">{caption}</figcaption>
      )}
    </figure>
  )
}

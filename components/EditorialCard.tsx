'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface EditorialCardProps {
  imageUrl: string
  imageAlt: string
  category: string
  title: string
  description: string
  href: string
  accent?: string
}

export default function EditorialCard({
  imageUrl,
  imageAlt,
  category,
  title,
  description,
  href,
  accent = '#2A7F8A',
}: EditorialCardProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const handleTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setTimeout(() => setRipple(null), 600)
  }

  return (
    <Link
      href={href}
      onClick={handleTap}
      className="group relative block overflow-hidden bg-[#1A1A1A]"
      data-cursor="hover"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <span
          className="text-xs font-medium uppercase tracking-widest mb-2 block"
          style={{ color: accent }}
        >
          {category}
        </span>
        <h3 className="font-playfair text-xl md:text-2xl text-[#F8F5F0] mb-2 leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[#F8F5F0]/60 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Ripple effect on tap */}
      {ripple && (
        <span
          className="absolute pointer-events-none rounded-full animate-ping bg-white/20"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
            width: 80,
            height: 80,
          }}
        />
      )}
    </Link>
  )
}

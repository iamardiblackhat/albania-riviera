'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import confetti from 'canvas-confetti'
import { useLanguage } from '@/context/LanguageContext'

interface Photo {
  name: string
  url: string
  created_at?: string
}

export default function PhotoWall() {
  const { t } = useLanguage()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [verified, setVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('wedding-password-verified') === 'true') setVerified(true)
  }, [])

  const loadPhotos = useCallback(async () => {
    const { data } = await supabase.storage.from('wedding-photos').list('uploads', {
      sortBy: { column: 'created_at', order: 'desc' },
    })
    if (data) {
      const urls = data.map((f) => ({
        name: f.name,
        url: supabase.storage.from('wedding-photos').getPublicUrl(`uploads/${f.name}`).data.publicUrl,
        created_at: f.created_at ?? undefined,
      }))
      setPhotos(urls)
    }
  }, [])

  useEffect(() => {
    loadPhotos()
    // Realtime via polling every 30s as storage doesn't have realtime
    const interval = setInterval(loadPhotos, 30000)
    return () => clearInterval(interval)
  }, [loadPhotos])

  const verifyPassword = async () => {
    setPasswordError('')
    const res = await fetch('/api/upload-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.status === 401) {
      setPasswordError(t.wrongPassword)
    } else {
      sessionStorage.setItem('wedding-password-verified', 'true')
      setVerified(true)
    }
  }

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Images only please.')
      return
    }
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
    setUploadError('')
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setUploadProgress(0)
    setUploadError('')

    try {
      const res = await fetch('/api/upload-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password || 'erdafaton2026' }),
      })

      if (!res.ok) {
        setUploadError(t.wrongPassword)
        setUploading(false)
        return
      }

      const { path } = await res.json()

      setUploadProgress(30)
      const { error } = await supabase.storage
        .from('wedding-photos')
        .upload(path, selectedFile, { cacheControl: '3600', upsert: false })

      setUploadProgress(90)

      if (error) {
        setUploadError('Upload failed. Try again.')
      } else {
        setUploadProgress(100)
        confetti({ particleCount: 120, spread: 80, colors: ['#FFD700', '#FFFFFF', '#2A7F8A'] })
        setPreview(null)
        setSelectedFile(null)
        await loadPhotos()
      }
    } catch {
      setUploadError('Upload failed. Try again.')
    }

    setUploading(false)
    setUploadProgress(0)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((p) => (p !== null ? Math.min(p + 1, photos.length - 1) : null))
      if (e.key === 'ArrowLeft') setLightbox((p) => (p !== null ? Math.max(p - 1, 0) : null))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, photos.length])

  return (
    <section className="mt-16">
      <h2 className="font-playfair text-2xl text-[#F8F5F0] mb-6">Photo Wall</h2>

      {/* Upload area */}
      {!verified ? (
        <div className="space-y-3 mb-8">
          <p className="text-[#F8F5F0]/60 text-sm">{t.enterPassword} to upload photos</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
              placeholder="••••••••••••"
              className="flex-1 bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 text-[#F8F5F0] px-3 py-2 text-sm min-h-[44px] focus:outline-none focus:border-[#2A7F8A]"
            />
            <button onClick={verifyPassword} className="bg-[#2A7F8A] text-[#F8F5F0] px-4 py-2 text-sm min-h-[44px]">OK</button>
          </div>
          {passwordError && <p className="text-red-400 text-xs">{passwordError}</p>}
        </div>
      ) : (
        <div className="mb-8">
          {/* Mobile: simple button */}
          <div className="md:hidden">
            <label className="block w-full text-center border border-[#2A7F8A] text-[#2A7F8A] py-3 text-sm cursor-pointer min-h-[44px] flex items-center justify-center">
              {t.uploadPhoto}
              <input type="file" accept="image/*" capture="environment" className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />
            </label>
          </div>

          {/* Desktop: drag and drop */}
          <div
            className={`hidden md:flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer transition-colors ${dragOver ? 'border-[#2A7F8A] bg-[#2A7F8A]/5' : 'border-[#F8F5F0]/20'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); e.dataTransfer.files[0] && handleFileSelect(e.dataTransfer.files[0]) }}
            onClick={() => document.getElementById('file-input-desktop')?.click()}
          >
            <p className="text-[#F8F5F0]/40 text-sm">Drag a photo here or click to browse</p>
            <input id="file-input-desktop" type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4 space-y-3">
              <div className="relative w-32 h-32">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleUpload} disabled={uploading}
                  className="bg-[#2A7F8A] text-[#F8F5F0] px-4 py-2 text-sm min-h-[44px] disabled:opacity-50">
                  {uploading ? `Uploading ${uploadProgress}%` : 'Upload'}
                </button>
                <button onClick={() => { setPreview(null); setSelectedFile(null) }}
                  className="text-[#F8F5F0]/40 text-sm px-4 py-2 min-h-[44px]">Cancel</button>
              </div>
              {uploading && (
                <div className="w-full bg-[#F8F5F0]/10 h-1">
                  <motion.div className="h-1 bg-[#2A7F8A]" animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                </div>
              )}
            </div>
          )}
          {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
        </div>
      )}

      {/* Photo grid */}
      {photos.length === 0 && (
        <p className="text-[#F8F5F0]/40 text-sm">No photos yet. Upload the first one.</p>
      )}

      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        <AnimatePresence>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22, delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F5F0]/5">
                <Image
                  src={photo.url}
                  alt={`Wedding photo ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl max-h-[85vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox].url}
                alt={`Wedding photo ${lightbox + 1}`}
                width={800}
                height={600}
                className="object-contain max-h-[85vh] w-full"
              />
              <button onClick={() => setLightbox(null)} className="absolute top-2 right-2 text-white/60 text-2xl p-2 min-w-[44px] min-h-[44px]">×</button>
              {lightbox > 0 && (
                <button onClick={() => setLightbox(lightbox - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 text-2xl p-2 min-w-[44px] min-h-[44px]">‹</button>
              )}
              {lightbox < photos.length - 1 && (
                <button onClick={() => setLightbox(lightbox + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-2xl p-2 min-w-[44px] min-h-[44px]">›</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

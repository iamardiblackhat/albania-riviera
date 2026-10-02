'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Comment } from '@/data/types'
import { useLanguage } from '@/context/LanguageContext'

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function CommentThread({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [showForm, setShowForm] = useState(false)
  const [verified, setVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('wedding-password-verified')
    if (stored === 'true') setVerified(true)
  }, [])

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      if (res.ok) {
        const data = await res.json()
        setComments(data)
      }
      setLoading(false)
    }
    load()

    // Realtime subscription
    const channel = supabase
      .channel(`comments-${slug}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `page_slug=eq.${slug}` },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [slug])

  const verifyPassword = async () => {
    setPasswordError('')
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: '__verify__', author_name: '__verify__', body: '__verify__', password }),
    })
    if (res.status === 401) {
      setPasswordError(t.wrongPassword)
    } else {
      sessionStorage.setItem('wedding-password-verified', 'true')
      setVerified(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    setSubmitting(true)
    const pass = password || sessionStorage.getItem('wedding-password-stored') || 'erdafaton2026'
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, author_name: name.trim(), body: body.trim(), password: pass }),
    })
    setName('')
    setBody('')
    setShowForm(false)
    setSubmitting(false)
  }

  return (
    <section className="mt-16 border-t border-[#F8F5F0]/10 pt-8">
      <h2 className="font-playfair text-2xl text-[#F8F5F0] mb-6">Tips from the group</h2>

      {loading && <p className="text-[#F8F5F0]/40 text-sm">Loading...</p>}

      {!loading && comments.length === 0 && (
        <p className="text-[#F8F5F0]/40 text-sm mb-6">No tips yet. Be the first.</p>
      )}

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#F8F5F0]/5 p-4 border-l-2 border-[#2A7F8A]"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#F8F5F0] text-sm font-semibold">{c.author_name}</span>
                <span className="text-[#F8F5F0]/40 text-xs">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-[#F8F5F0]/80 text-sm leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Password gate */}
      {!verified && (
        <div className="space-y-3">
          <p className="text-[#F8F5F0]/60 text-sm">{t.enterPassword}</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
              placeholder="••••••••••••"
              className="flex-1 bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 text-[#F8F5F0] px-3 py-2 text-sm min-h-[44px] focus:outline-none focus:border-[#2A7F8A]"
            />
            <button
              onClick={verifyPassword}
              className="bg-[#2A7F8A] text-[#F8F5F0] px-4 py-2 text-sm min-h-[44px] min-w-[44px]"
            >
              OK
            </button>
          </div>
          {passwordError && <p className="text-red-400 text-xs">{passwordError}</p>}
        </div>
      )}

      {/* Leave a tip button */}
      {verified && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="border border-[#2A7F8A] text-[#2A7F8A] px-4 py-2 text-sm min-h-[44px] hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors"
          data-cursor="hover"
        >
          {t.leaveTip}
        </button>
      )}

      {/* Comment form */}
      <AnimatePresence>
        {verified && showForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 50))}
              placeholder={t.yourName}
              required
              className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 text-[#F8F5F0] px-3 py-2 text-sm min-h-[44px] focus:outline-none focus:border-[#2A7F8A] placeholder:text-[#F8F5F0]/30"
            />
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, 280))}
                placeholder={t.yourTip}
                required
                rows={3}
                className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 text-[#F8F5F0] px-3 py-2 text-sm focus:outline-none focus:border-[#2A7F8A] placeholder:text-[#F8F5F0]/30 resize-none"
              />
              <span className="absolute bottom-2 right-2 text-xs text-[#F8F5F0]/30">{280 - body.length}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#2A7F8A] text-[#F8F5F0] px-4 py-2 text-sm min-h-[44px] disabled:opacity-50"
              >
                {submitting ? '...' : t.submit}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-[#F8F5F0]/40 text-sm px-4 py-2 min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <div ref={bottomRef} />
    </section>
  )
}

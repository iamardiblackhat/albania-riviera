'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  author: string
  body: string
  ts: number
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function CommentThread({ slug }: { slug: string }) {
  const key = `albania-comments-${slug}`
  const [comments, setComments] = useState<Comment[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) setComments(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [key])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    const next = [...comments, { id: Date.now().toString(), author: name.trim(), body: body.trim(), ts: Date.now() }]
    setComments(next)
    localStorage.setItem(key, JSON.stringify(next))
    setName('')
    setBody('')
    setShowForm(false)
  }

  return (
    <section className="mt-16 border-t border-[#1A1A1A]/10 pt-8">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1A1A1A] mb-6">
        Tips from the group
      </h2>

      {comments.length === 0 && !showForm && (
        <p className="text-[#1A1A1A]/40 text-sm mb-6">No tips yet. Be the first.</p>
      )}

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1A1A1A]/5 p-4 border-l-2 border-[#2A7F8A]"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#1A1A1A] text-sm font-semibold">{c.author}</span>
                <span className="text-[#1A1A1A]/40 text-xs">{timeAgo(c.ts)}</span>
              </div>
              <p className="text-[#1A1A1A]/80 text-sm leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="border border-[#2A7F8A] text-[#2A7F8A] px-4 py-2 text-sm min-h-[44px] hover:bg-[#2A7F8A] hover:text-[#F8F5F0] transition-colors"
        >
          Leave a tip
        </button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="space-y-3"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 50))}
              placeholder="Your name"
              required
              className="w-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-[#1A1A1A] px-3 py-2 text-sm min-h-[44px] focus:outline-none focus:border-[#2A7F8A] placeholder:text-[#1A1A1A]/30"
            />
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, 280))}
                placeholder="Your tip..."
                required
                rows={3}
                className="w-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-[#1A1A1A] px-3 py-2 text-sm focus:outline-none focus:border-[#2A7F8A] placeholder:text-[#1A1A1A]/30 resize-none"
              />
              <span className="absolute bottom-2 right-2 text-xs text-[#1A1A1A]/30">{280 - body.length}</span>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-[#2A7F8A] text-[#F8F5F0] px-4 py-2 text-sm min-h-[44px]">
                Submit
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-[#1A1A1A]/40 text-sm px-4 py-2 min-h-[44px]">
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}

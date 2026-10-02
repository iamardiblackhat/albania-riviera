import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const expected = process.env.WEDDING_UPLOAD_PASSWORD || 'erdafaton2026'
  if (password !== expected) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`

  // Return the path — client will upload directly via Supabase SDK
  return NextResponse.json({ path, ok: true })
}

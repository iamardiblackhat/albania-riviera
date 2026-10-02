import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json([], { status: 200 })

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('page_slug', slug)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json([], { status: 200 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { slug, author_name, body: text, password } = body

  const expected = process.env.WEDDING_UPLOAD_PASSWORD || 'erdafaton2026'
  if (password !== expected) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  // Verification-only request
  if (slug === '__verify__') {
    return NextResponse.json({ ok: true })
  }

  if (!slug || !author_name || !text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('comments')
    .insert({ page_slug: slug, author_name: author_name.slice(0, 50), body: text.slice(0, 280) })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

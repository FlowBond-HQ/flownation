import { NextResponse } from 'next/server'
import { createAnonClient } from '@/lib/supabase'
import { cities } from '@/lib/cities'

const MAX_NAME = 200

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const supabase = createAnonClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Server not configured. Please try again later.' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, MAX_NAME) : ''
  const citySlug = typeof b.city === 'string' ? b.city.trim().toLowerCase() : ''

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }
  const city = cities[citySlug]
  if (!city) {
    return NextResponse.json({ error: 'Unknown city.' }, { status: 400 })
  }

  const { error } = await supabase.from('flownation_waitlist').insert({
    email,
    name: name || null,
    city: city.name,
    source: 'flownation_site',
  })

  // 23505 = unique violation (already on the list) — treat as success
  if (error && error.code !== '23505') {
    console.error('[flownation waitlist]', error.message, error.code)
    return NextResponse.json(
      { error: 'Could not save your signup. Try again later.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}

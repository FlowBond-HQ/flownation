'use client'

import { useState, type FormEvent } from 'react'

export default function CityWaitlist({ citySlug, cityName }: { citySlug: string; cityName: string }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), city: citySlug }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || data.ok !== true) {
        setError(typeof data.error === 'string' ? data.error : 'Something went wrong. Try again.')
        setStatus('error')
        return
      }
      setStatus('done')
    } catch {
      setError('Network error. Try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 px-6 py-5 text-center">
        <p className="text-lg font-semibold text-stone-900">You&apos;re on the list ✨</p>
        <p className="mt-1 text-sm text-stone-600">
          We&apos;ll let you know the moment {cityName} goes live.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          aria-label="Name"
          className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 sm:w-2/5"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email"
          className="w-full flex-1 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-3 w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? 'Joining…' : 'Notify me'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}

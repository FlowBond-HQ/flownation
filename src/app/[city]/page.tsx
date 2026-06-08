import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { citySlugs, getCity } from '@/lib/cities'
import CityWaitlist from '@/components/CityWaitlist'

export const dynamicParams = false

export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const data = getCity(city)
  if (!data) return {}
  const title = `FlowNation ${data.name} — Coming soon`
  return {
    title,
    description: data.tagline,
    openGraph: { title, description: data.tagline, type: 'website' },
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const data = getCity(city)
  if (!data) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="px-6 py-6">
        <Link href="/" className="text-sm font-medium text-stone-500 transition hover:text-stone-900">
          ← FlowNation
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          {data.region} · Coming soon
        </p>
        <h1 className="mt-6 text-6xl font-bold tracking-tight text-stone-900 sm:text-8xl">
          {data.name}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          {data.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-stone-700">
            Be the first to know when {data.name} goes live.
          </p>
          <CityWaitlist citySlug={data.slug} cityName={data.name} />
        </div>
      </main>

      <footer className="border-t border-stone-100 px-6 py-10 text-center">
        <p className="text-sm text-stone-500">
          Part of the{' '}
          <a
            href="https://flowbond.life"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900"
          >
            FlowBond
          </a>{' '}
          ecosystem ·{' '}
          <Link href="/" className="underline underline-offset-4 hover:text-stone-900">
            all nations
          </Link>
        </p>
      </footer>
    </div>
  )
}

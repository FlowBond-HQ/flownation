const nations = [
  {
    name: 'CDMX',
    region: 'Mexico City',
    blurb: 'Art, culture, and connection in the heart of Mexico City.',
    url: 'https://cdmx.flownation.world',
    status: 'live' as const,
  },
  {
    name: 'Austin',
    region: 'Texas',
    blurb: 'A home for builders, music, and community in the Texas capital.',
    status: 'soon' as const,
  },
  {
    name: 'LA',
    region: 'Los Angeles',
    blurb: 'Creativity and culture on the California coast.',
    status: 'soon' as const,
  },
  {
    name: 'Vallarta',
    region: 'Puerto Vallarta',
    blurb: 'Gathering by the Pacific on Mexico’s western shore.',
    status: 'soon' as const,
  },
  {
    name: 'Tulum',
    region: 'Riviera Maya',
    blurb: 'Nature, ceremony, and connection in the jungle by the sea.',
    status: 'soon' as const,
  },
]

function NationCard({ nation }: { nation: (typeof nations)[number] }) {
  const isLive = nation.status === 'live'

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          {nation.region}
        </span>
        {isLive ? (
          <span className="text-amber-600 text-sm" aria-hidden>
            ↗
          </span>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 border border-stone-200 rounded-full px-2 py-0.5">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="mt-3 text-2xl font-semibold text-stone-900">{nation.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{nation.blurb}</p>
      {isLive && (
        <span className="mt-5 inline-block text-sm font-medium text-stone-900 underline underline-offset-4 decoration-amber-400">
          Enter {nation.name} →
        </span>
      )}
    </>
  )

  const base =
    'block rounded-3xl border p-7 transition-all bg-white text-left'

  return isLive ? (
    <a
      href={nation.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-stone-200 hover:border-amber-400 hover:shadow-md`}
    >
      {inner}
    </a>
  ) : (
    <div className={`${base} border-stone-100 bg-stone-50/60`}>{inner}</div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 pt-28 pb-16 sm:pt-40 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            A FlowBond Network
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight text-stone-900 sm:text-7xl">
            FlowNation
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
            One network. Many cities. Communities for connection, culture, and creation —
            each rooted in its own place. Find your nation.
          </p>
        </section>

        {/* Nations grid */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {nations.map((nation) => (
                <NationCard key={nation.name} nation={nation} />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-stone-400">
              More nations are joining the network.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-100 px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-stone-500">
            FlowNation — part of the{' '}
            <a
              href="https://flowbond.life"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900"
            >
              FlowBond
            </a>{' '}
            ecosystem.
          </p>
          <p className="text-xs text-stone-400">© {new Date().getFullYear()} FlowNation</p>
        </div>
      </footer>
    </div>
  )
}

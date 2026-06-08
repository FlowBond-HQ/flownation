export type City = {
  slug: string
  name: string
  region: string
  /** Short blurb for the landing card */
  blurb: string
  /** Longer hero line for the city page */
  tagline: string
}

/** Cities with a dedicated coming-soon page (route at /<slug>). */
export const cities: Record<string, City> = {
  atx: {
    slug: 'atx',
    name: 'Austin',
    region: 'Texas',
    blurb: 'A home for builders, music, and community in the Texas capital.',
    tagline:
      'Austin is joining the Flow network — a home for builders, music, and conscious community in the heart of Texas.',
  },
  la: {
    slug: 'la',
    name: 'LA',
    region: 'Los Angeles',
    blurb: 'Creativity and culture on the California coast.',
    tagline:
      'Los Angeles is joining the Flow network — where film, music, and creative culture meet on the California coast.',
  },
  tulum: {
    slug: 'tulum',
    name: 'Tulum',
    region: 'Riviera Maya',
    blurb: 'Nature, ceremony, and connection in the jungle by the sea.',
    tagline:
      'Tulum is joining the Flow network — nature, ceremony, and connection in the jungle by the sea.',
  },
}

export const citySlugs = Object.keys(cities)

export function getCity(slug: string): City | undefined {
  return cities[slug]
}

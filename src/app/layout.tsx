import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://flownation.world'),
  title: 'FlowNation — One network. Many cities.',
  description:
    'FlowNation is the network of cities in the FlowBond ecosystem — communities for connection, culture, and creation. Find your nation.',
  openGraph: {
    title: 'FlowNation — One network. Many cities.',
    description:
      'The network of cities in the FlowBond ecosystem. Find your nation: CDMX, Austin, LA, Vallarta, Tulum and beyond.',
    type: 'website',
    url: 'https://flownation.world',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white">{children}</body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

/* ─── Fonts ─────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

/* ─── Metadata ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Infinity AI — Africa\'s AI Browser Companion',
  description:
    'Think smarter. Work faster. Africa-first. Infinity AI gives every African business an AI assistant that works inside your browser — privately, locally, and completely free.',
  keywords: [
    'AI browser', 'Africa AI', 'POPIA compliant', 'Ollama', 'local AI',
    'AI extension', 'browser assistant', 'South Africa AI',
  ],
  authors: [{ name: 'Infinity AI', url: 'https://infinity-ai.africa' }],
  creator: 'Infinity AI',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://infinity-ai.africa',
    siteName: 'Infinity AI',
    title: 'Infinity AI — Africa\'s AI Browser Companion',
    description: 'Think smarter. Work faster. Africa-first.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Infinity AI — Africa\'s AI Browser Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinity AI — Africa\'s AI Browser Companion',
    description: 'Think smarter. Work faster. Africa-first.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#0F1923',
  width: 'device-width',
  initialScale: 1,
}

/* ─── Root Layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

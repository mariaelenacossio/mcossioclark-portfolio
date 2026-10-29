import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ConditionalChrome from '@/app/components/ConditionalChrome'
import '@fontsource-variable/mona-sans'
import './globals.css'

/* Instrument Serif and DM Sans (Milan Reed's display/body faces) used
   to load here. Removed in the light-system cleanup - confirmed by
   grep that nothing references font-display/font-body or their
   --font-display/--font-body CSS variables anymore, since the
   dark-redesign (Mona Sans + Inter below) is the only live system. */

/* Inter Variable for body type, scoped to .dr-root via OpenType feature
   settings (cv01/cv05/cv09/cv11/ss03/ss07/dlig) in globals.css. */
const interDr = Inter({
  subsets: ['latin'],
  variable: '--font-dr-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mariaelena-cossioclark.com'),
  title: 'Mariaelena Cossio Clark — UX/UI Designer & Frontend Engineer',
  description:
    'I design things and then build them. UX/UI Designer and Frontend Engineer based in Vancouver.',
  openGraph: {
    title: 'Mariaelena Cossio Clark',
    description: 'UX/UI Designer and Frontend Engineer based in Vancouver.',
    url: 'https://www.mariaelena-cossioclark.com',
    siteName: 'Mariaelena Cossio Clark',
    locale: 'en_CA',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

/**
 * Root layout.
 *
 * Chrome (dark header/footer) renders through <ConditionalChrome>,
 * which suppresses it on /mockups/* routes. No custom cursor anywhere.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={interDr.variable}>
      <body className="relative min-h-dvh">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import ConditionalChrome from '@/app/components/ConditionalChrome'
import './globals.css'

/* DM Serif Display for all headlines. One weight, normal + italic. */
const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  display: 'swap',
})

/* DM Sans for body text, labels, UI. */
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
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
 * Chrome (Navbar, Footer) renders through <ConditionalChrome>, which
 * suppresses it on /mockups/* routes. No custom cursor anywhere.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="relative min-h-dvh">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  )
}

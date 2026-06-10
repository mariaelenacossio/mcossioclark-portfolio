import type { Metadata } from 'next'
import ConditionalChrome from '@/app/components/ConditionalChrome'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mariaelena-cossioclark.com'),
  title: 'Mariaelena Cossio Clark — UX/UI Designer & Frontend Engineer',
  description:
    'UX/UI Designer and Frontend Engineer based in Vancouver. Research-driven design, shipped in code.',
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
 * The portfolio chrome (NoiseOverlay, Navbar, Footer, CustomCursor) is
 * rendered through <ConditionalChrome>, which suppresses all of it on
 * `/mockups/*` routes so those internal screenshot-only screens render
 * as bare product UIs.
 *
 * Skip-to-content link is always present at the top of <body> for
 * keyboard users.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-dvh">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  )
}

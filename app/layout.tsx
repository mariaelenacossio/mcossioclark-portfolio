import type { Metadata } from 'next'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CustomCursor from '@/app/components/ui/CustomCursor'
import NoiseOverlay from '@/app/components/ui/NoiseOverlay'
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
 * Renders, in z-order from back to front:
 *   1. NoiseOverlay   — fixed full-page SVG noise (z=1, no JS)
 *   2. Page content   — Navbar + children + Footer (z=2+)
 *   3. CustomCursor   — fixed overlay (z=1000, desktop only)
 *
 * Skip-to-content link sits at the very top of <body> for keyboard users.
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

        <NoiseOverlay />

        <div className="relative z-[2] flex min-h-dvh flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>

        <CustomCursor />
      </body>
    </html>
  )
}

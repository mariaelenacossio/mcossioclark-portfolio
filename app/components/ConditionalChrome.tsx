'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Assistant from '@/app/components/Assistant'

/**
 * Renders the portfolio chrome (Navbar, Footer) on every route EXCEPT
 * `/mockups/*`. The mockup routes are internal screenshot-only pages.
 * They should render clean product UIs with no portfolio decorations.
 *
 * `/` is also exempt from Navbar/Footer during the dark-redesign: the new
 * homepage is self-contained (its own header/footer, dr- tokens) so it
 * isn't sandwiched between the old light-system chrome. Assistant still
 * mounts on `/` - the homepage's teaser tile opens the same panel.
 *
 * No custom cursor. Browser default cursor everywhere.
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMockup = pathname?.startsWith('/mockups') ?? false
  const isDarkHomepage = pathname === '/'

  if (isMockup) {
    return <>{children}</>
  }

  if (isDarkHomepage) {
    return (
      <>
        {children}
        <Assistant />
      </>
    )
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Assistant />
    </>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

/**
 * Renders the portfolio chrome (Navbar, Footer) on every route EXCEPT
 * `/mockups/*`. The mockup routes are internal screenshot-only pages.
 * They should render clean product UIs with no portfolio decorations.
 *
 * No custom cursor. Browser default cursor everywhere.
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMockup = pathname?.startsWith('/mockups') ?? false

  if (isMockup) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

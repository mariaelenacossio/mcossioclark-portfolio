'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CustomCursor from '@/app/components/ui/CustomCursor'

/**
 * Renders the portfolio chrome (Navbar, Footer, CustomCursor) on every
 * route EXCEPT `/mockups/*`. The mockup routes are internal
 * screenshot-only pages — they should render clean product UIs with no
 * portfolio decorations.
 *
 * Noise texture is applied via body::after in globals.css globally;
 * it sits above content with z-9999 and is intentionally subtle, so
 * it doesn't interfere with the mockup screens.
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
      <CustomCursor />
    </>
  )
}

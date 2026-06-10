'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CustomCursor from '@/app/components/ui/CustomCursor'
import NoiseOverlay from '@/app/components/ui/NoiseOverlay'

/**
 * Renders the portfolio chrome (noise overlay, navbar, footer, custom
 * cursor) on every route EXCEPT `/mockups/*`.
 *
 * The mockup routes are internal screenshot-only pages — they should
 * render clean product UIs with no portfolio decorations.
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMockup = pathname?.startsWith('/mockups') ?? false

  if (isMockup) {
    // Bare-bones: no navbar, no footer, no cursor, no noise.
    return <>{children}</>
  }

  return (
    <>
      <NoiseOverlay />
      <div className="relative z-[2] flex min-h-dvh flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <CustomCursor />
    </>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Assistant from '@/app/components/Assistant'
import DarkHeader from '@/app/components/dark/DarkHeader'
import DarkFooter from '@/app/components/dark/DarkFooter'

/**
 * Renders chrome for every route. The dark-redesign is the only live
 * system now - the Milan Reed Navbar/Footer/light Assistant are gone
 * (see the light-system cleanup commits). Three cases:
 *
 *  - `/mockups/*` - no chrome at all. Internal screenshot-only product
 *    UIs, not portfolio decoration.
 *  - `/` (homepage) - no header/footer rendered here; app/page.tsx
 *    renders its own DarkHeader/DarkFooter directly, so this only
 *    mounts the dark Assistant.
 *  - everything else - DarkHeader + children + DarkFooter + dark
 *    Assistant. This deliberately also covers any not-found or unknown
 *    route (an unresolved case-study slug, a typo'd URL, etc.): since
 *    there's no more light branch to fall back to, those fall through
 *    to here too, so a 404 gets the real site chrome and
 *    app/not-found.tsx's dark content instead of a blank or
 *    mismatched page.
 *
 * A trailing slash is stripped before comparing, so `/foo/` matches
 * the same as `/foo`.
 *
 * No custom cursor. Browser default cursor everywhere.
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const normalizedPath = pathname?.replace(/\/$/, '') ?? ''
  const isMockup = normalizedPath.startsWith('/mockups')
  const isHomepage = normalizedPath === '/' || normalizedPath === ''

  if (isMockup) {
    return <>{children}</>
  }

  if (isHomepage) {
    return (
      <>
        {children}
        <Assistant dark />
      </>
    )
  }

  return (
    <>
      <DarkHeader />
      {children}
      <DarkFooter />
      <Assistant dark />
    </>
  )
}

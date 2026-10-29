'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Assistant from '@/app/components/Assistant'
import DarkHeader from '@/app/components/dark/DarkHeader'
import DarkFooter from '@/app/components/dark/DarkFooter'
import { DARK_CASE_STUDY_SLUGS } from '@/lib/darkRedesign'

/**
 * Renders the portfolio chrome (Navbar, Footer) on every route EXCEPT
 * `/mockups/*`. The mockup routes are internal screenshot-only pages.
 * They should render clean product UIs with no portfolio decorations.
 *
 * `/` and any case-study route in DARK_CASE_STUDY_SLUGS render the dark
 * chrome instead: those pages are self-contained (dr- tokens) so they
 * aren't sandwiched between the old light-system chrome. Assistant still
 * mounts everywhere - the homepage's teaser tile opens the same panel.
 * A trailing slash is stripped before comparing, so `/case-studies/
 * mini-pancake-co/` matches the same as without one.
 *
 * No custom cursor. Browser default cursor everywhere.
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const normalizedPath = pathname?.replace(/\/$/, '') ?? ''
  const isMockup = normalizedPath.startsWith('/mockups')
  const isDarkHomepage = normalizedPath === '/' || normalizedPath === ''
  const isDarkCaseStudy = DARK_CASE_STUDY_SLUGS.some(
    slug => normalizedPath === `/case-studies/${slug}`,
  )
  const isDark = isDarkHomepage || isDarkCaseStudy

  if (isMockup) {
    return <>{children}</>
  }

  if (isDark) {
    return (
      <>
        {!isDarkHomepage && <DarkHeader />}
        {children}
        {!isDarkHomepage && <DarkFooter />}
        <Assistant dark />
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

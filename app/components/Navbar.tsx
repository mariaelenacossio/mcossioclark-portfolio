'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

/**
 * Sticky top navigation.
 *
 * Per spec:
 *  - Transparent on top, --color-paper + border-bottom --color-rule +
 *    backdrop-blur-sm (NOT full blur) once the user scrolls past 48px
 *  - Logo: "MC" font-display weight 600 — no badge, no gradient
 *  - Center desktop links: caption color, hover ink, active link coral.
 *    No underlines. Active state computed via IntersectionObserver.
 *  - Right: "Let's talk" outlined button, hover fills ink/paper
 *  - Mobile: hamburger → fullscreen --color-paper overlay, links stacked
 *    in font-display, text-display-md
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const pathname = usePathname()
  // Case-study pages don't have the homepage sections, so we hide the
  // section anchors there and route them back to "/" + hash instead.
  const onHome = pathname === '/'

  /* ── Scrolled state — toggle navbar background on scroll past 48px ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active-section scroll-spy (IntersectionObserver on section IDs) ── */
  useEffect(() => {
    if (!onHome) return
    const observers: IntersectionObserver[] = []
    const visibleSections = new Map<string, number>()

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio)
            } else {
              visibleSections.delete(id)
            }
          })
          // Pick the section currently showing the most viewport
          if (visibleSections.size === 0) {
            setActiveSection('')
            return
          }
          const top = [...visibleSections.entries()].sort(
            (a, b) => b[1] - a[1]
          )[0]
          setActiveSection(top[0])
        },
        {
          // Account for the sticky navbar — start counting 80px below the top
          rootMargin: '-80px 0px -40% 0px',
          threshold: [0.1, 0.3, 0.5, 0.7],
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [onHome])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Build the right href for a section link based on current page
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled
            ? 'border-b border-rule bg-paper/80 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-content flex h-16 items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Mariaelena Cossio Clark — home"
            className="font-display text-xl font-semibold text-ink no-underline"
          >
            MC
          </Link>

          {/* Desktop links */}
          <ul role="list" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={sectionHref(link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`font-body text-[0.9375rem] transition-colors duration-150 no-underline ${
                      isActive
                        ? 'text-coral'
                        : 'text-caption hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right cluster — CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={sectionHref('#contact')}
              className="hidden rounded-button border-[1.5px] border-ink bg-transparent px-5 py-2.5 font-body text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper md:inline-flex"
            >
              Let&apos;s talk
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-button text-ink md:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-paper px-6 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-md font-semibold text-ink no-underline"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={sectionHref('#contact')}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + NAV_LINKS.length * 0.05, duration: 0.4 }}
              className="mt-4 rounded-button border-[1.5px] border-ink bg-transparent px-6 py-3 font-body text-base text-ink"
            >
              Let&apos;s talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

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
 * Editorial Bold MC navbar.
 *
 * Transparent at the very top; switches to ink/95 with a backdrop-blur
 * and a hairline card-color bottom border once the page scrolls past
 * the first 48px. Always sticky.
 *
 * Scroll-spy keeps the active section's link in coral via
 * IntersectionObserver.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const pathname = usePathname()
  const onHome = pathname === '/'

  /* Scroll past 48px → opaque ink background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll-spy — only on the homepage */
  useEffect(() => {
    if (!onHome) return
    const visible = new Map<string, number>()
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) visible.set(id, e.intersectionRatio)
            else visible.delete(id)
          })
          if (visible.size === 0) { setActiveSection(''); return }
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
          setActiveSection(top[0])
        },
        { rootMargin: '-80px 0px -40% 0px', threshold: [0.1, 0.3, 0.5, 0.7] },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [onHome])

  // Close the mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled
            ? 'border-b border-card bg-ink/95 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-content flex h-16 items-center justify-between"
        >
          {/* Lettermark */}
          <Link
            href="/"
            aria-label="Mariaelena Cossio Clark home"
            className="font-display text-2xl tracking-wider text-paper no-underline"
          >
            MC
          </Link>

          {/* Desktop nav */}
          <ul role="list" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={sectionHref(link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative font-body text-sm transition-colors duration-150 no-underline ${
                      isActive ? 'text-coral' : 'text-ghost hover:text-paper'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-coral transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <a
              href={sectionHref('#contact')}
              className="hidden rounded-lg border border-paper/30 px-5 py-2 font-body text-sm text-paper transition-colors duration-150 hover:bg-paper hover:text-ink md:inline-flex no-underline"
            >
              Let&apos;s talk
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-paper md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink px-6 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display text-paper no-underline"
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
              className="mt-4 rounded-lg border border-paper/30 bg-transparent px-6 py-3 font-body text-base text-paper"
            >
              Let&apos;s talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

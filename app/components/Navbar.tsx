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
 * Always-visible paper navbar. Never transparent, so links read on
 * both the light homepage and light case-study pages.
 *
 *  - Logo: "Mariaelena" in italic serif (M. on small screens)
 *  - Links: ghost base, coral hover with slide-in underline,
 *    ink + medium when the section is active (scroll-spy)
 *  - CTA: "Say hello" pill, ink fill, coral on hover
 *  - On case-study pages the section links resolve to /#section
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const pathname = usePathname()
  const onHome = pathname === '/'

  /* Scroll-spy, homepage only */
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

  /* Close the mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/95 backdrop-blur-sm">
        <nav
          aria-label="Primary"
          className="container-content flex h-16 items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Mariaelena Cossio Clark home"
            className="font-display text-lg italic text-ink no-underline"
          >
            <span className="hidden sm:inline">Mariaelena</span>
            <span className="sm:hidden">M.</span>
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
                    className={`group relative font-body text-sm transition-colors duration-150 no-underline ${
                      isActive
                        ? 'font-medium text-ink'
                        : 'text-ghost hover:text-coral'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-coral transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      aria-hidden="true"
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
              className="hidden rounded-full bg-ink px-5 py-2 font-body text-sm text-paper transition-colors duration-200 hover:bg-coral md:inline-flex no-underline"
            >
              Say hello 👋
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-paper px-6 md:hidden"
          >
            {/* Close button, top-right */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
            >
              <X size={22} />
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl italic text-ink no-underline"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={sectionHref('#contact')}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_LINKS.length * 0.05, duration: 0.35 }}
              className="mt-3 rounded-full bg-ink px-6 py-3 font-body text-base text-paper no-underline"
            >
              Say hello 👋
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Site footer.
 *
 * Per spec:
 *  - Background --color-paper, border-top 1px --color-rule, padding 32px 0
 *  - Single row on desktop, two stacked rows on mobile
 *  - Left   : "MC" + "© 2025 Mariaelena Cossio Clark"
 *  - Center : "Designed and built with React, Next.js & Tailwind"
 *  - Right  : "Back to top" — smooth scroll to top
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-rule bg-paper">
      <div className="container-content py-8">
        <div className="grid items-center gap-6 md:grid-cols-3">
          {/* Left */}
          <div className="flex flex-col items-center gap-1 text-center md:flex-row md:items-baseline md:gap-3 md:text-left">
            <span className="font-display text-base font-semibold text-ink">MC</span>
            <span className="font-body text-caption text-caption">
              © 2025 Mariaelena Cossio Clark
            </span>
          </div>

          {/* Center */}
          <p className="text-center font-body text-caption text-caption">
            Designed and built with React, Next.js &amp; Tailwind
          </p>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 font-body text-caption text-caption transition-colors duration-150 hover:text-ink"
              aria-label="Back to top"
            >
              <ArrowUp size={14} aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

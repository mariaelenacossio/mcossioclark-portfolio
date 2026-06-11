'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Editorial Bold MC footer.
 *
 * Single row on every breakpoint. Dark ink background with a hairline
 * card-color top border. Left: MC + copyright. Right: back-to-top.
 */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-card bg-ink">
      <div className="container-content py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl tracking-wider text-paper">MC</span>
            <span className="font-body text-caption text-ghost">
              © 2025 Mariaelena Cossio Clark
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 font-body text-caption text-ghost transition-colors duration-150 hover:text-paper"
            aria-label="Back to top"
          >
            <ArrowUp size={14} aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}

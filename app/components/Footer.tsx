'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Footer. Minimal, location-forward, single row on desktop.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-content flex flex-col items-center justify-between gap-4 py-8 md:flex-row">

        <div className="flex items-center gap-3">
          <span className="font-display text-base italic text-ink">
            Mariaelena Cossio Clark
          </span>
          <span className="font-body text-caption text-ghost">
            © 2025
          </span>
        </div>

        <span className="font-body text-caption text-ghost">
          Designed and built in Vancouver
        </span>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 font-body text-caption text-ghost transition-colors duration-150 hover:text-ink"
        >
          <ArrowUp size={13} aria-hidden="true" />
          Back to top
        </button>
      </div>
    </footer>
  )
}

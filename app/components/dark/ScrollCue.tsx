'use client'

import { useEffect, useState } from 'react'

/**
 * Hero scroll cue - dark-redesign pass two. Fades out once the user has
 * scrolled past ~80px (the hero is being left behind, so the cue stops
 * being useful). The loop itself is motion-safe only; prefers-reduced-motion
 * gets a static "Scroll" label with no moving line.
 *
 * Uses both pass-two motion tokens: dr-ease/dr-slow for the looping line,
 * dr-ease/dr-base for the scroll-triggered fade.
 */
export default function ScrollCue() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#about"
      aria-label="Scroll to About"
      className={`absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-dr-xs font-dr-body text-dr-caption text-dr-ink-muted no-underline transition-opacity duration-dr-base ease-dr-ease hover:text-dr-ink md:bottom-dr-xl ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span>Scroll</span>
      <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-dr-hairline">
        <span className="absolute inset-x-0 top-0 h-3 w-px bg-dr-ink-muted motion-safe:animate-dr-scroll-cue motion-reduce:top-1/2 motion-reduce:-translate-y-1/2 motion-reduce:opacity-100" />
      </span>
    </a>
  )
}

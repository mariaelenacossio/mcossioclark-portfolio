'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Scroll reveal wrapper (dark-redesign pass two). Wraps a section's inner
 * content; fades/slides it in once, the first time it crosses 15% into
 * the viewport. dr-ease/dr-base, same tokens as every other pass-two
 * enter transition.
 *
 * Under prefers-reduced-motion, none of the motion-safe: classes below
 * ever apply, so the content just renders at its plain default opacity
 * (visible, no offset) - no fade, no flash of hidden content, no need
 * for a separate reduced-motion branch.
 */
export default function ScrollReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`motion-safe:transition motion-safe:duration-dr-base motion-safe:ease-dr-ease ${
        revealed ? 'opacity-100 translate-y-0' : 'motion-safe:translate-y-4 motion-safe:opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

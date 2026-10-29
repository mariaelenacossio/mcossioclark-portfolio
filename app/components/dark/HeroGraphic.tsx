'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hero motion graphic (dark-redesign pass two, item C). A loose wireframe
 * UI card crossfades into a finished one, group by group - "design
 * turning into code." Opacity-only (no stroke-dashoffset drawing, per
 * review): each of the 4 groups is drawn twice, once stroked
 * (wireframe) and once filled (finished), and the two layers' opacity
 * crossfades. The outer card frame is static, not one of the 4 groups.
 *
 * Timing: the 400ms fade in/out per group is dr-base, the 150ms stagger
 * between groups is dr-fast - both hardcoded into the animation
 * shorthand in tailwind.config.ts, same pattern as the Milan Reed
 * reveal-sweep/success-pulse/error-shake entries already there. The 3s
 * hold on the finished frame and the ~6s total loop are this animation's
 * own values, not reusable tokens.
 *
 * Decorative only (aria-hidden). Paused via IntersectionObserver (this
 * graphic, inside the hero, off screen) and the Page Visibility API (tab
 * hidden). Under prefers-reduced-motion no animate-* class is ever
 * applied, so each layer's plain default opacity renders instead - a
 * static finished frame, no loop.
 */
export default function HeroGraphic() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const playState = !inView || !tabVisible ? 'paused' : 'running'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-[360px]">
      <svg viewBox="0 0 320 320" className="h-full w-full">
        {/* Static frame - not part of the 4 animated groups */}
        <rect x="24" y="24" width="272" height="272" rx="20" fill="none" strokeWidth={1.5} className="stroke-dr-hairline" />

        {/* Group 0 - avatar */}
        <circle
          cx="64" cy="76" r="20" fill="none" strokeWidth={1.5}
          className="stroke-dr-ink-muted opacity-100 motion-safe:animate-dr-graphic-wireframe-0"
          style={{ animationPlayState: playState }}
        />
        <circle
          cx="64" cy="76" r="20"
          className="fill-dr-primary opacity-0 motion-safe:animate-dr-graphic-finished-0"
          style={{ animationPlayState: playState }}
        />

        {/* Group 1 - header text */}
        <g
          fill="none" strokeWidth={1.2}
          className="stroke-dr-ink-muted opacity-100 motion-safe:animate-dr-graphic-wireframe-1"
          style={{ animationPlayState: playState }}
        >
          <rect x="96" y="66" width="120" height="10" rx="5" />
          <rect x="96" y="84" width="70" height="8" rx="4" />
        </g>
        <g className="opacity-0 motion-safe:animate-dr-graphic-finished-1" style={{ animationPlayState: playState }}>
          <rect x="96" y="66" width="120" height="10" rx="5" className="fill-dr-ink" />
          <rect x="96" y="84" width="70" height="8" rx="4" className="fill-dr-ink-muted" />
        </g>

        {/* Group 2 - body lines */}
        <g
          fill="none" strokeWidth={1.2}
          className="stroke-dr-hairline opacity-100 motion-safe:animate-dr-graphic-wireframe-2"
          style={{ animationPlayState: playState }}
        >
          <rect x="24" y="140" width="240" height="8" rx="4" />
          <rect x="24" y="160" width="220" height="8" rx="4" />
          <rect x="24" y="180" width="160" height="8" rx="4" />
        </g>
        <g
          className="fill-dr-ink-muted opacity-0 motion-safe:animate-dr-graphic-finished-2"
          style={{ animationPlayState: playState }}
        >
          <rect x="24" y="140" width="240" height="8" rx="4" />
          <rect x="24" y="160" width="220" height="8" rx="4" />
          <rect x="24" y="180" width="160" height="8" rx="4" />
        </g>

        {/* Group 3 - CTA button (same white pill as the real hero button) */}
        <rect
          x="24" y="228" width="100" height="36" rx="18" fill="none" strokeWidth={1.5}
          className="stroke-dr-ink-muted opacity-100 motion-safe:animate-dr-graphic-wireframe-3"
          style={{ animationPlayState: playState }}
        />
        <rect
          x="24" y="228" width="100" height="36" rx="18"
          className="fill-dr-primary opacity-0 motion-safe:animate-dr-graphic-finished-3"
          style={{ animationPlayState: playState }}
        />
      </svg>
    </div>
  )
}

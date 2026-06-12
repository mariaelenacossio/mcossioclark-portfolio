'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpStatProps {
  /** Final display value, e.g. "+34%", "94%", "20+". */
  value: string
  label: string
}

/** Ease-out cubic. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * One impact stat. When it enters the viewport, the numeric part
 * counts up from 0 to its final value over 1.2s, once. Prefix/suffix
 * ("+", "%", "+") render immediately. Reduced motion shows the final
 * value with no animation.
 */
export default function CountUpStat({ value, label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()

  // Split "+34%" → prefix "+", number 34, suffix "%"
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ''

  const [display, setDisplay] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setDisplay(target); return }

    const DURATION = 1200
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      setDisplay(Math.round(easeOut(t) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, target])

  return (
    <div ref={ref}>
      <div className="font-display text-[2.25rem] italic leading-none text-coral">
        {prefix}{display}{suffix}
      </div>
      <div className="mt-1.5 font-body text-caption text-ghost">
        {label}
      </div>
    </div>
  )
}

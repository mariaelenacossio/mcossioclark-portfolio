'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

interface ScrollRevealProps {
  /** Wrapper tag. Defaults to <div>. */
  as?: ElementType
  /** Stagger delay (seconds) — useful when chaining reveals. */
  delay?: number
  /** Duration override (seconds). */
  duration?: number
  /** Distance to translate up from (px). Default 24, per spec. */
  y?: number
  className?: string
  children: ReactNode
}

/**
 * Section / element entrance animation.
 *
 * Per spec:
 *  - opacity 0 → 1, translateY 24px → 0
 *  - viewport threshold 0.15
 *  - fires once only — does not replay on scroll-back
 *  - respects prefers-reduced-motion: skips the translate, keeps opacity
 *    (so the element doesn't pop in invisibly while motion is reduced)
 */
export default function ScrollReveal({
  as = 'div',
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  children,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0.001 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // out-expo
      }}
    >
      {children}
    </Tag>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

interface ScrollRevealProps {
  as?:        ElementType
  delay?:     number
  duration?:  number
  /** Y translate (px). Default 20 per Editorial Bold MC spec. */
  y?:         number
  className?: string
  children:   ReactNode
}

/**
 * Section / element entrance animation.
 *
 * Per Editorial Bold MC spec:
 *  - opacity 0 → 1, translateY 20px → 0
 *  - viewport threshold 0.1
 *  - once-only, no replay on scroll-back
 *  - duration 0.6s ease [0.16, 1, 0.3, 1]
 *  - prefers-reduced-motion: opacity only, no y transform
 */
export default function ScrollReveal({
  as = 'div',
  delay = 0,
  duration = 0.6,
  y = 20,
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
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduceMotion ? 0.001 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  )
}

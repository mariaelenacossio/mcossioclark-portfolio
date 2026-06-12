'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  /** Kept for call-site compatibility; fade timing is uniform now. */
  delay?:     number
  className?: string
  children:   ReactNode
}

/**
 * Gentle fade-only section reveal. No y transform; the aesthetic is
 * calm, not dramatic.
 *
 *  - opacity 0 → 1 over 0.5s easeOut
 *  - triggers at 8% visibility, once only
 *  - already reduced-motion-friendly (opacity only)
 */
export default function ScrollReveal({
  delay = 0,
  className,
  children,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

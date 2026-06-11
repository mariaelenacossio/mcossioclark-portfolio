'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Editorial Bold MC hero.
 *
 *  - Background: bg-ink
 *  - Min-height: full viewport
 *  - Massive 3-line Bebas Neue declaration ("Designer. / Developer. /
 *    She Ships.") where "Ships." is coral
 *  - Each line staggers in once on mount (y 60 → 0, ease out-expo,
 *    0.15s between lines). prefers-reduced-motion drops the translate.
 */

const declarationLines = [
  <>Designer.</>,
  <>Developer.</>,
  <>She <span className="text-coral">Ships.</span></>,
]

const metrics = [
  { value: '4+', label: 'Years of practice' },
  { value: '3',  label: 'Projects shipped'  },
  { value: '3',  label: 'Industries'        },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen bg-ink"
    >
      <div className="container-content flex min-h-screen flex-col justify-center pt-24 pb-20">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-stone/20 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse-dot" aria-hidden="true" />
          <span className="font-body text-caption uppercase tracking-wider text-ghost">
            Available · Vancouver &amp; Remote
          </span>
        </motion.div>

        {/* Main declaration */}
        <div className="overflow-hidden">
          <h1 className="font-display text-hero uppercase leading-none text-paper">
            {declarationLines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: reduce ? 0 : 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0.001 : 0.8,
                  delay:    reduce ? 0 : i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[540px] font-body text-body-lg leading-relaxed text-ghost"
        >
          I research the problem. Design the solution. Write the code.
          Most designers do one of those. I do all three.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="rounded-lg bg-coral px-7 py-3.5 font-body text-sm font-medium text-paper transition-colors duration-150 hover:bg-[#B83D21] no-underline"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-stone/30 px-7 py-3.5 font-body text-sm text-paper transition-colors duration-150 hover:border-paper/60 no-underline"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex items-stretch divide-x divide-stone/20 border-t border-stone/10 pt-10"
        >
          {metrics.map(m => (
            <div
              key={m.label}
              className="flex flex-col gap-1 pl-8 pr-8 first:pl-0 last:pr-0"
            >
              <span className="font-display text-3xl leading-none text-paper">{m.value}</span>
              <span className="font-body text-caption uppercase tracking-wider text-ghost">
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

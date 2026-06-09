'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Hero section — the signature element.
 *
 * Per spec:
 *  - Full viewport height
 *  - 2-column desktop (55/45) — text left, abstract composition right
 *  - 1-column mobile — text then composition
 *  - Declaration: 3 lines in font-display text-display-xl, weight 700
 *    Line 3 has the word "ships" in a coral->ink gradient
 *  - Each line slides up from 20px below with opacity 0->1, staggered
 *    0.15s, eased [0.16, 1, 0.3, 1], duration 0.7s. ONCE only.
 *  - Availability pill at top of left column with pulsing coral dot
 *  - Sub-copy + 2 CTAs + 3-stat metrics strip below the declaration
 *  - Right column: pure CSS/SVG abstract composition. NO Three.js, NO
 *    WebGL — that was the most "AI portfolio" element on the old site.
 */

const declarationLines = [
  { content: <>Designer.</>,                    delay: 0.0 },
  { content: <>Developer.</>,                   delay: 0.15 },
  { content: (
      <>She <span className="text-gradient-ships">ships</span>.</>
    ),                                          delay: 0.3 },
]

const metrics = [
  { value: '4+',  label: 'Years of practice' },
  { value: '20+', label: 'Projects shipped'  },
  { value: '3',   label: 'Industries'        },
]

/* ─── Right-column composition ──────────────────────────────────────────── */
function HeroComposition() {
  return (
    <div
      className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-[24px] bg-mist"
      aria-hidden="true"
    >
      {/* Large coral circle, 15% opacity */}
      <div
        className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: 'rgba(232, 80, 42, 0.15)' }}
      />
      {/* Smaller coral circle, 40% opacity */}
      <div
        className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: 'rgba(232, 80, 42, 0.40)' }}
      />

      {/* Two thin SVG arc lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="230"
          cy="230"
          r="180"
          stroke="var(--color-rule)"
          strokeWidth="1"
          strokeLinecap="round"
          // Render as an arc by setting a long dash + offset
          strokeDasharray="500 600"
          strokeDashoffset="0"
        />
        <circle
          cx="230"
          cy="230"
          r="100"
          stroke="var(--color-rule)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="280 400"
          strokeDashoffset="200"
        />
      </svg>

      {/* Orbiting dot — 20s linear loop. Animation comes from the
          `orbit` keyframe in tailwind.config.ts (transform: rotate +
          translateX). Wrapped in another element so the inner dot's
          size doesn't get distorted by the parent's rotation. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 0, height: 0 }}
      >
        <div
          className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full motion-safe:animate-orbit"
          style={{ backgroundColor: 'var(--color-coral)' }}
        />
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      className="container-content relative flex min-h-dvh items-center pt-24 md:pt-32"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr]">
        {/* ── Left column ───────────────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-pill border border-rule bg-mist px-3.5 py-1.5"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-coral motion-safe:animate-pulse-dot"
              aria-hidden="true"
            />
            <span className="font-body text-caption uppercase text-caption">
              Available · Vancouver &amp; Remote
            </span>
          </motion.div>

          {/* Declaration */}
          <h1 className="mt-6 font-display text-display-xl font-bold text-ink">
            {declarationLines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0.001 : 0.7,
                  delay: reduce ? 0 : line.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.content}
              </motion.span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[480px] font-body text-body-lg text-muted"
          >
            UX research, interface design, and frontend code — in one
            person. I work with AI as a production team I direct, not a
            tool I prompt.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-button bg-coral px-7 py-3.5 font-body font-medium text-paper transition-colors duration-150 hover:bg-[#C43E1F] no-underline"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-button border-[1.5px] border-rule bg-transparent px-7 py-3.5 font-body font-medium text-ink transition-colors duration-150 hover:border-ink no-underline"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex items-stretch divide-x divide-rule"
          >
            {metrics.map(m => (
              <div key={m.label} className="flex flex-col gap-1 pr-6 pl-6 first:pl-0 last:pr-0">
                <span className="font-display text-[1.75rem] font-bold leading-none text-ink">
                  {m.value}
                </span>
                <span className="font-body text-caption uppercase text-caption">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: composition ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <HeroComposition />
        </motion.div>
      </div>
    </section>
  )
}

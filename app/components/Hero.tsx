'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Hero. Warm paper background, personal greeting, italic serif
 * headline with "build them." in coral. Staggered entrance plays once
 * on mount; reduced motion collapses to fade only.
 */
export default function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      aria-label="Intro"
      className="flex min-h-screen flex-col justify-center bg-paper"
    >
      <motion.div
        className="container-content pb-20 pt-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Greeting tag */}
        <motion.div
          variants={item}
          className="mb-10 inline-flex w-fit items-center gap-2.5 rounded-full bg-mist px-4 py-2"
        >
          <span className="select-none text-lg" aria-hidden="true">👋</span>
          <span className="font-body text-caption uppercase tracking-widest text-ghost">
            Hi, I&apos;m Mariaelena
          </span>
          <span
            className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="max-w-[760px] font-display text-hero italic leading-[1.0] tracking-tight text-ink"
        >
          I design things
          <br className="hidden sm:block" />
          {' '}and then{' '}
          <span className="not-italic text-coral">build them.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={item}
          className="mt-6 max-w-[520px] font-body text-body-lg leading-relaxed text-ghost"
        >
          Most designers hand off to developers. I skip that step.
          Four years of research, Figma, and shipping real code,
          usually all in the same sprint.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-colors duration-200 hover:bg-coral no-underline"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-7 py-3.5 font-body text-sm text-ink transition-colors duration-200 hover:border-ink no-underline"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Location + availability tags */}
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
          {['Vancouver, BC', 'Open to remote', 'Available now'].map(tag => (
            <span
              key={tag}
              className="rounded-full border border-line bg-mist px-4 py-1.5 font-body text-caption text-ghost"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          className="mt-20 flex flex-col items-center gap-1.5 font-body text-caption text-ghost"
          aria-hidden="true"
        >
          <span>scroll</span>
          <ChevronDown size={14} className="motion-safe:animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  )
}

import { ChevronDown } from 'lucide-react'

/**
 * Hero. Warm paper background, personal greeting, italic serif
 * headline with "build them." in coral. Renders statically: the
 * project-grid card hover is the site's single signature interaction,
 * so the hero no longer plays an entrance sequence. The "available"
 * pulse dot stays, it signals real status, not decoration.
 */
export default function Hero() {
  return (
    <section
      aria-label="Intro"
      className="flex min-h-screen flex-col justify-center bg-paper"
    >
      <div className="container-content pb-20 pt-24">
        {/* Greeting tag */}
        <div className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-mist px-4 py-2">
          <span className="select-none text-lg" aria-hidden="true">👋</span>
          <span className="font-body text-caption uppercase tracking-widest text-ghost">
            Hi, I&apos;m Mariaelena
          </span>
          <span
            className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </div>

        {/* Positioning eyebrow. Backed by the self-built site + shipped
            projects; deliberately makes no claim about the embedded assistant
            (it does not exist yet). */}
        <p className="mb-4 font-body text-caption uppercase tracking-widest text-coral">
          AI-Native Designer &amp; Developer
        </p>

        {/* Headline */}
        <h1 className="max-w-[760px] font-display text-hero italic leading-[1.0] tracking-tight text-ink">
          I design things
          <br className="hidden sm:block" />
          {' '}and then{' '}
          <span className="not-italic text-coral">build them.</span>
        </h1>

        {/* Sub-copy */}
        <p className="mt-6 max-w-[520px] font-body text-body-lg leading-relaxed text-ghost">
          Most designers hand off to developers. I skip that step.
          Three-plus years of research, Figma, and shipping real code,
          usually all in the same sprint.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
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
        </div>

        {/* Location + availability tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {['Vancouver, BC', 'Open to remote', 'Available now'].map(tag => (
            <span
              key={tag}
              className="rounded-full border border-line bg-mist px-4 py-1.5 font-body text-caption text-ghost"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="mt-20 flex flex-col items-center gap-1.5 font-body text-caption text-ghost"
          aria-hidden="true"
        >
          <span>scroll</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </section>
  )
}

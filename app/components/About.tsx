import Image from 'next/image'
import { Search, Code2, Layers, Cpu } from 'lucide-react'
import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * Editorial Bold MC — About section.
 *
 *  - bg-paper, py-28 md:py-36
 *  - 2-col desktop, stacked mobile
 *  - Left: eyebrow + Bebas headline + 3 paragraphs + 4 stone pill tags
 *  - Right: profile photo (3:4) with availability pill floating
 *    bottom-left, plus a 2×2 pillar card grid below the photo
 */

const PILLARS = [
  {
    icon: Search,
    title: 'Research first',
    desc: 'Talk to users before touching Figma.',
  },
  {
    icon: Code2,
    title: 'Code fluency',
    desc: "I know what's painful to build.",
  },
  {
    icon: Layers,
    title: 'Systems thinking',
    desc: 'Components and tokens, not one-off screens.',
  },
  {
    icon: Cpu,
    title: 'AI direction',
    desc: "I run agents. I don't just use tools.",
  },
] as const

const TAGS = [
  'Vancouver, BC',
  'Open to remote',
  'Bilingual EN / ES',
  'Design + Code',
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-paper py-28 md:py-36"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

          {/* Left column: copy */}
          <div>
            <ScrollReveal>
              <span className="eyebrow font-body text-caption uppercase tracking-widest text-coral">
                About
              </span>

              <h2
                id="about-heading"
                className="mt-4 font-display text-display uppercase leading-none text-ink"
              >
                Most products fail in the space between the designer and the developer. I work in that space.
              </h2>

              <div className="mt-8 space-y-5 font-body text-body leading-relaxed text-ghost">
                <p>
                  I&apos;m based in Vancouver. Before I open Figma I talk to users. Before I ship I read the code review. Four years of that has made me useful in rooms where most designers go quiet.
                </p>
                <p>
                  I&apos;ve shipped e-commerce, SaaS dashboards, and service platforms. The brief is always wrong about something. Finding what before the build starts is the job.
                </p>
                <p>
                  I run AI agents for research synthesis, prototype generation, and production code. Not because it&apos;s faster. Because it lets me work at a scale that used to take a team.
                </p>
              </div>

              <ul role="list" className="mt-8 flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <li
                    key={tag}
                    className="rounded-full bg-stone px-4 py-1.5 font-body text-caption text-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right column: photo + pillar cards */}
          <div>
            <ScrollReveal delay={0.1}>
              {/* Profile photo */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Mariaelena Cossio Clark"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Availability pill — floats bottom-left */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-stone bg-paper/90 px-4 py-2 font-body text-caption text-ink backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse-dot" aria-hidden="true" />
                  Available for new roles
                </div>
              </div>

              {/* 2×2 pillar grid below the photo */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {PILLARS.map(p => {
                  const Icon = p.icon
                  return (
                    <article
                      key={p.title}
                      className="group cursor-default rounded-xl bg-stone p-5 transition-colors duration-200 hover:bg-stone/80"
                    >
                      <Icon size={18} className="text-coral" aria-hidden="true" />
                      <h3 className="mt-3 block font-display text-lg uppercase text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-body text-caption text-ghost">
                        {p.desc}
                      </p>
                    </article>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}

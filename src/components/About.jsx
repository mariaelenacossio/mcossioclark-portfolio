import ScrollReveal from './ui/ScrollReveal'
import { motion } from 'framer-motion'
import { Figma, Code2, Users, Lightbulb } from 'lucide-react'

const pillars = [
  {
    icon: Users,
    title: 'User-Centered Thinking',
    description:
      'Every decision starts with the user. I research before I design, validate before I ship.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description:
      'I dig into the "why" behind the brief — finding solutions that are both creative and grounded.',
  },
  {
    icon: Figma,
    title: 'Design Precision',
    description:
      'From pixel-perfect UIs to coherent design systems, I sweat the details that make experiences feel premium.',
  },
  {
    icon: Code2,
    title: 'Front-End Fluency',
    description:
      'I speak the language of developers. I can design and then build what I design.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-padding border-t border-white/5"
      aria-labelledby="about-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <div>
            <ScrollReveal>
              <span className="section-label" aria-hidden="true">About Me</span>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2 id="about-heading" className="section-title mb-6">
                Designing with{' '}
                <span className="text-gradient">intention,</span>{' '}
                building with craft
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-5">
                I&apos;m a UX/UI Designer and Web Developer with a passion for turning
                complex problems into elegant digital experiences. My work lives at the
                intersection of empathy, aesthetics, and engineering.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-text-secondary leading-relaxed mb-5">
                With a background spanning e-commerce, SaaS platforms, booking systems,
                and brand design, I bring a versatile lens to every project. I work
                closely with stakeholders and developers to ensure designs don&apos;t just
                look great — they function flawlessly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="font-body text-text-secondary leading-relaxed mb-10">
                When I&apos;m not in Figma, I&apos;m building in React, refining design systems,
                or exploring the latest in UX research methodologies. I believe the best
                design is invisible — it simply works.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3">
                {['Toronto, ON · Open to Remote', 'Figma Expert', 'React Developer', 'Bilingual EN/ES'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-xs font-body font-medium text-text-secondary border border-white/8 bg-surface"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <ScrollReveal key={pillar.title} delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="glass-card rounded-2xl p-6 h-full cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold-muted flex items-center justify-center mb-4">
                      <Icon size={20} className="text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-semibold text-text-primary text-base mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

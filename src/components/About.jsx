import { motion } from 'framer-motion'
import { Figma, Code2, Users, Lightbulb, ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'

const pillars = [
  {
    icon: Users,
    title: 'User-Centered Thinking',
    description: 'Every decision starts with understanding people — their goals, frustrations, and mental models. I research before I design.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Framing',
    description: 'The stated problem is rarely the real problem. I dig into the "why" to find solutions that address root causes, not symptoms.',
  },
  {
    icon: Figma,
    title: 'Design Craft',
    description: 'From pixel-perfect UIs to coherent design systems, I care deeply about the details that make experiences feel premium.',
  },
  {
    icon: Code2,
    title: 'Front-End Bridge',
    description: 'I design and build. Knowing how code works shapes how I design — and means my handoffs actually get built as intended.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding border-t border-white/5" aria-labelledby="about-heading">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <span className="section-label" aria-hidden="true">About Me</span>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2 id="about-heading" className="section-title mb-6">
                Designing with <span className="text-gradient">intention</span>,
                building with craft
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-5">
                I&apos;m a UX/UI Designer and Front-End Developer who believes the best
                digital experiences feel effortless — because someone worked hard to make
                them that way.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="font-body text-text-secondary leading-relaxed mb-5">
                My work spans e-commerce, SaaS dashboards, service businesses, and brand
                identities. In each project, I bring the same discipline: talk to users
                first, define the real problem, iterate based on evidence, and ship
                something that makes a measurable difference.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <p className="font-body text-text-secondary leading-relaxed mb-8">
                What sets me apart is the ability to go from user interviews and Figma
                prototypes all the way to React and production-ready code. I don&apos;t just
                hand off — I follow through.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Toronto, ON · Open to Remote', 'Figma → React', 'Bilingual EN/ES', '4+ Years Experience'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full text-xs font-body font-medium text-text-secondary border border-white/8 bg-surface">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <a
                href="#work"
                onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 font-display font-medium text-sm text-gold hover:text-gold-light transition-colors group"
              >
                See how I work through a project
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right: Pillar cards + avatar */}
          <div>
            {/* Avatar card */}
            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-2xl p-6 mb-5 flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-3xl text-bg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#E2C689,#C9A96E)' }}>
                  MC
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-text-primary">Mariaelena Cossio Clark</div>
                  <div className="font-body text-sm text-text-secondary mb-3">UX/UI Designer · Front-End Developer</div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-body text-xs text-emerald-400">Available for new roles</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => {
                const Icon = p.icon
                return (
                  <ScrollReveal key={p.title} delay={0.12 + i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.22 }}
                      className="glass-card rounded-2xl p-5 cursor-default"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gold-muted flex items-center justify-center mb-3">
                        <Icon size={18} className="text-gold" aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-semibold text-text-primary text-sm mb-1.5">{p.title}</h3>
                      <p className="font-body text-text-secondary text-xs leading-relaxed">{p.description}</p>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

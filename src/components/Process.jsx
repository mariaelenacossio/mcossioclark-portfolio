import { motion } from 'framer-motion'
import { Search, Layers, Play, Rocket } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import { processSteps } from '../data/projects'

const iconMap = { Search, Layers, Play, Rocket }

export default function Process() {
  return (
    <section
      id="process"
      className="section-padding border-t border-white/5"
      aria-labelledby="process-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <span className="section-label justify-center" aria-hidden="true">My Process</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 id="process-heading" className="section-title mb-4">
              How I turn{' '}
              <span className="text-gradient">ideas into impact</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              A structured, human-centered approach that keeps users at the center
              and stakeholders aligned throughout.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }}
            aria-hidden="true"
          />

          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon]
            return (
              <ScrollReveal key={step.number} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card rounded-2xl p-8 relative group text-center h-full flex flex-col items-center"
                >
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block font-display font-bold text-xs text-gold bg-surface border border-gold/30 px-3 py-1 rounded-full tracking-widest">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 rounded-2xl bg-gold-muted flex items-center justify-center mb-5 mt-4 group-hover:bg-gold/20 transition-colors duration-300"
                  >
                    {Icon && <Icon size={24} className="text-gold" aria-hidden="true" />}
                  </motion.div>

                  <h3 className="font-display font-bold text-xl text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Quote / philosophy */}
        <ScrollReveal delay={0.5} className="mt-16">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A96E, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="text-4xl text-gold/30 font-display mb-4 leading-none">&ldquo;</div>
              <blockquote className="font-display font-medium text-xl md:text-2xl text-text-primary leading-relaxed max-w-2xl mx-auto mb-4">
                Good design is not just how it looks — it&apos;s how well it solves the
                problem while feeling effortless.
              </blockquote>
              <cite className="font-body text-sm text-text-muted not-italic">
                — Mariaelena Cossio Clark
              </cite>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

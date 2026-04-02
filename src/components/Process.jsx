import { motion } from 'framer-motion'
import { Search, Target, Layers, Rocket } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import { processSteps } from '../data/projects'

const iconMap = { Search, Target, Layers, Rocket }

export default function Process() {
  return (
    <section id="process" className="section-padding border-t border-white/5" aria-labelledby="process-heading">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <span className="section-label justify-center" aria-hidden="true">My Process</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 id="process-heading" className="section-title mb-4">
              How I turn problems into <span className="text-gradient">products</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              A structured, human-centered approach that keeps users at the center
              and stakeholders aligned — from first insight to final build.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)' }}
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <ScrollReveal key={step.number} delay={0.08 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="glass-card rounded-2xl p-7 relative group text-center h-full flex flex-col items-center"
                  >
                    {/* Step number bubble */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-block font-display font-bold text-xs text-gold bg-surface border border-gold/30 px-3 py-1 rounded-full tracking-widest">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{ duration: 0.2 }}
                      className="w-14 h-14 rounded-2xl bg-gold-muted flex items-center justify-center mb-5 mt-3 group-hover:bg-gold/20 transition-colors duration-300"
                    >
                      {Icon && <Icon size={22} className="text-gold" aria-hidden="true" />}
                    </motion.div>

                    <h3 className="font-display font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed mb-3">{step.description}</p>
                    <p className="font-body text-text-muted text-xs leading-relaxed">{step.detail}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        {/* Philosophy quote */}
        <ScrollReveal delay={0.5} className="mt-14">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-4 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A96E, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="text-5xl text-gold/20 font-display mb-4 leading-none">&ldquo;</div>
              <blockquote className="font-display font-medium text-xl md:text-2xl text-text-primary leading-relaxed max-w-2xl mx-auto mb-4">
                Good design is not about how it looks — it&apos;s about how clearly
                it solves a problem that genuinely matters.
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

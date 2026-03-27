import { motion } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import { skills } from '../data/projects'

const categoryConfig = {
  UX: {
    label: 'UX Research & Strategy',
    gradient: 'from-emerald-400/20 to-teal-400/10',
    dotColor: 'bg-emerald-400',
    tagBorder: 'border-emerald-400/20',
    tagText: 'text-emerald-300/80',
  },
  UI: {
    label: 'UI & Visual Design',
    gradient: 'from-violet-400/20 to-purple-400/10',
    dotColor: 'bg-violet-400',
    tagBorder: 'border-violet-400/20',
    tagText: 'text-violet-300/80',
  },
  Development: {
    label: 'Front-End Development',
    gradient: 'from-gold/20 to-amber-400/10',
    dotColor: 'bg-gold',
    tagBorder: 'border-gold/20',
    tagText: 'text-gold/80',
  },
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding border-t border-white/5"
      aria-labelledby="skills-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <span className="section-label justify-center" aria-hidden="true">Skills</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 id="skills-heading" className="section-title mb-4">
              What I bring to the{' '}
              <span className="text-gradient">table</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              A full-spectrum skill set that bridges design thinking and technical execution.
            </p>
          </ScrollReveal>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], catIndex) => {
            const config = categoryConfig[category]
            return (
              <ScrollReveal key={category} delay={0.1 + catIndex * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card rounded-2xl p-8 h-full relative overflow-hidden group"
                >
                  {/* Background glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} aria-hidden="true" />
                      <span className="font-display font-semibold text-text-primary text-base">
                        {config.label}
                      </span>
                    </div>

                    {/* Skills list */}
                    <ul className="flex flex-wrap gap-2" aria-label={`${config.label} skills`}>
                      {items.map((skill, i) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + catIndex * 0.08 + i * 0.04 }}
                        >
                          <span
                            className={`inline-block px-3 py-1.5 rounded-full text-xs font-body font-medium border ${config.tagBorder} ${config.tagText} bg-white/3 hover:bg-white/6 transition-colors duration-200 cursor-default`}
                          >
                            {skill}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Tools row */}
        <ScrollReveal delay={0.4} className="mt-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <p className="font-display font-semibold text-text-secondary text-sm uppercase tracking-widest mb-6 text-center">
              Tools & Platforms
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Figma', 'FigJam', 'Notion', 'Framer', 'Miro',
                'VS Code', 'GitHub', 'Vercel', 'WordPress', 'Webflow',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-5 py-2.5 rounded-full text-sm font-body text-text-secondary border border-white/7 bg-surface hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

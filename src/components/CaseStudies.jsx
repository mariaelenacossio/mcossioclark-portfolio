import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronRight, Clock, Users, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import ProjectMockup from './ui/ProjectMockup'
import { projects } from '../data/projects'

/* ---- Case Study Full Modal ---- */
function CaseStudyModal({ project, onClose, onPrev, onNext, total, currentIndex }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  // Scroll to top when project changes
  useEffect(() => { scrollRef.current?.scrollTo(0, 0) }, [project.id])

  const accent = project.accentColor

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${project.title}`}
      >
        <motion.div
          ref={scrollRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="ml-auto w-full max-w-4xl h-full overflow-y-auto"
          style={{ background: '#0E0E0E', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* ---- HERO ---- */}
          <div className={`relative w-full h-64 md:h-80 bg-gradient-to-br ${project.gradient} flex-shrink-0`}>
            <div className="absolute inset-0 flex items-end p-8 pb-10" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.9) 0%, transparent 60%)' }}>
              <div>
                <span className="inline-block text-xs font-body font-medium tracking-widest uppercase mb-2 px-3 py-1 rounded-full" style={{ background: `${accent}30`, color: accent, border: `1px solid ${accent}40` }}>
                  {project.category}
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Close + nav controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button onClick={onPrev} aria-label="Previous project"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
                <ArrowLeft size={16} />
              </button>
              <span className="font-body text-xs text-white/50">{currentIndex + 1}/{total}</span>
              <button onClick={onNext} aria-label="Next project"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
                <ArrowRight size={16} />
              </button>
              <button onClick={onClose} aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center ml-1"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ---- BODY ---- */}
          <div className="px-8 md:px-12 py-10 space-y-12">

            {/* Meta row */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Users, label: project.role },
                { icon: Calendar, label: project.year },
                { icon: Clock, label: project.duration },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-body text-text-secondary glass-card rounded-xl px-4 py-2.5">
                  <Icon size={14} style={{ color: accent }} />
                  {label}
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm font-body text-text-secondary glass-card rounded-xl px-4 py-2.5">
                <Users size={14} style={{ color: accent }} />
                {project.team}
              </div>
            </div>

            {/* Overview */}
            <Section accent={accent} label="Overview">
              <p className="font-body text-text-secondary leading-relaxed text-lg">{project.overview}</p>
            </Section>

            {/* Problem + Goal side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6" style={{ borderLeft: `3px solid ${accent}` }}>
                <div className="font-display font-semibold text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>The Problem</div>
                <p className="font-body text-text-secondary leading-relaxed">{project.problem}</p>
              </div>
              <div className="glass-card rounded-2xl p-6" style={{ borderLeft: '3px solid #22C55E' }}>
                <div className="font-display font-semibold text-xs uppercase tracking-widest text-emerald-400 mb-3">The Goal</div>
                <p className="font-body text-text-secondary leading-relaxed">{project.goal}</p>
              </div>
            </div>

            {/* Hypothesis */}
            <Section accent={accent} label="Hypothesis">
              <div className="glass-card rounded-2xl p-6" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                <div className="text-2xl mb-3" style={{ color: `${accent}40` }}>"</div>
                <p className="font-body text-text-primary leading-relaxed italic">{project.hypothesis}</p>
              </div>
            </Section>

            {/* Research */}
            <Section accent={accent} label="Research">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Methods Used</div>
                  <ul className="space-y-2">
                    {project.research.methods.map(m => (
                      <li key={m} className="flex items-start gap-2 font-body text-sm text-text-secondary">
                        <span style={{ color: accent, marginTop: 2 }}>▸</span> {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Participants</div>
                    <p className="font-body text-sm text-text-secondary">{project.research.participants}</p>
                  </div>
                </div>
                <div>
                  <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Key Findings</div>
                  <div className="space-y-2">
                    {project.research.keyFindings.map((f, i) => (
                      <div key={i} className="flex gap-3 glass-card rounded-xl p-3">
                        <span className="font-display font-bold text-xs mt-0.5 flex-shrink-0" style={{ color: accent }}>0{i + 1}</span>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Insights */}
            <Section accent={accent} label="Key Insights">
              <div className="grid sm:grid-cols-2 gap-4">
                {project.insights.map((ins, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${accent}20`, color: accent }}>
                        {i + 1}
                      </div>
                      <div className="font-display font-semibold text-sm text-text-primary">{ins.label}</div>
                    </div>
                    <p className="font-body text-xs text-text-secondary leading-relaxed">{ins.detail}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* User Persona */}
            <Section accent={accent} label="User Persona">
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl" style={{ background: `${accent}20`, color: accent }}>
                      {project.persona.name[0]}
                    </div>
                    <div className="mt-3">
                      <div className="font-display font-bold text-lg text-text-primary">{project.persona.name}</div>
                      <div className="font-body text-sm text-text-muted">{project.persona.role}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-text-secondary leading-relaxed mb-5">{project.persona.bio}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Goals</div>
                        <ul className="space-y-1.5">
                          {project.persona.goals.map(g => (
                            <li key={g} className="font-body text-xs text-text-secondary flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">✓</span> {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Frustrations</div>
                        <ul className="space-y-1.5">
                          {project.persona.frustrations.map(f => (
                            <li key={f} className="font-body text-xs text-text-secondary flex items-start gap-2">
                              <span style={{ color: accent }}>✗</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* User Flow */}
            <Section accent={accent} label="User Flow">
              <div className="glass-card rounded-2xl p-6" style={{ background: '#0A0A0A' }}>
                <div className="flex flex-wrap items-center gap-2">
                  {project.userFlow.split('→').map((step, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-lg font-body text-xs text-text-secondary" style={{ background: i === 0 || i === arr.length - 1 ? `${accent}20` : '#1A1A1A', color: i === 0 || i === arr.length - 1 ? accent : undefined, border: `1px solid ${i === 0 || i === arr.length - 1 ? accent + '40' : 'rgba(255,255,255,0.06)'}` }}>
                        {step.trim()}
                      </div>
                      {i < arr.length - 1 && <ChevronRight size={12} className="text-text-muted flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Wireframes */}
            <Section accent={accent} label="Wireframes & Testing">
              <div className="grid md:grid-cols-3 gap-4">
                {project.wireframes.map((w, i) => (
                  <div key={w.phase} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: `${accent}20`, color: accent }}>{i + 1}</div>
                      <div className="font-display font-semibold text-sm" style={{ color: accent }}>{w.phase}</div>
                    </div>
                    {/* Visual fidelity representation */}
                    <div className="w-full h-20 rounded-lg mb-3 overflow-hidden" style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ padding: 6, opacity: i === 0 ? 0.4 : i === 1 ? 0.65 : 1 }}>
                        {[...Array(3)].map((_, r) => (
                          <div key={r} className="flex gap-1 mb-1">
                            {[...Array(4)].map((_, c) => (
                              <div key={c} style={{ height: r === 0 ? 8 : 5, flex: 1, background: i === 0 ? '#555' : i === 1 ? '#777' : accent, borderRadius: 2, opacity: i < 2 ? 0.8 : 0.9 }} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="font-body text-xs text-text-muted leading-relaxed">{w.description}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Iterations — most important */}
            <Section accent={accent} label="Design Iterations">
              <div className="space-y-4">
                {project.iterations.map((it, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: i === project.iterations.length - 1 ? '#22C55E' : accent }} />
                    <div className="pl-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display font-bold text-xs px-2 py-1 rounded-md" style={{ background: `${accent}20`, color: accent }}>{it.version}</span>
                        <span className="font-display font-semibold text-sm text-text-primary">{it.title}</span>
                        {i === project.iterations.length - 1 && (
                          <span className="ml-auto text-xs font-body font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">✓ Shipped</span>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="font-body text-xs text-text-muted uppercase tracking-wider mb-1">User Insight</div>
                          <p className="font-body text-sm text-text-secondary italic">"{it.insight}"</p>
                        </div>
                        <div>
                          <div className="font-body text-xs text-text-muted uppercase tracking-wider mb-1">Design Change</div>
                          <p className="font-body text-sm text-text-secondary">{it.change}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* UI Mockup */}
            <Section accent={accent} label="Final Design">
              <div className="rounded-2xl overflow-hidden" style={{ background: '#0A0A12', border: '1px solid rgba(255,255,255,0.06)' }}>
                <ProjectMockup type={project.mockupType} />
              </div>
            </Section>

            {/* Design System */}
            <Section accent={accent} label="Design System">
              <div className="glass-card rounded-2xl p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Colour Palette</div>
                    <div className="flex flex-wrap gap-2">
                      {project.designSystem.colors.map(c => {
                        const [hex, name] = c.split(' (')
                        return (
                          <div key={c} className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg border border-white/10 flex-shrink-0" style={{ background: hex }} />
                            <span className="font-body text-xs text-text-muted">{name?.replace(')', '') || hex}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Typography</div>
                    <p className="font-body text-xs text-text-secondary leading-relaxed">{project.designSystem.typography}</p>
                  </div>
                  <div>
                    <div className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Key Components</div>
                    <ul className="space-y-1">
                      {project.designSystem.components.map(c => (
                        <li key={c} className="font-body text-xs text-text-secondary flex items-start gap-1.5">
                          <span style={{ color: accent }}>▸</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Outcome metrics */}
            <Section accent={accent} label="Outcome & Impact">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {project.metrics.map(m => (
                  <div key={m.label} className="glass-card rounded-2xl p-5 text-center">
                    <div className="font-display font-bold text-2xl mb-1" style={{ color: accent }}>{m.value}</div>
                    <div className="font-body text-xs text-text-muted leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-6" style={{ background: `${accent}06`, border: `1px solid ${accent}20` }}>
                <p className="font-body text-text-secondary leading-relaxed">{project.outcome}</p>
              </div>
            </Section>

            {/* Learnings */}
            <Section accent={accent} label="What I Learned">
              <div className="space-y-3">
                {project.learnings.map((l, i) => (
                  <div key={i} className="flex gap-4 glass-card rounded-xl p-5">
                    <div className="font-display font-bold text-xl flex-shrink-0" style={{ color: `${accent}40` }}>0{i + 1}</div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{l}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Bottom nav */}
            <div className="flex justify-between pt-6 border-t border-white/5 pb-4">
              <button onClick={onPrev} className="flex items-center gap-2 font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft size={14} /> Previous
              </button>
              <button onClick={onClose} className="btn-secondary text-sm px-5 py-2.5">
                Close
              </button>
              <button onClick={onNext} className="flex items-center gap-2 font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
                Next <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Section({ label, accent, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: accent }}>{label}</span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
      </div>
      {children}
    </div>
  )
}

/* ---- Project Card ---- */
function ProjectCard({ project, index, onClick }) {
  return (
    <ScrollReveal delay={0.08 + index * 0.1}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        onClick={() => onClick(index)}
        role="button"
        tabIndex={0}
        aria-label={`View case study: ${project.title}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(index) }}
      >
        {/* Mockup preview */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 220, background: '#0A0A12' }}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
          <div className="absolute inset-0 scale-75 origin-top overflow-hidden pointer-events-none">
            <ProjectMockup type={project.mockupType} />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-display font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: project.accentColor }}
            >
              View Case Study <ArrowUpRight size={14} />
            </motion.div>
          </div>
          <span className="absolute top-3 left-3 text-xs font-body font-medium text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {project.year}
          </span>
          <span className="absolute top-3 right-3 text-xs font-body font-medium px-2.5 py-1 rounded-full" style={{ background: `${project.accentColor}30`, color: project.accentLight, border: `1px solid ${project.accentColor}40` }}>
            {project.role.split(' ')[0]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="text-xs font-body text-text-muted mb-2 uppercase tracking-wider">{project.category}</div>
          <h3 className="font-display font-bold text-xl text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {project.shortDescription}
          </p>

          {/* Metrics */}
          <div className="flex gap-3 mb-4">
            {project.metrics.slice(0, 2).map(m => (
              <div key={m.label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: `${project.accentColor}10`, border: `1px solid ${project.accentColor}20` }}>
                <div className="font-display font-bold text-sm" style={{ color: project.accentColor }}>{m.value}</div>
                <div className="font-body text-xs text-text-muted leading-tight">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs font-body text-text-muted bg-surface2 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-display font-medium text-text-secondary group-hover:text-gold transition-colors duration-300">
            Read Case Study <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

/* ---- Main Section ---- */
export default function CaseStudies() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handlePrev = () => setSelectedIndex(i => (i - 1 + projects.length) % projects.length)
  const handleNext = () => setSelectedIndex(i => (i + 1) % projects.length)

  return (
    <section id="work" className="section-padding border-t border-white/5" aria-labelledby="work-heading">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <ScrollReveal>
              <span className="section-label" aria-hidden="true">Case Studies</span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 id="work-heading" className="section-title">
                Selected <span className="text-gradient">Work</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15} direction="left">
            <p className="font-body text-text-secondary max-w-sm leading-relaxed">
              Each project is a full story — from research and discovery through
              iteration to measurable outcome.
            </p>
          </ScrollReveal>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={setSelectedIndex} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <CaseStudyModal
            project={projects[selectedIndex]}
            currentIndex={selectedIndex}
            total={projects.length}
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

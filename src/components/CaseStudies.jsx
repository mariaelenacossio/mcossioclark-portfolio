import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronRight } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import { projects } from '../data/projects'

function ProjectVisual({ gradient, title }) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
      aria-hidden="true"
    >
      {/* Abstract shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-white/5 absolute top-4 left-4" />
        <div className="w-20 h-20 rounded-full bg-white/8 absolute bottom-6 right-6" />
        <div className="w-16 h-16 rounded-2xl bg-white/6 absolute top-8 right-12 rotate-12" />
      </div>
      <span className="relative font-display font-bold text-white/20 text-6xl text-center px-6 leading-tight">
        {title.split(' ')[0]}
      </span>
    </div>
  )
}

function CaseStudyModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${project.title}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-surface border border-white/8 rounded-t-3xl md:rounded-3xl w-full md:max-w-3xl max-h-[92vh] overflow-y-auto shadow-card-hover"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal hero */}
          <div
            className={`w-full h-52 md:h-64 bg-gradient-to-br ${project.gradient} rounded-t-3xl md:rounded-t-3xl overflow-hidden relative flex-shrink-0`}
          >
            <ProjectVisual gradient={project.gradient} title={project.title} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
              aria-label="Close case study"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-8 md:p-10">
            {/* Meta */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-body text-text-secondary border border-white/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="text-xs font-body text-text-secondary border border-white/10 px-3 py-1 rounded-full">
                {project.year}
              </span>
              <span className="text-xs font-body text-gold border border-gold/20 px-3 py-1 rounded-full">
                {project.role}
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-2">
              {project.title}
            </h2>
            <p className="font-body text-text-secondary leading-relaxed mb-8">
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body text-text-secondary bg-surface2 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-8">
              {/* Problem */}
              <div>
                <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-gold mb-3">
                  The Problem
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">{project.problem}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* Process */}
              <div>
                <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-gold mb-3">
                  My Process
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">{project.process}</p>
              </div>

              <div className="border-t border-white/5" />

              {/* Solution */}
              <div>
                <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-gold mb-3">
                  The Solution
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">{project.solution}</p>
              </div>

              <div className="border-t border-white/5" />

              {/* Outcome */}
              <div>
                <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-gold mb-3">
                  Outcome & Impact
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">{project.outcome}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({ project, index, onClick }) {
  return (
    <ScrollReveal delay={0.1 + index * 0.1}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        aria-label={`View case study: ${project.title}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(project) }}
      >
        {/* Image area */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}>
            <ProjectVisual gradient={project.gradient} title={project.title} />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ArrowUpRight size={20} className="text-white" />
            </motion.div>
          </div>
          <span
            className="absolute top-4 left-4 text-xs font-body font-medium text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
          >
            {project.year}
          </span>
        </div>

        {/* Card content */}
        <div className="p-6 flex flex-col flex-1">
          <span className="text-xs font-body text-text-muted mb-2 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="font-display font-bold text-xl text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-body text-text-muted bg-surface2 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-sm font-display font-medium text-text-secondary group-hover:text-gold transition-colors duration-300">
            View Case Study
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section
      id="work"
      className="section-padding border-t border-white/5"
      aria-labelledby="work-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <ScrollReveal>
              <span className="section-label" aria-hidden="true">Case Studies</span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 id="work-heading" className="section-title">
                Selected{' '}
                <span className="text-gradient">Work</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15} direction="left">
            <p className="font-body text-text-secondary max-w-sm leading-relaxed">
              Each project represents a problem solved through design thinking,
              user research, and clean execution.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

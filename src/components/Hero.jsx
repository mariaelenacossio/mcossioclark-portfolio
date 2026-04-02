import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'

const ROLES = ['UX/UI Designer', 'Problem Solver', 'Front-End Developer', 'Design Thinker']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function TypewriterRole() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = ROLES[index]
    let timer

    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55)
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient font-display font-bold">
      {displayed}
      <span className="animate-pulse ml-0.5 text-gold">|</span>
    </span>
  )
}

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.35 + 0.05,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${d.opacity})`; ctx.fill()
      })
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(201,169,110,${0.05 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" className="relative min-h-dvh flex flex-col justify-center overflow-hidden" aria-label="Hero section">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" aria-hidden="true" />

      {/* Glow orbs */}
      {[
        { top: '20%', left: '60%', w: 480, h: 480, opacity: 0.07 },
        { top: '60%', left: '10%', w: 320, h: 320, opacity: 0.04 },
      ].map((o, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" aria-hidden="true"
          style={{ top: o.top, left: o.left, width: o.w, height: o.h, transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, rgba(201,169,110,${o.opacity}) 0%, transparent 70%)`,
            filter: 'blur(60px)' }}
        />
      ))}

      <div className="relative z-10 container-max px-6 md:px-12 lg:px-24 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Text content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Availability badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-medium tracking-wide border border-white/10 text-text-secondary bg-white/3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities · Toronto &amp; Remote
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 variants={itemVariants} className="font-display font-bold leading-[0.9] tracking-tight mb-6">
              <span className="block text-text-primary text-5xl sm:text-6xl md:text-7xl">Mariaelena</span>
              <span className="block text-text-primary text-5xl sm:text-6xl md:text-7xl">Cossio Clark</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="text-2xl md:text-3xl mb-6 h-10">
              <TypewriterRole />
            </motion.div>

            {/* Value prop */}
            <motion.p variants={itemVariants} className="font-body text-text-secondary text-lg leading-relaxed max-w-xl mb-10">
              I turn complex problems into elegant digital experiences —
              grounded in research, brought to life with design, and shipped with code.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14">
              <a href="#work" onClick={e => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-primary group" aria-label="View my work">
                View Case Studies
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-secondary" aria-label="Contact me">
                Let&apos;s Talk
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
              {[
                { value: '4+', label: 'Years of Practice' },
                { value: '20+', label: 'Projects Shipped' },
                { value: '3', label: 'Industries' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-gradient">{s.value}</div>
                  <div className="font-body text-xs text-text-muted mt-0.5 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual card stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Stacked cards */}
            <div className="relative w-full max-w-sm">
              {/* Back card */}
              <motion.div
                animate={{ rotate: [3, 4, 3], y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 glass-card rounded-3xl"
                style={{ transform: 'rotate(5deg) translateY(8px)', background: 'rgba(201,169,110,0.04)' }}
              />
              {/* Middle card */}
              <motion.div
                animate={{ rotate: [-1, -2, -1], y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute inset-0 glass-card rounded-3xl"
                style={{ transform: 'rotate(-3deg) translateY(4px)' }}
              />
              {/* Front card */}
              <div className="relative glass-card rounded-3xl p-8 z-10">
                {/* Mini profile */}
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-bg" style={{ background: 'linear-gradient(135deg,#E2C689,#C9A96E)' }}>
                    MC
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-text-primary">Mariaelena C.C.</div>
                    <div className="font-body text-xs text-text-secondary">UX/UI Designer</div>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>

                {/* Recent work */}
                <div className="space-y-3 mb-6">
                  {[
                    { title: 'Beyond Skincare', tag: 'E-Commerce', metric: '+34% CVR', color: '#C4786E' },
                    { title: 'relocateMe', tag: 'SaaS', metric: '94% compliance', color: '#4A8FAE' },
                    { title: 'Beauty by Amy', tag: 'Booking', metric: '+52% bookings', color: '#8B6AAE' },
                  ].map(p => (
                    <div key={p.title} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/3 transition-colors">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}>
                        <div className="w-full h-full rounded-lg" style={{ background: `linear-gradient(135deg, ${p.color}40, ${p.color}20)` }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-xs text-text-primary">{p.title}</div>
                        <div className="font-body text-xs text-text-muted">{p.tag}</div>
                      </div>
                      <span className="font-body text-xs font-medium" style={{ color: p.color }}>{p.metric}</span>
                    </div>
                  ))}
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Figma', 'React', 'User Research', 'Design Systems'].map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-full text-xs font-body text-text-muted border border-white/7 bg-surface">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 glass-card rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <Sparkles size={14} className="text-gold" />
              <span className="font-body text-xs text-text-secondary">Research-driven</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-6 glass-card rounded-2xl px-4 py-2.5"
            >
              <div className="font-body text-xs text-text-muted mb-0.5">Latest result</div>
              <div className="font-display font-bold text-sm text-gold">+34% conversion</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-gold transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="font-body text-xs tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  )
}

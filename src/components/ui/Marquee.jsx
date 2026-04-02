import { motion } from 'framer-motion'

const tools = [
  'Figma', 'React', 'Tailwind CSS', 'Framer Motion', 'User Research',
  'Design Systems', 'Prototyping', 'WordPress', 'Accessibility', 'Usability Testing',
  'Information Architecture', 'JavaScript', 'TypeScript', 'Git', 'Webflow',
]

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/5 py-4"
      style={{ background: 'rgba(255,255,255,0.01)' }}
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {[...tools, ...tools].map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted tracking-wide flex-shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-gold opacity-50" />
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

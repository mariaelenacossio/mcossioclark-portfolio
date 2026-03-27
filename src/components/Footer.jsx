import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-12 lg:px-24">
      <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p className="font-display font-bold text-lg text-text-primary mb-1">
            MC<span className="text-gold">.</span>
          </p>
          <p className="font-body text-xs text-text-muted">
            © {new Date().getFullYear()} Mariaelena Cossio Clark. All rights reserved.
          </p>
        </div>

        {/* Center */}
        <p className="font-body text-xs text-text-muted text-center">
          Designed & built with{' '}
          <span className="text-gold" aria-label="love">♥</span>{' '}
          using React, Vite & Tailwind CSS
        </p>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  )
}

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Linkedin, Github, Globe, Mail } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import emailjs from '@emailjs/browser'

// ⚙️  Replace with your EmailJS credentials
// Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mariaelena-cossio-clark/',
    icon: Linkedin,
    handle: '/in/mariaelena-cossio-clark',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mariaelenacossio',
    icon: Github,
    handle: '@mariaelenacossio',
  },
  {
    label: 'Portfolio',
    href: '#',
    icon: Globe,
    handle: 'mcossioclark.com',
  },
  {
    label: 'Email',
    href: 'mailto:mariaelena.cossio@outlook.com',
    icon: Mail,
    handle: 'mariaelena.cossio@outlook.com',
  },
]

function SocialRow() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {socialLinks.map((link, i) => {
        const Icon = link.icon
        return (
          <ScrollReveal key={link.label} delay={0.1 + i * 0.07}>
            <motion.a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-gold/25 hover:bg-white/5 transition-all duration-300 group"
              aria-label={`${link.label}: ${link.handle}`}
            >
              <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                <Icon size={17} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-text-primary">
                  {link.label}
                </div>
                <div className="font-body text-xs text-text-muted">{link.handle}</div>
              </div>
            </motion.a>
          </ScrollReveal>
        )
      })}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required.'
    if (!formData.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first invalid field
      const firstError = Object.keys(errs)[0]
      document.getElementById(firstError)?.focus()
      return
    }

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="section-padding border-t border-white/5"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <ScrollReveal>
              <span className="section-label" aria-hidden="true">Contact</span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 id="contact-heading" className="section-title mb-5">
                Let&apos;s build something{' '}
                <span className="text-gradient">great together</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-10">
                Whether you have a project in mind, a role to fill, or just want
                to talk design — I&apos;d love to hear from you. I typically respond
                within 24 hours.
              </p>
            </ScrollReveal>

            <SocialRow />
          </div>

          {/* Right: Form */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-primary">
                    Message sent!
                  </h3>
                  <p className="font-body text-text-secondary max-w-xs">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary mt-2 text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6"
                    >
                      <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                      <p className="font-body text-sm text-red-300">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-body text-sm font-medium text-text-secondary mb-2"
                      >
                        Name <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full bg-surface2 border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all duration-200 ${
                          errors.name
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/8 hover:border-white/15'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400 font-body">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-body text-sm font-medium text-text-secondary mb-2"
                      >
                        Email <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full bg-surface2 border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all duration-200 ${
                          errors.email
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/8 hover:border-white/15'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 font-body">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-body text-sm font-medium text-text-secondary mb-2"
                      >
                        Message <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity…"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full bg-surface2 border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all duration-200 resize-none ${
                          errors.message
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/8 hover:border-white/15'
                        }`}
                      />
                      {errors.message && (
                        <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400 font-body">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-busy={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={15} aria-hidden="true" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

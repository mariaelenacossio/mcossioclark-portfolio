'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  CalendarDays, FileText, Linkedin, Github, Mail, ArrowUpRight, Loader2,
} from 'lucide-react'
import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * Contact section.
 *
 * Per spec:
 *  - Background --color-paper
 *  - Eyebrow + headline (display-md) + subhead
 *  - 2 cols desktop: left form, right action cards + socials
 *  - 1 col mobile
 *  - Form fields: Name, Email, Message (min 10 chars)
 *  - Submit: full-width coral button, hover #C43E1F, loading spinner,
 *    success replaces form with a centred display message
 *  - Action cards: Book a call (Google Calendar) + Download resume
 *  - Socials: LinkedIn / GitHub / Email
 *
 * EmailJS credentials carried over from the existing portfolio.
 */

const EMAILJS_SERVICE_ID  = 'service_6y1v4fl'
const EMAILJS_TEMPLATE_ID = 'template_h21q9f2'
const EMAILJS_PUBLIC_KEY  = 'SnvNb_Z2_pFivYnV0'

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mariaelena-cossio-clark/' },
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/mariaelenacossio' },
  { icon: Mail,     label: 'Email',    href: 'mailto:mariaelena.cossio@outlook.com' },
] as const

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): FieldErrors => {
    const e: FieldErrors = {}
    if (!form.name.trim())                          e.name = 'Name is required.'
    if (!form.email.trim())                         e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.'
    return e
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear inline error as user types
    if (errors[name as keyof FieldErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      const firstKey = Object.keys(v)[0]
      document.getElementById(firstKey)?.focus()
      return
    }
    setStatus('sending')
    try {
      if (!formRef.current) throw new Error('Form ref missing')
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-paper"
    >
      <div className="container-content section">
        {/* Header */}
        <ScrollReveal>
          <p className="eyebrow text-caption">Contact</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-display-md font-semibold text-ink"
          >
            Let's build something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 max-w-2xl font-body text-body-lg text-muted">
            A role, a project, or just a conversation about design.
            I'm usually back within a day.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Form ─────────────────────────────────────────────────── */}
          <ScrollReveal delay={0.15}>
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center rounded-card bg-mist p-10 text-center">
                <h3 className="font-display text-[1.5rem] font-semibold text-ink">
                  Sent. I'll be back within 24 hours.
                </h3>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 inline-flex items-center gap-2 font-body text-caption text-caption transition-colors duration-150 hover:text-ink"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                aria-label="Contact form"
                className="flex flex-col gap-5"
              >
                {status === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-input border border-coral bg-coral-dim/10 px-4 py-3 font-body text-caption text-ink"
                  >
                    Something went wrong. Please try again, or email me directly.
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-body text-caption uppercase text-caption">
                    Name <span aria-hidden="true" className="text-coral">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`rounded-input border-[1.5px] bg-mist px-4 py-3.5 font-body text-body text-ink placeholder:text-caption focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral transition-colors duration-150 ${
                      errors.name ? 'border-coral' : 'border-rule focus:border-ink'
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" aria-live="polite" className="font-body text-caption text-coral">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-body text-caption uppercase text-caption">
                    Email <span aria-hidden="true" className="text-coral">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`rounded-input border-[1.5px] bg-mist px-4 py-3.5 font-body text-body text-ink placeholder:text-caption focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral transition-colors duration-150 ${
                      errors.email ? 'border-coral' : 'border-rule focus:border-ink'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" aria-live="polite" className="font-body text-caption text-coral">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-body text-caption uppercase text-caption">
                    Message <span aria-hidden="true" className="text-coral">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={onChange}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`rounded-input border-[1.5px] bg-mist px-4 py-3.5 font-body text-body text-ink placeholder:text-caption focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral transition-colors duration-150 resize-none ${
                      errors.message ? 'border-coral' : 'border-rule focus:border-ink'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" aria-live="polite" className="font-body text-caption text-coral">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-button bg-coral px-6 py-4 font-body text-base font-medium text-paper transition-colors duration-150 hover:bg-[#C43E1F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* ── Right column: cards + socials ────────────────────────── */}
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.2}>
              <a
                href="https://calendar.app.google/id6C7Yo52yfSXAqT9"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-card bg-mist p-7 transition-transform duration-200 ease-out hover:-translate-y-1 no-underline"
              >
                <div className="flex items-start justify-between">
                  <CalendarDays size={24} className="text-coral" aria-hidden="true" />
                  <ArrowUpRight
                    size={16}
                    className="text-caption transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-ink">
                  Book a 30-min call
                </h3>
                <p className="mt-1 font-body text-caption text-caption">
                  Google Calendar · Free
                </p>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.27}>
              <a
                href="/mariaelena-cossio-clark-resume.pdf"
                download="Mariaelena-Cossio-Clark-Resume.pdf"
                className="group block rounded-card bg-mist p-7 transition-transform duration-200 ease-out hover:-translate-y-1 no-underline"
              >
                <div className="flex items-start justify-between">
                  <FileText size={24} className="text-coral" aria-hidden="true" />
                  <span className="rounded-pill border border-rule bg-paper px-2.5 py-0.5 font-body text-caption text-caption">
                    PDF
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-ink">
                  Download resume
                </h3>
                <p className="mt-1 font-body text-caption text-caption">
                  UX/UI Designer · PDF · 2025
                </p>
              </a>
            </ScrollReveal>

            {/* Socials */}
            <ScrollReveal delay={0.34}>
              <ul role="list" className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 font-body text-caption text-caption transition-colors duration-150 hover:text-ink no-underline"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

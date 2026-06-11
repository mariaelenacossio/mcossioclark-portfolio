'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  CalendarDays, FileText, Linkedin, Github, Mail, Loader2,
} from 'lucide-react'
import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * Editorial Bold MC — Contact section.
 *
 *  - bg-ink (dark), py-28 md:py-36
 *  - Eyebrow (coral) + Bebas display headline
 *  - 2-col layout: form on left, action cards stacked on right
 *  - Form: dark card inputs with coral focus border + coral submit button
 *  - Action cards: dark card surfaces with coral icons
 *  - Social row at the bottom of the right column
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
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): FieldErrors => {
    const e: FieldErrors = {}
    if (!form.name.trim())  e.name  = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.'
    }
    return e
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FieldErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      document.getElementById(Object.keys(v)[0])?.focus()
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

  /* Shared input styling for all 3 fields. */
  const inputBase =
    'w-full rounded-xl border bg-card px-5 py-4 font-body text-body text-paper placeholder:text-ghost/40 outline-none transition-colors duration-150 focus:border-coral'
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? 'border-coral/70' : 'border-card'}`

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ink py-28 md:py-36"
    >
      <div className="container-content">

        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Contact
          </span>
          <h2
            id="contact-heading"
            className="mt-3 max-w-[800px] font-display text-display uppercase leading-none text-paper"
          >
            Got a role, a project, or just a question about how I work? I read everything.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_380px]">

            {/* ── Form ───────────────────────────────────────────────── */}
            {status === 'success' ? (
              <div className="flex items-center justify-center rounded-2xl bg-card p-12">
                <p className="font-display text-display uppercase text-paper text-center">
                  Sent. Back within 24 hours.
                </p>
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
                    className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 font-body text-caption text-coral"
                  >
                    Something went wrong. Please try again, or email me directly.
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Name
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
                    className={inputClass(!!errors.name)}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Email
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
                    className={inputClass(!!errors.email)}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Message
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
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder="Tell me about your project, role, or question."
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-4 font-body font-medium text-paper transition-colors duration-150 hover:bg-[#B83D21] ${
                    status === 'sending' ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Sending
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            )}

            {/* ── Right: action cards + socials ──────────────────────── */}
            <div className="flex flex-col gap-4">

              <a
                href="https://calendar.app.google/id6C7Yo52yfSXAqT9"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-card bg-card p-7 no-underline transition-colors duration-200 hover:border-coral/20"
              >
                <CalendarDays size={22} className="text-coral" aria-hidden="true" />
                <h3 className="mt-3 font-display text-title uppercase leading-none text-paper">
                  Book a 30-min call
                </h3>
                <p className="mt-1 font-body text-caption text-ghost">
                  Google Calendar · Free
                </p>
              </a>

              <a
                href="/mariaelena-cossio-clark-resume.pdf"
                download="Mariaelena-Cossio-Clark-Resume.pdf"
                className="group block rounded-2xl border border-card bg-card p-7 no-underline transition-colors duration-200 hover:border-coral/20"
              >
                <FileText size={22} className="text-coral" aria-hidden="true" />
                <h3 className="mt-3 font-display text-title uppercase leading-none text-paper">
                  Download resume
                </h3>
                <p className="mt-1 font-body text-caption text-ghost">
                  UX/UI Designer · PDF · 2025
                </p>
              </a>

              {/* Socials row */}
              <ul role="list" className="mt-6 flex gap-6">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 font-body text-caption text-ghost no-underline transition-colors duration-150 hover:text-paper"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

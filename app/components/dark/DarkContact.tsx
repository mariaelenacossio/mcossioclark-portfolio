'use client'

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  CalendarDays, FileText, Linkedin, Github, Mail, Loader2, AlertCircle, Check,
} from 'lucide-react'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

/**
 * Dark-redesign Contact section. Same logic, same EmailJS config, same
 * success/error states as the live Contact.tsx - only the visual system
 * changes. The success-pulse/error-shake button animations are kept:
 * they're the form's pre-existing functional state-indication motion
 * (already shipped, already approved in an earlier pass), not new
 * decorative motion, so "pass one, no motion" doesn't apply to them.
 *
 * Color note (approved pass-one feedback): the transient "sent" button
 * state is now the same white primary pill as idle, with a small
 * semantic-success check glyph - not a green button surface. That keeps
 * semantic-success scoped to "glyph fill, not surface" per DESIGN.md's
 * literal spec, resolving the deviation flagged in pass one. Error state
 * is unchanged: icon + text + aria-live, no color, since DESIGN.md has
 * no semantic-error token.
 *
 * Pass two: the section fades/slides in once on scroll (ScrollReveal).
 */

const EMAILJS_SERVICE_ID  = 'service_6y1v4fl'
const EMAILJS_TEMPLATE_ID = 'template_h21q9f2'
const EMAILJS_PUBLIC_KEY  = 'SnvNb_Z2_pFivYnV0'

const SOCIALS = [
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mariaelena-cossio-clark/' },
  { Icon: Github,   label: 'GitHub',   href: 'https://github.com/mariaelenacossio' },
  { Icon: Mail,     label: 'Email',    href: 'mailto:mariaelena.cossio@outlook.com' },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

const inputClasses = (hasError: boolean) =>
  `w-full rounded-dr-md border bg-dr-surface-1 px-dr-md py-dr-sm font-dr-body text-dr-body text-dr-ink outline-none placeholder:text-dr-ink-muted/50 ${
    hasError ? 'border-dr-ink-muted' : 'border-dr-hairline focus:border-dr-accent-blue'
  }`

export default function DarkContact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (status !== 'sent') return
    const t = setTimeout(() => setStatus('success'), 3000)
    return () => clearTimeout(t)
  }, [status])

  const validate = (): FieldErrors => {
    const e: FieldErrors = {}
    if (!form.name.trim())  e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message needs at least 10 characters.'
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
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const sendButton = {
    sending: { color: 'bg-dr-surface-2', dim: true,  disabled: true  },
    sent:    { color: 'bg-dr-primary',   dim: false, disabled: true  },
    error:   { color: 'bg-dr-surface-2', dim: false, disabled: false },
    idle:    { color: 'bg-dr-primary',   dim: false, disabled: false },
    success: { color: 'bg-dr-primary',   dim: false, disabled: false },
  }[status]
  const buttonTextColor =
    status === 'idle' || status === 'success' || status === 'sent' ? 'text-dr-on-primary' : 'text-dr-ink'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-dr-surface-1 px-dr-xl py-dr-section">
      <ScrollReveal className="mx-auto max-w-[1199px]">
        <span className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
          Contact
        </span>

        <h2 id="contact-heading" className="mt-dr-sm max-w-[680px] font-dr-display text-dr-display-md text-dr-ink">
          Working on something? Let&apos;s talk.
        </h2>

        <p className="mt-dr-md max-w-[500px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
          Whether it is a role, a project, or a question about how I
          work, I read everything and I am usually fast.
        </p>

        <div className="mt-dr-xl grid grid-cols-1 gap-dr-xxl md:grid-cols-[1fr_340px]">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center rounded-dr-xl bg-dr-surface-2 p-dr-xxl text-center">
              <p className="font-dr-display text-dr-subhead font-medium text-dr-ink">
                Sent. I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-dr-lg font-dr-body text-dr-caption text-dr-ink-muted hover:text-dr-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-dr-lg">
              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-dr-sm rounded-dr-md border border-dr-hairline bg-dr-surface-2 px-dr-md py-dr-sm font-dr-body text-dr-caption text-dr-ink"
                >
                  <AlertCircle size={16} aria-hidden="true" className="shrink-0 text-dr-ink-muted" />
                  Something went wrong. Please try again, or email me directly.
                </div>
              )}

              <div>
                <label htmlFor="name" className="mb-dr-xs block font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                  Name *
                </label>
                <input
                  id="name" name="name" type="text" autoComplete="name" required
                  value={form.name} onChange={onChange}
                  aria-required="true" aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClasses(!!errors.name)}
                />
                {errors.name && (
                  <p id="name-error" role="alert" aria-live="polite" className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-dr-xs block font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                  Email *
                </label>
                <input
                  id="email" name="email" type="email" autoComplete="email" required
                  value={form.email} onChange={onChange}
                  aria-required="true" aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClasses(!!errors.email)}
                />
                {errors.email && (
                  <p id="email-error" role="alert" aria-live="polite" className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-dr-xs block font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                  Message *
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={form.message} onChange={onChange}
                  aria-required="true" aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClasses(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" aria-live="polite" className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sendButton.disabled}
                aria-busy={status === 'sending' || status === 'sent'}
                className={`mt-dr-xs w-full rounded-dr-pill py-dr-md font-dr-body font-medium disabled:cursor-not-allowed ${sendButton.color} ${buttonTextColor} ${sendButton.dim ? 'opacity-50' : ''} ${status === 'sent' ? 'motion-safe:animate-success-pulse' : ''} ${status === 'error' ? 'motion-safe:animate-error-shake' : ''}`}
              >
                {status === 'sending' && (
                  <span className="inline-flex items-center gap-dr-xs">
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending
                  </span>
                )}
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-dr-xs">
                    <Check size={16} className="text-dr-success" aria-hidden="true" />
                    Sent
                  </span>
                )}
                {status === 'error' && 'Try again'}
                {status === 'idle' && 'Send it'}
              </button>
              <span className="sr-only" aria-live="polite">
                {status === 'sent' ? 'Message sent.' : ''}
              </span>
            </form>
          )}

          <div>
            <a
              href="https://calendar.app.google/id6C7Yo52yfSXAqT9"
              target="_blank" rel="noopener noreferrer"
              className="block rounded-dr-xl border border-dr-hairline bg-dr-surface-2 p-dr-lg no-underline"
            >
              <CalendarDays size={20} className="text-dr-ink-muted" aria-hidden="true" />
              <h3 className="mt-dr-sm font-dr-body text-sm font-semibold text-dr-ink">Book a 30-min call</h3>
              <p className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">Google Calendar · Free</p>
            </a>

            <a
              href="/mariaelena-cossio-clark-resume.pdf"
              download="Mariaelena-Cossio-Clark-Resume.pdf"
              className="mt-dr-sm block rounded-dr-xl border border-dr-hairline bg-dr-surface-2 p-dr-lg no-underline"
            >
              <FileText size={20} className="text-dr-ink-muted" aria-hidden="true" />
              <h3 className="mt-dr-sm font-dr-body text-sm font-semibold text-dr-ink">Download resume</h3>
              <p className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">UX/UI Designer · PDF · 2025</p>
            </a>

            <div className="mt-dr-lg flex gap-dr-lg">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-dr-xxs font-dr-body text-sm text-dr-ink-muted no-underline hover:text-dr-ink"
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

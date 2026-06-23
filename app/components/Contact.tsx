'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  CalendarDays, FileText, Linkedin, Github, Mail, Loader2,
} from 'lucide-react'

/**
 * Contact. Mist background, form on the left, action cards on the
 * right. EmailJS config carried over unchanged.
 */

const EMAILJS_SERVICE_ID  = 'service_6y1v4fl'
const EMAILJS_TEMPLATE_ID = 'template_h21q9f2'
const EMAILJS_PUBLIC_KEY  = 'SnvNb_Z2_pFivYnV0'

const SOCIALS = [
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mariaelena-cossio-clark/' },
  { Icon: Github,   label: 'GitHub',   href: 'https://github.com/mariaelenacossio' },
  { Icon: Mail,     label: 'Email',    href: 'mailto:mariaelena.cossio@outlook.com' },
] as const

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

const inputClasses = (hasError: boolean) =>
  `w-full rounded-xl border bg-paper px-5 py-4 font-body text-body text-ink outline-none transition-colors duration-150 placeholder:text-ghost/40 ${
    hasError ? 'border-coral/60' : 'border-line focus:border-ink'
  }`

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

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
      className="bg-mist py-24 md:py-32"
    >
      <div className="container-content">
        <>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Contact
          </span>

          <h2
            id="contact-heading"
            className="mt-3 max-w-[680px] font-display text-display italic leading-tight text-ink"
          >
            Working on something? Let&apos;s talk.
          </h2>

          <p className="mt-4 max-w-[500px] font-body text-body-lg leading-relaxed text-ghost">
            Whether it is a role, a project, or a question about
            how I work, I read everything and I am usually fast.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_340px]">

            {/* Form */}
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-paper p-10 text-center shadow-warm">
                <p className="font-display text-2xl italic text-ink">
                  Sent. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-5 font-body text-caption text-ghost transition-colors duration-150 hover:text-ink"
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
                    className="rounded-xl border border-coral/60 bg-paper px-5 py-3 font-body text-caption text-ink"
                  >
                    Something went wrong. Please try again, or email me directly.
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Name *
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
                    className={inputClasses(!!errors.name)}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Email *
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
                    className={inputClasses(!!errors.email)}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-body text-caption uppercase tracking-widest text-ghost">
                    Message *
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
                    className={`${inputClasses(!!errors.message)} resize-none`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" aria-live="polite" className="mt-1 font-body text-caption text-coral">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="mt-2 w-full rounded-full bg-ink py-4 font-body font-medium text-paper transition-colors duration-200 hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Sending
                    </span>
                  ) : (
                    'Send it'
                  )}
                </button>
              </form>
            )}

            {/* Action cards + socials */}
            <div>
              <a
                href="https://calendar.app.google/id6C7Yo52yfSXAqT9"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-line bg-paper p-6 shadow-warm transition-all duration-200 hover:-translate-y-1 hover:shadow-warm-hover no-underline"
              >
                <CalendarDays size={20} className="text-coral" aria-hidden="true" />
                <h3 className="mt-3 font-body text-sm font-semibold text-ink">
                  Book a 30-min call
                </h3>
                <p className="mt-1 font-body text-caption text-ghost">
                  Google Calendar · Free
                </p>
              </a>

              <a
                href="/mariaelena-cossio-clark-resume.pdf"
                download="Mariaelena-Cossio-Clark-Resume.pdf"
                className="mt-4 block rounded-2xl border border-line bg-paper p-6 shadow-warm transition-all duration-200 hover:-translate-y-1 hover:shadow-warm-hover no-underline"
              >
                <FileText size={20} className="text-coral" aria-hidden="true" />
                <h3 className="mt-3 font-body text-sm font-semibold text-ink">
                  Download resume
                </h3>
                <p className="mt-1 font-body text-caption text-ghost">
                  UX/UI Designer · PDF · 2025
                </p>
              </a>

              <div className="mt-6 flex gap-5">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 font-body text-sm text-ghost transition-colors duration-150 hover:text-ink no-underline"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  )
}

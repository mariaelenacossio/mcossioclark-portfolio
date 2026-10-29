'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'

/* Endpoint + anon key are public values, injected at build time. */
const ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/functions/v1/assistant`
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const HINTS = [
  'What did she build for Mini Pancake Co.?',
  'How does she approach accessibility?',
  'What\'s the BEYOND design system about?',
] as const

type Msg = { role: 'user' | 'assistant'; text: string }

/**
 * Embedded portfolio assistant. Floating launcher + chat panel, answers
 * from the Supabase edge function (gte-small retrieval + Claude Haiku under
 * the guardrail prompt). Motion is functional only (panel reveal, gated by
 * motion-safe) — the project-grid card hover remains the one signature
 * interaction on the Milan Reed pages.
 *
 * `dark`: renders on dr- tokens instead of the Milan Reed palette.
 * Defaults to false, so every page except the dark-redesign homepage
 * (the only caller that passes dark) is completely unaffected. Existing
 * transitions (panel reveal, hover colors) are kept as-is here - they're
 * pre-existing, already-approved motion, not new decorative motion.
 */
export default function Assistant({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [entered, setEntered] = useState(false)

  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const everOpened = useRef(false)

  /* Focus management: input on open, launcher on close (after first open). */
  useEffect(() => {
    if (open) {
      everOpened.current = true
      inputRef.current?.focus()
    } else if (everOpened.current) {
      launcherRef.current?.focus()
    }
  }, [open])

  /* Panel reveal — motion-safe; reduced-motion paints final state at once. */
  useEffect(() => {
    if (!open) { setEntered(false); return }
    const r = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(r)
  }, [open])

  /* Hints appear ~3s after open, only while the conversation is empty. */
  useEffect(() => {
    if (!open || messages.length > 0) return
    const t = setTimeout(() => setShowHints(true), 3000)
    return () => clearTimeout(t)
  }, [open, messages.length])

  /* Esc closes. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* External open trigger - lets a teaser card elsewhere in the tree
     (no direct parent/child relationship to this component) open the
     same panel, without prop-drilling or a context rewrite. Behavior
     only; this component's own styling is untouched. */
  useEffect(() => {
    const onExternalOpen = () => setOpen(true)
    window.addEventListener('open-assistant', onExternalOpen)
    return () => window.removeEventListener('open-assistant', onExternalOpen)
  }, [])

  /* Keep the latest message in view. */
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, loading])

  async function send(text: string) {
    const q = text.trim()
    if (!q || loading) return
    setShowHints(false)
    setMessages(m => [...m, { role: 'user', text: q }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ANON}`,
          apikey: ANON,
        },
        body: JSON.stringify({ message: q }),
      })
      const data = await res.json().catch(() => ({}))
      const answer = data.answer ?? data.error ?? 'Something went wrong. Please try again.'
      setMessages(m => [...m, { role: 'assistant', text: answer }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <>
      {/* Launcher (always mounted so focus can return to it on close) */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={
          dark
            ? `fixed bottom-5 right-5 z-50 ${open ? 'hidden' : 'inline-flex'} items-center gap-2 rounded-dr-pill border border-dr-hairline bg-dr-primary px-5 py-3 font-dr-body text-sm font-medium text-dr-on-primary transition-colors duration-200 hover:bg-dr-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dr-accent-blue no-underline`
            : `fixed bottom-5 right-5 z-50 ${open ? 'hidden' : 'inline-flex'} items-center gap-2 rounded-full bg-coral px-5 py-3 font-body text-sm font-medium text-paper shadow-warm transition-colors duration-200 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral no-underline`
        }
      >
        <span aria-hidden="true">💬</span> Ask about my work
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Mariaelena's work"
          className={
            dark
              ? `fixed bottom-5 right-5 z-50 flex h-[min(32rem,80vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-dr-xl border border-dr-hairline bg-dr-canvas motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out-expo ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
              : `fixed bottom-5 right-5 z-50 flex h-[min(32rem,80vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-warm motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out-expo ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
          }
        >
          {/* Header */}
          <div className={`flex items-center justify-between border-b px-4 py-3 ${dark ? 'border-dr-hairline' : 'border-line'}`}>
            <p className={dark ? 'font-dr-display text-base font-medium leading-none text-dr-ink' : 'font-display text-title italic leading-none text-ink'}>
              Ask about my work
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className={
                dark
                  ? 'rounded-full p-1 text-dr-ink-muted transition-colors duration-150 hover:text-dr-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dr-accent-blue'
                  : 'rounded-full p-1 text-ghost transition-colors duration-150 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
              }
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages (live region) */}
          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <p className={dark ? 'font-dr-body text-dr-caption leading-relaxed text-dr-ink-muted' : 'font-body text-caption leading-relaxed text-ghost'}>
                Ask about Mariaelena&apos;s projects, process, or approach.
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={
                    dark
                      ? `inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 font-dr-body text-dr-body leading-relaxed ${m.role === 'user' ? 'bg-dr-surface-2 text-dr-ink' : 'bg-dr-surface-1 text-dr-ink'}`
                      : `inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 font-body text-body leading-relaxed ${m.role === 'user' ? 'bg-ink text-paper' : 'bg-mist text-ink'}`
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <span className={
                  dark
                    ? 'inline-block rounded-2xl bg-dr-surface-1 px-3.5 py-2 font-dr-body text-dr-body text-dr-ink-muted motion-safe:animate-pulse'
                    : 'inline-block rounded-2xl bg-mist px-3.5 py-2 font-body text-body text-ghost motion-safe:animate-pulse'
                }>
                  Thinking…
                </span>
              </div>
            )}
          </div>

          {/* Prompt hints — appear ~3s after open, clear on first message */}
          {showHints && messages.length === 0 && (
            <div className="flex flex-col gap-2 px-4 pb-2">
              {HINTS.map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => send(h)}
                  className={
                    dark
                      ? 'rounded-full border border-dr-hairline bg-dr-surface-1 px-3 py-1.5 text-left font-dr-body text-dr-caption text-dr-ink transition-colors duration-150 hover:border-dr-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dr-accent-blue'
                      : 'rounded-full border border-line bg-mist px-3 py-1.5 text-left font-body text-caption text-ink transition-colors duration-150 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
                  }
                >
                  {h}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className={`flex items-center gap-2 border-t p-3 ${dark ? 'border-dr-hairline' : 'border-line'}`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
              className={
                dark
                  ? 'min-w-0 flex-1 rounded-full border border-dr-hairline bg-dr-surface-1 px-4 py-2 font-dr-body text-dr-body text-dr-ink placeholder:text-dr-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dr-accent-blue'
                  : 'min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 font-body text-body text-ink placeholder:text-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-coral'
              }
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className={
                dark
                  ? 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dr-primary text-dr-on-primary transition-colors duration-150 hover:bg-dr-ink-muted disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dr-accent-blue'
                  : 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-paper transition-colors duration-150 hover:bg-ink disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
              }
            >
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

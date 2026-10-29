'use client'

import { MessageCircle } from 'lucide-react'

/**
 * The one gradient-spotlight-card on the dark-redesign homepage.
 * Dispatches `open-assistant`, which Assistant.tsx listens for (see that
 * file's "external open trigger" effect) - opens the same panel the
 * floating launcher controls, no restyling of Assistant itself.
 */
export default function AssistantTeaserCard() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-assistant'))}
      className="flex flex-col items-start justify-between gap-dr-xl rounded-dr-xxl bg-dr-gradient-violet p-dr-xl text-left md:col-span-2 md:flex-row md:items-center"
    >
      <div>
        <MessageCircle size={28} aria-hidden="true" className="text-dr-ink" />
        <p className="mt-dr-sm font-dr-display text-dr-subhead font-medium text-dr-ink">
          Ask me about my work
        </p>
        <p className="mt-dr-xxs max-w-[440px] font-dr-body text-dr-body text-dr-ink/80">
          An assistant trained only on what I&apos;ve actually built - ask about any project, my process, or how I approach accessibility.
        </p>
      </div>
      <span className="inline-flex items-center gap-dr-xxs rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary">
        Start a conversation
      </span>
    </button>
  )
}

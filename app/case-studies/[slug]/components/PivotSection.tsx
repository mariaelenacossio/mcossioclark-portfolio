import { Check } from 'lucide-react'
import type { ProjectPivot } from '@/lib/types'

interface PivotSectionProps {
  pivot: ProjectPivot
  /** Section anchor id - used by the TOC. */
  id:    string
}

/**
 * One pivot block in the featured case study.
 *
 * Structure (top to bottom):
 *   <h2>  Pivot 01 - Architecture
 *   <p>   The problem
 *   <h3>  Options I considered
 *   <ul>  3 options - the chosen one wears a coral border + check icon
 *   <h3>  What I shipped & why
 *   <p>   The decision
 *
 * Renders entirely server-side. No JS for the options grid.
 */
export default function PivotSection({ pivot, id }: PivotSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl italic text-ink mb-6">
        <span className="text-coral">Pivot {pivot.n}</span> · {pivot.challenge}
      </h2>

      <p className="font-body text-body text-ghost leading-[1.7] mb-8">
        {pivot.problem}
      </p>

      {/* Options considered */}
      <h3 className="font-display text-title italic text-ink mb-4">
        Options I considered
      </h3>

      <ul role="list" className="flex flex-col gap-3 mb-8">
        {pivot.options.map((opt, i) => (
          <li
            key={i}
            className={`rounded-2xl p-5 transition-colors ${
              opt.chosen
                ? 'border-[1.5px] border-coral bg-coral/[0.04]'
                : 'border border-line bg-paper'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Marker - check for chosen, letter for not */}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  opt.chosen
                    ? 'bg-coral text-paper'
                    : 'border border-line bg-mist text-caption'
                }`}
                aria-hidden="true"
              >
                {opt.chosen
                  ? <Check size={14} strokeWidth={3} />
                  : <span className="font-body text-caption">{String.fromCharCode(65 + i)}</span>
                }
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-ink leading-snug">
                  {opt.label}
                  {opt.chosen && (
                    <span className="ml-2 inline-block rounded-full bg-coral px-2 py-0.5 font-body text-caption uppercase text-paper align-middle">
                      Chosen
                    </span>
                  )}
                </p>
                <p className="mt-1.5 font-body text-body text-ghost leading-[1.6]">
                  {opt.tradeoff}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Decision */}
      <h3 className="font-display text-title italic text-ink mb-4">
        What I shipped &amp; why
      </h3>
      <p className="font-body text-body text-ghost leading-[1.7]">
        {pivot.decision}
      </p>
    </section>
  )
}

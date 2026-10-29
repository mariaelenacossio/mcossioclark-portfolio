import { Check } from 'lucide-react'
import type { ProjectPivot } from '@/lib/types'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

interface DarkPivotSectionProps {
  pivot: ProjectPivot
  /** Section anchor id. */
  id: string
}

/**
 * Dark-redesign pivot block. Same structure/content as the light
 * PivotSection. The "chosen" option is a white border + a white badge
 * with a Check icon, AND keeps the "Chosen" text label - it never
 * depends on color alone to communicate which option was picked. No
 * coral, no new accent color invented for this.
 */
export default function DarkPivotSection({ pivot, id }: DarkPivotSectionProps) {
  return (
    <ScrollReveal>
      <section id={id} className="scroll-mt-24">
        <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
          Pivot {pivot.n} · {pivot.challenge}
        </h2>

        <p className="mb-dr-xl font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
          {pivot.problem}
        </p>

        <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
          Options I considered
        </h3>

        <ul role="list" className="mb-dr-xl flex flex-col gap-dr-sm">
          {pivot.options.map((opt, i) => (
            <li
              key={i}
              className={`rounded-dr-lg p-dr-lg ${
                opt.chosen
                  ? 'border border-dr-primary bg-dr-surface-2'
                  : 'border border-dr-hairline bg-dr-surface-1'
              }`}
            >
              <div className="flex items-start gap-dr-md">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    opt.chosen
                      ? 'bg-dr-primary text-dr-on-primary'
                      : 'border border-dr-hairline bg-dr-surface-2 text-dr-ink-muted'
                  }`}
                  aria-hidden="true"
                >
                  {opt.chosen
                    ? <Check size={14} strokeWidth={3} />
                    : <span className="font-dr-body text-dr-caption">{String.fromCharCode(65 + i)}</span>
                  }
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-dr-body font-semibold leading-snug text-dr-ink">
                    {opt.label}
                    {opt.chosen && (
                      <span className="ml-dr-sm inline-block rounded-dr-pill bg-dr-primary px-dr-sm py-[2px] align-middle font-dr-body text-dr-caption uppercase text-dr-on-primary">
                        Chosen
                      </span>
                    )}
                  </p>
                  <p className="mt-dr-xxs font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                    {opt.tradeoff}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
          What I shipped &amp; why
        </h3>
        <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
          {pivot.decision}
        </p>
      </section>
    </ScrollReveal>
  )
}

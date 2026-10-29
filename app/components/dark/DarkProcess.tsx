/**
 * Dark-redesign Process section. Same content/copy as the live
 * Process.tsx. Pass one only, no motion.
 */
const STEPS = [
  { number: '01', title: 'Discover', body: 'Listen first. Interviews, recordings, analytics. The actual problem is rarely the stated one.' },
  { number: '02', title: 'Define', body: 'Turn the research into something everyone agrees on before opening Figma. Saves most of the revision cycles.' },
  { number: '03', title: 'Design', body: 'Lo-fi first, every time. Test early, find the gaps, then refine. By the time it looks polished it has been validated.' },
  { number: '04', title: 'Deliver', body: 'Clean specs, annotated files, and code when the handoff actually matters. I stay close until it is live.' },
] as const

const OUTCOMES = [
  'One-tap WhatsApp checkout',
  'Self-serve booking, not DMs',
  'WCAG 2.1 AA, audited with WAVE',
  '3 projects, designed and built',
] as const

export default function DarkProcess() {
  return (
    <section id="process" aria-labelledby="process-heading" className="px-dr-xl py-dr-section">
      <div className="mx-auto max-w-[1199px]">
        <span className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
          Process
        </span>

        <h2 id="process-heading" className="mt-dr-sm font-dr-display text-dr-display-md text-dr-ink">
          Same four steps every time. Boring on purpose.
        </h2>

        <p className="mt-dr-md max-w-[420px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
          The results are less boring.
        </p>

        <div className="mt-dr-xl grid grid-cols-1 gap-dr-lg md:grid-cols-2">
          {STEPS.map(step => (
            <div key={step.number} className="relative overflow-hidden rounded-dr-xl bg-dr-surface-1 p-dr-xl">
              <span
                className="pointer-events-none absolute right-dr-lg top-dr-md select-none font-dr-display text-[4.5rem] font-medium leading-none text-dr-ink/5"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3 className="font-dr-display text-dr-subhead font-medium text-dr-ink">{step.title}</h3>

              <p className="mt-dr-sm max-w-[320px] font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-dr-xl grid grid-cols-1 gap-dr-lg rounded-dr-xl bg-dr-surface-1 p-dr-xl text-center sm:grid-cols-2 md:grid-cols-4">
          {OUTCOMES.map(line => (
            <p key={line} className="font-dr-display text-[1.375rem] font-medium leading-tight text-dr-ink">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

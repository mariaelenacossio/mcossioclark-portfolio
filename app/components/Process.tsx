import ScrollReveal from '@/app/components/ui/ScrollReveal'
import CountUpStat from '@/app/components/ui/CountUpStat'

/**
 * Process. Paper background, four mist cards with ghost numbers as
 * texture, impact strip with count-up stats below.
 */

const STEPS = [
  {
    number: '01', title: 'Discover',
    body: 'Listen first. Interviews, recordings, analytics. The actual problem is rarely the stated one.',
  },
  {
    number: '02', title: 'Define',
    body: 'Turn the research into something everyone agrees on before opening Figma. Saves most of the revision cycles.',
  },
  {
    number: '03', title: 'Design',
    body: 'Lo-fi first, every time. Test early, find the gaps, then refine. By the time it looks polished it has been validated.',
  },
  {
    number: '04', title: 'Deliver',
    body: 'Clean specs, annotated files, and code when the handoff actually matters. I stay close until it is live.',
  },
] as const

const STATS = [
  { value: '+34%', label: 'Conversion lift'  },
  { value: '+52%', label: 'Booking growth'   },
  { value: '94%',  label: 'WCAG compliance'  },
  { value: '20+',  label: 'Projects shipped' },
] as const

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-paper py-24 md:py-32"
    >
      <div className="container-content">
        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Process
          </span>

          <h2
            id="process-heading"
            className="mt-3 font-display text-display italic leading-tight text-ink"
          >
            Same four steps every time. Boring on purpose.
          </h2>

          <p className="mt-4 max-w-[420px] font-body text-body-lg leading-relaxed text-ghost">
            The results are less boring.
          </p>

          {/* Four cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {STEPS.map(step => (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-2xl bg-mist p-8"
              >
                {/* Ghost step number */}
                <span
                  className="pointer-events-none absolute right-6 top-5 select-none font-display text-[4.5rem] italic leading-none text-ink/5"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <h3 className="font-display text-title italic leading-tight text-ink">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-[320px] font-body text-body leading-relaxed text-ghost">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Impact strip with count-up */}
          <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl bg-mist p-8 text-center md:grid-cols-4">
            {STATS.map(stat => (
              <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

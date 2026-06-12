import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * Editorial Bold MC - Process section.
 *
 *  - bg-stone, py-28 md:py-36
 *  - Eyebrow (coral) + Bebas display headline
 *  - 4 paper-colored cards in a 2×2 grid (single col mobile),
 *    each with a giant ghost number top-right
 *  - Impact strip below: 4 stats with coral numbers
 */

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'Listen before everything. Interviews, audits, recordings. The actual problem is rarely in the brief.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'Turn raw research into a problem statement. Get alignment before opening Figma. Saves most of the revision cycles.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Lo-fi first, always. Sketch, test early, find the gaps. By the time something looks polished it has been validated multiple times.',
  },
  {
    n: '04',
    title: 'Deliver',
    body: "Clean specs, real handoffs, and code when it matters. When I build it I stay close until it's live.",
  },
] as const

const IMPACT = [
  { value: '+34%', label: 'Conversion lift'   },
  { value: '+52%', label: 'Booking growth'    },
  { value: '94%',  label: 'WCAG compliance'   },
  { value: '20+',  label: 'Projects shipped'  },
]

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-stone py-28 md:py-36"
    >
      <div className="container-content">

        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Process
          </span>
          <h2
            id="process-heading"
            className="mt-3 font-display text-display uppercase leading-none text-ink"
          >
            The process is boring on purpose. The results aren&apos;t.
          </h2>

          {/* 4 cards - 2×2 grid on desktop */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {STEPS.map(s => (
              <article
                key={s.n}
                className="relative overflow-hidden rounded-2xl bg-paper p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-[5rem] leading-none text-ink/5"
                >
                  {s.n}
                </span>
                <h3 className="relative font-display text-title uppercase leading-none text-ink">
                  {s.title}
                </h3>
                <p className="relative mt-3 font-body text-body text-ghost">
                  {s.body}
                </p>
              </article>
            ))}
          </div>

          {/* Impact strip */}
          <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl bg-paper p-8 md:grid-cols-4">
            {IMPACT.map(s => (
              <div key={s.label}>
                <span className="block font-display text-[2.5rem] leading-none text-coral">
                  {s.value}
                </span>
                <span className="mt-1 block font-body text-caption uppercase tracking-wider text-ghost">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

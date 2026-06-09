import ScrollReveal from '@/app/components/ui/ScrollReveal'
import { processSteps } from '@/data/projects'

/**
 * Process section.
 *
 * Per spec:
 *  - Background --color-mist
 *  - Eyebrow + headline (display-md) + subhead
 *  - 4 steps as a horizontal timeline desktop / vertical stack mobile
 *  - Each step: 48px circle (2px rule border, paper bg, coral number);
 *    on hover the circle fills coral and the number turns paper
 *  - Thin horizontal rule connects the circle midpoints (desktop)
 *  - Impact strip below with 4 stats
 */

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
      className="bg-mist"
    >
      <div className="container-content section">
        {/* Header */}
        <ScrollReveal>
          <p className="eyebrow text-caption">Process</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            id="process-heading"
            className="mt-4 font-display text-display-md font-semibold text-ink"
          >
            Same process every time. Because it works.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 max-w-2xl font-body text-body-lg text-muted">
            Understand the problem before touching Figma. Validate before
            building. Stay close through delivery.
          </p>
        </ScrollReveal>

        {/* Steps — horizontal timeline */}
        <div className="relative mt-16">
          {/* Connecting rule, runs through the midpoints of the circles.
              Hidden on mobile (vertical stack). */}
          <div
            className="absolute left-0 right-0 hidden h-px bg-rule md:block"
            style={{ top: '24px' /* half of 48px circle */ }}
            aria-hidden="true"
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.1 + i * 0.08}>
                <div className="group relative">
                  {/* Circle */}
                  <div
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-rule bg-paper transition-colors duration-150 group-hover:border-coral group-hover:bg-coral"
                  >
                    <span className="font-display font-semibold text-coral transition-colors duration-150 group-hover:text-paper">
                      {step.number}
                    </span>
                  </div>

                  {/* Step content */}
                  <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[220px] font-body text-body text-muted">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Impact strip */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 flex flex-wrap items-stretch divide-x divide-rule overflow-hidden rounded-card border border-rule bg-paper">
            {IMPACT.map(s => (
              <div
                key={s.label}
                className="flex flex-1 flex-col gap-1 px-6 py-6 min-w-[140px]"
              >
                <span className="font-display text-[1.5rem] font-bold leading-none text-ink">
                  {s.value}
                </span>
                <span className="font-body text-caption uppercase text-caption">
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

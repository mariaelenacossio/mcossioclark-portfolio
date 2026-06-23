
/**
 * How I work with AI. Director/crew framing, mist background, three
 * paper cards with large ghost numbers as background texture.
 */

const STEPS = [
  {
    number: '01',
    title: 'Research synthesis',
    body: 'I feed raw interview transcripts into pipelines I have built. Themes surface in minutes. What I do with them takes longer.',
  },
  {
    number: '02',
    title: 'Rapid prototyping',
    body: 'Describe the interaction, get a working prototype back. Review, redirect, refine. The judgment is mine. The production layer is delegated.',
  },
  {
    number: '03',
    title: 'Shipping with agents',
    body: 'Components, copy variants, accessibility audits. I am the captain. The agents are the crew. Someone still has to know where the ship is going.',
  },
] as const

const TOOLS = ['Claude', 'Cursor', 'v0', 'Framer', 'GitHub Copilot', 'Figma AI']

export default function HowIWork() {
  return (
    <section
      id="ai-workflow"
      aria-labelledby="ai-heading"
      className="bg-mist py-24 md:py-32"
    >
      <div className="container-content">
        <>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            How I work with AI
          </span>

          <h2
            id="ai-heading"
            className="mt-3 max-w-[680px] font-display text-display italic leading-tight text-ink"
          >
            I use AI the way a director uses a crew.
          </h2>

          <p className="mt-4 max-w-[540px] font-body text-body-lg leading-relaxed text-ghost">
            I&apos;m not faster because of AI. I&apos;m capable of more.
            Research synthesis, rapid prototyping, accessibility
            audits, I have agent workflows for all of it. My job
            is knowing what to build and whether the output is
            any good.
          </p>

          {/* Three cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map(step => (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-2xl bg-paper p-8 shadow-warm"
              >
                {/* Ghost number texture */}
                <span
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[7rem] italic leading-none text-ink/5"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <span className="font-body text-caption uppercase tracking-widest text-coral">
                  {step.number}
                </span>

                <h3 className="mt-2 font-display text-title italic leading-tight text-ink">
                  {step.title}
                </h3>

                <p className="mt-3 font-body text-body leading-relaxed text-ghost">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Tool pills */}
          <div className="mt-8">
            <p className="mb-3 font-body text-caption uppercase tracking-widest text-ghost">
              Tools I direct
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map(tool => (
                <span
                  key={tool}
                  className="rounded-full border border-line bg-mist px-4 py-1.5 font-body text-caption text-ghost"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </>
      </div>
    </section>
  )
}

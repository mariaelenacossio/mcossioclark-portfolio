import Image from 'next/image'
import { Search, Code2, Layers, Cpu } from 'lucide-react'
import { bio } from '@/data/bio'

/**
 * About section. Mist background, honest personal story on the left,
 * profile photo with availability pill + 2x2 pillar grid on the right.
 * Bio text comes from data/bio.ts (single source shared with the
 * embedded assistant's corpus).
 */

/* Icons pair by index with bio.pillars (content lives in data/bio.ts). */
const PILLAR_ICONS = [Search, Code2, Layers, Cpu] as const

const TAGS = [
  'Vancouver, BC',
  'Open to remote',
  'Bilingual EN / ES',
  'Design + Code',
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-mist py-24 md:py-32"
    >
      <div className="container-content">
        <>
          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">

            {/* Left: story */}
            <div>
              <span className="font-body text-caption uppercase tracking-widest text-coral">
                About me
              </span>

              <h2
                id="about-heading"
                className="mt-3 max-w-[480px] font-display text-display italic leading-tight text-ink"
              >
                {bio.headline}
              </h2>

              <div className="mt-6 max-w-[460px] space-y-4 font-body text-body leading-relaxed text-ghost">
                {bio.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <ul role="list" className="mt-8 flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 font-body text-caption text-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: photo + pillars */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-warm">
                <Image
                  src="/profile.jpg"
                  alt="Mariaelena Cossio Clark"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Floating availability pill */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-paper/90 px-4 py-2 font-body text-caption text-ink backdrop-blur-sm">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                  Available for new roles
                </div>
              </div>

              {/* 2x2 pillar grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {bio.pillars.map((p, i) => {
                  const Icon = PILLAR_ICONS[i]
                  return (
                    <div
                      key={p.title}
                      className="cursor-default rounded-xl bg-paper p-5 shadow-warm transition-all duration-200 hover:-translate-y-1 hover:shadow-warm-hover"
                    >
                      <Icon size={18} className="text-coral" aria-hidden="true" />
                      <h3 className="mt-3 font-body text-sm font-semibold text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-body text-caption text-ghost">
                        {p.body}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </>
      </div>
    </section>
  )
}

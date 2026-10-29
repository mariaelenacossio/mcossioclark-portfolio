import Image from 'next/image'
import { Search, Code2, Layers, Cpu } from 'lucide-react'
import { bio } from '@/data/bio'

/**
 * Dark-redesign About section. Same content as the live About.tsx (same
 * bio.ts source, same headshot) - only the visual system changes.
 * Pass one only, no motion: no hover transitions on the pillar cards.
 */
const PILLAR_ICONS = [Search, Code2, Layers, Cpu] as const

const TAGS = ['Vancouver, BC', 'Open to remote', 'Bilingual EN / ES', 'Design + Code']

export default function DarkAbout() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-dr-xl py-dr-section">
      <div className="mx-auto grid max-w-[1199px] grid-cols-1 items-start gap-dr-xxl md:grid-cols-2">
        {/* Left: story */}
        <div>
          <span className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
            About me
          </span>

          <h2 id="about-heading" className="mt-dr-sm max-w-[480px] font-dr-display text-dr-display-md text-dr-ink">
            {bio.headline}
          </h2>

          <div className="mt-dr-lg max-w-[460px] space-y-dr-md font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
            {bio.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <ul role="list" className="mt-dr-xl flex flex-wrap gap-dr-xs">
            {TAGS.map(tag => (
              <li key={tag} className="rounded-dr-pill border border-dr-hairline bg-dr-surface-1 px-dr-md py-dr-xxs font-dr-body text-dr-caption text-dr-ink">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: photo + pillars */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-dr-xl">
            <Image
              src="/profile.png"
              alt="Mariaelena Cossio Clark"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-dr-sm left-dr-sm flex items-center gap-dr-xxs rounded-dr-pill border border-dr-hairline bg-dr-canvas/90 px-dr-md py-dr-xs font-dr-body text-dr-caption text-dr-ink backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-dr-success" aria-hidden="true" />
              Available for new roles
            </div>
          </div>

          <div className="mt-dr-md grid grid-cols-2 gap-dr-sm">
            {bio.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <div key={p.title} className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                  <Icon size={18} className="text-dr-ink-muted" aria-hidden="true" />
                  <h3 className="mt-dr-sm font-dr-body text-sm font-semibold text-dr-ink">{p.title}</h3>
                  <p className="mt-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">{p.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

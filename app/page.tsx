import Hero      from '@/app/components/Hero'
import About     from '@/app/components/About'
import Work      from '@/app/components/Work'
import HowIWork  from '@/app/components/HowIWork'
import Process   from '@/app/components/Process'
import Contact   from '@/app/components/Contact'

/**
 * Homepage - composes the six homepage sections in the order specified
 * by the redesign brief.
 *
 *   Hero       → bg paper       (no border-t, sits below sticky nav)
 *   About      → bg paper
 *   Work       → bg mist
 *   HowIWork   → bg paper
 *   Process    → bg mist
 *   Contact    → bg paper
 *
 * Background alternation between paper/mist gives the rhythm without
 * needing dividers or borders.
 */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Work />
      <HowIWork />
      <Process />
      <Contact />
    </main>
  )
}

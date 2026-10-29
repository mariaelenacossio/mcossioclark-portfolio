import DarkHeader   from '@/app/components/dark/DarkHeader'
import DarkHero     from '@/app/components/dark/DarkHero'
import DarkAbout    from '@/app/components/dark/DarkAbout'
import DarkWork     from '@/app/components/dark/DarkWork'
import DarkHowIWork from '@/app/components/dark/DarkHowIWork'
import DarkProcess  from '@/app/components/dark/DarkProcess'
import DarkContact  from '@/app/components/dark/DarkContact'
import DarkFooter   from '@/app/components/dark/DarkFooter'

/**
 * Homepage - dark-redesign. Same section order as the live Milan Reed
 * homepage (Hero, About, Work, HowIWork, Process, Contact) - the
 * redesign changes the visual system, not the content. Direction A's
 * original "work starts immediately, no About/Process between" bet was
 * overridden per review: all content comes back, same order as live.
 *
 * Homepage-only first pass on the dark-redesign branch - every other
 * route is still the live Milan Reed system, untouched.
 *
 * ConditionalChrome hides the shared Navbar/Footer on "/" specifically
 * (see that file) so the old and new systems never render together -
 * this component supplies its own header/footer instead.
 */
export default function Home() {
  return (
    <div className="dr-root min-h-dvh">
      <DarkHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <DarkHero />
        <DarkAbout />
        <DarkWork />
        <DarkHowIWork />
        <DarkProcess />
        <DarkContact />
      </main>
      <DarkFooter />
    </div>
  )
}

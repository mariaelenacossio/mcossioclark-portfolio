import DarkHeader from '@/app/components/dark/DarkHeader'
import DarkHero   from '@/app/components/dark/DarkHero'
import DarkWork   from '@/app/components/dark/DarkWork'
import DarkFooter from '@/app/components/dark/DarkFooter'

/**
 * Homepage - dark-redesign, Direction A ("Poster Hero + Flat Showcase
 * Grid"): work starts immediately after the hero, no About/Process
 * section in between. This is a homepage-only first pass on the
 * dark-redesign branch - every other route is still the live Milan Reed
 * system, untouched. About/Process/Contact aren't separate routes yet,
 * so DarkHeader intentionally doesn't link to them; Contact is a working
 * mailto in the header and footer in the meantime.
 *
 * ConditionalChrome hides the shared Navbar/Footer on "/" specifically
 * (see that file) so the old and new systems never render together -
 * this component supplies its own header/footer instead.
 */
export default function Home() {
  return (
    <div className="dr-root min-h-dvh">
      <DarkHeader />
      <main id="main-content">
        <DarkHero />
        <DarkWork />
      </main>
      <DarkFooter />
    </div>
  )
}

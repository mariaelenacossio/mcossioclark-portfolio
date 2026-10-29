/**
 * Self-contained header for the dark-redesign homepage only. Not the
 * shared Navbar - ConditionalChrome hides that on "/" so the two systems
 * never render on screen together. No edits to any shared file beyond
 * the one approved pathname check.
 *
 * About/Work/Process/Contact are all real sections on this page now
 * (pass one restored them); the pill CTA anchors to #contact instead of
 * a bare mailto since the section exists to scroll to.
 *
 * Pass two: nav link hover and the CTA pill's hover/press now use the
 * dr-ease/dr-fast motion tokens. Hover is gated to hover-capable
 * devices ([@media(hover:hover)]) so it doesn't stick after a tap;
 * press (active:scale) applies on touch too, a real press should
 * always give feedback.
 */
const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
] as const

export default function DarkHeader() {
  return (
    <header className="dr-root sticky top-0 z-40 h-[56px] border-b border-dr-hairline bg-dr-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1199px] items-center justify-between px-dr-xl">
        <span className="font-dr-display text-dr-body-lg font-medium tracking-[-0.02em] text-dr-ink">
          Mariaelena
        </span>

        <nav aria-label="Primary" className="hidden items-center gap-dr-xl md:flex">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-dr-body text-dr-caption text-dr-ink-muted no-underline transition-colors duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:text-dr-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-dr-pill bg-dr-primary px-dr-md py-dr-xs font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:bg-dr-ink-muted active:scale-95"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}

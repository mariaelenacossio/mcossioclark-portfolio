/**
 * Self-contained header for the dark-redesign homepage only (Direction A).
 * Not the shared Navbar - ConditionalChrome hides that on "/" so the two
 * systems never render on screen together. No edits to any shared file
 * beyond the one approved pathname check.
 *
 * About/Process/Contact aren't separate routes yet - this is a
 * homepage-only first pass, so those nav items are left out rather than
 * linking somewhere that doesn't exist. Contact is a working mailto;
 * everything else is reachable once those pages are migrated.
 */
export default function DarkHeader() {
  return (
    <header className="dr-root sticky top-0 z-40 h-[56px] border-b border-dr-hairline bg-dr-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1199px] items-center justify-between px-dr-xl">
        <span className="font-dr-display text-dr-body-lg font-medium tracking-[-0.02em] text-dr-ink">
          Mariaelena
        </span>

        <a
          href="mailto:mariaelena.cossio@outlook.com"
          className="rounded-dr-pill bg-dr-primary px-dr-md py-dr-xs font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition-colors duration-150 hover:bg-dr-ink-muted"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}

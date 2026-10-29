/**
 * Self-contained footer for the dark-redesign homepage. See DarkHeader.tsx
 * for why this exists instead of the shared Footer component.
 */
export default function DarkFooter() {
  return (
    <footer className="dr-root border-t border-dr-hairline-soft bg-dr-canvas px-dr-xl py-dr-xxl">
      <div className="mx-auto flex max-w-[1199px] flex-col items-start justify-between gap-dr-md font-dr-body text-dr-caption text-dr-ink-muted sm:flex-row sm:items-center">
        <span>Mariaelena Cossio Clark © {new Date().getFullYear()}</span>
        <a
          href="mailto:mariaelena.cossio@outlook.com"
          className="text-dr-accent-blue no-underline hover:underline"
        >
          mariaelena.cossio@outlook.com
        </a>
      </div>
    </footer>
  )
}

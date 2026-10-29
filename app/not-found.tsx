import Link from 'next/link'

/**
 * Root not-found boundary. Catches both a genuinely unknown URL and a
 * notFound() call from the case-study page (an unresolved slug, e.g.
 * /case-studies/nope). ConditionalChrome gives this the same
 * DarkHeader/DarkFooter as every other page - this component only
 * needs to supply the dark-styled message in between.
 */
export const metadata = {
  title: 'Page not found · Mariaelena Cossio Clark',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="dr-root min-h-dvh">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center px-dr-xl text-center outline-none"
      >
        <p className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
          404
        </p>
        <h1 className="mt-dr-sm font-dr-display text-dr-display-lg text-dr-ink">
          Page not found
        </h1>
        <p className="mt-dr-md max-w-[480px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
          That page doesn&apos;t exist, or the link is out of date.
        </p>
        <Link
          href="/"
          className="mt-dr-xl rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:bg-dr-ink-muted active:scale-95"
        >
          Back to home
        </Link>
      </main>
    </div>
  )
}

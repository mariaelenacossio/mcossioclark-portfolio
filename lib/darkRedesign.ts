/**
 * Which case-study slugs are migrated to the dark-redesign system.
 * Single source of truth for `app/case-studies/[slug]/page.tsx` (which
 * tree to render) and `ConditionalChrome.tsx` (which chrome to render).
 * Add a slug here when that case study migrates - nothing else needs
 * to change to keep its light chrome/layout working until it does.
 */
export const DARK_CASE_STUDY_SLUGS: string[] = ['mini-pancake-co', 'beyond-skincare', 'beauty-by-amy']

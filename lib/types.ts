/**
 * Shared TypeScript types for the portfolio.
 *
 * `projects.ts` exports a strongly-typed `projects` array; this file
 * is the single source of truth for the shape of a project.
 */

export interface ProjectMetric {
  value: string
  label: string
}

/** A case-study screenshot or product mockup image. */
export interface ProjectImage {
  /** Path under /public - e.g. '/projects/mini-pancake-co/screen-1.png' */
  src:     string
  /** Required alt text - describes the screen for screen readers. */
  alt:     string
  /** One-line caption shown below the image. */
  caption: string
}

export interface ProjectInsight {
  label:  string
  detail: string
}

export interface ProjectPersona {
  name:         string
  role:         string
  bio:          string
  goals:        string[]
  frustrations: string[]
}

export interface ProjectWireframe {
  phase:       string
  description: string
}

export interface ProjectIteration {
  version: string
  title:   string
  insight: string
  change:  string
}

export interface ProjectPivotOption {
  label:    string
  tradeoff: string
  chosen:   boolean
}

export interface ProjectPivot {
  n:         string
  challenge: string
  problem:   string
  options:   ProjectPivotOption[]
  decision:  string
}

export interface ProjectTechItem {
  name: string
  why:  string
}

export interface ProjectResearch {
  methods:      string[]
  participants: string
  keyFindings:  string[]
}

export interface ProjectDesignSystem {
  colors:     string[]
  typography: string
  components: string[]
}

/**
 * Canonical Project shape. Required fields are the bare minimum every
 * project must have for the card grid + case-study page to render.
 * Optional fields enable the richer "featured" treatment.
 */
export interface Project {
  // ── Identity ─────────────────────────────────────────────────
  id:               string
  slug:             string
  title:            string
  category:         string
  shortDescription: string
  role:             string
  year:             string
  duration:         string
  team:             string
  tags:             string[]
  /** Brand color in hex - drives card accents and the case-study hero. */
  brand:            string

  // ── External links ───────────────────────────────────────────
  liveUrl?:    string
  repoUrl?:    string
  liveLabel?: string

  // ── Screenshot gallery (rendered on the case-study page) ─────
  /** Ordered list of product mockup screenshots - rendered as a
   *  gallery between the metrics row and the body sections. Empty or
   *  missing → the gallery section is skipped entirely. */
  images?:           ProjectImage[]

  // ── Featured project ─────────────────────────────────────────
  /** When true, the homepage shows this project's headline on the card. */
  featured?:         boolean
  featuredHeadline?: string
  featuredSubhead?:  string
  pivots?:           ProjectPivot[]
  techStack?:        ProjectTechItem[]

  // ── Case-study body ──────────────────────────────────────────
  overview:      string
  problem:       string
  goal:          string
  hypothesis:    string
  research:      ProjectResearch
  insights:      ProjectInsight[]
  persona:       ProjectPersona
  userFlow:      string
  wireframes:    ProjectWireframe[]
  iterations:    ProjectIteration[]
  designSystem:  ProjectDesignSystem
  outcome:       string
  metrics:       ProjectMetric[]
  learnings:     string[]
}

/** Static homepage process step. */
export interface ProcessStep {
  number:      string
  title:       string
  description: string
  detail:      string
}

/** Skill categories rendered in the About / pillars section. */
export interface SkillsMap {
  UX:          string[]
  UI:          string[]
  Development: string[]
}

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
  /** Brand color in hex — drives card accents and the case-study hero. */
  brand:            string

  // ── External links ───────────────────────────────────────────
  liveUrl?:    string
  repoUrl?:    string
  liveLabel?: string

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

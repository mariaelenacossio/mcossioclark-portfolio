import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { pipeline } from '@xenova/transformers'
import { projects } from '../data/projects'
import { bio } from '../data/bio'

/* ── Env (secrets read from .env, never hardcoded). No embeddings API key:
      embeddings run locally via Transformers.js, free and accountless. ─── */
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

/* gte-small (384-dim): the same model Supabase's edge runtime exposes via
   Supabase.ai, so ingest-time vectors (here, via Transformers.js) match
   query-time vectors (in the edge function). Free, local, no API account. */
const EMBED_MODEL = 'Supabase/gte-small'
// `any`: Transformers.js types `pipeline()` as a broad union that can't be
// narrowed to the feature-extraction variant, so the call options and the
// returned tensor's `.data` don't type-check otherwise. Matches Supabase's
// reference usage.
let extractor: any = null

type Chunk = { project_id: string | null; section: string; heading: string; content: string }

/* ── Section-aware chunking. project.persona is NEVER read or inserted. ── */
function projectChunks(p: any): Chunk[] {
  const out: Chunk[] = []
  const add = (section: string, heading: string, content: string) => {
    if (content && content.trim()) out.push({ project_id: p.id, section, heading, content: content.trim() })
  }

  add('overview', `${p.title}: Overview`, p.overview)
  add('problem',  `${p.title}: The problem`, p.problem)
  add('goal', `${p.title}: The goal`,
    [p.goal, p.hypothesis ? `Hypothesis: ${p.hypothesis}` : ''].filter(Boolean).join('\n\n'))

  if (p.research) {
    const r = p.research
    add('research', `${p.title}: Research`, [
      r.participants ? `Participants: ${r.participants}` : '',
      r.methods?.length ? `Methods: ${r.methods.join('; ')}` : '',
      r.keyFindings?.length ? `Key findings:\n${r.keyFindings.map((f: string) => `- ${f}`).join('\n')}` : '',
    ].filter(Boolean).join('\n\n'))
  }

  if (p.insights?.length)
    add('insights', `${p.title}: Insights`, p.insights.map((i: any) => `${i.label}: ${i.detail}`).join('\n'))

  for (const pv of (p.pivots ?? [])) {
    const opts = (pv.options ?? [])
      .map((o: any) => `- ${o.label} (${o.chosen ? 'CHOSEN' : 'considered'}): ${o.tradeoff}`).join('\n')
    add('pivot', `${p.title}: Pivot ${pv.n}: ${pv.challenge}`, [
      `Problem: ${pv.problem}`,
      opts ? `Options weighed:\n${opts}` : '',
      `Decision: ${pv.decision}`,
    ].filter(Boolean).join('\n\n'))
  }

  if (p.techStack?.length)
    add('tech_stack', `${p.title}: Tech stack`, p.techStack.map((t: any) => `${t.name}: ${t.why}`).join('\n'))

  if (p.metrics?.length)
    add('metrics', `${p.title}: Metrics`, p.metrics.map((m: any) => `${m.value} (${m.label})`).join('; '))

  add('outcome', `${p.title}: Outcome`, p.outcome)

  if (p.learnings?.length)
    add('learnings', `${p.title}: What I learned`, p.learnings.map((l: string) => `- ${l}`).join('\n'))

  if (p.iterations?.length)
    add('iterations', `${p.title}: Version history`,
      p.iterations.map((it: any) =>
        `${it.version}: ${it.title}\nWhat I saw: ${it.insight}\nWhat changed: ${it.change}`).join('\n\n'))

  // p.persona is intentionally NEVER referenced — excluded from the corpus.
  return out
}

/* ── Bio chunks from data/bio.ts (single source of truth, no TSX parsing) ─ */
function bioChunks(): Chunk[] {
  return [
    { project_id: null, section: 'bio', heading: 'About Mariaelena',
      content: [bio.headline, ...bio.paragraphs].join('\n\n') },
    { project_id: null, section: 'bio', heading: 'How Mariaelena works',
      content: bio.pillars.map(p => `${p.title}: ${p.body}`).join('\n') },
  ]
}

async function embed(text: string): Promise<number[]> {
  if (!extractor) extractor = await pipeline('feature-extraction', EMBED_MODEL)
  const output = await extractor(text, { pooling: 'mean', normalize: true })
  return Array.from(output.data as Float32Array)
}

async function main() {
  // Idempotent: clear chunk tables (content_embeddings cascades off content_entries).
  await supabase.from('content_entries').delete().not('id', 'is', null)
  await supabase.from('project_embeddings').delete().not('project_id', 'is', null)

  // 1) projects + coarse project-level embedding
  for (const p of projects) {
    const { error } = await supabase.from('projects').upsert({
      id: p.id, title: p.title, category: p.category, role: p.role, year: p.year,
      duration: p.duration, team: p.team, short_description: p.shortDescription,
      live_url: p.liveUrl, repo_url: p.repoUrl,
    })
    if (error) throw error
    const projText = [p.title, p.shortDescription, p.overview].filter(Boolean).join('\n')
    const { error: e2 } = await supabase.from('project_embeddings')
      .upsert({ project_id: p.id, embedding: await embed(projText) })
    if (e2) throw e2
  }

  // 2) section-aware content chunks (+ bio), each with its own embedding
  const chunks = [...projects.flatMap(projectChunks), ...bioChunks()]
  for (const ch of chunks) {
    const { data, error } = await supabase.from('content_entries')
      .insert({ project_id: ch.project_id, section: ch.section, heading: ch.heading, content: ch.content })
      .select('id').single()
    if (error) throw error
    const { error: e3 } = await supabase.from('content_embeddings')
      .insert({ entry_id: data.id, embedding: await embed(`${ch.heading}\n\n${ch.content}`) })
    if (e3) throw e3
  }

  console.log(`Ingested ${projects.length} projects + ${chunks.length} content chunks (personas excluded).`)
}

main().catch(e => { console.error(e); process.exit(1) })

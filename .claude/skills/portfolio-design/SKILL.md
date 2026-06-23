---
name: portfolio-design
description: Use this skill for every step of rebuilding Maria Elena Cossio Clark's UX/UI portfolio (showcase site, case study pages, embedded AI assistant, copywriting, visual design). Read this BEFORE writing any code, choosing colors/type, or drafting copy. Encodes the 2026 showcase-first format, anti-AI-speak rules, the "vibe coder" positioning call, and the design taste bar for this specific rebuild.
---

# Portfolio Design — Maria Elena Cossio Clark Rebuild

This skill governs the full rebuild of mariaelena-cossioclark.com. Load this alongside `/mnt/skills/public/frontend-design/SKILL.md` — that skill gives general visual-design discipline; this one pins down what's specific to THIS person, THIS positioning, and THIS 2026 portfolio brief. Where they conflict, this skill wins, since it reflects the actual brief.

## The subject, stated plainly

A Product/UX-UI Designer, 3+ years experience, positioning around e-commerce and SaaS interfaces, who designs and ships using AI tools (Figma, Claude Code). The site itself is a work sample: if it looks templated, the positioning collapses. The single hardest constraint to hold onto across every page: **this has to look and read like one specific person made it, not like "a portfolio."**

## Format: showcase, not case study

Default for every project page is showcase-first, not the problem/process/solution essay format. Concretely:
- Hero of each project = the strongest visual + a one-line outcome, above the fold, before any prose.
- No double-diamond diagrams, no "Discover / Define / Develop / Deliver" headers, no process timeline as the opening move.
- Context is minimal and exists to make someone want to ask a question, not to pre-answer every question. Write 2-3 sentences of framing max before the next visual.
- Deeper reasoning (research, iterations, tradeoffs) goes behind progressive disclosure — a click/expand, a secondary scroll section, not the default reading path.
- Every project needs an explicit, unambiguous statement of what THIS designer personally did vs. the team, and a quantified outcome where one exists. If a real metric doesn't exist, do not invent one — say what shipped and what changed qualitatively, and flag to the user that a number is missing rather than fabricating it.

## Copy: kill AI-speak on sight

Before finalizing any sentence on this site, check it against this list. If a sentence could appear unchanged on a stranger's portfolio, rewrite it.

Banned phrases and their pattern (reject these and anything that rhymes with them): "leveraging cutting-edge technologies," "passionate about creating seamless experiences," "results-driven," "dynamic and innovative," "elevate the user experience," "seamlessly," "robust solution," "in today's fast-paced digital landscape." Also reject generic three-item value-prop lists ("Strategy. Design. Delivery.") unless the three items are actually load-bearing and specific to this person.

Voice rules: first person, active voice, plain verbs. Say what was actually done ("cut checkout from 5 steps to 2") not what it represents ("revolutionized the checkout experience"). It's fine to be plainspoken and slightly understated — that reads as more senior than enthusiasm-coded copy.

## The "Vibe Coder" call

The brief's working tagline includes "Vibe Coder." Research is split: the term is mainstream and some job listings invite it, but it carries real stigma among engineers and some hiring panels, who read it as "doesn't understand what the code does."

Default behavior unless the user explicitly overrides: keep "AI-Native" in the public-facing H1/positioning line, drop or soften the literal "Vibe Coder" phrase there. It's fine to use "vibe coder" further down the page (e.g. in an "About my process" or "How I build" section) IF it's immediately backed by something concrete and shipped — this site, the embedded assistant, a named tool stack. Never let "vibe coder" stand alone as a claim with nothing under it. If the user insists on keeping it in the H1, comply, but say once why it's a risk and don't relitigate it after that.

## Visual identity for this rebuild

Apply the frontend-design skill's brainstorm → critique → build process, but anchor the brainstorm in this subject (e-commerce/SaaS UX, AI-native, designer-who-codes) rather than a neutral brief. Concretely:
- Avoid the three AI-cluster defaults named in frontend-design (cream+terracotta serif; near-black+single neon accent; broadsheet hairline-rule newspaper). If the chosen direction lands near one of these, that's a signal to push further, not a signal it's done.
- Bento grids and dark-mode-aware layouts are well-evidenced for this kind of portfolio in 2026 — reasonable defaults to consider, not mandates. A restrained neo-brutalist direction is also defensible for a "build my own tools" positioning, if executed with precision rather than noise.
- Pick ONE signature interaction (custom cursor, a specific scroll reveal, a hover treatment on the project grid) and execute it well. Resist adding a second one "to be safe" — that's how sites end up feeling AI-generated.
- Avoid kinetic typography, heavy WebGL/3D, and glassmorphism as default choices — they're consistently reported as Core Web Vitals and accessibility liabilities, and they read as demo-flex rather than craft in 2026 review discourse. Motion should be purposeful: a load sequence or scroll reveal that serves the content, not ambient decoration.
- Visible keyboard focus states and `prefers-reduced-motion` support are non-negotiable, not nice-to-haves, given this person's UX positioning — sloppy accessibility on a UX portfolio undercuts the pitch directly.

## The embedded AI assistant

If/when building the embedded chatbot: it is trained ONLY on this person's actual case study content, resumes, and bio — never invent experience, employers, metrics, or projects to fill gaps. The system prompt must refuse out-of-scope questions cleanly ("I don't have that information — you can reach Maria Elena directly at [contact]") rather than guessing. This is a trust surface: a single confidently wrong answer about her work does more damage than the assistant not existing. Treat writing the underlying case-study content as a hard prerequisite — do not wire up retrieval against thin or placeholder copy.

## Self-check before presenting any page

Before showing a build of any page to the user, check: does this page lead with the work, or with a description of the work? Would this paragraph survive being read by someone who hires UX designers for a living, or does it sound like it's performing UX rather than showing it? Is there a sentence here that could sit unchanged on a different designer's site? If yes to the last one, it's not done.

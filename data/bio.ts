/* Canonical bio content. Single source of truth for the About section AND
   the embedded assistant's corpus, so the two can never drift. If you edit
   the bio, edit it here. */
export const bio = {
  headline: 'I design with code in mind, because I write it too.',
  paragraphs: [
    'Early on I kept watching my designs come back from dev looking nothing like what I intended. So I learned to code properly. Not enough to talk to developers, enough to ship production React. That changed how I design.',
    "I've worked across e-commerce, SaaS, and service businesses. The brief is almost always wrong about something. Finding out what before the build starts is most of the job.",
    'I also run AI agents as part of how I work, for research synthesis, rapid prototyping, and production code. Not to go faster. To do things that used to take a team.',
  ],
  pillars: [
    { title: 'Research first',   body: 'Talk to users before Figma.' },
    { title: 'Code fluency',     body: 'I know what is painful to build.' },
    { title: 'Systems thinking', body: 'Tokens and components, not one-off screens.' },
    { title: 'AI direction',     body: 'I run agents. I do not just use tools.' },
  ],
} as const

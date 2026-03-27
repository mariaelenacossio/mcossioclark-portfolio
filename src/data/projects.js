export const projects = [
  {
    id: 'beyond-skincare',
    title: 'Beyond Skincare',
    category: 'UX/UI Design · E-Commerce',
    shortDescription:
      'A premium skincare e-commerce experience built around a personalized skin-journey model that increased conversions by 34%.',
    role: 'Lead UX/UI Designer',
    year: '2024',
    tags: ['UX Research', 'UI Design', 'E-Commerce', 'Figma', 'Prototyping'],
    gradient: 'from-[#D4A0A0] via-[#C4786E] to-[#8B4A42]',
    accentColor: '#C4786E',
    problem:
      'Customers felt overwhelmed by the vast product catalog and struggled to find items suited to their specific skin type. The checkout drop-off rate was 68%, and repeat purchases were low despite strong product satisfaction scores.',
    process:
      'Conducted 12 user interviews and a competitive audit of 8 skincare e-commerce platforms. Created affinity maps revealing the core pain point: users wanted personalization, not browsing. Designed a skin-quiz onboarding flow, restructured the IA around skin concerns, and iterated through 3 rounds of prototype testing.',
    solution:
      'Implemented a 3-step skin quiz at onboarding that generated a personalized "skin profile." Products were then filtered and surfaced based on this profile. Simplified checkout to 2 steps with a persistent cart summary. Added a "why this works for you" micro-copy for each product.',
    outcome:
      'Conversion rate improved by 34%. Average session duration increased by 2.1 minutes. Cart abandonment dropped from 68% to 41%. Client reported a 28% increase in repeat purchases within 3 months.',
    image: null,
  },
  {
    id: 'beauty-by-amy',
    title: 'Beauty by Amy',
    category: 'UX/UI Design · Booking Platform',
    shortDescription:
      'A luxury salon booking platform redesigned to cut scheduling friction and communicate brand elegance from first touch.',
    role: 'UX Designer & Front-End Developer',
    year: '2024',
    tags: ['Booking UX', 'Branding', 'WordPress', 'Mobile-First', 'User Flows'],
    gradient: 'from-[#B8A0CC] via-[#8B6AAE] to-[#5C3D7A]',
    accentColor: '#8B6AAE',
    problem:
      'Amy\'s existing website was visually inconsistent and had a 5-step booking flow that caused high drop-off. Mobile users (67% of traffic) were especially frustrated by the non-responsive layout and small tap targets.',
    process:
      'Performed a UX audit and mobile usability testing with 8 participants. Journey-mapped the full booking experience from discovery to post-appointment. Identified that users abandoned at step 3 (service selection) due to unclear pricing and missing visual context.',
    solution:
      'Redesigned the booking flow to 3 steps with clear progress indicators. Added service imagery and upfront pricing. Rebuilt the site in WordPress with a mobile-first approach using custom CSS. Aligned the visual design with Amy\'s luxury brand — deep plum tones, refined typography, and gold accents.',
    outcome:
      'Online bookings increased by 52% in the first month. Mobile session duration improved by 89 seconds. Amy reported a 40% reduction in phone calls for appointment inquiries.',
    image: null,
  },
  {
    id: 'relocateme',
    title: 'relocateMe',
    category: 'UX/UI Design · SaaS Dashboard',
    shortDescription:
      'A relocation management dashboard that transforms a complex, document-heavy process into a calm, step-by-step guided experience.',
    role: 'UX Researcher & Product Designer',
    year: '2023',
    tags: ['SaaS', 'Dashboard Design', 'User Research', 'Information Architecture', 'React'],
    gradient: 'from-[#7AB8D4] via-[#4A8FAE] to-[#1E5F7A]',
    accentColor: '#4A8FAE',
    problem:
      'HR managers and relocating employees both struggled with a legacy system that required 12 separate spreadsheets and had no single source of truth. Compliance deadlines were frequently missed.',
    process:
      'Ran a 3-week discovery sprint with 6 HR managers and 8 employees in active relocation. Used contextual inquiry to observe real workflows. Mapped 47 touchpoints across the relocation journey. Ran card sorting to restructure the information architecture.',
    solution:
      'Designed a unified dashboard with role-based views (HR vs. employee). Created a milestone-based progress tracker replacing the spreadsheet system. Built a document checklist with deadline alerts and status indicators. Designed a notification system for both parties to stay aligned.',
    outcome:
      'Pilot users completed relocations 3 weeks faster on average. Compliance document submission rates improved from 61% to 94%. User satisfaction score (SUS) jumped from 42 to 78.',
    image: null,
  },
  {
    id: 'los-quequitos-mx',
    title: 'Los Quequitos MX',
    category: 'UX/UI Design · Food & Brand',
    shortDescription:
      'A playful yet polished digital brand and online ordering experience for an artisan Mexican bakery celebrating cultural roots.',
    role: 'Brand Designer & UX/UI Designer',
    year: '2023',
    tags: ['Branding', 'UI Design', 'Menu Design', 'Cultural UX', 'Figma'],
    gradient: 'from-[#F0B860] via-[#E08840] to-[#C05820]',
    accentColor: '#E08840',
    problem:
      'Los Quequitos had strong word-of-mouth but no online presence. The owner needed a brand identity and website that captured the warmth of Mexican artisan baking while enabling online pre-orders to reduce in-store rush.',
    process:
      'Conducted brand discovery workshops with the owner. Researched cultural visual references from Mexican folk art and traditional bakery aesthetics. Built mood boards and tested 3 brand directions with target customers. Designed wireframes and tested the ordering flow with 10 first-time users.',
    solution:
      'Created a full brand identity: logo, color system, typography, and illustration style inspired by Talavera pottery and papel picado. Designed a one-page website with a visual menu, brand story section, and a simple pre-order form. Built with mobile-first HTML/CSS/JS.',
    outcome:
      'Website launched with zero budget for ads. 200+ pre-orders received in the first two weeks via organic social sharing. The owner reported a 60% reduction in peak-hour chaos and 3 wholesale inquiries from local cafes.',
    image: null,
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Deep-dive into user needs through research, interviews, and competitive analysis to define the real problem.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Translate insights into wireframes and high-fidelity interfaces guided by design principles and systems thinking.',
    icon: 'Layers',
  },
  {
    number: '03',
    title: 'Prototype',
    description:
      'Build interactive prototypes and test with real users, iterating until the solution truly works.',
    icon: 'Play',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Ship polished, production-ready designs with detailed handoff docs and front-end implementation support.',
    icon: 'Rocket',
  },
]

export const skills = {
  UX: [
    'User Research',
    'Wireframing',
    'User Flows',
    'Usability Testing',
    'Information Architecture',
    'Journey Mapping',
    'Competitive Analysis',
    'Accessibility (WCAG)',
  ],
  UI: [
    'Figma',
    'Design Systems',
    'High-Fidelity Prototyping',
    'Visual Design',
    'Typography',
    'Motion Design',
    'Brand Identity',
    'Responsive Design',
  ],
  Development: [
    'HTML5 / CSS3',
    'JavaScript (ES6+)',
    'React',
    'Tailwind CSS',
    'WordPress',
    'Git & GitHub',
    'Vite',
    'REST APIs',
  ],
}

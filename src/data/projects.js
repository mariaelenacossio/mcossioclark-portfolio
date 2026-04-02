export const projects = [
  {
    id: 'beyond-skincare',
    title: 'Beyond Skincare',
    category: 'E-Commerce · UX/UI Design',
    shortDescription:
      'A personalized skincare e-commerce experience that replaced overwhelming browsing with a guided skin-journey model — boosting conversions by 34%.',
    role: 'Lead UX/UI Designer',
    year: '2024',
    duration: '10 weeks',
    team: 'Solo designer + 2 developers',
    tags: ['UX Research', 'UI Design', 'E-Commerce', 'Figma', 'Prototyping'],
    gradient: 'from-[#D4A0A0] via-[#C4786E] to-[#8B4A42]',
    accentColor: '#C4786E',
    accentLight: '#EAB8B8',
    mockupType: 'skincare',

    overview:
      'Beyond Skincare is a premium DTC skincare brand with a diverse product catalog of 140+ SKUs. Despite strong product satisfaction scores, the brand was seeing a 68% cart abandonment rate and low repeat purchase behavior — a clear signal that the digital experience was failing to convert intent into action.',

    problem:
      'Customers felt overwhelmed by 140+ products with no clear path to finding what suited their skin type. The generic catalog layout treated every visitor the same, leading to analysis paralysis, high bounce rates, and low trust in purchasing decisions.',

    goal: 'Redesign the discovery-to-checkout flow to feel personal, guided, and trustworthy — reducing decision fatigue and increasing both first-time conversions and repeat purchases.',

    hypothesis:
      'If we replace passive browsing with an active, personalized skin-quiz onboarding flow, users will feel more confident in their selections, leading to higher cart completion and repeat purchase rates.',

    research: {
      methods: ['In-depth user interviews (n=12)', 'Competitive audit (8 platforms)', 'Heuristic evaluation', 'Session recording analysis', 'Cart abandonment surveys'],
      participants: '12 skincare shoppers, ages 22–45, mix of beginners and enthusiasts',
      keyFindings: [
        '9 of 12 users felt "overwhelmed" or "unsure" when browsing product pages',
        'Users trusted human recommendations 3× more than product copy',
        'The checkout had 6 steps — users expected 2–3 max',
        'Mobile accounted for 71% of sessions but had a 74% bounce rate',
        'Competitors like Curology and Function of Beauty drove conversions through quizzes',
      ],
    },

    insights: [
      { label: 'Personalization gap', detail: 'Users wanted to be understood, not sold to. Generic product pages created trust gaps.' },
      { label: 'Decision fatigue', detail: '140+ products with no filtering by skin concern made choices feel impossible.' },
      { label: 'Mobile friction', detail: 'The desktop-first layout broke on mobile — the primary device for 71% of users.' },
      { label: 'Checkout anxiety', detail: 'No order summary at checkout created uncertainty and abandonment at payment step.' },
    ],

    persona: {
      name: 'Sofia, 28',
      role: 'Marketing Manager',
      bio: 'Sofia is health-conscious and brand-savvy. She spends time researching purchases but gets overwhelmed by too many options. She values transparency and wants brands to "get" her skin.',
      goals: ['Find products for her combination, acne-prone skin', 'Trust that she\'s making the right choice', 'Have a smooth checkout without surprises'],
      frustrations: ['Spending 30 min browsing and leaving empty-handed', 'Generic "for all skin types" messaging', 'Hidden shipping costs at checkout'],
    },

    userFlow: 'Landing → Skin Quiz (3 steps) → Personalized Dashboard → Product Page → Streamlined Cart → 2-Step Checkout → Order Confirmation + Repurchase Nudge',

    wireframes: [
      { phase: 'Lo-fi', description: 'Paper sketches of the quiz flow and product grid layout. Tested 3 IA structures with 5 participants.' },
      { phase: 'Mid-fi', description: 'Grayscale wireframes in Figma. Validated quiz logic and result page hierarchy through 2 rounds of moderated testing.' },
      { phase: 'Hi-fi', description: 'Pixel-perfect screens with the brand design system applied. Full prototype tested with 8 users before developer handoff.' },
    ],

    iterations: [
      { version: 'v1', title: 'Long quiz, 8 steps', insight: 'Users dropped off at step 4. Quiz felt like a form, not a conversation.', change: 'Reduced to 3 questions. Reframed questions to feel conversational, not clinical.' },
      { version: 'v2', title: 'Product grid after quiz', insight: 'Still felt like browsing. Users didn\'t feel the results were truly "theirs."', change: 'Added a personalized "Your Skin Profile" page with named categories and explanation copy before product grid.' },
      { version: 'v3', title: 'Skincare profile + curated grid', insight: 'Users felt confident. "This actually makes sense for me." Conversion intent increased significantly.', change: 'Added "Why this works for your skin" micro-copy under each product card. Final design shipped.' },
    ],

    designSystem: {
      colors: ['#F9F1EC (Cream)', '#C4786E (Terracotta)', '#2C1810 (Espresso)', '#8B6B5C (Warm taupe)'],
      typography: 'Playfair Display (headings) + DM Sans (body) — luxury warmth with modern clarity',
      components: ['Skin Quiz Card', 'Product Card (with skin-match badge)', 'Progress Indicator', '2-Step Checkout Modal', 'Skin Profile Badge'],
    },

    outcome: 'Conversion rate improved by 34%. Cart abandonment dropped from 68% to 41%. Average session duration increased by 2.1 minutes. Repeat purchases up 28% within 3 months. Client expanded scope to include a loyalty dashboard.',

    metrics: [
      { value: '+34%', label: 'Conversion Rate' },
      { value: '-27pt', label: 'Cart Abandonment' },
      { value: '+28%', label: 'Repeat Purchases' },
      { value: '2.1m', label: 'Longer Sessions' },
    ],

    learnings: [
      'Quiz-based onboarding works — but only when it feels like a conversation, not a form. Length is less important than tone.',
      'Personalization copy ("why this works for you") builds more trust than product specs alone.',
      'Mobile-first isn\'t optional in e-commerce. Testing on real devices early caught layout failures that Figma missed.',
    ],

    image: null,
  },

  {
    id: 'beauty-by-amy',
    title: 'Beauty by Amy',
    category: 'Booking Platform · Brand Design',
    shortDescription:
      'A luxury salon booking redesign that cut friction from 5 steps to 3, rebuilt mobile-first for 67% of users, and increased online bookings by 52% in the first month.',
    role: 'UX Designer & Front-End Developer',
    year: '2024',
    duration: '6 weeks',
    team: 'Solo designer/developer + client',
    tags: ['Booking UX', 'Branding', 'WordPress', 'Mobile-First', 'User Flows'],
    gradient: 'from-[#B8A0CC] via-[#8B6AAE] to-[#5C3D7A]',
    accentColor: '#8B6AAE',
    accentLight: '#C9B8E8',
    mockupType: 'booking',

    overview:
      'Beauty by Amy is a luxury hair salon in Toronto with a loyal local following and a growing social media presence. Despite consistent 5-star reviews, Amy was frustrated that her website wasn\'t converting online visitors into bookings — most clients still called the salon directly.',

    problem:
      'The existing site had a 5-step booking flow with no mobile optimization, inconsistent visual design, and zero brand personality. 67% of visitors were on mobile and left without booking. Amy was spending 2+ hours daily answering booking-related phone calls.',

    goal: 'Redesign the booking experience to feel as luxurious as the salon itself, reduce booking friction to under 3 steps, and convert mobile visitors who were bouncing.',

    hypothesis:
      'A mobile-first redesign with a streamlined 3-step flow, upfront pricing, and stronger brand identity will reduce drop-off and move appointment inquiries from phone to online.',

    research: {
      methods: ['UX audit of existing site', 'Usability testing with 8 participants', 'Client journey mapping', 'Heatmap analysis', 'Competitor review (4 luxury salon sites)'],
      participants: '8 existing and prospective clients, primarily mobile users aged 25–45',
      keyFindings: [
        'Users abandoned at Step 3 (service selection) due to no pricing visible upfront',
        '6 of 8 users couldn\'t complete the booking on mobile due to layout issues',
        'The brand felt generic — nothing communicated "luxury" or Amy\'s personality',
        'No confirmation or "what to expect" messaging caused post-booking anxiety',
        'Competitors like Fresha and GlossGenius set high mobile UX standards',
      ],
    },

    insights: [
      { label: 'Hidden pricing = lost trust', detail: 'Users needed to know costs before committing to a service selection. Revealing prices late caused drop-off.' },
      { label: 'Brand vacuum', detail: 'The site had no visual personality. A luxury salon needs its digital presence to match the in-person experience.' },
      { label: 'Mobile is primary', detail: '67% of traffic was mobile — yet the site was clearly designed desktop-first.' },
      { label: 'Post-booking anxiety', detail: 'No confirmation UX. Users weren\'t sure if their booking "worked" without a phone call.' },
    ],

    persona: {
      name: 'Camila, 33',
      role: 'Project Manager',
      bio: 'Camila books all her services digitally. She discovered Amy on Instagram and wants to book without calling. She\'s style-conscious and expects the site to feel as premium as the work she sees on Amy\'s feed.',
      goals: ['Book a colour appointment in under 5 minutes on her phone', 'See pricing upfront so she can plan her budget', 'Feel confident the appointment is confirmed without calling'],
      frustrations: ['Tiny tap targets on mobile', 'Having to call a salon just to book', 'Sites that look unprofessional for high-end services'],
    },

    userFlow: 'Landing (brand impression) → Service Selection (with pricing) → Date & Time → Contact Info → Confirmation Screen + Email → Reminder 24h before',

    wireframes: [
      { phase: 'Lo-fi', description: 'Mobile-first sketches of the 3-step flow. Tested navigation patterns: bottom sheet vs. page-by-page.' },
      { phase: 'Mid-fi', description: 'Wireframes with service card layout and progress stepper. Validated pricing visibility placement.' },
      { phase: 'Hi-fi', description: 'Full brand design applied. Plum, gold, and cream palette. Tested with 5 users — zero dropped at service selection.' },
    ],

    iterations: [
      { version: 'v1', title: 'List-based service menu', insight: 'Felt like a spreadsheet, not a luxury experience. No visual context for services.', change: 'Switched to card-based layout with service imagery and duration badges.' },
      { version: 'v2', title: 'Pricing revealed at cart', insight: 'Users still felt surprised. "I wish I\'d known this before."', change: 'Moved pricing to service cards. Bold, upfront. Eliminated the surprise.' },
      { version: 'v3', title: 'Full brand redesign + 3-step flow', insight: 'Users described the site as "gorgeous" and "exactly what I expected from a luxury salon."', change: 'Shipped. Added post-booking confirmation screen with "what to expect" copy.' },
    ],

    designSystem: {
      colors: ['#1A0A2E (Deep plum)', '#8B6AAE (Orchid)', '#C9A96E (Gold)', '#FAF7F2 (Ivory)'],
      typography: 'Cormorant Garamond (headings) + Inter (body) — old-world elegance with modern readability',
      components: ['Service Card (with image + price)', '3-Step Progress Bar', 'Date Picker (touch-optimized)', 'Confirmation Screen', 'Reminder Email Template'],
    },

    outcome: 'Online bookings increased 52% in the first month. Mobile session duration improved by 89 seconds. Phone call volume dropped 40%. Amy described it as "finally having a website that feels like my brand."',

    metrics: [
      { value: '+52%', label: 'Online Bookings' },
      { value: '-40%', label: 'Phone Inquiries' },
      { value: '+89s', label: 'Mobile Session Time' },
      { value: '3 steps', label: 'Booking Flow (was 5)' },
    ],

    learnings: [
      'For service businesses, pricing transparency isn\'t just a UX nice-to-have — it\'s a conversion requirement.',
      'Mobile-first isn\'t just about screen size. It\'s about designing for thumbs, interruptions, and short attention spans.',
      'Brand personality in digital design has a measurable impact on client confidence and willingness to book.',
    ],

    image: null,
  },

  {
    id: 'relocateme',
    title: 'relocateMe',
    category: 'SaaS Dashboard · Product Design',
    shortDescription:
      'A unified relocation management platform that replaced 12 spreadsheets with one calm, guided dashboard — improving compliance from 61% to 94%.',
    role: 'UX Researcher & Product Designer',
    year: '2023',
    duration: '14 weeks',
    team: '2 UX designers + 3 developers + PM',
    tags: ['SaaS', 'Dashboard Design', 'User Research', 'Information Architecture', 'React'],
    gradient: 'from-[#7AB8D4] via-[#4A8FAE] to-[#1E5F7A]',
    accentColor: '#4A8FAE',
    accentLight: '#A8D4E8',
    mockupType: 'dashboard',

    overview:
      'relocateMe is a B2B SaaS platform for corporate relocation. HR managers use it to coordinate employee moves across cities and countries — a process involving dozens of documents, deadlines, vendors, and stakeholders. The legacy product was failing both sides of the equation.',

    problem:
      'HR managers juggled 12+ spreadsheets with no single source of truth. Employees in transit had no visibility into their own relocation progress. Compliance deadlines were frequently missed, creating legal exposure for the companies involved.',

    goal: 'Design a unified, role-based dashboard that gives HR managers full visibility and control, while giving relocating employees a calm, step-by-step experience — eliminating the spreadsheet dependency entirely.',

    hypothesis:
      'A milestone-based progress system with role-specific views and automated compliance alerts will reduce coordination errors and improve both HR efficiency and employee satisfaction during the relocation process.',

    research: {
      methods: ['Contextual inquiry (observed real relocations)', 'Stakeholder interviews (6 HR managers)', 'Employee interviews (8 people in active relocation)', 'Card sorting (IA restructuring)', 'Journey mapping (47 touchpoints identified)'],
      participants: '6 HR managers + 8 relocating employees across 3 companies',
      keyFindings: [
        'HR managers spent avg. 3.5 hours/week just tracking document status across spreadsheets',
        'Employees described the process as "stressful," "opaque," and "like shouting into a void"',
        'Compliance documents were submitted late 39% of the time, causing legal delays',
        'Neither party had real-time visibility — everything was email-based',
        'The existing tool had 47 navigation items — users only used 8 regularly',
      ],
    },

    insights: [
      { label: 'Two worlds, one product', detail: 'HR and employees had completely different mental models of relocation. One product needed two distinct views.' },
      { label: 'Checklist over calendar', detail: 'Users thought in tasks and milestones, not dates. A timeline was less useful than a progress tracker.' },
      { label: 'Alert fatigue is real', detail: 'The legacy tool sent 15+ email notifications per week per user. Users ignored all of them.' },
      { label: 'Navigation overload', detail: '47 nav items for an 8-item use case. Radical simplification was needed.' },
    ],

    persona: {
      name: 'Rachel, 41',
      role: 'HR Manager, Tech Company',
      bio: 'Rachel manages relocations for a 500-person company. She coordinates 4–6 active relocations at any time, each with different deadlines and requirements. She\'s efficient, process-driven, and loses sleep over compliance.',
      goals: ['Single view of all active relocations', 'Know which documents are overdue before they become a problem', 'Spend less time chasing employees for paperwork'],
      frustrations: ['Spreadsheets that go out of sync', 'Employees who don\'t know what they need to submit', 'No audit trail when things go wrong'],
    },

    userFlow: 'HR: Login → Dashboard (all relocations) → Select Employee → Document Checklist → Send Alert → Track Completion\nEmployee: Login → My Relocation → Current Step → Upload Document → See Next Milestone',

    wireframes: [
      { phase: 'Lo-fi', description: 'Explored 3 dashboard layouts: list, card grid, and kanban. Card sorting sessions determined the IA with HR managers.' },
      { phase: 'Mid-fi', description: 'Separate wireframes for HR and employee views. Milestone tracker tested with 6 users — all preferred it over calendar.' },
      { phase: 'Hi-fi', description: 'Full component library built. Role-based login routes to the correct dashboard. Tested full flow with both user types.' },
    ],

    iterations: [
      { version: 'v1', title: 'Unified view for both roles', insight: 'HR managers felt overwhelmed by employee-level detail. Employees felt exposed seeing HR-only compliance data.', change: 'Built role-based routing. Same login, completely different dashboard experience per role.' },
      { version: 'v2', title: 'Calendar-based progress view', insight: 'Users didn\'t connect with dates — they thought in milestones. "Am I on Step 3 or Step 5?"', change: 'Replaced calendar with a 5-phase milestone tracker (Initiated → In Transit → Settled → Closed). Instantly clearer.' },
      { version: 'v3', title: 'Milestone tracker + smart alerts', insight: 'Users praised the clarity. HR loved the "overdue" highlight. Employees understood their next step.', change: 'Added proactive deadline alerts (3 levels: upcoming, due today, overdue). Shipped.' },
    ],

    designSystem: {
      colors: ['#0F1923 (Navy)', '#4A8FAE (Steel blue)', '#22C55E (Compliance green)', '#F59E0B (Alert amber)', '#EF4444 (Overdue red)'],
      typography: 'Inter throughout — optimized for data-dense dashboard readability at all sizes',
      components: ['Milestone Progress Tracker', 'Document Checklist Card', 'Status Badge (3 states)', 'Alert Banner (3 severity levels)', 'Role-Based Sidebar Nav'],
    },

    outcome: 'Compliance document submission improved from 61% to 94%. Average relocation completed 3 weeks faster. SUS score jumped from 42 to 78. HR managers reduced coordination time by 60%. Product became the vendor\'s primary selling point in sales demos.',

    metrics: [
      { value: '94%', label: 'Compliance Rate (was 61%)' },
      { value: '3 wks', label: 'Faster Relocations' },
      { value: '78', label: 'SUS Score (was 42)' },
      { value: '-60%', label: 'HR Coordination Time' },
    ],

    learnings: [
      'Designing for two user types in one product requires clear role-based mental models — not just different screens, but different information architectures.',
      'Progress indicators outperform calendars when users think in milestones, not dates.',
      'Radical IA simplification (47 → 8 nav items) doesn\'t lose features — it surfaces what actually matters.',
    ],

    image: null,
  },

  {
    id: 'los-quequitos-mx',
    title: 'Los Quequitos MX',
    category: 'Brand Identity · Digital Experience',
    shortDescription:
      'A full brand identity and online ordering experience for an artisan Mexican bakery — launched with zero ad budget and received 200+ pre-orders in two weeks.',
    role: 'Brand Designer & UX/UI Designer',
    year: '2023',
    duration: '8 weeks',
    team: 'Solo designer + client',
    tags: ['Branding', 'UI Design', 'Menu Design', 'Cultural UX', 'Figma'],
    gradient: 'from-[#F0B860] via-[#E08840] to-[#C05820]',
    accentColor: '#E08840',
    accentLight: '#F5D08A',
    mockupType: 'bakery',

    overview:
      'Los Quequitos MX is a Toronto-based artisan Mexican bakery specializing in traditional pan dulce and regional pastries made with imported ingredients. The owner, Lucia, had built a loyal following through word-of-mouth and Instagram — but had no website, no pre-order system, and was overwhelmed every weekend with in-store rushes.',

    problem:
      'No digital presence meant Lucia couldn\'t manage demand, accept pre-orders, or tell her brand story to new customers. Weekend rushes caused chaos and limited her production capacity. New customers couldn\'t find her or understand what made her bakery special.',

    goal: 'Create a brand identity and digital experience that celebrates the cultural roots of Mexican baking, enables pre-orders to smooth out demand, and gives Lucia a presence that matches the quality of her product.',

    hypothesis:
      'A culturally rooted brand identity paired with a simple, trust-building ordering experience will convert social media followers into pre-order customers — without requiring any advertising budget.',

    research: {
      methods: ['Brand discovery workshop with owner', 'Cultural visual research (folk art, typography, regional aesthetics)', 'Mood board testing with target customers (n=10)', 'Competitor review (5 local bakeries)', 'First-time user testing of ordering flow (n=10)'],
      participants: 'Lucia (owner) + 10 existing customers from her Instagram community',
      keyFindings: [
        'Customers bought because of the story, not just the product — they wanted to support a cultural business',
        'Existing logos from competitors felt generic — no cultural identity was expressed',
        'Users wanted to pre-order but had no way to do so other than DMs on Instagram',
        'First-time customers didn\'t know what "pan dulce" meant — the menu needed cultural context',
        'Mobile-only audience — 100% of Lucia\'s Instagram followers used mobile exclusively',
      ],
    },

    insights: [
      { label: 'Story sells pastries', detail: 'Customers connected emotionally to Lucia\'s immigration story and the tradition behind the recipes.' },
      { label: 'Cultural context is UX', detail: 'International customers needed brief, warm explanations of unfamiliar pastries — not just names.' },
      { label: 'DM-to-order is fragile', detail: 'Managing orders via Instagram DMs was unsustainable and error-prone. A structured pre-order form was essential.' },
      { label: 'Mobile is the only device', detail: 'Every interaction — discovery, ordering, sharing — happened on a phone.' },
    ],

    persona: {
      name: 'Valentina, 26',
      role: 'University student & food content creator',
      bio: 'Valentina discovered Los Quequitos on Instagram and immediately wanted to try everything. She loves supporting local cultural businesses and shares her food experiences with 4k followers.',
      goals: ['Pre-order ahead so she doesn\'t miss out on limited items', 'Share the brand with her audience — needs beautiful visuals', 'Understand what each pastry is (she\'s not Mexican but is curious)'],
      frustrations: ['DM-ing to order feels awkward and unreliable', 'Generic bakery sites that don\'t reflect the product quality', 'Having to show up hoping items aren\'t sold out'],
    },

    userFlow: 'Instagram → Website Landing (brand story + visual hook) → Visual Menu (with pastry descriptions) → Pre-Order Form (item + pickup date) → Confirmation → Instagram share prompt',

    wireframes: [
      { phase: 'Lo-fi', description: 'Explored single-page vs. multi-page. Decided on one continuous scroll — better for mobile storytelling and sharing.' },
      { phase: 'Mid-fi', description: 'Menu card layout tested: list vs. visual grid. Grid won — users engaged with images before reading names.' },
      { phase: 'Hi-fi', description: 'Full brand system applied. Tested form flow with 10 users. Zero confusion at any step. All 10 completed the pre-order.' },
    ],

    iterations: [
      { version: 'v1', title: 'Menu as text list', insight: 'Users skipped unfamiliar names. No engagement without visual context.', change: 'Redesigned as visual cards with photography space, pastry name, cultural origin, and short description.' },
      { version: 'v2', title: 'Functional form, generic styling', insight: 'Form worked but felt disconnected from the brand warmth. "It feels like I\'m booking a dentist appointment."', change: 'Redesigned form with hand-drawn style inputs, brand colors, and a warm confirmation message in Spanish and English.' },
      { version: 'v3', title: 'Fully branded experience', insight: 'Users described it as "beautiful," "authentic," and "I want to share this." Final design shipped.', change: 'Added a post-order Instagram prompt: "Share your order and tag us." Organic sharing became primary acquisition.' },
    ],

    designSystem: {
      colors: ['#1A0A00 (Espresso)', '#E08840 (Marigold)', '#D4372C (Chile red)', '#F5F0E8 (Masa cream)', '#2D6A4F (Maguey green)'],
      typography: 'Playfair Display (brand mark) + Lato (body) — traditional warmth with modern legibility',
      components: ['Pastry Card (image + cultural tag + description)', 'Pre-Order Form (bilingual labels)', 'Brand Story Section', 'Pickup Scheduler', 'Confirmation Modal (with share CTA)'],
    },

    outcome: '200+ pre-orders in first 2 weeks with zero ad spend. 60% reduction in in-store peak-hour chaos. 3 wholesale inquiries from local cafes. Owner received media coverage from a local food blog. Instagram following grew 40% in the month post-launch.',

    metrics: [
      { value: '200+', label: 'Pre-orders (2 weeks)' },
      { value: '-60%', label: 'Peak-Hour Chaos' },
      { value: '+40%', label: 'Instagram Growth' },
      { value: '3', label: 'Wholesale Inquiries' },
    ],

    learnings: [
      'Cultural authenticity in design is not decoration — it\'s a business differentiator that builds trust and community.',
      'For small businesses, reducing operational chaos is as important a UX outcome as increasing conversions.',
      'When the product is shareable by design (beautiful visuals + share prompt), organic distribution becomes your marketing channel.',
    ],

    image: null,
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'I start by listening. User interviews, competitive audits, and heuristic evaluations help me uncover the real problem — not just the stated one.',
    icon: 'Search',
    detail: 'Research methods vary by project: interviews, contextual inquiry, surveys, session recordings, and analytics.',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Insights become a clear problem statement and design principles. I align stakeholders before a single pixel is drawn.',
    icon: 'Target',
    detail: 'Affinity mapping, journey mapping, personas, and "How Might We" frameworks shape the design direction.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'From rough sketches to high-fidelity prototypes — always tied to real user needs and validated along the way.',
    icon: 'Layers',
    detail: 'I work in Figma, moving from lo-fi wireframes through multiple iteration rounds before arriving at hi-fi.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Polished designs, developer handoff docs, component specs, and often — the front-end build itself.',
    icon: 'Rocket',
    detail: 'I bridge design and engineering using React, Tailwind, and close collaboration throughout the build.',
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

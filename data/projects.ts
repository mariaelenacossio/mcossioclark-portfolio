import type { Project, ProcessStep, SkillsMap } from '@/lib/types'

/**
 * Project order matches the Work-section grid order in the redesign spec:
 *   [mini-pancake-co, beyond-skincare, beauty-by-amy, relocateme]
 *
 * The first entry is `featured: true` and renders the deep-dive pivots
 * structure on its case-study page.
 */
export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────
  // 1 · MINI PANCAKE CO. — featured
  // ─────────────────────────────────────────────────────────────────────
  {
    id:   'mini-pancake-co',
    slug: 'mini-pancake-co',
    title: 'Mini Pancake Co.',
    category: 'E-Commerce + Booking · React Rebuild',
    shortDescription:
      'A complete React rebuild of a 5-page college site into a production e-commerce + event booking platform for a mini pancake business in Mazatlán — with WhatsApp checkout, a 5-step booking wizard, and a 3-tab admin dashboard.',
    role: 'Designer & Frontend Engineer · Solo',
    year: '2024',
    duration: '8 weeks',
    team: 'Solo · Design + Engineering',
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'E-Commerce', 'WhatsApp Checkout'],
    brand: '#F97316',
    liveUrl:  'https://mariaelenacossio.github.io/mini-pancake-co/',
    repoUrl:  'https://github.com/mariaelenacossio/mini-pancake-co',
    liveLabel:'View Mini Pancake Co. Site',
    featured: true,
    featuredHeadline: 'Two revenue flows from one codebase — by working with WhatsApp, not against it',
    featuredSubhead:
      'A college HTML site rebuilt as a production e-commerce + booking platform for a Mazatlán mini-pancake business. Three different problems, three different solutions, one running product.',

    pivots: [
      {
        n: '01',
        challenge: 'Architecture',
        problem:
          'A 5-page static HTML site with no commerce, no booking, no admin. Adding a product meant editing HTML directly. Every order happened over WhatsApp manually because the site couldn\'t capture them.',
        options: [
          { label: 'Layer Bootstrap modals onto the static site for cart UX',
            tradeoff: 'Postpones the rebuild, doesn\'t solve persistence or admin. Buys weeks, costs months.',
            chosen: false },
          { label: 'Use a SaaS like Shopify with a custom theme',
            tradeoff: 'Solves commerce instantly but locks the owner into monthly fees and removes the WhatsApp workflow entirely.',
            chosen: false },
          { label: 'Rebuild as a React SPA with Context + localStorage, deploy via GitHub Pages',
            tradeoff: 'Most code to write upfront, but full control over both flows, no recurring cost, and the data layer stays swappable for a real API later.',
            chosen: true },
        ],
        decision:
          'React 18 + Vite + Tailwind + Framer Motion, HashRouter for GitHub Pages compatibility, Context for cart and bookings, localStorage as the persistence layer. The architecture decision is to keep the data layer abstracted — a single context module — so swapping to a real backend later is a one-file change, not a rewrite.',
      },
      {
        n: '02',
        challenge: 'Checkout',
        problem:
          'Built a clean React product grid, search, sort, detail modal with topping picker, and cart. Wired it up to a generic checkout form. The owner pushed back: customers don\'t use forms here, they WhatsApp. The cart was a dead end.',
        options: [
          { label: 'Stripe Checkout — proper card payments',
            tradeoff: 'Adds a payment processor fee, requires KYC, breaks the WhatsApp habit customers already trust. Solves a problem nobody had.',
            chosen: false },
          { label: 'Email order to the owner via EmailJS',
            tradeoff: 'Owner doesn\'t check email in the workflow loop — orders would land in a channel she\'s not in. Same dead-end as the form.',
            chosen: false },
          { label: 'WhatsApp deep link with a pre-filled order message (items, toppings, quantities, total)',
            tradeoff: 'No card payments captured digitally — but matches the existing trusted channel exactly. The cart becomes an order builder, not a payment form.',
            chosen: true },
        ],
        decision:
          'Replaced the form with a single CTA that opens WhatsApp with a pre-formatted message. One tap, customer lands in the chat they already trust, owner\'s workflow is preserved, and the cart logic still produces a clean structured order. The site becomes a storefront and an order builder — the channel stays where it already worked.',
      },
      {
        n: '03',
        challenge: 'Admin',
        problem:
          'The shop covered retail. Party bookings — the higher-revenue flow — still went through DMs with no structure. The owner had no view of pending vs confirmed bookings. The site was half a product.',
        options: [
          { label: 'Push bookings into a Notion database via API',
            tradeoff: 'Owner now has to learn Notion. Adds a third tool to the stack. Free, but introduces friction in the daily workflow.',
            chosen: false },
          { label: 'Auto-generate a Google Sheet from each submission',
            tradeoff: 'Solves capture but not management — owner can see bookings, can\'t actually confirm/cancel/track from the spreadsheet without manual edits.',
            chosen: false },
          { label: 'Build a password-gated admin dashboard inside the same React app, persisting to localStorage',
            tradeoff: 'Bookings live in the device that opened the dashboard — but for a single-owner business, that\'s the right tradeoff. Full CRUD, no extra tools, same brand.',
            chosen: true },
        ],
        decision:
          'Built the 5-step booking wizard (Package → Date+Time with 7-day-min → Event details → Contact → Review) and the admin at /#/admin: stat tiles for total/pending/confirmed/revenue, full bookings table with confirm/cancel/delete, and packages overview. Same component library as the public site — every admin screen still feels on-brand.',
      },
    ],

    techStack: [
      { name: 'React 18',                 why: 'Functional components + Context for state. No prop drilling, no Redux overhead for a project this size.' },
      { name: 'Vite 5',                   why: 'Sub-second HMR. The animation work especially benefits from instant feedback during iteration.' },
      { name: 'Tailwind 3',               why: 'Tokens defined once in config, consumed everywhere. Brand orange + peach + rose stayed consistent across shop, booking, and admin without a CSS file.' },
      { name: 'Framer Motion 11',         why: 'Page transitions, modal entrances, scroll reveals via useInView. The motion system is what differentiates from a generic shop template.' },
      { name: 'React Router 6 (HashRouter)', why: 'GitHub Pages can\'t handle BrowserRouter without server-side rewrites. HashRouter ships with zero infra config.' },
      { name: 'date-fns 3',               why: 'Calendar logic for the 7-day-minimum date picker. Smaller bundle than Moment, tree-shakable.' },
      { name: 'localStorage + Context',   why: 'Persistence layer that mimics an API. The data layer is abstracted in one module — swappable for a real backend later.' },
      { name: 'GitHub Actions → GitHub Pages', why: 'Push to main, site rebuilds. No CI/CD config to maintain.' },
    ],

    overview:
      'Mini Pancake Co. is a small mini pancake business in Mazatlán, Mexico. v1 was a 5-page vanilla HTML/Bootstrap college site — pretty, static, useless for the actual business. v2 is a full React single-page application: product catalog with cart, WhatsApp-integrated checkout, a 5-step event booking wizard for parties, and an admin dashboard. Two real revenue streams (retail orders + party packages) running off one codebase.',
    problem:
      'The college version had no commerce, no booking, no admin — just five static pages. The owner was managing every order over WhatsApp manually, with no way to show packages, take party reservations, or track what had been confirmed. The site looked nice and did nothing.',
    goal:
      'Ship two products from one codebase: a working e-commerce shop with cart and WhatsApp checkout, and a 5-step event booking wizard for party packages — both with a private admin dashboard so the owner can actually run the business from the site.',
    hypothesis:
      'WhatsApp is already the channel — fighting it is the wrong move. If the cart submits a pre-formatted WhatsApp message instead of a payment, customers stay in the channel they trust, the owner keeps her workflow, and the site becomes the storefront and order builder rather than another tool to manage.',

    research: {
      methods: [
        'UX audit of the v1 college site',
        'Owner interview about real workflow',
        'WhatsApp commerce pattern research (LATAM context)',
        'Competitor review of small-business shop templates',
        'Shopify product detail UX benchmarking',
      ],
      participants: 'Owner + informal testing on the booking flow with 5 friends/family',
      keyFindings: [
        'The original was 5 static HTML pages — index, menu, partypack, about, contact — nothing was interactive',
        'Every existing order already happened over WhatsApp — replacing that flow would lose customers, not help them',
        'Party bookings (50/75/100 guests) were a real revenue stream with no system to manage them',
        'Owner had no way to see pending vs confirmed bookings — everything lived in chat history',
        'Shopify-style product detail with topping pickers (2–3 selections) was the right pattern for the menu',
      ],
    },

    insights: [
      { label: 'Don\'t fight the channel',
        detail: 'Customers already buy through WhatsApp. The cart\'s job isn\'t to replace WhatsApp — it\'s to build a clean order, then hand off into the conversation customers were going to have anyway.' },
      { label: 'Two products, one app',
        detail: 'Retail orders and party bookings are different shapes — one is a cart, the other is a wizard with date/time + guest count. Same brand, same tokens, separate flows.' },
      { label: 'The owner needs an admin',
        detail: 'Without a dashboard, the site is a marketing brochure. Adding stats, booking CRUD, and package overview is what turned it into a real business tool.' },
      { label: 'Tokens scale with the brand',
        detail: 'Encoding brand orange + peach + rose into Tailwind tokens kept the e-commerce, the booking wizard, and the admin all visually consistent without re-deciding anything per screen.' },
    ],

    persona: {
      name: 'Sofía, 28',
      role: 'Mom planning her daughter\'s birthday party',
      bio:  'Sofía found Mini Pancake Co. through Instagram. She wants to book a party package for 50 guests, see what comes with each tier, pick a date that\'s clearly available, and end up in WhatsApp with the owner so she can confirm details directly.',
      goals: [
        'Compare 50/75/100 guest packages with prices visible',
        'Pick a date and time without back-and-forth messages',
        'Land in WhatsApp with all her details already filled in',
      ],
      frustrations: [
        'Sites where you have to message to ask basic price questions',
        'Booking forms that disappear into a void with no confirmation',
        'Calendars that let you pick dates that aren\'t actually available',
      ],
    },

    userFlow:
      'Shop: Browse Products → Search/Sort → Open Detail Modal → Pick Toppings (2–3) + Quantity → Add to Cart → Cart Drawer → WhatsApp Checkout (pre-filled message)\nBooking: Open Booking Modal → 1. Package → 2. Date+Time → 3. Event Details → 4. Contact → 5. Review → Confirm\nAdmin: /#/admin → Login → Overview · Bookings · Packages',

    wireframes: [
      { phase: 'Lo-fi',
        description: 'Mapped the two parallel flows on paper — retail (cart-based) and event (wizard-based) — then sketched the admin IA so all three shared the same component primitives. Decided HashRouter for GitHub Pages compatibility.' },
      { phase: 'Mid-fi',
        description: 'Built the design tokens (brand orange + peach + rose + neutrals), then composed atoms (Button, Input, Card, Badge) and the two flows from those primitives. Validated the WhatsApp pre-fill flow end-to-end.' },
      { phase: 'Hi-fi',
        description: 'Layered Framer Motion across the app — page transitions, animated cart drawer, scroll reveals via AnimatedSection, modal entrances. Wired the admin dashboard to localStorage with full booking CRUD. Deployed via GitHub Actions.' },
    ],

    iterations: [
      { version: 'v1', title: 'Vanilla HTML + Bootstrap — 5 static pages',
        insight: 'The college version had index.html, menu.html, partypack.html, about.html, contact.html. All static. Adding a product or changing a price meant editing HTML directly. There was no order capture at all — just phone numbers and WhatsApp links.',
        change:  'Decision: keep the brand and the WhatsApp habit, throw out the implementation. Restart in React with HashRouter (so GitHub Pages would serve it correctly), Context for state, and localStorage for persistence.' },
      { version: 'v2', title: 'React shop, no checkout integration',
        insight: 'Got the product grid, search, sort, detail modal, and cart working — but checkout was a generic submit form. Owner pushed back: "Customers don\'t use forms. They WhatsApp." The cart was a dead end without honoring the real channel.',
        change:  'Replaced the checkout submit with a WhatsApp deep link that pre-fills the message: items, toppings, quantities, total. One tap, customer lands in the existing chat, owner workflow unchanged. Cart became an order builder, not a payment form.' },
      { version: 'v3', title: 'Booking wizard + admin dashboard',
        insight: 'The shop covered retail. Party bookings — the higher-revenue flow — still went through DMs with no structure. And the owner had no view of confirmed vs pending bookings. The site was half a product.',
        change:  'Built the 5-step booking wizard (Package → Date+Time → Event details → Contact → Review) with a 7-day-minimum date picker. Added the password-gated admin at /#/admin: stat tiles (Total / Pending / Confirmed / Revenue), bookings table with confirm/cancel/delete, and a packages overview. Shipped.' },
    ],

    designSystem: {
      colors: [
        '#F97316 (brand-500 / primary CTA)',
        '#E05C07 (brand-600 / hover)',
        '#FF7A55 (peach-400 / accent)',
        '#F43F79 (rose-500 / accent)',
        '#FFF6EE (brand-50 / page tint)',
        '#1A1714 (neutral-900 / ink)',
      ],
      typography: 'Nunito (display, 700–900) + Inter (body, 300–600) — rounded warmth for the brand voice, neutral sans for product detail and forms',
      components: [
        'Atoms: Button (brand shadow), Input, Badge, Card',
        'Shop: ProductCard, ProductModal (topping picker), CartDrawer, CartBadge',
        'Booking: BookingModal (5-step wizard), DatePicker (7-day-min), TimeSlotGrid, PackageCard',
        'Admin: StatTile, BookingsTable, PackageOverview, AuthGate',
        'Integration: WhatsApp deep link with pre-filled order message',
      ],
    },

    outcome:
      'Shipped a deployed production e-commerce + booking app with two real revenue flows running off one codebase: a product catalog with cart and WhatsApp checkout, a 5-step party booking wizard, and a 3-tab admin dashboard. Built on React 18 + Vite + Tailwind + Framer Motion, deployed via GitHub Actions to GitHub Pages. The original 5-page static site rebuilt into something the owner could actually run two streams of her business through.',

    metrics: [
      { value: '2 flows',   label: 'Shop + Booking'    },
      { value: '5-step',    label: 'Booking Wizard'    },
      { value: '3 tabs',    label: 'Admin Dashboard'   },
      { value: '1 channel', label: 'WhatsApp Checkout' },
    ],

    learnings: [
      'Build with the channel, not against it. WhatsApp checkout sounds unconventional but matches how customers actually buy — and the result is higher conversion than forcing a card form into a small-business context.',
      'Two flows, one design system. Encoding the brand into Tailwind tokens once let the e-commerce, the booking wizard, and the admin all stay visually consistent without re-deciding anything per screen.',
      'A site without an admin is just a brochure. The moment a small business has any real volume, the dashboard is what turns the site into a tool they can actually run revenue through.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 2 · BEYOND SKINCARE — Design System
  // ─────────────────────────────────────────────────────────────────────
  {
    id:   'beyond-skincare',
    slug: 'beyond-skincare',
    title: 'BEYOND Skincare',
    category: 'Design System · Component Library',
    shortDescription:
      'A production-grade design system for a skincare brand — 20+ atomic components, design tokens, full dark/light theming, and WCAG 2.1 AA compliance. Built with React, TypeScript, and Tailwind.',
    role: 'Design System Lead · Designer & Developer',
    year: '2024',
    duration: '12 weeks',
    team: 'Solo · Design + Engineering',
    tags: ['Design System', 'React', 'TypeScript', 'Tailwind CSS', 'Design Tokens', 'Accessibility'],
    brand: '#072ac8',
    liveUrl: 'https://mariaelenacossio.github.io/DGL-309-design-system/',
    repoUrl: 'https://github.com/mariaelenacossio/DGL-309-design-system',
    liveLabel: 'View BEYOND Site',

    overview:
      'BEYOND is a skincare brand design system built to scale across marketing pages, product detail pages, and editorial content. Instead of shipping one website, I designed a system: atomic components, tokenised styling, documented usage rules, and a sample brand site that proves the system works end-to-end. It ships as a live React + TypeScript application with interactive documentation and is deployed via GitHub Actions to GitHub Pages.',
    problem:
      'Brand sites often start clean and decay fast. Colours drift, spacing stops being consistent, accessibility gets patched in later, and components get forked for one-off pages. The first BEYOND explorations suffered from the same thing — no token layer, no component reuse rules, and no way for a future teammate to ship on-brand UI without reinventing it.',
    goal:
      'Build a design system that enforces the brand visually and technically: one source of truth for tokens, one component library for UI, built-in dark/light theming, and a documentation site that doubles as a live sandbox.',
    hypothesis:
      'If the brand language is encoded as design tokens and composable components — atoms, molecules, organisms — a single designer-developer can ship a full website, a documentation site, and a theming layer in one codebase without the UI fragmenting over time.',

    research: {
      methods: [
        'Brand audit of skincare market leaders',
        'Design system benchmarking (Material, Shopify Polaris, Atlassian)',
        'Atomic design methodology review',
        'WCAG 2.1 AA contrast and keyboard navigation audits',
        'Developer ergonomics review of Tailwind-based systems',
      ],
      participants: 'Instructor + classmate reviewers + self-directed research',
      keyFindings: [
        'Successful systems separate brand tokens from component logic — the two should be independently versionable',
        'Dark mode breaks when colour is hardcoded; it works when every colour goes through a semantic token',
        'Atomic design scales better than flat component lists when the library grows past ~15 components',
        'Interactive docs beat static docs — developers copy working code, not screenshots',
        'WCAG 2.1 AA has to be designed in from the start; retrofitting contrast and focus states is 3× the work',
      ],
    },

    insights: [
      { label: 'Tokens before components',
        detail: 'The system has to start with a tokens layer — colours, typography, spacing, shadows, radii. Components consume tokens. That split is what lets dark mode, rebrands, and theming work without touching component code.' },
      { label: 'Atomic design actually holds up',
        detail: 'Splitting into atoms / molecules / organisms made the library easier to reason about as it grew to 20+ components. Each layer has a clear job.' },
      { label: 'Docs are product',
        detail: 'Documentation pages are first-class screens in the app, not an afterthought. Each component page shows the component, its variants, and the code to use it.' },
      { label: 'Accessibility is a system property',
        detail: 'Baked WCAG 2.1 AA contrast into tokens, keyboard focus into components, and skip-links into layout. Accessibility lives in the system, not in individual pages.' },
    ],

    persona: {
      name: 'Maya, 29',
      role: 'Frontend Developer on the BEYOND team',
      bio:  'Maya ships landing pages and campaign sites for BEYOND on a two-week cadence. She doesn\'t want to pick colours or re-derive spacing every sprint — she wants a library to import from and clear rules for when to use what.',
      goals: [
        'Ship on-brand pages without pulling a designer in for every decision',
        'Trust that dark mode and accessibility already work',
        'Copy a working code snippet instead of rebuilding from a screenshot',
      ],
      frustrations: [
        'Design tokens that exist in Figma but not in code',
        'Components that look right in isolation but break at scale',
        'Systems where dark mode is a retrofit and breaks half the screens',
      ],
    },

    userFlow:
      'Docs Home → Pick a category (Colors, Typography, Spacing, Components, Forms, Navigation) → See tokens/components with live previews → Copy code → Use in a real page (BEYOND sample site) → Toggle theme → Everything still on brand',

    wireframes: [
      { phase: 'Lo-fi',
        description: 'Mapped the token architecture on paper first — colour scales, type scale, spacing scale, shadow scale, radii. Sketched the documentation IA: six top-level docs categories plus a sample brand site.' },
      { phase: 'Mid-fi',
        description: 'Built the token layer in code (src/tokens) before any components existed. Wired Tailwind to consume the tokens. Mid-fi UI sketches for each atomic component with variant matrices.' },
      { phase: 'Hi-fi',
        description: 'Shipped the full component library — atoms, molecules, organisms — plus the BEYOND sample site using only system components. Deployed via GitHub Actions to GitHub Pages.' },
    ],

    iterations: [
      { version: 'v1', title: 'Hardcoded colours, no token layer',
        insight: 'First pass used Tailwind defaults directly. The second I tried to add dark mode, colour references were scattered across 12 files. There was no single source of truth.',
        change:  'Extracted every colour, font, spacing, shadow, and radius value into a tokens directory. Configured Tailwind to extend from tokens. Components now only reference semantic names like bg-surface, text-primary, border-subtle.' },
      { version: 'v2', title: 'Flat component list',
        insight: 'With ~20 components in one folder, it got hard to tell which pieces could be composed from which. Button and IconButton lived next to Navbar and ProductCard.',
        change:  'Restructured into atoms / molecules / organisms following atomic design. Each layer only imports from layers beneath it. Made dependencies explicit and the library easier to scan.' },
      { version: 'v3', title: 'Static docs pages',
        insight: 'Documentation was screenshots plus code blocks. Developers had to mentally simulate the component instead of seeing it live.',
        change:  'Rebuilt docs as actual React pages that render live components alongside their source. Each category (Colors, Typography, Spacing, Components, Forms, Navigation) became its own interactive page. Shipped.' },
    ],

    designSystem: {
      colors: [
        '#072ac8 (Primary / royal blue)',
        '#1e96fc (Secondary / azure)',
        '#1492e6 (Accent / sky)',
        '#fcf300 (CTA / citron)',
        '#111827 (Neutral ink)',
        '#fafbfc (Neutral surface)',
      ],
      typography: 'Open Sans (UI + body) + JetBrains Mono (code) — 15-step type scale from label-sm (11px) through display-lg (clamp 40→64px)',
      components: [
        'Atoms: Button, IconButton, Input, Badge, Avatar, Tag',
        'Molecules: FormField, SearchBar, ProductCard, Toast, Tabs',
        'Organisms: Navbar, Footer, Hero, ProductGrid, Form layouts',
        'Theming: dark / light mode via semantic tokens',
        'Accessibility: WCAG 2.1 AA across all components',
      ],
    },

    outcome:
      'Shipped a live, deployed design system with 20+ documented components, six interactive docs categories, full dark/light theming, and a sample BEYOND brand site built entirely from system primitives. The system is version-controlled, deployed automatically via GitHub Actions, and publicly browsable. It demonstrates the full loop from design tokens through to a production-ready branded experience.',

    metrics: [
      { value: '20+',  label: 'Documented Components' },
      { value: 'AA',   label: 'WCAG 2.1 Compliance' },
      { value: '2',    label: 'Themes (Light / Dark)' },
      { value: '100%', label: 'Token-Driven UI' },
    ],

    learnings: [
      'A design system only holds together if tokens come first. Everything else — theming, accessibility, rebrands — becomes easier the moment you stop hardcoding values in components.',
      'Atomic design is not academic. Once a library passes ~15 components, splitting into atoms, molecules, and organisms starts paying back in clarity.',
      'Documentation is part of the product. Interactive docs that show live components plus their code lower the friction for anyone building on top of the system.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3 · BEAUTY BY AMY — Booking Platform
  // ─────────────────────────────────────────────────────────────────────
  {
    id:   'beauty-by-amy',
    slug: 'beauty-by-amy',
    title: 'Beauty by Amy',
    category: 'Booking Platform · Full-Stack Frontend',
    shortDescription:
      'A complete React rebuild of a 4-page college project into a production booking platform — 5-step wizard, admin dashboard with full CRUD, dark mode, and a Framer Motion-driven motion system.',
    role: 'Designer & Frontend Engineer · Solo',
    year: '2024',
    duration: '8 weeks',
    team: 'Solo · Design + Engineering',
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Booking System', 'Admin Dashboard'],
    brand: '#A05549',
    liveUrl: 'https://mariaelenacossio.github.io/beautybyamy.github.io/',
    repoUrl: 'https://github.com/mariaelenacossio/beautybyamy.github.io',
    liveLabel: 'View Beauty by Amy Site',

    overview:
      'Beauty by Amy started as a four-page vanilla HTML/CSS school project for an independent nail technician. v2.0 is a full rebuild into a production-ready React app with a 5-step booking wizard, a password-gated admin dashboard, dark/light theming, and a comprehensive motion system. The same brand, but engineered for an actual business to run on.',
    problem:
      'The original site looked like what it was — a course assignment. Static pages, no booking, no way for Amy to manage her schedule, no mobile parity. Inquiries lived in DMs and texts. There was no system, just a pretty wrapper around manual coordination.',
    goal:
      'Ship a real product. Public site that earns trust on first impression, a booking flow Amy\'s clients can complete on a phone in under two minutes, and an admin layer Amy can actually run her appointments from — all in one codebase, fully responsive, fully accessible.',
    hypothesis:
      'A mobile-first booking wizard with progressive disclosure, an admin dashboard built from the same component library, and a token-driven design system will turn a static portfolio site into something Amy can use as her actual business backend — without needing a dedicated booking SaaS.',

    research: {
      methods: [
        'UX audit of the v1 college site',
        'Competitor review of Fresha, GlossGenius, Square Appointments',
        'Service-business booking pattern research',
        'Mobile-first usability principles',
        'Framer Motion animation pattern study',
      ],
      participants: 'Amy (the client) + informal usability checks on the booking flow with 5 friends/family in the target demographic',
      keyFindings: [
        'The v1 was a 4-page static site — no booking system at all, no admin, nothing persistent',
        'Successful booking products use 3–5 step wizards, not single-page mega-forms',
        'Service businesses need an admin dashboard, not just a public site — bookings have to land somewhere',
        'Motion design carries premium perception: page transitions, spring physics, staggered reveals',
        'Dark mode is now a baseline expectation for portfolio-grade work',
      ],
    },

    insights: [
      { label: 'Two products, one codebase',
        detail: 'A booking platform is really two apps — a public-facing site and an admin app. Building them from the same component library and design tokens kept the brand consistent and the build small.' },
      { label: 'Persistence without a backend',
        detail: 'localStorage handles bookings, clients, and availability. Lets the demo work without infrastructure, while the architecture stays ready to swap in a real API.' },
      { label: 'Motion is part of the brand',
        detail: 'Framer Motion isn\'t decoration — staggered reveals, spring buttons, page transitions are what makes the experience feel premium instead of generic.' },
      { label: 'Tokens travel further than CSS',
        detail: 'Encoding brand color and spacing into Tailwind tokens meant dark mode, hover states, focus rings, and the entire admin layer all stayed on-brand without me re-deciding anything.' },
    ],

    persona: {
      name: 'Camila, 31',
      role: 'Long-time client booking on her phone',
      bio:  'Camila found Amy through Instagram. She wants to book a fill in under two minutes from her phone between meetings. She\'s used to Fresha and won\'t tolerate friction — slow loads, hidden pricing, or having to text to confirm.',
      goals: [
        'Book in under two minutes on a phone',
        'See pricing and duration upfront before committing',
        'Get a confirmation screen she can trust without calling',
      ],
      frustrations: [
        'Sites that hide prices until the end',
        'Forms that don\'t validate until submit',
        'Feeling unsure whether a booking actually went through',
      ],
    },

    userFlow:
      'Public: Home → Services → Book Now → 1. Service → 2. Date → 3. Time → 4. Details → 5. Confirmation\nAdmin: /admin → Login → Overview · Appointments · Clients · Availability',

    wireframes: [
      { phase: 'Lo-fi',
        description: 'Sketched the 5-step wizard and the admin IA in parallel — wanted to make sure the same component primitives served both. Mapped out booking states and admin tabs side by side.' },
      { phase: 'Mid-fi',
        description: 'Built the design tokens and core atoms (Button, Input, Card, Badge) in Tailwind first, then composed the booking step screens and the dashboard layout from those primitives.' },
      { phase: 'Hi-fi',
        description: 'Layered Framer Motion across the entire app — page transitions, scroll reveals, spring hover states. Added dark mode via a single Tailwind class. Tested full flow on real devices before deploy.' },
    ],

    iterations: [
      { version: 'v1', title: 'Vanilla HTML/CSS — 4 static pages',
        insight: 'The college version had no booking, no persistence, no admin. Beautiful as a layout exercise, useless as a product. Every interaction was a phone call.',
        change:  'Decision: throw out the implementation, keep the brand. Restart in React with a real architecture: routing, context, persistence, and an admin layer from day one.' },
      { version: 'v2', title: 'React rebuild — wizard, no motion',
        insight: 'Got the 5-step wizard working with bare components. Functionally complete but felt mechanical — every page change was a hard cut. The brand promise was "premium", the experience felt like a form.',
        change:  'Layered Framer Motion across the app: page transitions with custom easing, staggered scroll reveals, spring physics on buttons, animated success state. Same logic, completely different feel.' },
      { version: 'v3', title: 'Admin dashboard + dark mode',
        insight: 'Public site shipping was only half the product. Without an admin layer, Amy still had to track bookings in a notebook. And dark mode had become a baseline expectation for portfolio work.',
        change:  'Built the password-gated admin app at /admin: Overview stats, Appointments CRUD, auto-built Clients view, Availability calendar. Wired Tailwind dark mode via class strategy with system-preference detection. Shipped.' },
    ],

    designSystem: {
      colors: [
        '#A05549 (brand-600 / primary CTA)',
        '#BC6B5E (brand-500)',
        '#CE8578 (brand-400 / hover)',
        '#FAFAF9 (warm-50 / page bg)',
        '#F5F3F1 (warm-100 / alt sections)',
        '#1A1714 (warm-900 / primary text)',
      ],
      typography: 'Playfair Display (display headings) + DM Sans (UI + body) — editorial serif for brand moments, neutral sans for everything functional',
      components: [
        'Atoms: Button (spring), Input, Badge, Card, NavLink',
        'Booking: ServiceCard, DatePicker, TimeSlotGrid, ProgressStepper, SuccessState',
        'Admin: StatTile, AppointmentRow, ClientCard, BlockedDateCalendar, AuthGate',
        'Motion: page transitions (400ms cubic-bezier 0.22,1,0.36,1), staggered reveals via useInView, spring buttons, animated check-draw',
        'Theming: light + dark mode via Tailwind class strategy with system-preference detection',
      ],
    },

    outcome:
      'Shipped a deployed, production-grade React booking platform: 4 public pages, a 5-step booking wizard, a 4-tab admin dashboard with full CRUD, complete dark mode, and a documented animation system. Built on React 18 + Vite + Tailwind + Framer Motion. The original 4-page college project rebuilt as something Amy could plausibly run a business on.',

    metrics: [
      { value: '5-step',   label: 'Booking Wizard'   },
      { value: '4 tabs',   label: 'Admin Dashboard'  },
      { value: '2 themes', label: 'Light + Dark'     },
      { value: 'WCAG AA', label: 'Accessibility'    },
    ],

    learnings: [
      'A real product is the public site plus the admin layer. Building them in the same codebase from the same tokens is what keeps a solo build maintainable.',
      'Motion is brand. Framer Motion across page transitions, scroll reveals, and button springs is what separates a "site" from a "premium experience."',
      'localStorage is a legitimate persistence layer for portfolio and demo work. The architecture decision is to keep the data layer abstracted so swapping to a real API later is a one-file change.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 4 · RELOCATEME — SaaS Dashboard
  // ─────────────────────────────────────────────────────────────────────
  {
    id:   'relocateme',
    slug: 'relocateme',
    title: 'relocateMe',
    category: 'SaaS Dashboard · Product Design',
    shortDescription:
      'A unified relocation management platform that replaced 12 spreadsheets with one calm, guided dashboard — improving compliance from 61% to 94%.',
    role: 'UX Researcher & Product Designer',
    year: '2023',
    duration: '14 weeks',
    team: '2 UX designers + 3 developers + PM',
    tags: ['SaaS', 'Dashboard Design', 'User Research', 'Information Architecture', 'React'],
    brand: '#4A8FAE',

    overview:
      'relocateMe is a B2B SaaS platform for corporate relocation. HR managers use it to coordinate employee moves across cities and countries — a process involving dozens of documents, deadlines, vendors, and stakeholders. The legacy product was failing both sides of the equation.',
    problem:
      'HR managers juggled 12+ spreadsheets with no single source of truth. Employees in transit had no visibility into their own relocation progress. Compliance deadlines were frequently missed, creating legal exposure for the companies involved.',
    goal:
      'Design a unified, role-based dashboard that gives HR managers full visibility and control, while giving relocating employees a calm, step-by-step experience — eliminating the spreadsheet dependency entirely.',
    hypothesis:
      'A milestone-based progress system with role-specific views and automated compliance alerts will reduce coordination errors and improve both HR efficiency and employee satisfaction during the relocation process.',

    research: {
      methods: [
        'Contextual inquiry (observed real relocations)',
        'Stakeholder interviews (6 HR managers)',
        'Employee interviews (8 people in active relocation)',
        'Card sorting (IA restructuring)',
        'Journey mapping (47 touchpoints identified)',
      ],
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
      { label: 'Two worlds, one product',
        detail: 'HR and employees had completely different mental models of relocation. One product needed two distinct views.' },
      { label: 'Checklist over calendar',
        detail: 'Users thought in tasks and milestones, not dates. A timeline was less useful than a progress tracker.' },
      { label: 'Alert fatigue is real',
        detail: 'The legacy tool sent 15+ email notifications per week per user. Users ignored all of them.' },
      { label: 'Navigation overload',
        detail: '47 nav items for an 8-item use case. Radical simplification was needed.' },
    ],

    persona: {
      name: 'Rachel, 41',
      role: 'HR Manager, Tech Company',
      bio:  'Rachel manages relocations for a 500-person company. She coordinates 4–6 active relocations at any time, each with different deadlines and requirements. She\'s efficient, process-driven, and loses sleep over compliance.',
      goals: [
        'Single view of all active relocations',
        'Know which documents are overdue before they become a problem',
        'Spend less time chasing employees for paperwork',
      ],
      frustrations: [
        'Spreadsheets that go out of sync',
        'Employees who don\'t know what they need to submit',
        'No audit trail when things go wrong',
      ],
    },

    userFlow:
      'HR: Login → Dashboard (all relocations) → Select Employee → Document Checklist → Send Alert → Track Completion\nEmployee: Login → My Relocation → Current Step → Upload Document → See Next Milestone',

    wireframes: [
      { phase: 'Lo-fi',
        description: 'Explored 3 dashboard layouts: list, card grid, and kanban. Card sorting sessions determined the IA with HR managers.' },
      { phase: 'Mid-fi',
        description: 'Separate wireframes for HR and employee views. Milestone tracker tested with 6 users — all preferred it over calendar.' },
      { phase: 'Hi-fi',
        description: 'Full component library built. Role-based login routes to the correct dashboard. Tested full flow with both user types.' },
    ],

    iterations: [
      { version: 'v1', title: 'Unified view for both roles',
        insight: 'HR managers felt overwhelmed by employee-level detail. Employees felt exposed seeing HR-only compliance data.',
        change:  'Built role-based routing. Same login, completely different dashboard experience per role.' },
      { version: 'v2', title: 'Calendar-based progress view',
        insight: 'Users didn\'t connect with dates — they thought in milestones. "Am I on Step 3 or Step 5?"',
        change:  'Replaced calendar with a 5-phase milestone tracker (Initiated → In Transit → Settled → Closed). Instantly clearer.' },
      { version: 'v3', title: 'Milestone tracker + smart alerts',
        insight: 'Users praised the clarity. HR loved the "overdue" highlight. Employees understood their next step.',
        change:  'Added proactive deadline alerts (3 levels: upcoming, due today, overdue). Shipped.' },
    ],

    designSystem: {
      colors: [
        '#0F1923 (Navy)',
        '#4A8FAE (Steel blue)',
        '#22C55E (Compliance green)',
        '#F59E0B (Alert amber)',
        '#EF4444 (Overdue red)',
      ],
      typography: 'Inter throughout — optimized for data-dense dashboard readability at all sizes',
      components: [
        'Milestone Progress Tracker',
        'Document Checklist Card',
        'Status Badge (3 states)',
        'Alert Banner (3 severity levels)',
        'Role-Based Sidebar Nav',
      ],
    },

    outcome:
      'Compliance document submission improved from 61% to 94%. Average relocation completed 3 weeks faster. SUS score jumped from 42 to 78. HR managers reduced coordination time by 60%. Product became the vendor\'s primary selling point in sales demos.',

    metrics: [
      { value: '94%',   label: 'Compliance Rate (was 61%)' },
      { value: '3 wks', label: 'Faster Relocations'        },
      { value: '78',    label: 'SUS Score (was 42)'        },
      { value: '-60%',  label: 'HR Coordination Time'      },
    ],

    learnings: [
      'Designing for two user types in one product requires clear role-based mental models — not just different screens, but different information architectures.',
      'Progress indicators outperform calendars when users think in milestones, not dates.',
      'Radical IA simplification (47 → 8 nav items) doesn\'t lose features — it surfaces what actually matters.',
    ],
  },
]

/** Lookup helper. */
export const getProject = (slug: string): Project | undefined =>
  projects.find(p => p.slug === slug)

/** Homepage Process section data. */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title:  'Discover',
    description: 'Listen before everything. Interviews, audits, recordings — find the actual problem.',
    detail: 'Methods vary by project: user interviews, contextual inquiry, surveys, heuristic evaluations, and analytics.',
  },
  {
    number: '02',
    title:  'Define',
    description: 'Turn raw research into a problem statement everyone agrees on before opening Figma.',
    detail: 'Affinity mapping, journey mapping, personas, and How Might We exercises shape the direction.',
  },
  {
    number: '03',
    title:  'Design',
    description: 'Lo-fi first, always. Sketch, test early, find the gaps, then refine.',
    detail: 'I work in Figma, moving from rough wireframes through iteration rounds before arriving at hi-fi.',
  },
  {
    number: '04',
    title:  'Deliver',
    description: 'Clean specs, real handoffs, and code when it matters.',
    detail: 'When I build it, I use React and Tailwind. When someone else does, I stay close to catch things before they go live.',
  },
]

export const skills: SkillsMap = {
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

# Mariaelena Cossio Clark — Portfolio

A premium, production-ready one-page portfolio website for a UX/UI Designer & Web Developer.

**Live at:** `mcossioclark.com` *(configure with your domain)*

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Contact Form | EmailJS |
| Deployment | AWS S3 + CloudFront (or Vercel / Netlify) |

---

## Project Structure

```
mcossioclark-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CustomCursor.jsx      # Animated custom cursor
│   │   │   └── ScrollReveal.jsx      # Scroll-triggered animation wrapper
│   │   ├── Navbar.jsx                # Fixed nav with scroll-aware styling
│   │   ├── Hero.jsx                  # Animated hero with particle canvas
│   │   ├── About.jsx                 # About section with pillar cards
│   │   ├── Skills.jsx                # Skills categorized by UX / UI / Dev
│   │   ├── CaseStudies.jsx           # Project grid + case study modals
│   │   ├── Process.jsx               # 4-step design process
│   │   ├── Contact.jsx               # EmailJS contact form + social links
│   │   └── Footer.jsx
│   ├── data/
│   │   └── projects.js               # All project content + skills data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

---

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/mcossioclark-portfolio.git
cd mcossioclark-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Configure the Contact Form (EmailJS)

1. Sign up at [emailjs.com](https://www.emailjs.com/) — free tier: 200 emails/month
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** — use variables: `{{name}}`, `{{email}}`, `{{message}}`
4. Open `src/components/Contact.jsx` and replace the placeholders at the top:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // found in Account → API Keys
```

---

## Update Your Content

All portfolio content lives in **`src/data/projects.js`**:

- **`projects`** — case study cards (title, description, problem, process, solution, outcome)
- **`skills`** — UX / UI / Development skill tags
- **`processSteps`** — 4-step design process

Social links and personal info are in `src/components/Contact.jsx` and `src/components/Navbar.jsx`.

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to upload to any static host.

```bash
# Preview the production build locally
npm run preview
```

---

## Deployment

### Option A: AWS S3 + CloudFront (Recommended for custom domain)

```bash
# 1. Build
npm run build

# 2. Create an S3 bucket (replace with your bucket name)
aws s3 mb s3://mcossioclark-portfolio

# 3. Enable static website hosting on the bucket
aws s3 website s3://mcossioclark-portfolio \
  --index-document index.html \
  --error-document index.html

# 4. Upload the build
aws s3 sync dist/ s3://mcossioclark-portfolio --delete

# 5. Set public read policy
aws s3api put-bucket-policy \
  --bucket mcossioclark-portfolio \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mcossioclark-portfolio/*"
    }]
  }'
```

**Then create a CloudFront distribution:**

1. Go to AWS CloudFront → Create Distribution
2. Origin: your S3 bucket website endpoint
3. Enable **HTTPS** (use ACM certificate for your domain)
4. Set Default Root Object: `index.html`
5. Add Error Page: `404 → /index.html → 200` (for SPA routing)
6. Point your domain's DNS (CNAME or A record) to the CloudFront URL

### Option B: Vercel (One-command deploy)

```bash
npm install -g vercel
vercel --prod
```

### Option C: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Accessibility

- Semantic HTML5 landmarks
- ARIA labels and live regions
- Skip-to-content link for keyboard users
- Focus-visible states on all interactive elements
- `prefers-reduced-motion` support
- Color contrast meets WCAG 2.1 AA

---

## Performance

- Code-split vendor and animation chunks
- Font preloading via Google Fonts
- Canvas particle animation (requestAnimationFrame)
- Lazy scroll-triggered animations via `react-intersection-observer`
- SVG favicon (no external dependency)

---

## License

MIT — feel free to use this as a template for your own portfolio.

---

*Designed & built by Mariaelena Cossio Clark*

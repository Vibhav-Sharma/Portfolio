<p align="center">
  <strong>vibhav.dev</strong>
</p>

<p align="center">
  <em>Personal portfolio & digital résumé — built with Next.js 16, Framer Motion, and Tailwind CSS v4.</em>
</p>

<p align="center">
  <a href="https://vibhavsharma.dev">Live Site</a> ·
  <a href="https://github.com/Vibhav-Sharma">GitHub</a> ·
  <a href="https://www.linkedin.com/in/vibhav-sharma-6599b4287/">LinkedIn</a>
</p>

---

## ✨ Overview

A sleek, dark-themed portfolio website for **Vibhav Sharma** — AI Engineer & LLM Researcher at VIT Chennai. The site showcases professional experience, research publications, featured projects, and technical skills through a highly interactive, animation-rich single-page application.

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| **Interactive Dot Grid Background** | Full-viewport HTML5 Canvas with mouse-reactive dots that ripple, glow, and spring back to position in real-time |
| **Animated Doodle Mascot** | SVG pet mascot (cat, panda, fox, bunny, bear) fixed to the bottom-right — eyes track your cursor with smooth lerp, random blinking, emoji burst on click, and a switcher menu |
| **Neural Mesh Canvas** | Floating node-and-edge particle network with mouse attraction, wrap-around physics, and pulsing opacity |
| **Mouse Glow Effect** | Subtle radial gradient spotlight that follows the cursor across the page |
| **Scroll Reveal Animations** | Intersection Observer–driven entrance animations (fade, slide) with configurable direction and stagger |
| **Animated Counters** | Spring-physics number counters that count up from zero when scrolled into view |
| **Smooth Scrolling Navbar** | Sticky header with glassmorphism backdrop blur, scroll-aware transparency, and smooth anchor navigation |
| **Fully Responsive** | Mobile-first layout with breakpoints at `sm`, `md`, and `lg` |
| **Accessibility** | Respects `prefers-reduced-motion`, hides decorative elements with `aria-hidden`, touch-device detection |
| **SEO Optimized** | Open Graph, Twitter Card meta tags, structured heading hierarchy, semantic HTML5 |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + PostCSS |
| **Animations** | Framer Motion 12, GSAP 3 |
| **Smooth Scroll** | Lenis |
| **Icons** | react-icons (Feather icon set) |
| **Fonts** | Inter (Google Fonts, `next/font`) |
| **Utilities** | clsx + tailwind-merge (`cn()` helper) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Portfolio/
├── public/                       # Static assets (SVGs, favicon)
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 theme, scrollbar, content-container
│   │   ├── layout.tsx            # Root layout — Inter font, metadata, film grain
│   │   ├── page.tsx              # Home page — assembles all sections
│   │   └── favicon.ico
│   ├── components/
│   │   ├── hero/
│   │   │   ├── DotGridCanvas.tsx # Mouse-reactive dot grid (HTML5 Canvas)
│   │   │   └── NeuralMesh.tsx    # Floating particle node network (Canvas)
│   │   ├── sections/
│   │   │   ├── Hero.tsx          # Landing hero — name, tagline, CTAs
│   │   │   ├── About.tsx         # About me blurb
│   │   │   ├── Experience.tsx    # Work & research timeline cards
│   │   │   ├── Projects.tsx      # Featured project cards with tech tags
│   │   │   ├── Publications.tsx  # Research paper cards with status badges
│   │   │   ├── Skills.tsx        # Categorized skill chips grid
│   │   │   └── Contact.tsx       # Contact links & CTA
│   │   ├── ui/
│   │   │   ├── ScrollReveal.tsx  # Intersection Observer scroll animation wrapper
│   │   │   ├── ProjectCard.tsx   # Reusable project card with spotlight hover
│   │   │   └── AnimatedCounter.tsx # Spring-physics counting animation
│   │   ├── DoodleMascot.tsx      # Interactive SVG mascot (5 animal skins)
│   │   ├── MouseGlow.tsx         # Cursor-following radial gradient overlay
│   │   ├── Navbar.tsx            # Fixed navbar with scroll-aware glass effect
│   │   └── Footer.tsx            # Minimal copyright footer
│   └── lib/
│       ├── data.ts               # All portfolio content (config, links, projects, etc.)
│       ├── animations.ts         # Framer Motion variant presets
│       └── utils.ts              # cn() class merge utility
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── vercel.json                   # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/Vibhav-Sharma/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#08080a` | Page & surface base |
| Text Primary | `#f4f4f5` (zinc-100) | Headings, body text |
| Text Secondary | `#a1a1aa` (zinc-400) | Descriptions, muted text |
| Accent | `#a855f7` (purple-500) | Borders, highlights, CTAs |
| Accent Light | `#c084fc` (purple-400) | Tags, hover states |
| Accent Glow | `rgba(139,92,246,0.04)` | Mouse spotlight, ambient effects |

### Typography

- **Font Family:** Inter (variable, Latin subset)
- **Heading Scale:** `text-4xl` → `text-8xl` (responsive)
- **Body:** `text-base` → `text-xl`
- **Mono Accents:** `font-mono` for dates, labels, nav links

### Layout

- **Max Content Width:** 1150px (`.content-container`)
- **Horizontal Padding:** 1.75rem → 4rem (responsive)
- **Section Spacing:** `py-32` → `py-48` with `min-h-screen`

---

## 📝 Content Management

All portfolio content is centralized in [`src/lib/data.ts`](src/lib/data.ts):

- **`siteConfig`** — Name, title, description, social links, resume URL
- **`navLinks`** — Navigation anchor links
- **`experiences`** — Work & research experience entries
- **`projects`** — Featured project cards (title, description, tech stack, badges)
- **`publications`** — Research papers with venue, status, and links
- **`skillCategories`** — Grouped technical skills

To update your portfolio content, edit this single file — no component changes needed.

---

## 🌐 Deployment

The site is configured for **Vercel** deployment out of the box:

```json
// vercel.json
{ "framework": "nextjs" }
```

Push to your connected GitHub repo and Vercel will auto-deploy.

**Manual deploy:**

```bash
npx vercel --prod
```

---

## 📄 License

© 2026 Vibhav Sharma. All rights reserved.

---

<p align="center">
  Built with 💜 by <a href="https://github.com/Vibhav-Sharma">Vibhav Sharma</a>
</p>

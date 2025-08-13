## Nakul Jhunjhunwala – Meta Portfolio (Arcade • Code • Terminal)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/) [![Zustand](https://img.shields.io/badge/Zustand-State%20Mgmt-000000)](https://github.com/pmndrs/zustand) [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-ff0050)](https://www.framer.com/motion/)

An immersive, route-based portfolio that lets you explore my work in multiple experiences:
- Retro Arcade with playable mini‑games
- Code Editor interface
- Terminal interface with real commands
- Glass Morphism presentation

Built for performance, SEO, and delight.

## Live

- Primary: `https://nakuljhunjhunwala.in`

## Features at a Glance

- Multiple themed experiences (Retro, Code Editor, Glass, Terminal)
- Route-based navigation: direct links to theme pages
- Smooth UX with native theme animations (no global double animations)
- Hydration guard on first load to prevent mismatches
- Strong SEO: canonical URLs, structured data (JSON-LD), robots, and sitemap
- Persisted preferences and visit stats via Zustand
- Accessible design with keyboard-friendly components

## Structure

- `app/`
  - `page.tsx` – Landing page
  - `themes/[theme]/page.tsx` – Dynamic theme routes (SSG)
  - `head.tsx` – Global meta + JSON-LD
  - `sitemap.ts` / `robots.ts` – SEO file conventions
  - `layout.tsx` – Global providers
- `components/`
  - `landing/` – Landing UI and shapes
  - `portfolio/themes/` – Theme UIs: Retro, Code, Glass, Terminal
  - `portfolio/ThemeSwitcher.tsx` – Floating theme switcher
  - `storytelling/` – Journey manager and guided overlays
  - `common/` – Error boundary, loading screen, hydration guards
- `lib/seo.ts` – SEO utilities: site metadata, JSON-LD, robots, sitemap, keywords
- `constants/portfolio.ts` – Single source of truth for personal info, skills, projects, etc.
- `stores/portfolioStore.ts` – Zustand store with persistence

## Routes

- `/` – Landing (choose experience, socials, intro)
- `/themes/retro` – Retro Gaming theme
- `/themes/code` – Code Editor theme
- `/themes/glass` – Glass Morphism theme
- `/themes/terminal` – Terminal theme

Each theme route has canonical metadata and JSON-LD for rich results. Routes are pre-generated via `generateStaticParams` for fast loads.

## Retro Arcade Theme
- Playable mini-games embedded in the portfolio experience:
  - Breakout, Dino Game, Flappy Bird, Pong, Road Rush, Snake, Space Invaders, Tetris, Tic‑Tac‑Toe
- General controls
  - Arrow keys: move
  - Space / Enter: action (jump / shoot / start)
  - R: restart (when shown)
- Designed to be light, responsive and fun while still showcasing projects, skills and experience

## Terminal Theme Cheat‑Sheet
Run real commands to discover content.

```bash
# help & onboarding
welcome
help

# profile & content
about
skills --category frontend
projects --id b2b-api-system
experience
contact
socials

# fun & utilities
whoami
pwd
ls
cat README.md
neofetch
joke
clear
```

## SEO & Rich Results

- Global title/description + icons from `lib/seo.ts`
- Keywords auto-built from portfolio data, skills, and projects
- JSON-LD:
  - Site-wide: `WebSite`, `Person`, `ItemList` (Projects)
  - Per-theme: `WebPage` + `BreadcrumbList`
- Robots: respects `NEXT_PUBLIC_INDEXING` and links `sitemap.xml`
- Sitemap: includes `/` and all `/themes/*` routes

Environment variables (optional):

- `NEXT_PUBLIC_SITE_URL` – Canonical base URL
- `NEXT_PUBLIC_INDEXING` – Set to `false` to disable indexing
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` – Google verification
- `NEXT_PUBLIC_BING_VERIFICATION` – Bing verification
- `NEXT_PUBLIC_YANDEX_VERIFICATION` – Yandex verification

## Theming & UX

- Theme switching via floating switcher (`ThemeSwitcher`) with instant route navigation
- Per-theme animations only; global page transition removed to avoid double animations
- First-load hydration guard (`EnsureInitialized`) prevents mismatch flicker

## Content Source

All content is centralized in `constants/portfolio.ts`:

- Personal info (name, title, bio, location, avatar, socials)
- Skills (categories, proficiency, last used)
- Projects (descriptions, features, media, links, metrics)
- Experience & certifications

Editing this single file updates all themes.

## Development

- Requirements: Node 18+ recommended
- Install and run:

```bash
# install
yarn # or pnpm install / npm install

# dev
yarn dev

# build & start
yarn build
yarn start
```

## Tech Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS
- Zustand for state, `persist` middleware
- Framer Motion for micro-interactions
- next-themes for theme class handling
- Lucide icons and shadcn/ui primitives

## Accessibility & Deploy

- Keyboard navigable interactive elements
- Motion preferences respected where applicable
- High contrast options extensible through store preferences
- Optimized for Vercel. Ensure `NEXT_PUBLIC_SITE_URL` points to the production domain
- Sitemap and robots are generated via file conventions (`app/sitemap.ts`, `app/robots.ts`)

## Customization

- Add/edit themes under `components/portfolio/themes/`
- Extend SEO keywords via `lib/seo.ts#getKeywords()`
- Modify journeys or onboarding in `components/storytelling/`

## Roadmap

- More arcade mini‑games and achievements
- Print‑friendly resume route
- Analytics for theme/game engagement
- More granular accessibility settings (reduced motion, high contrast presets)

## License

MIT © Nakul Jhunjhunwala

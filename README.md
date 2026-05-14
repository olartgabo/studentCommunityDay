# Student Community Day · 2026

High-end, animated landing for **AWS Student Community Day** at UPB Cochabamba.

**Stack** — React 18 · TypeScript · Vite · Tailwind CSS · GSAP (+ ScrollTrigger, TextPlugin) · Lenis smooth scroll.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle to dist/
npm run preview  # serve dist/
```

## Project structure

```text
.
├── index.html              # Vite entry
├── tailwind.config.js      # brand tokens → tailwind theme
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx            # React root
│   ├── App.tsx             # composes sections + smooth scroll
│   ├── styles/globals.css  # tailwind layers + component utilities
│   ├── lib/
│   │   └── smoothScroll.tsx  # Lenis + GSAP ticker bridge
│   ├── data/
│   │   └── event.ts        # tracks, schedule, speakers, sponsors, copy
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── Marquee.tsx
│       ├── Manifesto.tsx
│       ├── Tracks.tsx
│       ├── Schedule.tsx
│       ├── Speakers.tsx
│       ├── Register.tsx
│       ├── Footer.tsx
│       ├── Logo.tsx
│       └── ScrollProgress.tsx  # scroll bar + cursor glow
└── legacy/                 # original static HTML system (reference)
```

## Editing notes

- Brand tokens (navy / cyan / ink scales, fonts) live in `tailwind.config.js`.
- Reusable utility classes (`mono-label`, `pill`, `btn-primary`, `grid-bg`, `corner-label`, etc.) live in `src/styles/globals.css`.
- Event content (tracks, schedule, speakers, sponsors, marquee phrases) is centralized in `src/data/event.ts`.
- The original design system + landing are preserved under `legacy/` for reference.
- `prefers-reduced-motion` disables animations and Lenis smooth wheel.

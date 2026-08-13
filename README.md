# Sanal T — Portfolio

A dark, minimal AI/ML engineer portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Editing content

Almost everything you'll want to change lives in one file:

`src/data/content.js` — your name, bio, projects, skills, and experience.

- **Resume**: set `profile.resumeUrl` to a direct PDF link (e.g. host it in this repo under `public/resume.pdf` and link to `/resume.pdf`, or use a Google Drive link with "Anyone with the link can view" sharing).
- **Photo**: the design currently doesn't use a headshot. If you want one, add it to `src/assets/`, import it in `Hero.jsx` or add an `About` visual, and I can help wire it in.
- **Projects**: edit the `projects` array — add/remove entries freely, the grid adapts automatically.

## After you deploy

Update the `og:image` / `twitter:image` tags in `index.html` to use your full production URL (e.g. `https://sanal-portfolio.vercel.app/og-image.png`) — social platforms need an absolute URL to render link previews correctly.

## Deploying to Vercel

**Option A — GitHub (recommended)**
1. Push this project to a new GitHub repo.
2. Go to https://vercel.com/new, import the repo.
3. Vercel auto-detects Vite — framework preset "Vite", build command `npm run build`, output directory `dist`. Click Deploy.
4. Every push to `main` auto-deploys.

**Option B — Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (link/create project, confirm build settings), then `vercel --prod` to ship.

## Tech

- React 19 + Vite
- Tailwind CSS v4 (tokens in `src/index.css`)
- Framer Motion (scroll reveals, hero stagger)
- lucide-react (icons)
- Signature: a canvas-based "attention grid" animation in the hero (`src/components/AttentionGrid.jsx`), and cursor-spotlight project cards (`src/components/SpotlightCard.jsx`)

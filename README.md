# Portfolio by Shaksham

Live at: https://portfoliobyshaksham.github.io

## How this project is organised
- `source/` – the React + TypeScript + Tailwind (shadcn structure) project you edit.
  - `source/src/data/projects.ts` – project list: titles, summaries, details.
  - `source/src/pages/Home.tsx` – home page (hero, featured work, contact).
  - `source/src/pages/WorkPage.tsx` – all projects (`/work/`) in four folders, using `components/ui/glass-folder-cards.tsx`.
  - `source/src/pages/AboutPage.tsx` – about page (`/about/`).
  - `source/src/pages/ContactPage.tsx` – contact page (`/contact/`).
  - `source/src/pages/ProjectPage.tsx` – layout of each project page (`/work/<project>/`).
  - `source/public/projects/<project>/` – case-study pages as images.
  - `source/src/components/ui/perspective-tunnel-hero.tsx` – the 3D tunnel hero.
  - `source/public/images/` – images.
- Repository root (`index.html`, `404.html`, `work/`, `about/`, `contact/`, `assets/`, `images/`, `projects/`) – the built website GitHub Pages serves. Don't edit by hand.

## Updating the site
```bash
cd source
npm install
npm run dev     # preview locally
npm run build   # writes the finished site to the repository root
```
Then commit and push.

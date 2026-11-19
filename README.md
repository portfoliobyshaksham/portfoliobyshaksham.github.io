# Portfolio by Shaksham

Live at: https://portfoliobyshaksham.github.io

## How this project is organised
- `source/` – the React + TypeScript + Tailwind (shadcn structure) project you edit.
  - `source/src/App.tsx` – page content (about, projects, contact).
  - `source/src/components/ui/perspective-tunnel-hero.tsx` – the 3D tunnel hero.
  - `source/public/images/` – images.
- Repository root (`index.html`, `assets/`, `images/`) – the built website GitHub Pages serves. Don't edit by hand.

## Updating the site
```bash
cd source
npm install
npm run dev     # preview locally
npm run build   # writes the finished site to the repository root
```
Then commit and push.

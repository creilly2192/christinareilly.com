# Christinareilly.com

Christina Reilly's personal site, built with [Astro](https://astro.build). A running, dated log of what I'm reading, listening to, and building.

## Running locally

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build into dist/
npm run check    # Prettier + ESLint
```

## Deploys

The site is fully static and deploys to GitHub Pages via `.github/workflows/astro.yml` on every push to `main`. The workflow also runs daily, so the homepage's "Currently Listening" album (fetched from [AlbumLog](https://albumlog.app) at build time) stays current without a code change. It can be run from the Actions tab.

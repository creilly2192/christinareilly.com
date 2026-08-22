# CLAUDE.md — christinareilly.com

This is Christina's personal website, built with [Astro](https://astro.build) and TypeScript. It is a solo project.

## Tech Stack

- **Framework:** Astro 5
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Linting:** ESLint with `eslint-plugin-astro` and `typescript-eslint`
- **Formatting:** Prettier with `prettier-plugin-astro`
- **Fonts:** Inter, Crimson Pro (via `@fontsource`)

## Core Priorities

In order of importance:

1. **Accessibility** — WCAG 2.1 AA compliance is non-negotiable. Use semantic HTML, proper ARIA attributes where needed, sufficient colour contrast, keyboard navigability, and meaningful alt text on all images.
2. **Performance** — Prefer static rendering. Avoid unnecessary JavaScript. Keep assets lean.
3. **Readability** — Code should be easy to understand at a glance. Prefer clarity over cleverness.

## Code Style

### General

- **Quotes:** Double quotes (`"`) for strings in TypeScript and Astro frontmatter.
- **Comments:** Add comments to explain _why_ code does something non-obvious, or to label distinct sections of a component. They are valued and expected.
- Formatting is enforced by Prettier — run `npm run format` if unsure.

### TypeScript

- Use `type` (not `interface`) for component prop definitions, following the existing `type Props = { ... }` pattern in Astro components.
- Type annotations are welcome but not required where inference is clear.

### CSS / Styling

- Use **BEM naming** for all CSS classes: `block__element--modifier`.
  - Example: `reading-list__item`, `section-now__grid-item--active`
- **SCSS, folder-per-component:** each Astro component lives in its own folder with a co-located stylesheet — `src/components/ComponentName/ComponentName.astro` + `ComponentName.scss` — wired via a scoped `<style lang="scss">@use "./ComponentName.scss";</style>` block. Astro compiles the Sass (resolving the `@use`) before applying its scoping hash, so the imported rules stay scoped to that component exactly as if written inline.
- Truly global styles live in `src/styles/`: `_tokens.scss` (`:root` custom properties — kept as real CSS custom properties, not Sass variables, so runtime theming/dark-mode token-swaps keep working), `_reset.scss`, `_base.scss` (typography, links/focus, layout defaults), pulled together by `global.scss`.
- Do not use utility-class frameworks (no Tailwind).

### Astro Components

- Destructure props in the frontmatter using `Astro.props`.
- Keep component logic in the frontmatter (`---` block); keep the template clean.
- Prefer Astro components over framework components unless interactivity is required.

## Workflow

### Before Finishing Any Change

Always run the build to catch type errors and Astro compilation issues:

```bash
npm run build
```

Also run the linter and formatter check:

```bash
npm run check
```

Fix any errors before considering the task complete. Do not bypass lint rules.

### Testing

Christina will do her own browser testing. Do not spin up the dev server on her behalf unless explicitly asked.

### Git

Do not commit or push unless explicitly asked.

## Accessibility Checklist

When writing or modifying any HTML or Astro template, verify:

- [ ] All images have descriptive `alt` text (or `alt=""` if purely decorative)
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skipped levels)
- [ ] Interactive elements are keyboard accessible and have visible focus styles
- [ ] Links have descriptive text (not "click here" or "read more")
- [ ] Colour contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] `<ul>` / `<ol>` used for lists, not divs styled to look like lists
- [ ] ARIA attributes are used only when semantic HTML is insufficient

## Project Structure

```
src/
  components/   # Astro UI components, one folder each: ComponentName/ComponentName.astro + ComponentName.scss
  data/         # Typed data files (now.ts, now/*)
  layouts/      # Page layout wrappers
  pages/        # Astro file-based routes
  styles/       # Global SCSS: _tokens.scss, _reset.scss, _base.scss, global.scss (manifest)
```

Data for the "Now" section lives in `src/data/now/` as individual TypeScript files, typed via `src/data/now/now.types.ts` (inferred from usage — check before modifying; it's currently out of sync with the real data shape in a few places, e.g. `reading.ts`'s extra untyped fields).

## Redesign In Progress

Site is mid-redesign to the "ledger" design system documented in `public/designs/` (`main.jsx`, `direction-a.jsx`, `data.jsx`, `reading-log.jsx`, plus reference docs `design-system.html` and static preview shells `index.html`/`reading-log.html`). Core idea: the site reads as a running, dated log — every section carries a fixed-position, uppercase status tag (`SINCE [date]` for durational states, `LAST TOUCHED [date]` for discrete edited artifacts, `CHECKED OUT`/`RETURNED` for the reading log's own dialect). Tags are set in Instrument Sans (uppercase, wide tracking), **not mono** — see Fonts decision below. Update this section's checkboxes as phases land; keep the rest of this file in sync with whatever the current tokens/fonts/structure actually are once a phase ships.

To preview the mockups: open `public/designs/index.html` or `reading-log.html` directly in a browser (or via a static server) — they pull React/Babel from a CDN standalone and are a design-review harness only, not part of the built Astro site.

### Decisions locked in

- Blush (`#e36888`) is the only accent color — no accent switcher, no "Tweaks" panel in production.
- **Contrast fix vs. the mockup:** blush-on-paper is ~3:1, which fails 4.5:1 AA for normal text. Small text/links (nav, footer, "view full reading log →", in-progress/tag labels) render in `accentText` (`#b8456a`) at rest, `linkHover` (`#c14f6c`) on hover — both AA-safe on paper; pure blush (`#e36888`) is reserved for icons, tags, borders, fills, and large type (≥24px) where the 3:1 large-text threshold applies. Verify actual ratios when implemented.
- Fonts are self-hosted via `@fontsource` — **Jost and Instrument Sans only, no monospace font.** The design system doc explicitly drops the third mono typeface from earlier plans: changelog-style status tags use Instrument Sans, uppercase, wide letter-spacing, to read as "log" metadata without a third font. Google Fonts CDN link in the mockup HTML is mockup-only — the real site keeps self-hosting via `@fontsource`, consistent with the performance priority.
- Reading log becomes a separate `/reading-log` route (not just a homepage section). Homepage keeps a short "currently reading" teaser + link out.
- Real cover images in `public/covers/` are kept — no synthetic SVG covers like the mockup uses.
- Motion (vinyl spin/scratch, blinking cursor, hover letter-bounce, card tilt/lift, badge wiggle) is **out of scope for this pass**. Static first; motion is a separate later pass. The hero's retro browser-window chrome (bordered card, colored title bar, hard-offset shadow) is a static layout treatment, not motion, so it does ship this pass.
- Real "since" dates: day job since Nov 2022, "raising a tiny human" since May 2025.
- Dark mode now appears in the mockup as a full second token set (`A_TOK_DARK`) plus a header toggle button that persists to `localStorage`. **This wasn't previously scoped — confirm with Christina whether dark mode ships in this redesign pass or moves to a later one** before building it.

### Open items — flagged before, still unresolved in the latest mockup

- The "top albums" listening project (`AlbumLog`) was supposed to move from `LAST TOUCHED` to `SINCE` (it's ongoing, not a discrete edited artifact) — `data.jsx` still tags it `lastTouched: 'aug 01'`. Fix when wiring real data in Phase 2.
- The baby icon on the "raising a tiny human" card was supposed to be swapped for something continuity-coded (heart/calendar) — `direction-a.jsx`'s `Icon` component still renders a literal baby-bottle shape (cap, collar, measurement lines). Fix when building `Icon.astro` in Phase 2.

### Phases

- [ ] **1. Foundation** — add `@fontsource/jost`, `@fontsource/instrument-sans` (no mono font); rewrite `global.css` tokens (`paper`/`paperDeep`/`ink`/`inkSoft`/`inkMute`/`rule`/`link`/`linkHover`/`accentText` + the four-color decorative rotation (`cards[]`: blush/tangerine/sea/matcha), scoped only to Working On tiles/book covers, never brand/link color); update this file's Color/Typography sections once tokens are real.
- [ ] **2. Ledger primitives** — `StatusTag.astro` (since/lastTouched/checkedOut/returned variants, fixed position per card type); `Icon.astro` + `IconBadge.astro` line-icon set (fix the baby-icon swap here); update `now.types.ts` (`WorkingItem` gets `tagType` + date instead of prose-only text; `ReadingItem` gets explicit `checkedOut`/`returned` fields; `ListeningItem` gets a since-date); update `working.ts`/`reading.ts`/`listening.ts` with real dates (fix AlbumLog's `since` tag here).
- [ ] **3. Homepage rebuild** — `Hero.astro` (Jost, ~104px, inside the retro browser-window chrome card — bordered, colored title bar, hard-offset shadow, no traffic-light motion); `WorkingList.astro` → bento grid (one intentionally large tile) with a required kicker line disclosing the sizing rule; `ReadingList.astro` → "currently reading" teaser + link to `/reading-log`; `ListeningList.astro` → card with since-tag, no vinyl; new `Writing.astro` with empty-state ledger line (`[date] — nothing published yet.`) instead of a "coming soon" card; `Header.astro`/`Footer.astro` copy + nav link updates.
- [ ] **4. New `/reading-log` page** — `src/pages/reading-log.astro`, reusing `StatusTag`/book-row markup, listing current + past reads (`SITE.reading` + `SITE.past` in the mockup) with real cover images.
- [ ] **5. Verify** — `npm run build`, `npm run check`, spot-check link contrast, hand off for browser testing.

## Live Data + SCSS Conversion (In Progress)

Two independent efforts, tracked separately from the ledger redesign above (additive, not conflicting — see Track A note below). Full rationale lives in the approved plan at `~/.claude/plans/purrfect-toasting-hellman.md`; this section is the durable summary. **Work proceeds in small, individually-explained steps — one step (or a very small cluster) per turn, not a large batched diff.**

The site is 100% static (Astro `output: static`, no adapter) deployed to GitHub Pages on push to `main`. GitHub Pages can't run per-request server code, so "automatic" data here means **fetched at build time, with the build re-run on a daily schedule** — not live per page view. This keeps zero client-side JS added (Performance priority) and avoids a hosting migration.

### Track A — Live data at build time

**Now Listening** pulls the current album from AlbumLog's public API (no auth). **Working On** cards' "last touched" date pulls from each project repo's last commit on `main` via the GitHub API (some tracked repos are private, so this needs an auth token).

- [x] Install `sass` as a dev dependency (needed for Track B, done first since it's the smallest unblocked step).
- [ ] `src/lib/github.ts` — `getMainBranchLastPush(owner, repo, token?)`: `GET /repos/{owner}/{repo}/branches/main`, reads `commit.commit.committer.date` (precise to `main`, unlike repo-level `pushed_at` which updates on any branch). Sends `Authorization: Bearer` when a token is present; unauthenticated otherwise. Try/catch → returns `null` on any failure, never throws (bad token/rate limit/outage must not break the build).
- [ ] `src/lib/albumlog.ts` — `getNowPlaying()`: same fail-soft pattern, calling AlbumLog's endpoint. **Blocked on the real endpoint URL + a sample JSON response** — need to confirm with Christina.
- [ ] `now.types.ts` / `working.ts` — `WorkingItem` gains optional `repoOwner?`/`repoName?` for the two project cards (Trio.Reads, AlbumLog only; the day-job and "raising a tiny human" cards keep manual `since` text, no repo to fetch). Existing hand-typed `lastTouched`/note values in `working.ts`/`listening.ts` stay as the fallback used whenever the live fetch fails.
- [ ] `Now.astro` — add top-level-`await` enrichment calls that override `lastTouched`/listening data on fetch success, fall back to the static value otherwise. `WorkingList.astro`/`ReadingList.astro`/`ListeningList.astro` stay unchanged (same prop shape in).
- [ ] `.github/workflows/astro.yml` — add a `schedule: - cron: '0 6 * * *'` trigger (daily) alongside existing `push`/`workflow_dispatch`; pass a new `REPO_READ_TOKEN` secret (fine-grained PAT, read-only, scoped to the private tracked repos — **not** the workflow's automatic `secrets.GITHUB_TOKEN`, which can't read other repos) into the build step's `env:`.
- [ ] Add `.env.example` documenting `REPO_READ_TOKEN` (actual `.env` stays gitignored).
- [ ] Small fix picked up along the way: `WorkingList.astro` keys its list on `item.id`, which doesn't exist on `WorkingItem` — switch to `item.text` or array index.

**Blocking inputs still needed from Christina:** (1) AlbumLog API endpoint + sample response, (2) `owner/repo` for each tracked project and which are private.

_Track A note:_ the new `repoOwner`/`repoName` fields are additive and won't conflict with the ledger redesign's later `tagType`/`since` fields on the same types (Phase 2 above).

### Track B — SCSS conversion, folder-per-component

Folder-per-component layout: `src/components/ComponentName/ComponentName.astro` + `ComponentName.scss` side by side (chosen over a flat co-located file or inline `<style lang="scss">` blocks).

- [x] Install `sass` as a dev dependency.
- [x] Split `src/styles/global.css` into `src/styles/_tokens.scss` (the `:root` custom-property block — kept as real CSS custom properties, not Sass variables, since the future dark-mode token-swap relies on that), `_reset.scss` (box-sizing/html/body), `_base.scss` (typography defaults, links/focus styles, `.container`/`.section`), and a thin `global.scss` manifest that `@use`s all three in order. Defined `--color-purple-muted` in `_tokens.scss` (a placeholder light tint of `--color-accent` — was referenced by `.section-now` but never defined; eyeball and adjust). The component-specific BEM blocks temporarily stay in `global.scss` (marked with a comment) until each is migrated out in its own step below — `global.css` is deleted.
- [x] `src/layouts/BaseLayout.astro` — updated its import from `global.css` to `global.scss`.
- [x] Move each component into its own folder — `Header`, `Footer`, `Hero`, `Now`, `ReadingList`, `ListeningList`, `WorkingList` (7 of 7 done). Each is now `ComponentName/ComponentName.astro` + co-located `ComponentName.scss`, wired via `<style lang="scss">@use "./ComponentName.scss";</style>`. `BaseLayout.astro` stays where it is (no `<style>` block of its own).
- [x] Updated this file's "CSS / Styling" and "Project Structure" sections to describe the SCSS + folder-per-component pattern.

**Track B is complete.** `npm run build` and `npm run check` both pass clean.

### Verification (both tracks)

`npm run build` after each Track A step (confirms fail-soft fallbacks keep the build green even before real credentials exist). `npm run build` + `npm run check` after each Track B step, plus a quick browser check that moved styles render identically. Once the token/secret and AlbumLog URL are in place, trigger the workflow manually (`workflow_dispatch`) once to confirm the scheduled path works end-to-end before waiting on the first automatic daily run.

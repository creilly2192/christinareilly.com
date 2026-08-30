# CLAUDE.md — christinareilly.com

This is Christina's personal website, built with [Astro](https://astro.build) and TypeScript. It is a solo project.

## Tech Stack

- **Framework:** Astro 5
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Linting:** ESLint with `eslint-plugin-astro` and `typescript-eslint`
- **Formatting:** Prettier with `prettier-plugin-astro`
- **Fonts:** Jost, Instrument Sans (via `@fontsource`)

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
- **For any new component's CSS, Christina writes the actual styles.** Claude creates the `.scss` file and a skeleton only — empty selector blocks for the classes the template uses (`.icon-badge {}`, `.icon-badge--sticker {}`, etc.), no property values. This doesn't apply to mechanical moves of already-existing CSS (e.g. the Track B SCSS folder migration) — only to new visual design work.

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

Site is mid-redesign to the "ledger" design system documented in `public/designs/` (`main.jsx`, `direction-a.jsx`, `data.jsx`, `reading-log.jsx`, plus reference docs `design-system.html` and static preview shells `index.html`/`reading-log.html`). Core idea: the site reads as a running, dated log — every section carries a fixed-position, uppercase status tag (`SINCE [date]` for durational/ongoing states, `CHECKED OUT`/`RETURNED` for the reading log's own dialect). Tags are set in Instrument Sans (uppercase, wide tracking), **not mono** — see Fonts decision below. **All Working On cards use `SINCE` — there is no `LAST TOUCHED` variant**; the two project cards (Trio.Reads, AlbumLog) read as ongoing efforts, not discrete edited artifacts, same as the day-job/parenting cards. Update this section's checkboxes as phases land; keep the rest of this file in sync with whatever the current tokens/fonts/structure actually are once a phase ships.

To preview the mockups: open `public/designs/index.html` or `reading-log.html` directly in a browser (or via a static server) — they pull React/Babel from a CDN standalone and are a design-review harness only, not part of the built Astro site.

### Decisions locked in

- Blush (`#e36888`) is the only accent color — no accent switcher, no "Tweaks" panel in production.
- **Contrast fix vs. the mockup:** blush-on-paper is ~3:1, which fails 4.5:1 AA for normal text. Small text/links (nav, footer, "view full reading log →", in-progress/tag labels) render in `accentText` (`#b8456a`) at rest, `linkHover` (`#c14f6c`) on hover — both AA-safe on paper; pure blush (`#e36888`) is reserved for icons, tags, borders, fills, and large type (≥24px) where the 3:1 large-text threshold applies. Verify actual ratios when implemented.
- Fonts are self-hosted via `@fontsource` — **Jost and Instrument Sans only, no monospace font.** The design system doc explicitly drops the third mono typeface from earlier plans: changelog-style status tags use Instrument Sans, uppercase, wide letter-spacing, to read as "log" metadata without a third font. Google Fonts CDN link in the mockup HTML is mockup-only — the real site keeps self-hosting via `@fontsource`, consistent with the performance priority.
- Reading log becomes a separate `/reading-log` route (not just a homepage section). Homepage keeps a short "currently reading" teaser + link out.
- Real cover images in `public/covers/` are kept — no synthetic SVG covers like the mockup uses.
- Motion (vinyl spin/scratch, blinking cursor, hover letter-bounce, card tilt/lift, badge wiggle) is **out of scope for this pass**. Static first; motion is a separate later pass. The hero's retro browser-window chrome (bordered card, colored title bar, hard-offset shadow) is a static layout treatment, not motion, so it does ship this pass.
- Real "since" dates: day job since Nov 2022, "raising a tiny human" since May 2025; Working On projects since Trio.Reads Aug 2026, AlbumLog Feb 2026.
- **Deviation from the mockup:** a currently-reading book shows no date at all — no "checked out [date]." The mockup always pairs `CHECKED OUT` with a date; Christina decided start dates aren't worth sharing. `ReadingItem`'s `"current"` branch has no date field. Finished books still show `RETURNED [date]`, unchanged from the mockup.
- Dark mode now appears in the mockup as a full second token set (`A_TOK_DARK`) plus a header toggle button that persists to `localStorage`. **This wasn't previously scoped — confirm with Christina whether dark mode ships in this redesign pass or moves to a later one** before building it.

### Open items — flagged before, still unresolved in the latest mockup

- ~~The "top albums" listening project (`AlbumLog`) was supposed to move from `LAST TOUCHED` to `SINCE`~~ — resolved: Christina decided **all** Working On cards use `SINCE`, so `LAST TOUCHED` is gone from the design system entirely, not just fixed for AlbumLog. `now.types.ts`'s `WorkingItem` now has a single `since` field, no `tagType` discriminator.
- The baby icon on the "raising a tiny human" card was supposed to be swapped for something continuity-coded (heart/calendar) — `direction-a.jsx`'s `Icon` component still renders a literal baby-bottle shape (cap, collar, measurement lines). Fix when building `Icon.astro` in Phase 2.

### Phases

- [x] **1. Foundation**
  - [x] Added `@fontsource/jost` (600 weight), `@fontsource/instrument-sans` (400 weight) packages (no mono font), imported in `BaseLayout.astro`. Only the weights actually referenced in CSS are imported — add more only alongside the CSS that uses them.
  - [x] Removed the old design's fonts — uninstalled `@fontsource/inter`/`@fontsource/crimson-pro`, deleted their imports from `BaseLayout.astro`.
  - [x] Rewrote `src/styles/_tokens.scss`: `--color-paper`/`--color-paper-deep`/`--color-ink`/`--color-ink-soft`/`--color-ink-mute`/`--color-rule`/`--color-link`/`--color-link-hover`/`--color-accent-text`, plus the four-color decorative rotation as `--color-card-{blush,tangerine,sea,matcha}-{bg,text}` (defined but not yet wired into any component — that's the Phase 2/3 bento-grid and book-cover work). Values are the light palette from `public/designs/direction-a.jsx`'s `A_TOK`; dark mode (`A_TOK_DARK`) is still unconfirmed (see Decisions) and not included. Old token names (`--color-bg`/`--color-text`/`--color-muted`/`--color-accent`/`--color-accent-hover`/`--color-dramatic`/`--color-purple-muted`/`--border`) are gone — all consumers (`_reset.scss`, `_base.scss`, `Header.scss`, `Hero.scss`, `Footer.scss`, `ReadingList.scss`, `ListeningList.scss`, `Now.scss`) were updated to the new names in the same step. Real anchor links use `--color-accent-text`/`--color-link-hover` per the contrast fix below, not pure blush.
  - [x] Updated this file's Tech Stack fonts line to match (no separate Color section exists elsewhere in this file — token values live in `_tokens.scss` itself and the Decisions/Contrast-fix note above).
- [ ] **2. Ledger primitives**
  - [x] Updated `now.types.ts`: `WorkingItem` gets a `since` field instead of prose-only text (no `lastTouched` variant — see Decisions); `ReadingItem` is now a discriminated union on `status` — `"current"` has no date field at all (see Decisions — deliberate deviation from the mockup), `"finished"` requires `returned` (plus `coverAlt`/`goodreadsLink` on the shared base, already read by `ReadingList.astro` but missing from the old type); `ListeningItem` gets a `since` field. Also fixed a pre-existing bug: the type's import path was one directory too high in all six files that used it (`data/now/{reading,listening,working}.ts` and the three `*List.astro` components), so none of these shapes were ever actually type-checked until now — `npx astro check` (not run by `npm run build`/`check`) surfaces real mismatches in the data files.
  - [x] `StatusTag.astro` built: `variant: "since" | "returned"` + `date`, plus an optional `label` override (used for the Listening card's "on repeat since" phrasing — same `since` variant, different displayed word). Styled close to the mockup's tag spec but **deviates on size**: the mockup's 11px read too small to Christina, so it's set to 14px (`0.875rem`) instead, matching the smallest text size already used elsewhere on the site (ReadingList/ListeningList meta text) rather than inventing a new value. Uppercase via `text-transform` (not uppercased source text, so screen readers don't spell it out letter-by-letter); `--color-ink-soft` for `since` / `--color-ink-mute` for `returned` — both verified to clear 4.5:1 AA (inkSoft 8.09:1, inkMute 4.99:1 on paper). Not yet wired into any consuming component — that's Phase 3/4's job; built and build/type/lint-verified standalone for now.
  - [x] `Icon.astro` + `IconBadge.astro` built, porting the mockup's line-icon set (book/bookmark/headphones/code/pencil/mail/github/rss/briefcase, all inline SVG, `aria-hidden` since every usage pairs the icon with visible text). `baby` → `heart` — resolves the flagged open item. `IconBadge` supports both mockup shapes (`folder`/`sticker`). **`IconBadge.scss` is a skeleton only** (empty selector blocks, no property values) — Christina writes new component CSS herself; Claude scaffolds the file and wires the class names, that's it (now a standing rule — see CSS/Styling section above). Hit and fixed two real bugs while building this: (1) a multi-line leading-`|` union type (Prettier's default formatting for a union this long) fails to parse in `.astro` frontmatter (`Unexpected "|"`) — worked around by deriving the type from a `const ... as const` array instead (`(typeof ICON_NAMES)[number]`), which Prettier formats differently and doesn't retrigger the bug; (2) each glyph is stored as structured path/circle data and rendered as real `<path>`/`<circle>` elements, not a raw HTML string via `set:html` — `eslint-plugin-astro`'s `no-set-html-directive` rule flagged the original `set:html` approach, and per this file's own rule ("do not bypass lint rules") the fix was to restructure the data rather than suppress it. Verified by rendering all 10 glyphs + both badge shapes on a throwaway test page, then deleted it. Not yet wired into any consuming component (Phase 3/4's job, same as `StatusTag.astro`).
  - [x] `working.ts` updated with real `since` dates (day job Nov 2022, "raising a tiny human" May 2025, Trio.Reads Aug 2026, AlbumLog Feb 2026).
  - [x] `reading.ts` updated to the new shape. Also recovered from `main`, which had a commit (`49784b3`, not yet merged into this branch) this branch was missing: a new current read (_The Grapes of Wrath_) and a new finished book (_Into The Blue_, returned May 31, 2026), plus exact return-day precision for the others (McTeague May 4, Sunrise on the Reaping Feb 25 — resolving an earlier data typo, Wuthering Heights Feb 12, East of Eden Jan 5, all 2026). Ported the content into the new type shape by hand rather than merging, since `main`'s version still used the old `date`/`year_read` fields. Also pulled the two new cover images (`grapes-of-wrath-gr.jpg`, `into-the-blue-gr.jpg`) from `main` into `public/covers/` — same commit, not caught by the initial data-only diff check.
  - [ ] `listening.ts` — still needs a `since` fallback date for "Body Talk" from Christina.
- [ ] **3. Homepage rebuild** — working in very small steps, one component per turn. **`Writing.astro` (empty-state ledger line) is deferred to a future phase, out of scope for this pass** — Christina's call. For every component below: Claude writes structure/markup/logic + a CSS skeleton (empty selector blocks only), Christina writes the actual styles — see CSS/Styling section above.
  - [x] `Hero.astro` — markup restructured into the retro browser-window chrome (`.hero-main__window` > `.hero-main__title-bar` with 3 decorative dots, `aria-hidden` + `.hero-main__content` > existing title/deck, unchanged copy). Two mockup details deliberately dropped, both motion (out of scope — see Decisions): the blinking cursor after the period, and the per-letter `<b>` wrapping on "web" (was only there to support hover-bounce) — "web" is now a plain `.hero-main__accent` span, a styling hook with no behavior. `Hero.scss` reset to an empty skeleton (existing `.hero-main__title`/`.hero-main__deck` rule bodies included, since their whole typographic treatment is changing) — Christina writes the actual retro-chrome styling (border/shadow/title-bar/colors/the ~104px Jost sizing).
  - [ ] `Header.astro`/`Footer.astro` — copy tweaks + nav link to `/reading-log`.
  - [ ] `WorkingList.astro` → bento grid (one intentionally large tile) with a required kicker line disclosing the sizing rule; wires in `StatusTag` (since-tags, data already real) and `IconBadge` (heart/briefcase). Likely needs its own sub-steps once underway (grid structure, then per-card wiring).
  - [ ] `ReadingList.astro` → homepage "currently reading" teaser + link to `/reading-log` (the full log itself is Phase 4, a separate page/markup) — check the mockup's homepage teaser specifically, not the full reading-log page's `SoftBookRow`.
  - [ ] `ListeningList.astro` → card with since-tag, no vinyl — **blocked on the "Body Talk" `since` date**, still not provided.
- [ ] **4. New `/reading-log` page** — `src/pages/reading-log.astro`, reusing `StatusTag`/book-row markup, listing current + past reads (`SITE.reading` + `SITE.past` in the mockup) with real cover images.
- [ ] **5. Verify** — `npm run build`, `npm run check`, spot-check link contrast, hand off for browser testing.
- [ ] **6. Writing section (deferred, unscheduled)** — `Writing.astro` with the empty-state ledger line (`[date] — nothing published yet.`) instead of a "coming soon" card. Pulled out of Phase 3 — not part of this redesign pass.

## Live Data + SCSS Conversion (In Progress)

Two independent efforts, tracked separately from the ledger redesign above (additive, not conflicting — see Track A note below). Full rationale lives in the approved plan at `~/.claude/plans/purrfect-toasting-hellman.md`; this section is the durable summary. **Work proceeds in small, individually-explained steps — one step (or a very small cluster) per turn, not a large batched diff.**

**Track B (SCSS) is complete.** Track A (live data) is deliberately saved for **last** — it touches `listening.ts`/`now.types.ts`, the same files the ledger redesign's Phase 2 above also reshapes (`checkedOut`/`returned`, since-dates). Doing the redesign's data-shape changes first means Track A only has to wire into the data files once, instead of being reworked after Phase 2 lands. (`working.ts` is no longer in scope for Track A — see below.)

The site is 100% static (Astro `output: static`, no adapter) deployed to GitHub Pages on push to `main`. GitHub Pages can't run per-request server code, so "automatic" data here means **fetched at build time, with the build re-run on a daily schedule** — not live per page view. This keeps zero client-side JS added (Performance priority) and avoids a hosting migration.

### Track A — Live data at build time

**Now Listening** pulls the current album from AlbumLog's public API (no auth). **Working On** cards' `since` text stays fully manual for all four cards, including the two project cards (Trio.Reads, AlbumLog) — **decided:** no GitHub-fetch integration. A `since` date is a project's start date, not something a "last commit" API call produces, and it changes rarely enough that hand-editing it isn't a burden. This removes the only reason Track A needed a GitHub auth token or to read private repos at all.

- [x] Install `sass` as a dev dependency (needed for Track B, done first since it's the smallest unblocked step).
- [ ] `src/lib/albumlog.ts` — `getNowPlaying()`: fail-soft (try/catch → `null` on any failure, never throws — a bad response or outage must not break the build), calling AlbumLog's endpoint. **Blocked on the real endpoint URL + a sample JSON response** — need to confirm with Christina.
- [ ] `Now.astro` — add a top-level-`await` enrichment call that overrides listening data on fetch success, falls back to the static value otherwise. `WorkingList.astro`/`ReadingList.astro`/`ListeningList.astro` stay unchanged (same prop shape in); `working.ts` needs no live-data wiring at all now.
- [ ] `.github/workflows/astro.yml` — add a `schedule: - cron: '0 6 * * *'` trigger (daily) alongside existing `push`/`workflow_dispatch`, so AlbumLog's "now playing" gets picked up daily. No new secret needed — the AlbumLog endpoint is public/no-auth.
- [ ] Small fix picked up along the way: `WorkingList.astro` keys its list on `item.id`, which doesn't exist on `WorkingItem` — switch to `item.text` or array index.

**Blocking inputs still needed from Christina:** AlbumLog API endpoint + sample response.

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

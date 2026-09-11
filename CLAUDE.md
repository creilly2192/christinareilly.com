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
- Motion (vinyl scratch, blinking cursor, card tilt/lift, badge wiggle) is **out of scope for this pass**. Static first; motion is a separate later pass. The hero's retro browser-window chrome (bordered card, colored title bar, hard-offset shadow) is a static layout treatment, not motion, so it does ship this pass. **Exceptions, ahead of the rest of the motion work (Christina's call in each case):** the hero's per-letter "web" bounce, now playing automatically on load + replayable on hover (see Phase 3 below for the full evolution and the small inline script it required); the `ListeningList` vinyl record's continuous spin (`@keyframes a-spin`, ported verbatim from `direction-a.jsx`'s `from { rotate(0deg) }` → `to { rotate(360deg) }`, `14s linear infinite` — click-to-scratch interactivity from the same mockup section was not ported, still out of scope). The spin animation targets the `<svg>` itself, not its positioning wrapper (`.listening-list__record`) — the wrapper also has a static `transform: scale(1.015)`, and an animated `transform` on the same element would silently override a static one.
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
  - [x] `Hero.astro` — markup restructured into the retro browser-window chrome (`.hero-main__window` > `.hero-main__title-bar` with 3 decorative dots, `aria-hidden` + `.hero-main__content` > existing title/deck). Copy changed from "I make things for the web." to "Christina makes things for the web." The blinking cursor after the period is still dropped (out of scope — see Decisions). `Hero.scss` has real retro-chrome styling now (border/shadow/title-bar/colors/accent-bounce), not the empty skeleton originally scaffolded.
    - **"web" letter animation, evolved past the original hover-only version (Christina's call, 2026-09-10):** `.hero-main__accent` wraps three `.hero-main__accent-letter--{w,e,b}` spans. The bounce (`a-web-bounce` keyframes) now plays automatically once on page load, staggered per letter (`0s`/`0.08s`/`0.16s`), instead of requiring hover. Each letter's accent color (blush/tangerine/sea) is a plain static `color` on the modifier class — always on, no fade-in/delay (an earlier version faded color in only after the bounce finished; Christina reverted that, she wants it immediate). Hovering `.hero-main__accent` replays the bounce by swapping `animation-name` to a byte-for-byte duplicate keyframe (`a-web-bounce-replay`) — re-declaring the *same* name on `:hover` wouldn't restart a finished animation, the computed value has to actually change; note this also means the bounce replays a second time on mouse-*leave* too (reverting to the base name is itself a change), which reads as a small bonus "settle" bounce rather than a bug.
    - **First JS on the site, added specifically to fix a real bug:** an `animation-delay` counts down from navigation start, not from first paint — on a slow initial load (cold dev-server compile, slow fonts, etc.) the whole 0.7s bounce could already be over before the page was ever visible, so it silently no-op'd on first load and only appeared to work on refresh (fast/cached). Fixed with a tiny inline `<script is:inline>` in `Hero.astro` (no separate file, no extra network request — confirmed via `dist/index.html`) that adds a `js-loaded` class to `<html>` after a double `requestAnimationFrame` (the standard "wait until a real paint has happened" pattern); `.hero-main__accent-letter` carries `animation-name: none` until `html.js-loaded .hero-main__accent .hero-main__accent-letter` sets the real name, so the animation timeline only ever starts from a confirmed-visible moment. This is a deliberate, documented exception to the Performance priority's "avoid unnecessary JavaScript" — everything else on the site remains fully static/JS-free.
  - [x] `Header.astro` nav link now points to `/reading-log` (was pointing at a nonexistent `/about`; fixed 2026-08-29 — the route itself is still Phase 4, so this link 404s until that page exists). `Footer.astro` got no copy changes (Christina decided against it) — only `Footer.scss` styling updates (padding reduced, link `text-decoration: none`, hover color switched to `--color-link-hover`).
  - [x] `WorkingList.astro` → bento grid, fully built and styled. **Deviation from the original plan:** promoted to its own top-level `<section class="section section-working">` right after the Hero, not nested inside `Now`'s grid — matches `direction-a.jsx`'s comment that Working On is "a full-width band right after the hero," separate from Currently (Reading + Listening only now). `index.astro` renders `<Hero /> <WorkingList items={working} /> <Now />` directly; `Now.astro`/`Now.scss` had their `WorkingList` wiring and 3-cell grid-template removed (simplified to a 2-column grid — mechanical fix, not new design). Cards size by position (`sizeForIndex`: hero/banner/tile), each rendering `StatusTag` (since-tags) and, for the two "life" cards, `IconBadge` (heart/briefcase). Project cards (Trio.Reads, AlbumLog) got a follow-up redesign per Christina's screenshot: added `WorkingItem.title` (shown above the body copy), dropped `linkText`/inline-hyperlinked substrings entirely, and the whole card is now a dynamic `<a>`/`<div>` (`CardTag`) with a new `arrow-up-right` icon (added to `Icon.astro`'s set) badged next to the "Project" tag when `item.link` is set. Trio.Reads' `link` now points to the real app (`https://trioreads.netlify.app/app`). Fully styled by Christina (bento grid, per-variant colors/rotation via `--rot`, hover lift, focus-within).
    - **Recurring bug hit 3x while wiring this, worth remembering:** Astro scopes each component's compiled CSS by appending a `data-astro-cid-*` attribute to every simple selector — but only to elements literally written in *that* component's own template. A selector written in `WorkingList.scss` targeting a class that only appears inside a child component's own markup (`StatusTag`'s `<span class="status-tag">`, `IconBadge`'s `<span class="icon-badge">`) compiles to require WorkingList's scope attribute on that element, which it never has — so the rule is silently dead, not a specificity problem. Verified directly against compiled `dist/_astro/*.css` each time (don't trust reasoning about Astro's scoping from memory — a first pass here assumed `class` props auto-forward onto a child's root element the way Svelte does; Astro does not, it must be read and applied explicitly via `class:list`). Fixed the `IconBadge` hover-background rule with `:global(.icon-badge)` in `WorkingList.scss`'s `&:hover` block (Christina's call: fastest, no other file touched). **Still unresolved:** `.working-list__item--hero .working-list__tag { color: var(--color-white); ... }` in `WorkingList.scss` has the same dead-selector problem and still doesn't apply (confirmed against compiled CSS) — needs either the same `:global()` treatment or a CSS custom-property (e.g. `--status-tag-color` read in `StatusTag.scss` with a fallback, set from `WorkingList.scss`) if Christina wants a reusable pattern instead of one-off `:global()` fixes. Also still unfixed: `.working-list__external-icon .icon-badge { transition: background-color .25s ease; }` (same bug — the hover background swap on the icon currently snaps instantly instead of animating).
  - [x] Shared section-heading pattern: `.section-now__subheading` (icon + uppercase Instrument Sans label) is used by both `ReadingList.astro` (`book` icon) and `ListeningList.astro` (`headphones` icon), so the shared styling lives centrally in `Now.scss` rather than duplicated in each component's own file. **Same recurring Astro-scoping bug as the `WorkingList.scss` one above, hit twice more getting this working:** (1) a `svg { background-color: ... }` rule nested under `.section-now__subheading` in `ReadingList.scss` was dead — the `<svg>` is rendered by the child `Icon.astro` component (which has no `<style>` block of its own), so it never carries `ReadingList`'s scope attribute; fixed with `:global(svg) { ... }`. (2) after moving `.section-now__subheading` itself into `Now.scss` (so both `ReadingList` and `ListeningList` could share it), the whole rule went dead the same way — `.section-now__subheading` is written in each child component's own template, never in `Now.astro`'s; fixed with `:global(.section-now__subheading) { ... }` wrapping the entire block. Both fixes verified directly against compiled `dist/_astro/*.css`, per this file's standing rule of not trusting reasoning about Astro's scoping from memory.
  - [ ] `ReadingList.astro` → homepage "currently reading" teaser + link to `/reading-log` (the full log itself is Phase 4, a separate page/markup) — check the mockup's homepage teaser specifically, not the full reading-log page's `SoftBookRow`. **Substantially built (Christina + Claude, through 2026-09-10):** the "Past Reads" section and the `reading-list__fade-wrapper`/`fade-indicator` scroll treatment are removed (past reads move to the Phase 4 `/reading-log` page instead, matching the mockup split between `SITE.reading`/`SITE.past`); heading is now `<Icon name="book" size={14} />Currently Reading`, using the shared `.section-now__subheading` class (see below); a "view full reading log" link was added below the list, styled with the same hover mechanism as `Header.astro`'s nav links (a `::before` underline growing 0→100% width in `--color-card-sea-bg`, text color transitioning to `--color-link-hover`) — lives in `.reading-list__view-all`. `ReadingItemBase` gained an optional `year_published` field, rendered next to author in `.reading-list__meta`. A second currently-reading book was added to `reading.ts` ("Yuppies" by Dylan Gottlieb, cover `public/covers/yuppies-gr.webp`), so the teaser now intentionally shows two in-progress books instead of the mockup's one. `ReadingList.scss` converted to nested BEM (`&__element`) — a mechanical restructuring of existing rules, not new design, so Claude did it directly. **Bugs found and fixed this session:** the real `npm run check`-blocking syntax error (`<ul>` and the `<a>` link were unwrapped adjacent siblings inside `{currentReads.length > 0 && (...)}` — wrapped in a `<>...</>` fragment) and two dead `no-unused-vars` (`formatMonthYear`, `pastReads`, both leftover from the Past-Reads removal — deleted).
    - **Still open:** (1) cover `alt` text is still hardcoded `` `Cover of ${item.title}` `` rather than `item.coverAlt ?? ...` — the optional per-book `coverAlt` override (added to the type in Phase 2 specifically for this component) is still silently unused. (2) `<a href="">` on the "view full reading log" link is still empty (links to the page itself); `Header.astro`'s nav link already points straight at `/reading-log` and lets it 404 ahead of Phase 4 — same pattern here would be safer than an empty href. Neither blocks anything — both are quick one-line fixes whenever picked up.
  - [x] `ListeningList.astro` → **deviated from the original plan** (the plan said "no vinyl"; Christina wanted the vinyl record after seeing it built) — full vinyl SVG (ported from `direction-a.jsx`'s `SoftVinyl`, concentric-circle grooves + gradient + label puck + spindle), continuously spinning (see the vinyl-spin Decisions note above), heading `<Icon name="headphones" size={14} />Currently Listening` sharing `.section-now__subheading` with `ReadingList`. **Bugs found and fixed this session:** (1) 33 pairs of leftover `data-om-id="...claudeusercontent.com..."` + hardcoded `data-astro-cid-yexu7f76=""` attributes on every SVG shape — copy-paste residue from inspecting the rendered mockup, not meant to be in source (Astro generates its own scope hash at build time; a stale hardcoded one is actively misleading) — stripped all 66. (2) the "SIDE A"/"33⅓ RPM" label text was invisible: both the text and the label-puck circle behind it used the identical `fill="#e36888"` (this exact collision exists in the mockup source too, `t.peachInk`/`t.peach` resolve to the same hex in the light palette — not something the port broke) — fixed to `#fff6f2` (the site's own `--color-card-blush-text` token value) for real contrast. Label text is horizontally centered (`x="150"`, dead-center of the puck) per Christina's call — an earlier off-center experiment (to make the rotation visibly readable, since every circle in this SVG is centered on the rotation pivot and therefore rotationally invisible) was reverted; legible centered text won out over visible-spin. **Still open:** no `StatusTag`/since-tag wired in yet — **blocked on the "Body Talk" `since` date**, still not provided.
- [ ] **4. New `/reading-log` page** — `src/pages/reading-log.astro`, reusing `StatusTag`/book-row markup, listing current + past reads (`SITE.reading` + `SITE.past` in the mockup) with real cover images. Reference: `public/designs/Screenshot 2026-09-10 at 9.14.24 PM.png` (Christina's latest, takes precedence over `reading-log.jsx`/`reading-log.html` where they disagree — e.g. the screenshot's title+deck sit side-by-side in a flex row, not stacked like the older jsx mockup, and it has no icon badge before "Reading Log."). Christina is doing the CSS herself (see the CSS/Styling rule above) — Claude scaffolds markup/logic + skeleton selectors only.
  - [x] Route + header (`<h1>Reading Log.</h1>` + deck) built. `BaseLayout.astro`'s `title`/`description` props were previously stubbed out in a comment and never wired up (every page silently shared one hardcoded `<title>`) — fixed as part of adding a second real page, `type` not `interface` per this file's own TypeScript rule (the original stub used `interface`).
  - [x] `StatusTag.astro` extended with a third, dateless `"reading"` variant (`date` is now optional on the type) — the screenshot's "in progress" tag has no date at all, which conveniently matches this file's existing decision that currently-reading books never show a checked-out date. Empty `.status-tag--reading {}` skeleton added.
  - [x] "Currently Reading" and "Past Reads" sections built and wired to real `reading.ts` data (`<StatusTag variant="reading" label="in progress" />` / `<StatusTag variant="returned" date={item.returned} />`).
  - [x] **Built as a reusable component, not page-local markup — `src/components/LogPage/LogPage.astro` + co-located `LogPage.scss`.** Fully data-driven (`title`, `deck`, `sections: { label, items: LogRow[] }[]`, no slots) so `reading-log.astro` is now a thin page that just maps `reading.ts` into that shape and renders `<LogPage sections={sections} />`; a future projects page would do the same with its own data — this is the direct answer to Christina's "make a CSS component to pull when needed" (2026-09-10). Class names stay under the shared `.log-page__*` block (renamed from an earlier `.reading-log__*` naming pass, same session).
    - **Gotcha hit while building this, worth remembering:** chasing what looked like a real bug (a page-level `<style>` block's CSS never showing up in `dist/_astro/*.css`, reproduced even with a brand-new minimal component used only from `reading-log.astro`) turned out to be a false alarm — **Astro's default `build.inlineStylesheets: "auto"` inlines a page's CSS directly into that page's own `<style>` tag in its HTML `<head>` instead of an external file, whenever the stylesheet is small enough.** `StatusTag`'s CSS, for example, has *never* appeared in an external `_astro/*.css` file for the reading-log route — it's always been correctly compiled and scoped, just inlined in `dist/reading-log/index.html`. Lesson for verifying any future page-specific (not homepage-shared) CSS: grep the page's own HTML output for an inline `<style>` tag too, not just `dist/_astro/*.css` — an empty grep on the external files alone does not mean the CSS failed to compile. (The `LogPage` component extraction that came out of this detour was still the right call independent of the false alarm — it's what Christina actually asked for.)
- [ ] **5. Verify** — `npm run build`, `npm run check`, spot-check link contrast, hand off for browser testing.
- [ ] **6. Writing section (deferred, unscheduled)** — `Writing.astro` with the empty-state ledger line (`[date] — nothing published yet.`) instead of a "coming soon" card. Pulled out of Phase 3 — not part of this redesign pass.

## Live Data + SCSS Conversion (In Progress)

Two independent efforts, tracked separately from the ledger redesign above (additive, not conflicting — see Track A note below). Full rationale lives in the approved plan at `~/.claude/plans/purrfect-toasting-hellman.md`; this section is the durable summary. **Work proceeds in small, individually-explained steps — one step (or a very small cluster) per turn, not a large batched diff.**

**Track B (SCSS) is complete.** Track A (live data) is deliberately saved for **last** — it touches `listening.ts`/`now.types.ts`, the same files the ledger redesign's Phase 2 above also reshapes (`checkedOut`/`returned`, since-dates). Doing the redesign's data-shape changes first means Track A only has to wire into the data files once, instead of being reworked after Phase 2 lands. (`working.ts` is no longer in scope for Track A — see below.)

The site is 100% static (Astro `output: static`, no adapter) deployed to GitHub Pages on push to `main`. GitHub Pages can't run per-request server code, so "automatic" data here means **fetched at build time, with the build re-run on a daily schedule** — not live per page view. This keeps zero client-side JS added (Performance priority) and avoids a hosting migration.

### Track A — Live data at build time

**Now Listening** pulls the current album from AlbumLog's public API (no auth). **Working On** cards' `since` text stays fully manual for all four cards, including the two project cards (Trio.Reads, AlbumLog) — **decided:** no GitHub-fetch integration. A `since` date is a project's start date, not something a "last commit" API call produces, and it changes rarely enough that hand-editing it isn't a burden. This removes the only reason Track A needed a GitHub auth token or to read private repos at all.

- [x] Install `sass` as a dev dependency (needed for Track B, done first since it's the smallest unblocked step).
- [x] `src/lib/albumlog.ts` — `getNowPlaying()`: fail-soft (try/catch → `null` on any failure or non-OK response, never throws), calling `https://www.albumlog.app/api/now.json` (real endpoint, provided by Christina 2026-09-10). Real response shape is `{ album: { title, artist, year, label, genres: string[], rank_rs, rank_apple } }` (`rank_rs`/`rank_apple` nullable) — mapped to a `NowPlaying` type (`title`, `artist`, `year`, `label`, `genres`, `rankRollingStone`, `rankAppleMusic`). No `since`/date field in the response at all, so live data still can't supply the "on repeat since" date — that stays manual (see the still-open `listening.ts` item below). Runtime-verified against the live endpoint (`npx tsx`), and typed with runtime shape guards (`isRawAlbumLogResponse`/`isStringArray`) rather than `any`, to satisfy the strict `@typescript-eslint/no-unsafe-*` rules.
- [x] `Now.astro` — added a top-level-`await getNowPlaying()` call. `listeningItems` overrides `title`/`artist` on `listening[0]` when the fetch succeeds (spreading the static entry first, so `since`/`note`/`link` — none of which the API provides — stay hand-written), falling back to the untouched static `listening` array on `null`. `ListeningList` now receives `listeningItems` instead of `listening` directly; its own prop shape is unchanged. Build-verified end to end: a real build rendered the actual live "now playing" album (title/artist) in place of the static placeholder. `WorkingList.astro`/`ReadingList.astro` untouched — no live-data wiring needed there.
- [ ] `.github/workflows/astro.yml` — add a `schedule: - cron: '0 6 * * *'` trigger (daily) alongside existing `push`/`workflow_dispatch`, so AlbumLog's "now playing" gets picked up daily. No new secret needed — the AlbumLog endpoint is public/no-auth.
- [ ] Small fix picked up along the way: `WorkingList.astro` keys its list on `item.id`, which doesn't exist on `WorkingItem` — switch to `item.text` or array index.

No remaining blocking inputs for Track A. Remaining steps: the daily cron trigger, and the `WorkingList.astro` `item.id` key fix.

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

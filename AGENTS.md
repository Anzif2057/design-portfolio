# Agent rules — Anzif's Portfolio

Follow these rules in every session. Prefer asking over guessing.

## Product intent

A personal portfolio styled as a design canvas (Figma/Miro-like chrome on a white dot-grid board), delivered as a **normal vertically scrolling single page**. The dot grid is a CSS background (`.dot-grid`) that scrolls with the content. Chrome stays fixed on screen: top-left file name + breadcrumb + hamburger menu, left toolbar (bottom bar on mobile), top-right actions, and a thin scroll-progress bar at the top. Plain `/list` uses `src/components/content/` + `src/data/` for the readable long-form view.

**No side panels / sheets for section content.** Section content is real HTML in the page flow.

## Page structure

- `src/components/page/PortfolioPage.tsx` stacks five full-width `<section>`s in a centered container (max ~1200px), in this order and with these ids: `home`, `work`, `experience`, `skills`, `about`.
- The order after Home comes from `PAGE_SECTIONS` in `src/data/sections.ts` (sections, toolbar, file menu, shortcuts, routes and tracking all read it). Updates is not on the page; its data stays in `src/data/updates.ts` for `/list`, and `/updates` redirects to `/`.
- Each section has an `aria-labelledby` heading, a small name tag (`04 · About Me`), and `scroll-margin-top` so it clears the top panels. Landing (`home`) is at least one viewport tall; the last section is tall enough to scroll to the top.
- Sections must not scroll internally. Body text ≥16px on desktop (~1440×900) and ≥14px on mobile (~390 wide).
- Handwriting font (`--font-hand` / Caveat) **only** for titles and annotations. Body uses the sans stack.
- Sketch building blocks in `src/components/canvas/elements/` (StickyNote, ImageFrame, PaperCard, Handwritten, marks, Annotate…) may be reused inside sections. `src/components/canvas/sections/AboutMeWorld.tsx` is a legacy fixed-coordinate composition kept for reference; it is not rendered.

## Navigation

- **No camera, no zoom, no pan, no canvas world coordinates.** The browser's own scroll is the only movement. React Flow is no longer used (the package stays installed until it is removed deliberately).
- All programmatic scrolling goes through `usePageNavigation()` → `scrollTo(view)` / `scrollToTop()` (`src/context/PageNavigationProvider.tsx`, `src/lib/scroll.ts`). Smooth scroll, instant under `prefers-reduced-motion`.
- **Active section has one source:** `activeSection` from `usePageNavigation()`, computed by `useActiveSection` (section under a reading line at 40% of the viewport; the last section when scrolled to the page end). While a programmatic scroll runs the value is locked to its target so nothing flickers. Toolbar highlight (`aria-current`), breadcrumb and URL all read it — do not add a second tracker.
- URL path follows the active section via router `navigate(..., { replace: true })` (history.replaceState, no new entries): `/`, `/work`, `/experience`, `/skills`, `/about`. `/work/:slug` is kept until the user scrolls to another section. Deep links scroll to their section on load.
- Shortcuts: `1`–`4` jump to Work, Experience, Skills, About; `0` to Home. Logo and menu "Back to top" scroll to the top. Ignore shortcuts while a menu, modal, or text input is focused.
- Respect `prefers-reduced-motion` for scrolling and Annotate.

## Non-negotiables

1. **Content lives in `src/data`.** The page and `/list` both read that data and render it as real HTML.
2. **Every hover interaction needs a tap/keyboard equivalent.**
3. **Keep components small and typed.** No `any`.
4. **Use design tokens** — never hard-code colors/radii/shadows in components.
5. **Ask before adding a dependency** (except when the user names one in the task).

## Stack (do not expand without asking)

- Vite + React 18 + TypeScript
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- `motion` for transitions
- `rough-notation` via the `Annotate` wrapper
- `react-router-dom` — section deep links + `/list`
- `lucide-react` for chrome icons
- ESLint + Prettier

## Folder ownership

| Path                              | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `src/data/`                       | Typed portfolio content                              |
| `src/types/`                      | Shared types                                         |
| `src/components/page/`            | Scrolling page, section stubs, scroll progress       |
| `src/components/canvas/elements/` | Reusable sketch building blocks                      |
| `src/components/canvas/sections/` | Legacy canvas compositions (not rendered)            |
| `src/components/panels/`          | App chrome                                           |
| `src/components/content/`         | `/list` + case-study HTML                            |
| `src/components/ui/`              | Small reusable UI (modals, tooltip)                  |
| `src/context/`                    | Page navigation + toast providers                    |
| `src/lib/canvasWorld.ts`          | Legacy world constants, still imported by `src/data` |

## Accessibility & SEO

- Semantic HTML where it matters; alt text required on images.
- Focus styles + keyboard paths for chrome and section content.
- Document title and meta description follow the active section / URL.
- Ignore navigation shortcuts while a menu, modal, or text input is focused.

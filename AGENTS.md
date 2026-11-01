# Agent rules — Anzif's Portfolio

Follow these rules in every session. Prefer asking over guessing.

## Product intent

A personal portfolio styled as a design canvas (Figma/Miro-like chrome on a white dot-grid board). Sections are **fixed-size world areas** (~1400×900) composed from bespoke sketch elements (`src/components/canvas/elements/`) placed at explicit x/y/rotation — not scrollable HTML panels and not the `/list` components. Chrome: left toolbar, top-left file name, top-right actions, bottom-right section stepper. Deep links: `/`, `/updates`, `/about`, `/skills`, `/experience`, `/work`, `/work/:slug`. Plain `/list` uses `src/components/content/` + `src/data/` for the readable long-form view.

**No side panels / sheets for section content. No visible box around a section world** — the empty canvas is the background. Do not mount `/list` content components inside canvas section worlds.

## Canvas composition

- Building blocks live in `src/components/canvas/elements/` (StickyNote, ImageFrame, PaperCard, Handwritten, marks, Annotate, etc.).
- A section world has **no internal scrolling**. If content does not fit, reduce it or add a camera sub-area.
- Overview shows the same elements (tiny); titles/annotations must stay readable (~90+ world units for titles).
- Opened: camera fits the section world (chrome clearance). Body text ≥16px on desktop ~1440×900 and ≥14px on mobile ~390 wide (fit by width / sub-areas).
- Handwriting font (`--font-hand` / Caveat) **only** for titles and annotations. Body uses the sans stack.
- Pilot: About Me is the first composed world; other sections may still use interim sketch frames until rebuilt.

## Canvas navigation (guided)

- Guided camera only — no user pan/pinch/scroll-zoom/node drag.
- All camera moves go through `useGuidedCamera` + `navigateTo` / `goNext` / `goPrev`.
- Overview is default; Esc / logo / Reset view return there.
- Stepper is section navigation, not zoom. No MiniMap / +/-/0 shortcuts.
- Respect `prefers-reduced-motion` for camera and Annotate.

## Non-negotiables

1. **Content lives in `src/data`.** Canvas worlds and `/list` both read that data; canvas uses bespoke layouts, list uses content components.
2. **Every hover interaction needs a tap/keyboard equivalent.**
3. **Keep components small and typed.** No `any`.
4. **Use design tokens** — never hard-code colors/radii/shadows in components.
5. **Ask before adding a dependency** (except when the user names one in the task).

## Stack (do not expand without asking)

- Vite + React 18 + TypeScript
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- `@xyflow/react` for canvas
- `motion` for transitions
- `rough-notation` via the `Annotate` wrapper
- `react-router-dom` — canvas deep links + `/list`
- `lucide-react` for chrome icons
- ESLint + Prettier

## Folder ownership

| Path                              | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| `src/data/`                       | Typed portfolio content                   |
| `src/types/`                      | Shared types                              |
| `src/components/canvas/`          | Canvas stage, section worlds, nodes       |
| `src/components/canvas/elements/` | Reusable sketch building blocks           |
| `src/components/canvas/sections/` | Section compositions (About Me, welcome…) |
| `src/components/panels/`          | App chrome                                |
| `src/components/content/`         | `/list` + case-study HTML                 |
| `src/components/ui/`              | Small reusable UI                         |
| `src/lib/canvasWorld.ts`          | World size + mobile crop constants        |

## Accessibility & SEO

- Semantic HTML where it matters; alt text required on images.
- Focus styles + keyboard paths for chrome and section hit targets.
- Per-route document title and meta description stay in sync with deep links.
- Ignore navigation shortcuts while a menu, modal, or text input is focused.

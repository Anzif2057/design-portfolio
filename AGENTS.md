# Agent rules — Anzif's Portfolio

Follow these rules in every session. Prefer asking over guessing.

## Product intent

A personal portfolio styled as a design canvas (Figma/Miro-like chrome on a white dot-grid board). Five content sections live **on the canvas** as sketch-style frames that expand in place when selected (cluster click, toolbar, stepper, keys). Chrome: left toolbar, top-left file name, top-right actions, bottom-right section stepper. Deep links: `/`, `/updates`, `/about`, `/skills`, `/experience`, `/work`, `/work/:slug`. Plain `/list` reuses the same content components from `src/components/content/` and data from `src/data/`.

There are **no slide-in side panels / sheets for section content**. The project case-study template powers `/list` (and later canvas case-study frames); it does not need to appear on the canvas until that phase.

## Canvas navigation (guided)

- The canvas is **guided, not free-roam**. Do not enable user pan, pinch-zoom, scroll-zoom, or node dragging.
- Camera movement is **programmatic only** (navbar, section click, keyboard, file menu “Reset view”, stepper, swipe).
- **All camera moves go through the shared guided-camera path** (`useGuidedCamera` + `navigateTo` / `goNext` / `goPrev` from `CanvasNavigationContext`). Do not call `fitView` / `setViewport` from random components.
- Selecting a section expands that sketch frame in place and fits it in the viewport, leaving room for the toolbar and top chrome (no panel-offset camera hacks).
- Default view is **Overview** (all section frames). Esc, Home/logo, and “Reset view” return there.
- Bottom-right control is a **section stepper**, not a zoom panel. No MiniMap. No +/-/0 zoom shortcuts.
- Respect `prefers-reduced-motion` for camera animation duration (~800ms otherwise).

## Typography on canvas

- **Handwriting font** (`--font-hand` / Caveat) only for titles and annotations.
- **Body text** uses the sans stack at **16px+** (`--font-size-base`) when a section is opened/zoomed.

## Non-negotiables

1. **Content lives in `src/data`** and is rendered as real HTML/React in canvas section frames and in `/list`. Never bake readable copy into canvas graphics or images. List view and canvas frames share the same content components.
2. **Every hover interaction needs a tap/keyboard equivalent.** No hover-only actions or information.
3. **Keep components small and typed.** No `any`. Prefer explicit props and shared types from `src/types`.
4. **Use design tokens** from `src/styles/tokens.css` (and Tailwind theme mappings). Never hard-code colors, radii, or shadows in components.
5. **Ask before adding a dependency.** Do not install new libraries without explicit approval.

## Stack (do not expand without asking)

- Vite + React 18 + TypeScript
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- `@xyflow/react` for canvas pan/zoom/background
- `motion` for transitions and hover animations
- `react-router-dom` — canvas deep links + `/list`
- `lucide-react` for icons
- ESLint + Prettier

## Folder ownership

| Path                      | Purpose                                             |
| ------------------------- | --------------------------------------------------- |
| `src/data/`               | All portfolio content (typed TS files)              |
| `src/types/`              | Shared TypeScript types                             |
| `src/components/canvas/`  | Canvas, sketch section frames, background           |
| `src/components/panels/`  | App chrome (toolbar, file name, actions, stepper)   |
| `src/components/content/` | Shared section + case-study HTML (canvas + `/list`) |
| `src/components/ui/`      | Small reusable UI                                   |
| `src/context/`            | Canvas navigation state (URL-synced)                |
| `src/hooks/`              | Guided camera, shortcuts, swipe, motion prefs       |
| `src/pages/`              | Route-level pages                                   |
| `src/styles/`             | Tokens and global styles                            |

## Accessibility & SEO

- Prefer semantic HTML in section content and list view.
- Ensure focus styles and keyboard paths for interactive chrome and section frames.
- Keep meaningful text in the DOM so the site stays readable and crawlable.
- Keep per-route document title and meta description in sync with deep links.
- Ignore navigation shortcuts while a menu, modal, or text input is focused.

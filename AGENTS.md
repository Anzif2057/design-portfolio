# Agent rules — Anzif's Portfolio

Follow these rules in every session. Prefer asking over guessing.

## Product intent

A personal portfolio styled as a design canvas (Figma/Miro-like chrome on a white dot-grid board). Five content clusters (Updates, About Me, Skills, Experience, Work) sit on the canvas. Chrome panels: left toolbar, top-left file name, top-right actions, bottom-right section stepper. Clicking a cluster (or using navbar / stepper / shortcuts) moves the camera to it and opens real HTML content. There is also a plain `/list` view.

## Canvas navigation (guided)

- The canvas is **guided, not free-roam**. Do not enable user pan, pinch-zoom, scroll-zoom, or node dragging.
- Camera movement is **programmatic only** (navbar, cluster click, keyboard, file menu “Reset view”, stepper, swipe).
- **All camera moves go through the shared guided-camera path** (`useGuidedCamera` + `navigateTo` / `goNext` / `goPrev` from `CanvasNavigationContext`). Do not call `fitView` / `setViewport` from random components.
- Default view is **Overview** (all clusters framed). Esc, Home/logo, and “Reset view” return there.
- Bottom-right control is a **section stepper**, not a zoom panel. No MiniMap. No +/-/0 zoom shortcuts.
- Respect `prefers-reduced-motion` for camera animation duration (~800ms otherwise).

## Non-negotiables

1. **Content lives in `src/data`** and is rendered as real HTML/React. Never bake readable copy into canvas graphics, images, or node drawings. Canvas clusters are navigation affordances; panels and list view consume the same typed data.
2. **Every hover interaction needs a tap/keyboard equivalent.** No hover-only actions or information.
3. **Keep components small and typed.** No `any`. Prefer explicit props and shared types from `src/types`.
4. **Use design tokens** from `src/styles/tokens.css` (and Tailwind theme mappings). Never hard-code colors, radii, or shadows in components.
5. **Ask before adding a dependency.** Do not install new libraries without explicit approval.

## Stack (do not expand without asking)

- Vite + React 18 + TypeScript
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- `@xyflow/react` for canvas pan/zoom/background
- `motion` for transitions and hover animations
- `react-router-dom` — `/` canvas, `/list` list view
- `lucide-react` for icons
- ESLint + Prettier

## Folder ownership

| Path                      | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `src/data/`               | All portfolio content (typed TS files)           |
| `src/types/`              | Shared TypeScript types                          |
| `src/components/canvas/`  | Canvas, cluster nodes, background                |
| `src/components/panels/`  | App chrome (toolbar, file name, actions, stepper)|
| `src/components/content/` | Section content panels                           |
| `src/components/ui/`      | Small reusable UI                                |
| `src/context/`            | Canvas navigation state                          |
| `src/hooks/`              | Guided camera, shortcuts, swipe, motion prefs    |
| `src/pages/`              | Route-level pages                                |
| `src/styles/`             | Tokens and global styles                         |

## Accessibility & SEO

- Prefer semantic HTML in content panels and list view.
- Ensure focus styles and keyboard paths for interactive chrome and clusters.
- Keep meaningful text in the DOM (not only in canvas nodes) so the site stays readable and crawlable.
- Ignore navigation shortcuts while a menu, modal, or text input is focused.

# Anzif's Portfolio

Personal portfolio styled as a design canvas (pan/zoom board with content clusters), plus a plain list view. Built with Vite, React 18, TypeScript, Tailwind CSS, and React Flow.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

- `/` — canvas view (React Flow proof with dot grid)
- `/list` — list view placeholder

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Typecheck and production build       |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format with Prettier                 |

## Project layout

```
src/
  components/
    canvas/    # canvas, cluster nodes, background
    panels/    # chrome: toolbar, file name, actions, zoom
    content/   # section content panels
    ui/        # small reusable pieces
  data/        # typed portfolio content (source of truth)
  hooks/
  pages/       # CanvasPage, ListPage
  styles/      # design tokens
  types/
  lib/
```

## Design tokens

Edit `src/styles/tokens.css` to change colors, fonts, spacing, radii, and shadows. They are wired into Tailwind via `@theme` in `src/index.css`.

## Notes for agents

See `AGENTS.md` for project rules (content in `src/data`, accessibility, tokens, dependencies).

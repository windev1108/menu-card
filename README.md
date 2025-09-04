# Menu Card

A small React + Vite app that displays a restaurant menu with filtering and a shopping cart.

## Tech Stack
- React 19 + TypeScript
- Zustand (state) with selector helpers
- Vite (build/dev)
- Vitest + React Testing Library (tests)
- Tailwind (via `@tailwindcss/vite`)

## Features
- Search, category, and availability filters
- Cart add/increase/decrease/remove
- Async menu loading with error handling
- Accessible UI (semantic regions, labeled controls, live regions)

## Project Structure
```
src/
  components/        UI components (MenuList, Cart, Filter, etc.)
  hooks/             Reusable hooks (useMenuData, useMenuFilters)
  store/             Zustand stores + selectors (CartStore, MenuStore)
  types/             Shared types
  mock/              Mock data (menu.json)
```

## Getting Started
```bash
# install deps (choose one)
pnpm i   # or: npm i / bun i / yarn

# start dev server
pnpm dev

# type-check + build
pnpm build

# preview production build
pnpm preview
```

## Testing
Configured with jsdom and jest-dom matchers.
```bash
pnpm test        # watch mode
pnpm test:run    # single run (CI)
```

## Key Implementation Notes
- Data loading is encapsulated in `hooks/useMenuData`.
- Filtering UI state/derivations live in `hooks/useMenuFilters`.
- Store-based filtering example in `store/MenuStore` via `selectFilteredMenu`.
- Reusable status components in `components/ui/Status`.

## Accessibility
- Inputs use associated labels or `aria-label`/`sr-only` text
- Semantic regions: `header`, `main`, `section`, `aside`
- Live regions for loading/errors and empty states

## Scripts Reference
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest --config vitest.config.ts",
  "test:run": "vitest run --config vitest.config.ts",
  "test:ui": "vitest --ui --config vitest.config.ts"
}
```

## License
MIT

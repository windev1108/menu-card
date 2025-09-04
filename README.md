# Menu Card

A small React + Vite app showing a restaurant menu with a shopping cart.

## Tech
- React 19, TypeScript
- Zustand for state management
- Vite
- Vitest + React Testing Library for tests

## Setup
```bash
# from this folder
pnpm i   # or: npm i / bun i / yarn
```

## Run Dev Server
```bash
pnpm dev
```

## Build
```bash
pnpm build
```

## Test
```bash
pnpm test        # watch mode
pnpm test:run    # single run
```

## Structure
```
src/
  components/    # UI components
  store/         # Zustand stores + selectors
  types/         # shared types
  mock/          # mock data
```

## Accessibility
- Inputs have labels and proper roles
- Live regions for loading and cart updates
- Semantic regions: header, main, section, aside

## Notes
- Filtering logic is in `useMenuStore` via `selectFilteredMenu` selector.
- Cart totals are derived with `useMemo` in `Cart`.

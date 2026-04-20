---
applyTo: "src/components/react/**,src/components/interactive/**"
---

## React Component Rules

### Framework
- This project uses **React 19** via `@astrojs/react` — import hooks from `react` directly
- `jsxImportSource` is set to `react` in `src/tsconfig.json` — no manual JSX transform needed
- Use `useState`, `useEffect`, `useRef`, `useCallback` etc. from `react`

### Props Interface
Name the props interface after the component:
```tsx
interface FaqAccordionProps {
  items: Array<{ question: string; answer: string }>;
  title?: string;
}

export default function FaqAccordion({ items, title = "FAQ" }: FaqAccordionProps) { ... }
```

### File Placement
- **`src/components/react/primitives/`** — generic, reusable UI (Tabs, Accordion, AnimatedSection)
- **`src/components/react/composites/`** — domain/business logic components (CatalogTabs, ServiceCardGrid)
- **`src/components/interactive/`** — standalone interactive features (Chatbot, WaitlistDirectory)
- **`src/components/react/hooks/`** — custom hooks as individual files
- **`src/components/react/hooks.ts`** — shared simple hooks (useScrollLock, etc.)

### Animations
- Use `createStaggerDelay(index, baseDelay)` from `~/components/react/animations` for sequential reveals
- Always respect `useReducedMotion()` from `~/components/react/hooks/useReducedMotion` — skip or reduce animations when true
- Use `useInView` hook from `~/components/react/hooks/` for scroll-triggered effects
- Apply `will-change-transform` only temporarily during animation

### Theme
- Access current theme via `useTheme()` from `~/components/react/ThemeContext`
- Do not hardcode color values — use Tailwind CSS token classes (`text-cta`, `bg-surface`, etc.)

### State & Effects
- Lift state only as far as necessary
- Avoid `useEffect` for synchronous state derivations — compute values directly
- Clean up subscriptions/observers in the `useEffect` return function

### Typing
- Use `unknown` + type guards instead of `any`
- Use `import type { ... }` for type-only imports
- Mark optional props with `?:` and provide defaults in destructuring

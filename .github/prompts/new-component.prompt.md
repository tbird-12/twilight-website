---
agent: "edit"
description: "Scaffold a React component + Astro wrapper pair"
---

Create two files: a React component (`.tsx`) and its Astro wrapper (`.astro`).

### 1. React Component — `src/components/[path]/ComponentName.tsx`

```tsx
import { useState } from "react";

interface ComponentNameProps {
  // Define all props here — only serializable types (primitives, plain arrays/objects)
  items: Array<{ label: string; value: string }>;
  title?: string;
}

export default function ComponentName({ items, title }: ComponentNameProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {title && <h2 className="text-site-text font-heading">{title}</h2>}
      {/* component JSX */}
    </div>
  );
}
```

### 2. Astro Wrapper — `src/components/[path]/ComponentNameWrapper.astro`

```astro
---
import ComponentName from "./ComponentName";

interface Props {
  // Mirror the React component's props exactly
  items: Array<{ label: string; value: string }>;
  title?: string;
}

const { items, title } = Astro.props;
---

<ComponentName client:visible items={items} title={title} />
```

**Rules:**
- Place generic UI components in `src/components/react/primitives/`
- Place domain-specific components in `src/components/react/composites/`
- Place standalone features (chatbot, directory) in `src/components/interactive/`
- Use `client:visible` by default; use `client:load` only if the component is above the fold
- Props must be serializable — no functions, classes, Maps, Sets
- Use CSS token classes (`text-site-text`, `bg-surface`, etc.) — never raw hex values
- Import `useState`, `useEffect` etc. from `react`
- Name the props interface `[ComponentName]Props`

Ask me: What is the component name, where should it be placed, and what are its props?

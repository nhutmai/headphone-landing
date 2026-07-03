---
name: new-component
description: >
  Create a reusable React component for a Next.js 16 App Router project. Use
  when building shared UI elements, route-specific components, or deciding
  between Server and Client Components.
---

# New Component — Next.js 16 App Router

## Purpose

Standardize component creation so that every component follows consistent
conventions for file placement, naming, Server vs Client boundary decisions, and
TypeScript typing.

## Trigger Conditions

Activate this skill when:

- Creating a new reusable UI component (button, card, hero, nav, footer, etc.)
- Creating a route-specific component (scoped to a single page)
- Deciding whether a component should be a Server or Client Component
- Refactoring inline JSX into a separate component

## Checklist

### 1. File Placement

- [ ] **Shared components** (used across multiple routes):
  ```
  app/_components/Button.tsx
  app/_components/Navbar.tsx
  app/_components/Footer.tsx
  ```
- [ ] **Route-specific components** (used only within one route):
  ```
  app/blog/_components/PostCard.tsx
  app/about/_components/TeamMember.tsx
  ```
- [ ] The `_components/` prefix makes the folder private (not routable)
- [ ] **Utility/helper** functions go in a separate `_lib/` folder:
  ```
  app/_lib/utils.ts
  app/blog/_lib/data.ts
  ```

### 2. File Naming

- [ ] Use **PascalCase** for component files: `HeroSection.tsx`, `NavBar.tsx`
- [ ] One component per file (the primary export matches the filename)
- [ ] Co-locate related files if needed:
  ```
  app/_components/
    Button.tsx
    Button.module.css   (only if using CSS Modules)
  ```

### 3. Server vs Client Component Decision

**Default to Server Component** (no directive needed). Only add `'use client'`
when the component needs:

| Need | Example | Directive |
|---|---|---|
| State (`useState`, `useReducer`) | Toggle, counter, form input | `'use client'` |
| Effects (`useEffect`, `useLayoutEffect`) | Animations, subscriptions | `'use client'` |
| Event handlers (`onClick`, `onChange`) | Buttons, inputs, modals | `'use client'` |
| Browser APIs (`window`, `localStorage`) | Theme toggle, geolocation | `'use client'` |
| Custom hooks using the above | `useDebounce`, `useMediaQuery` | `'use client'` |
| Data fetching, no interactivity | Static cards, lists, layouts | None (Server) |

#### Push the boundary down

- [ ] Do NOT mark an entire page/layout as `'use client'` just because one child
  needs interactivity
- [ ] Extract the interactive part into its own Client Component and keep the
  parent as a Server Component:
  ```tsx
  // app/page.tsx — Server Component (default)
  import { LikeButton } from '@/app/_components/LikeButton'

  export default async function Page() {
    const post = await getPost()
    return (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <LikeButton initialLikes={post.likes} />  {/* Client island */}
      </article>
    )
  }
  ```
  ```tsx
  // app/_components/LikeButton.tsx — Client Component
  'use client'

  import { useState } from 'react'

  interface LikeButtonProps {
    initialLikes: number
  }

  export function LikeButton({ initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes)
    return <button onClick={() => setLikes(l => l + 1)}>{likes} ♥</button>
  }
  ```

### 4. TypeScript Props

- [ ] Define an explicit `interface` for props (not inline types):
  ```tsx
  interface CardProps {
    title: string
    description: string
    href: string
    imageUrl?: string
  }

  export function Card({ title, description, href, imageUrl }: CardProps) {
    // ...
  }
  ```
- [ ] Use `interface` (not `type`) for component props — it's the project convention
- [ ] Suffix props interfaces with `Props`: `ButtonProps`, `NavBarProps`

### 5. Export Pattern

- [ ] Use **named exports** for shared components:
  ```tsx
  // ✅ Named export
  export function Button({ ... }: ButtonProps) { ... }
  ```
- [ ] Use **default exports** only for `page.tsx`, `layout.tsx`, and other
  Next.js file conventions
- [ ] Never use `export default` for reusable components

### 6. Imports

- [ ] Always use the `@/` path alias:
  ```tsx
  import { Button } from '@/app/_components/Button'
  ```
- [ ] Avoid deep relative paths (`../../../`)

### 7. Reference

Consult the bundled Next.js 16 docs before writing component code:
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

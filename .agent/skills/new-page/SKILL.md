---
name: new-page
description: >
  Create a new App Router page in a Next.js 16 project. Use when adding a new
  route/page, creating a dynamic route, or setting up page-level layouts,
  loading states, or error boundaries.
---

# New Page — Next.js 16 App Router

## Purpose

Standardize the creation of new pages within the Next.js 16 App Router so that
every route follows consistent conventions for file placement, metadata, params
handling, and supporting files (layouts, loading, error).

## Trigger Conditions

Activate this skill when:

- Creating a new page or route
- Adding a dynamic route segment (e.g., `[slug]`, `[...catchAll]`)
- Setting up a layout, loading state, or error boundary for a route
- Reorganizing routes with route groups `(groupName)`

## Checklist

### 1. File Placement

- [ ] Place the page at `app/<route-segments>/page.tsx`
- [ ] A route only becomes public when `page.tsx` exists in the folder
- [ ] Use route groups `(groupName)` to organize without affecting URLs
- [ ] Use private folders `_folderName` for route-scoped utilities that should not be routable

### 2. Component Declaration

- [ ] Pages are **Server Components by default** — do NOT add `'use client'`
  unless the page itself needs state, effects, or browser APIs
- [ ] Use `export default function PageName()` (PascalCase, descriptive name)
- [ ] For data-fetching pages, make the function `async`:
  ```tsx
  export default async function BlogPage() {
    const data = await fetchData()
    return <div>{/* ... */}</div>
  }
  ```

### 3. Dynamic Route Params (BREAKING CHANGE in Next.js 16)

- [ ] `params` is now a **Promise** — you must `await` it:
  ```tsx
  // ✅ Correct — Next.js 16
  export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    // ...
  }
  ```
  ```tsx
  // ❌ WRONG — outdated pattern
  export default function Page({ params }: { params: { slug: string } }) {
    // This will NOT work in Next.js 16
  }
  ```
- [ ] Same for `searchParams` — also a `Promise`:
  ```tsx
  type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
  ```

### 4. Metadata (Required)

- [ ] Every page MUST export a `metadata` object or `generateMetadata` function
- [ ] See the `seo-metadata` skill for detailed metadata conventions
- [ ] At minimum, set `title` and `description`:
  ```tsx
  import type { Metadata } from 'next'

  export const metadata: Metadata = {
    title: 'Page Title | HeliCorp',
    description: 'A concise description of this page.',
  }
  ```

### 5. Supporting Files (Add Only When Needed)

| File | When to add |
|---|---|
| `layout.tsx` | Shared UI (nav, sidebar) that persists across child routes |
| `loading.tsx` | Loading skeleton/spinner while the page data loads |
| `error.tsx` | Error boundary — must be a Client Component (`'use client'`) |
| `not-found.tsx` | Custom 404 for this route segment |
| `template.tsx` | Like layout, but re-renders on every navigation (rare) |

### 6. Imports & Path Aliases

- [ ] Use the `@/` path alias for all imports:
  ```tsx
  import { Button } from '@/app/_components/Button'
  import { fetchPosts } from '@/lib/data'
  ```
- [ ] Do NOT use relative paths that traverse more than one level (`../../`)

### 7. Reference

Before writing page code, consult the bundled Next.js 16 docs:
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`

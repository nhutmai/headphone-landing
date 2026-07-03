<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# HeliCorp Landing — Agent Guide

## Project Overview

HeliCorp Landing is a corporate landing page built with Next.js 16 App Router,
React 19, TypeScript, and Tailwind CSS v4. The project is in early development
and follows the App Router's file-based routing conventions with Server
Components as the default rendering strategy.

## Tech Stack

| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.2.10 | App Router only — no Pages Router |
| React | 19.2.4 | Server Components by default |
| TypeScript | ^5 | Strict mode, `@/*` path alias |
| Tailwind CSS | v4 | `@theme inline` config — **NOT v3** |
| PostCSS | — | `@tailwindcss/postcss` plugin |
| ESLint | ^9 | Flat config, `core-web-vitals` + `typescript` |
| Node.js | See `.nvmrc` or `engines` | — |

## Key Conventions

### Folder Structure

```
helicorp-landing/
├── app/                       # App Router root
│   ├── layout.tsx             # Root layout (html, body, fonts, global metadata)
│   ├── page.tsx               # Home page (/)
│   ├── globals.css            # Tailwind v4 entry + theme tokens
│   ├── favicon.ico            # Browser icon
│   ├── _components/           # Shared components (private, not routable)
│   ├── _lib/                  # Shared utilities & data-fetching helpers
│   └── <route>/               # Route segments
│       ├── page.tsx           #   Route page
│       ├── layout.tsx         #   Route-specific layout (optional)
│       ├── loading.tsx        #   Loading skeleton (optional)
│       ├── error.tsx          #   Error boundary (optional)
│       ├── _components/       #   Route-scoped components
│       └── _lib/              #   Route-scoped utilities
├── app/api/                   # API Route Handlers
│   └── <endpoint>/route.ts   #   REST endpoint
├── public/                    # Static assets (images, SVGs)
├── .agent/skills/             # Agent skills (see below)
├── AGENTS.md                  # This file
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS (Tailwind v4)
├── eslint.config.mjs          # ESLint v9 flat config
└── package.json               # Dependencies & scripts
```

### Naming Conventions

- **Pages/Layouts/Route Handlers**: Lowercase Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`)
- **Components**: PascalCase files (`HeroSection.tsx`, `NavBar.tsx`)
- **Utilities**: camelCase files (`formatDate.ts`, `fetchPosts.ts`)
- **Private folders**: Prefixed with `_` (`_components/`, `_lib/`)
- **Route groups**: Wrapped in `()` (`(marketing)/`, `(auth)/`)

### Critical Patterns (Next.js 16)

1. **Server Components by default** — only add `'use client'` when truly needed
2. **`params` is a Promise** — always `await params` in pages and route handlers
3. **`searchParams` is a Promise** — always `await searchParams`
4. **Tailwind v4** — no `tailwind.config.js`, use `@theme inline` in CSS
5. **Metadata required** — every page must export `metadata` or `generateMetadata`

### Imports

Always use the `@/` path alias:
```tsx
import { Button } from '@/app/_components/Button'
import { fetchPosts } from '@/app/_lib/data'
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Bundled Documentation

Next.js 16 includes bundled docs at `node_modules/next/dist/docs/`. **Always
consult these before writing code** — they reflect the actual API of the
installed version:

| Topic | Path |
|---|---|
| Project Structure | `01-app/01-getting-started/02-project-structure.md` |
| Layouts & Pages | `01-app/01-getting-started/03-layouts-and-pages.md` |
| Server & Client Components | `01-app/01-getting-started/05-server-and-client-components.md` |
| Data Fetching | `01-app/01-getting-started/06-fetching-data.md` |
| CSS & Tailwind | `01-app/01-getting-started/11-css.md` |
| Metadata & OG Images | `01-app/01-getting-started/14-metadata-and-og-images.md` |
| Route Handlers | `01-app/01-getting-started/15-route-handlers.md` |
| Production Checklist | `01-app/02-guides/production-checklist.md` |

## Agent Skills

The following skills are available under `.agent/skills/`. Each skill contains
a `SKILL.md` with purpose, trigger conditions, and a concrete checklist. Read
the relevant skill file **before** performing the task it covers.

| Skill | Path | When to Use |
|---|---|---|
| **new-page** | `.agent/skills/new-page/SKILL.md` | Creating a new App Router page, dynamic route, or route-level layout/loading/error |
| **new-component** | `.agent/skills/new-component/SKILL.md` | Creating a reusable component; deciding Server vs Client Component |
| **api-route** | `.agent/skills/api-route/SKILL.md` | Creating a REST API endpoint via `route.ts` Route Handler |
| **tailwind-v4** | `.agent/skills/tailwind-v4/SKILL.md` | Adding custom theme values, writing Tailwind classes, or anytime v3 patterns might be generated |
| **seo-metadata** | `.agent/skills/seo-metadata/SKILL.md` | Adding page titles, descriptions, Open Graph images, sitemaps, or robots.txt |

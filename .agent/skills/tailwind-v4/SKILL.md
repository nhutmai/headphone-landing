---
name: tailwind-v4
description: >
  Write and extend Tailwind CSS v4 styles in this project. Use when adding
  custom theme values, configuring colors/fonts, or when an agent might
  otherwise produce outdated Tailwind v3 syntax (tailwind.config.js,
  @tailwind directives).
---

# Tailwind CSS v4 — Styling Conventions

## Purpose

Prevent agents from generating **Tailwind v3 patterns** (which will silently
break) and ensure all styling follows the Tailwind v4 configuration model used
in this project.

## Trigger Conditions

Activate this skill when:

- Adding or modifying custom theme values (colors, fonts, spacing, etc.)
- Writing Tailwind utility classes in components
- An agent attempts to create or reference `tailwind.config.js` or `tailwind.config.ts`
- An agent uses `@tailwind base`, `@tailwind components`, or `@tailwind utilities`
- Configuring dark mode or responsive design tokens

## Critical: v3 → v4 Breaking Changes

### ❌ DO NOT (Tailwind v3 — will break)

```css
/* WRONG — v3 directives don't exist in v4 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// WRONG — this file should NOT exist in a v4 project
// tailwind.config.js / tailwind.config.ts
module.exports = {
  theme: { extend: { colors: { primary: '#...' } } }
}
```

### ✅ DO (Tailwind v4 — correct)

```css
/* globals.css — single import replaces all three directives */
@import "tailwindcss";
```

```css
/* Theme customization via @theme inline block */
@theme inline {
  --color-primary: #6366f1;
  --color-background: var(--background);
  --font-sans: var(--font-geist-sans);
}
```

## Checklist

### 1. CSS Entry Point

- [ ] `app/globals.css` is the single CSS entry point
- [ ] It starts with `@import "tailwindcss";` (this replaces all v3 directives)
- [ ] It is imported in `app/layout.tsx` via `import './globals.css'`

### 2. Theme Customization

- [ ] All custom theme tokens live in the `@theme inline` block in `globals.css`:
  ```css
  @theme inline {
    /* Colors — maps to bg-primary, text-primary, etc. */
    --color-primary: #6366f1;
    --color-primary-light: #818cf8;
    --color-primary-dark: #4f46e5;

    /* Fonts — maps to font-sans, font-mono */
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);

    /* Custom spacing, radii, etc. */
    --radius-lg: 1rem;
  }
  ```
- [ ] Variable names follow the pattern `--<category>-<name>`:
  - `--color-*` → `bg-*`, `text-*`, `border-*` utilities
  - `--font-*` → `font-*` utilities
  - `--spacing-*` → `p-*`, `m-*`, `gap-*` utilities

### 3. CSS Custom Properties for Theming

- [ ] Use `:root` for base CSS variables and override in dark mode:
  ```css
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
  }
  ```
- [ ] Reference these in `@theme inline` so Tailwind can generate utilities

### 4. Dark Mode

- [ ] This project uses `prefers-color-scheme` media query (system preference)
- [ ] Use the `dark:` variant in utility classes:
  ```tsx
  <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
  ```
- [ ] Custom dark values are set via the `@media (prefers-color-scheme: dark)`
  block in `globals.css`

### 5. PostCSS Configuration

- [ ] PostCSS uses `@tailwindcss/postcss` plugin (configured in `postcss.config.mjs`)
- [ ] Do NOT install or configure `autoprefixer` separately — it's built into
  the Tailwind v4 PostCSS plugin

### 6. Utility Class Best Practices

- [ ] Prefer Tailwind utilities over custom CSS when possible
- [ ] Use the project's custom tokens (e.g., `bg-background`, `text-foreground`,
  `font-sans`) instead of hardcoded values
- [ ] Keep long class lists readable — break across lines or extract to components:
  ```tsx
  <button
    className={[
      'flex h-12 items-center justify-center rounded-full',
      'bg-foreground px-5 text-background',
      'transition-colors hover:bg-[#383838]',
      'dark:hover:bg-[#ccc]',
    ].join(' ')}
  >
  ```

### 7. What NOT to Create

- [ ] ❌ `tailwind.config.js` or `tailwind.config.ts` — does not exist in v4
- [ ] ❌ `@apply` in most cases — use utility classes directly
- [ ] ❌ `@tailwind` directives — replaced by `@import "tailwindcss"`
- [ ] ❌ `autoprefixer` in PostCSS config — already included in `@tailwindcss/postcss`

### 8. Reference

Consult the bundled Next.js 16 docs for CSS guidance:
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- `node_modules/next/dist/docs/01-app/02-guides/tailwind-v3-css.md` (for migration context only)

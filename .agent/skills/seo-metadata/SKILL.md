---
name: seo-metadata
description: >
  Add or update page metadata and SEO configuration in a Next.js 16 App Router
  project. Use when creating page titles, descriptions, Open Graph images,
  favicons, sitemaps, or the generateMetadata function for dynamic routes.
---

# SEO & Metadata — Next.js 16 App Router

## Purpose

Ensure every page has proper SEO metadata using Next.js 16's Metadata API,
following consistent patterns for static and dynamic metadata, Open Graph
configuration, and file-based metadata conventions.

## Trigger Conditions

Activate this skill when:

- Creating or updating page titles and descriptions
- Adding Open Graph or Twitter Card metadata
- Setting up `generateMetadata` for dynamic routes
- Adding file-based metadata (favicon, OG image, sitemap, robots.txt)
- Updating the root layout's metadata configuration

## Checklist

### 1. Static Metadata

- [ ] Export a `metadata` object from `page.tsx` or `layout.tsx`:
  ```tsx
  import type { Metadata } from 'next'

  export const metadata: Metadata = {
    title: 'About Us | HeliCorp',
    description: 'Learn about HeliCorp and our mission.',
  }
  ```
- [ ] `metadata` exports are **only supported in Server Components**
  — never in files with `'use client'`
- [ ] Metadata in a `layout.tsx` applies to all child pages unless overridden

### 2. Title Template (Root Layout)

- [ ] Configure a title template in the root `app/layout.tsx` to avoid repeating
  the brand name:
  ```tsx
  export const metadata: Metadata = {
    title: {
      template: '%s | HeliCorp',
      default: 'HeliCorp',  // Fallback when no child page sets a title
    },
    description: 'HeliCorp — innovative solutions for modern challenges.',
    metadataBase: new URL('https://helicorp.com'),
  }
  ```
- [ ] Child pages then set just the page-specific part:
  ```tsx
  // app/about/page.tsx
  export const metadata: Metadata = {
    title: 'About Us',  // Renders as: "About Us | HeliCorp"
  }
  ```

### 3. Dynamic Metadata (`generateMetadata`)

- [ ] Use for routes where metadata depends on fetched data:
  ```tsx
  import type { Metadata, ResolvingMetadata } from 'next'

  type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }

  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { slug } = await params

    const post = await fetch(`https://api.example.com/posts/${slug}`).then(
      (res) => res.json()
    )

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      },
    }
  }
  ```
- [ ] **IMPORTANT**: `params` and `searchParams` are `Promise`-based in
  Next.js 16 — always `await` them

### 4. Open Graph & Twitter Cards

- [ ] Add Open Graph metadata for social sharing:
  ```tsx
  export const metadata: Metadata = {
    title: 'HeliCorp',
    description: '...',
    openGraph: {
      title: 'HeliCorp',
      description: '...',
      url: 'https://helicorp.com',
      siteName: 'HeliCorp',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'HeliCorp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HeliCorp',
      description: '...',
      images: ['/og-image.png'],
    },
  }
  ```

### 5. `metadataBase`

- [ ] Set `metadataBase` in the root layout — it resolves relative URLs in
  metadata across all pages:
  ```tsx
  export const metadata: Metadata = {
    metadataBase: new URL('https://helicorp.com'),
    // Now "/og-image.png" resolves to "https://helicorp.com/og-image.png"
  }
  ```

### 6. File-Based Metadata Conventions

Place these files in the `app/` directory root:

| File | Purpose |
|---|---|
| `app/favicon.ico` | Browser tab icon (already exists ✅) |
| `app/icon.png` | App icon (.ico, .jpg, .png, .svg) |
| `app/apple-icon.png` | Apple touch icon |
| `app/opengraph-image.png` | Default OG image (1200×630) |
| `app/twitter-image.png` | Twitter card image |
| `app/sitemap.ts` | Generated sitemap |
| `app/robots.ts` | Generated robots.txt |

### 7. Sitemap & Robots (When Ready for Production)

- [ ] Static sitemap:
  ```ts
  // app/sitemap.ts
  import type { MetadataRoute } from 'next'

  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      { url: 'https://helicorp.com', lastModified: new Date(), priority: 1 },
      { url: 'https://helicorp.com/about', lastModified: new Date(), priority: 0.8 },
    ]
  }
  ```
- [ ] Robots:
  ```ts
  // app/robots.ts
  import type { MetadataRoute } from 'next'

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://helicorp.com/sitemap.xml',
    }
  }
  ```

### 8. Minimum Required Metadata Per Page

Every page (or its parent layout) must have at minimum:

- [ ] `title` — descriptive, unique per page
- [ ] `description` — concise summary (150–160 chars)
- [ ] Open Graph `title` + `description` (can inherit from above)

### 9. Reference

Consult the bundled Next.js 16 docs:
- `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- `node_modules/next/dist/docs/01-app/02-guides/production-checklist.md`

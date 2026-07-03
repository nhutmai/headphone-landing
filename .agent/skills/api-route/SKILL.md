---
name: api-route
description: >
  Create an API Route Handler in a Next.js 16 App Router project. Use when
  building REST API endpoints, webhook handlers, or backend-for-frontend
  patterns using route.ts files.
---

# API Route Handler — Next.js 16 App Router

## Purpose

Standardize the creation of API Route Handlers so that endpoints follow
consistent conventions for file placement, HTTP method exports, request/response
typing, error handling, and caching behavior.

## Trigger Conditions

Activate this skill when:

- Creating a new API endpoint
- Building a webhook handler
- Adding server-side logic that responds to HTTP requests
- Creating a backend-for-frontend proxy

## Checklist

### 1. File Placement

- [ ] Route Handlers live in `app/api/<endpoint>/route.ts`:
  ```
  app/api/health/route.ts        → GET /api/health
  app/api/posts/route.ts         → GET/POST /api/posts
  app/api/posts/[id]/route.ts    → GET/PUT/DELETE /api/posts/:id
  ```
- [ ] **CRITICAL**: A `route.ts` file CANNOT coexist with a `page.tsx` at the
  same route segment. They are mutually exclusive.
- [ ] Use `.ts` extension (not `.tsx`) — Route Handlers don't render JSX

### 2. HTTP Method Exports

- [ ] Export **named async functions** for each HTTP method:
  ```ts
  // app/api/posts/route.ts
  import { NextRequest } from 'next/server'

  export async function GET(request: NextRequest) {
    // Handle GET
    return Response.json({ posts: [] })
  }

  export async function POST(request: NextRequest) {
    const body = await request.json()
    // Handle POST
    return Response.json({ created: true }, { status: 201 })
  }
  ```
- [ ] Supported methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
- [ ] Unsupported methods automatically return `405 Method Not Allowed`

### 3. Request Handling

- [ ] Use `NextRequest` from `next/server` for enhanced request APIs:
  ```ts
  import { NextRequest } from 'next/server'

  export async function GET(request: NextRequest) {
    // URL params
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    // Headers
    const authHeader = request.headers.get('authorization')

    // Cookies
    const token = request.cookies.get('session')
  }
  ```
- [ ] For dynamic route params, they are also Promise-based in Next.js 16:
  ```ts
  export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params
    // ...
  }
  ```

### 4. Response Patterns

- [ ] Use `Response.json()` for JSON responses:
  ```ts
  return Response.json({ data }, { status: 200 })
  ```
- [ ] Use `NextResponse` from `next/server` for advanced responses:
  ```ts
  import { NextResponse } from 'next/server'

  // Redirect
  return NextResponse.redirect(new URL('/login', request.url))

  // Set cookies
  const response = NextResponse.json({ success: true })
  response.cookies.set('token', 'value', { httpOnly: true })
  return response
  ```

### 5. Error Handling

- [ ] Always wrap handler logic in try/catch:
  ```ts
  export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      // ... process
      return Response.json({ success: true }, { status: 201 })
    } catch (error) {
      console.error('POST /api/posts error:', error)
      return Response.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
  ```
- [ ] Use appropriate HTTP status codes:
  - `200` OK, `201` Created, `204` No Content
  - `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found
  - `500` Internal Server Error
- [ ] Validate request bodies before processing

### 6. Caching Behavior

- [ ] Route Handlers are **NOT cached by default**
- [ ] To cache a GET handler, export `dynamic = 'force-static'`:
  ```ts
  export const dynamic = 'force-static'

  export async function GET() {
    // This response will be cached
    return Response.json({ version: '1.0' })
  }
  ```
- [ ] Only `GET` methods can be cached — other methods are never cached

### 7. Security Considerations

- [ ] Never expose secrets or API keys in responses
- [ ] Validate and sanitize all user input
- [ ] Use environment variables (`process.env.SECRET`) for sensitive values
- [ ] Consider rate limiting for public endpoints

### 8. Do NOT Call Route Handlers from Server Components

- [ ] Server Components should fetch data directly (via `fetch` or database calls)
- [ ] Route Handlers are for **Client Components** that need to call the server
- [ ] Calling your own API routes from Server Components creates an unnecessary
  extra network hop

### 9. Reference

Consult the bundled Next.js 16 docs before writing route handlers:
- `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
- `node_modules/next/dist/docs/01-app/02-guides/backend-for-frontend.md`

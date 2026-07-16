# Story 01: Foundation — NED STARK

> "The man who passes the sentence should swing the sword."

## What Was Built

### 1. Next.js 16 + React 19 Upgrade
- Upgraded `next` from 15.1.11 to 16.2.10
- Upgraded `react` and `react-dom` from 18.3.1 to 19.2.7
- Upgraded `@types/react` and `@types/react-dom` to latest

### 2. Async Request API Fix
- Fixed `app/projects/[repoName]/page.tsx` — `src` prop now typed as `string | Blob` in React 19
- Added type guard to ensure `src` is treated as string

### 3. Folder Structure
Created the following directories:
- `/services/` — Feature service files
- `/validations/` — Zod validation schemas
- `/models/` — MongoDB model definitions
- `/store/` — Redux store and slices
- `/components/skeletons/` — All skeleton components
- `/components/shared/` — Reusable CRUD components
- `/components/admin/` — Admin-specific components
- `/components/providers/` — Context providers
- `/app/login/` — Login page
- `/app/admin/` — Admin dashboard pages
- `/scripts/` — Utility scripts

### 4. Env Validation (lib/env.ts)
- Zod-based validation for all environment variables
- Validates existing vars (GITHUB_TOKEN, GITHUB_USERNAME, GROQ_API_KEY, DATABASE_URL, HOSTED_URL, NODE_ENV)
- Validates new vars (ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET, ONBOARDING_ENABLED, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS, CACHE_DURATION)
- Typed export with defaults
- Throws descriptive error on validation failure

### 5. Expanded Types
- `types/auth.ts` — JwtPayload, LoginInput, AuthState, AuthUser
- `types/api.ts` — ApiResponse, PaginatedResponse
- `types/admin.ts` — AdminTab union type
- `types/social.ts` — SOCIAL_PLATFORMS constant, SocialPlatform type, SocialLinkConfig interface, helper functions

### 6. MongoDB Models
- `models/personal-info.ts` — Single document, get/update with upsert
- `models/education.ts` — Full CRUD, sorted by startDate
- `models/career.ts` — Full CRUD, sorted by startDate
- `models/social-links.ts` — Predefined 7 platforms, toggle on/off
- `models/resume.ts` — Index on createdAt, paginated history
- `models/user.ts` — Minimal user document for auth

### 7. Proxy.ts Skeleton
- Root-level `proxy.ts` with Next.js 16 convention
- Matcher excludes static assets
- Placeholder for auth logic (JON SNOW will implement)

### 8. Updated .env.example
Added all new environment variables with descriptions.

## Decisions Made
- Social links are predefined (7 platforms), not dynamic — matches existing `data/aboutMe.ts`
- Env validation runs at startup, throws on failure — fail fast
- MongoDB models follow existing singleton pattern from `lib/mongodb.ts`
- proxy.ts uses Node.js runtime (default in Next.js 16, no Edge)

## Ready For
- JON SNOW: Auth implementation (proxy.ts, login page, auth API)
- TYRION: Services and API routes (models ready)
- SANSA: UI components (types ready)
- DAENERYS: Redux stores (types ready)

# Fullstack Conversion — Master Plan

## Overview

Converting a static Next.js 15 portfolio into a full-stack application with JWT auth, Redux state management, CRUD APIs, admin dashboard, and MongoDB storage.

**Feature branch:** `feature/fullstack-conversion`
**Base branch:** `develop`
**Final PR target:** `develop` (after user review)

## Agent Roster (Game of Thrones)

| # | Agent | Codename | Email | Phase | Scope |
|---|-------|----------|-------|-------|-------|
| 1 | NED STARK | The Honorable | ned-stark@winterfell.dev | 1 | Foundation: folders, env validation, Next.js 16 upgrade, types, models |
| 2 | JON SNOW | The Reluctant | jon-snow@nightswatch.dev | 2 | Authentication: JWT, proxy.ts auth, login page |
| 3 | TYRION LANNISTER | The Clever | tyrion@lannister.dev | 2 | Services + APIs: CRUD services, routes, validations, seed script |
| 4 | SANSA STARK | The Resilient | sansa@winterfell.dev | 2 | UI: Skeletons, alert dialogs, shared CRUD components |
| 5 | DAENERYS TARGARYEN | The Unburnt | daenerys@dragonstone.dev | 2 | Redux: Stores, persistence, API client, hydration |
| 6 | JAIME LANNISTER | The Kingslayer | jaime@casterlyrock.dev | 3 | Admin: Dashboard, pages, navbar, public page refactoring |

## Execution Phases

### Phase 1: Foundation (NED STARK) — Sequential
- Upgrade Next.js 15 → 16, React 18 → 19
- Fix async request APIs (breaking change in v16)
- Create folder structure
- Add env validation (zod)
- Expand types (auth, api, admin, social)
- Create MongoDB models
- Create proxy.ts skeleton
- Update .env.example

### Phase 2: Parallel (4 agents)
All 4 agents branch from `feature/fullstack-conversion` after NED STARK merges.

### Phase 3: Integration (JAIME LANNISTER)
After all Phase 2 agents merge, JAIME builds admin dashboard and integrates everything.

## Git Workflow

```
develop
  └── feature/fullstack-conversion
        ├── feature/foundation-ned-stark → MERGED
        ├── feature/auth-jon-snow → MERGED
        ├── feature/services-tyrion → MERGED
        ├── feature/ui-sansa → MERGED
        ├── feature/redux-daenerys → MERGED
        └── feature/admin-jaime → MERGED
              └── PR to develop
```

Each agent:
1. Creates branch from `feature/fullstack-conversion`
2. Works in separate worktree
3. Commits with their own name/email (scoped git config)
4. Pushes branch
5. Creates PR to `feature/fullstack-conversion`
6. Merges after review

## New Environment Variables

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme_in_production
JWT_SECRET=your-super-secret-jwt-key-change-this
ONBOARDING_ENABLED=false
RATE_LIMIT_WINDOW=600000
RATE_LIMIT_MAX_REQUESTS=10
CACHE_DURATION=3600
```

## Social Links Design

Predefined platforms (from existing data/aboutMe.ts):
- GitHub (FaGithub)
- Twitter/X (FaXTwitter)
- Telegram (FaTelegram)
- Email (HiOutlineMail)
- Substack (SiSubstack)
- LinkedIn (FaLinkedin)
- Instagram (FaInstagram)

Admin can toggle each platform on/off and set URL + handle. No custom platforms.

## Feature Stories

| Story | Agent | File |
|-------|-------|------|
| 01-foundation | NED STARK | docs/features/01-foundation-ned-stark.md |
| 02-authentication | JON SNOW | docs/features/02-authentication-jon-snow.md |
| 03-services-apis | TYRION LANNISTER | docs/features/03-services-apis-tyrion.md |
| 04-ui-components | SANSA STARK | docs/features/04-ui-components-sansa.md |
| 05-redux-state | DAENERYS TARGARYEN | docs/features/05-redux-daenerys.md |
| 06-admin-dashboard | JAIME LANNISTER | docs/features/06-admin-jaime.md |

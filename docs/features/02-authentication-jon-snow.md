# Story 02: Authentication — JON SNOW

> "I don't want it." (But he got the throne anyway.)

## Agent: JON SNOW
**Branch:** `feature/auth-jon-snow` from `feature/fullstack-conversion`
**Email:** jon-snow@nightswatch.dev

## Prerequisites
- NED STARK's foundation merged (types, models, proxy.ts skeleton)

## Tasks

### 1. Auth Service (services/auth.ts)
- `hashPassword(password: string): Promise<string>` — bcrypt hash
- `comparePassword(password: string, hash: string): Promise<boolean>` — bcrypt compare
- `signJwt(payload: JwtPayload): string` — sign JWT with secret, 7-day expiry
- `verifyJwt(token: string): JwtPayload | null` — verify and decode
- `getAuthFromCookies(cookies: ReadonlyRequestCookies): string | null` — extract JWT from httpOnly cookie
- Cookie helpers: setAuthCookie, clearAuthCookie

### 2. Auth Validation (validations/auth.ts)
```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
```

### 3. Auth API Routes

**POST /api/auth/login:**
- Validate input with loginSchema
- Compare against ADMIN_USERNAME and ADMIN_PASSWORD from env
- Sign JWT, set httpOnly cookie (sameSite: lax, path: /)
- Return success + user info

**POST /api/auth/logout:**
- Clear auth cookie
- Return success

**GET /api/auth/me:**
- Read JWT from cookie
- Verify and return user info
- Return 401 if invalid

### 4. Update proxy.ts
Replace NED STARK's skeleton with real auth logic:
- Check if path starts with `/admin` or `/api/admin`
- If yes, verify JWT from cookie
- If invalid/missing, redirect to `/login`
- If path starts with `/login` and user is authenticated, redirect to `/admin`
- Otherwise, continue

### 5. Login Page

**app/login/layout.tsx:**
- Minimal layout, centered

**app/login/page.tsx:**
- Client component
- Username + password form using shadcn Input and Button
- Call POST /api/auth/login
- On success, redirect to /admin
- On error, show error message using notification system
- Loading state during submission

### 6. Auth Provider (components/providers/auth-provider.tsx)
- React context for client-side auth state
- Provides: user, isAuthenticated, loading, login(), logout()
- Fetches GET /api/auth/me on mount to check session
- Used by Header to show/hide Admin link

### 7. Install Dependencies
- `bcryptjs` + `@types/bcryptjs`
- `jose` (lightweight JWT library for Edge/Node)

### 8. Write Feature Doc
Write `docs/features/02-authentication-jon-snow.md`

## Commit

```
Git config (scoped to worktree):
  user.name = "Jon Snow"
  user.email = "jon-snow@nightswatch.dev"

Commit message:
feat(auth): JWT authentication with proxy.ts and login page

- Added JWT auth service (sign, verify, bcrypt hash/compare)
- Created auth API routes: /api/auth/login, /api/auth/logout, /api/auth/me
- Implemented proxy.ts auth protection for /admin/* routes
- Created login page with form validation
- Added auth provider for client-side auth state
- Cookie-based session with httpOnly, sameSite: lax
```

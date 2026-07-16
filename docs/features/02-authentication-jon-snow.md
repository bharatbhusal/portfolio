# Story 02: Authentication — JON SNOW

> "I don't want it." (But he got the throne anyway.)

## What Was Built

### 1. Auth Service (services/auth.ts)
- JWT sign/verify using `jose` library
- Password hashing with `bcryptjs`
- Cookie helpers: setAuthCookie, clearAuthCookie, getAuthFromCookies
- httpOnly cookies with 7-day expiry, sameSite: lax

### 2. Auth Validation (validations/auth.ts)
- Zod schema for login input (username + password)

### 3. Auth API Routes
- `POST /api/auth/login` — validates input, compares credentials against env vars, signs JWT, sets cookie
- `POST /api/auth/logout` — clears auth cookie
- `GET /api/auth/me` — returns current user info from JWT

### 4. Proxy.ts Auth Logic
- Protects `/admin/*` routes — redirects to `/login` if not authenticated
- Redirects authenticated users away from `/login` to `/admin`
- Matcher excludes static assets

### 5. Login Page
- Client component with username/password form
- Uses shadcn Input and Button components
- Shows error messages
- Loading state during submission
- Redirects to `/admin` after successful login
- Supports `?redirect=` query parameter
- Wrapped in Suspense boundary for useSearchParams

### 6. Auth Provider (components/providers/auth-provider.tsx)
- React context for client-side auth state
- Provides: user, isAuthenticated, loading, login(), logout()
- Fetches `/api/auth/me` on mount to check session
- Root layout wrapped with AuthProvider

### 7. Input Component (components/ui/input.tsx)
- Standard shadcn Input component (was missing)

## Auth Flow
1. User visits `/admin` → proxy.ts checks JWT from cookie
2. If no JWT → redirect to `/login?redirect=/admin`
3. User submits login form → POST `/api/auth/login`
4. Server validates credentials against ADMIN_USERNAME/ADMIN_PASSWORD env vars
5. Signs JWT, sets httpOnly cookie
6. Client-side auth state updated via AuthProvider
7. Redirect to `/admin`
8. Subsequent requests: proxy.ts verifies JWT from cookie

## Environment Variables Used
- `ADMIN_USERNAME` — admin username
- `ADMIN_PASSWORD` — admin password (plaintext comparison for simplicity)
- `JWT_SECRET` — secret key for JWT signing

## Ready For
- JAIME: Admin dashboard (auth protection in place)
- TYRION: API routes (auth middleware available)

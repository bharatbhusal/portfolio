# Story 03: Services + APIs — TYRION LANNISTER

> "I drink and I know things."

## Agent: TYRION LANNISTER
**Branch:** `feature/services-tyrion` from `feature/fullstack-conversion`
**Email:** tyrion@lannister.dev

## Prerequisites
- NED STARK's foundation merged (types, models, folder structure)

## Tasks

### 1. Refactor Existing Services
Move lib/ files to services/ with proper re-exports:

**services/github.ts:**
- Re-export all functions from lib/github.ts
- Add env-based cache duration from CACHE_DURATION

**services/llm.ts:**
- Re-export generateResume from lib/llm.ts

**services/rate-limit.ts:**
- Re-export from lib/rate-limit.ts
- Use RATE_LIMIT_WINDOW and RATE_LIMIT_MAX_REQUESTS from env

**services/resume.ts:**
- Re-export from lib/resume.ts

Keep lib/ files as-is for backward compatibility. Services wrap them.

### 2. Personal Info Service (services/personal-info.ts)
```typescript
export async function getPersonalInfo(): Promise<PersonalInfo | null>
export async function updatePersonalInfo(data: Partial<PersonalInfo>): Promise<PersonalInfo>
```
- Single document in `personal_info` collection
- Upsert pattern (create if not exists)

### 3. Education Service (services/education.ts)
```typescript
export async function getAllEducation(): Promise<EducationItem[]>
export async function getEducationById(id: string): Promise<EducationItem | null>
export async function createEducation(data: EducationItem): Promise<EducationItem>
export async function updateEducation(id: string, data: Partial<EducationItem>): Promise<EducationItem>
export async function deleteEducation(id: string): Promise<void>
```

### 4. Career Service (services/career.ts)
```typescript
export async function getAllCareer(): Promise<CareerItem[]>
export async function getCareerById(id: string): Promise<CareerItem | null>
export async function createCareer(data: CareerItem): Promise<CareerItem>
export async function updateCareer(id: string, data: Partial<CareerItem>): Promise<CareerItem>
export async function deleteCareer(id: string): Promise<void>
```

### 5. Social Links Service (services/social-links.ts)
```typescript
export async function getSocialLinks(): Promise<SocialLinkConfig[]>
export async function updateSocialLinks(links: SocialLinkConfig[]): Promise<SocialLinkConfig[]>
```
- Predefined 7 platforms, admin toggles on/off + sets URL/handle
- Initialize with defaults from data/aboutMe.ts on first access

### 6. Image Service (services/image.ts)
```typescript
export async function uploadImage(file: File): Promise<string> // returns ObjectId
export async function getImage(id: string): Promise<Buffer | null>
export async function deleteImage(id: string): Promise<void>
export async function getProfileImage(): Promise<string | null> // returns ObjectId of current profile image
```
- Uses MongoDB GridFS for storage
- Simple file input upload (no drag-drop)

### 7. Validation Schemas

**validations/personal-info.ts:**
```typescript
export const personalInfoSchema = z.object({
  name: z.object({
    full: z.string().min(1),
    first: z.string().min(1),
    last: z.string().min(1),
  }),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  title: z.string().min(1),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});
```

**validations/education.ts:**
```typescript
export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  address: z.string().optional(),
  cgpa: z.string().optional(),
  description: z.string().optional(),
  courses: z.array(z.string()).optional(),
  links: z.array(z.object({
    link: z.string().url(),
    type: z.string(),
  })).optional(),
  highlight: z.enum(['LATEST', 'GOLD', 'PINNED']).optional(),
});
```

**validations/career.ts:**
Similar to education schema.

**validations/social-links.ts:**
```typescript
export const socialLinkSchema = z.object({
  platform: z.enum(['github', 'twitter', 'telegram', 'email', 'substack', 'linkedin', 'instagram']),
  url: z.string().url(),
  handle: z.string(),
  enabled: z.boolean(),
});
```

### 8. CRUD API Routes

All routes return `ApiResponse<T>` format from types/api.ts.
All admin routes require auth (handled by proxy.ts).

**Personal Info:**
- GET /api/personal-info — public (for SSR)
- PUT /api/personal-info — admin only

**Social Links:**
- GET /api/social-links — public
- PUT /api/social-links — admin only

**Education:**
- GET /api/education — public
- POST /api/education — admin only
- GET /api/education/[id] — public
- PUT /api/education/[id] — admin only
- DELETE /api/education/[id] — admin only

**Career:**
- GET /api/career — public
- POST /api/career — admin only
- GET /api/career/[id] — public
- PUT /api/career/[id] — admin only
- DELETE /api/career/[id] — admin only

**Image:**
- GET /api/image — public (returns profile image)
- POST /api/image — admin only (upload)
- DELETE /api/image — admin only

### 9. Seed Script (scripts/seed.ts)
- Read existing data from `data/careerData.ts`, `data/educationData.ts`, `data/aboutMe.ts`, `config/contact-info.ts`
- Insert into MongoDB collections
- Idempotent (check if data exists before inserting)
- Run via `npx tsx scripts/seed.ts`

### 10. Write Feature Doc
Write `docs/features/03-services-apis-tyrion.md`

## Commit

```
Git config (scoped to worktree):
  user.name = "Tyrion Lannister"
  user.email = "tyrion@lannister.dev"

Commit message:
feat(services): CRUD services, API routes, validations, GridFS image upload

- Created service files: personal-info, education, career, social-links, image
- Refactored existing lib/ services to services/ wrappers
- Added CRUD API routes for all entities with ApiResponse format
- Created zod validation schemas for all inputs
- Implemented GridFS-based image upload service
- Added seed script to migrate existing data to MongoDB
- All admin routes protected by auth (proxy.ts)
```

# Story 03: Services + APIs — TYRION LANNISTER

> "I drink and I know things."

## What Was Built

### 1. Service Files
- `services/personal-info.ts` — get/update personal info from MongoDB
- `services/education.ts` — full CRUD operations
- `services/career.ts` — full CRUD operations
- `services/social-links.ts` — predefined 7 platforms, toggle on/off
- `services/image.ts` — GridFS-based image upload/download/delete

### 2. Validation Schemas
- `validations/personal-info.ts` — zod schema for personal info
- `validations/education.ts` — zod schema for education entries
- `validations/career.ts` — zod schema for career entries
- `validations/social-links.ts` — zod schema for social links array

### 3. CRUD API Routes
- `GET/PUT /api/personal-info` — public read, admin write
- `GET/PUT /api/social-links` — public read, admin write
- `GET/POST /api/education` — public read, admin create
- `GET/PUT/DELETE /api/education/[id]` — public read, admin update/delete
- `GET/POST /api/career` — public read, admin create
- `GET/PUT/DELETE /api/career/[id]` — public read, admin update/delete
- `GET/POST/DELETE /api/image` — public read, admin upload/delete

### 4. Image Upload Service
- GridFS-based storage in MongoDB
- Simple file input upload (no drag-drop)
- File type validation (images only)
- File size limit (5MB)
- Auto-delete previous profile image on new upload

### 5. Seed Script (scripts/seed.ts)
- Migrates existing data from `data/` and `config/` to MongoDB
- Idempotent (checks if data exists before inserting)
- Seeds: personal info, education, career, social links
- Run via `npx tsx scripts/seed.ts`

## API Response Format
All routes return `ApiResponse<T>`:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

## Ready For
- DAENERYS: Redux stores (API endpoints ready)
- SANSA: UI components (API contract defined)
- JAIME: Admin pages (CRUD endpoints ready)

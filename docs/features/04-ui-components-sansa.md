# Story 04: UI Components — SANSA STARK

> "I'm a slow learner, but I learn."

## What Was Built

### 1. Skeleton Components (components/skeletons/)
- `HeroSkeleton.tsx` — avatar, heading, social icons, CTA buttons
- `CareerCardSkeleton.tsx` — company, role, date, description, achievements
- `EducationCardSkeleton.tsx` — institution, degree, CGPA, courses
- `ProjectCardSkeleton.tsx` — project name, description, tags, metadata
- `ResumeSkeleton.tsx` — form + preview layout
- `ResumeHistorySkeleton.tsx` — grid of resume cards
- `AdminDashboardSkeleton.tsx` — sidebar + content with stat cards
- `FormSkeleton.tsx` — generic form with label/input pairs
- `SocialLinksSkeleton.tsx` — row of social link cards

### 2. Loading Pages
- `app/career/loading.tsx` — 4 CareerCardSkeleton items
- `app/education/loading.tsx` — 3 EducationCardSkeleton items
- `app/resume/loading.tsx` — ResumeSkeleton
- `app/resume/[id]/loading.tsx` — resume detail skeleton
- `app/admin/loading.tsx` — AdminDashboardSkeleton

### 3. Notification System
- `NotificationProvider.tsx` — React context for notifications
- `Notification.tsx` — individual notification with auto-dismiss
- Supports: error, warning, info types
- Uses alert styling with icons

### 4. Shared Components
- `DataCard.tsx` — reusable card with optional edit/delete props
- `ConfirmDialog.tsx` — delete confirmation using AlertDialog
- `ImageUpload.tsx` — simple file input with preview
- `EmptyState.tsx` — no-data placeholder with optional action
- `PageHeader.tsx` — consistent page heading with optional action

## Design Decisions
- Skeletons use existing `components/ui/skeleton.tsx` as base
- DataCard's onEdit/onDelete are optional — absent in public, present in admin
- ImageUpload is simple `<input type="file">` (no drag-drop per user request)
- Notifications auto-dismiss after 5 seconds

## Ready For
- DAENERYS: Redux stores (skeletons ready for loading states)
- JAIME: Admin pages (shared components ready)

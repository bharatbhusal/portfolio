# JAIME LANNISTER: Admin Dashboard & Refactoring

## Phase 3 — Admin Dashboard + Public Page Refactoring

### Admin Pages Created
- `app/admin/personal/page.tsx` — Personal info form
- `app/admin/social-links/page.tsx` — Social links with predefined platforms
- `app/admin/education/page.tsx` — Education CRUD
- `app/admin/career/page.tsx` — Career CRUD
- `app/admin/resume/page.tsx` — Resume list viewer
- `app/admin/image/page.tsx` — Image upload/delete

### Shared Components
- `components/shared/DataCard.tsx` — Reusable card with optional onEdit/onDelete
- `components/shared/ConfirmDialog.tsx` — AlertDialog confirmation
- `components/shared/ImageUpload.tsx` — File input + preview
- `components/shared/EmptyState.tsx` — Empty state placeholder
- `components/shared/PageHeader.tsx` — Page header with action button
- `components/shared/NotificationProvider.tsx` — Toast notification system
- `components/shared/Notification.tsx` — Notification toast component
- `components/skeletons/FormSkeleton.tsx` — Form loading skeleton

# Story 04: UI Components — SANSA STARK

> "I'm a slow learner, but I learn."

## Agent: SANSA STARK
**Branch:** `feature/ui-sansa` from `feature/fullstack-conversion`
**Email:** sansa@winterfell.dev

## Prerequisites
- NED STARK's foundation merged (types, folder structure)

## Tasks

### 1. Skeleton Components (components/skeletons/)

All skeletons use the existing `components/ui/skeleton.tsx` as the base primitive.

**HeroSkeleton.tsx:**
- Circular avatar (260x260), heading line, subtitle line, 6 social icon circles, 2 CTA buttons
- Used by app/page.tsx

**CareerCardSkeleton.tsx:**
- Card with company name, role, date range, description lines, achievement bullets
- Used by app/career/loading.tsx

**EducationCardSkeleton.tsx:**
- Card with institution name, degree, date range, CGPA, courses pills
- Used by app/education/loading.tsx

**ProjectCardSkeleton.tsx:**
- Card with project name, description, tags, metadata (stars, language)
- Used by existing loading.tsx files

**ResumeSkeleton.tsx:**
- Builder layout: form area + preview area skeleton
- Used by app/resume/loading.tsx

**ResumeHistorySkeleton.tsx:**
- Grid of resume card skeletons
- Used by resume history section

**AdminDashboardSkeleton.tsx:**
- Sidebar + content area with stat cards
- Used by app/admin/loading.tsx

**FormSkeleton.tsx:**
- Generic form skeleton: label + input pairs, submit button
- Used by all admin form pages

**SocialLinksSkeleton.tsx:**
- Row of social link card skeletons (icon + URL + handle)
- Used by admin social links page

### 2. Loading Pages

**app/career/loading.tsx:**
```tsx
import { CareerCardSkeleton } from '@/components/skeletons/CareerCardSkeleton';
// Render 6 CareerCardSkeleton items in a grid
```

**app/education/loading.tsx:**
```tsx
import { EducationCardSkeleton } from '@/components/skeletons/EducationCardSkeleton';
// Render 3 EducationCardSkeleton items in a grid
```

**app/resume/loading.tsx:**
```tsx
import { ResumeSkeleton } from '@/components/skeletons/ResumeSkeleton';
```

**app/resume/[id]/loading.tsx:**
```tsx
// Resume detail skeleton: sidebar + main content
```

**app/admin/loading.tsx:**
```tsx
import { AdminDashboardSkeleton } from '@/components/skeletons/AdminDashboardSkeleton';
```

### 3. Notification System

**components/shared/NotificationProvider.tsx:**
- React context provider
- State: array of notifications `{ id, type: 'error' | 'warning' | 'info', title, message }`
- Methods: `addNotification()`, `removeNotification()`
- Renders notifications using shadcn AlertDialog or custom toast

**components/shared/Notification.tsx:**
- Individual notification component
- Uses shadcn alert-dialog for display
- Auto-dismiss after 5 seconds (optional)
- Manual close button

### 4. Shared CRUD Components

**components/shared/DataCard.tsx:**
```typescript
interface DataCardProps<T> {
  data: T;
  title: string;
  subtitle?: string;
  badges?: { label: string; variant?: string }[];
  links?: { label: string; url: string; icon?: React.ReactNode }[];
  onEdit?: () => void;    // Optional — present in admin, absent in public
  onDelete?: () => void;  // Optional — present in admin, absent in public
  children?: React.ReactNode;
}
```
- Reusable card with consistent styling
- Edit/Delete buttons only render when props are provided
- Used by career cards, education cards, social link cards

**components/shared/ConfirmDialog.tsx:**
```typescript
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  variant?: 'destructive' | 'default';
}
```
- Uses shadcn AlertDialog
- Destructive variant for delete confirmations

**components/shared/ImageUpload.tsx:**
```typescript
interface ImageUploadProps {
  currentImageId?: string;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
}
```
- Simple `<input type="file">` with accept="image/*"
- Preview of current image
- Upload and delete buttons
- NO drag-and-drop

**components/shared/EmptyState.tsx:**
```typescript
interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}
```
- Centered empty state with optional action button

**components/shared/PageHeader.tsx:**
```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void; icon?: React.ReactNode };
}
```
- Consistent page heading with optional action button

### 5. Write Feature Doc
Write `docs/features/04-ui-components-sansa.md`

## Commit

```
Git config (scoped to worktree):
  user.name = "Sansa Stark"
  user.email = "sansa@winterfell.dev"

Commit message:
feat(ui): skeleton components, notification system, shared CRUD components

- Created 9 skeleton components in /components/skeletons/
- Added loading.tsx for career, education, resume, admin routes
- Built notification system with AlertDialog-based alerts (error/warning/info)
- Created shared components: DataCard, ConfirmDialog, ImageUpload, EmptyState, PageHeader
- DataCard supports optional edit/delete props for admin/public reuse
- Simple file input image upload (no drag-drop)
```

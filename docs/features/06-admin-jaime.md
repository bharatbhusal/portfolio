# Story 06: Admin Dashboard — JAIME LANNISTER

> "By what right does the wolf judge the lion?"

## Agent: JAIME LANNISTER
**Branch:** `feature/admin-jaime` from `feature/fullstack-conversion`
**Email:** jaime@casterlyrock.dev

## Prerequisites
- ALL Phase 2 agents merged (auth, services, UI, Redux)

## Tasks

### 1. Admin Layout (app/admin/layout.tsx)
- Sidebar with navigation links:
  - Dashboard (overview)
  - Personal Info
  - Social Links
  - Education
  - Career
  - Resume
  - Image
- Active link highlighting
- Back to portfolio link
- Auth check — redirect to /login if not authenticated

### 2. Admin Dashboard (app/admin/page.tsx)
- Overview with stats cards:
  - Total education entries
  - Total career entries
  - Social links enabled count
  - Profile image status
- Quick action buttons to each section

### 3. Admin: Personal Info (app/admin/personal/)
**page.tsx:** Form to edit personal details
**components/PersonalInfoForm.tsx:**
- Fields: name (first, last), email, phone, website, portfolio, title, tagline, bio, keywords
- Load from Redux store
- Save via PUT /api/personal-info
- Show success/error notifications

### 4. Admin: Social Links (app/admin/social-links/)
**page.tsx:** List of predefined social platforms
**components/SocialLinksForm.tsx:**
- Display all 7 platforms with icons (from types/social.ts)
- Each platform: toggle (enabled/disabled), URL input, handle input
- Icons auto-assigned based on platform type
- Save via PUT /api/social-links
- Use DataCard component with toggle

### 5. Admin: Education (app/admin/education/)
**page.tsx:** List of education entries
**components/EducationForm.tsx:**
- Add new education entry
- Edit existing entry
- Delete with confirmation dialog
- Use DataCard component with onEdit/onDelete props
- Form fields matching education validation schema

### 6. Admin: Career (app/admin/career/)
**page.tsx:** List of career entries
**components/CareerForm.tsx:**
- Same pattern as education
- Add/edit/delete with confirmation
- Form fields matching career validation schema

### 7. Admin: Resume (app/admin/resume/)
**page.tsx:** View generated resumes
- List from Redux store
- Click to view details
- No create/edit (resume is LLM-generated)

### 8. Admin: Image (app/admin/image/)
**page.tsx:** Profile image management
**components/ImageUploadForm.tsx:**
- Show current profile image
- Upload new image via simple file input
- Delete current image
- Use ImageUpload shared component

### 9. Navbar Update (components/layout/Header.tsx)
- Add "Admin" link in navigation
- Only visible when authenticated (use AuthProvider)
- Links to /admin

### 10. Public Page Refactoring

**app/career/page.tsx:**
- Use SSR to fetch career data via prefetchCareer()
- Pass as props to client component
- Client component hydrates Redux store
- Use DataCard WITHOUT onEdit/onDelete props

**app/education/page.tsx:**
- Same pattern as career
- Use DataCard WITHOUT edit/delete props

**app/page.tsx (Home):**
- SSR prefetch for personal info and social links
- Pass as props to HeroSection and SocialLinks

### 11. Write Feature Doc
Write `docs/features/06-admin-jaime.md`

## Commit

```
Git config (scoped to worktree):
  user.name = "Jaime Lannister"
  user.email = "jaime@casterlyrock.dev"

Commit message:
feat(admin): admin dashboard, CRUD pages, public page refactoring

- Created admin layout with sidebar navigation
- Built admin pages: personal info, social links, education, career, resume, image
- Added Admin link to navbar (visible when authenticated)
- Refactored public pages to use SSR + Redux hydration
- Used DataCard with optional edit/delete props (admin vs public)
- All admin forms use shared components and validation schemas
```

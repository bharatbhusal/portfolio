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
- Form to edit personal details
- Fields: name (first, last), email, phone, website, portfolio, title, tagline, bio, keywords
- Load from Redux store
- Save via PUT /api/personal-info
- Show success/error notifications

### 4. Admin: Social Links (app/admin/social-links/)
- List of 7 predefined social platforms with icons
- Each platform: toggle (enabled/disabled), URL input, handle input
- Icons auto-assigned based on platform type
- Save via PUT /api/social-links

### 5. Admin: Education (app/admin/education/)
- List of education entries
- Add new education entry
- Edit existing entry
- Delete with confirmation dialog
- Form fields matching education validation schema

### 6. Admin: Career (app/admin/career/)
- Same pattern as education
- Add/edit/delete with confirmation

### 7. Admin: Resume (app/admin/resume/)
- View generated resumes
- List from Redux store
- Click to view details

### 8. Admin: Image (app/admin/image/)
- Show current profile image
- Upload new image via simple file input
- Delete current image

### 9. Navbar Update (components/layout/Header.tsx)
- Add "Admin" link in navigation
- Only visible when authenticated (use AuthProvider)
- Links to /admin

### 10. Public Page Refactoring
- Career page: SSR prefetch via prefetchCareer(), client component hydrates Redux
- Education page: Same pattern
- Home page: SSR prefetch personal info + social links, HeroSection uses server data

### 11. Write Feature Doc
- docs/features/06-admin-jaime.md

## Commits
- `feat: admin dashboard + header auth link` — admin pages, header Admin link
- `fix: resume page type error for optional _id`
- `feat: SSR + Redux hydration for public pages` — career, education, home SSR refactoring

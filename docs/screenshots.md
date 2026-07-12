# Portfolio Screenshots

A visual walkthrough of every page in the portfolio site. The app is a
Next.js 15 project; run it locally with `npm run dev` (default URL
`http://localhost:3000`). Screenshots below are viewport captures of each
route, saved under `/public/assets/`.

## Pages

### Home (`/`)

![Home](/public/assets/home.png)

- **How to get there:** The landing page, served at the root URL.
- **What it shows:** The hero/intro section with the avatar, name, and a
  toggle between the profile photo and a vCard QR code for saving contact
  details. Includes GSAP entrance animations and the dark/light theme switch.

### Projects (`/projects`)

![Projects](/public/assets/projects.png)

- **How to get there:** Header navigation item "Projects" or direct URL
  `/projects`.
- **What it shows:** The full repository listing fetched live from GitHub.
  Includes instant client-side search with a results-count badge, a topic
  dropdown filter with per-tag counts, sort buttons, pinned/featured
  repositories highlighted at the top, and paginated cards with skeleton
  loaders.

### Project Detail (`/projects/[repoName]`)

![Project Detail](/public/assets/project-detail.png)

- **How to get there:** Click "Readme" on any project card, e.g.
  `/projects/openworld`.
- **What it shows:** The dynamically rendered `README.md` of the selected
  repository, parsed with GFM support and compiled Mermaid diagrams injected
  as responsive SVGs. Skeleton loaders appear while metadata and markdown are
  fetched server-side.

### Career (`/career`)

![Career](/public/assets/career.png)

- **How to get there:** Header navigation item "Career" or direct URL
  `/career`.
- **What it shows:** A timeline or list of professional experience entries
  describing roles, organizations, and durations.

### Education (`/education`)

![Education](/public/assets/education.png)

- **How to get there:** Header navigation item "Education" or direct URL
  `/education`.
- **What it shows:** Academic background and qualifications presented in a
  clean, responsive layout.

### Resume Builder (`/resume`)

![Resume Builder](/public/assets/resume.png)

- **How to get there:** Header navigation item "Resume" or direct URL
  `/resume`.
- **What it shows:** The ATS resume builder with a "Generate New Resume"
  button (with inline cooldown timer when rate-limited), a live HTML preview
  of the generated resume with green-themed section titles and right-aligned
  clickable contacts (email, phone, website), and a "Download PDF" button.

### Resume History (`/resume` — scrolled)

![Resume History](/public/assets/resume-history.png)

- **How to get there:** Scroll to the bottom of the `/resume` page.
- **What it shows:** The "Previously Generated" section displaying a
  paginated grid of previously generated resumes, each card showing the
  generation date/time, a summary, and a "View Full Resume" link.

### Resume Detail (`/resume/[id]`)

![Resume Detail](/public/assets/resume-detail.png)

- **How to get there:** Click "View Full Resume" on a history card, e.g.
  `/resume/6a53c84a770efd29c7d0bb3f`.
- **What it shows:** A dedicated view of a previously generated resume with
  the full resume preview and a "Download PDF" button. Uses a separate layout
  with back navigation to the builder.

## Tips

- **Theme toggle:** Use the header switch to preview every page in light and
  dark mode (`next-themes`, persisted).
- **Live GitHub data:** The projects and detail pages query GitHub at request
  time (server-side, ~1-hour cache), so stars, forks, and READMEs reflect the
  connected account.
- **Filters & pagination:** On `/projects`, combine search, topic filter, and
  sort controls; pagination uses ellipsis for large result sets.

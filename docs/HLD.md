# High-Level Design (HLD)

This document outlines the high-level architecture and system components of the portfolio website.

## Architecture Diagram

The application is built on top of the **Next.js 15 App Router** using React Server Components (RSC) by default for data fetching, combined with dynamic Client Components for user interactivity.

```mermaid
graph TD
  User([Web Browser])
  
  subgraph Next.js App Router
    RootLayout[Root layout.tsx]
    
    subgraph Route Group: app/projects/list
      ListLayout[ProjectsList layout.tsx]
      ListPage[ProjectsList page.tsx]
      ClientList[ProjectsList Client Component]
    end
    
    subgraph Route: app/projects/repoName
      DetailLayout[ProjectDetail layout.tsx]
      DetailPage[ProjectDetail page.tsx]
      Mermaid[MermaidRenderer Client Component]
    end

    subgraph Route: app/resume
      ResumeLayout[Resume layout.tsx]
      ResumePage[Resume page.tsx]
      Builder[ResumeBuilder Client Component]
    end

    subgraph Route: app/resume/[id]
      DetailResumeLayout[Resume Detail layout.tsx]
      DetailResumePage[Resume Detail page.tsx]
    end
  end
  
  subgraph APIs & Services
    GithubAPI[GitHub REST API]
    StatsAPI[GitHub Stats API]
    GroqAPI[Groq LLM API]
    MongoDB[(MongoDB)]
  end

  User --> RootLayout
  
  %% Project List Route Path
  RootLayout --> ListLayout
  ListLayout --> ListPage
  ListPage -- Server Side Fetch --> GithubAPI
  ListPage -- Mount with Hydrated Data --> ClientList
  ListLayout -- Render bottom stats --> StatsAPI
  
  %% Project Detail Route Path
  RootLayout --> DetailLayout
  DetailLayout -- Server Fetch Repo Details --> GithubAPI
  DetailLayout --> DetailPage
  DetailPage -- Server Fetch README --> GithubAPI
  DetailPage -- Render Diagrams --> Mermaid

  %% Resume Route Path
  RootLayout --> ResumeLayout
  ResumeLayout --> ResumePage
  ResumePage --> Builder
  Builder -- Fetch latest --> MongoDB
  Builder -- Generate via LLM --> GroqAPI
  Builder -- Save resume --> MongoDB

  %% Resume Detail Route Path
  RootLayout --> DetailResumeLayout
  DetailResumeLayout --> DetailResumePage
  DetailResumePage -- Fetch by ID --> MongoDB
```

## System Components

### 1. Root Layout (`app/layout.tsx`)
- Defines the main HTML shell (theme providers, styling, fonts).
- Renders the global shared Header and Footer navigation elements.

### 2. Route Groups Separation
To avoid resource leaks and layout overlap, we split the projects routes:
- **Listing View Group (`app/projects/(list)`)**:
  - The shared listing layout renders the header and embeds the **GitHub Statistics** widget at the bottom of the page.
  - The page fetches all repositories on the server and passes them to the interactive `ProjectsList` client component.
- **Detail View Group (`app/projects/[repoName]`)**:
  - Encapsulates its own dedicated layout to fetch repository names and descriptions on the server.
  - Excludes the `GitHubStats` widget completely, preventing stats leakage.

### 3. Server-Side Data Fetching & Caching
- All API requests to GitHub (`/users/repos`, `/repos/details`, and `/repos/readme`) are executed on the server side using a unified fetch client.
- To prevent GitHub rate limit exhaustion, Next.js page data collection is configured to cache API responses using Next.js caching headers:
  ```typescript
  next: { revalidate: 3600 } // Cache API responses for 1 hour
  ```

### 4. Interactive Client Boundaries
Client-side interactivity is deferred to leaf components:
- **`ProjectsList`**: Manages search state, sorting field/order, topic dropdown selectors, and page indices.
- **`MermaidRenderer`**: Handles client-side SVG generation for Mermaid graphs, ensuring no web API execution occurs during server-rendering (SSR).
- **`ToggleProfileQR`**: Interactive button to switch between the profile avatar and a vCard QR code.
- **`ResumeBuilder`**: Manages resume generation, cooldown timer, history pagination, and preview/display. Fetches latest resume from MongoDB on mount, stores timestamps in localStorage for client-side rate limiting.

### 5. Resume Builder (`app/resume/`)
- **Route**: `/resume` (resume builder), `/resume/[id]` (resume detail view).
- **Layout**: Separate layout from project routes — includes heading and back navigation.
- **Data Flow**: Client component fetches from 4 API routes (`/api/resume/generate`, `/api/resume/latest`, `/api/resume/history`, `/api/resume/[id]`).
- **LLM Integration**: Groq API (`llama-3.3-70b-versatile`) generates ATS-optimized resumes from structured context built from `data/aboutMe.ts`, `data/careerData.ts`, `data/educationData.ts`, and GitHub repos.
- **Persistence**: MongoDB stores generated resumes (`resumes` collection) and rate limit records (`rate_limits` collection).
- **Rate Limiting**: Dual-layer — service-wide 2hr (in-memory) + per-user 10min (MongoDB + localStorage). Button shows inline countdown when disabled.
- **PDF Generation**: `@react-pdf/renderer` produces A4 PDFs with green-themed section titles and clickable contact links.

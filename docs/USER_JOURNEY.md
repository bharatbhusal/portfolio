# User Journey

This document describes the interactive user flows and navigational pathways for visitors browsing the portfolio website.

## Navigational Paths & States

### Scenario 1: Browsing and Filtering the Projects Page

```mermaid
sequenceDiagram
  actor Visitor
  participant UI as Portfolio UI
  participant States as ProjectsList States
  
  Visitor->>UI: Navigates to /projects
  UI->>States: Initialize page=1, query="", topic="all", sort="name (asc)"
  UI-->>Visitor: Displays first 6 project cards (pinned items highlighted first)
  
  Visitor->>UI: Types "React" in the Search bar
  UI->>States: Updates query="React", resets page=1
  UI-->>Visitor: Filters cards list and updates results badge count
  
  Visitor->>UI: Clicks Topic Dropdown and selects "Next.js"
  UI->>States: Updates topic="nextjs", resets page=1
  UI-->>Visitor: Filters and shows cards matching query & topic
  
  Visitor->>UI: Clicks "Updated" Sort Button
  UI->>States: Updates sort="updated (desc)"
  UI-->>Visitor: Re-orders filtered projects list (most recent first)
  
  Visitor->>UI: Clicks page button "2"
  UI->>States: Updates page=2
  UI-->>Visitor: Displays projects 7 to 12
```

---

### Scenario 2: Reading Repository Details & Diagrams

```mermaid
sequenceDiagram
  actor Visitor
  participant UI as Portfolio UI
  participant Loader as Skeleton Loader
  participant API as GitHub Service
  participant SVG as Mermaid Compiler
  
  Visitor->>UI: Clicks "Readme" on a Project Card
  UI->>Loader: Activates detail page skeletons
  UI->>API: Fetches repo metadata & README.md (Server Side)
  API-->>UI: Returns metadata and raw README markdown string
  UI->>UI: Renders header layout and parses markdown content
  
  Note over UI: Custom renderer maps `language-mermaid` block
  UI->>SVG: Mounts MermaidRenderer with diagram code
  SVG-->>UI: Compiles vector layout and injects SVG
  
  UI->>Visitor: Displays formatted README and interactive diagrams
  Visitor->>UI: Clicks device/browser "Back" button
  UI-->>Visitor: Returns to /projects (preserving cache)
```

## Highlights of the User Experience

1. **Fluid Loading Skeletons**: Visitors encounter clean layout frames instead of blank white screens during dynamic data fetching, keeping page load perceived performance high.
2. **Instant Search Feedback**: Results count badges and listing grids update instantly as the user types keywords, avoiding full page refreshes.
3. **Optimized Pagination Layout**: Restricting page indexes using middle page ellipses ensures the navigation bar looks clean and readable on mobile views.
4. **Isolated README Layouts**: Accessing project sub-routes exposes full-width markdown views without trailing statistics sections, ensuring readers can focus strictly on the project details.

# Low-Level Design (LLD)

This document provides details on specific modules, database schemas, interfaces, component properties, and algorithmic behaviors.

## Code Interfaces & Types

### Project Item Type
Defined in [types/index.ts](portfolio/types/index.ts):
```typescript
export interface ProjectItem {
  project: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  highlight?: string; // Set to "PINNED" if repo contains 'pin' topic
  stars?: number;
  forks?: number;
  updatedAt?: string;
  language?: string;
}
```

---

## Detailed Component Specifications

### 1. GitHub API Service (`lib/github.ts`)
Unified fetch client containing central network configurations:
- **`githubFetch<T>(endpoint, options)`**:
  - Automatically loads `process.env.GITHUB_TOKEN` to set the `Authorization: Bearer <token>` header if configured.
  - Formats default headers including `Accept` and `User-Agent`.
  - Configures default 1-hour static cache revalidation (`next: { revalidate: 3600 }`).
- **`getGithubUsername()`**:
  - Checks environment variables (`NEXT_PUBLIC_GITHUB_USERNAME` and `GITHUB_USERNAME`) before using the fallback values in `config/contact-info.ts`.
- **`getGithubRepoReadme(repoName)`**:
  - Fetches the repository's default README.
  - Decodes base64 string safely by striping line breaks and decoding with `Buffer.from(content, "base64").toString("utf8")`.

### 2. Client-Side State Management (`ProjectsList.tsx`)
Manages five interactive state hooks:
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [selectedTopic, setSelectedTopic] = useState("all");
const [sortBy, setSortBy] = useState<"name" | "updated">("name");
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
const [featuredOnly, setFeaturedOnly] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
```

#### Pagination Ellipsis Mathematics
The page list button array is derived as follows:
- Let $T$ be the total pages.
- If $T \le 4$, render all page buttons: $[1, \dots, T]$.
- If $T > 4$:
  - Always render the first two page buttons: $[1, 2]$.
  - If current page index $C$ is in the middle slot ($C > 2$ and $C < T - 1$):
    - If $C > 3$, append `"...."` separator.
    - Append the current page number $C$ to the array.
    - If $C < T - 2$, append `"...."` separator.
  - If $C$ is not in the middle, append a single `"...."` separator.
  - Always render the last two page buttons: $[T - 1, T]$.

### 3. Hydration-Safe Mermaid Compiler (`MermaidRenderer.tsx`)
- Renders code blocks matching class `language-mermaid`.
- In Next.js, importing heavy browser-only libraries like `mermaid` at the top level causes `ReferenceError: document is not defined` during Server-Side Rendering (SSR).
- **Resolution**:
  - `MermaidRenderer` is configured as a client component (`"use client"`).
  - All references to `mermaid` are dynamically imported inside `useEffect` (`const mermaid = (await import("mermaid")).default`), keeping server bundle size small and preventing Node.js SSR compilation failures.
  - A random element ID is generated dynamically to compile the SVG string asynchronously (`await mermaid.render(id, chart)`), updating the DOM state inside the client browser.

### 4. Markdown Hydration Fixes (`app/projects/[repoName]/page.tsx`)
- Standard markdown compilers wrap fenced code blocks inside nested `<pre><code>` containers.
- If a custom `code` component returns a block element like `MermaidRenderer`, nesting a block element inside a paragraph `<p>` tag violates HTML specs and triggers React hydration failures.
- **Resolution**:
  - The custom `pre` node mapper evaluates its children. If the child is a code block containing class `language-mermaid`, it strips out the parent `<pre>` tag container and returns the child node directly.
  - This allows the `MermaidRenderer` component to draw dynamic SVG charts as standalone block containers, preventing HTML violations and rendering clean responsive grids.

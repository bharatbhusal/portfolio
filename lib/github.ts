import { contactInfo } from "@/config/contact-info";
import { ProjectItem } from "@/types";

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

export function getGithubUsername(): string {
  return process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
         process.env.GITHUB_USERNAME ||
         contactInfo.social.github.split("/").pop() ||
         "bharatbhusal";
}

// Dedicated central client for all GitHub API requests
async function githubFetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers = new Headers();
  headers.set("Accept", "application/vnd.github+json");
  headers.set("User-Agent", "bharatbhusal-portfolio");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options?.headers) {
    const extraHeaders = new Headers(options.headers);
    extraHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const url = `https://api.github.com/${endpoint.replace(/^\//, "")}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 3600, ...options?.next }, // Cache for 1 hour by default
    });

    if (!response.ok) {
      console.error(`GitHub API error on ${url}: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`GitHub fetch failed on ${url}:`, error);
    return null;
  }
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const username = getGithubUsername();
  const repos = await githubFetch<GithubRepo[]>(
    `users/${username}/repos?sort=updated&per_page=100`
  );
  return repos || [];
}

export async function getGithubProjects(): Promise<ProjectItem[]> {
  const repos = await fetchGithubRepos();
  
  if (repos.length === 0) {
    return [];
  }

  // Filter out forks so only original repositories are shown
  const sourceRepos = repos.filter(repo => !repo.fork);

  const mappedProjects: ProjectItem[] = sourceRepos.map(repo => {
    const links = [
      { link: repo.html_url, type: "github", icon: null as any }
    ] as any[];

    // Add homepage link if it exists on GitHub
    if (repo.homepage) {
      links.push({ link: repo.homepage, type: "website", icon: null as any });
    }

    // Add internal details link for README page
    links.push({ link: `/projects/${repo.name}`, type: "details", icon: null as any });

    // Check if the repo has 'pin' (case-insensitive) in its topics
    const isPinned = repo.topics?.some(t => t.toLowerCase() === "pin");

    return {
      project: formatRepoName(repo.name),
      description: repo.description || "No description provided.",
      // Show topics directly, filtering out the system 'pin' topic. Fallback to main language.
      technologies: (repo.topics && repo.topics.length > 0)
        ? repo.topics.filter(t => t.toLowerCase() !== "pin")
        : repo.language
          ? [repo.language]
          : [],
      links,
      highlight: isPinned ? "PINNED" : undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      language: repo.language || undefined,
    };
  });

  return mappedProjects;
}

export async function getGithubRepoDetails(repoName: string): Promise<any | null> {
  const username = getGithubUsername();
  return githubFetch<any>(`repos/${username}/${repoName}`);
}

export async function getGithubRepoReadme(repoName: string): Promise<string> {
  const username = getGithubUsername();
  const data = await githubFetch<any>(`repos/${username}/${repoName}/readme`);
  
  if (data && data.content && data.encoding === "base64") {
    const cleanBase64 = data.content.replace(/\s/g, "");
    return Buffer.from(cleanBase64, "base64").toString("utf8");
  }
  return "";
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

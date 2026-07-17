import { ProjectItem, ProjectLink } from "@/types";
import { getSetting } from "@/models/settings";

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
  default_branch: string;
  license?: { name: string; spdx_id?: string };
}

interface GraphQLCommitInfo {
  message: string;
  oid: string;
}

interface GraphQLBranchRef {
  name: string;
  target: GraphQLCommitInfo | null;
}

interface GraphQLRepoNode {
  name: string;
  defaultBranchRef: GraphQLBranchRef | null;
}

interface GraphQLReposData {
  repositoryOwner: {
    repositories: {
      nodes: GraphQLRepoNode[];
    };
  };
}

export async function getGithubUsername(): Promise<string> {
  const dbUsername = await getSetting("github_username");
  return dbUsername || "";
}

// Dedicated central client for all GitHub API requests
async function githubFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> {
  const token = await getSetting("github_token");
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
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
        ...options?.next,
      },
    });

    if (!response.ok) {
      console.error(
        `GitHub API error on ${url}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`GitHub fetch failed on ${url}:`, error);
    return null;
  }
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const username = await getGithubUsername();
  if (!username) return [];
  const repos = await githubFetch<GithubRepo[]>(
    `users/${username}/repos?sort=updated&per_page=100`,
  );
  return repos || [];
}

// GraphQL client for batch queries
async function githubGraphQLFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const token = await getSetting("github_token");
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/vnd.github+json");
  headers.set("User-Agent", "bharatbhusal-portfolio");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 },
    });

    if (!response.ok) {
      console.error(
        `GitHub GraphQL error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const json = await response.json();
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.error("GitHub GraphQL fetch failed:", error);
    return null;
  }
}

export async function getGithubProjects(): Promise<ProjectItem[]> {
  const repos = await fetchGithubRepos();

  if (repos.length === 0) {
    return [];
  }

  const shyTopics = ["shy"];

  // Filter out repos with "shy" topic
  const visibleRepos = repos.filter(
    (repo) => !repo.topics?.some((t) => shyTopics.includes(t.toLowerCase())),
  );

  const mappedProjects: ProjectItem[] = visibleRepos.map((repo) => {
    const links: ProjectLink[] = [
      { link: repo.html_url, type: "github", icon: undefined },
    ];

    if (repo.homepage) {
      links.push({ link: repo.homepage, type: "website", icon: undefined });
    }

    links.push({
      link: `/projects/${repo.name}`,
      type: "details",
      icon: undefined,
    });

    const isFeatured = repo.topics?.some((t) => t.toLowerCase() === "pin");

    return {
      project: formatRepoName(repo.name),
      description: repo.description || "No description provided.",
      tags:
        repo.topics?.filter(
          (t) => !shyTopics.includes(t.toLowerCase()) && t !== "pin",
        ) || [],
      links,
      isFeatured,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      language: repo.language || undefined,
    };
  });

  // Batch-fetch latest commits for all repos in a single GraphQL call
  const commitQuery = `
    query ReposWithDefaultBranch($username: String!) {
      repositoryOwner(login: $username) {
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            defaultBranchRef {
              name
              target {
                ... on Commit {
                  message
                  oid
                }
              }
            }
          }
        }
      }
    }
  `;

  const commitData = await githubGraphQLFetch<GraphQLReposData>(commitQuery, {
    username: await getGithubUsername(),
  });
  const commitMap = new Map<string, { branch: string; message: string }>();

  if (commitData?.repositoryOwner?.repositories?.nodes) {
    for (const node of commitData.repositoryOwner.repositories.nodes) {
      if (node.defaultBranchRef?.target) {
        commitMap.set(node.name, {
          branch: node.defaultBranchRef.name,
          message: node.defaultBranchRef.target.message,
        });
      }
    }
  }

  return mappedProjects.map((project) => {
    const repo = visibleRepos.find(
      (r) => formatRepoName(r.name) === project.project,
    );
    if (!repo) return project;
    const commit = commitMap.get(repo.name);
    if (!commit) return project;
    return {
      ...project,
      latestCommit: commit,
    };
  });
}

export async function getGithubRepoDetails(
  repoName: string,
): Promise<GithubRepo | null> {
  const username = await getGithubUsername();
  if (!username) return null;
  return githubFetch<GithubRepo>(`repos/${username}/${repoName}`);
}

export async function getGithubRepoReadme(repoName: string): Promise<string> {
  const username = await getGithubUsername();
  if (!username) return "";
  const data = await githubFetch<{ content: string; encoding: string }>(
    `repos/${username}/${repoName}/readme`,
  );

  if (data && data.content && data.encoding === "base64") {
    const cleanBase64 = data.content.replace(/\s/g, "");
    return Buffer.from(cleanBase64, "base64").toString("utf8");
  }
  return "";
}

export interface PinnedRepoWithReadme {
  name: string;
  description: string;
  tags: string[];
  links: { type: string; url: string }[];
  readmeContent: string;
  language: string | null;
}

export async function getGithubPinnedReposWithReadme(): Promise<
  PinnedRepoWithReadme[]
> {
  const repos = await fetchGithubRepos();
  const shyTopics = ["shy"];

  const pinnedRepos = repos
    .filter(
      (repo) =>
        repo.topics?.some((t) => t.toLowerCase() === "pin") &&
        !repo.topics?.some((t) => shyTopics.includes(t.toLowerCase())),
    )
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );

  const results: PinnedRepoWithReadme[] = [];
  for (const repo of pinnedRepos) {
    const readmeRaw = await getGithubRepoReadme(repo.name);
    const links: { type: string; url: string }[] = [
      { type: "github", url: repo.html_url },
    ];
    if (repo.homepage) {
      links.push({ type: "website", url: repo.homepage });
    }
    results.push({
      name: formatRepoName(repo.name),
      description: repo.description || "No description provided.",
      tags:
        repo.topics?.filter(
          (t) => !shyTopics.includes(t.toLowerCase()) && t !== "pin",
        ) || [],
      links,
      readmeContent: readmeRaw,
      language: repo.language || null,
    });
  }

  return results;
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

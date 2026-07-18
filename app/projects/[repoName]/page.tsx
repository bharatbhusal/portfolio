import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Calendar,
  Shield,
  Cpu,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getGithubRepoDetails,
  getGithubRepoReadme,
  getGithubUsername,
} from "@/lib/github";
import MermaidRenderer from "@/components/features/projects/repo/MermaidRenderer";

import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    repoName: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { repoName } = await params;
  const repo = await getGithubRepoDetails(repoName);

  if (!repo) {
    return {
      title: "Project Not Found",
      description: "The requested GitHub repository could not be found.",
    };
  }

  const formattedName = repo.name
    .split(/[-_]+/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: formattedName,
    description:
      repo.description ||
      `Read the details and documentation of the ${formattedName} repository on the portfolio.`,
    openGraph: {
      title: `${formattedName} | Projects`,
      description:
        repo.description ||
        `Read the documentation of ${repo.name} on the portfolio.`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { repoName } = await params;

  // Fetch details and readme in parallel
  const [repo, readme] = await Promise.all([
    getGithubRepoDetails(repoName),
    getGithubRepoReadme(repoName),
  ]);

  if (!repo) {
    notFound();
  }

  const defaultBranch = repo.default_branch || "main";
  const githubUsername = await getGithubUsername();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Markdown Contents */}
        <div className="lg:col-span-3">
          <div className="border border-border/60 rounded-xl p-6 sm:p-10 bg-card/50 backdrop-blur-md shadow-lg overflow-x-hidden">
            {readme ? (
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1
                        className="text-3xl font-extrabold border-b pb-2 mb-4 text-foreground"
                        {...props}
                      />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="text-2xl font-bold border-b pb-1.5 mb-4 text-foreground"
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className="text-xl font-semibold mb-3 mt-6 text-foreground"
                        {...props}
                      />
                    ),
                    h4: ({ ...props }) => (
                      <h4
                        className="text-lg font-semibold mb-3 mt-6 text-foreground"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <p
                        className="mb-4 text-muted-foreground leading-relaxed text-sm sm:text-base"
                        {...props}
                      />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground text-sm sm:text-base"
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <ol
                        className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground text-sm sm:text-base"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                    a: ({ href, ...props }) => {
                      const isAnchor = href?.startsWith("#");
                      const isExternal =
                        href?.startsWith("http") || href?.startsWith("//");
                      if (isAnchor) {
                        return (
                          <a
                            className="text-primary hover:underline"
                            href={href}
                            {...props}
                          />
                        );
                      }
                      let targetUrl = href;
                      if (!isExternal && href) {
                        const username = githubUsername;
                        targetUrl = `https://github.com/${username}/${repoName}/blob/${defaultBranch}/${href.replace(
                          /^\.\//,
                          "",
                        )}`;
                      }
                      return (
                        <a
                          className="text-primary hover:underline font-medium break-all"
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      );
                    },
                    pre: ({ children, ...props }) => {
                      const child = React.Children.only(
                        children,
                      ) as React.ReactElement<{
                        className?: string;
                      }>;
                      if (
                        child &&
                        child.props &&
                        child.props.className === "language-mermaid"
                      ) {
                        return children;
                      }
                      return (
                        <pre
                          className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-6 font-mono text-xs sm:text-sm border border-border/50 text-foreground"
                          {...props}
                        >
                          {children}
                        </pre>
                      );
                    },
                    code: ({ className, children, ...props }) => {
                      const isBlock =
                        className?.includes("language-") ||
                        (typeof children === "string" &&
                          children.includes("\n"));

                      if (className === "language-mermaid") {
                        return (
                          <MermaidRenderer chart={String(children).trim()} />
                        );
                      }

                      return !isBlock ? (
                        <code
                          className="bg-muted/70 px-1.5 py-0.5 rounded text-sm font-mono text-foreground border border-border/40"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    table: ({ ...props }) => (
                      <div className="overflow-x-auto my-6 border border-border/50 rounded-lg">
                        <table
                          className="min-w-full divide-y divide-border"
                          {...props}
                        />
                      </div>
                    ),
                    thead: ({ ...props }) => (
                      <thead className="bg-muted/50" {...props} />
                    ),
                    tbody: ({ ...props }) => (
                      <tbody
                        className="divide-y divide-border/40 bg-card/10"
                        {...props}
                      />
                    ),
                    tr: ({ ...props }) => (
                      <tr
                        className="hover:bg-muted/20 transition-colors"
                        {...props}
                      />
                    ),
                    th: ({ ...props }) => (
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider border-r border-border/40 last:border-r-0"
                        {...props}
                      />
                    ),
                    td: ({ ...props }) => (
                      <td
                        className="px-4 py-3 text-sm text-muted-foreground border-r border-border/40 last:border-r-0"
                        {...props}
                      />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground bg-primary/5 py-2 pr-2 rounded-r-lg"
                        {...props}
                      />
                    ),
                    img: ({ src, alt, width, height, ...props }) => {
                      const srcStr = typeof src === "string" ? src : "";
                      let imageUrl = srcStr;
                      const isExternal =
                        srcStr.startsWith("http") ||
                        srcStr.startsWith("//") ||
                        srcStr.startsWith("data:");
                      if (!isExternal && srcStr) {
                        const username = githubUsername;
                        imageUrl = `https://raw.githubusercontent.com/${username}/${repoName}/${defaultBranch}/${srcStr.replace(
                          /^\.\//,
                          "",
                        )}`;
                      }
                      return (
                        <Image
                          className="rounded-lg max-w-full h-auto my-6 mx-auto border border-border/40"
                          src={imageUrl || ""}
                          alt={alt || ""}
                          width={typeof width === "number" ? width : 800}
                          height={typeof height === "number" ? height : 600}
                          unoptimized
                          {...props}
                        />
                      );
                    },
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="text-center py-12 space-y-4">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                <h3 className="font-semibold text-lg">No README available</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  This repository does not have a README file or we were unable
                  to retrieve it from GitHub. You can explore the files
                  directly.
                </p>
                <div className="pt-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-full hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Github className="h-4 w-4" />
                    Browse Files
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="border border-border/60 rounded-xl p-6 bg-card/40 backdrop-blur-md shadow-lg space-y-6 sticky top-24">
            <h2 className="font-bold text-lg border-b pb-3">Project Details</h2>

            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500/10" />
                  Stars
                </span>
                <span className="font-medium">{repo.stargazers_count}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <GitFork className="h-4 w-4" />
                  Forks
                </span>
                <span className="font-medium">{repo.forks_count}</span>
              </div>

              {repo.language && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Language
                  </span>
                  <span className="font-medium">{repo.language}</span>
                </div>
              )}

              {repo.license && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    License
                  </span>
                  <span
                    className="font-medium max-w-[120px] truncate"
                    title={repo.license.name}
                  >
                    {repo.license.spdx_id || repo.license.name}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Updated
                </span>
                <span className="font-medium">
                  {new Date(repo.updated_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-primary-foreground font-medium text-sm rounded-full hover:bg-primary/95 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <Github className="h-4 w-4" />
                View Code
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-border hover:bg-muted text-foreground font-medium text-sm rounded-full transition-all active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

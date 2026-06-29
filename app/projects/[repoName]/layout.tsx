import React from "react";
import { getGithubRepoDetails } from "@/lib/github";

interface DetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ repoName: string }>;
}

export default async function ProjectDetailLayout({
  children,
  params,
}: DetailLayoutProps) {
  const { repoName } = await params;
  const repo = await getGithubRepoDetails(repoName);
  
  const title = repo
    ? repo.name.split(/[-_]+/).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : repoName.split(/[-_]+/).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const description = repo?.description || "No description provided.";

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

import React from "react";
import SectionWrapper from "@/components/features/projects/list/SectionWrapper";
import GitHubStats from "@/components/features/projects/list/GitHubStats";
import { getGithubUsername } from "@/lib/github";

export default async function ProjectsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = await getGithubUsername();
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12 max-w-xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Things I&apos;ve built and contributed to
        </p>
      </div>
      {children}

      <SectionWrapper>
        <div id="stats" className="max-w-4xl mx-auto mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            GitHub Statistics
          </h2>
          <GitHubStats username={username} />
        </div>
      </SectionWrapper>
    </div>
  );
}

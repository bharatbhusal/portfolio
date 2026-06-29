import React from "react";
import { getGithubProjects } from "@/lib/github";
import ProjectsList from "@/components/features/ProjectsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and contributed to. Dynamic catalog of repositories, libraries, and web apps sourced directly from GitHub.",
};

export default async function ProjectsPage() {
  const projects = await getGithubProjects();
  return <ProjectsList initialProjects={projects} />;
}

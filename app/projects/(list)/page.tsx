import React from "react";
import { getGithubProjects } from "@/lib/github";
import ProjectsList from "@/components/features/ProjectsList";

export default async function ProjectsPage() {
  const projects = await getGithubProjects();
  return <ProjectsList initialProjects={projects} />;
}

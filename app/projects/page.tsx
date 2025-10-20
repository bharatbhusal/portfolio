"use client";
import ProjectsCard from "@/components/cards/ProjectsCard";
import projectsData from "@/data/projectsData";
import GitHubStats from "@/components/features/GitHubStats";
import { useMemo } from "react";

const Projects = () => {
  // Sort projects: pinned first, then rest
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen py-8 z-0 overflow-y-auto space-y-12">
      {/* Projects Section */}
      <div className="space-y-6 px-4 sm:px-6 md:px-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Projects</h1>
        </div>

        {/* Grid Layout: 1 column (sm), 2 columns (md), 3 columns (lg+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-8">
          {sortedProjects.map((project, index) => (
            <ProjectsCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/* GitHub Stats Section with Bookmark */}
      <div id="stats" className="w-full px-4 sm:px-6 md:px-8 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">
          GitHub Statistics
        </h2>
        <div className="w-full lg:w-[80%] xl:w-[70%] mx-auto">
          <GitHubStats username="bharatbhusal" />
        </div>
      </div>
    </div>
  );
};

export default Projects;

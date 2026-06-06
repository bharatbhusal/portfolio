"use client";

import React, { useMemo } from "react";
import projectsData from "@/data/projectsData";
import { ProjectCard } from "@/components/cards";
import { SectionWrapper } from "@/components/features";
import GitHubStats from "@/components/features/GitHubStats";

const Projects = () => {
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div
          // ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedProjects.map((project) => (
            <ProjectCard key={project.project} {...project} />
          ))}
        </div>
      </div>

      <SectionWrapper>
        <div id="stats" className="max-w-4xl mx-auto mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            GitHub Statistics
          </h2>
          <GitHubStats username="bharatbhusal" />
        </div>
      </SectionWrapper>
    </>
  );
};

export default Projects;

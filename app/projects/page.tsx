"use client";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
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
    <div className="flex flex-col w-full min-h-screen py-8 z-0 overflow-hidden overflow-y-scroll space-y-12">
      {/* Projects Section */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-center">Projects</h1>
        <p className="text-center text-muted-foreground text-sm">
          📌 Top 3 pinned projects
        </p>
      </div>
      <div className="flex w-full lg:w-[70%] xl:w-[60%] lg:mx-auto px-4 sm:px-6 md:px-8 justify-center pb-8">
        <Carousel orientation="vertical" className="w-full">
          {sortedProjects.map((project, index) => (
            <CarouselItem
              key={index}
              className="basis-11/12 sm:basis-10/12 md:basis-1/2 lg:basis-1/3 pb-4"
            >
              <ProjectsCard {...project} />
            </CarouselItem>
          ))}
        </Carousel>
      </div>

      {/* GitHub Stats Section */}
      <div className="w-full px-4 sm:px-6 md:px-8">
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

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Cpu } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { ProjectItem } from "@/types";
import ProjectsFilterBar from "./ProjectsFilterBar";
import ProjectsPagination from "./ProjectsPagination";
import { EmptyState } from "@/components/shared/EmptyState";

interface ProjectsListProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "updated">("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, sortOrder, featuredOnly]);

  const handleSortClick = (field: "name" | "updated") => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder(field === "updated" ? "desc" : "asc");
    }
  };

  const processedProjects = useMemo(() => {
    let filtered = initialProjects.filter((proj) => {
      const nameMatch = proj.project
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descMatch = proj.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });

    if (featuredOnly) {
      filtered = filtered.filter((proj) => proj.isFeatured);
    }

    return [...filtered].sort((a, b) => {
      let compare = 0;
      if (sortBy === "updated") {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        compare = dateB - dateA;
        return sortOrder === "desc" ? compare : -compare;
      } else {
        compare = a.project.localeCompare(b.project);
        return sortOrder === "asc" ? compare : -compare;
      }
    });
  }, [initialProjects, searchQuery, sortBy, sortOrder, featuredOnly]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedProjects.length / itemsPerPage),
  );
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProjects, currentPage, itemsPerPage]);

  if (initialProjects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Configure your GitHub username in the admin dashboard to show your repositories here."
      />
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-sans">
      <ProjectsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortClick={handleSortClick}
        featuredOnly={featuredOnly}
        onFeaturedToggle={() => setFeaturedOnly((prev) => !prev)}
        resultCount={processedProjects.length}
      />

      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.project} {...project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/80 rounded-xl bg-card/10 space-y-3">
          <Cpu className="h-10 w-10 text-muted-foreground/60 mx-auto" />
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search filters or typing another term.
          </p>
        </div>
      )}

      <ProjectsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={processedProjects.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Cpu } from "lucide-react";
import { ProjectCard } from "@/components/cards";
import { ProjectItem } from "@/types";
import ProjectsFilterBar from "@/components/features/ProjectsFilterBar";
import ProjectsPagination from "@/components/features/ProjectsPagination";

interface ProjectsListProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "updated">("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    initialProjects.forEach((proj) => {
      proj.tags?.forEach((tag) => {
        topicsSet.add(tag.toLowerCase());
      });
    });
    return Array.from(topicsSet).sort();
  }, [initialProjects]);

  const allLanguages = useMemo(() => {
    const langSet = new Set<string>();
    initialProjects.forEach((proj) => {
      if (proj.language) {
        langSet.add(proj.language.toLowerCase());
      }
    });
    return Array.from(langSet).sort();
  }, [initialProjects]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProjects.forEach((proj) => {
      proj.tags?.forEach((tag) => {
        const key = tag.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return counts;
  }, [initialProjects]);

  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProjects.forEach((proj) => {
      if (proj.language) {
        const key = proj.language.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return counts;
  }, [initialProjects]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedTopic,
    selectedLanguage,
    sortBy,
    sortOrder,
    featuredOnly,
  ]);

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

    if (selectedTopic !== "all") {
      filtered = filtered.filter((proj) =>
        proj.tags?.some((tag) => tag.toLowerCase() === selectedTopic),
      );
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter(
        (proj) => proj.language?.toLowerCase() === selectedLanguage,
      );
    }

    if (featuredOnly) {
      filtered = filtered.filter((proj) => proj.isFeatured);
    }

    return [...filtered].sort((a, b) => {
      const isAPinned = a.isFeatured;
      const isBPinned = b.isFeatured;

      if (!featuredOnly) {
        if (isAPinned && !isBPinned) return -1;
        if (!isAPinned && isBPinned) return 1;
      }

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
  }, [
    initialProjects,
    searchQuery,
    selectedTopic,
    selectedLanguage,
    sortBy,
    sortOrder,
    featuredOnly,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedProjects.length / itemsPerPage),
  );
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProjects, currentPage, itemsPerPage]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-sans">
      <ProjectsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortClick={handleSortClick}
        featuredOnly={featuredOnly}
        onFeaturedToggle={() => setFeaturedOnly((prev) => !prev)}
        allTopics={allTopics}
        allLanguages={allLanguages}
        topicCounts={topicCounts}
        languageCounts={languageCounts}
        totalProjects={initialProjects.length}
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

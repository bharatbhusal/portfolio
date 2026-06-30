"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown, Cpu } from "lucide-react";
import { ProjectCard } from "@/components/cards";
import { ProjectItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface ProjectsListProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  // Client-side states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "updated">("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extract unique topics across all repositories
  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    initialProjects.forEach(proj => {
      proj.technologies?.forEach(tech => {
        topicsSet.add(tech.toLowerCase());
      });
    });
    return Array.from(topicsSet).sort();
  }, [initialProjects]);

  // Reset page to 1 when filters, sorting, or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTopic, sortBy, sortOrder, featuredOnly]);

  // Handle Sort button clicks
  const handleSortClick = (field: "name" | "updated") => {
    if (sortBy === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder(field === "updated" ? "desc" : "asc");
    }
  };

  // Filter and sort repositories
  const processedProjects = useMemo(() => {
    // 1. Filter by search query
    let filtered = initialProjects.filter(proj => {
      const nameMatch = proj.project.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = proj.description.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });

    // 2. Filter by topic
    if (selectedTopic !== "all") {
      filtered = filtered.filter(proj =>
        proj.technologies?.some(tech => tech.toLowerCase() === selectedTopic)
      );
    }

    // 3. Filter by featured (pinned) only
    if (featuredOnly) {
      filtered = filtered.filter(proj => proj.highlight === "PINNED");
    }

    // 4. Sort projects: Pinned items are always placed at the top first, then apply criteria
    return [...filtered].sort((a, b) => {
      const isAPinned = a.highlight === "PINNED";
      const isBPinned = b.highlight === "PINNED";

      // Pin priorities go first (only if we're not already filtering solely by featured)
      if (!featuredOnly) {
        if (isAPinned && !isBPinned) return -1;
        if (!isAPinned && isBPinned) return 1;
      }

      let compare = 0;
      if (sortBy === "updated") {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        compare = dateB - dateA; // Default: recent first (desc)
        return sortOrder === "desc" ? compare : -compare;
      } else {
        compare = a.project.localeCompare(b.project); // Default: A to Z (asc)
        return sortOrder === "asc" ? compare : -compare;
      }
    });
  }, [initialProjects, searchQuery, selectedTopic, sortBy, sortOrder, featuredOnly]);

  // Pagination bounds
  const totalPages = Math.max(1, Math.ceil(processedProjects.length / itemsPerPage));
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProjects, currentPage, itemsPerPage]);

  // Generate pagination layout: [first 2] .... [last 2] with current middle page
  const pageButtons = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always push first 2 pages
      pages.push(1, 2);

      // If current page is in the middle, render it in the center slot
      if (currentPage > 2 && currentPage < totalPages - 1) {
        if (currentPage > 3) pages.push("....");
        pages.push(currentPage);
        if (currentPage < totalPages - 2) pages.push("....");
      } else {
        pages.push("....");
      }

      // Always push last 2 pages
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Filters and Controls Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-border/40 p-4 rounded-xl bg-card/20 backdrop-blur-md shadow-sm">
        {/* Left Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Featured Toggle Button */}
          <Button
            variant={featuredOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setFeaturedOnly(prev => !prev)}
            className="h-8 text-xs rounded-lg border border-border"
          >
            Featured
          </Button>

          {/* Sort Buttons Group */}
          <div className="inline-flex rounded-lg border border-border p-0.5 shadow-sm">
            <Button
              variant={sortBy !== "name" ? "ghost" : undefined}
              size="sm"
              onClick={() => handleSortClick("name")}
              className="h-7 text-xs rounded-md px-3 gap-0.5"
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button
              variant={sortBy !== "updated" ? "ghost" : undefined}
              size="sm"
              onClick={() => handleSortClick("updated")}
              className="h-7 text-xs rounded-md px-3 gap-0.5"
            >
              Updated {sortBy === "updated" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </div>

          {/* Topics Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg gap-1 border border-border bg-card">
                <span className="capitalize">
                  {selectedTopic === "all" ? `All Topics (${initialProjects.length})` : `${selectedTopic} (${initialProjects.filter(p => p.technologies?.some(t => t.toLowerCase() === selectedTopic)).length})`}
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-card border border-border max-h-64 overflow-y-auto rounded-lg shadow-lg">
              <DropdownMenuRadioGroup
                value={selectedTopic}
                onValueChange={setSelectedTopic}
              >
                <DropdownMenuRadioItem
                  value="all"
                  className="text-xs cursor-pointer focus:bg-accent rounded"
                >
                  All Topics ({initialProjects.length})
                </DropdownMenuRadioItem>
                {allTopics.map(topic => {
                  const count = initialProjects.filter(p =>
                    p.technologies?.some(t => t.toLowerCase() === topic)
                  ).length;

                  return (
                    <DropdownMenuRadioItem
                      key={topic}
                      value={topic}
                      className="text-xs uppercase cursor-pointer focus:bg-accent rounded"
                    >
                      {topic} ({count})
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Search Input Group */}
        <div className="w-full sm:w-80">
          <label className="sr-only" htmlFor="project-search">
            Search projects
          </label>
          <div className="relative flex items-center bg-card border border-border rounded-lg shadow-sm hover:border-border/80 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 overflow-hidden h-8">
            <div className="pl-3 text-muted-foreground flex items-center">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects"
              className="w-full pl-2 bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground"
            />
            <div className="absolute right-3 text-[10px] text-muted-foreground font-medium select-none pointer-events-none bg-muted px-1.5 py-0.5 rounded border border-border/40">
              {processedProjects.length} results
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 font-sans">
          {/* Status text */}
          <span className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * itemsPerPage, processedProjects.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{processedProjects.length}</span> projects
          </span>

          {/* Page buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 h-8 w-8 flex items-center justify-center"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageButtons.map((page, index) => {
              if (page === "....") {
                return (
                  <span key={`ellipsis-${index}`} className="px-1.5 text-muted-foreground select-none text-xs font-semibold tracking-widest leading-8">
                    ....
                  </span>
                );
              }

              const pageNum = page as number;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${currentPage === pageNum
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 h-8 w-8 flex items-center justify-center"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

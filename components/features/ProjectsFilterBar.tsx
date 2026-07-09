"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: "name" | "updated";
  sortOrder: "asc" | "desc";
  onSortClick: (field: "name" | "updated") => void;
  featuredOnly: boolean;
  onFeaturedToggle: () => void;
  resultCount: number;
}

export default function ProjectsFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortClick,
  featuredOnly,
  onFeaturedToggle,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-border/40 p-4 rounded-xl bg-card/20 backdrop-blur-md shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={featuredOnly ? "default" : "outline"}
          size="sm"
          onClick={onFeaturedToggle}
          className="h-8 text-xs rounded-lg border border-border"
        >
          Featured
        </Button>

        <div className="inline-flex rounded-lg border border-border p-0.5 shadow-sm">
          <Button
            variant={sortBy !== "name" ? "ghost" : undefined}
            size="sm"
            onClick={() => onSortClick("name")}
            className="h-7 text-xs rounded-md px-3 gap-0.5"
          >
            Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant={sortBy !== "updated" ? "ghost" : undefined}
            size="sm"
            onClick={() => onSortClick("updated")}
            className="h-7 text-xs rounded-md px-3 gap-0.5"
          >
            Updated {sortBy === "updated" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

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
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects"
            className="w-full pl-2 bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute right-3 text-[10px] text-muted-foreground font-medium select-none pointer-events-none bg-muted px-1.5 py-0.5 rounded border border-border/40">
            {resultCount} results
          </div>
        </div>
      </div>
    </div>
  );
}

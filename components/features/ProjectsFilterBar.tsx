"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTopic: string;
  onTopicChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  sortBy: "name" | "updated";
  sortOrder: "asc" | "desc";
  onSortClick: (field: "name" | "updated") => void;
  featuredOnly: boolean;
  onFeaturedToggle: () => void;
  allTopics: string[];
  allLanguages: string[];
  topicCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  totalProjects: number;
  resultCount: number;
}

export default function ProjectsFilterBar({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  sortOrder,
  onSortClick,
  featuredOnly,
  onFeaturedToggle,
  allTopics,
  allLanguages,
  topicCounts,
  languageCounts,
  totalProjects,
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs rounded-lg gap-1 border border-border bg-card"
            >
              <span className="capitalize">
                {selectedTopic === "all"
                  ? `All Topics (${totalProjects})`
                  : `${selectedTopic} (${topicCounts[selectedTopic] || 0})`}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 bg-card border border-border max-h-64 overflow-y-auto rounded-lg shadow-lg"
          >
            <DropdownMenuRadioGroup
              value={selectedTopic}
              onValueChange={onTopicChange}
            >
              <DropdownMenuRadioItem
                value="all"
                className="text-xs cursor-pointer focus:bg-accent rounded"
              >
                All Topics ({totalProjects})
              </DropdownMenuRadioItem>
              {allTopics.map((topic) => (
                <DropdownMenuRadioItem
                  key={topic}
                  value={topic}
                  className="text-xs uppercase cursor-pointer focus:bg-accent rounded"
                >
                  {topic} ({topicCounts[topic] || 0})
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs rounded-lg gap-1 border border-border bg-card"
            >
              <span className="capitalize">
                {selectedLanguage === "all"
                  ? `All Languages (${totalProjects})`
                  : `${selectedLanguage} (${languageCounts[selectedLanguage] || 0})`}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 bg-card border border-border max-h-64 overflow-y-auto rounded-lg shadow-lg"
          >
            <DropdownMenuRadioGroup
              value={selectedLanguage}
              onValueChange={onLanguageChange}
            >
              <DropdownMenuRadioItem
                value="all"
                className="text-xs cursor-pointer focus:bg-accent rounded"
              >
                All Languages ({totalProjects})
              </DropdownMenuRadioItem>
              {allLanguages.map((lang) => (
                <DropdownMenuRadioItem
                  key={lang}
                  value={lang}
                  className="text-xs cursor-pointer focus:bg-accent rounded"
                >
                  {lang} ({languageCounts[lang] || 0})
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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

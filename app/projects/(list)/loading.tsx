import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsListLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Search & Sort Panel Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-border/40 p-4 rounded-xl bg-card/20 backdrop-blur-md shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Featured Button skeleton */}
          <Skeleton className="h-8 w-20 rounded-lg bg-muted" />
          {/* Sort Buttons skeleton */}
          <Skeleton className="h-8 w-36 rounded-lg bg-muted" />
          {/* Topic Dropdown skeleton */}
          <Skeleton className="h-8 w-28 rounded-lg bg-muted" />
        </div>
        {/* Search skeleton */}
        <Skeleton className="h-8 w-full sm:w-80 rounded-lg bg-muted" />
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-[280px] border border-border/60 rounded-xl p-6 bg-card/40 space-y-4"
          >
            {/* Header: Title and Stats */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-36 rounded bg-muted" />
              <Skeleton className="h-4 w-12 rounded bg-muted" />
            </div>

            {/* Description lines */}
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full rounded bg-muted" />
              <Skeleton className="h-4 w-5/6 rounded bg-muted" />
              <Skeleton className="h-4 w-2/3 rounded bg-muted" />
            </div>

            {/* Badges row */}
            <div className="flex gap-1.5 flex-wrap">
              <Skeleton className="h-5 w-14 rounded bg-muted" />
              <Skeleton className="h-5 w-16 rounded bg-muted" />
              <Skeleton className="h-5 w-12 rounded bg-muted" />
            </div>

            {/* Metadata row */}
            <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-auto">
              <Skeleton className="h-3 w-16 rounded bg-muted" />
              <Skeleton className="h-3 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

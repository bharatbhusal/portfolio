"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function ProjectsPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const pageButtons = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2);

      if (currentPage > 2 && currentPage < totalPages - 1) {
        if (currentPage > 3) pages.push("....");
        pages.push(currentPage);
        if (currentPage < totalPages - 2) pages.push("....");
      } else {
        pages.push("....");
      }

      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 font-sans">
      <span className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-foreground">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {totalItems}
        </span>{" "}
        projects
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 h-8 w-8 flex items-center justify-center"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageButtons.map((page, index) => {
          if (page === "....") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1.5 text-muted-foreground select-none text-xs font-semibold tracking-widest leading-8"
              >
                ....
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                currentPage === pageNum
                  ? "bg-primary border-primary text-primary-foreground shadow-sm"
                  : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 h-8 w-8 flex items-center justify-center"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { FileText, ArrowRight, Download } from "lucide-react";
import { ResumePDFLink } from "./ResumePDF";
import type { ResumeDocument } from "@/types/resume";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  resume: Pick<ResumeDocument, "_id" | "createdAt" | "basics">;
  isActive?: boolean;
  onSelect?: (id: string) => void;
}

export default function ResumeCard({ resume, isActive, onSelect }: ResumeCardProps) {
  const date = new Date(resume.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = new Date(resume.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => onSelect?.(String(resume._id))}
      className={cn(
        "group border rounded-xl p-5 bg-card hover:shadow-md transition-all duration-200 flex flex-col gap-3 cursor-pointer",
        isActive && "border-primary bg-primary/5 shadow-md",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center min-w-0">
          <FileText className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
          <span className="text-sm font-medium">Generated on</span>
          <p className={cn("text-xs shrink-0", isActive ? "text-primary" : "text-muted-foreground")}>
            {date} {time}
          </p>
        </div>
        <ResumePDFLink data={null} minimal id={String(resume._id)} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{resume.basics.summary}</p>

      <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
        {isActive ? "Currently viewing" : "Click to view"}
        <ArrowRight className={cn("h-3.5 w-3.5 transition-transform", isActive && "translate-x-0.5")} />
      </div>
    </div>
  );
}

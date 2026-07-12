"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { ResumeDocument } from "@/types/resume";

interface ResumeCardProps {
  resume: Pick<ResumeDocument, "_id" | "createdAt" | "basics">;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
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
    <div className="group border rounded-xl p-5 bg-card hover:shadow-md transition-all duration-200 flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <FileText className="h-4 w-4 text-primary" />
        <span>Generated on</span>
        <p className="text-xs text-primary">
          {date} {time}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">{resume.basics.summary}</p>

      <Link
        href={`/resume/${resume._id}`}
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        View Full Resume
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

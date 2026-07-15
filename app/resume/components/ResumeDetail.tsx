"use client";

import ResumePreview from "./ResumePreview";
import { ResumePDFLink } from "./ResumePDF";
import type { ResumeData } from "@/types/resume";

export default function ResumeDetail({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <div id="resume-preview">
        <ResumePreview data={data} />
      </div>
      <div className="flex justify-center">
        <ResumePDFLink data={data} />
      </div>
    </div>
  );
}

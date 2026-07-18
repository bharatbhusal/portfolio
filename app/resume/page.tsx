import type { Metadata } from "next";
import ResumePageClient from "@/components/features/resume/ResumePageClient";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume and career summary",
};

export default function ResumePage() {
  return <ResumePageClient />;
}

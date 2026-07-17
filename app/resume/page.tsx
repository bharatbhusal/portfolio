import React from "react";
import type { Metadata } from "next";
import ResumePageClient from "./components/ResumePageClient";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume and career summary",
};

export default function ResumePage() {
  return <ResumePageClient />;
}

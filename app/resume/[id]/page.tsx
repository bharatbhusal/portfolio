import { notFound } from "next/navigation";
import Resume from "@/models/resume";
import ResumeDetail from "../components/ResumeDetail";
import type { Metadata } from "next";
import type { ResumeData } from "@/types/resume";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = await Resume.findById(id, { role: 1, createdAt: 1 }).lean();
  if (!doc) return { title: "Resume Not Found" };
  const date = new Date(doc.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { title: `${doc.role} Resume — ${date}` };
}

export default async function ResumeDetailPage({ params }: Props) {
  const { id } = await params;
  const doc = await Resume.findById(id).lean();
  if (!doc) notFound();

  const resume: ResumeData = {
    basics: doc.basics as ResumeData["basics"],
    work: doc.work as ResumeData["work"],
    education: doc.education as ResumeData["education"],
    skills: doc.skills as ResumeData["skills"],
    projects: doc.projects as ResumeData["projects"],
  };

  return <ResumeDetail data={resume} />;
}

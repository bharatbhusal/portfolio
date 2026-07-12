import { notFound } from "next/navigation";
import { getResumesCollection } from "@/lib/mongodb";
import { ResumeDetail } from "@/components/resume";
import { ObjectId } from "mongodb";
import type { Metadata } from "next";
import type { ResumeData } from "@/types/resume";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return { title: "Resume Not Found" };
  const col = await getResumesCollection();
  const doc = await col.findOne(
    { _id: new ObjectId(id) },
    { projection: { role: 1, createdAt: 1 } },
  );
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
  if (!ObjectId.isValid(id)) notFound();

  const col = await getResumesCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  const resume: ResumeData = {
    basics: doc.basics,
    work: doc.work,
    education: doc.education,
    skills: doc.skills,
    projects: doc.projects,
  };

  return <ResumeDetail data={resume} />;
}

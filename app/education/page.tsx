import React from "react";
import { Metadata } from "next";
import { prefetchEducation } from "@/lib/hydration";
import EducationPageClient from "./components/EducationPageClient";

export const metadata: Metadata = {
  title: "Education",
  description: "Educational background, university degrees, and academic history.",
};

export default async function EducationPage() {
  const docs = await prefetchEducation();

  const data = docs.map((doc) => ({
    ...doc,
    _id: String(doc._id),
    createdAt: undefined,
    updatedAt: undefined,
  }));

  return <EducationPageClient initialData={data} />;
}

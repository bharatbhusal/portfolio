import React from "react";
import { Metadata } from "next";
import { prefetchCareer } from "@/lib/hydration";
import CareerPageClient from "./components/CareerPageClient";

export const metadata: Metadata = {
  title: "Career",
  description: "Professional experience and software engineering career history.",
};

export default async function CareerPage() {
  const docs = await prefetchCareer();

  const data = docs.map((doc) => ({
    ...doc,
    _id: String(doc._id),
    createdAt: undefined,
    updatedAt: undefined,
  }));

  return <CareerPageClient initialData={data} />;
}

import React from "react";
import educationData from "@/data/educationData";
import EducationCard from "./components/EducationCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
  description: "Educational background, university degrees, and academic history.",
};

export default function EducationPage() {
  const sortedEducation = [...educationData].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const cleanEducation = sortedEducation.map(item => ({
    ...item,
    links: item.links.map(link => ({
      link: link.link,
      type: link.type
    }))
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cleanEducation.map((item) => (
          <EducationCard key={item.institution} {...item} />
        ))}
      </div>
    </div>
  );
}

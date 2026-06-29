import React from "react";
import careerData from "@/data/careerData";
import { CareerCard } from "@/components/cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career",
  description: "Professional experience and software engineering career history.",
};

export default function CareerPage() {
  const sortedCareer = [...careerData].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const cleanCareer = sortedCareer.map(item => ({
    ...item,
    links: item.links.map(link => ({
      link: link.link,
      type: link.type
    }))
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cleanCareer.map((item) => (
          <CareerCard key={item.company} {...item} />
        ))}
      </div>
    </div>
  );
}

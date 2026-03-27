"use client";
import CareerCard from "@/components/cards/CareerCard";
import careerData from "@/data/careerData";
import { useMemo } from "react";

const Career = () => {
  // Sort career: highlighted first, then rest
  const sortedCareer = useMemo(() => {
    return [...careerData].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen py-8 z-0 overflow-y-auto space-y-8">
      {/* Header */}
      <div className="space-y-2 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-4xl font-bold">Career</h1>
        <p className="text-muted-foreground text-sm">My professional journey</p>
      </div>

      {/* Grid Layout: 1 column (sm), 2 columns (md), 3 columns (lg+) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-8">
        {sortedCareer.map((item) => (
          <CareerCard key={item.company} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Career;

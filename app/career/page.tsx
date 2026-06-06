"use client";

import React, { useMemo } from "react";

import careerData from "@/data/careerData";
import { CareerCard } from "@/components/cards";

const Career = () => {
  const sortedCareer = useMemo(() => {
    return [...careerData].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedCareer.map((item) => (
          <CareerCard key={item.company} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Career;

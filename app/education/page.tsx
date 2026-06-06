"use client";

import React, { useMemo } from "react";

import educationData from "@/data/educationData";
import { EducationCard } from "@/components/cards";

const Education = () => {
  const sortedEducation = useMemo(() => {
    return [...educationData].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedEducation.map((item) => (
          <EducationCard key={item.institution} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Education;

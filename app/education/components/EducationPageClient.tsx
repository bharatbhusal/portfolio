"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setEducationData } from "@/store/education-slice";
import EducationCard from "./EducationCard";
import type { EducationItem } from "@/types";

type Item = EducationItem & { _id: string };

export default function EducationPageClient({
  initialData,
}: {
  initialData: Item[];
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setEducationData(initialData));
  }, [dispatch, initialData]);

  const sorted = [...initialData].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const cleanEducation = sorted.map((item) => ({
    ...item,
    links: item.links.map((link) => ({
      link: link.link,
      type: link.type,
    })),
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cleanEducation.map((item) => (
          <EducationCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

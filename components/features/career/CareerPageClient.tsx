"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCareerData } from "@/store/career-slice";
import CareerCard from "./CareerCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { CareerItem } from "@/types";

type Item = CareerItem & { _id: string };

export default function CareerPageClient({
  initialData,
}: {
  initialData: Item[];
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCareerData(initialData));
  }, [dispatch, initialData]);

  if (initialData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <EmptyState
          title="No career entries yet"
          description="Work experience will appear here once added from the admin dashboard."
          action={{
            label: "Add Career Entry",
            onClick: () => (window.location.href = "/admin/career"),
          }}
        />
      </div>
    );
  }

  const sorted = [...initialData].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const cleanCareer = sorted.map((item) => ({
    ...item,
    links: item.links.map((link) => ({
      link: link.link,
      type: link.type,
    })),
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cleanCareer.map((item) => (
          <CareerCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

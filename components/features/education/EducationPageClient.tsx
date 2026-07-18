"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setEducationData } from "@/store/education-slice";
import EducationCard from "./EducationCard";
import { EmptyState } from "@/components/shared/EmptyState";
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

  if (initialData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <EmptyState
          title="No education entries yet"
          description="Educational background will appear here once added from the admin dashboard."
          action={{
            label: "Add Education Entry",
            onClick: () => (window.location.href = "/admin/education"),
          }}
        />
      </div>
    );
  }

  const cleanEducation = initialData.map((item) => ({
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

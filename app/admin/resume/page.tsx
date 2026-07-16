"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchResumes } from "@/store/resume-slice";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export default function ResumePage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.resume,
  );

  useEffect(() => {
    dispatch(fetchResumes({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <PageHeader title="Resume" subtitle="View generated resumes" />

      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : data.length === 0 ? (
        <EmptyState
          title="No resumes yet"
          description="Generate your first resume from the resume builder page"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((resume) => (
            <Link
              key={resume._id}
              href={`/resume/${resume._id}`}
              className="p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <h3 className="font-medium">{resume.role}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

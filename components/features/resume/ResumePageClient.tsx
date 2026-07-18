"use client";

import { useState, useEffect, useRef } from "react";
import ResumePreview from "./ResumePreview";
import ResumeHistory, { type ResumeHistoryData } from "./ResumeHistory";
import { ResumeSkeleton } from "@/components/skeletons/ResumeSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ResumeData, ResumeDocument } from "@/types/resume";

export default function ResumePageClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<ResumeHistoryData | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const fetchResumeById = (id: string) => {
    setLoading(true);
    fetch(`/api/resume/${id}`)
      .then((r) => r.json())
      .then((json: { success: boolean; data: ResumeDocument }) => {
        if (json.success) {
          const doc = json.data;
          setResume({
            basics: doc.basics,
            work: doc.work,
            education: doc.education,
            skills: doc.skills,
            projects: doc.projects,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  function fetchHistory(page: number) {
    setHistoryLoading(true);
    fetch(`/api/resume/history?page=${page}&limit=4`)
      .then((r) => r.json())
      .then(
        (json: {
          success: boolean;
          data: ResumeHistoryData["docs"];
          total: number;
          page: number;
          pages: number;
        }) => {
          setHistory({
            docs: json.data,
            total: json.total,
            page: json.page,
            pages: json.pages,
          });
          setHistoryPage(json.page);
          if (!selectedId && json.data.length > 0) {
            setSelectedId(String(json.data[0]._id));
            fetchResumeById(String(json.data[0]._id));
          }
        },
      )
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }

  const handleSelect = (id: string) => {
    setSelectedId(id);
    fetchResumeById(id);
    if (window.innerWidth < 1024 && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const hasNoResumes = !historyLoading && history && history.docs.length === 0;
  if (hasNoResumes) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <EmptyState
          title="No resume yet"
          description="Generate your first resume from the admin dashboard."
          action={{
            label: "Request Resume Generation",
            onClick: () => (window.location.href = "/admin/resume"),
          }}
        />
      </div>
    );
  }

  if (loading || historyLoading) {
    return <ResumeSkeleton />;
  }

  if (!resume) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <EmptyState
          title="No resume yet"
          description="Generate your first resume from the admin dashboard."
          action={{
            label: "Request Resume Generation",
            onClick: () => (window.location.href = "/admin/resume"),
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left: Resume preview */}
        <div ref={previewRef} className="lg:sticky lg:top-24 lg:self-start">
          <div id="resume-preview">
            <ResumePreview data={resume} />
          </div>
        </div>

        {/* Right: History */}
        <ResumeHistory
          history={history}
          historyLoading={historyLoading}
          selectedId={selectedId}
          onSelect={handleSelect}
          onPageChange={fetchHistory}
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ResumePreview from "./ResumePreview";
import { ResumePDFLink } from "./ResumePDF";
import ResumeCard from "./ResumeCard";
import { ResumeSkeleton } from "@/components/skeletons/ResumeSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ResumeData, ResumeDocument } from "@/types/resume";

interface HistoryPage {
  docs: Pick<ResumeDocument, "_id" | "createdAt" | "basics">[];
  total: number;
  page: number;
  pages: number;
}

export default function ResumePageClient() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryPage | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetch("/api/resume/latest")
      .then((r) => r.json())
      .then((json: { success: boolean; data: ResumeDocument | null }) => {
        const doc = json.data;
        if (doc) {
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

    fetchHistory(1);
  }, []);

  function fetchHistory(page: number) {
    setHistoryLoading(true);
    fetch(`/api/resume/history?page=${page}&limit=6`)
      .then((r) => r.json())
      .then((json: { success: boolean; data: HistoryPage["docs"]; total: number; page: number; pages: number }) => {
        setHistory({ docs: json.data, total: json.total, page: json.page, pages: json.pages });
        setHistoryPage(json.page);
      })
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }

  if (loading) {
    return <ResumeSkeleton />;
  }

  if (!resume) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <EmptyState
          title="No resume yet"
          description="Generate your first resume from the admin dashboard."
          action={{
            label: "Go to Admin",
            onClick: () => (window.location.href = "/admin/resume"),
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left: Resume preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div id="resume-preview">
            <ResumePreview data={resume} />
          </div>
          <div className="flex justify-center mt-4">
            <ResumePDFLink data={resume} />
          </div>
        </div>

        {/* Right: History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Resume History</h2>
          {historyLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : history && history.docs.length > 0 ? (
            <>
              <div className="space-y-3">
                {history.docs.map((doc) => (
                  <ResumeCard key={String(doc._id)} resume={doc} />
                ))}
              </div>
              {history.pages > 1 && (
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                    disabled={historyPage <= 1}
                    onClick={() => fetchHistory(historyPage - 1)}
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-3 text-sm text-muted-foreground">
                    {historyPage} / {history.pages}
                  </span>
                  <button
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                    disabled={historyPage >= history.pages}
                    onClick={() => fetchHistory(historyPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumePreview from "./components/ResumePreview";
import { ResumePDFLink } from "./components/ResumePDF";
import ResumeCard from "./components/ResumeCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ResumeData, ResumeDocument } from "@/types/resume";

interface HistoryPage {
  docs: Pick<ResumeDocument, "_id" | "createdAt" | "basics">[];
  total: number;
  page: number;
  pages: number;
}

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryPage | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetch("/api/resume/latest")
      .then((r) => r.json())
      .then((doc: ResumeDocument | null) => {
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
      .then((d: HistoryPage) => {
        setHistory(d);
        setHistoryPage(page);
      })
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
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
    <div className="max-w-5xl mx-auto space-y-8">
      <div id="resume-preview">
        <ResumePreview data={resume} />
      </div>

      <div className="flex justify-center">
        <ResumePDFLink data={resume} />
      </div>

      {history && history.docs.length > 0 && (
        <div className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Resume History
          </h2>
          {historyLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.docs.map((doc) => (
                <ResumeCard key={String(doc._id)} resume={doc} />
              ))}
            </div>
          )}

          {history.pages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={historyPage <= 1}
                onClick={() => fetchHistory(historyPage - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-3 text-sm text-muted-foreground">
                {historyPage} / {history.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={historyPage >= history.pages}
                onClick={() => fetchHistory(historyPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

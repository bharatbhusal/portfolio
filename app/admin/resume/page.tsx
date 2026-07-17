"use client";

import { useState, useCallback, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import ResumePreview from "@/app/resume/components/ResumePreview";
import ResumeCard from "@/app/resume/components/ResumeCard";
import type { ResumeData, ResumeDocument } from "@/types/resume";

const LATEST_TS_KEY = "resume_latest_ts";
const USER_TS_KEY = "resume_user_ts";
const SERVICE_WINDOW_MS = 2 * 60 * 60_000;
const USER_WINDOW_MS = 10 * 60_000;

interface HistoryPage {
  docs: Pick<ResumeDocument, "_id" | "createdAt" | "basics">[];
  total: number;
  page: number;
  pages: number;
}

function getCooldown(): number {
  const now = Date.now();
  const latest = parseInt(localStorage.getItem(LATEST_TS_KEY) || "0", 10);
  const user = parseInt(localStorage.getItem(USER_TS_KEY) || "0", 10);
  const serviceRemaining = latest
    ? Math.max(0, SERVICE_WINDOW_MS - (now - latest))
    : 0;
  const userRemaining = user ? Math.max(0, USER_WINDOW_MS - (now - user)) : 0;
  return Math.max(serviceRemaining, userRemaining);
}

function formatTimer(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [history, setHistory] = useState<HistoryPage | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);
  const { addNotification } = useNotifications();

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
          localStorage.setItem(
            LATEST_TS_KEY,
            new Date(doc.createdAt).getTime().toString(),
          );
        }
      })
      .catch(() => {});

    fetchHistory(1);

    const tick = () => setCooldown(getCooldown());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  function fetchHistory(page: number, bustCache = false) {
    setHistoryLoading(true);
    const ts = bustCache ? `&t=${Date.now()}` : "";
    fetch(`/api/resume/history?page=${page}&limit=6${ts}`)
      .then((r) => r.json())
      .then(
        (json: {
          success: boolean;
          data: HistoryPage["docs"];
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
        },
      )
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }

  const generate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "Software Engineer" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }
      const json = await res.json();
      const doc = json.data;
      setResume({
        basics: doc.basics,
        work: doc.work,
        education: doc.education,
        skills: doc.skills,
        projects: doc.projects,
      });
      const now = Date.now().toString();
      localStorage.setItem(LATEST_TS_KEY, now);
      localStorage.setItem(USER_TS_KEY, now);
      setCooldown(getCooldown());
      fetchHistory(1, true);
      addNotification({ type: "success", title: "Resume generated" });
    } catch (err) {
      addNotification({
        type: "error",
        title: "Generation failed",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  const disabled = loading || cooldown > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Versions"
        subtitle="Preview and manage your generated resume versions"
        action={{
          label: loading
            ? "Generating..."
            : cooldown > 0
              ? `Generate in ${formatTimer(cooldown)}`
              : "Generate New",
          onClick: generate,
          icon: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left: Resume preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {resume && (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
                  <p className="text-sm font-medium">Generating new resume...</p>
                </div>
              )}
              <div className={loading ? "pointer-events-none" : ""}>
                <ResumePreview data={resume} />
              </div>
            </div>
          )}

          {!resume && !loading && (
            <EmptyState
              title="No resumes yet"
              description="Click 'Generate New' to create your first resume."
            />
          )}
        </div>

        {/* Right: History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">History</h2>
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
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

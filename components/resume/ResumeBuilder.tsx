"use client";

import { useState, useCallback, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumePreview from "./ResumePreview";
import ResumeCard from "./ResumeCard";
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
  if (h > 0) return `${h} hours, ${String(m).padStart(2, "0")} minutes`;
  return m > 0
    ? `${m} minutes, ${String(s).padStart(2, "0")} seconds`
    : `${s} seconds`;
}

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [history, setHistory] = useState<HistoryPage | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetch("/api/resume/latest")
      .then((r) => r.json())
      .then((doc: ResumeDocument | null) => {
        if (doc) {
          setResume(doc);
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

  function fetchHistory(page: number) {
    setHistoryLoading(true);
    fetch(`/api/resume/history?page=${page}&limit=6`)
      .then((r) => r.json())
      .then((d: HistoryPage) => {
        setHistory(d);
        setHistoryPage(page);
        setHistoryLoading(false);
      })
      .catch(() => setHistoryLoading(false));
  }

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);

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
      const doc = await res.json();
      setResume(doc);
      const now = Date.now().toString();
      localStorage.setItem(LATEST_TS_KEY, now);
      localStorage.setItem(USER_TS_KEY, now);
      setCooldown(getCooldown());
      fetchHistory(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const disabled = loading || cooldown > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Preview with overlay */}
      {resume && (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
              <p className="text-sm font-medium text-foreground">
                Generating new resume...
              </p>
            </div>
          )}
          <div
            id="resume-preview"
            className={loading ? "pointer-events-none" : ""}
          >
            <ResumePreview data={resume} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col items-center gap-2">
        <Button onClick={generate} disabled={disabled}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading
            ? "Generating..."
            : cooldown > 0
              ? `Generate New Resume in ${formatTimer(cooldown)}`
              : "Generate New Resume"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* History */}
      {history && history.docs.length > 0 && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Previously Generated Resumes
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
          </div>

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

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Loader2, Plus, Download } from "lucide-react";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import ResumePreview from "@/components/features/resume/ResumePreview";
import ResumeHistory, { type ResumeHistoryData } from "@/components/features/resume/ResumeHistory";
import { ResumePDFLink } from "@/components/features/resume/ResumePDF";
import type { ResumeData, ResumeDocument } from "@/types/resume";

const SERVICE_COOLDOWN_KEY = "resume_service_cooldown";
const USER_COOLDOWN_KEY = "resume_user_cooldown";
const LAST_GEN_KEY = "resume_last_gen";

interface CooldownInfo {
  service: number;
  user: number;
}

function getCooldown(): number {
  const now = Date.now();
  const last = parseInt(localStorage.getItem(LAST_GEN_KEY) || "0", 10);
  if (!last) return 0;
  const service = parseInt(
    localStorage.getItem(SERVICE_COOLDOWN_KEY) || "0",
    10,
  );
  const user = parseInt(localStorage.getItem(USER_COOLDOWN_KEY) || "0", 10);
  return Math.max(service - (now - last), user - (now - last), 0);
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [history, setHistory] = useState<ResumeHistoryData | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const { addNotification } = useNotifications();
  const previewRef = useRef<HTMLDivElement>(null);

  const fetchResumeById = useCallback((id: string) => {
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
  }, []);

  useEffect(() => {
    setCooldown(getCooldown());
    const tick = () => setCooldown(getCooldown());
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchHistory(1);
  }, []);

  function fetchHistory(page: number, bustCache = false) {
    setHistoryLoading(true);
    const ts = bustCache ? `&t=${Date.now()}` : "";
    fetch(`/api/resume/history?page=${page}&limit=4${ts}`)
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
      setSelectedId(String(doc._id));
      const now = Date.now();
      localStorage.setItem(LAST_GEN_KEY, now.toString());
      const cd: CooldownInfo = json.cooldown || { service: 0, user: 0 };
      localStorage.setItem(SERVICE_COOLDOWN_KEY, cd.service.toString());
      localStorage.setItem(USER_COOLDOWN_KEY, cd.user.toString());
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
          disabled,
          icon: loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          ),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left: Resume preview */}
        <div ref={previewRef} className="lg:sticky lg:top-24 lg:self-start">
          {resume && (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
                  <p className="text-sm font-medium">
                    Generating new resume...
                  </p>
                </div>
              )}
              <div className={loading ? "pointer-events-none" : ""}>
                <ResumePreview data={resume} />
                <ResumePDFLink
                  data={resume}
                  fileName={`${resume.basics.name.replace(/\s+/g, "_")}_Resume.pdf`}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {({ loading: pdfLoading }) => (
                    <>
                      <Download className="h-4 w-4" />
                      {pdfLoading ? "Generating PDF..." : "Download PDF"}
                    </>
                  )}
                </ResumePDFLink>
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
        <ResumeHistory
          history={history}
          historyLoading={historyLoading}
          selectedId={selectedId}
          onSelect={handleSelect}
          onPageChange={(page) => fetchHistory(page, true)}
        />
      </div>
    </div>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeCard from "./ResumeCard";
import type { ResumeDocument } from "@/types/resume";

export interface ResumeHistoryData {
  docs: Pick<ResumeDocument, "_id" | "createdAt" | "basics">[];
  total: number;
  page: number;
  pages: number;
}

interface ResumeHistoryProps {
  history: ResumeHistoryData | null;
  historyLoading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onPageChange: (page: number) => void;
}

export default function ResumeHistory({
  history,
  historyLoading,
  selectedId,
  onSelect,
  onPageChange,
}: ResumeHistoryProps) {
  return (
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
              <ResumeCard
                key={String(doc._id)}
                resume={doc}
                isActive={selectedId === String(doc._id)}
                onSelect={onSelect}
              />
            ))}
          </div>
          {history.pages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={history.page <= 1}
                onClick={() => onPageChange(history.page - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-3 text-sm text-muted-foreground">
                {history.page} / {history.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={history.page >= history.pages}
                onClick={() => onPageChange(history.page + 1)}
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
  );
}

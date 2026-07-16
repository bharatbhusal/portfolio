import { Skeleton } from "@/components/ui/skeleton";

export function ResumeHistorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

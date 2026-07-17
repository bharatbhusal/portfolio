import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50"
          >
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

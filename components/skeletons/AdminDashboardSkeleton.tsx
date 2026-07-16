import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardSkeleton() {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r border-border p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <div className="flex-1 p-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function EducationCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

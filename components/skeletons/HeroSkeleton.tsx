import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <Skeleton className="w-64 h-64 rounded-full" />
      <Skeleton className="h-10 w-80" />
      <Skeleton className="h-6 w-60" />
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-10 h-10 rounded-full" />
        ))}
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}

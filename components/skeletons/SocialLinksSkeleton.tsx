import { Skeleton } from "@/components/ui/skeleton";

export function SocialLinksSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  );
}

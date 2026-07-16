import { Skeleton } from "@/components/ui/skeleton";

export function ResumeSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    </div>
  );
}

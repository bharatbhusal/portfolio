import { Skeleton } from "@/components/ui/skeleton";

export function ResumeSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Side-by-side layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left: A4 resume preview skeleton */}
        <div className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[210/297] w-full max-w-[800px] mx-auto">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <Skeleton className="h-8 w-48 bg-gray-200" />
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                  <Skeleton className="h-3 w-28 bg-gray-200" />
                  <Skeleton className="h-3 w-36 bg-gray-200" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mt-3 bg-gray-200" />
              <Skeleton className="h-3 w-3/4 mt-1 bg-gray-200" />
            </div>

            {/* Skills */}
            <div className="px-8 py-4 border-b border-gray-200">
              <Skeleton className="h-3 w-16 bg-gray-200 mb-2" />
              <Skeleton className="h-3 w-full bg-gray-200" />
              <Skeleton className="h-3 w-5/6 bg-gray-200 mt-1" />
            </div>

            {/* Experience */}
            <div className="px-8 py-4 border-b border-gray-200">
              <Skeleton className="h-3 w-24 bg-gray-200 mb-3" />
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-40 bg-gray-200" />
                    <Skeleton className="h-3 w-28 bg-gray-200" />
                  </div>
                  <Skeleton className="h-3 w-32 bg-gray-200 mt-1" />
                  <Skeleton className="h-3 w-full bg-gray-200 mt-2" />
                  <Skeleton className="h-3 w-5/6 bg-gray-200 mt-1" />
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="px-8 py-4 border-b border-gray-200">
              <Skeleton className="h-3 w-20 bg-gray-200 mb-3" />
              <div className="space-y-3">
                <Skeleton className="h-3 w-32 bg-gray-200" />
                <Skeleton className="h-3 w-full bg-gray-200 mt-1" />
                <Skeleton className="h-3 w-4/5 bg-gray-200 mt-1" />
              </div>
            </div>

            {/* Education */}
            <div className="px-8 py-4">
              <Skeleton className="h-3 w-20 bg-gray-200 mb-3" />
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-36 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>
                  <Skeleton className="h-3 w-40 bg-gray-200 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: History skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function ResumeSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Resume preview skeleton — mimics the white document card */}
      <div className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg">
        {/* Header section */}
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

        {/* Skills section */}
        <div className="px-8 py-4 border-b border-gray-200">
          <Skeleton className="h-3 w-16 bg-gray-200 mb-2" />
          <Skeleton className="h-3 w-full bg-gray-200" />
          <Skeleton className="h-3 w-5/6 bg-gray-200 mt-1" />
        </div>

        {/* Experience section */}
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
      </div>

      {/* PDF download button skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      {/* History section skeleton */}
      <div className="space-y-4 border-t pt-8">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

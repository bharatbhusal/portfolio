import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left/Main Column - Readme Skeleton (3/4 width) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="border border-border/60 rounded-xl p-6 sm:p-8 bg-card/50 backdrop-blur-md space-y-6">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            
            <div className="space-y-3 pt-6 border-t border-border/40">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-3 pt-6 border-t border-border/40">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Metadata Skeleton (1/4 width) */}
        <div className="space-y-6">
          <div className="border border-border/60 rounded-xl p-6 bg-card/50 backdrop-blur-md space-y-6">
            <Skeleton className="h-6 w-1/2" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3">
              <Skeleton className="h-10 w-full rounded-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

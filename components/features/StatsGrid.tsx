"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

const StatsGrid = ({ stats, className }: StatsGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto",
        className
      )}
    >
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-1">
              {stat.label}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;

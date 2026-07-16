import { EducationCardSkeleton } from "@/components/skeletons/EducationCardSkeleton";

export default function EducationLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <EducationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

import { CareerCardSkeleton } from "@/components/skeletons/CareerCardSkeleton";

export default function CareerLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CareerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

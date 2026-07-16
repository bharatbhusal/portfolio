import { ResumeSkeleton } from "@/components/skeletons/ResumeSkeleton";

export default function ResumeLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ResumeSkeleton />
    </div>
  );
}

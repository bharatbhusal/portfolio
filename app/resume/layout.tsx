export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Resume Builder
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Generate an ATS-optimized resume tailored to your experience.
        </p>
      </div>
      {children}
    </div>
  );
}

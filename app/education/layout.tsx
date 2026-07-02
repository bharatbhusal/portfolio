export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Education
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Academic background and qualifications
        </p>
      </div>
      {children}
    </div>
  );
}

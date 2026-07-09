import React from "react";

interface DetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ repoName: string }>;
}

export default async function ProjectDetailLayout({
  children,
}: DetailLayoutProps) {
  return <div className="min-h-screen py-24 px-4 sm:px-6">{children}</div>;
}

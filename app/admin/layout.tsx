"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-16 flex">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

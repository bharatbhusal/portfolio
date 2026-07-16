"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPersonalInfo } from "@/store/personal-info-slice";
import { fetchEducation } from "@/store/education-slice";
import { fetchCareer } from "@/store/career-slice";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  User,
  Share2,
  GraduationCap,
  Briefcase,
  FileText,
  Image,
} from "lucide-react";

const stats = [
  { label: "Personal Info", icon: User, href: "/admin/personal" },
  { label: "Social Links", icon: Share2, href: "/admin/social-links" },
  { label: "Education", icon: GraduationCap, href: "/admin/education" },
  { label: "Career", icon: Briefcase, href: "/admin/career" },
  { label: "Resume", icon: FileText, href: "/admin/resume" },
  { label: "Image", icon: Image, href: "/admin/image" },
];

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.persistedReducer.education.data);
  const career = useAppSelector((state) => state.persistedReducer.career.data);

  useEffect(() => {
    dispatch(fetchEducation());
    dispatch(fetchCareer());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" subtitle="Manage your portfolio" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
          >
            <stat.icon className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">{stat.label}</p>
              <p className="text-sm text-muted-foreground">Manage</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Education Entries</p>
          <p className="text-2xl font-bold">{education.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-sm text-muted-foreground">Career Entries</p>
          <p className="text-2xl font-bold">{career.length}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  User,
  Share2,
  GraduationCap,
  Briefcase,
  FileText,
  Image,
  Github,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEducation } from "@/store/education-slice";
import { fetchCareer } from "@/store/career-slice";
import { fetchSocialLinks } from "@/store/social-links-slice";

const sections = [
  {
    href: "/admin/personal",
    label: "Personal Info",
    description: "Name, email, title, bio, and keywords",
    icon: User,
  },
  {
    href: "/admin/social-links",
    label: "Social Links",
    description: "GitHub, Twitter, Telegram, and more",
    icon: Share2,
  },
  {
    href: "/admin/education",
    label: "Education",
    description: "Universities, degrees, and courses",
    icon: GraduationCap,
  },
  {
    href: "/admin/career",
    label: "Career",
    description: "Work experience and achievements",
    icon: Briefcase,
  },
  {
    href: "/admin/resume",
    label: "Resume",
    description: "Generate and manage resumes",
    icon: FileText,
  },
  {
    href: "/admin/image",
    label: "Profile Image",
    description: "Upload and manage your photo",
    icon: Image,
  },
  {
    href: "/admin/github",
    label: "GitHub Settings",
    description: "Username and API token for projects",
    icon: Github,
  },
];

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const educationCount = useAppSelector(
    (state) => state.persistedReducer.education.data.length,
  );
  const careerCount = useAppSelector(
    (state) => state.persistedReducer.career.data.length,
  );
  const socialCount = useAppSelector(
    (state) => state.persistedReducer.socialLinks.data.filter((l) => l.enabled)
      .length,
  );

  useEffect(() => {
    dispatch(fetchEducation());
    dispatch(fetchCareer());
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  const counts: Record<string, string> = {
    "/admin/education": `${educationCount} entries`,
    "/admin/career": `${careerCount} entries`,
    "/admin/social-links": `${socialCount} active`,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group p-5 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <section.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{section.label}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {section.description}
                </p>
                {counts[section.href] && (
                  <p className="text-xs text-primary mt-2">
                    {counts[section.href]}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

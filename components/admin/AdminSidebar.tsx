"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Share2,
  GraduationCap,
  Briefcase,
  FileText,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/personal", label: "Personal Info", icon: User },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/career", label: "Career", icon: Briefcase },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/github", label: "GitHub Settings", icon: Github },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/50 bg-card/30 p-4 sticky top-16 h-[calc(100vh-4rem)]">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

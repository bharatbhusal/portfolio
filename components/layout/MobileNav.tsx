"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Shield,
  ChevronDown,
  ChevronRight,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Share2,
  Github,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleAdminNav } from "@/store/ui-slice";
import { useAuth } from "@/components/providers/auth-provider";
import type { PersonalInfo } from "@/services/personal-info";

interface MobileNavProps {
  navItems: { href: string; label: string; icon: React.ElementType }[];
  pathname: string;
  personalInfo?: PersonalInfo | null;
  isAuthenticated?: boolean;
}

const ADMIN_SUB_LINKS = [
  { href: "/admin/personal", label: "Personal Info", icon: User },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/career", label: "Career", icon: Briefcase },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/github", label: "GitHub", icon: Github },
];

const MobileNav = ({
  navItems,
  pathname,
  personalInfo,
  isAuthenticated,
}: MobileNavProps) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [imageId, setImageId] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { adminNavExpanded } = useAppSelector(
    (state) => state.persistedReducer.ui,
  );
  const fullname =
    `${personalInfo?.name?.first} ${personalInfo?.name?.last}` || "Portfolio";

  React.useEffect(() => {
    fetch("/api/image")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.id) setImageId(json.data.id);
      })
      .catch(() => {});
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full transition-transform duration-200 data-[state=open]:rotate-90"
          aria-label="Open navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] sm:w-[320px] border-l-0 bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Profile card */}
          <div className="flex items-center gap-3 px-4 py-6 border-b">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={imageId ? `/api/image?id=${imageId}` : undefined}
                alt={fullname}
                className="object-cover"
              />
              <AvatarFallback className="text-sm font-semibold">
                {fullname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{fullname}</p>
              <p className="text-xs text-muted-foreground">
                {personalInfo?.tagline || ""}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 py-4 flex-1 overflow-y-scroll">
            <p className="px-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
                  )}
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/50 text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={() => {
                if (isAuthenticated) {
                  dispatch(toggleAdminNav());
                } else {
                  setOpen(false);
                  router.push("/login");
                }
              }}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 w-full text-left",
                pathname.startsWith("/admin")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pathname.startsWith("/admin") && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
              )}
              <span
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                  pathname.startsWith("/admin")
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                <Shield className="h-4 w-4" />
              </span>
              Admin
              <span className="ml-auto">
                {adminNavExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
            </button>
            {isAuthenticated && adminNavExpanded && (
              <div className="ml-4 border-l pl-2">
                {ADMIN_SUB_LINKS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary" />
                      )}
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/");
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Footer hint */}
          <p className="px-4 py-4 text-xs text-muted-foreground/50 border-t text-center">
            {fullname} &mdash; {new Date().getFullYear()}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
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
import type { PersonalInfo } from "@/services/personal-info";

interface MobileNavProps {
  navItems: { href: string; label: string; icon: React.ElementType }[];
  pathname: string;
  personalInfo?: PersonalInfo | null;
  isAuthenticated?: boolean;
}

const MobileNav = ({
  navItems,
  pathname,
  personalInfo,
  isAuthenticated,
}: MobileNavProps) => {
  const [open, setOpen] = React.useState(false);
  const [imageId, setImageId] = React.useState<string | null>(null);
  const firstName = personalInfo?.name?.first || "P";

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
                alt={firstName}
                className="object-cover"
              />
              <AvatarFallback className="text-sm font-semibold">
                {firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{firstName}</p>
              <p className="text-xs text-muted-foreground">
                {personalInfo?.title || ""}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 py-4 flex-1">
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

            {isAuthenticated && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200",
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
              </Link>
            )}
          </nav>

          {/* Footer hint */}
          <p className="px-4 py-4 text-xs text-muted-foreground/50 border-t text-center">
            {firstName} &mdash; {new Date().getFullYear()}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

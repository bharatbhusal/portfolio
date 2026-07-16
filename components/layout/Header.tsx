"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, GraduationCap, FolderGit2, FileText, Moon, Sun, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { contactInfo } from "@/config/contact-info";
import { useAuth } from "@/components/providers/auth-provider";
import MobileNav from "./MobileNav";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/career", label: "Career", icon: Briefcase },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/resume", label: "Resume", icon: FileText },
];

const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
          >
            {contactInfo.name.first}
            <span className="text-primary">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
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
            {isAuthenticated && (
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  pathname.startsWith("/admin")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            ) : (
              <Skeleton className="h-10 w-10 rounded-full" />
            )}

            {mounted ? (
              <MobileNav navItems={navItems} pathname={pathname} />
            ) : (
              <Skeleton className="h-10 w-10 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

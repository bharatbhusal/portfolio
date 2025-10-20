/**
 * Explore Navigation Component
 * Main navigation menu with smooth transitions
 */
"use client";

import React, { JSX, useState } from "react";
import {
  Menu,
  ArrowLeft,
  Home,
  Briefcase,
  GraduationCap,
  FolderGit2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Explore = (): JSX.Element => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    router.push(`/${path}`);
    setIsOpen(false);
  };

  const menuItems: { icon: React.ReactNode; path: string; label: string }[] = [
    { icon: <Home className="h-4 w-4" />, path: "", label: "Home" },
    {
      icon: <Briefcase className="h-4 w-4" />,
      path: "career",
      label: "Career",
    },
    {
      icon: <GraduationCap className="h-4 w-4" />,
      path: "education",
      label: "Education",
    },
    {
      icon: <FolderGit2 className="h-4 w-4" />,
      path: "projects",
      label: "Projects",
    },
  ];

  return (
    <div className="fixed top-5 right-5 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={isOpen ? () => router.back() : toggleMenu}
              className="rounded-full transition-all duration-300 hover:scale-110"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <ArrowLeft className="h-5 w-5 transition-transform duration-300" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isOpen ? "Close menu" : "Open navigation"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={`absolute right-0 top-14 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="flex flex-col gap-2 bg-card border border-border rounded-lg p-2 shadow-lg backdrop-blur-md"
          role="navigation"
          aria-label="Main navigation"
        >
          {menuItems.map(({ icon, path, label }, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation(path)}
                    className="rounded-full hover:bg-accent transition-all duration-200"
                    aria-label={label}
                  >
                    {icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Explore;

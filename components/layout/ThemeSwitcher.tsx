/**
 * ThemeSwitcher Component
 * Accessible theme toggle with smooth transitions
 */
"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ThemeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-50 rounded-full transition-all duration-300"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleTheme}
            className="fixed bottom-5 right-5 z-50 rounded-full transition-all duration-300 hover:scale-110"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 transition-transform duration-300 rotate-0" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 rotate-0" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>
            {resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeSwitcher;

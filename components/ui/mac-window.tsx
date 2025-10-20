/**
 * MacWindow Component
 * macOS-style window with traffic lights (red, yellow, green buttons)
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isPinned?: boolean;
}

const MacWindow: React.FC<MacWindowProps> = ({
  children,
  title,
  className,
  isPinned = false,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden shadow-2xl border transition-all duration-300",
        isDark
          ? "bg-gray-800/90 border-gray-700/50 backdrop-blur-xl"
          : "bg-white/90 border-gray-300/50 backdrop-blur-xl",
        isPinned && "ring-2 ring-primary/50",
        className
      )}
    >
      {/* macOS Window Title Bar */}
      <div
        className={cn(
          "flex items-center px-4 py-3 border-b",
          isDark
            ? "bg-gray-900/50 border-gray-700/50"
            : "bg-gray-100/50 border-gray-200/50"
        )}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
        </div>

        {/* Window Title */}
        {title && (
          <div
            className={cn(
              "flex-1 text-center text-sm font-medium",
              isDark ? "text-gray-300" : "text-gray-700"
            )}
          >
            {title}
          </div>
        )}

        {/* Pinned Indicator */}
        {isPinned && (
          <div className="ml-auto">
            <svg
              className="w-8 h-8 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78-.03 1.632.57 2.1A3.989 3.989 0 007 15a3.989 3.989 0 002.248-1.074c.6-.468.82-1.32.57-2.1L9 9.274V6a1 1 0 00-2 0v3.274z" />
            </svg>
          </div>
        )}
      </div>

      {/* Window Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default MacWindow;

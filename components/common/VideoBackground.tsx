/**
 * VideoBackground Component
 * Animated background video with smooth theme transitions
 */
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  className = "",
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Smooth transition when theme changes
      if (resolvedTheme === "dark") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${className}`}
    >
      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/webm" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/40" />
    </div>
  );
};

export default VideoBackground;

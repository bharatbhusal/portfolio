/**
 * SocialLinks Component
 * Social media links with tooltips and hover effects
 */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SocialLinks({
  socialLinks,
}: {
  socialLinks: { icon: React.ElementType; link: string; label: string }[];
}) {
  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-6 flex justify-center flex-wrap gap-2">
      <TooltipProvider>
        {socialLinks?.map((social, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleClick(social.link)}
                aria-label={`Visit ${social.label}`}
              >
                <social.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{social.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}

export default SocialLinks;

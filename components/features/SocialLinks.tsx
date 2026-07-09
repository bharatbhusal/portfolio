/**
 * SocialLinks Component
 * Social media links with hover effects
 */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

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
      {socialLinks?.map((social, index) => (
        <Button
          key={index}
          variant="outline"
          size="icon"
          onClick={() => handleClick(social.link)}
          title={social.label}
          aria-label={`Visit ${social.label}`}
        >
          <social.icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
}

export default SocialLinks;

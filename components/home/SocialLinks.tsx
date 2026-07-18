/**
 * SocialLinks Component
 * Social media links with hover effects
 */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  SOCIAL_PLATFORMS,
  buildSocialUrl,
  type SocialLinkConfig,
} from "@/types/social";

function SocialLinks({ socialLinks }: { socialLinks?: SocialLinkConfig[] }) {
  return (
    <div className="mt-6 flex justify-center flex-wrap gap-2">
      {socialLinks
        ?.filter((s) => s.enabled && s.handle)
        .map((social) => {
          const platform = SOCIAL_PLATFORMS[social.platform];
          const url = buildSocialUrl(social.platform, social.handle);
          return (
            <Button key={social.platform} variant="outline" size="icon" asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener,noreferrer"
                title={social.handle}
                aria-label={`Visit ${platform?.label || social.platform}`}
              >
                {platform?.icon && <platform.icon className="h-5 w-5" />}
              </a>
            </Button>
          );
        })}
    </div>
  );
}

export default SocialLinks;

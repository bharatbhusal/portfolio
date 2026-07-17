"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FolderGit2 } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import ToggleProfileQR from "./ToggleProfileQR";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/config/site-config";
import type { PersonalInfoDocument } from "@/models/personal-info";
import type { SocialLinkConfig } from "@/types/social";
import { SOCIAL_PLATFORMS, buildSocialUrl } from "@/types/social";

function buildSocialLinks(configs: SocialLinkConfig[]) {
  if (!configs.length) return [];

  const platformMap = SOCIAL_PLATFORMS;

  return configs
    .filter((c) => c.enabled && c.handle)
    .map((c) => {
      const platform = platformMap[c.platform];
      return {
        link: buildSocialUrl(c.platform, c.handle),
        icon: platform?.icon,
        type: c.platform,
        label: platform?.label || c.platform,
        handle: c.handle,
      };
    });
}

const HeroSection = ({
  initialPersonalInfo,
  initialSocialLinks,
}: {
  initialPersonalInfo?: PersonalInfoDocument | null;
  initialSocialLinks?: SocialLinkConfig[];
}) => {
  const [imageId, setImageId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const info = initialPersonalInfo;
  const socialItems = initialSocialLinks
    ? buildSocialLinks(initialSocialLinks)
    : [];

  useEffect(() => {
    fetch("/api/image")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.id) {
          setImageId(json.data.id);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-avatar",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-social",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.35,
        }
      );

      gsap.fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const displayName = info
    ? `${info.name.first} ${info.name.last}`
    : "No Name";

  const title = info?.title || "No title set";

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div ref={containerRef} className="max-w-2xl mx-auto px-4 text-center">
        <div className="hero-avatar">
          <ToggleProfileQR
            profileUrl={imageId ? `/api/image?id=${imageId}` : undefined}
            qrValue={`${siteConfig.url}/api/contact/vcard`}
            name={displayName}
            fallback="NN"
          />
        </div>

        <div className="hero-text space-y-4 mt-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {displayName}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto">
            {title}
          </p>
        </div>

        <div className="hero-social">
          <SocialLinks socialLinks={socialItems} />
        </div>

        <div className="hero-cta flex flex-wrap justify-center gap-3 my-4">
          <Link href="/career">
            <Button className="rounded-full gap-2">
              <Briefcase className="h-4 w-4" />
              View Career
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="rounded-full gap-2">
              <FolderGit2 className="h-4 w-4" />
              Explore Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

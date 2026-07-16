"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FolderGit2 } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ToggleProfileQR from "./ToggleProfileQR";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/config/site-config";
import type { PersonalInfoDocument } from "@/models/personal-info";
import type { SocialLinkConfig } from "@/types/social";
import { SOCIAL_PLATFORMS } from "@/types/social";

function buildSocialLinks(configs: SocialLinkConfig[]) {
  if (!configs.length) return [];

  const platformMap = SOCIAL_PLATFORMS;

  return configs
    .filter((c) => c.enabled && c.url)
    .map((c) => {
      const platform = platformMap[c.platform];
      return {
        link: c.url,
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
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const info = initialPersonalInfo;
  const socialItems = initialSocialLinks
    ? buildSocialLinks(initialSocialLinks)
    : [];

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
    img.src = "/name.jpeg";
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

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
  }, [loaded]);

  const displayName = info
    ? `${info.name.first} ${info.name.last}`
    : "No Name";

  const title = info?.title || "No title set";

  if (!loaded) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Skeleton className="w-[260px] h-[260px] rounded-full mx-auto mb-5" />
          <div className="space-y-4 mt-6">
            <Skeleton className="h-14 sm:h-16 w-3/4 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 my-4">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div ref={containerRef} className="max-w-2xl mx-auto px-4 text-center">
        <div className="hero-avatar">
          <ToggleProfileQR
            profileUrl="/name.jpeg"
            qrValue={`${siteConfig.url}/api/contact/vcard`}
            name={displayName}
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

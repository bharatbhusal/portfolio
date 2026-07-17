import React from "react";
import { Metadata } from "next";
import { prefetchPersonalInfo, prefetchSocialLinks } from "@/lib/hydration";
import HeroSection from "@/components/home/HeroSection";

export async function generateMetadata(): Promise<Metadata> {
  const info = await prefetchPersonalInfo();
  if (!info) {
    return { title: "Home", description: "Software Engineer Portfolio" };
  }
  return {
    title: "Home",
    description: info.bio || info.tagline || "Software Engineer Portfolio",
    authors: [{ name: info.name.full }],
    openGraph: {
      title: `${info.name.full} - ${info.title}`,
      description: info.bio || info.tagline || "",
    },
    twitter: {
      title: `${info.name.full} - ${info.title}`,
      description: info.bio || info.tagline || "",
    },
  };
}

export default async function HomePage() {
  const [personalInfo, socialLinks] = await Promise.all([
    prefetchPersonalInfo(),
    prefetchSocialLinks(),
  ]);

  return (
    <HeroSection
      initialPersonalInfo={personalInfo}
      initialSocialLinks={socialLinks}
    />
  );
}

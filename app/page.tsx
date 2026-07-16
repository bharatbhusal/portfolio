import React from "react";
import { Metadata } from "next";
import { prefetchPersonalInfo, prefetchSocialLinks } from "@/lib/hydration";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Bharat Bhusal - Full Stack Developer and Computer Science Student",
};

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

"use client";

import React from "react";
import SocialLinks from "@/components/features/SocialLinks";
import ToggleProfileQR from "@/components/features/ToggleProfileQR";
import VideoBackground from "@/components/common/VideoBackground";
import { contactInfo, siteConfig } from "@/config";

const Home: React.FC = () => {
  return (
    <main className="flex items-center justify-center overflow-y-auto relative">
      {/* Background Video - only shows in dark mode */}
      <VideoBackground videoSrc="/videos/background.webm" />

      <div className="text-center p-5 w-full max-w-2xl relative z-10">
        <ToggleProfileQR
          profileUrl="/bharatbhusal.jpeg"
          qrValue={`${siteConfig.url}/api/contact/vcard`}
          name={contactInfo.name.full}
        />

        <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {contactInfo.name.full}
        </h1>
        <p className="text-muted-foreground text-base mt-2 leading-relaxed max-w-xl mx-auto">
          {contactInfo.tagline}
        </p>

        <SocialLinks />
      </div>
    </main>
  );
};

export default Home;

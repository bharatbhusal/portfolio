"use client";

import React from "react";
import SocialLinks from "@/components/features/SocialLinks";
import ToggleProfileQR from "@/components/features/ToggleProfileQR";
import { contactInfo, siteConfig } from "@/config";
import { socialLinks } from "@/data/aboutMe";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center p-5 w-full max-w-2xl">
        <ToggleProfileQR
          profileUrl="/bharatbhusal.jpeg"
          qrValue={`${siteConfig.url}/api/contact/vcard`}
          name={contactInfo.name.full}
        />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {contactInfo.name.full}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mt-2 leading-relaxed max-w-xl mx-auto px-4">
          {contactInfo.title}
        </p>

        <SocialLinks socialLinks={socialLinks} />
      </div>
    </div>
  );
};

export default Home;

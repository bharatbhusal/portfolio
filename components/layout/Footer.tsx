"use client";

import React from "react";
import { socialLinks } from "@/data/aboutMe";
import { contactInfo } from "@/config/contact-info";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <footer className="border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => handleClick(social.link)}
                aria-label={social.label}
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
          <Separator className="max-w-xs" />
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} {contactInfo.name.full}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

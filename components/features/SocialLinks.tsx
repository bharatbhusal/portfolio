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
import { contactInfo } from "@/config/contact-info";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";

interface SocialLink {
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    link: contactInfo.social.github,
    icon: FaGithub,
    type: "github",
    label: "GitHub",
  },
  {
    link: contactInfo.social.twitter,
    icon: FaXTwitter,
    type: "twitter",
    label: "Twitter/X",
  },
  {
    link: contactInfo.social.telegram,
    icon: FaTelegram,
    type: "telegram",
    label: "Telegram",
  },
  {
    link: contactInfo.email,
    icon: HiOutlineMail,
    type: "email",
    label: "Email",
  },
  {
    link: contactInfo.social.substack,
    icon: SiSubstack,
    type: "substack",
    label: "Substack",
  },
  {
    link: contactInfo.social.linkedin,
    icon: FaLinkedin,
    type: "linkedin",
    label: "LinkedIn",
  },
  {
    link: contactInfo.social.instagram,
    icon: FaInstagram,
    type: "instagram",
    label: "Instagram",
  },
];

function SocialLinks() {
  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-6 flex justify-center flex-wrap gap-2">
      <TooltipProvider>
        {socialLinks.map((social, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleClick(social.link)}
                className="rounded-full hover:scale-110 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50"
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

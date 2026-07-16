import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";
import type { IconType } from "react-icons";

export const SOCIAL_PLATFORMS = {
  github: { label: "GitHub", icon: FaGithub },
  twitter: { label: "Twitter/X", icon: FaXTwitter },
  telegram: { label: "Telegram", icon: FaTelegram },
  email: { label: "Email", icon: HiOutlineMail },
  substack: { label: "Substack", icon: SiSubstack },
  linkedin: { label: "LinkedIn", icon: FaLinkedin },
  instagram: { label: "Instagram", icon: FaInstagram },
} as const;

export type SocialPlatform = keyof typeof SOCIAL_PLATFORMS;

export interface SocialLinkConfig {
  platform: SocialPlatform;
  url: string;
  handle: string;
  enabled: boolean;
}

export function getSocialIcon(platform: SocialPlatform): IconType {
  return SOCIAL_PLATFORMS[platform].icon;
}

export function getSocialLabel(platform: SocialPlatform): string {
  return SOCIAL_PLATFORMS[platform].label;
}

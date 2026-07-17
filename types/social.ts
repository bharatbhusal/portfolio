import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";
import { Phone } from "lucide-react";
import type { IconType } from "react-icons";

export const SOCIAL_PLATFORMS: Record<string, { label: string; icon: IconType }> = {
  github: { label: "GitHub", icon: FaGithub },
  twitter: { label: "Twitter/X", icon: FaXTwitter },
  telegram: { label: "Telegram", icon: FaTelegram },
  email: { label: "Email", icon: HiOutlineMail },
  substack: { label: "Substack", icon: SiSubstack },
  linkedin: { label: "LinkedIn", icon: FaLinkedin },
  instagram: { label: "Instagram", icon: FaInstagram },
  phone: { label: "Phone", icon: Phone },
};

export type SocialPlatform = keyof typeof SOCIAL_PLATFORMS;

export interface SocialLinkConfig {
  platform: SocialPlatform;
  url: string;
  handle: string;
  enabled: boolean;
}

export function buildSocialUrl(
  platform: SocialPlatform,
  handle: string,
): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "");
  switch (platform) {
    case "github":
      return `https://github.com/${h}`;
    case "twitter":
      return `https://x.com/${h}`;
    case "telegram":
      return `https://t.me/${h}`;
    case "email":
      return h.includes("@") ? `mailto:${h}` : `mailto:${h}`;
    case "substack":
      return `https://${h}.substack.com`;
    case "linkedin":
      return `https://linkedin.com/in/${h}`;
    case "instagram":
      return `https://instagram.com/${h}`;
    case "phone":
      return `tel:${h.startsWith("+") ? h : `+${h}`}`;
    default:
      return "";
  }
}

export function getSocialIcon(platform: SocialPlatform): IconType {
  return SOCIAL_PLATFORMS[platform].icon;
}

export function getSocialLabel(platform: SocialPlatform): string {
  return SOCIAL_PLATFORMS[platform].label;
}

"use client";
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";
import { SocialLink } from "@/types";
import { contactInfo } from "@/config/contact-info";

export const socialLinks: SocialLink[] = [
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
    link: `mailto:${contactInfo.email}`,
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

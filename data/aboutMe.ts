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
    handle: "@bharatbhusal",
  },
  {
    link: contactInfo.social.twitter,
    icon: FaXTwitter,
    type: "twitter",
    label: "Twitter/X",
    handle: "@bharatbhusal02",
  },
  {
    link: contactInfo.social.telegram,
    icon: FaTelegram,
    type: "telegram",
    label: "Telegram",
    handle: "@bharatbhusal",
  },
  {
    link: `mailto:${contactInfo.email}`,
    icon: HiOutlineMail,
    type: "email",
    label: "Email",
    handle: "bharatbhusal78@gmail.com",
  },
  {
    link: contactInfo.social.substack,
    icon: SiSubstack,
    type: "substack",
    label: "Substack",
    handle: "@bharatbhusal",
  },
  {
    link: contactInfo.social.linkedin,
    icon: FaLinkedin,
    type: "linkedin",
    label: "LinkedIn",
    handle: "/in/bharatbhusal",
  },
  {
    link: contactInfo.social.instagram,
    icon: FaInstagram,
    type: "instagram",
    label: "Instagram",
    handle: "@bharatbhusal",
  },
];

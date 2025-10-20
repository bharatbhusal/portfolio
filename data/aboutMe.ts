"use client";
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";
import { SocialLink } from "@/types";
import { contactInfo } from "@/config/contact-info";

const aboutMe: SocialLink[] = [
  {
    link: contactInfo.social.github,
    icon: FaGithub,
    type: "github",
  },
  {
    link: contactInfo.social.twitter,
    icon: FaXTwitter,
    type: "twitter",
  },
  {
    link: contactInfo.social.telegram,
    icon: FaTelegram,
    type: "telegram",
  },
  {
    link: `mailto:${contactInfo.email}`,
    icon: HiOutlineMail,
    type: "email",
  },
  {
    link: contactInfo.social.substack,
    icon: SiSubstack,
    type: "substack",
  },
  {
    link: contactInfo.social.linkedin,
    icon: FaLinkedin,
    type: "linkedin",
  },
  {
    link: contactInfo.social.instagram,
    icon: FaInstagram,
    type: "instagram",
  },
];

export default aboutMe;

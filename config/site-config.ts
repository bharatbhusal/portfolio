/**
 * Site Configuration
 * Global settings and metadata for the portfolio
 */

import { contactInfo } from "./contact-info";

export const siteConfig = {
  // Site Metadata
  name: contactInfo.name.full,
  title: contactInfo.name.full,
  description: contactInfo.tagline,
  url: contactInfo.website,
  author: contactInfo.name.full,

  // SEO
  keywords: contactInfo.keywords,

  // Open Graph / Social Media
  ogImage: "/bharatbhusal.jpeg",
  twitterHandle: "@bharatbhusal02",

  // Theme
  defaultTheme: "dark" as const,

  // Navigation
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: "FaHome",
    },
    {
      title: "Career",
      href: "/career",
      icon: "PiBagSimpleFill",
    },
    {
      title: "Education",
      href: "/education",
      icon: "FaGraduationCap",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: "GrProjects",
    },
  ],

  // Features
  features: {
    vCard: true,
    darkMode: true,
    animations: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

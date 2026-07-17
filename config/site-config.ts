/**
 * Site Configuration — UI settings only
 * Personal info comes from the database
 */

export const siteConfig = {
  url: "https://bharatbhusal.com",

  ogImage: "/icon",
  twitterHandle: "@bharatbhusal02",

  defaultTheme: "dark" as const,

  mainNav: [
    { title: "Home", href: "/", icon: "FaHome" },
    { title: "Career", href: "/career", icon: "PiBagSimpleFill" },
    { title: "Education", href: "/education", icon: "FaGraduationCap" },
    { title: "Projects", href: "/projects", icon: "GrProjects" },
    { title: "Resume", href: "/resume", icon: "FaFileAlt" },
  ],

  features: {
    vCard: true,
    darkMode: true,
    animations: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

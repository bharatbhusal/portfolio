/**
 * Contact Information Configuration
 * Centralized contact details for the portfolio
 */

export const contactInfo = {
  // Personal Information
  name: {
    full: "Bharat Bhusal",
    first: "Bharat",
    last: "Bhusal",
  },

  // Contact Details
  email: "bharatbhusal78@gmail.com",
  phone: "+917416476507",

  // Website & URLs
  website: "https://bharatbhusal.com",
  portfolio: "https://bharatbhusal.com",

  // Physical Address (Update with actual details)
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  },

  // Social Media Links
  social: {
    github: "https://github.com/bharatbhusal",
    twitter: "https://twitter.com/bharatbhusal02",
    linkedin: "https://linkedin.com/in/bharatbhusal/",
    telegram: "https://t.me/bharatbhusal",
    instagram: "https://www.instagram.com/bharatbhusal",
    substack: "https://substack.com/@bharatbhusal",
  },

  // Professional Information
  title: "Fullstack Developer | Web3 Specialist",
  tagline: "HMU for anything Tech. Fullstack, Web3 and Execution.",
  bio: "Skilled Security Auditor and MERN Stack Developer with experience in blockchain security and fullstack web application development.",

  // Skills & Keywords
  keywords: [
    "Bharat Bhusal",
    "Security Auditor",
    "MERN Stack Developer",
    "Community Manager",
    "Developer",
    "Web Developer",
    "Blockchain Security",
    "Fullstack Developer",
    "Web3",
  ],
} as const;

export type ContactInfo = typeof contactInfo;

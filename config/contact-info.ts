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
  title: "Software Engineer with prior experience in Web3",
  tagline: "Exploring everything!",
  bio: "Skilled Security Auditor and Developer with experience in blockchain security and fullstack web application development.",

  // Skills & Keywords
  keywords: [
    "Bharat Bhusal",
    "Security Auditor",
    "Fullstack Developer",
    "Community Manager",
    "Web Developer",
    "Blockchain Security",
    "Web3",
  ],
} as const;

export type ContactInfo = typeof contactInfo;

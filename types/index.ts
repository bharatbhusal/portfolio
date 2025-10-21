import { IconType } from "react-icons";

// Common link type used across multiple interfaces
export interface Link {
  link: string;
  icon: IconType;
  type: string;
}

// Career Data Types
export interface CareerLink extends Link {
  type: "website" | "twitter" | "telegram" | "game";
}

export interface CareerItem {
  company: string;
  role: string;
  duration: string;
  address: string;
  description: string;
  achievements: string[];
  links: CareerLink[];
  highlight?: string;
}

// Education Data Types
export interface EducationLink extends Link {
  type: "website" | "linkedin" | "twitter" | "instagram" | "facebook";
}

export interface EducationItem {
  institution: string;
  duration: string;
  address: string;
  cgpa: string;
  links: EducationLink[];
  courses: string[];
  degree?: string;
  description?: string;
  highlight?: string;
}

// Projects Data Types
export interface ProjectLink extends Link {
  type: "website" | "github";
}

export interface ProjectItem {
  project: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  highlight?: string;
}

export interface SocialLink {
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  label: string;
}

export interface ToggleProfileQRProps {
  profileUrl: string;
  qrValue: string;
}

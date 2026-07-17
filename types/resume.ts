export interface ResumeBasics {
  name: string;
  email: string;
  phone?: string;
  url?: string;
  github?: string;
  summary: string;
  location?: string;
  profiles?: { network: string; url: string }[];
}

export interface ResumeWork {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  summary?: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  area: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface ResumeSkill {
  category: string;
  keywords: string[];
}

export interface ResumeProject {
  name: string;
  highlights: string[];
  techStack: string[];
  url?: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  projects: ResumeProject[];
}

export interface ResumeDocument extends ResumeData {
  _id: string;
  role: string;
  createdAt: Date;
}

export type JobRole =
  | "Blockchain Developer"
  | "Software Engineer"
  | "Community Manager (Web3)"
  | "Smart Contract Auditor";

export const JOB_ROLES: JobRole[] = [
  "Blockchain Developer",
  "Software Engineer",
  "Community Manager (Web3)",
  "Smart Contract Auditor",
];

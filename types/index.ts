import { IconType } from "react-icons";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

// Common link type used across multiple interfaces
export interface Link {
	link: string;
	icon: IconType;
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
}

// Education Data Types
export interface EducationLink extends Link {
	type:
		| "website"
		| "linkedin"
		| "twitter"
		| "instagram"
		| "facebook";
}

export interface EducationItem {
	institution: string;
	duration: string;
	address: string;
	cgpa: string;
	links: EducationLink[];
	courses: string[];
}

// Projects Data Types
export interface ProjectLink {
	link: string;
	icon: typeof FaGithub | typeof CgWebsite;
}

export interface ProjectItem {
	project: string;
	description: string;
	technologies: string[];
	links: ProjectLink[];
}

import { contactInfo } from "@/config/contact-info";
import careerData from "@/data/careerData";
import educationData from "@/data/educationData";
import { getGithubProjects } from "@/lib/github";
import type { ResumeData, JobRole } from "@/types/resume";

export async function buildResumeContext(): Promise<{
  basics: ResumeData["basics"];
  work: ResumeData["work"];
  education: ResumeData["education"];
  projects: { name: string; description: string; tags: string[] }[];
  skills: string[];
}> {
  const projects = await getGithubProjects();
  const featuredProjects = projects.slice(0, 20);

  return {
    basics: {
      name: contactInfo.name.full,
      email: contactInfo.email,
      phone: contactInfo.phone,
      url: contactInfo.website,
      summary: contactInfo.bio,
    },
    work: careerData.map((c) => ({
      company: c.company,
      position: c.role,
      startDate: c.duration.split(" - ")[0]?.trim() || "",
      endDate: c.duration.split(" - ")[1]?.trim() || undefined,
      highlights: c.achievements,
    })),
    education: educationData.map((e) => ({
      institution: e.institution,
      degree: e.degree || "",
      area: e.courses?.join(", ") || "",
      startDate: e.duration.split(" - ")[0]?.trim() || "",
      endDate: e.duration.split(" - ")[1]?.trim() || undefined,
      gpa: e.cgpa,
    })),
    projects: featuredProjects.map((p) => ({
      name: p.project,
      description: p.description,
      tags: p.tags,
    })),
    skills: [
      ...new Set(
        featuredProjects.flatMap((p) => p.tags).filter(Boolean) as string[]
      ),
    ],
  };
}

export function buildPrompt(ctx: Awaited<ReturnType<typeof buildResumeContext>>, role: JobRole): string {
  return `You are an expert ATS-friendly resume writer. Given the following raw data about a person, create a tailored, ATS-optimized resume for the role of "${role}".

RULES:
- Output ONLY valid JSON matching the schema below.
- Reorder and emphasize work experience to highlight relevance to "${role}".
- Write a 2-3 line professional summary tailored to "${role}".
- Quantify achievements with numbers where possible.
- Use ATS-friendly keywords relevant to "${role}".
- Keep bullet points concise (1-2 lines each).
- List skills in categories relevant to "${role}".
- Include the most relevant 5-8 projects that match "${role}".
- Use reverse chronological order for work and education.
- Date format: "Mon YYYY" (e.g., "Nov 2025").

OUTPUT SCHEMA:
{
  "basics": {
    "name": "string",
    "email": "string",
    "phone": "string or null",
    "url": "string or null",
    "summary": "2-3 line professional summary tailored to the role"
  },
  "work": [
    {
      "company": "string",
      "position": "string (tailored title if appropriate)",
      "startDate": "Mon YYYY",
      "endDate": "Mon YYYY or Present",
      "highlights": ["string (concise, quantified, ATS-optimized bullets)"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "area": "string (relevant coursework)",
      "startDate": "Mon YYYY",
      "endDate": "Mon YYYY",
      "gpa": "string or null"
    }
  ],
  "skills": [
    {
      "category": "string (e.g., Languages, Frameworks, Tools)",
      "keywords": ["string"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string (1-2 lines, relevant to role)",
      "techStack": ["string"],
      "url": "string or null"
    }
  ]
}

RAW DATA:
${JSON.stringify(ctx, null, 2)}`;
}

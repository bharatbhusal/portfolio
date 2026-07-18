import { getPersonalInfo } from "@/models/personal-info";
import { getAllCareer } from "@/models/career";
import { getAllEducation } from "@/models/education";
import { getSocialLinks } from "@/models/social-links";
import { getGithubPinnedReposWithReadme } from "@/lib/github";
import type { ResumeData, JobRole } from "@/types/resume";

function parseStartDate(dateStr: string): number {
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sept: 8,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const parts = dateStr.split(" ");
  if (parts.length < 2) return 0;
  const month = months[parts[0]] ?? 0;
  const year = parseInt(parts[1], 10) || 0;
  return year * 100 + month;
}

export async function buildResumeContext(): Promise<{
  work: {
    company: string;
    address: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    description: string;
    tags: string[];
    readmeContent: string;
    links: { type: string; url: string }[];
  }[];
}> {
  const [pinnedRepos, careerItems] = await Promise.all([
    getGithubPinnedReposWithReadme(),
    getAllCareer(),
  ]);

  return {
    work: careerItems.map((c) => ({
      company: c.company,
      address: c.address,
      highlights: c.achievements,
    })),
    projects: pinnedRepos.map((p) => ({
      name: p.name,
      description: p.description,
      tags: p.tags,
      readmeContent: p.readmeContent,
      links: p.links,
    })),
  };
}

export function buildSystemPrompt(role: JobRole): string {
  return `You are an expert ATS-friendly resume writer. You create tailored, ATS-optimized resumes.

RULES:
- Output ONLY valid JSON matching the schema below. No markdown, no explanation.
- Reorder and emphasize work experience to highlight relevance to "${role}".
- Write a 2-3 line professional summary tailored to "${role}" based on work experience and projects.
- Quantify achievements with numbers where possible.
- Use ATS-friendly keywords relevant to "${role}".
- For projects: explain each project in 2-4 bullet points based on the README content provided.
- List all the skills in categories (e.g., Languages, Frameworks, Tools, Platforms) based on work experience and projects.
- Use reverse chronological order for work and education.
- Keep bullet points concise (1-2 lines each).

OUTPUT SCHEMA:
{
  "summary": "2-3 line professional summary tailored to the role",
  "skills": [
    {
      "category": "string (e.g., Languages, Frameworks, Tools)",
      "keywords": ["string"]
    }
  ],
  "work": [
    {
      "company": "string",
      "highlights": ["string (concise, quantified, ATS-optimized bullets)"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "highlights": ["string (2-4 bullet points explaining the project based on README)"],
      "techStack": ["string"]
    }
  ]
}`;
}

export function buildUserPrompt(
  ctx: Awaited<ReturnType<typeof buildResumeContext>>,
  role: JobRole,
): string {
  return `Create a resume for the role of "${role}".

RAW DATA:
${JSON.stringify(ctx, null, 2)}`;
}

export async function postProcessResume(
  llmOutput: Record<string, unknown>,
  ctx: Awaited<ReturnType<typeof buildResumeContext>>,
): Promise<ResumeData> {
  const [careerItems, educationItems, personalInfo, socialLinks] =
    await Promise.all([
      getAllCareer(),
      getAllEducation(),
      getPersonalInfo(),
      getSocialLinks(),
    ]);

  const socialMap = Object.fromEntries(
    socialLinks
      .filter((s) => s.enabled && s.handle)
      .map((s) => [s.platform, s.handle]),
  );

  const email = socialMap.email || "";
  const phone = socialMap.phone || "";
  const url = socialMap.website || "";
  const github = socialMap.github || "";

  const workMap = new Map(careerItems.map((c) => [c.company, c]));

  const llmWork = (llmOutput.work || []) as {
    company: string;
    highlights: string[];
  }[];

  const llmProjects = (llmOutput.projects || []) as {
    name: string;
    highlights: string[];
    techStack: string[];
  }[];

  const sortedWork = [...llmWork].sort((a, b) => {
    const rawA = workMap.get(a.company);
    const rawB = workMap.get(b.company);
    return (
      parseStartDate(rawB?.startDate || "") -
      parseStartDate(rawA?.startDate || "")
    );
  });

  return {
    basics: {
      name:
        `${personalInfo?.name?.first} ${personalInfo?.name?.last}` || "No Name",
      email,
      phone: phone || undefined,
      url: url || undefined,
      github: github || undefined,
      summary: (llmOutput.summary as string) || personalInfo?.bio || "",
    },
    work: sortedWork.map((w) => {
      const raw = workMap.get(w.company);
      return {
        company: w.company,
        position: raw?.role || "",
        startDate: raw?.startDate || "",
        endDate: raw?.endDate,
        location: raw?.address || undefined,
        highlights: w.highlights,
      };
    }),
    education: educationItems.map((e) => ({
      institution: e.institution,
      degree: e.degree || "",
      area: e.courses?.join(", ") || "",
      startDate: e.startDate,
      endDate: e.endDate,
      gpa: e.cgpa,
    })),
    skills: (llmOutput.skills || []) as ResumeData["skills"],
    projects: ctx.projects.map((ctxProject) => {
      const llmProj = llmProjects.find((p) => p.name === ctxProject.name);
      const homepage = ctxProject.links.find((l) => l.type === "website")?.url;
      return {
        name: ctxProject.name,
        highlights: llmProj?.highlights || [ctxProject.description],
        techStack: llmProj?.techStack || ctxProject.tags,
        url: homepage || undefined,
      };
    }),
  };
}

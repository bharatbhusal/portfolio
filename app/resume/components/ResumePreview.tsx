"use client";

import type { ResumeData } from "@/types/resume";

const GREEN = "#16a34a";

export default function ResumePreview({ data }: { data: ResumeData }) {
  const { basics, work, education, skills, projects } = data;

  return (
    <div className="bg-white text-gray-900 text-[11px] leading-tight font-sans max-w-[800px] mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold tracking-tight">{basics.name}</h1>
          <div className="flex flex-col items-end gap-1 text-gray-600 text-right">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="hover:underline"
                style={{ color: GREEN }}
              >
                {basics.email}
              </a>
            )}
            {basics.phone && (
              <a
                href={`tel:${basics.phone}`}
                className="hover:underline"
                style={{ color: GREEN }}
              >
                {basics.phone}
              </a>
            )}
            {basics.url && (
              <a
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: GREEN }}
              >
                {basics.url.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
        {basics.summary && (
          <p className="mt-3 text-gray-700 text-[11px] leading-relaxed">
            {basics.summary}
          </p>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="px-8 py-4 border-b border-gray-200">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: GREEN }}
          >
            Skills
          </h2>
          <div className="space-y-1">
            {skills.map((s) => (
              <div key={s.category}>
                <span className="font-semibold">{s.category}: </span>
                <span>{s.keywords.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {work.length > 0 && (
        <div className="px-8 py-4 border-b border-gray-200">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: GREEN }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {work.map((w, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{w.position}</span>
                  <span className="text-gray-500 text-[10px]">
                    {w.startDate} – {w.endDate || "Present"}
                  </span>
                </div>
                <div className="text-gray-600 italic">
                  {w.company}
                  {w.location ? ` · ${w.location}` : ""}
                </div>
                {w.highlights.length > 0 && (
                  <ul className="mt-1 ml-4 list-disc space-y-0.5">
                    {w.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="px-8 py-4 border-b border-gray-200">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: GREEN }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i}>
                <div className="font-bold">{p.name}</div>
                {p.highlights.length > 0 && (
                  <ul className="mt-1 ml-4 list-disc space-y-0.5">
                    {p.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
                {p.techStack.length > 0 && (
                  <div className="text-gray-500 text-[10px] mt-0.5">
                    {p.techStack.join(" · ")}
                  </div>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] hover:underline"
                    style={{ color: GREEN }}
                  >
                    {p.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="px-8 py-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: GREEN }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{e.degree}</span>
                  <span className="text-gray-500 text-[10px]">
                    {e.startDate} – {e.endDate || ""}
                  </span>
                </div>
                <div className="text-gray-600 italic">{e.institution}</div>
                {e.area && (
                  <div className="text-gray-500 text-[10px]">{e.area}</div>
                )}
                {e.gpa && (
                  <div className="text-gray-500 text-[10px]">GPA: {e.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

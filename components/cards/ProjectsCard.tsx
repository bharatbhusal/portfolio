"use client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { ProjectItem } from "@/types";
import { cn } from "@/lib/utils";
import MacWindow from "@/components/ui/mac-window";

const ProjectsCard = ({
  project,
  description,
  technologies,
  links,
  highlight,
}: ProjectItem) => {
  const bookmarkId = project.toLowerCase().replace(/\s+/g, "-");

  return (
    <div id={bookmarkId} className="scroll-mt-20">
      <MacWindow title={project} highlight={highlight}>
        <div className="space-y-4 p-6">
          <p className="text-base">{description}</p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                suppressHydrationWarning
                key={index}
                className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  "bg-primary/10 dark:bg-primary/20",
                  "border border-primary/20",
                  "text-foreground"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 pt-4 border-t border-border/50">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
                aria-label={`Visit ${
                  link.icon === FaGithub ? "GitHub" : "Website"
                } link`}
              >
                {link.icon === FaGithub ? (
                  <>
                    <FaGithub className="h-5 w-5" />
                    <span className="text-sm">Repository</span>
                  </>
                ) : (
                  <>
                    <CgWebsite className="h-5 w-5" />
                    <span className="text-sm">Live Demo</span>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </MacWindow>
    </div>
  );
};
export default ProjectsCard;

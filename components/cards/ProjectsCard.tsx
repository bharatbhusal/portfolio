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
  isPinned = false,
  lastCommit,
}: ProjectItem) => {
  // Create bookmark ID from project name
  const bookmarkId = project.toLowerCase().replace(/\s+/g, "-");

  return (
    <div id={bookmarkId} className="scroll-mt-20">
      <MacWindow title={project} isPinned={isPinned}>
        <div className="space-y-4 p-6">
          <p className="text-base">{description}</p>

          {/* Last Commit Info */}
          {lastCommit && (
            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md border border-border/50">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="font-medium">{lastCommit.message}</p>
                  <p className="text-xs opacity-75 mt-1">{lastCommit.date}</p>
                </div>
              </div>
            </div>
          )}

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

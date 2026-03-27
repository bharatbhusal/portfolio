"use client";
import Link from "next/link";
import { FaMapLocation } from "react-icons/fa6";
import { EducationItem } from "@/types";
import { cn } from "@/lib/utils";
import MacWindow from "@/components/ui/mac-window";

const EducationCard = ({
  institution,
  courses,
  cgpa,
  duration,
  address,
  links,
  highlight,
  description,
  degree,
}: EducationItem) => {
  // Create bookmark ID - use "latest" for pinned, otherwise institution name
  const bookmarkId = highlight
    ? "latest"
    : institution.toLowerCase().replace(/\s+/g, "-");

  return (
    <div id={bookmarkId} className="scroll-mt-20">
      <MacWindow title={institution} highlight={highlight}>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <div className="flex justify-between flex-col lg:flex-row lg:items-center gap-2">
              <span className="text-lg font-semibold">
                {degree || duration}
              </span>
              {duration && degree && (
                <div className="text-xs text-muted-foreground">{duration}</div>
              )}
            </div>
            <div className="text-sm text-muted-foreground">CGPA: {cgpa}</div>
            <div className="text-sm text-muted-foreground inline-flex items-center">
              <FaMapLocation className="mr-2" />
              {address}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {courses.map((course, index) => (
              <span
                key={index}
                className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  "bg-primary/10 dark:bg-primary/20",
                  "border border-primary/20",
                  "text-foreground",
                )}
              >
                {course}
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
                className="hover:text-primary transition-colors"
                aria-label={`Visit ${link.type} link`}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </MacWindow>
    </div>
  );
};
export default EducationCard;

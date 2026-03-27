"use client";
import Link from "next/link";
import { FaMapLocation } from "react-icons/fa6";
import { CareerItem } from "@/types";
import MacWindow from "@/components/ui/mac-window";

const CareerCard = ({
  company,
  role,
  duration,
  address,
  description,
  achievements,
  links,
  highlight,
}: CareerItem) => {
  // Create bookmark ID - use "current" for pinned, otherwise company name
  const bookmarkId = highlight
    ? "current"
    : company.toLowerCase().replace(/\s+/g, "-");

  return (
    <div id={bookmarkId} className="scroll-mt-20">
      <MacWindow title={`Organization - ${company}`} highlight={highlight}>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <div className="flex justify-between flex-col lg:flex-row lg:items-center">
              <span className="text-lg font-semibold text-primary">{role}</span>
              <span className="text-xs text-muted-foreground">{duration}</span>
            </div>
            <div className="text-sm text-muted-foreground inline-flex items-center">
              <FaMapLocation className="mr-2" />
              {address}
            </div>
          </div>
          <p className="text-base">{description}</p>
          <ul className="list-disc pl-6 space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-sm">
                {achievement}
              </li>
            ))}
          </ul>
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

export default CareerCard;

"use client";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaMapLocation, FaXTwitter } from "react-icons/fa6";
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
  isPinned = false,
}: EducationItem) => {
  return (
    <MacWindow title={institution} isPinned={isPinned}>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{duration}</span>
            <span className="text-sm text-muted-foreground">CGPA: {cgpa}</span>
          </div>
          <div className="text-sm text-muted-foreground inline-flex items-center">
            <FaMapLocation className="mr-2" />
            {address}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {courses.map((course, index) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                "bg-primary/10 dark:bg-primary/20",
                "border border-primary/20",
                "text-foreground"
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
              {link.icon === CgWebsite ? (
                <CgWebsite className="h-5 w-5" />
              ) : link.icon === FaLinkedin ? (
                <FaLinkedin className="h-5 w-5" />
              ) : link.icon === FaXTwitter ? (
                <FaXTwitter className="h-5 w-5" />
              ) : link.icon === FaInstagram ? (
                <FaInstagram className="h-5 w-5" />
              ) : (
                <FaFacebook className="h-5 w-5" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </MacWindow>
  );
};
export default EducationCard;

"use client";
import Link from "next/link";
import { FaGamepad, FaTelegram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter, FaMapLocation } from "react-icons/fa6";
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
  isPinned = false,
}: CareerItem) => {
  return (
    <MacWindow title={`${company} - ${role}`} isPinned={isPinned}>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-primary">{role}</span>
            <span className="text-sm text-muted-foreground">{duration}</span>
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
              {link.icon === CgWebsite ? (
                <CgWebsite className="h-5 w-5" />
              ) : link.icon === FaXTwitter ? (
                <FaXTwitter className="h-5 w-5" />
              ) : link.icon === FaTelegram ? (
                <FaTelegram className="h-5 w-5" />
              ) : (
                <FaGamepad className="h-5 w-5" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </MacWindow>
  );
};

export default CareerCard;

"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { CareerItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CgWebsite } from "react-icons/cg";
import { FaLinkedin, FaTelegram, FaGamepad, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  website: CgWebsite,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  telegram: FaTelegram,
  game: FaGamepad,
  instagram: FaInstagram,
  facebook: FaFacebook,
};

interface CareerCardProps extends CareerItem {
  onEdit?: () => void;
  onDelete?: () => void;
}

const CareerCard = ({
  company,
  role,
  startDate,
  endDate,
  address,
  description,
  achievements,
  links,
  highlight,
  onEdit,
  onDelete,
}: CareerCardProps) => {
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-300 ${
        highlight ? "border-primary/40 ring-1 ring-primary/20 scale-[1.02]" : ""
      }`}
    >
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{company}</h3>
            </div>
            <p className="text-primary font-medium text-sm">{role}</p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {startDate} – {endDate || "Present"}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          {address}
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-2 mb-4">
          {achievements.map((achievement, index) => (
            <li
              key={index}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              {achievement}
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <div className="flex gap-3 pt-4 border-t mt-auto">
            {links.map((link, index) => {
              const Icon = iconMap[link.type] || CgWebsite;
              return (
                <Link
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Visit ${link.type} link`}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        )}

        {(onEdit || onDelete) && (
          <div className="flex gap-2 pt-4 border-t mt-4">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="h-8 w-8"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="h-8 w-8 text-destructive hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerCard;

"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Pin } from "lucide-react";
import { EducationItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EducationCard = ({
  institution,
  degree,
  duration,
  address,
  cgpa,
  description,
  courses,
  links,
  highlight,
}: EducationItem) => {
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-300 ${
        highlight
          ? "border-primary/40 ring-1 ring-primary/20 scale-[1.02]"
          : ""
      }`}
    >
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{institution}</h3>
              {highlight && (
                <Badge variant="default" className="text-[10px] px-2 py-0 h-5">
                  <Pin className="h-3 w-3 mr-1" />
                  {highlight}
                </Badge>
              )}
            </div>
            {degree && (
              <p className="text-primary font-medium text-sm">{degree}</p>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {duration}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3" />
          {address}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4 w-fit">
          CGPA: {cgpa}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {courses.map((course, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {course}
            </Badge>
          ))}
        </div>

        {links.length > 0 && (
          <div className="flex gap-3 pt-4 border-t mt-auto">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Visit ${link.type} link`}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationCard;

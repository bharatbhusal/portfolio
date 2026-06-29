"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Github, BookOpen, Star, GitFork } from "lucide-react";
import { ProjectItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectCard = ({
  project,
  description,
  technologies,
  links,
  highlight,
  stars,
  forks,
  updatedAt,
  language,
}: ProjectItem) => {
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden transition-all duration-300 ${
        highlight ? "border-primary/40 ring-1 ring-primary/20 scale-[1.02]" : ""
      }`}
    >
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg">{project}</h3>
          {(stars !== undefined || forks !== undefined) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 mt-1">
              {stars !== undefined && stars > 0 && (
                <span className="flex items-center gap-0.5">
                  <Star className="h-3.5 w-3.5 fill-yellow-500/10 text-yellow-500" />
                  {stars}
                </span>
              )}
              {forks !== undefined && forks > 0 && (
                <span className="flex items-center gap-0.5">
                  <GitFork className="h-3.5 w-3.5 text-muted-foreground" />
                  {forks}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Metadata Row: Language & Last Updated */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-4">
          {language && (
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {language}
            </span>
          )}
          {updatedAt && (
            <span>
              Updated {new Date(updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t mt-auto">
          {links.map((link, index) => {
            const isInternal = link.type === "details";
            const buttonElement = (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs gap-1.5 h-8"
              >
                {link.type === "github" ? (
                  <Github className="h-3.5 w-3.5" />
                ) : link.type === "details" ? (
                  <BookOpen className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
                {link.type === "github"
                  ? "Code"
                  : link.type === "details"
                  ? "Readme"
                  : "Demo"}
              </Button>
            );

            return isInternal ? (
              <Link key={index} href={link.link}>
                {buttonElement}
              </Link>
            ) : (
              <Link
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {buttonElement}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

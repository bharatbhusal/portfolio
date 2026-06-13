"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
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
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t mt-auto">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs gap-1.5 h-8"
              >
                {link.type === "github" ? (
                  <Github className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
                {link.type === "github" ? "Code" : "Demo"}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

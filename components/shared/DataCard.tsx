"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DataCardProps {
  title: string;
  subtitle?: string;
  badges?: { label: string; variant?: "default" | "secondary" | "destructive" | "outline" }[];
  links?: { label: string; url: string }[];
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export function DataCard({
  title,
  subtitle,
  badges,
  links,
  onEdit,
  onDelete,
  children,
}: DataCardProps) {
  return (
    <div className="p-5 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="h-8 w-8"
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
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {children}

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <Badge key={i} variant={badge.variant || "secondary"}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import type { NotificationType } from "./NotificationProvider";

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  onClose: () => void;
}

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-primary" />,
  error: <AlertCircle className="h-5 w-5 text-destructive" />,
  warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  info: <Info className="h-5 w-5 text-muted-foreground" />,
};

const styles: Record<NotificationType, string> = {
  success: "border-primary/20 bg-primary/10",
  error: "border-destructive/20 bg-destructive/10",
  warning: "border-orange-500/20 bg-orange-500/10",
  info: "border-border bg-muted/50",
};

export function Notification({
  type,
  title,
  message,
  onClose,
}: NotificationProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border max-w-sm ${styles[type]}`}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {message && <p className="text-sm text-muted-foreground mt-1">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

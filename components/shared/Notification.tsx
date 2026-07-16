"use client";

import { X, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { NotificationType } from "./NotificationProvider";

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  onClose: () => void;
}

const icons: Record<NotificationType, React.ReactNode> = {
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const styles: Record<NotificationType, string> = {
  error: "border-red-500/20 bg-red-500/10",
  warning: "border-yellow-500/20 bg-yellow-500/10",
  info: "border-blue-500/20 bg-blue-500/10",
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

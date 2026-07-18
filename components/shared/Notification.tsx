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
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const styles: Record<NotificationType, string> = {
  success: "border-primary bg-primary text-primary-foreground",
  error: "border-destructive bg-destructive text-destructive-foreground",
  warning: "border-orange-500 bg-orange-500 text-white",
  info: "border-foreground bg-foreground text-background",
};

export function Notification({
  type,
  title,
  message,
  onClose,
}: NotificationProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border max-w-sm shadow-lg ${styles[type]}`}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {message && <p className="text-sm opacity-90 mt-1 break-words">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";

export default function ImagePage() {
  const [imageId, setImageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchImageId();
  }, []);

  const fetchImageId = async () => {
    try {
      const res = await fetch("/api/image");
      const json = await res.json();
      if (json.success) {
        setImageId(json.data.id);
      }
    } catch {
      // No image yet
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error);
    }

    setImageId(json.data.id);
    addNotification({ type: "info", title: "Image uploaded" });
  };

  const handleDelete = async () => {
    const res = await fetch("/api/image", { method: "DELETE" });
    const json = await res.json();
    if (!json.success) {
      addNotification({ type: "error", title: "Failed to delete image" });
      return;
    }

    setImageId(null);
    addNotification({ type: "info", title: "Image deleted" });
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Profile Image" subtitle="Upload your profile photo" />

      <div className="p-6 rounded-xl border border-border/50 bg-card/50">
        <ImageUpload
          currentImageId={imageId}
          onUpload={handleUpload}
          onDelete={imageId ? handleDelete : undefined}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  currentImageId?: string | null;
  cacheKey?: number;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function ImageUpload({
  currentImageId,
  cacheKey,
  onUpload,
  onDelete,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await onUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      {currentImageId && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/image?id=${currentImageId}${cacheKey ? `&t=${cacheKey}` : ""}`}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-2 border-border"
          />
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          {currentImageId ? "Change Image" : "Upload Image"}
        </Button>

        {currentImageId && onDelete && (
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchPersonalInfo,
  updatePersonalInfoAsync,
} from "@/store/personal-info-slice";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/shared/ImageUpload";

export default function PersonalInfoPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );
  const { addNotification } = useNotifications();
  const [form, setForm] = useState({
    name: { full: "", first: "", last: "" },
    title: "",
    tagline: "",
    bio: "",
    keywords: [] as string[],
  });
  const [saving, setSaving] = useState(false);

  // Image upload state
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [cacheKey, setCacheKey] = useState(Date.now());

  useEffect(() => {
    dispatch(fetchPersonalInfo());
    fetchImageId();
  }, [dispatch]);

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
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || { full: "", first: "", last: "" },
        title: data.title || "",
        tagline: data.tagline || "",
        bio: data.bio || "",
        keywords: data.keywords || [],
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updatePersonalInfoAsync(form)).unwrap();
      addNotification({ type: "success", title: "Personal info updated" });
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to update",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/image", { method: "POST", body: formData });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    setImageId(json.data.id);
    setCacheKey(Date.now());
    addNotification({ type: "info", title: "Image uploaded" });
  };

  const handleDelete = async () => {
    const res = await fetch("/api/image", { method: "DELETE" });
    const json = await res.json();
    if (!json.success) {
      addNotification({
        type: "error",
        title: "Failed to delete image",
        message: json.error || "Unknown error",
      });
      return;
    }
    setImageId(null);
    addNotification({ type: "info", title: "Image deleted" });
  };

  if (loading || imageLoading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader title="Personal Info" subtitle="Update your personal details" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                placeholder="John"
                value={form.name.first}
                onChange={(e) =>
                  setForm({ ...form, name: { ...form.name, first: e.target.value } })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                placeholder="Doe"
                value={form.name.last}
                onChange={(e) =>
                  setForm({ ...form, name: { ...form.name, last: e.target.value } })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Software Engineer"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tagline</label>
            <Input
              placeholder="Exploring everything!"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Brief description about yourself..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>

        {/* Right: Image upload */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 h-fit">
          <h3 className="font-medium mb-4">Profile Image</h3>
          <ImageUpload
            currentImageId={imageId}
            cacheKey={cacheKey}
            onUpload={handleUpload}
            onDelete={imageId ? handleDelete : undefined}
          />
        </div>
      </div>
    </div>
  );
}

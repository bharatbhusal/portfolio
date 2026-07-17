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

export default function PersonalInfoPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );
  const { addNotification } = useNotifications();
  const [form, setForm] = useState({
    name: { full: "", first: "", last: "" },
    email: "",
    phone: "",
    website: "",
    portfolio: "",
    title: "",
    tagline: "",
    bio: "",
    keywords: [] as string[],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || { full: "", first: "", last: "" },
        email: data.email || "",
        phone: data.phone || "",
        website: data.website || "",
        portfolio: data.portfolio || "",
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

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Personal Info" subtitle="Update your personal details" />

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
          <label className="text-sm font-medium">Full Name</label>
          <Input
            placeholder="John Doe"
            value={form.name.full}
            onChange={(e) =>
              setForm({ ...form, name: { ...form.name, full: e.target.value } })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input
            placeholder="+1 234 567 890"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
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
    </div>
  );
}

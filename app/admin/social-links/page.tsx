"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchSocialLinks,
  updateSocialLinksAsync,
} from "@/store/social-links-slice";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { SocialLinksSkeleton } from "@/components/skeletons/SocialLinksSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCIAL_PLATFORMS, type SocialLinkConfig } from "@/types/social";
import { getSocialIcon } from "@/types/social";

export default function SocialLinksPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.socialLinks,
  );
  const { addNotification } = useNotifications();
  const [links, setLinks] = useState<SocialLinkConfig[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      setLinks(data);
    }
  }, [data]);

  const updateLink = (
    platform: SocialLinkConfig["platform"],
    field: keyof SocialLinkConfig,
    value: string | boolean,
  ) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.platform === platform ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateSocialLinksAsync(links)).unwrap();
      addNotification({ type: "info", title: "Social links updated" });
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

  if (loading) return <SocialLinksSkeleton />;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Social Links" subtitle="Manage your social media profiles" />

      <div className="space-y-4">
        {links.map((link) => {
          const Icon = getSocialIcon(link.platform);
          const platformInfo = SOCIAL_PLATFORMS[link.platform];
          return (
            <div
              key={link.platform}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50"
            >
              <Icon className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <p className="font-medium">{platformInfo.label}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => updateLink(link.platform, "url", e.target.value)}
                  />
                  <Input
                    placeholder="Handle"
                    value={link.handle}
                    onChange={(e) =>
                      updateLink(link.platform, "handle", e.target.value)
                    }
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(e) =>
                    updateLink(link.platform, "enabled", e.target.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm">Enabled</span>
              </label>
            </div>
          );
        })}
      </div>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}

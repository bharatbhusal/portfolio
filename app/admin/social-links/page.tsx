"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchSocialLinks,
  updateSocialLinksAsync,
} from "@/store/social-links-slice";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SOCIAL_PLATFORMS,
  type SocialLinkConfig,
  type SocialPlatform,
} from "@/types/social";

const platformOrder: SocialPlatform[] = [
  "github",
  "twitter",
  "linkedin",
  "telegram",
  "email",
  "phone",
  "substack",
  "instagram",
];

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
    const byPlatform = new Map(data.map((l) => [l.platform, l]));
    const merged = platformOrder.map(
      (p) =>
        byPlatform.get(p) ?? {
          platform: p,
          handle: "",
          enabled: false,
        },
    );
    setLinks(merged);
  }, [data]);

  const updateHandle = (platform: SocialPlatform, handle: string) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.platform === platform
          ? {
              ...l,
              handle,
            }
          : l,
      ),
    );
  };

  const toggleEnabled = (platform: SocialPlatform) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.platform === platform ? { ...l, enabled: !l.enabled } : l,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateSocialLinksAsync(links)).unwrap();
      addNotification({ type: "success", title: "Social links updated" });
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to save",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Social Links"
        subtitle="Manage your social media presence"
      />

      <div className="space-y-3">
        {links.map((link) => {
          const platform = SOCIAL_PLATFORMS[link.platform];
          const Icon = platform?.icon;

          return (
            <div
              key={link.platform}
              className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50"
            >
              <div className="flex items-center gap-3 min-w-[120px]">
                {Icon && <Icon className="h-5 w-5 text-muted-foreground shrink-0" />}
                <span className="font-medium text-sm">{platform?.label}</span>
              </div>

              <div className="flex-1 min-w-[160px]">
                <Input
                  placeholder={link.platform === "email" ? "your@email.com" : "username"}
                  value={link.handle}
                  onChange={(e) => updateHandle(link.platform, e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={() => toggleEnabled(link.platform)}
                role="switch"
                aria-checked={link.enabled}
                aria-label={`${link.enabled ? "Disable" : "Enable"} ${platform?.label}`}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  link.enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    link.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
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

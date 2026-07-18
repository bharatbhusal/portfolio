"use client";

import { useEffect, useState } from "react";
import { Save, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";

interface Settings {
  github_username: string;
  github_token: string;
}

export default function GitHubSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    github_username: "",
    github_token: "",
  });
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const map: Settings = { github_username: "", github_token: "" };
          let tokenSet = false;
          for (const s of json.data) {
            if (s.key in map) {
              if (s.key === "github_token") {
                tokenSet = !!s.value && s.value !== "••••encrypted";
              } else {
                map[s.key as keyof Settings] = s.value;
              }
            }
          }
          setSettings(map);
          setHasToken(tokenSet);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates: Promise<Response>[] = [];

      if (settings.github_username) {
        updates.push(
          fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: "github_username",
              value: settings.github_username,
            }),
          }),
        );
      }

      if (settings.github_token) {
        updates.push(
          fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: "github_token",
              value: settings.github_token,
            }),
          }),
        );
      }

      await Promise.all(updates);
      addNotification({ type: "success", title: "GitHub settings saved" });
      setSettings((prev) => ({ ...prev, github_token: "" }));
    } catch (err) {
      addNotification({ type: "error", title: "Failed to save settings", message: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GitHub Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure GitHub integration for your projects page
        </p>
      </div>

      <div className="space-y-6 p-6 rounded-xl border border-border/50 bg-card/50">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub Username</label>
          <Input
            placeholder="e.g. bharatbhusal"
            value={settings.github_username}
            onChange={(e) =>
              setSettings({ ...settings, github_username: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            Your GitHub username used to fetch public repositories.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            GitHub Personal Access Token
          </label>
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              placeholder={
                hasToken ? "•••••••• (already set)" : "ghp_xxxxxxxxxxxx"
              }
              value={settings.github_token}
              onChange={(e) =>
                setSettings({ ...settings, github_token: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showToken ? "Hide token" : "Show token"}
            >
              {showToken ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {hasToken && (
            <p className="text-xs text-green-600">
              A token is already saved. Leave blank to keep it, or enter a new
              one to replace it.
            </p>
          )}

          <div className="rounded-lg bg-muted/50 p-4 space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">
                How is my token stored?
              </p>
              <p>
                Your token is encrypted at rest before being saved to the
                database — we never store it in plain text, and it is never
                exposed back to the client.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">
                Why provide a token?
              </p>
              <p>
                Without a token, GitHub limits API requests to{" "}
                <strong>60/hour</strong>. With a Personal Access Token (no
                scopes needed for public repos), you get{" "}
                <strong>5,000 requests/hour</strong>.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">
                How to generate one?
              </p>
              <p>
                Go to{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  GitHub Settings → Developer settings → Personal access tokens
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                → Generate new token (classic). No permissions needed for public
                repositories.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Can I skip this?</p>
              <p>
                Yes. If you have fewer than 60 public repos and don&apos;t
                update often, the portfolio works fine without it.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchCareer,
  addCareer,
  updateCareerAsync,
  deleteCareerAsync,
} from "@/store/career-slice";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataCard } from "@/components/shared/DataCard";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import type { CareerItem, CareerLink } from "@/types";

const CAREER_LINK_TYPES = ["website", "twitter", "telegram", "game", "linkedin"] as const;

const EMPTY_FORM: Partial<CareerItem> = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  address: "",
  description: "",
  achievements: [],
  links: [],
};

export default function CareerPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.career,
  );
  const { addNotification } = useNotifications();
  const [editing, setEditing] = useState<(CareerItem & { _id: string }) | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<CareerItem>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchCareer());
  }, [dispatch]);

  const handleEdit = (item: CareerItem & { _id: string }) => {
    setEditing(item);
    setForm({ ...item, links: item.links || [], achievements: item.achievements || [] });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await dispatch(
          updateCareerAsync({ id: editing._id, data: form }),
        ).unwrap();
      } else {
        await dispatch(addCareer(form as CareerItem)).unwrap();
      }
      addNotification({
        type: "success",
        title: editing ? "Career updated" : "Career added",
      });
      setShowForm(false);
      setForm({});
      setEditing(null);
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

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteCareerAsync(deleteId)).unwrap();
      addNotification({ type: "success", title: "Career deleted" });
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to delete",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
    setDeleteId(null);
  };

  const addAchievement = () => {
    setForm({ ...form, achievements: [...(form.achievements || []), ""] });
  };

  const updateAchievement = (index: number, value: string) => {
    const next = [...(form.achievements || [])];
    next[index] = value;
    setForm({ ...form, achievements: next });
  };

  const removeAchievement = (index: number) => {
    setForm({ ...form, achievements: (form.achievements || []).filter((_, i) => i !== index) });
  };

  const addLink = () => {
    setForm({ ...form, links: [...(form.links || []), { type: "website", link: "" }] });
  };

  const updateLink = (index: number, partial: Partial<CareerLink>) => {
    const next = [...(form.links || [])];
    next[index] = { ...next[index], ...partial } as CareerLink;
    setForm({ ...form, links: next });
  };

  const removeLink = (index: number) => {
    setForm({ ...form, links: (form.links || []).filter((_, i) => i !== index) });
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Career"
        subtitle="Manage your career entries"
        action={{ label: "Add Career", onClick: handleAdd }}
      />

      {showForm && (
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-4">
          <h3 className="font-semibold">
            {editing ? "Edit Career" : "Add Career"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input
                placeholder="Company name"
                value={form.company || ""}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                placeholder="Software Engineer"
                value={form.role || ""}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                placeholder="Nov 2025"
                value={form.startDate || ""}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                placeholder="Present"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="City, Country"
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="What does this company do? Your role..."
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Achievements</label>
            <div className="space-y-2">
              {(form.achievements || []).map((a, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Achievement ${i + 1}`}
                    value={a}
                    onChange={(e) => updateAchievement(i, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-10 w-10 text-destructive hover:text-destructive"
                    onClick={() => removeAchievement(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
              <Plus className="h-4 w-4 mr-1" /> Add Achievement
            </Button>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Links</label>
            <div className="space-y-2">
              {(form.links || []).map((lk, i) => (
                <div key={i} className="flex gap-2">
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={lk.type}
                    onChange={(e) => updateLink(i, { type: e.target.value as CareerLink["type"] })}
                  >
                    {CAREER_LINK_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <Input
                    placeholder="https://..."
                    value={lk.link}
                    onChange={(e) => updateLink(i, { link: e.target.value })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-10 w-10 text-destructive hover:text-destructive"
                    onClick={() => removeLink(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addLink}>
              <Plus className="h-4 w-4 mr-1" /> Add Link
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <DataCard
            key={item._id}
            title={item.company}
            subtitle={item.role}
            badges={
              item.highlight
                ? [{ label: item.highlight, variant: "secondary" as const }]
                : undefined
            }
            links={(item.links || []).map((lk) => ({
              label: lk.type,
              url: lk.link,
            }))}
            onEdit={() => handleEdit(item)}
            onDelete={() => setDeleteId(item._id)}
          >
            <p className="text-sm text-muted-foreground">
              {item.startDate} - {item.endDate || "Present"}
            </p>
            {item.description && (
              <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
            )}
            {item.achievements && item.achievements.length > 0 && (
              <ul className="text-sm mt-2 ml-4 list-disc space-y-0.5">
                {item.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}
          </DataCard>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Career"
        description="Are you sure you want to delete this career entry?"
        onConfirm={handleDelete}
      />
    </div>
  );
}

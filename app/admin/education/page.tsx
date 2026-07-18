"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchEducation,
  addEducation,
  updateEducationAsync,
  deleteEducationAsync,
} from "@/store/education-slice";
import { useNotifications } from "@/components/shared/NotificationProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import EducationCard from "@/components/features/education/EducationCard";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import type { EducationItem, EducationLink } from "@/types";

const EDUCATION_LINK_TYPES = [
  "website",
  "linkedin",
  "twitter",
  "instagram",
  "facebook",
] as const;

const EMPTY_FORM: Partial<EducationItem> = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
  address: "",
  cgpa: "",
  description: "",
  courses: [],
  links: [],
};

export default function EducationPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.education,
  );
  const { addNotification } = useNotifications();
  const [editing, setEditing] = useState<
    (EducationItem & { _id: string }) | null
  >(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<EducationItem>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchEducation());
  }, [dispatch]);

  const handleEdit = (item: EducationItem & { _id: string }) => {
    setEditing(item);
    setForm({ ...item, links: item.links || [], courses: item.courses || [] });
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
          updateEducationAsync({ id: editing._id, data: form }),
        ).unwrap();
      } else {
        await dispatch(addEducation(form as EducationItem)).unwrap();
      }
      addNotification({
        type: "success",
        title: editing ? "Education updated" : "Education added",
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
      await dispatch(deleteEducationAsync(deleteId)).unwrap();
      addNotification({ type: "success", title: "Education deleted" });
    } catch (err) {
      addNotification({
        type: "error",
        title: "Failed to delete",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
    setDeleteId(null);
  };

  const addCourse = () => {
    setForm({ ...form, courses: [...(form.courses || []), ""] });
  };

  const updateCourse = (index: number, value: string) => {
    const next = [...(form.courses || [])];
    next[index] = value;
    setForm({ ...form, courses: next });
  };

  const removeCourse = (index: number) => {
    setForm({
      ...form,
      courses: (form.courses || []).filter((_, i) => i !== index),
    });
  };

  const addLink = () => {
    setForm({
      ...form,
      links: [...(form.links || []), { type: "website", link: "" }],
    });
  };

  const updateLink = (index: number, partial: Partial<EducationLink>) => {
    const next = [...(form.links || [])];
    next[index] = { ...next[index], ...partial } as EducationLink;
    setForm({ ...form, links: next });
  };

  const removeLink = (index: number) => {
    setForm({
      ...form,
      links: (form.links || []).filter((_, i) => i !== index),
    });
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Education"
        subtitle="Manage your education entries"
        action={{ label: "Add Education", onClick: handleAdd }}
      />

      {showForm && (
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-4">
          <h3 className="font-semibold">
            {editing ? "Edit Education" : "Add Education"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Institution</label>
              <Input
                placeholder="University name"
                value={form.institution || ""}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Degree</label>
              <Input
                placeholder="B.Tech in Computer Science"
                value={form.degree || ""}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                placeholder="Nov 2021"
                value={form.startDate || ""}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                placeholder="Apr 2025"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CGPA</label>
              <Input
                placeholder="9.11/10"
                value={form.cgpa || ""}
                onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
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
              placeholder="What did you study? Key achievements..."
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Courses */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Courses</label>
            <div className="space-y-2">
              {(form.courses || []).map((c, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder={`Course ${i + 1}`}
                    value={c}
                    onChange={(e) => updateCourse(i, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-10 w-10 text-destructive hover:text-destructive"
                    onClick={() => removeCourse(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCourse}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Course
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
                    onChange={(e) =>
                      updateLink(i, {
                        type: e.target.value as EducationLink["type"],
                      })
                    }
                  >
                    {EDUCATION_LINK_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
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

      {data.length === 0 ? (
        <EmptyState
          title="No education entries yet"
          description="Add your first education entry to get started."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => (
            <EducationCard
              key={item._id}
              {...item}
              onEdit={() => handleEdit(item)}
              onDelete={() => setDeleteId(item._id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Education"
        description="Are you sure you want to delete this education entry?"
        onConfirm={handleDelete}
      />
    </div>
  );
}

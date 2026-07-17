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
import { DataCard } from "@/components/shared/DataCard";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { FormSkeleton } from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { EducationItem } from "@/types";

export default function EducationPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.persistedReducer.education,
  );
  const { addNotification } = useNotifications();
  const [editing, setEditing] = useState<(EducationItem & { _id: string }) | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<EducationItem>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchEducation());
  }, [dispatch]);

  const handleEdit = (item: EducationItem & { _id: string }) => {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      address: "",
      cgpa: "",
      description: "",
      courses: [],
    });
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
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
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
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
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
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
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
            title={item.institution}
            subtitle={item.degree || item.startDate}
            badges={[
              item.cgpa ? { label: `CGPA: ${item.cgpa}` } : null,
              item.highlight ? { label: item.highlight, variant: "secondary" } : null,
            ].filter(Boolean) as { label: string; variant?: "default" | "secondary" | "destructive" | "outline" }[]}
            onEdit={() => handleEdit(item)}
            onDelete={() => setDeleteId(item._id)}
          >
            <p className="text-sm text-muted-foreground">
              {item.startDate} - {item.endDate || "Present"}
            </p>
          </DataCard>
        ))}
      </div>

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

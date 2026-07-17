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
import type { CareerItem } from "@/types";

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
    setForm(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      address: "",
      description: "",
      achievements: [],
    });
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
            onEdit={() => handleEdit(item)}
            onDelete={() => setDeleteId(item._id)}
          >
            <p className="text-sm text-muted-foreground">
              {item.startDate} - {item.endDate || "Present"}
            </p>
            {item.description && (
              <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
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

"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  companyName: string | null;
  sortOrder: number;
  isActive: boolean | null;
}

const emptyForm = { quote: "", authorName: "", companyName: "" };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState("");

  const fetchTestimonials = async () => {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setTestimonials(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      quote: t.quote,
      authorName: t.authorName,
      companyName: t.companyName || "",
    });
    setError("");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.quote.trim() || !form.authorName.trim()) {
      setError("Quote and author name are required.");
      return;
    }

    setSaving(true);
    setError("");

    const url = editingId
      ? `/api/admin/testimonials/${editingId}`
      : "/api/admin/testimonials";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setDialogOpen(false);
      fetchTestimonials();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const handleToggleActive = async (id: string, currentActive: boolean | null) => {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentActive }),
    });
    if (res.ok) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isActive: !currentActive } : t))
      );
    }
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;

    const newList = [...testimonials];
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    setTestimonials(newList);

    setReordering(true);
    await fetch("/api/admin/testimonials/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: newList.map((t) => t.id) }),
    });
    setReordering(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Testimonials
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage client testimonials.
            {reordering && (
              <span className="ml-2 text-brand-cyan">Saving order...</span>
            )}
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-brand-cyan text-white text-sm font-semibold rounded-lg hover:bg-brand-cyan-dark transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No testimonials yet.</p>
          <button
            onClick={openNew}
            className="mt-4 text-brand-cyan font-medium hover:underline"
          >
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="flex items-start gap-4 px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col gap-0.5 pt-1">
                <button
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveItem(index, "down")}
                  disabled={index === testimonials.length - 1}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 line-clamp-2 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {t.authorName}
                  {t.companyName && (
                    <span className="text-gray-500 font-normal">
                      {" "}
                      — {t.companyName}
                    </span>
                  )}
                </p>
              </div>

              <Badge variant={t.isActive ? "default" : "secondary"}>
                {t.isActive ? "Active" : "Hidden"}
              </Badge>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(t.id, t.isActive)}
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
                >
                  {t.isActive ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="text-xs text-brand-cyan hover:text-brand-cyan-dark px-2 py-1 rounded hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote *
              </label>
              <textarea
                value={form.quote}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quote: e.target.value }))
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                placeholder="What did the client say?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name *
                </label>
                <input
                  type="text"
                  value={form.authorName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, authorName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, companyName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                  placeholder="Acme Corp"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-brand-cyan text-white text-sm font-semibold rounded-lg hover:bg-brand-cyan-dark disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this testimonial. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

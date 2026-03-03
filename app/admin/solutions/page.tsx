"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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

interface Solution {
  id: string;
  heading: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean | null;
  createdAt: string;
}

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchSolutions = async () => {
    const res = await fetch("/api/admin/solutions");
    if (res.ok) {
      setSolutions(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/admin/solutions/${deleteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSolutions((prev) => prev.filter((s) => s.id !== deleteId));
    }
    setDeleteId(null);
  };

  const handleToggleActive = async (id: string, currentActive: boolean | null) => {
    const res = await fetch(`/api/admin/solutions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentActive }),
    });
    if (res.ok) {
      setSolutions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: !currentActive } : s))
      );
    }
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= solutions.length) return;

    const newSolutions = [...solutions];
    [newSolutions[index], newSolutions[newIndex]] = [
      newSolutions[newIndex],
      newSolutions[index],
    ];
    setSolutions(newSolutions);

    setSaving(true);
    await fetch("/api/admin/solutions/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderedIds: newSolutions.map((s) => s.id),
      }),
    });
    setSaving(false);
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
            Solutions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your IT service offerings.
            {saving && (
              <span className="ml-2 text-brand-cyan">Saving order...</span>
            )}
          </p>
        </div>
        <Link
          href="/admin/solutions/new"
          className="px-4 py-2 bg-brand-cyan text-white text-sm font-semibold rounded-lg hover:bg-brand-cyan-dark transition-colors"
        >
          + Add Solution
        </Link>
      </div>

      {solutions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No solutions yet.</p>
          <Link
            href="/admin/solutions/new"
            className="inline-block mt-4 text-brand-cyan font-medium hover:underline"
          >
            Create your first solution
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveItem(index, "down")}
                  disabled={index === solutions.length - 1}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {solution.heading}
                </p>
              </div>

              {/* Status */}
              <Badge variant={solution.isActive ? "default" : "secondary"}>
                {solution.isActive ? "Active" : "Hidden"}
              </Badge>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleToggleActive(solution.id, solution.isActive)
                  }
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
                >
                  {solution.isActive ? "Hide" : "Show"}
                </button>
                <Link
                  href={`/admin/solutions/${solution.id}/edit`}
                  className="text-xs text-brand-cyan hover:text-brand-cyan-dark px-2 py-1 rounded hover:bg-blue-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(solution.id)}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Solution</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this solution. This action cannot be
              undone.
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

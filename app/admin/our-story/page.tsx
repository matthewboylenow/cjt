"use client";

import { useEffect, useState } from "react";
import { TiptapEditor } from "@/components/tiptap/Editor";

const emptyDoc = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export default function AdminOurStoryPage() {
  const [content, setContent] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/page-content/our-story")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        setContent(data?.content || emptyDoc);
        setLoading(false);
      })
      .catch(() => {
        setContent(emptyDoc);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/page-content/our-story", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Our Story
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit the content that appears on the Our Story page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Saved!</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-brand-cyan text-white text-sm font-semibold rounded-lg hover:bg-brand-cyan-dark disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {content !== null && (
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Tell your story..."
        />
      )}
    </div>
  );
}

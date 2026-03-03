"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/tiptap/Editor";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditSolutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState<unknown>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/solutions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setHeading(data.heading);
        setBody(data.body);
        setImageUrl(data.imageUrl || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Solution not found");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading.trim()) {
      setError("Heading is required");
      return;
    }

    setError("");
    setSaving(true);

    const res = await fetch(`/api/admin/solutions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heading, body, imageUrl: imageUrl || null }),
    });

    if (res.ok) {
      router.push("/admin/solutions");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update solution");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-100 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/solutions")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Solutions
        </button>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Edit Solution
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Heading *
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Image
          </label>
          <ImageUpload
            currentUrl={imageUrl}
            onUploadComplete={setImageUrl}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Content *
          </label>
          {body !== null && (
            <TiptapEditor
              content={body}
              onChange={setBody}
              placeholder="Describe this solution..."
            />
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-brand-cyan text-white text-sm font-semibold rounded-lg hover:bg-brand-cyan-dark disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/solutions")}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

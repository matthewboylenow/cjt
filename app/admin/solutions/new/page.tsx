"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/tiptap/Editor";
import { ImageUpload } from "@/components/admin/ImageUpload";

const emptyDoc = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export default function NewSolutionPage() {
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState<unknown>(emptyDoc);
  const [imageUrl, setImageUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading.trim()) {
      setError("Heading is required");
      return;
    }

    setError("");
    setSaving(true);

    const res = await fetch("/api/admin/solutions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heading,
        excerpt: excerpt || null,
        body,
        imageUrl: imageUrl || null,
        linkLabel: linkLabel || null,
        linkHref: linkHref || null,
      }),
    });

    if (res.ok) {
      router.push("/admin/solutions");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create solution");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Solutions
        </button>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          New Solution
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
            placeholder="e.g. Network & Infrastructure Management"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Excerpt
          </label>
          <p className="text-xs text-gray-500 mb-1">Short description shown on homepage and solutions page</p>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            maxLength={500}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent resize-none"
            placeholder="e.g. Servers, workstations, security patches, and uptime monitoring."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Image
          </label>
          <ImageUpload currentUrl={null} onUploadComplete={setImageUrl} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Content *
          </label>
          <TiptapEditor
            content={emptyDoc}
            onChange={setBody}
            placeholder="Describe this solution..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Link Label
            </label>
            <input
              type="text"
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
              placeholder="e.g. Visit Partner Site"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Link URL
            </label>
            <input
              type="text"
              value={linkHref}
              onChange={(e) => setLinkHref(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
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
            {saving ? "Creating..." : "Create Solution"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

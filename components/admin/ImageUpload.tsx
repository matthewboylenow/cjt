"use client";

import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import Image from "next/image";

export function ImageUpload({
  currentUrl,
  onUploadComplete,
}: {
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setPreview(blob.url);
      onUploadComplete(blob.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {preview && (
        <div className="mb-3 relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src={preview}
            alt="Solution image"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition-colors"
        >
          {uploading ? "Uploading..." : preview ? "Change Image" : "Upload Image"}
        </button>
        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onUploadComplete("");
            }}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

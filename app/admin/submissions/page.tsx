"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  companySize: string | null;
  itFrustration: string | null;
  message: string | null;
  isRead: boolean | null;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  const toggleRead = async (id: string, currentRead: boolean | null) => {
    const res = await fetch(`/api/admin/submissions/${id}/read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !currentRead }),
    });
    if (res.ok) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isRead: !currentRead } : s))
      );
    }
  };

  const handleExport = () => {
    window.open("/api/admin/submissions/export", "_blank");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const unreadCount = submissions.filter((s) => !s.isRead).length;

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
            Contact Submissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {submissions.length} total
            {unreadCount > 0 && (
              <span className="text-brand-cyan font-medium">
                {" "}
                · {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {submissions.length > 0 && (
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No submissions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {submissions.map((s) => (
            <div key={s.id}>
              <div
                onClick={() =>
                  setExpandedId(expandedId === s.id ? null : s.id)
                }
                className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !s.isRead ? "bg-blue-50/50" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    s.isRead ? "bg-gray-300" : "bg-brand-cyan"
                  }`}
                />
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                  <span
                    className={`text-sm truncate ${
                      !s.isRead ? "font-semibold text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {s.email}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {s.companyName || "—"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(s.createdAt)}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    expandedId === s.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {expandedId === s.id && (
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>{" "}
                      <span className="text-gray-900">{s.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>{" "}
                      <a
                        href={`mailto:${s.email}`}
                        className="text-brand-cyan hover:underline"
                      >
                        {s.email}
                      </a>
                    </div>
                    {s.phone && (
                      <div>
                        <span className="text-gray-500">Phone:</span>{" "}
                        <span className="text-gray-900">{s.phone}</span>
                      </div>
                    )}
                    {s.companyName && (
                      <div>
                        <span className="text-gray-500">Company:</span>{" "}
                        <span className="text-gray-900">{s.companyName}</span>
                      </div>
                    )}
                    {s.companySize && (
                      <div>
                        <span className="text-gray-500">Size:</span>{" "}
                        <span className="text-gray-900">{s.companySize}</span>
                      </div>
                    )}
                    {s.itFrustration && (
                      <div>
                        <span className="text-gray-500">IT Frustration:</span>{" "}
                        <Badge variant="secondary">{s.itFrustration}</Badge>
                      </div>
                    )}
                  </div>
                  {s.message && (
                    <div className="mt-4">
                      <span className="text-sm text-gray-500 block mb-1">
                        Message:
                      </span>
                      <p className="text-sm text-gray-900 bg-white rounded-lg p-3 border border-gray-200 whitespace-pre-wrap">
                        {s.message}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRead(s.id, s.isRead);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-white"
                    >
                      Mark as {s.isRead ? "unread" : "read"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

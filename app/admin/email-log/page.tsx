"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface EmailEntry {
  id: string;
  recipient: string;
  subject: string;
  status: string;
  resendId: string | null;
  errorCode: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export default function AdminEmailLogPage() {
  const [entries, setEntries] = useState<EmailEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/email-log")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  const handleExport = () => {
    window.open("/api/admin/email-log/export", "_blank");
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
            Email Log
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {entries.length} emails logged
          </p>
        </div>
        {entries.length > 0 && (
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

      {entries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No emails logged yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Emails will appear here when contact form submissions are received.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Recipient
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Subject
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(entry.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {entry.recipient}
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                      {entry.subject}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          entry.status === "sent" ? "default" : "destructive"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                      {entry.errorCode
                        ? `${entry.errorCode}: ${entry.errorMessage || ""}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

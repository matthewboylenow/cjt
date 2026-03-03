import { auth } from "@/lib/auth";
import { db } from "@/db";
import { emailLog } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

function escapeCSV(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db
    .select()
    .from(emailLog)
    .orderBy(desc(emailLog.createdAt));

  const headers = [
    "Date",
    "Recipient",
    "Subject",
    "Status",
    "Resend ID",
    "Error Code",
    "Error Message",
  ];

  const rows = data.map((e) =>
    [
      e.createdAt?.toISOString() ?? "",
      e.recipient,
      e.subject,
      e.status,
      e.resendId ?? "",
      e.errorCode ?? "",
      e.errorMessage ?? "",
    ]
      .map(escapeCSV)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="email-log-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}

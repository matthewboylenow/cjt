import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
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
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  const headers = [
    "Date",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Size",
    "IT Frustration",
    "Message",
    "Read",
  ];

  const rows = data.map((s) =>
    [
      s.createdAt?.toISOString() ?? "",
      s.name,
      s.email,
      s.phone ?? "",
      s.companyName ?? "",
      s.companySize ?? "",
      s.itFrustration ?? "",
      s.message ?? "",
      s.isRead ? "Yes" : "No",
    ]
      .map(escapeCSV)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}

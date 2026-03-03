import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder));

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { quote, authorName, companyName } = body;

  if (!quote || !authorName) {
    return NextResponse.json(
      { error: "Quote and author name are required" },
      { status: 400 }
    );
  }

  const existing = await db
    .select({ sortOrder: testimonials.sortOrder })
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder));
  const nextOrder =
    existing.length > 0
      ? Math.max(...existing.map((t) => t.sortOrder)) + 1
      : 0;

  const [created] = await db
    .insert(testimonials)
    .values({
      quote,
      authorName,
      companyName: companyName || null,
      sortOrder: nextOrder,
      isActive: true,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}

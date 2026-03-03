import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { solutions } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db
    .select()
    .from(solutions)
    .orderBy(asc(solutions.sortOrder));

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { heading, body: content, imageUrl, excerpt, linkLabel, linkHref } = body;

  if (!heading || !content) {
    return NextResponse.json(
      { error: "Heading and body are required" },
      { status: 400 }
    );
  }

  // Get the next sort order
  const existing = await db
    .select({ sortOrder: solutions.sortOrder })
    .from(solutions)
    .orderBy(asc(solutions.sortOrder));
  const nextOrder =
    existing.length > 0
      ? Math.max(...existing.map((s) => s.sortOrder)) + 1
      : 0;

  const [created] = await db
    .insert(solutions)
    .values({
      heading,
      excerpt: excerpt || null,
      body: content,
      imageUrl: imageUrl || null,
      linkLabel: linkLabel || null,
      linkHref: linkHref || null,
      sortOrder: nextOrder,
      isActive: true,
    })
    .returning();

  revalidatePath("/solutions");
  revalidatePath("/");

  return NextResponse.json(created, { status: 201 });
}

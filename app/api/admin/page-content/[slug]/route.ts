import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const [page] = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.pageSlug, slug));

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  // Upsert: update if exists, insert if not
  const [existing] = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.pageSlug, slug));

  if (existing) {
    const [updated] = await db
      .update(pageContent)
      .set({ content, updatedAt: new Date() })
      .where(eq(pageContent.pageSlug, slug))
      .returning();
    return NextResponse.json(updated);
  } else {
    const [created] = await db
      .insert(pageContent)
      .values({ pageSlug: slug, content })
      .returning();
    return NextResponse.json(created, { status: 201 });
  }
}

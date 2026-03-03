import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { quote, authorName, companyName, isActive } = body;

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (quote !== undefined) updateData.quote = quote;
  if (authorName !== undefined) updateData.authorName = authorName;
  if (companyName !== undefined) updateData.companyName = companyName;
  if (isActive !== undefined) updateData.isActive = isActive;

  const [updated] = await db
    .update(testimonials)
    .set(updateData)
    .where(eq(testimonials.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/");

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [deleted] = await db
    .delete(testimonials)
    .where(eq(testimonials.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/");

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { solutions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderedIds } = await request.json();

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json(
      { error: "orderedIds must be an array" },
      { status: 400 }
    );
  }

  await Promise.all(
    orderedIds.map((id: string, index: number) =>
      db
        .update(solutions)
        .set({ sortOrder: index, updatedAt: new Date() })
        .where(eq(solutions.id, id))
    )
  );

  return NextResponse.json({ success: true });
}

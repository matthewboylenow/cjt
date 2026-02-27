import { NextResponse } from "next/server";
import { db } from "@/db";
import { solutions } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(solutions)
      .where(eq(solutions.isActive, true))
      .orderBy(asc(solutions.sortOrder));

    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch solutions:", err);
    return NextResponse.json(
      { error: "Failed to fetch solutions" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(asc(testimonials.sortOrder));

    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch testimonials:", err);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

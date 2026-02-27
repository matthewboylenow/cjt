import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [page] = await db
      .select()
      .from(pageContent)
      .where(eq(pageContent.pageSlug, slug))
      .limit(1);

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (err) {
    console.error("Failed to fetch page content:", err);
    return NextResponse.json(
      { error: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}

import { db } from "@/db";
import { solutions, testimonials, pageContent } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getActiveSolutions() {
  return db
    .select()
    .from(solutions)
    .where(eq(solutions.isActive, true))
    .orderBy(asc(solutions.sortOrder));
}

export async function getActiveTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(asc(testimonials.sortOrder));
}

export async function getPageContent(slug: string) {
  const [page] = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.pageSlug, slug));
  return page ?? null;
}

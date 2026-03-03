import { Metadata } from "next";
import { SolutionsContent } from "./SolutionsContent";
import { getActiveSolutions } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "IT Solutions | CJ Technology",
  description:
    "IT solutions including network management, structured cabling, AWS cloud services, Microsoft 365, website design, and digital marketing. Serving NJ businesses since 2005.",
};

export default async function SolutionsPage() {
  const rows = await getActiveSolutions();

  const solutions = rows.map((s) => ({
    heading: s.heading,
    excerpt: s.excerpt ?? "",
    body: s.body,
    imageUrl: s.imageUrl ?? "",
    linkLabel: s.linkLabel ?? null,
    linkHref: s.linkHref ?? null,
  }));

  return <SolutionsContent solutions={solutions} />;
}

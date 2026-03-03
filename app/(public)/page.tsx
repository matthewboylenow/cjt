import { HeroSection } from "@/components/public/sections/Hero";
import { PainPoints } from "@/components/public/sections/PainPoints";
import { SolutionsPreview } from "@/components/public/sections/SolutionsPreview";
import { TrustSignals } from "@/components/public/sections/TrustSignals";
import { TestimonialsSection } from "@/components/public/sections/Testimonials";
import { HomeCTA } from "@/components/public/sections/HomeCTA";
import { getActiveSolutions, getActiveTestimonials } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [solutions, testimonials] = await Promise.all([
    getActiveSolutions(),
    getActiveTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <PainPoints />
      <SolutionsPreview
        solutions={solutions.map((s) => ({
          heading: s.heading,
          excerpt: s.excerpt ?? "",
        }))}
      />
      <TrustSignals />
      <TestimonialsSection
        testimonials={testimonials.map((t) => ({
          quote: t.quote,
          author: t.authorName,
          company: t.companyName ?? "",
        }))}
      />
      <HomeCTA />
    </>
  );
}

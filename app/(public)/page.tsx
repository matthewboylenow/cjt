import { HeroSection } from "@/components/public/sections/Hero";
import { PainPoints } from "@/components/public/sections/PainPoints";
import { SolutionsPreview } from "@/components/public/sections/SolutionsPreview";
import { TrustSignals } from "@/components/public/sections/TrustSignals";
import { TestimonialsSection } from "@/components/public/sections/Testimonials";
import { HomeCTA } from "@/components/public/sections/HomeCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPoints />
      <SolutionsPreview />
      <TrustSignals />
      <TestimonialsSection />
      <HomeCTA />
    </>
  );
}

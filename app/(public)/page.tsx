import { HeroSection } from "@/components/public/sections/Hero";
import { SolutionsPreview } from "@/components/public/sections/SolutionsPreview";
import { StatsBar } from "@/components/public/sections/StatsBar";
import { TestimonialsSection } from "@/components/public/sections/Testimonials";
import { AboutBrief } from "@/components/public/sections/AboutBrief";
import { CTABand } from "@/components/public/sections/CTABand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsPreview />
      <StatsBar />
      <TestimonialsSection />
      <AboutBrief />
      <CTABand />
    </>
  );
}

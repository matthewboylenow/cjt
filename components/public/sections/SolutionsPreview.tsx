"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/public/FadeIn";

const solutionPreviews = [
  {
    heading: "Network & Infrastructure",
    excerpt: "Servers, workstations, security patches, and uptime monitoring.",
  },
  {
    heading: "Structured Cabling",
    excerpt: "Data, voice, and video cabling for new builds and existing offices.",
  },
  {
    heading: "AWS Cloud Services",
    excerpt: "Cloud backup, virtual servers, and remote workstations on AWS.",
  },
  {
    heading: "Microsoft 365",
    excerpt: "Email setup, migration, storage management, and ongoing support.",
  },
  {
    heading: "Website Design",
    excerpt: "Professional sites built to represent your business and convert visitors.",
  },
  {
    heading: "Digital Marketing",
    excerpt: "Content, campaigns, and analytics to grow your online presence.",
  },
];

export function SolutionsPreview() {
  return (
    <section className="relative py-24 lg:py-32 bg-surface-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-[-0.015em]">
            Six ways we keep your business running
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionPreviews.map((solution, index) => (
            <StaggerItem key={solution.heading}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:bg-brand-navy transition-all duration-300 h-full"
              >
                <div className="p-8">
                  {/* Watermark number */}
                  <span className="absolute top-4 right-6 text-6xl font-heading font-extrabold text-brand-bronze/15 leading-none select-none pointer-events-none group-hover:text-white/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-3 group-hover:text-white transition-colors duration-300 relative z-10">
                    {solution.heading}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-white/70 transition-colors duration-300 relative z-10">
                    {solution.excerpt}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4} className="text-center mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:gap-3 transition-all duration-200"
          >
            View All Solutions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

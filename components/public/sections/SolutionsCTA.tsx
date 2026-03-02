"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

export function SolutionsCTA() {
  return (
    <section className="relative py-20 lg:py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-cyan/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-brand-bronze/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.015em]">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Describe your situation and we&apos;ll recommend a starting point.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-brand-cyan px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-brand-cyan-light hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

export function HomeCTA() {
  return (
    <section className="relative py-20 lg:py-24 bg-brand-navy overflow-hidden">
      {/* Bronze vertical accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-brand-bronze hidden lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.015em]">
            Need help with your IT?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Send us a message and we&apos;ll get back to you within one
            business day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-brand-cyan px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-brand-cyan-light hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

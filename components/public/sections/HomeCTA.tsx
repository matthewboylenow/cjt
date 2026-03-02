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
            Send us a message or give us a call. We&apos;ll get back to you
            within one business day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-brand-cyan px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-brand-cyan-light hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
            <a
              href="tel:8772275435"
              className="inline-flex items-center justify-center rounded-lg border-2 border-brand-bronze/40 px-8 py-4 text-base font-semibold text-brand-bronze-light transition-all duration-200 hover:bg-brand-bronze/10 hover:border-brand-bronze/60"
            >
              Or call now: 877.227.5435
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

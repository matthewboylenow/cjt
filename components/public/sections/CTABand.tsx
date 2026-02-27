"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

export function CTABand() {
  return (
    <section className="relative py-20 lg:py-24 bg-brand-cyan overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-black/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.015em]">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Curious? Contact us to learn more about how we can help your
            business. Fill out a form or give us a call.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-cyan transition-all duration-200 hover:bg-surface-warm hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Us Today
            </Link>
            <a
              href="tel:8772275435"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/60"
            >
              Call 877.227.5435
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

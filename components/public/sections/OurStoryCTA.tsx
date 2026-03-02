"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

export function OurStoryCTA() {
  return (
    <section className="relative py-20 lg:py-24 bg-brand-bronze-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-black/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.015em]">
            Want to talk about your IT setup?
          </h2>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-bronze-dark transition-all duration-200 hover:bg-surface-warm hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

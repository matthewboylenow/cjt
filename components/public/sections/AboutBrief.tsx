"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

export function AboutBrief() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-mist/30 -skew-x-12 translate-x-1/4" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-cyan mb-4">
              About CJ Technology
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy tracking-[-0.015em] mb-6">
              About CJT
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Based in Iselin, New Jersey, CJ Technology is an IT solutions
              provider helping mid-size and enterprise-level businesses since
              2005. Our solutions range from PC network support, voice, AV and
              IT product knowledge.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Joe Kreher, president of CJT, has been in the IT industry since
              2000. He started his consulting company in 2005 and has been
              growing since.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 font-semibold text-brand-cyan hover:gap-3 transition-all duration-200"
            >
              Read Our Story
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="relative">
              <div className="relative bg-brand-navy rounded-2xl p-10 text-white">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-brand-cyan/20 rounded-2xl" />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-cyan"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg">
                        Dependable Service
                      </h4>
                      <p className="text-white/60 text-sm mt-1">
                        We pride ourselves on meeting every customer&apos;s need,
                        no matter how big or small.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-cyan"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg">
                        Diverse Skill Sets
                      </h4>
                      <p className="text-white/60 text-sm mt-1">
                        Experienced, educated IT personnel who review each
                        client&apos;s situation from varying perspectives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-cyan"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg">
                        Industry-Leading Service
                      </h4>
                      <p className="text-white/60 text-sm mt-1">
                        Solutions that meet your unique business requirements
                        at a competitive price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

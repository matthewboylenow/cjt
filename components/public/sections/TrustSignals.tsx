"use client";

import Link from "next/link";
import { FadeIn } from "@/components/public/FadeIn";

const badges = [
  {
    icon: (
      <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Based in Iselin, NJ",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    text: "Direct line to our team",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Emergency support available",
  },
];

export function TrustSignals() {
  return (
    <section className="py-24 lg:py-32 bg-surface-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Col 1 — Big stat */}
          <FadeIn direction="left">
            <div>
              <span className="font-heading text-6xl md:text-7xl font-extrabold text-brand-bronze leading-none">
                20+
              </span>
              <p className="text-xl font-heading font-semibold text-brand-navy mt-2">
                years serving NJ businesses
              </p>
            </div>
          </FadeIn>

          {/* Col 2 — Short story */}
          <FadeIn delay={0.1}>
            <div>
              <p className="text-text-secondary leading-relaxed mb-4">
                Joe Kreher started CJ Technology in 2005 to provide reliable IT
                support for mid-size businesses in New Jersey. Twenty years later,
                the company is still locally owned, still hands-on, and still
                focused on the same types of clients.
              </p>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 font-semibold text-brand-cyan hover:gap-3 transition-all duration-200"
              >
                Read the full story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Col 3 — Trust badges */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-5">
              {badges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/5 flex items-center justify-center flex-shrink-0">
                    {badge.icon}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

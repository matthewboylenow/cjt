"use client";

import Image from "next/image";
import { FadeIn } from "@/components/public/FadeIn";
import { OurStoryCTA } from "@/components/public/sections/OurStoryCTA";

export function OurStoryContent() {
  return (
    <>
      {/* Custom Hero — navy with bronze gradient */}
      <section className="relative py-28 lg:py-36 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-bronze-dark/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze-light mb-4">
              Est. 2005 | Iselin, NJ
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-[-0.02em] max-w-3xl">
              IT consulting built around mid-size businesses
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: The Short Version */}
      <section className="py-20 lg:py-28 bg-surface-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
                  The Short Version
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy tracking-[-0.01em] mb-6">
                  How CJ Technology got started
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Joe Kreher has been in the IT industry since 2000. He started CJ Technology in 2005
                  because he saw mid-size companies getting inconsistent service from larger providers.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  CJT was built to focus on that segment. We keep our client list manageable so we can
                  learn each company&apos;s systems and respond quickly when something goes wrong.
                </p>
              </div>
              <div className="hidden lg:flex justify-center">
                <Image
                  src="/img/co-working.svg"
                  alt="Team collaboration illustration"
                  width={420}
                  height={350}
                  className="w-full max-w-sm"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Our Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="hidden lg:flex justify-center order-1">
                <Image
                  src="/img/connected.svg"
                  alt="Connected team illustration"
                  width={380}
                  height={320}
                  className="w-full max-w-xs"
                />
              </div>
              <div className="order-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
                  Our Team
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy tracking-[-0.01em] mb-6">
                  In-house team with diverse skill sets
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  All of our technicians are in-house employees with experience across
                  networking, cloud, cabling, and security. No outsourcing, no call centers.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Multiple specialists review each client&apos;s setup, which helps us catch issues
                  from different angles and make better recommendations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Our Promise */}
      <section className="py-20 lg:py-28 bg-surface-cyan-tint">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4 text-center">
              Our Promise
            </p>
            <blockquote className="border-l-[8px] border-brand-bronze pl-8 py-4">
              <p className="text-2xl md:text-3xl font-heading font-bold text-brand-navy leading-snug">
                Whether you need a box of toner delivered overnight or a full network overhaul,
                we are ready. We pride ourselves on meeting every customer&apos;s need, no matter
                how big or small.
              </p>
              <cite className="block mt-6 text-sm text-text-secondary not-italic font-medium">
                Joe Kreher, President of CJ Technology
              </cite>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <OurStoryCTA />
    </>
  );
}

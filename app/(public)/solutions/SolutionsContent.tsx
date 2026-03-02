"use client";

import Image from "next/image";
import { FadeIn } from "@/components/public/FadeIn";
import { SolutionsCTA } from "@/components/public/sections/SolutionsCTA";

interface Solution {
  heading: string;
  painLine: string;
  body: string;
  image: string;
}

export function SolutionsContent({
  solutions,
}: {
  solutions: Solution[];
}) {
  return (
    <>
      {/* Custom Solutions Hero — light background */}
      <section className="relative py-28 lg:py-36 bg-gradient-to-br from-surface-cyan-tint to-surface-warm overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze mb-4">
                Our Services
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-[1.1] tracking-[-0.02em]">
                IT solutions for mid-size businesses
              </h1>
              <p className="mt-6 text-lg text-text-secondary max-w-lg leading-relaxed">
                Our core service areas for mid-size businesses in New Jersey.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="hidden lg:flex justify-center">
                <Image
                  src="/img/monitoring.svg"
                  alt="IT monitoring illustration"
                  width={420}
                  height={350}
                  className="w-full max-w-sm"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Solution Blocks */}
      {solutions.map((solution, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "bg-white" : "bg-surface-warm";

        return (
          <section key={solution.heading} className={`py-20 lg:py-28 ${bgClass}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <FadeIn>
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 lg:gap-16 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="flex justify-center">
                      <Image
                        src={solution.image}
                        alt={solution.heading}
                        width={400}
                        height={320}
                        className="w-full max-w-sm"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-mono font-bold text-brand-cyan/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-8 h-0.5 bg-brand-bronze" />
                      <div className="h-px flex-1 bg-surface-mist" />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy tracking-[-0.01em] mb-4">
                      {solution.heading}
                    </h2>
                    <p className="text-brand-bronze font-medium mb-4 italic">
                      {solution.painLine}
                    </p>
                    {solution.body.split("\n\n").map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-text-secondary leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        );
      })}

      <SolutionsCTA />
    </>
  );
}

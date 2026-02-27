"use client";

import Image from "next/image";
import { PageHero } from "@/components/public/PageHero";
import { FadeIn } from "@/components/public/FadeIn";
import { CTABand } from "@/components/public/sections/CTABand";

interface Solution {
  heading: string;
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
      <PageHero
        overline="Our Services"
        title="CJT Solutions"
        subtitle="We understand that technology downtime means lost productivity and efficiency. We work tirelessly to maintain all of your infrastructure to keep your productivity levels at their highest."
      />

      <section className="py-20 lg:py-28 bg-surface-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {solutions.map((solution, index) => {
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={solution.heading}>
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-12 lg:gap-16 items-center`}
                  >
                    <div className="w-full lg:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                        <div className="aspect-[16/10] relative">
                          <Image
                            src={solution.image}
                            alt={solution.heading}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div
                          className={`absolute top-0 ${
                            isEven ? "left-0" : "right-0"
                          } w-1 h-full bg-brand-cyan`}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-mono font-bold text-brand-cyan/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-surface-mist" />
                      </div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy tracking-[-0.01em] mb-6">
                        {solution.heading}
                      </h2>
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
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}

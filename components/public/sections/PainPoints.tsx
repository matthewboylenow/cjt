"use client";

import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/public/FadeIn";

const painPoints = [
  {
    svg: "/img/server-problems.svg",
    headline: "Slow response times",
    body: "When systems go down, you need someone on the phone quickly. Delays in response mean downtime for your whole team.",
  },
  {
    svg: "/img/bug-fixing.svg",
    headline: "Recurring issues",
    body: "Quick patches get things running again, but if nobody addresses the root cause, the same problems come back.",
  },
  {
    svg: "/img/secure-data.svg",
    headline: "Untested backups",
    body: "Backups may be running, but without regular restore tests, there's no way to know if your recovery plan actually works.",
  },
];

export function PainPoints() {
  return (
    <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
      {/* Subtle pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pain-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pain-dots)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-bronze-light mb-4">
            Why Businesses Switch
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.015em]">
            Common IT frustrations we see from new clients
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point) => (
            <StaggerItem key={point.headline}>
              <div className="bg-white rounded-xl p-8 h-full border-l-[3px] border-brand-bronze">
                <div className="mb-6">
                  <Image
                    src={point.svg}
                    alt={point.headline}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px]"
                  />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-navy mb-3">
                  {point.headline}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {point.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

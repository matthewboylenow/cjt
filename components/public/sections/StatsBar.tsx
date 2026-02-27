"use client";

import { CounterAnimation } from "@/components/public/CounterAnimation";

export function StatsBar() {
  return (
    <section className="relative bg-brand-navy py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="stats-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          <CounterAnimation
            end={20}
            suffix="+"
            label="Years in Business"
            duration={2}
          />
          <CounterAnimation
            end={6}
            suffix=""
            label="IT Service Areas"
            duration={1.5}
          />
          <CounterAnimation
            end={2005}
            suffix=""
            label="Founded in NJ"
            duration={2.5}
          />
        </div>
      </div>
    </section>
  );
}

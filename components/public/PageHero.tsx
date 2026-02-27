"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  overline: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ overline, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-brand-navy pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="page-hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-hero-grid)" />
      </svg>

      <div className="absolute top-1/4 right-[10%] w-24 h-24 border border-brand-cyan/15 rounded-2xl rotate-12" />
      <div className="absolute bottom-1/4 left-[5%] w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-brand-cyan mb-4"
        >
          {overline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/60 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-warm to-transparent" />
    </section>
  );
}

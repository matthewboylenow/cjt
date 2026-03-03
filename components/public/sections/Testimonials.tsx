"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/public/FadeIn";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background illustration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.06] pointer-events-none hidden lg:block">
        <Image
          src="/img/connected.svg"
          alt=""
          width={500}
          height={500}
          className="w-[500px] h-auto"
          aria-hidden="true"
        />
      </div>

      <div className="absolute top-16 left-8 text-[200px] font-heading font-bold text-surface-mist/50 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-cyan mb-4">
            Client Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-[-0.015em]">
            What our clients say
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <p className="font-heading font-bold text-brand-navy text-lg">
                    {testimonials[current].author}
                  </p>
                  <p className="text-text-secondary text-sm mt-1">
                    {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-surface-mist-dark hover:border-brand-cyan hover:text-brand-cyan transition-colors flex items-center justify-center text-text-secondary"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-brand-cyan w-8"
                      : "bg-surface-mist-dark hover:bg-text-secondary"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-surface-mist-dark hover:border-brand-cyan hover:text-brand-cyan transition-colors flex items-center justify-center text-text-secondary"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

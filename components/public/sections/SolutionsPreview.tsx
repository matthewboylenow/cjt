"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/public/FadeIn";

const solutionPreviews = [
  {
    heading: "Network & Infrastructure Management",
    excerpt:
      "New computers, servers, data migrations, hardware upgrades, network reconfigurations, and monthly management with security patches.",
    image: "/images/solution-network.svg",
  },
  {
    heading: "Structured & Network Cabling",
    excerpt:
      "Diagramming, laying, and running cabling for data, video surveillance, telephony, and video conferencing.",
    image: "/images/solution-cabling.svg",
  },
  {
    heading: "Managed Services - AWS",
    excerpt:
      "Cloud backup, servers-in-the-cloud, and company workstations in-the-cloud for on-demand access anywhere, at any time.",
    image: "/images/solution-aws.svg",
  },
  {
    heading: "Microsoft 365 Management",
    excerpt:
      "Reliable, easy-to-use email service through Microsoft Office 365. Say goodbye to email downtime and deliverability issues.",
    image: "/images/solution-microsoft365.svg",
  },
  {
    heading: "Website Design & Development",
    excerpt:
      "Partnered with Adventii Media to showcase your online presence, converting visitors into customers.",
    image: "/images/solution-webdesign.svg",
  },
  {
    heading: "Social Media & Digital Marketing",
    excerpt:
      "Strategic content creation, campaign management, data-driven advertising, and performance tracking.",
    image: "/images/solution-marketing.svg",
  },
];

export function SolutionsPreview() {
  return (
    <section className="relative py-24 lg:py-32 bg-surface-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-cyan mb-4">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-[-0.015em]">
            CJT Solutions
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            We understand that technology downtime means lost productivity and
            efficiency. We work tirelessly to maintain all of your infrastructure
            to keep your productivity levels at their highest.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionPreviews.map((solution, index) => (
            <StaggerItem
              key={solution.heading}
              className={index === 0 || index === 3 ? "lg:col-span-2" : ""}
            >
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.heading}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-cyan transition-colors">
                    {solution.heading}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {solution.excerpt}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4} className="text-center mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:gap-3 transition-all duration-200"
          >
            View All Solutions
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
      </div>
    </section>
  );
}
